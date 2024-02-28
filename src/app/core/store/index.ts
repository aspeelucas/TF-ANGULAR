import { authReducer, featureName as authFeatureName } from "./auth/reducers";

export const appReducers ={
    [authFeatureName]: authReducer,
};
