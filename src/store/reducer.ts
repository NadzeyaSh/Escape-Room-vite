import { createReducer } from '@reduxjs/toolkit';
import { CardProps, GenreFiltration, UserData } from '../types/types';
import { requireAuthorization, setQuestsData, setQuestsDataLoadingStatus } from './actions';
import { AuthorizationStatus, FILTERS_GENRE } from '../const';

interface initialStateProps {
    QuestsData: undefined | CardProps[];
    AuthorizationStatus:AuthorizationStatus;
    User: undefined | UserData;
    IsQuestsDataLoading: boolean;
    CurrentFilter: GenreFiltration;

  }

const InitialState: initialStateProps = {

  QuestsData: undefined,
  AuthorizationStatus: AuthorizationStatus.Unknown,
  User: undefined,
  IsQuestsDataLoading: false,
  CurrentFilter: FILTERS_GENRE[0]

} as const;

export const reducer = createReducer(InitialState,(builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.AuthorizationStatus = action.payload.authStatus;
      state.User = action.payload.userData;
    })
    .addCase(setQuestsDataLoadingStatus, (state, action) => {
      state.IsQuestsDataLoading = action.payload;
    })
    .addCase(setQuestsData,(state,action)=>{
      state.QuestsData = action.payload.questsData;
    });
});

