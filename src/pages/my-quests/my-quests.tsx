import { Helmet } from 'react-helmet-async';
import CardList from '../../components/card-list/card-list';
import { useAppSelector } from '../../hooks';

function MyQuests():JSX.Element {
  const favoriteQuestData = useAppSelector((state) => state.FavoritesQuestsData);

  return (
    <main className="page-content decorated-page">
      <Helmet>
        <title>Мои бронирования - Escape Room</title>
      </Helmet>
      <div className="decorated-page__decor" aria-hidden="true">
        <picture>
          <source type="image/webp" srcSet="img/content/maniac/maniac-bg-size-m.webp, img/content/maniac/maniac-bg-size-m@2x.webp 2x"/><img src="img/content/maniac/maniac-bg-size-m.jpg" srcSet="img/content/maniac/maniac-bg-size-m@2x.jpg 2x" width="1366" height="1959" alt=""/>
        </picture>
      </div>
      <div className="container">
        <div className="page-content__title-wrapper">
          <h1 className="title title--size-m page-content__title">Мои бронирования</h1>
        </div>
        {favoriteQuestData && favoriteQuestData.length > 0 ? (<CardList dataQuests={favoriteQuestData}/>) : (
          <div className="quest-card__info-wrapper">
      К сожалению, Вы пока ничего не забронировали.
          </div>)}
      </div>
    </main>
  );
}
export default MyQuests;
