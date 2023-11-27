import { createTypedHooks } from "easy-peasy";
import { RootStoreModel } from "..";

// const typedHooks = createTypedHooks<RootStoreModel>();

// export const useStoreActions = typedHooks.useStoreActions;
// export const useStoreDispatch = typedHooks.useStoreDispatch;
// export const useStoreState = typedHooks.useStoreState;

const { useStoreActions, useStoreState, useStoreDispatch, useStore } =
  createTypedHooks<RootStoreModel>();

export { useStoreActions, useStoreState, useStoreDispatch, useStore };
