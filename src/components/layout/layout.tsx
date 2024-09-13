import { Link, NavLink, Outlet } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/api-actions';

function Layout():JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.AuthorizationStatus);
  const dispatch = useAppDispatch();

  return (
    <div className="wrapper">
      <header className="header">
        <div className="container container--size-l">
          <span className="logo header__logo">
            <svg width="134" height="52" aria-hidden="true">
              <use xlinkHref="#logo"></use>
            </svg>
          </span>
          <nav className="main-nav header__main-nav">
            <ul className="main-nav__list">
              <li className="main-nav__item">
                <NavLink className="link" to='/'>Квесты</NavLink>
              </li>
              <li className="main-nav__item">
                <NavLink className="link" to={AppRoute.Contact}>Контакты</NavLink>
              </li>
              {authorizationStatus === AuthorizationStatus.Auth && (
                <li className="main-nav__item">
                  <NavLink className="link" to={AppRoute.MyQuest}>Мои бронирования
                  </NavLink>
                </li>)}
            </ul>
          </nav>
          <div className="header__side-nav">
            {authorizationStatus !== AuthorizationStatus.Auth ? (
              <Link className="btn header__side-item header__login-btn" to={AppRoute.Login}>Вход</Link>
            ) : (
              <Link className="btn btn--accent header__side-item" to="#" onClick={() => {
                dispatch(logoutAction());
              }}
              >Выйти
              </Link>
            )}
            <Link className="link header__side-item header__phone-link" to="tel:88003335599">8 (000) 111-11-11</Link>
          </div>
        </div>
      </header>
      <Outlet/>
      <footer className="footer">
        <div className="container container--size-l">
          <div className="socials">
            <ul className="socials__list">
              <li className="socials__item">
                <Link className="socials__link" to="#" aria-label="Skype" target="_blank" rel="nofollow noopener noreferrer">
                  <svg className="socials__icon socials__icon--default" width="28" height="28" aria-hidden="true">
                    <use xlinkHref="#icon-skype-default"></use>
                  </svg>
                  <svg className="socials__icon socials__icon--interactive" width="28" height="28" aria-hidden="true">
                    <use xlinkHref="#icon-skype-interactive"></use>
                  </svg>
                </Link>
              </li>
              <li className="socials__item">
                <Link className="socials__link" to="#" aria-label="ВКонтакте" target="_blank" rel="nofollow noopener noreferrer">
                  <svg className="socials__icon socials__icon--default" width="28" height="28" aria-hidden="true">
                    <use xlinkHref="#icon-vk-default"></use>
                  </svg>
                  <svg className="socials__icon socials__icon--interactive" width="28" height="28" aria-hidden="true">
                    <use xlinkHref="#icon-vk-interactive"></use>
                  </svg>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
