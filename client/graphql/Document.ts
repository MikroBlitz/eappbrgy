import { documentFragment } from "~/graphql/Fragment";

export const documentsPaginate = gql`
    query documentsPaginate(
        $first: Int!
        $page: Int
        $search: String
        $sort: SortInput
        $filter: [FilterInput]
    ) {
        documentsPaginate(
            first: $first
            page: $page
            search: $search
            sort: $sort
            filter: $filter
        ) {
            data {
                ...document
            }
            paginatorInfo {
                currentPage
                lastPage
                perPage
                total
            }
        }
    }
    ${documentFragment}
`;

export const upsertDocument = gql`
    mutation upsertDocument($input: DocumentInput!) {
        upsertDocument(input: $input) {
            ...document
        }
    }
    ${documentFragment}
`;

export const deleteDocument = gql`
    mutation deleteDocument($id: [ID!]) {
        deleteDocument(id: $id) {
            id
        }
    }
`;

export const documentsCount = gql`
    query documentsCount {
        documentsCount
    }
`;
