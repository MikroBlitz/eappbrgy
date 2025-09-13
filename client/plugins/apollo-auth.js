export default defineNuxtPlugin((nuxtApp) => {
    const auth = useAuthStore();

    nuxtApp.hook("apollo:auth", ({ token }) => {
        token.value = auth.token ? `Bearer ${auth.token}` : "";
    });
});
