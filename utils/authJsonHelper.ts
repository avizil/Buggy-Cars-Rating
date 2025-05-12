import fs from 'fs';
import { STORAGE_STATE_PATH } from '../consts';

function getAuthToken(): string {
   const rawJson = fs.readFileSync(STORAGE_STATE_PATH, 'utf-8');
   const data = JSON.parse(rawJson);
   return data.origins[0].localStorage[0].value;
}

export function getAuthPhrase(): string {
   return `Bearer ${getAuthToken()}`;
}
