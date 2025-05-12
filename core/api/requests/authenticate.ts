import { APIRequestContext, APIResponse, expect } from '@playwright/test';
import { authEndpoint } from '../endpoints';

export async function authenticateApi(
   request: APIRequestContext,
   params: { username: string; password: string; grant_type?: string }
): Promise<APIResponse> {
   const response: APIResponse = await request.post(authEndpoint, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      form: {
         grant_type: params.grant_type ? params.grant_type : 'password',
         username: params.username,
         password: params.password,
      },
   });
   return response;
}
