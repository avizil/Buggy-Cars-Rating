import * as dotenv from 'dotenv';
import path from 'path';

export function loadEnv(envName = 'dev') {
   const envPath = path.resolve(__dirname, '..', 'env', `.env.${envName}`);
   const res = dotenv.config({ path: envPath });
}
