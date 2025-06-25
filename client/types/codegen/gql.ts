/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n    query me {\n        me {\n            id\n            name\n            email\n            is_admin\n            roles {\n                name\n            }\n            permissions {\n                name\n            }\n        }\n    }\n": types.MeDocument,
    "\n    mutation login($email: String!, $password: String!) {\n        login(email: $email, password: $password) {\n            token\n            user {\n                id\n                name\n                email\n                is_admin\n                roles {\n                    name\n                }\n                permissions {\n                    name\n                }\n            }\n        }\n    }\n": types.LoginDocument,
    "\n    mutation logout {\n        logout {\n            message\n        }\n    }\n": types.LogoutDocument,
    "\n    fragment user on User {\n        id\n        name\n        first_name\n        middle_name\n        last_name\n        email\n        phone\n        password\n        is_admin\n        roles {\n            id\n            name\n        }\n        #        messages {\n        #            ...message\n        #        }\n        #        contacts {\n        #            id\n        #        }\n        resident {\n            id\n        }\n        is_active\n        created_at\n        updated_at\n        deleted_at\n    }\n": types.UserFragmentDoc,
    "\n    fragment household on Household {\n        id\n        household_no\n        purok {\n            id\n            name\n        }\n        address\n        created_at\n        updated_at\n    }\n": types.HouseholdFragmentDoc,
    "\n    fragment resident on Resident {\n        id\n        name\n        first_name\n        middle_name\n        last_name\n        suffix\n        birthdate\n        gender\n        civil_status\n        citizenship\n        phone\n        email\n        household {\n            id\n            household_no\n            address\n        }\n        purok {\n            id\n            name\n        }\n        created_at\n        updated_at\n    }\n": types.ResidentFragmentDoc,
    "\n    fragment message on Message {\n        id\n        message\n        sender {\n            id\n            name\n        }\n        receiver {\n            id\n            name\n        }\n        messagesCount\n        created_at\n        updated_at\n    }\n": types.MessageFragmentDoc,
    "\n    fragment role on Role {\n        id\n        name\n        guard_name\n        users {\n            id\n            name\n        }\n        permissions {\n            id\n            name\n        }\n        created_at\n        updated_at\n    }\n": types.RoleFragmentDoc,
    "\n    fragment permission on Permission {\n        id\n        name\n        guard_name\n        created_at\n        updated_at\n    }\n": types.PermissionFragmentDoc,
    "\n    query householdsPaginate(\n        $first: Int!\n        $page: Int\n        $search: String\n        $sort: SortInput\n    ) {\n        householdsPaginate(\n            first: $first\n            page: $page\n            search: $search\n            sort: $sort\n        ) {\n            data {\n                ...household\n            }\n            paginatorInfo {\n                currentPage\n                lastPage\n                perPage\n                total\n            }\n        }\n    }\n    \n": types.HouseholdsPaginateDocument,
    "\n    mutation upsertHousehold($input: HouseholdInput!) {\n        upsertHousehold(input: $input) {\n            ...household\n        }\n    }\n    \n": types.UpsertHouseholdDocument,
    "\n    mutation deleteHousehold($id: [ID!]) {\n        deleteHousehold(id: $id) {\n            id\n        }\n    }\n": types.DeleteHouseholdDocument,
    "\n    query messages($first: Int!, $page: Int, $sender: Mixed, $receiver: Mixed) {\n        messages(\n            first: $first\n            page: $page\n            where: {\n                OR: [\n                    {\n                        AND: [\n                            { column: SENDER_ID, operator: EQ, value: $sender }\n                            {\n                                column: RECEIVER_ID\n                                operator: EQ\n                                value: $receiver\n                            }\n                        ]\n                    }\n                    {\n                        AND: [\n                            {\n                                column: SENDER_ID\n                                operator: EQ\n                                value: $receiver\n                            }\n                            {\n                                column: RECEIVER_ID\n                                operator: EQ\n                                value: $sender\n                            }\n                        ]\n                    }\n                ]\n            }\n        ) {\n            data {\n                ...message\n            }\n            paginatorInfo {\n                currentPage\n                lastPage\n                perPage\n                total\n            }\n        }\n    }\n    \n": types.MessagesDocument,
    "\n    mutation upsertMessage($input: MessageInput!) {\n        upsertMessage(input: $input) {\n            id\n            sender {\n                id\n            }\n            receiver {\n                id\n            }\n            message\n        }\n    }\n": types.UpsertMessageDocument,
    "\n    query permissionsPaginate(\n            $first: Int!\n            $page: Int\n            $search: String\n            $sort: SortInput\n        ) {\n            permissionsPaginate(\n                first: $first\n                page: $page\n                search: $search\n                sort: $sort\n            ) {\n                data {\n                    ...permission\n                }\n                paginatorInfo {\n                    currentPage\n                    lastPage\n                    perPage\n                    total\n                    \n                }\n            }\n        }\n        \n": types.PermissionsPaginateDocument,
    "\n    mutation upsertPermission($input: PermissionInput!){\n        upsertPermission(input: $input){\n            ...permission\n        }\n    }\n    \n": types.UpsertPermissionDocument,
    "\n    mutation deletePermission($id: [ID!]) {\n        deletePermission(id: $id) {\n            id\n        }\n    }\n": types.DeletePermissionDocument,
    "\n    query puroksPaginate(\n        $first: Int!\n        $page: Int\n        $search: String\n        $sort: SortInput\n    ) {\n        puroksPaginate(\n            first: $first\n            page: $page\n            search: $search\n            sort: $sort\n        ) {\n            data {\n                id\n                name\n                created_at\n                updated_at\n            }\n            paginatorInfo {\n                currentPage\n                lastPage\n                perPage\n                total\n            }\n        }\n    }\n": types.PuroksPaginateDocument,
    "\n    mutation upsertPurok($input: PurokInput!) {\n        upsertPurok(input: $input) {\n            id\n            name\n            created_at\n            updated_at\n        }\n    }\n": types.UpsertPurokDocument,
    "\n    mutation deletePurok($id: [ID!]) {\n        deletePurok(id: $id) {\n            id\n        }\n    }\n": types.DeletePurokDocument,
    "\n    query residentsPaginate(\n        $first: Int!\n        $page: Int\n        $search: String\n        $sort: SortInput\n    ) {\n        residentsPaginate(\n            first: $first\n            page: $page\n            search: $search\n            sort: $sort\n        ) {\n            data {\n                ...resident\n            }\n            paginatorInfo {\n                currentPage\n                lastPage\n                perPage\n                total\n            }\n        }\n    }\n    \n": types.ResidentsPaginateDocument,
    "\n    mutation upsertResident($input: ResidentInput!) {\n        upsertResident(input: $input) {\n            ...resident\n        }\n    }\n    \n": types.UpsertResidentDocument,
    "\n    mutation deleteResident($id: [ID!]) {\n        deleteResident(id: $id) {\n            id\n        }\n    }\n": types.DeleteResidentDocument,
    "\n    query residentsCount {\n        residentsCount\n    }\n": types.ResidentsCountDocument,
    "\n    query rolesPaginate(\n        $first: Int!\n        $page: Int\n        $search: String\n        $sort: SortInput\n    ) {\n        rolesPaginate(\n            first: $first\n            page: $page\n            search: $search\n            sort: $sort\n        ) {\n            data {\n                ...role\n            }\n            paginatorInfo {\n                currentPage\n                lastPage\n                perPage\n                total\n            }\n        }\n    }\n    \n": types.RolesPaginateDocument,
    "\n    mutation upsertRole($input: RoleInput!) {\n        upsertRole(input: $input) {\n            ...role\n        }\n    }\n    \n": types.UpsertRoleDocument,
    "\n    mutation deleteRole($id: [ID!]) {\n        deleteRole(id: $id) {\n            id\n        }\n    }\n": types.DeleteRoleDocument,
    "\n    query usersPaginate(\n        $first: Int!\n        $page: Int\n        $search: String\n        $sort: SortInput\n        $filter: [FilterInput]\n    ) {\n        usersPaginate(\n            first: $first\n            page: $page\n            search: $search\n            sort: $sort\n            filter: $filter\n        ) {\n            data {\n                ...user\n            }\n            paginatorInfo {\n                currentPage\n                lastPage\n                perPage\n                total\n            }\n        }\n    }\n    \n": types.UsersPaginateDocument,
    "\n    mutation upsertUser($input: UserInput!) {\n        upsertUser(input: $input) {\n            ...user\n        }\n    }\n    \n": types.UpsertUserDocument,
    "\n    mutation deleteUser($id: [ID!]) {\n        deleteUser(id: $id) {\n            id\n        }\n    }\n": types.DeleteUserDocument,
    "\n    mutation restoreUser($id: ID!) {\n        restoreUser(id: $id) {\n            id\n        }\n    }\n": types.RestoreUserDocument,
    "\n    mutation updateUserStatus($id: ID!, $is_active: Boolean!) {\n        updateUserStatus(id: $id, is_active: $is_active) {\n            id\n            is_active\n        }\n    }\n": types.UpdateUserStatusDocument,
    "\n    mutation registerUser($input: RegisterInput!) {\n        registerUser(input: $input) {\n            ...user\n        }\n    }\n    \n": types.RegisterUserDocument,
    "\n    query usersCount {\n        usersCount\n    }\n": types.UsersCountDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query me {\n        me {\n            id\n            name\n            email\n            is_admin\n            roles {\n                name\n            }\n            permissions {\n                name\n            }\n        }\n    }\n"): (typeof documents)["\n    query me {\n        me {\n            id\n            name\n            email\n            is_admin\n            roles {\n                name\n            }\n            permissions {\n                name\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation login($email: String!, $password: String!) {\n        login(email: $email, password: $password) {\n            token\n            user {\n                id\n                name\n                email\n                is_admin\n                roles {\n                    name\n                }\n                permissions {\n                    name\n                }\n            }\n        }\n    }\n"): (typeof documents)["\n    mutation login($email: String!, $password: String!) {\n        login(email: $email, password: $password) {\n            token\n            user {\n                id\n                name\n                email\n                is_admin\n                roles {\n                    name\n                }\n                permissions {\n                    name\n                }\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation logout {\n        logout {\n            message\n        }\n    }\n"): (typeof documents)["\n    mutation logout {\n        logout {\n            message\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment user on User {\n        id\n        name\n        first_name\n        middle_name\n        last_name\n        email\n        phone\n        password\n        is_admin\n        roles {\n            id\n            name\n        }\n        #        messages {\n        #            ...message\n        #        }\n        #        contacts {\n        #            id\n        #        }\n        resident {\n            id\n        }\n        is_active\n        created_at\n        updated_at\n        deleted_at\n    }\n"): (typeof documents)["\n    fragment user on User {\n        id\n        name\n        first_name\n        middle_name\n        last_name\n        email\n        phone\n        password\n        is_admin\n        roles {\n            id\n            name\n        }\n        #        messages {\n        #            ...message\n        #        }\n        #        contacts {\n        #            id\n        #        }\n        resident {\n            id\n        }\n        is_active\n        created_at\n        updated_at\n        deleted_at\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment household on Household {\n        id\n        household_no\n        purok {\n            id\n            name\n        }\n        address\n        created_at\n        updated_at\n    }\n"): (typeof documents)["\n    fragment household on Household {\n        id\n        household_no\n        purok {\n            id\n            name\n        }\n        address\n        created_at\n        updated_at\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment resident on Resident {\n        id\n        name\n        first_name\n        middle_name\n        last_name\n        suffix\n        birthdate\n        gender\n        civil_status\n        citizenship\n        phone\n        email\n        household {\n            id\n            household_no\n            address\n        }\n        purok {\n            id\n            name\n        }\n        created_at\n        updated_at\n    }\n"): (typeof documents)["\n    fragment resident on Resident {\n        id\n        name\n        first_name\n        middle_name\n        last_name\n        suffix\n        birthdate\n        gender\n        civil_status\n        citizenship\n        phone\n        email\n        household {\n            id\n            household_no\n            address\n        }\n        purok {\n            id\n            name\n        }\n        created_at\n        updated_at\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment message on Message {\n        id\n        message\n        sender {\n            id\n            name\n        }\n        receiver {\n            id\n            name\n        }\n        messagesCount\n        created_at\n        updated_at\n    }\n"): (typeof documents)["\n    fragment message on Message {\n        id\n        message\n        sender {\n            id\n            name\n        }\n        receiver {\n            id\n            name\n        }\n        messagesCount\n        created_at\n        updated_at\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment role on Role {\n        id\n        name\n        guard_name\n        users {\n            id\n            name\n        }\n        permissions {\n            id\n            name\n        }\n        created_at\n        updated_at\n    }\n"): (typeof documents)["\n    fragment role on Role {\n        id\n        name\n        guard_name\n        users {\n            id\n            name\n        }\n        permissions {\n            id\n            name\n        }\n        created_at\n        updated_at\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment permission on Permission {\n        id\n        name\n        guard_name\n        created_at\n        updated_at\n    }\n"): (typeof documents)["\n    fragment permission on Permission {\n        id\n        name\n        guard_name\n        created_at\n        updated_at\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query householdsPaginate(\n        $first: Int!\n        $page: Int\n        $search: String\n        $sort: SortInput\n    ) {\n        householdsPaginate(\n            first: $first\n            page: $page\n            search: $search\n            sort: $sort\n        ) {\n            data {\n                ...household\n            }\n            paginatorInfo {\n                currentPage\n                lastPage\n                perPage\n                total\n            }\n        }\n    }\n    \n"): (typeof documents)["\n    query householdsPaginate(\n        $first: Int!\n        $page: Int\n        $search: String\n        $sort: SortInput\n    ) {\n        householdsPaginate(\n            first: $first\n            page: $page\n            search: $search\n            sort: $sort\n        ) {\n            data {\n                ...household\n            }\n            paginatorInfo {\n                currentPage\n                lastPage\n                perPage\n                total\n            }\n        }\n    }\n    \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation upsertHousehold($input: HouseholdInput!) {\n        upsertHousehold(input: $input) {\n            ...household\n        }\n    }\n    \n"): (typeof documents)["\n    mutation upsertHousehold($input: HouseholdInput!) {\n        upsertHousehold(input: $input) {\n            ...household\n        }\n    }\n    \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation deleteHousehold($id: [ID!]) {\n        deleteHousehold(id: $id) {\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation deleteHousehold($id: [ID!]) {\n        deleteHousehold(id: $id) {\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query messages($first: Int!, $page: Int, $sender: Mixed, $receiver: Mixed) {\n        messages(\n            first: $first\n            page: $page\n            where: {\n                OR: [\n                    {\n                        AND: [\n                            { column: SENDER_ID, operator: EQ, value: $sender }\n                            {\n                                column: RECEIVER_ID\n                                operator: EQ\n                                value: $receiver\n                            }\n                        ]\n                    }\n                    {\n                        AND: [\n                            {\n                                column: SENDER_ID\n                                operator: EQ\n                                value: $receiver\n                            }\n                            {\n                                column: RECEIVER_ID\n                                operator: EQ\n                                value: $sender\n                            }\n                        ]\n                    }\n                ]\n            }\n        ) {\n            data {\n                ...message\n            }\n            paginatorInfo {\n                currentPage\n                lastPage\n                perPage\n                total\n            }\n        }\n    }\n    \n"): (typeof documents)["\n    query messages($first: Int!, $page: Int, $sender: Mixed, $receiver: Mixed) {\n        messages(\n            first: $first\n            page: $page\n            where: {\n                OR: [\n                    {\n                        AND: [\n                            { column: SENDER_ID, operator: EQ, value: $sender }\n                            {\n                                column: RECEIVER_ID\n                                operator: EQ\n                                value: $receiver\n                            }\n                        ]\n                    }\n                    {\n                        AND: [\n                            {\n                                column: SENDER_ID\n                                operator: EQ\n                                value: $receiver\n                            }\n                            {\n                                column: RECEIVER_ID\n                                operator: EQ\n                                value: $sender\n                            }\n                        ]\n                    }\n                ]\n            }\n        ) {\n            data {\n                ...message\n            }\n            paginatorInfo {\n                currentPage\n                lastPage\n                perPage\n                total\n            }\n        }\n    }\n    \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation upsertMessage($input: MessageInput!) {\n        upsertMessage(input: $input) {\n            id\n            sender {\n                id\n            }\n            receiver {\n                id\n            }\n            message\n        }\n    }\n"): (typeof documents)["\n    mutation upsertMessage($input: MessageInput!) {\n        upsertMessage(input: $input) {\n            id\n            sender {\n                id\n            }\n            receiver {\n                id\n            }\n            message\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query permissionsPaginate(\n            $first: Int!\n            $page: Int\n            $search: String\n            $sort: SortInput\n        ) {\n            permissionsPaginate(\n                first: $first\n                page: $page\n                search: $search\n                sort: $sort\n            ) {\n                data {\n                    ...permission\n                }\n                paginatorInfo {\n                    currentPage\n                    lastPage\n                    perPage\n                    total\n                    \n                }\n            }\n        }\n        \n"): (typeof documents)["\n    query permissionsPaginate(\n            $first: Int!\n            $page: Int\n            $search: String\n            $sort: SortInput\n        ) {\n            permissionsPaginate(\n                first: $first\n                page: $page\n                search: $search\n                sort: $sort\n            ) {\n                data {\n                    ...permission\n                }\n                paginatorInfo {\n                    currentPage\n                    lastPage\n                    perPage\n                    total\n                    \n                }\n            }\n        }\n        \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation upsertPermission($input: PermissionInput!){\n        upsertPermission(input: $input){\n            ...permission\n        }\n    }\n    \n"): (typeof documents)["\n    mutation upsertPermission($input: PermissionInput!){\n        upsertPermission(input: $input){\n            ...permission\n        }\n    }\n    \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation deletePermission($id: [ID!]) {\n        deletePermission(id: $id) {\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation deletePermission($id: [ID!]) {\n        deletePermission(id: $id) {\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query puroksPaginate(\n        $first: Int!\n        $page: Int\n        $search: String\n        $sort: SortInput\n    ) {\n        puroksPaginate(\n            first: $first\n            page: $page\n            search: $search\n            sort: $sort\n        ) {\n            data {\n                id\n                name\n                created_at\n                updated_at\n            }\n            paginatorInfo {\n                currentPage\n                lastPage\n                perPage\n                total\n            }\n        }\n    }\n"): (typeof documents)["\n    query puroksPaginate(\n        $first: Int!\n        $page: Int\n        $search: String\n        $sort: SortInput\n    ) {\n        puroksPaginate(\n            first: $first\n            page: $page\n            search: $search\n            sort: $sort\n        ) {\n            data {\n                id\n                name\n                created_at\n                updated_at\n            }\n            paginatorInfo {\n                currentPage\n                lastPage\n                perPage\n                total\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation upsertPurok($input: PurokInput!) {\n        upsertPurok(input: $input) {\n            id\n            name\n            created_at\n            updated_at\n        }\n    }\n"): (typeof documents)["\n    mutation upsertPurok($input: PurokInput!) {\n        upsertPurok(input: $input) {\n            id\n            name\n            created_at\n            updated_at\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation deletePurok($id: [ID!]) {\n        deletePurok(id: $id) {\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation deletePurok($id: [ID!]) {\n        deletePurok(id: $id) {\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query residentsPaginate(\n        $first: Int!\n        $page: Int\n        $search: String\n        $sort: SortInput\n    ) {\n        residentsPaginate(\n            first: $first\n            page: $page\n            search: $search\n            sort: $sort\n        ) {\n            data {\n                ...resident\n            }\n            paginatorInfo {\n                currentPage\n                lastPage\n                perPage\n                total\n            }\n        }\n    }\n    \n"): (typeof documents)["\n    query residentsPaginate(\n        $first: Int!\n        $page: Int\n        $search: String\n        $sort: SortInput\n    ) {\n        residentsPaginate(\n            first: $first\n            page: $page\n            search: $search\n            sort: $sort\n        ) {\n            data {\n                ...resident\n            }\n            paginatorInfo {\n                currentPage\n                lastPage\n                perPage\n                total\n            }\n        }\n    }\n    \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation upsertResident($input: ResidentInput!) {\n        upsertResident(input: $input) {\n            ...resident\n        }\n    }\n    \n"): (typeof documents)["\n    mutation upsertResident($input: ResidentInput!) {\n        upsertResident(input: $input) {\n            ...resident\n        }\n    }\n    \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation deleteResident($id: [ID!]) {\n        deleteResident(id: $id) {\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation deleteResident($id: [ID!]) {\n        deleteResident(id: $id) {\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query residentsCount {\n        residentsCount\n    }\n"): (typeof documents)["\n    query residentsCount {\n        residentsCount\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query rolesPaginate(\n        $first: Int!\n        $page: Int\n        $search: String\n        $sort: SortInput\n    ) {\n        rolesPaginate(\n            first: $first\n            page: $page\n            search: $search\n            sort: $sort\n        ) {\n            data {\n                ...role\n            }\n            paginatorInfo {\n                currentPage\n                lastPage\n                perPage\n                total\n            }\n        }\n    }\n    \n"): (typeof documents)["\n    query rolesPaginate(\n        $first: Int!\n        $page: Int\n        $search: String\n        $sort: SortInput\n    ) {\n        rolesPaginate(\n            first: $first\n            page: $page\n            search: $search\n            sort: $sort\n        ) {\n            data {\n                ...role\n            }\n            paginatorInfo {\n                currentPage\n                lastPage\n                perPage\n                total\n            }\n        }\n    }\n    \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation upsertRole($input: RoleInput!) {\n        upsertRole(input: $input) {\n            ...role\n        }\n    }\n    \n"): (typeof documents)["\n    mutation upsertRole($input: RoleInput!) {\n        upsertRole(input: $input) {\n            ...role\n        }\n    }\n    \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation deleteRole($id: [ID!]) {\n        deleteRole(id: $id) {\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation deleteRole($id: [ID!]) {\n        deleteRole(id: $id) {\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query usersPaginate(\n        $first: Int!\n        $page: Int\n        $search: String\n        $sort: SortInput\n        $filter: [FilterInput]\n    ) {\n        usersPaginate(\n            first: $first\n            page: $page\n            search: $search\n            sort: $sort\n            filter: $filter\n        ) {\n            data {\n                ...user\n            }\n            paginatorInfo {\n                currentPage\n                lastPage\n                perPage\n                total\n            }\n        }\n    }\n    \n"): (typeof documents)["\n    query usersPaginate(\n        $first: Int!\n        $page: Int\n        $search: String\n        $sort: SortInput\n        $filter: [FilterInput]\n    ) {\n        usersPaginate(\n            first: $first\n            page: $page\n            search: $search\n            sort: $sort\n            filter: $filter\n        ) {\n            data {\n                ...user\n            }\n            paginatorInfo {\n                currentPage\n                lastPage\n                perPage\n                total\n            }\n        }\n    }\n    \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation upsertUser($input: UserInput!) {\n        upsertUser(input: $input) {\n            ...user\n        }\n    }\n    \n"): (typeof documents)["\n    mutation upsertUser($input: UserInput!) {\n        upsertUser(input: $input) {\n            ...user\n        }\n    }\n    \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation deleteUser($id: [ID!]) {\n        deleteUser(id: $id) {\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation deleteUser($id: [ID!]) {\n        deleteUser(id: $id) {\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation restoreUser($id: ID!) {\n        restoreUser(id: $id) {\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation restoreUser($id: ID!) {\n        restoreUser(id: $id) {\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation updateUserStatus($id: ID!, $is_active: Boolean!) {\n        updateUserStatus(id: $id, is_active: $is_active) {\n            id\n            is_active\n        }\n    }\n"): (typeof documents)["\n    mutation updateUserStatus($id: ID!, $is_active: Boolean!) {\n        updateUserStatus(id: $id, is_active: $is_active) {\n            id\n            is_active\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation registerUser($input: RegisterInput!) {\n        registerUser(input: $input) {\n            ...user\n        }\n    }\n    \n"): (typeof documents)["\n    mutation registerUser($input: RegisterInput!) {\n        registerUser(input: $input) {\n            ...user\n        }\n    }\n    \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query usersCount {\n        usersCount\n    }\n"): (typeof documents)["\n    query usersCount {\n        usersCount\n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;