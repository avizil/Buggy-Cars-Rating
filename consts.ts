import path from 'path';
import { UserCredentials } from './utils/types/userCredentails.interface';

// Configures which .env.* file to use
export const env: string = 'dev';
// URLs
export const baseUrl: string = 'https://buggy.justtestit.org/';
export const profileUrl: string = baseUrl + 'profile';

export const userCreds: UserCredentials = {
   username: process.env.USER_NAME!,
   password: process.env.PASSWORD!,
   firstName: process.env.FIRST_NAME!,
   lastName: process.env.LAST_NAME!,
};

// Configure the path to the state storage
export const STORAGE_STATE_PATH: string = path.resolve(__dirname, '.auth', 'login.json');
