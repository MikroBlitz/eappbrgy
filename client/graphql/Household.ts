import { householdFragment } from "~/graphql/Fragment";

export const householdsPaginate = gql`
    query householdsPaginate(
        $first: Int!
        $page: Int
        $search: String
        $sort: SortInput
    ) {
        householdsPaginate(
            first: $first
            page: $page
            search: $search
            sort: $sort
        ) {
            data {
                ...household
            }
            paginatorInfo {
                currentPage
                lastPage
                perPage
                total
            }
        }
    }
    ${householdFragment}
`;

export const upsertHousehold = gql`
    mutation upsertHousehold($input: HouseholdInput!) {
        upsertHousehold(input: $input) {
            ...household
        }
    }
    ${householdFragment}
`;

export const deleteHousehold = gql`
    mutation deleteHousehold($id: [ID!]) {
        deleteHousehold(id: $id) {
            id
        }
    }
`;
