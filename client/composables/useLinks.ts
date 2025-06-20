import { useTimeoutFn } from "@vueuse/shared";

export const useLinks = () => {
    const auth = useAuthStore();
    const toast = useToast();

    const mainMenuItems = [
        {
            icon: "solar:home-outline",
            label: "Dashboard",
            permission: true,
            to: "/dashboard",
        },
        {
            icon: "solar:bag-4-outline",
            label: "Products",
            permission: auth.can("view product"),
            to: "/products",
        },
        {
            icon: "solar:cart-4-outline",
            label: "Orders",
            permission: auth.can("view order"),
            to: "/orders",
        },
        {
            icon: "solar:users-group-rounded-outline",
            label: "Customers",
            permission: auth.can("view customer"),
            to: "/customers",
        },
        {
            icon: "solar:chat-round-dots-outline",
            label: "Messages",
            permission: auth.can("view message"),
            to: "/messages",
        },
    ];

    const adminItems = [
        {
            icon: "solar:users-group-rounded-outline",
            label: "Users",
            permission: auth.can("view user"),
            to: "/users",
        },
        {
            icon: "solar:key-outline",
            label: "Roles",
            permission: auth.can("view role"),
            to: "/roles",
        },
        {
            icon: "solar:lock-outline",
            label: "Permissions",
            permission: auth.can("view permission"),
            to: "/permissions",
        },
        {
            icon: "solar:settings-outline",
            label: "Settings",
            permission: auth.can("view setting"),
            to: "/settings",
        },
    ];

    const userMenuItems = [
        [
            {
                icon: "solar:user-circle-outline",
                label: "Profile",
                to: "/dashboard",
            },
            {
                icon: "solar:settings-outline",
                label: "Settings",
                to: "/settings",
            },
        ],
        [
            {
                click: () => {
                    auth.logout();
                    useTimeoutFn(() => {
                        toast.add({
                            icon: "solar:check-circle-outline",
                            title: "Logged out successfully",
                        });
                    }, 500);
                },
                icon: "solar:logout-outline",
                label: "Logout",
            },
        ],
    ];

    return {
        adminItems,
        mainMenuItems,
        userMenuItems,
    };
};
