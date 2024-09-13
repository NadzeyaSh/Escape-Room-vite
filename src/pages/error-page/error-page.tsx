import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AppRoute } from '../../const';

function ErrorPage() {
  return (
    <>
      <Helmet>
        <title>Escape Room: error</title>
      </Helmet>
      <h2 className='title title--size-m page-content__title'>404 Not Found</h2>
      <Link className='btn btn--accent btn--cta quest-page__btn' to={AppRoute.Root}>Вернуться на Главную</Link>
    </>
  );
}

export default ErrorPage;
