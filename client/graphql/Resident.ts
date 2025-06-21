import { residentFragment } from "~/graphql/Fragment";

export const residentsPaginate = gql`
    query residentsPaginate(
        $first: Int!
        $page: Int
        $search: String
        $sort: SortInput
    ) {
        residentsPaginate(
            first: $first
            page: $page
            search: $search
            sort: $sort
        ) {
            data {
                ...resident
            }
            paginatorInfo {
                currentPage
                lastPage
                perPage
                total
            }
        }
    }
    ${residentFragment}
`;

export const upsertResident = gql`
    mutation upsertResident($input: ResidentInput!) {
        upsertResident(input: $input) {
            ...resident
        }
    }
    ${residentFragment}
`;

export const deleteResident = gql`
    mutation deleteResident($id: [ID!]) {
        deleteResident(id: $id) {
            id
        }
    }
`;
