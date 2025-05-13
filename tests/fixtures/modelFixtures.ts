import { getSpecificModelJsFetch } from '../../core/api/requests/model';
import { Model } from '../../core/utils/types/model';
import { test } from '@playwright/test';

type ModelApiData = {
   modelData: Model;
};

// Model ID to use for testing purposes
const modelId: string = 'ckl2phsabijs71623vk0%7Cckl2phsabijs71623vlg';

export const modelApiTest = test.extend<ModelApiData>({
   modelData: async ({}, use) => {
      const modelData: Model = await getSpecificModelJsFetch(modelId);
      modelData.id = modelId; // Response does not provide ID
      use(modelData);
   },
});
