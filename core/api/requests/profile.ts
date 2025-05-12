import { Profile, UserCredentials } from '../../utils/types/userCredentails.interface';
import { APIRequestContext, APIResponse } from '@playwright/test';
import { profileEndpoint } from '../endpoints';

export async function getProfile(request: APIRequestContext, token: string): Promise<APIResponse> {
   return await request.get(profileEndpoint, { headers: { Authorization: token } });
}

export async function updateProfile(request: APIRequestContext, token: string, body: Profile): Promise<APIResponse> {
   return await request.put(profileEndpoint, { headers: { Authorization: token }, data: body });
}
