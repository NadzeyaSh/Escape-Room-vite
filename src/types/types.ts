import { store } from '../store';

export type CardProps = {
    id: string;
title: string;
previewImg: string;
previewImgWebp: string;
level: string;
type: string;
peopleMinMax: number[];
  }

export type QuestCard = CardProps & {
        description: string;
        coverImg: string;
        coverImgWebp: string;
  }

export type BookingCard = {
      id: string;
      location: {
        address: string;
        coords: number[];
      };
      slots: {
        today: [
          {
            time: string;
            isAvailable: boolean;
          }
        ];
        tomorrow: [
          {
            time: string;
            isAvailable: boolean;
          }
        ];
      };
    }


export interface UserData {
  email: string;
  token: string;
  password: string;
  }

export type AuthData = {
    login: string;
    password: string;
  };
export type AppDispatch = typeof store.dispatch

export type State = ReturnType<typeof store.getState>;

export type GenreFiltration = 'Все квесты'|'Приключения'| 'Ужасы'| 'Мистика'| 'Детектив'| 'Sci-fi';

export type FilterType = {
  [key: string]: {
      [subKey: string]: string;
  };
};

export type City = {
  address: string;
  coords: number[];
  zoom: number;
};
