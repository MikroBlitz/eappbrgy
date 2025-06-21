export const userFragment = gql`
    fragment user on User {
        id
        name
        first_name
        middle_name
        last_name
        email
        phone
        password
        is_admin
        roles {
            id
            name
        }
        #        messages {
        #            ...message
        #        }
        #        contacts {
        #            id
        #        }
        resident {
            id
        }
        is_active
        created_at
        updated_at
        deleted_at
    }
`;

export const householdFragment = gql`
    fragment household on Household {
        id
        household_no
        address
        created_at
        updated_at
    }
`;

export const residentFragment = gql`
    fragment resident on Resident {
        id
        name
        first_name
        middle_name
        last_name
        suffix
        birthdate
        gender
        civil_status
        citizenship
        phone
        email
        created_at
        updated_at
    }
`;

export const messageFragment = gql`
    fragment message on Message {
        id
        message
        sender {
            id
            name
        }
        receiver {
            id
            name
        }
        messagesCount
        created_at
        updated_at
    }
`;

export const roleFragment = gql`
    fragment role on Role {
        id
        name
        guard_name
        users {
            id
            name
        }
        permissions {
            id
            name
        }
        created_at
        updated_at
    }
`;

export const permissionFragment = gql`
    fragment permission on Permission {
        id
        name
        guard_name
        roles {
            id
            name
        }
        created_at
        updated_at
    }
`;
