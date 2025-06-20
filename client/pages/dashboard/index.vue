<template>
    <div class="flex items-center justify-center">
        <main class="flex-1 overflow-y-auto p-4 max-w-screen-xl">
            <div
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
            >
                <DashboardStatCard
                    title="Total Revenue"
                    value="$24,345"
                    :trend="12.5"
                    icon="i-heroicons-currency-dollar"
                />
                <DashboardStatCard
                    title="Orders"
                    value="1,274"
                    :trend="8.2"
                    icon="i-heroicons-shopping-cart"
                />
                <DashboardStatCard
                    title="Customers"
                    value="3,849"
                    :trend="-2.4"
                    icon="i-heroicons-users"
                />
                <DashboardStatCard
                    title="Conversion Rate"
                    value="3.2%"
                    :trend="5.7"
                    icon="i-heroicons-chart-bar"
                />
            </div>

            <DashboardProductsTable title="Top Products" />
        </main>
    </div>
</template>

<script setup>
definePageMeta({ layout: "app-layout" });
useHead({
    meta: [
        {
            content:
                "A secure platform connecting buyers and sellers in a community-driven ecosystem.",
            name: "description",
        },
    ],
    title: "MarketHub - Dashboard",
});
</script>
