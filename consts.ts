import 'dotenv/config';
import path from 'path';

export const baseUrl: string = 'https://buggy.justtestit.org/';

export const username = process.env.USER_NAME!;
export const password = process.env.PASSWORD!;
export const firstName = process.env.FIRST_NAME!;
export const lastName = process.env.LAST_NAME!;

export const STORAGE_STATE_PATH: string = path.resolve(__dirname, '.auth', 'login.json');
