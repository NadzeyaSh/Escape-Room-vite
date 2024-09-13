import { Link, useNavigate, useParams } from 'react-router-dom';
import { APIRoute, AppRoute, Filter } from '../../const';
import { useState, useEffect } from 'react';
import { api } from '../../store';
import { QuestCard } from '../../types/types';
import LoadingScreen from '../../components/loading-screen/loading-screen';

function Quest():JSX.Element {
  const {id:questId} = useParams();
  const [currentQuest, setCurrentQuest] = useState<QuestCard | undefined >();
  const navigate = useNavigate();

  useEffect(() => {
    if(questId) {
      (async () => {
        try {
          const {data:currentQuestData} = await api.get<QuestCard>(`${APIRoute.CurrentQuest}/${questId}`);
          setCurrentQuest(currentQuestData);

        } catch {
          navigate('/error');

        }

      })();
    }
  }, [navigate, questId]);
  if(!currentQuest) {
    return (<LoadingScreen />);
  }

  return (
    <main className="decorated-page quest-page">
      <div className="decorated-page__decor" aria-hidden="true">
        <picture>
          <source type="image/webp" srcSet={`${currentQuest.previewImgWebp}, ${currentQuest.coverImgWebp} 2x`}/><img src={currentQuest.previewImg} srcSet={`${currentQuest.coverImg} 2x`} width="1366" height="768" alt=""/>
        </picture>
      </div>
      <div className="container container--size-l">
        <div className="quest-page__content">
          <h1 className="title title--size-l title--uppercase quest-page__title">{currentQuest.title}</h1>
          <p className="subtitle quest-page__subtitle"><span className="visually-hidden">Жанр:</span> {Filter.GENRES[`${currentQuest.type}`]}

          </p>
          <ul className="tags tags--size-l quest-page__tags">
            <li className="tags__item">
              <svg width="11" height="14" aria-hidden="true">
                <use xlinkHref="#icon-person"></use>
              </svg>{currentQuest.peopleMinMax[0]}&ndash;{currentQuest.peopleMinMax[1]}&nbsp;чел
            </li>
            <li className="tags__item">
              <svg width="14" height="14" aria-hidden="true">
                <use xlinkHref="#icon-level"></use>
              </svg>{currentQuest.level}
            </li>
          </ul>
          <p className="quest-page__description">{currentQuest.description}</p>
          <Link className="btn btn--accent btn--cta quest-page__btn" to={AppRoute.Booking}>Забронировать</Link>
        </div>
      </div>
    </main>
  );
}
export default Quest;
