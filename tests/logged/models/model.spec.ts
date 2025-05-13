import { APIResponse, test, expect, APIRequestContext } from '@playwright/test';
import { getModels, getSpecificModel, getSpecificModelJsFetch, vote } from '../../../core/api/requests/model';
import { Model } from '../../../core/utils/types/model';
import { modelApiTest } from '../../fixtures/modelFixtures';
import { createUser } from '../../../core/api/requests/register';
import { generateRandomUserCreds } from '../../../core/utils/utils';
import { UserCredentials } from '../../../core/utils/types/userCredentails.interface';
import { authenticateApi } from '../../../core/api/requests/authenticate';
import { AuthResponse } from '../../../core/utils/types/authApiResponse';

test('Verify model list API', async ({ request }) => {
   const res: APIResponse = await getModels(request);
   await expect(res, { message: `GET models failed: ${res.statusText()}` }).toBeOK();
   const resBody = await res.json();
   await expect(resBody, { message: 'Could not find property models on response!' }).toHaveProperty('models');
   await expect(resBody.models.length, { message: 'Response retrieved 0 models!' }).toBeGreaterThan(0);
});

modelApiTest('Verify specific model get API', async ({ request, modelData }) => {
   // Fetch the model
   const res: APIResponse = await getSpecificModel(request, modelData.id!);
   await expect(res, { message: `Error on GET model: ${res.statusText()}` }).toBeOK();
   // Verify request succeeded
   const fetchedModel: Model = (await res.json()) as Model;
   await expect(fetchedModel.name, { message: `Wrong model name!` }).toBe(modelData.name);
   await expect(fetchedModel.make, { message: `Wrong model make!` }).toBe(modelData.make);
});

// As a suser can vote only once, and deleting a vote is not an option - create new user for each execution
modelApiTest('Verify vote & comments are added when using vote API', async ({ request, modelData }) => {
   const randUserCreds: UserCredentials = generateRandomUserCreds();
   await createUser(request, randUserCreds);
   const authRes: APIResponse = await authenticateApi(request, {
      username: randUserCreds.username,
      password: randUserCreds.password,
   });
   const token: string = ((await authRes.json()) as AuthResponse).access_token;
   const res: APIResponse = await vote(request, 'Bearer ' + token, modelData.id!, 'New Comment');
   // Send vote
   await expect(res, { message: `Response was not ok! ${res.status()} - ${res.statusText()}` }).toBeOK();

   // Verify vote + comment were received
   const updatedModel = await getSpecificModelJsFetch(modelData.id!);
   await expect(updatedModel.votes).toBe(modelData.votes! + 1);
   await expect(updatedModel.comments!.length).toBe(modelData.comments!.length + 1);
});
