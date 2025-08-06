export const useLinks = () => {
    const auth = useAuthStore();

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
            icon: "solar:checklist-minimalistic-broken",
            label: "Tasks",
            permission: auth.can("view task"),
            to: "/tasks",
        },
        {
            icon: "solar:chat-round-dots-outline",
            label: "Messages",
            permission: auth.can("view message"),
            to: "/messages",
        },
        {
            icon: "solar:face-scan-square-broken",
            label: "Biometrics",
            permission: auth.can("view biometric"),
            to: "/biometrics",
        },
        {
            icon: "solar:settings-outline",
            label: "Settings",
            permission: auth.can("view setting"),
            to: "/settings",
        },
    ];

    return {
        mainMenuItems,
    };
};
