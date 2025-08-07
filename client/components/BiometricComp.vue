<template>
    <div class="p-4 flex items-center justify-center">
        <div class="w-full max-w-2xl">
            <UCard class="overflow-hidden">
                <div class="relative rounded overflow-hidden">
                    <!-- Video Stream -->
                    <video
                        ref="videoRef"
                        autoplay
                        muted
                        width="640"
                        height="480"
                        class="w-full h-auto block"
                    />

                    <!-- Canvas Overlay -->
                    <canvas
                        ref="canvasRef"
                        class="absolute inset-0 w-full h-full pointer-events-none"
                        width="640"
                        height="480"
                    />

                    <!-- Status Indicator -->
                    <div class="absolute top-2 right-2">
                        <div
                            class="flex items-center gap-2 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full"
                        >
                            <div
                                :class="[
                                    'w-2 h-2 rounded-full',
                                    isDetecting
                                        ? 'bg-green-400 animate-pulse'
                                        : 'bg-gray-400',
                                ]"
                            />
                            <span class="text-xs text-white font-medium">
                                {{ isDetecting ? "Live" : "Ready" }}
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Controls -->
                <div class="flex items-center justify-center gap-2 mt-4">
                    <UButton
                        variant="outline"
                        color="blue"
                        size="sm"
                        :loading="isProcessing"
                        @click="detectFace"
                    >
                        Scan Face
                    </UButton>

                    <UButton
                        variant="outline"
                        color="orange"
                        size="sm"
                        :loading="isRecognizing"
                        @click="recognizeFaceHandler"
                    >
                        Recognize
                    </UButton>
                </div>
            </UCard>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useToast } from "#ui/composables/useToast";
import * as faceapi from "face-api.js";

import { recognizeFace } from "~/graphql/User.js";

const emit = defineEmits<{
    (e: "descriptorScanned", descriptor: number[]): void;
}>();

const videoRef = ref<HTMLVideoElement | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);

const mediaStream: Ref<MediaStream | null> = ref(null);
const toast = useToast();

const isDetecting = ref(false);
const isProcessing = ref(false);
const isRecognizing = ref(false);

const detectionLoopId: Ref<number | null> = ref(null);

async function startVideo() {
    try {
        mediaStream.value = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: "user",
                height: 480,
                width: 640,
            },
        });

        if (!videoRef.value) return;
        videoRef.value.srcObject = mediaStream.value;

        const videoTrack: MediaStreamTrack | undefined =
            mediaStream.value.getVideoTracks()[0];

        if (!videoTrack) return;
        videoTrack.onended = () => {
            console.warn("Video stream ended.");
            stopLiveDetection();
        };
    } catch (err) {
        console.error("Failed to access webcam:", err);
        toast.add({
            color: "red",
            description: "Please allow camera access and refresh the page",
            title: "Camera access failed",
        });
    }
}

function stopLiveDetection() {
    isDetecting.value = false;
    if (detectionLoopId.value) {
        cancelAnimationFrame(detectionLoopId.value);
        detectionLoopId.value = null;
    }
}

async function startLiveDetectionLoop() {
    if (isDetecting.value) return;
    isDetecting.value = true;

    const canvas = canvasRef.value;
    const video = videoRef.value;

    const displaySize = {
        height: video?.videoHeight,
        width: video?.videoWidth,
    };

    if (!canvas) return null;
    faceapi.matchDimensions(canvas, displaySize);

    async function loop() {
        if (!isDetecting.value) return;

        const track = video?.srcObject?.getVideoTracks?.()?.[0];
        if (
            !video?.srcObject ||
            !track ||
            track.readyState !== "live" ||
            video.videoWidth === 0
        ) {
            console.warn("Video stream inactive. Stopping detection loop.");
            stopLiveDetection();
            return;
        }

        const detections = await faceapi
            .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks();

        const resizedDetections = faceapi.resizeResults(
            detections,
            displaySize,
        );

        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Minimal overlay styling
        ctx.strokeStyle = "#3b82f6";
        ctx.lineWidth = 2;

        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

        detectionLoopId.value = requestAnimationFrame(loop);
    }

    await loop();
}

async function detectFace() {
    isProcessing.value = true;

    try {
        const detection = await faceapi
            .detectSingleFace(
                videoRef.value,
                new faceapi.TinyFaceDetectorOptions(),
            )
            .withFaceLandmarks()
            .withFaceExpressions()
            .withAgeAndGender()
            .withFaceDescriptor();

        if (!detection) {
            toast.add({
                color: "orange",
                description:
                    "Please position your face clearly in the camera view",
                title: "No face detected",
            });
            return;
        }

        const { age, descriptor, expressions, gender } = detection;
        const topExpression = Object.entries(expressions).reduce(
            (prev, curr) => (curr[1] > prev[1] ? curr : prev),
        );

        toast.add({
            color: "green",
            description: `${toTitleCase(gender)}, ${Math.round(age)} years, ${toTitleCase(topExpression[0])}`,
            title: "Face scan complete",
        });

        if (!videoRef.value) return;
        const resizedResult = faceapi.resizeResults(detection, {
            height: videoRef.value.videoHeight,
            width: videoRef.value.videoWidth,
        });

        const canvas = canvasRef.value;
        if (!canvas) return;
        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

        faceapi.draw.drawDetections(canvas, resizedResult);
        faceapi.draw.drawFaceExpressions(canvas, resizedResult);
        faceapi.draw.drawFaceLandmarks(canvas, resizedResult);

        await sendDescriptorToBackend(Array.from(descriptor));
    } finally {
        isProcessing.value = false;
    }
}

async function recognizeFaceHandler() {
    isRecognizing.value = true;

    try {
        const { mutate: recognizeFaceMutation } = useMutation(recognizeFace);

        const detection = await faceapi
            .detectSingleFace(
                videoRef.value,
                new faceapi.TinyFaceDetectorOptions(),
            )
            .withFaceLandmarks()
            .withFaceDescriptor();

        if (!detection) {
            toast.add({
                color: "orange",
                description:
                    "Please position your face clearly in the camera view",
                title: "No face detected",
            });
            return;
        }

        const descriptorArray = Array.from(detection.descriptor);

        const { data } = await recognizeFaceMutation({
            descriptor: descriptorArray,
        });

        if (!data?.recognizeFace) {
            toast.add({
                color: "amber",
                description: "This face is not in our database",
                title: "Unknown face",
            });
            return;
        }

        const { id, name, roles } = data.recognizeFace;

        toast.add({
            color: "green",
            description: `ID: ${id} • ${roles.map((r: { name: string }) => r.name).join(", ")}`,
            title: `Welcome, ${name}!`,
        });
    } catch (error) {
        console.error(error);
        toast.add({
            color: "red",
            description: "Please try again",
            title: "Recognition failed",
        });
    } finally {
        isRecognizing.value = false;
    }
}

async function sendDescriptorToBackend(descriptor: number[]) {
    // console.log("Descriptor:", descriptor);
    emit("descriptorScanned", descriptor);
}

onMounted(async () => {
    await loadModels();
    await startVideo();

    const canvas = canvasRef.value;
    if (!videoRef.value || !canvas) return;
    faceapi.matchDimensions(canvas, {
        height: videoRef.value.videoHeight,
        width: videoRef.value.videoWidth,
    });

    videoRef.value.addEventListener("playing", () => {
        startLiveDetectionLoop();
    });
});

onUnmounted(() => {
    stopLiveDetection();
    if (mediaStream.value) {
        mediaStream.value.getTracks().forEach((track) => track.stop());
        mediaStream.value = null;
    }
});
</script>
