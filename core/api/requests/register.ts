import { UserCredentials } from '../../utils/types/userCredentails.interface';
import { APIRequestContext, APIResponse } from '@playwright/test';
import { usersEndpoint } from '../endpoints';

export async function createUser(request: APIRequestContext, data: UserCredentials): Promise<APIResponse> {
   const requestBody: UserCredentials = {
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
   };
   return await request.post(usersEndpoint, { data: requestBody });
}
