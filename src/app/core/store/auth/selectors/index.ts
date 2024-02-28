import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState, featureName } from "../reducers";

export const selectorAuthState = createFeatureSelector<AuthState>(featureName);

export const selectAuthUser = createSelector(selectorAuthState, (state) => state.user);