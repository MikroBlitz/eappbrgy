import { blotterFragment } from "~/graphql/Fragment";

export const blottersPaginate = gql`
    query blottersPaginate(
        $first: Int!
        $page: Int
        $search: String
        $sort: SortInput
        $filter: [FilterInput]
    ) #        $whereValue: String
    {
        blottersPaginate(
            first: $first
            page: $page
            search: $search
            sort: $sort
            filter: $filter #            where: {
        ) #                OR: [{ column: STATUS, operator: EQ, value: $whereValue }]
        #            }
        {
            data {
                ...blotter
            }
            paginatorInfo {
                currentPage
                lastPage
                perPage
                total
            }
        }
    }
    ${blotterFragment}
`;

export const upsertBlotter = gql`
    mutation upsertBlotter($input: BlotterInput!) {
        upsertBlotter(input: $input) {
            ...blotter
        }
    }
    ${blotterFragment}
`;

export const deleteBlotter = gql`
    mutation deleteBlotter($id: [ID!]) {
        deleteBlotter(id: $id) {
            id
        }
    }
`;

export const blottersCount = gql`
    query blottersCount {
        blottersCount
    }
`;

export const blottersThisWeekCount = gql`
    query blottersThisWeekCount {
        blottersThisWeekCount
    }
`;
