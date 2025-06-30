import { officialFragment } from "~/graphql/Fragment";

export const officialsPaginate = gql`
    query officialsPaginate(
        $first: Int!
        $page: Int
        $search: String
        $sort: SortInput
    ) {
        officialsPaginate(
            first: $first
            page: $page
            search: $search
            sort: $sort
        ) {
            data {
                ...official
            }
            paginatorInfo {
                currentPage
                lastPage
                perPage
                total
            }
        }
    }
    ${officialFragment}
`;

export const upsertOfficial = gql`
    mutation upsertOfficial($input: OfficialInput!) {
        upsertOfficial(input: $input) {
            ...official
        }
    }
    ${officialFragment}
`;

export const deleteOfficial = gql`
    mutation deleteOfficial($id: [ID!]) {
        deleteOfficial(id: $id) {
            id
        }
    }
`;
