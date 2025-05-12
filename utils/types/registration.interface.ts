export interface CreateUserRequest {
   username: string;
   firstName: string;
   lastName: string;
   password: string;
   confirmPassword?: string;
}
