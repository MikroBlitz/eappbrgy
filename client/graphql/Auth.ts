export const authMe = gql`
    query me {
        me {
            id
            name
            email
            is_admin
            roles {
                name
            }
            permissions {
                name
            }
        }
    }
`;

export const login = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                id
                name
                email
                is_admin
                roles {
                    name
                }
                permissions {
                    name
                }
            }
        }
    }
`;

export const logout = gql`
    mutation logout {
        logout {
            message
        }
    }
`;
