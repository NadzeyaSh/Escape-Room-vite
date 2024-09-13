import { HelmetProvider } from 'react-helmet-async';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import MainPage from '../../pages/main-page/main-page';
import Layout from '../layout/layout';
import Quest from '../../pages/quest/quest';
import Login from '../../pages/login/login';
import Booking from '../../pages/booking/booking';
import Contacts from '../../pages/contacts/contacts';
import ErrorPage from '../../pages/error-page/error-page';
import { useAppSelector } from '../../hooks';
import LoadingScreen from '../loading-screen/loading-screen';
import PrivateRoute from '../private-route/private-route';
import MyQuests from '../../pages/my-quests/my-quests';

function App(): JSX.Element {
  const isQuestsDataLoading = useAppSelector((state) => state.IsQuestsDataLoading);
  const authorizationStatus = useAppSelector((state) => state.AuthorizationStatus);
  // if (isQuestsDataLoading || authorizationStatus === AuthorizationStatus.Unknown) {
  //   return (
  //     < LoadingScreen />
  //   );
  // }
  if (isQuestsDataLoading) {
    return (
      < LoadingScreen />
    );
  }
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Root} element={<Layout/>}>
            <Route
              index element={ <MainPage/>}
            />

            <Route
              path={AppRoute.Login}
              element={ <Login/> }
            />
            <Route
              path={AppRoute.QuestDetail}
              element={ <Quest/> }
            />
            <Route
              path={AppRoute.Contact}
              element={ <Contacts/> }
            />
            <Route
              path={AppRoute.MyQuest}
              element={ <MyQuests/> }
            />
            <Route
              path={AppRoute.Booking}
              element={ <PrivateRoute authorizationStatus={authorizationStatus}><Booking/></PrivateRoute>}
            />
            <Route
              path="*"
              element={<ErrorPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
