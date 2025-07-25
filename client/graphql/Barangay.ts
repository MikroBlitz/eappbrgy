import { barangayFragment } from "~/graphql/Fragment";

export const barangaysPaginate = gql`
    query barangaysPaginate(
        $first: Int!
        $page: Int
        $search: String
        $sort: SortInput
        $filter: [FilterInput] #        $whereValue: String
    ) {
        barangaysPaginate(
            first: $first
            page: $page
            search: $search
            sort: $sort
            filter: $filter #            where: {
            #                OR: [{ column: STATUS, operator: EQ, value: $whereValue }]
        ) #            }
        {
            data {
                ...barangay
            }
            paginatorInfo {
                currentPage
                lastPage
                perPage
                total
            }
        }
    }
    ${barangayFragment}
`;

export const upsertBarangay = gql`
    mutation upsertBarangay($input: BarangayInput!) {
        upsertBarangay(input: $input) {
            ...barangay
        }
    }
    ${barangayFragment}
`;

export const deleteBarangay = gql`
    mutation deleteBarangay($id: [ID!]) {
        deleteBarangay(id: $id) {
            id
        }
    }
`;

export const barangaysCount = gql`
    query barangaysCount {
        barangaysCount
    }
`;
