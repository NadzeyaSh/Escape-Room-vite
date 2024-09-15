import { FilterType } from './types/types';

export enum AppRoute {
    Root = '/',
    Login = 'login',
    Favorites = 'favorites',
    Booking = '/quest/:id/booking',
    Quest = 'quest',
    QuestDetail = '/quest/:id',
    Contact = 'contact',
    MyQuest = 'my-quest'
  }

export enum APIRoute {
    Quest = 'quest',
    CurrentQuest = '/quest',
    Favorite = '/favorite',
    Login = '/login',
    Logout = '/logout',
    Booking = 'booking'
  }
export enum AuthorizationStatus {
    Auth = 'AUTH',
    NoAuth = 'NO_AUTH',
    Unknown = 'UNKNOWN',
  }

export const FILTERS_GENRE = ['Все квесты','Приключения', 'Ужасы', 'Мистика', 'Детектив', 'Sci-fi'] as const;

export const Filter: FilterType = {
  GENRES: {
    'all-quests': 'Все квесты',
    'adventure': 'Приключения',
    'horror': 'Ужасы',
    'mystic': 'Мистика',
    'detective': 'Детектив',
    'sci-fi': 'Sci-fi'
  },
  LEVELS: {
    'any': 'Любой',
    'easy': 'Лёгкий',
    'medium': 'Средний',
    'hard': 'Сложный'
  }
};
export const CITY_MOCK = {
  address: 'Набережная реки Карповки, 5П',
  coords: [59.968322, 30.317359,],
  zoom: 17
};
