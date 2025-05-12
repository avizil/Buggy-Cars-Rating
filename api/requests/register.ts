import { UserCredentials } from '../../types/registration.interface';
import { APIRequestContext, APIResponse } from '@playwright/test';
import { postUserEndpoint } from '../endpoints';

export async function createUser(request: APIRequestContext, data: UserCredentials): Promise<APIResponse> {
   const requestBody: UserCredentials = {
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
   };
   return await request.post(postUserEndpoint, { data: requestBody });
}
