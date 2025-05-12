import { APIRequestContext, APIResponse } from '@playwright/test';
import { modelEndpoint, specificModelEndpoint, voteEndpoint } from '../endpoints';

/**
 * Make a GET request to fetch a list of car models
 * @param request APIRequestContext
 * @param modelPage the page number to be used in the request query param ?modelPage=
 * @returns
 */
export async function getModels(request: APIRequestContext, modelPage?: number): Promise<APIResponse> {
   const finalEndpoint: string = modelPage ? modelEndpoint + '?modelPage=' + modelPage : modelEndpoint;
   return await request.get(finalEndpoint);
}

/**
 * Make a GET request  to fetch a specific model
 * @param request APIRequestContext
 * @param modelId string
 * @returns
 */
export async function getSpecificModel(request: APIRequestContext, modelId: string): Promise<APIResponse> {
   return await request.get(specificModelEndpoint + modelId);
}

export async function vote(request: APIRequestContext, token: string, modelId: string, comment?: string): Promise<APIResponse> {
   return await request.post(voteEndpoint(modelId), {
      headers: { Authorization: token, 'content-type': 'application/json' },
      data: comment ? { comment: comment } : {},
   });
}
