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

export const requestOtp = gql`
    mutation requestOtp($userId: ID!, $sessionKey: String!) {
        requestOtp(user_id: $userId, generated_session_key: $sessionKey) {
            status
            remarks
            error
            expiry
        }
    }
`;

export const verifyOtp = gql`
    mutation verifyOtp($userId: ID!, $sessionKey: String!, $otp: String!) {
        verifyOtp(
            user_id: $userId
            generated_session_key: $sessionKey
            hashed_otp: $otp
        ) {
            status
            remarks
            error
            expiry
        }
    }
`;
