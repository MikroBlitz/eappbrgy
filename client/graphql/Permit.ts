import { permitFragment } from "~/graphql/Fragment";

export const permitsPaginate = gql`
    query permitsPaginate(
        $first: Int!
        $page: Int
        $search: String
        $sort: SortInput
        $filter: [FilterInput]
    ) {
        permitsPaginate(
            first: $first
            page: $page
            search: $search
            sort: $sort
            filter: $filter
        ) {
            data {
                ...permit
            }
            paginatorInfo {
                currentPage
                lastPage
                perPage
                total
            }
        }
    }
    ${permitFragment}
`;

export const upsertPermit = gql`
    mutation upsertPermit($input: PermitInput!) {
        upsertPermit(input: $input) {
            ...permit
        }
    }
    ${permitFragment}
`;

export const deletePermit = gql`
    mutation deletePermit($id: [ID!]) {
        deletePermit(id: $id) {
            id
        }
    }
`;

export const permitsCount = gql`
    query permitsCount {
        permitsCount
    }
`;
