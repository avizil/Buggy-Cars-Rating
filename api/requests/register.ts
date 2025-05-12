import { CreateUserRequest } from '../../types/registration.interface';
import { APIRequestContext, APIResponse } from '@playwright/test';
import { postUserEndpoint } from '../endpoints';

export async function createUser(request: APIRequestContext, data: CreateUserRequest): Promise<APIResponse> {
   const requestBody: CreateUserRequest = {
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
   };
   return await request.post(postUserEndpoint, { data: requestBody });
}
