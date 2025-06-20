<template>
    <UCard>
        <template #header>
            <div class="flex items-center justify-between">
                <h3 class="text-base font-medium">{{ title }}</h3>
                <UButton to="/products" size="sm" variant="ghost"
                    >View all</UButton
                >
            </div>
        </template>

        <UTable :columns="columns" :rows="products" :loading="loading">
            <template #status-data="{ row }">
                <UBadge :color="getStatusColor(row.status)" size="sm">
                    {{ row.status }}
                </UBadge>
            </template>
        </UTable>
    </UCard>
</template>

<script setup lang="ts">
defineProps({
    title: {
        default: "Top Products",
        type: String,
    },
});

const loading = ref(false);

const columns = [
    { key: "name", label: "Product" },
    { key: "price", label: "Price" },
    { key: "sales", label: "Sales" },
    { key: "status", label: "Status" },
];

const products = ref([
    {
        id: 1,
        name: "Premium Headphones",
        price: "$129.99",
        sales: 234,
        status: "Active",
    },
    {
        id: 2,
        name: "Smartwatch Pro",
        price: "$199.99",
        sales: 189,
        status: "Active",
    },
    {
        id: 3,
        name: "Wireless Keyboard",
        price: "$59.99",
        sales: 145,
        status: "Low Stock",
    },
    {
        id: 4,
        name: "Bluetooth Speaker",
        price: "$79.99",
        sales: 98,
        status: "Active",
    },
    {
        id: 5,
        name: "USB-C Hub",
        price: "$49.99",
        sales: 76,
        status: "Out of Stock",
    },
]);

const getStatusColor = (status) => {
    switch (status) {
        case "Active":
            return "green";
        case "Low Stock":
            return "yellow";
        case "Out of Stock":
            return "red";
        default:
            return "gray";
    }
};
</script>
