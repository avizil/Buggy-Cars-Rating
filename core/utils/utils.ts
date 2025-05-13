import { UserCredentials } from './types/userCredentails.interface';

export function generateRandomLabel(length: number = 8): string {
   const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
   let randomStr = '';
   for (let i = 0; i < length; i++) {
      randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
   }
   return `${randomStr}`;
}

export function generateRandomUserCreds(): UserCredentials {
   return {
      username: 'Random' + generateRandomLabel(8),
      firstName: 'Ramdom',
      lastName: 'Random',
      password: 'Random12_' + generateRandomLabel(8),
   };
}
