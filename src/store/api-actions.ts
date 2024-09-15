import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { State } from 'history';
import { AppDispatch, AuthData, CardProps, UserData } from '../types/types';
import { redirectToRoute, requireAuthorization, setQuestsData } from './actions';
import { APIRoute, AppRoute, AuthorizationStatus } from '../const';
import { saveToken, dropToken } from '../services/token';

export const fetchQuestAction = createAsyncThunk<void, undefined, {dispatch: AppDispatch; state: State; extra: AxiosInstance}>(
  'fetchQuests',
  async (_arg, {dispatch, extra: api}) => {
    const { data } = await api.get<CardProps[]>(APIRoute.Quest);
    dispatch(setQuestsData({ questsData: data }));

  },
);
export const loginAction = createAsyncThunk<void, AuthData, {dispatch: AppDispatch; state: State; extra: AxiosInstance}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    const {data} = await api.get<UserData>(APIRoute.Login);
    dispatch(requireAuthorization({userData: data, authStatus: AuthorizationStatus.Auth}));
    dispatch(redirectToRoute(AppRoute.Root));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {dispatch: AppDispatch; state: State; extra: AxiosInstance}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization({userData: undefined, authStatus: AuthorizationStatus.NoAuth}));
  },
);


export const checkAuthAction = createAsyncThunk<void, undefined, {dispatch: AppDispatch; state: State; extra: AxiosInstance}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<UserData>(APIRoute.Login);
      dispatch(requireAuthorization({userData: data, authStatus: AuthorizationStatus.Auth}));
    } catch {
      dispatch(requireAuthorization({userData: undefined, authStatus: AuthorizationStatus.NoAuth}));
    }
  },
);
