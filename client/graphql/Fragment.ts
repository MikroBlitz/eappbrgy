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
        face_descriptors
        roles {
            id
            name
        }
        #        tasks {
        #            id
        #            title
        #        }
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
        purok {
            id
            name
        }
        barangay {
            id
            name
        }
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
        barangay {
            id
            name
        }
        household {
            id
            household_no
            address
        }
        purok {
            id
            name
        }
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
        created_at
        updated_at
    }
`;

export const blotterFragment = gql`
    fragment blotter on Blotter {
        id
        case_no
        complaint
        status
        details
        incident_date
        complainant {
            id
            name
        }
        respondent {
            id
            name
        }
        barangay {
            id
            name
        }
        created_at
        updated_at
    }
`;

export const officialFragment = gql`
    fragment official on Official {
        id
        position
        term_start
        term_end
        barangay {
            id
            name
        }
        resident {
            id
            name
        }
    }
`;

export const documentFragment = gql`
    fragment document on Document {
        id
        doc_no
        type
        category
        status
        requested_at
        issued_at
        valid_until
        resident {
            id
            name
        }
        createdBy {
            id
            name
        }
        updatedBy {
            id
            name
        }
        created_at
        updated_at
    }
`;

export const barangayFragment = gql`
    fragment barangay on Barangay {
        id
        name
        official {
            id
            resident {
                id
                name
            }
            position
        }
        population
        created_at
        updated_at
    }
`;

export const taskFragment = gql`
    fragment task on Task {
        id
        title
        description
        status
        priority
        order
        createdBy {
            id
            name
        }
        updatedBy {
            id
            name
        }
        created_at
        updated_at
    }
`;
