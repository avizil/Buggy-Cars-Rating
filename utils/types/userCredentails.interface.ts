export interface UserCredentials {
   username: string;
   firstName: string;
   lastName: string;
   password: string;
   confirmPassword?: string;
}

export interface Profile {
   username?: string;
   firstName: string;
   lastName: string;
   gender?: string;
   age?: string;
   address?: string;
   phone?: string;
   hobby?: string;
   // For password changes
   currentPassword?: string;
   newPassword?: string;
   newPasswordConfirmation?: string;
}
