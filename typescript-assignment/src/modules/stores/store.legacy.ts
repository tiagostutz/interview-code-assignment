import Store from "./store.model";

export class StoreLegacyIntegrator {
  async sendToLegacySystem(storeData: Store) {
    // Send store data to legacy system
    console.log("Sent store data to legacy system:", storeData);
    return true;
  }
}
