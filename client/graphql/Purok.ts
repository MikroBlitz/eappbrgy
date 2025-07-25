export const puroksPaginate = gql`
    query puroksPaginate(
        $first: Int!
        $page: Int
        $search: String
        $sort: SortInput
    ) {
        puroksPaginate(
            first: $first
            page: $page
            search: $search
            sort: $sort
        ) {
            data {
                id
                name
                barangay {
                    id
                    name
                }
                created_at
                updated_at
            }
            paginatorInfo {
                currentPage
                lastPage
                perPage
                total
            }
        }
    }
`;

export const upsertPurok = gql`
    mutation upsertPurok($input: PurokInput!) {
        upsertPurok(input: $input) {
            id
            name
            barangay {
                id
                name
            }
            created_at
            updated_at
        }
    }
`;

export const deletePurok = gql`
    mutation deletePurok($id: [ID!]) {
        deletePurok(id: $id) {
            id
        }
    }
`;
