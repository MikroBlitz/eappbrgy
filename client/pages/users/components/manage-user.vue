<template>
    <div>
        <CrudTable :table-data="tableData" />

        <UModal v-model="isOpen">
            <div class="p-6 space-y-4">
                <div class="flex items-center">
                    <UIcon
                        name="solar:face-scan-square-broken"
                        class="mr-3 text-primary"
                    />
                    <span
                        class="text-lg text-gray-600 dark:text-gray-100 font-medium"
                        >Update
                        <span class="text-primary">{{
                            selectedUser?.name || "User"
                        }}</span>
                        Face Data
                    </span>
                </div>

                <BiometricComp
                    :has-detect-face="true"
                    :has-recognize-face="false"
                    @descriptor-scanned="onDescriptorScanned"
                />

                <div class="flex justify-end space-x-3">
                    <UButton
                        color="red"
                        variant="outline"
                        @click="isOpen = false"
                    >
                        Cancel
                    </UButton>
                    <UButton
                        icon="solar:face-scan-square-broken"
                        color="green"
                        variant="solid"
                        :loading="loading"
                        @click="handleSaveFace"
                    >
                        Save Face
                    </UButton>
                </div>
            </div>
        </UModal>
    </div>
</template>

<script setup lang="ts">
import { useTimeoutFn } from "@vueuse/shared";

import type { User } from "~/types/codegen/graphql";

import { rolesPaginate } from "~/graphql/Role";
import {
    usersPaginate,
    upsertUser,
    deleteUser,
    updateUserStatus,
    registerFace,
} from "~/graphql/User";

import { columns, filters } from "../data/user/columns";
import { schema } from "../data/user/schema";

const isOpen = ref(false);
const loading = ref(false);
const selectedUser = ref<User | null>(null);
const scannedDescriptor = ref<number[] | null>(null);

const onDescriptorScanned = (descriptor: number[]) => {
    scannedDescriptor.value = descriptor;
};

const roleSearch = useSearchQueryOptions(rolesPaginate, {
    queryKey: "rolesPaginate",
});
const formSchema = computed(() =>
    schema({
        role: {
            onSearch: roleSearch.debouncedSearch,
            options: roleSearch.queryOptions,
        },
    }),
);
const zodSchema = computed(() => formZodSchema(formSchema.value));

const openModal = (row: User) => {
    scannedDescriptor.value = null;
    selectedUser.value = row;
    isOpen.value = true;
};

const tableData = useTableData<User>(
    {
        hasStatus: true,
        icon: "solar:users-group-rounded-outline",
        permission: "user",
        title: "Users",
    },
    {
        delete: deleteUser,
        paginate: usersPaginate,
        updateStatus: updateUserStatus,
        upsert: upsertUser,
    },
    {
        columns,
        customActions: [
            {
                color: () => "orange",
                condition: () => true,
                icon: () => "solar:face-scan-square-broken",
                onClick: (row: User) => openModal(row),
                tooltip: (row: User) => `Update Face Data of ${row.name}`,
            },
        ],
        defaultViewModal: true,
        filters,
        formSchema: formSchema.value,
        getFormState: (user?: User) => {
            const roleIds = user?.roles?.map((role) => role?.id) || [];
            roleSearch.initializeOptions();
            return user
                ? {
                      email: user.email || "",
                      face_descriptors: user.face_descriptors || undefined,
                      first_name: user.first_name || "",
                      id: user.id,
                      is_active: user.is_active || false,
                      last_name: user.last_name || "",
                      middle_name: user.middle_name || "",
                      password: "",
                      phone: user.phone || "",
                      roles: roleIds,
                  }
                : {
                      email: "",
                      face_descriptors: undefined,
                      first_name: "",
                      id: undefined,
                      is_active: false,
                      last_name: "",
                      middle_name: "",
                      password: "",
                      phone: "",
                      roles: [],
                  };
        },
        optionLoading: roleSearch.loadingOptions,
        prepareSubmitData: (data, selectedUser?: User) => ({
            ...data,
            id: selectedUser?.id,
            password: data.password || selectedUser?.password,
            roles: {
                sync: Array.isArray(data.roles) ? data.roles : [data.roles],
            },
        }),
        zodSchema: zodSchema.value,
    },
);

const handleSaveFace = async () => {
    const { refetch } = useQuery(usersPaginate, { first: 10 });
    loading.value = true;

    try {
        if (!selectedUser.value || !scannedDescriptor.value) {
            useToast().add({
                color: "orange",
                title: "Missing Data: Please scan face first",
            });
            return;
        }

        const { mutate: register } = useMutation(registerFace);

        await register({
            descriptor: scannedDescriptor.value,
            userId: selectedUser.value.id,
        });

        useToast().add({
            color: "green",
            description: `Face data updated for ${selectedUser.value.name}`,
            title: "Face Saved",
        });

        isOpen.value = false;
    } catch (e) {
        useToast().add({
            color: "red",
            title: `Save Failed: ${e}`,
        });
    } finally {
        useTimeoutFn(() => {
            loading.value = false;
        }, 500);
        scannedDescriptor.value = null;
        refetch();
    }
};
</script>
