import * as dotenv from 'dotenv';
import path from 'path';

/**
 * Configure the env variables to the .env file matching the passed envName variable
 * @param envName Should match the .env file - .env.<envName>
 */
export function loadEnv(envName = 'dev') {
   const envPath = path.resolve(__dirname, '..', 'env', `.env.${envName}`);
   const res = dotenv.config({ path: envPath });
}
