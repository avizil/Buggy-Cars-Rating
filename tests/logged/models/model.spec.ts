import { APIResponse, test, expect, APIRequestContext } from '@playwright/test';
import { getModels, getSpecificModel, vote } from '../../../core/api/requests/model';
import { Model } from '../../../core/utils/types/model';
import { getAuthPhrase } from '../../../core/utils/authJsonHelper';

test('Verify model list API', async ({ request }) => {
   const res: APIResponse = await getModels(request);
   await expect(res, { message: `GET models failed: ${res.statusText()}` }).toBeOK();
   const resBody = await res.json();
   await expect(resBody, { message: 'Could not find property models on response!' }).toHaveProperty('models');
   await expect(resBody.models.length, { message: 'Response retrieved 0 models!' }).toBeGreaterThan(0);
});

test('Verify specific model get API', async ({ request }) => {
   // Get a model ID & details to fetch
   const modelData: Model = await getReferenceModel(request)[0];
   // Fetch the found model ID
   const res: APIResponse = await getSpecificModel(request, modelData.id!);
   await expect(res, { message: `Error on GET model: ${res.statusText()}` }).toBeOK();
   // Verify data integrity
   const resBody = await res.json();
   await expect(resBody.id, { message: `Wrong model ID was fetched!` }).toBe(modelData.id);
   await expect(resBody.name, { message: `Wrong model name!` }).toBe(modelData.name);
   await expect(resBody.make, { message: `Wrong model make!` }).toBe(modelData.make);
});

// Will work only one time per model
test.only('Verify vote & comments are added when using vote API', async ({ request }) => {
   // Post a vote & comment
   const token = await getAuthPhrase();
   const modelsRes: APIResponse = await getModels(request);
   //   console.log(modelsRes);
   const modelData: Model = (await extractModelList(modelsRes))[0];
   console.log((await extractModelList(modelsRes))[0]);
   const comment: string = 'API Comment!';
   const response: APIResponse = await vote(request, token, modelData.id!, comment);
   await expect(response, { message: `Vote post request failed: ${response.statusText()}` }).toBeOK();
   //    Verify vote & comment have been added
   //    Ideally would use get specific model, but as has issues, use the function as previously
   const updatedResponse: APIResponse = await getModels(request);
   const updatedModelList: Model[] = await extractModelList(updatedResponse);
   let updatedModel: Model;
   // In case the order changes, find the voted model
   for (const mod of updatedModelList) {
      if (mod.id === modelData.id) {
         updatedModel = mod;
         break;
      }
   }
   if (!updatedModel!) throw new Error(`Failed to find the model ${modelData.id} in the newly fetched models!`);
   await expect(updatedModel.votes, { message: 'Total votes counter has not changed!' }).toBe(modelData.votes! + 1);
   await expect(updatedModel.totalComments, { message: 'Total comments counter has not changed!' }).toBe(
      modelData.totalComments! + 1
   );
});

//------------------------------------------------------------------- Helper functions --------------------------------------------------------------------------------------------------
/**
 * Fetch the first model from the models endpoint
 * @param request
 * @returns Object with model ID, name and make
 */
async function getReferenceModel(request: APIRequestContext): Promise<Model[]> {
   const modelsRes: APIResponse = await getModels(request);
   const modelResBody = await modelsRes.json();
   console.log(modelResBody);
   const fetchedModelList: Model[] = modelResBody.models;
   await expect(fetchedModelList.length, { message: 'Response retrieved 0 models!' }).toBeGreaterThan(0); // Verify size, to get a user friendly error in case GET models has issues
   return fetchedModelList;
}

async function extractModelList(response: APIResponse): Promise<Model[]> {
   const modelResBody = await response.json();
   //    console.log(modelResBody.models as Model[]);
   return modelResBody.models as Model[];
}
