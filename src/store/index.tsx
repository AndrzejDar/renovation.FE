"use client";

import { createStore } from "easy-peasy";
import appStore, { AppStoreModel } from "./AppStore";
import authStoreModel, { AuthStoreModel } from "./AuthStore";
import appStoreModel from "./AppStore";

export interface RootStoreModel {
  auth: AuthStoreModel;
  app: AppStoreModel;
}

const rootStoreModel: RootStoreModel = {
  auth: authStoreModel,
  app: appStoreModel,
};

const store = createStore(rootStoreModel);

export { store };
