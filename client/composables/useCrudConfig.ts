export function useCrudConfig(
    title: string,
    singular: string,
    icon: string,
    permissions: {
        view: string;
        create: string;
        edit: string;
        delete: string;
        updateStatus?: string;
    },
    hasStatus?: boolean,
) {
    return {
        hasStatus,
        icon,
        permissions,
        singular,
        title,
    };
}
