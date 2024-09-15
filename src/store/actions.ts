import { createAction } from '@reduxjs/toolkit';
import { CardProps, UserData } from '../types/types';
import { AppRoute, AuthorizationStatus } from '../const';

export const setQuestsData = createAction<{questsData: CardProps[]}>('SET_OUESTS_DATA');
export const requireAuthorization = createAction<{userData: UserData | undefined ; authStatus: AuthorizationStatus}>('REQUIRE_AUTHORIZATION');
export const setQuestsDataLoadingStatus = createAction<boolean>('SET_QUESTS_DATA_LOADING_STATUS');
export const redirectToRoute = createAction<AppRoute>('REDIRECT_TO_ROUTE');
export const setFavoriteQuestsData = createAction<{favoritesQuestsData: CardProps[]}>('SET_FAVORITE_QUESTS_DATA');
