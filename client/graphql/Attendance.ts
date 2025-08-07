import { attendanceFragment } from "~/graphql/Fragment";

export const attendancePaginate = gql`
    query attendancePaginate(
        $first: Int!
        $page: Int
        $search: String
        $sort: SortInput
        $filter: [FilterInput]
        $whereConditions: QueryAttendancePaginateWhereWhereConditions
    ) {
        attendancePaginate(
            first: $first
            page: $page
            search: $search
            sort: $sort
            filter: $filter
            where: $whereConditions
        ) {
            data {
                ...attendance
            }
            paginatorInfo {
                currentPage
                lastPage
                perPage
                total
            }
        }
    }
    ${attendanceFragment}
`;

export const upsertAttendance = gql`
    mutation upsertAttendance($input: AttendanceInput!) {
        upsertAttendance(input: $input) {
            ...attendance
        }
    }
    ${attendanceFragment}
`;

export const deleteAttendance = gql`
    mutation deleteAttendance($id: [ID!]) {
        deleteAttendance(id: $id) {
            id
        }
    }
`;
