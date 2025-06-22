import type { ApolloQueryResult } from "@apollo/client";

import { useToast } from "#ui/composables/useToast";

type Action<
    TInput = unknown,
    TFetchResult = unknown,
    TMutationResult = unknown,
> = {
    auth?: string | undefined;
    fetch: () => Promise<ApolloQueryResult<TFetchResult>> | undefined;
    modal?: Ref<boolean>;
    mutation: (args: TInput) => Promise<TMutationResult>;
};

export async function useGraphQLMutation<
    TInput = unknown,
    TFetchResult = unknown,
    TMutationResult = unknown,
>(
    text: string,
    actionText: string,
    loading: Ref<boolean>,
    input: TInput,
    action: Action<TInput, TFetchResult, TMutationResult>,
) {
    const toast = useToast();
    try {
        loading.value = true;

        if (action.auth !== input) {
            await action.mutation?.(input);
            toast.add({
                color: "green",
                icon: "i-mdi-check-circle-outline",
                title: `${text} has been ${actionText}.`,
            });
        } else {
            toast.add({
                color: "red",
                icon: "i-mdi-alert-circle-outline",
                title: "Something went wrong please try again.",
            });
        }

        await action.fetch?.();
    } catch (e) {
        const err = parseGraphQLError(e);
        console.error("Remove error:", e);
        toast.add({
            color: "red",
            icon: "i-mdi-alert-circle-outline",
            title: `Error: ${err}`,
        });
    } finally {
        loading.value = false;
        if (action.modal) action.modal.value = false;
    }
}
