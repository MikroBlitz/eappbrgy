import { messageFragment } from "~/graphql/Fragment";

export const getMessages = gql`
    query messages($first: Int!, $page: Int, $sender: Mixed, $receiver: Mixed) {
        messages(
            first: $first
            page: $page
            where: {
                OR: [
                    {
                        AND: [
                            { column: SENDER_ID, operator: EQ, value: $sender }
                            {
                                column: RECEIVER_ID
                                operator: EQ
                                value: $receiver
                            }
                        ]
                    }
                    {
                        AND: [
                            {
                                column: SENDER_ID
                                operator: EQ
                                value: $receiver
                            }
                            {
                                column: RECEIVER_ID
                                operator: EQ
                                value: $sender
                            }
                        ]
                    }
                ]
            }
        ) {
            data {
                ...message
            }
            paginatorInfo {
                currentPage
                lastPage
                perPage
                total
            }
        }
    }
    ${messageFragment}
`;

export const upsertMessage = gql`
    mutation upsertMessage($input: MessageInput!) {
        upsertMessage(input: $input) {
            id
            sender {
                id
            }
            receiver {
                id
            }
            message
        }
    }
`;
