export function copyToClipboard(text: string, row: string) {
    const toast = useToast();

    navigator.clipboard.writeText(row);
    toast.add({
        color: "blue",
        icon: "i-mdi-check-circle-outline",
        title: `Copied ${row} to clipboard`,
    });
}
