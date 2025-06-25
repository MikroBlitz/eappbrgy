import { residentFragment } from "~/graphql/Fragment";

export const residentsPaginate = gql`
    query residentsPaginate(
        $first: Int!
        $page: Int
        $search: String
        $sort: SortInput
        $filter: [FilterInput]
    ) {
        residentsPaginate(
            first: $first
            page: $page
            search: $search
            sort: $sort
            filter: $filter
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

export const residentsCount = gql`
    query residentsCount {
        residentsCount
    }
`;
