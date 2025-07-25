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
            icon: "solar:document-add-broken",
            label: "Blotters",
            permission: auth.can("view blotter"),
            to: "/blotters",
        },
        {
            icon: "solar:home-broken",
            label: "Barangays",
            permission: auth.can("view barangay"),
            to: "/barangays",
        },
        {
            icon: "solar:crown-star-broken",
            label: "Officials",
            permission: auth.can("view official"),
            to: "/officials",
        },
        {
            icon: "solar:documents-broken",
            label: "Documents",
            permission: auth.can("view document"),
            to: "/documents",
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
