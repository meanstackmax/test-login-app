export class LoginRequest {
    grant_type: string;
    username: string;
    password: string;
    scope: string;
}

export class AuthResponse {
    access_token: string;
    expires_in: number;
    id_token: string;
    refresh_token: string;
    token_type: string;
}
