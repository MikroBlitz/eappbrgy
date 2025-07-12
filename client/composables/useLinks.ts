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
            icon: "solar:lock-outline",
            label: "Permissions",
            permission: auth.can("view permission"),
            to: "/permissions",
        },
        {
            icon: "solar:key-outline",
            label: "Roles",
            permission: auth.can("view role"),
            to: "/roles",
        },
        {
            icon: "solar:users-group-rounded-outline",
            label: "Users",
            permission: auth.can("view user"),
            to: "/users",
        },
        {
            icon: "solar:home-angle-broken",
            label: "Puroks",
            permission: auth.can("view purok"),
            to: "/puroks",
        },
        {
            icon: "solar:home-broken",
            label: "Households",
            permission: auth.can("view household"),
            to: "/households",
        },
        {
            icon: "solar:users-group-two-rounded-broken",
            label: "Residents",
            permission: auth.can("view resident"),
            to: "/residents",
        },
        {
            icon: "solar:documents-broken",
            label: "Permits",
            permission: auth.can("view permit"),
            to: "/permits",
        },
        {
            icon: "solar:crown-star-broken",
            label: "Officials",
            permission: auth.can("view official"),
            to: "/officials",
        },
        {
            icon: "solar:document-add-broken",
            label: "Blotters",
            permission: auth.can("view blotter"),
            to: "/blotters",
        },
        {
            icon: "solar:chat-round-dots-outline",
            label: "Messages",
            permission: auth.can("view message"),
            to: "/messages",
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
        mainMenuItems,
        userMenuItems,
    };
};
