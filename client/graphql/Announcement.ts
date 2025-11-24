import { announcementFragment } from "~/graphql/Fragment";

export const announcementPaginate = gql`
    query announcementPaginate(
        $first: Int!
        $page: Int
        $search: String
        $sort: SortInput
        $filter: [FilterInput]
    ) {
        announcementPaginate(
            first: $first
            page: $page
            search: $search
            sort: $sort
            filter: $filter
        ) {
            data {
                ...announcement
            }
            paginatorInfo {
                currentPage
                lastPage
                perPage
                total
            }
        }
    }
    ${announcementFragment}
`;

export const upsertAnnouncement = gql`
    mutation upsertAnnouncement($input: AnnouncementInput!) {
        upsertAnnouncement(input: $input) {
            ...announcement
        }
    }
    ${announcementFragment}
`;

export const deleteAnnouncement = gql`
    mutation deleteAnnouncement($id: [ID!]) {
        deleteAnnouncement(id: $id) {
            id
        }
    }
`;
