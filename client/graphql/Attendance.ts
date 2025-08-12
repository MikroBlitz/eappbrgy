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

export const findAttendanceByDate = gql`
    query attendanceByDate($user_id: ID!, $date: String!) {
        attendanceByDate(user_id: $user_id, date: $date) {
            id
            user {
                name
            }
        }
    }
`;

export const dailyTimeRecord = gql`
    query dailyTimeRecord(
        $first: Int!
        $page: Int
        $filter: [FilterDtr]
        $start: DateTime!
        $end: DateTime!
    ) {
        dailyTimeRecord(
            filter: $filter
            start: $start
            end: $end
            first: $first
            page: $page
        ) {
            data {
                user {
                    id
                    name
                    hourly_rate
                }
                total_hours
                normal_hours
                extra_hours
                salary
                total_working_days
                attendances {
                    date
                    am_time_in
                    am_time_out
                    pm_time_in
                    pm_time_out
                    extra_time_in_1
                    extra_time_out_1
                    extra_time_in_2
                    extra_time_out_2
                }
            }
            paginatorInfo {
                currentPage
                lastPage
                perPage
                total
            }
        }
    }
`;
