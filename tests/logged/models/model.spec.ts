import { APIResponse, test, expect } from '@playwright/test';
import { getModels, getSpecificModel } from '../../../core/api/requests/model';

test('Verify model list API', async ({ request }) => {
   const res: APIResponse = await getModels(request, 1);
   await expect(res, { message: `GET models failed: ${res.statusText()}` }).toBeOK();
   const resBody = await res.json();
   await expect(resBody, { message: 'Could not find property models on response!' }).toHaveProperty('models');
   await expect(resBody.models.length, { message: 'Response retrieved 0 models!' }).toBeGreaterThan(0);
});

test('Verify specific model get API', async ({ request }) => {
   // Get a model ID to fetch
   const modelsRes: APIResponse = await getModels(request);
   const modelResBody = await modelsRes.json();
   const fetchedModelList = modelResBody.models;
   await expect(fetchedModelList.length, { message: 'Response retrieved 0 models!' }).toBeGreaterThan(0); // Verify size, to get a user friendly error in case GET models has issues
   const modelId: string = fetchedModelList[0].id;
   const modelName: string = fetchedModelList[0].name;
   const make: string = fetchedModelList[0].make;
   // Fetch the found model ID
   const res: APIResponse = await getSpecificModel(request, modelId);
   await expect(res, { message: `Error on GET model: ${res.statusText()}` }).toBeOK();
   // Verify data integrity
   const resBody = await res.json();
   await expect(resBody.modelId).toBe(modelId);
   await expect(resBody.name).toBe(modelName);
   await expect(resBody.make).toBe(make);
});
