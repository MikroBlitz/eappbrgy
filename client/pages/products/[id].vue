<template>
    <div class="max-w-4xl mx-auto px-4 py-10">
        <div v-if="loading" class="text-center text-gray-500">Loading...</div>
        <div v-else-if="error" class="text-center text-red-500">
            Product not found.
        </div>
        <div v-else class="space-y-6">
            <img
                :src="product.image"
                alt="Product"
                class="w-full h-96 object-cover rounded-xl"
            />

            <div>
                <h1 class="text-3xl font-bold">{{ product.title }}</h1>
                <p class="text-gray-600 mt-2">{{ product.category }}</p>
            </div>

            <div class="text-xl font-semibold">${{ product.price }}</div>
            <p class="text-gray-700">{{ product.description }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
const route = useRoute();
const product = ref(null);
const loading = ref(true);
const error = ref(false);

onMounted(async () => {
    try {
        const res = await fetch(
            `https://api.escuelajs.co/api/v1/products/${route.params.id}`,
        );
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        product.value = {
            category: data.category?.name || "Uncategorized",
            description: data.description,
            id: data.id,
            image: data.images[0] || "/images/default.jpg",
            price: data.price,
            title: data.title,
        };
    } catch (err) {
        error.value = true;
    } finally {
        loading.value = false;
    }
});

definePageMeta({ layout: "app-layout", permission: "view product" });
useHead(() => ({
    meta: [
        {
            content: "View product details",
            name: "description",
        },
    ],
    title: "Product Details",
}));
</script>
