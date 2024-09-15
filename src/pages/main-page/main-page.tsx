import { useState } from 'react';
import CardList from '../../components/card-list/card-list';
import { Filter } from '../../const';
import { useAppSelector } from '../../hooks';
import { Helmet } from 'react-helmet-async';

function MainPage(): JSX.Element {
  const questData = useAppSelector((state) => state.QuestsData);
  const [activeGenre, setActiveGenre] = useState<string>(Object.keys(Filter.GENRES)[0]);
  const [activeLevel, setActiveLevel] = useState<string>('any');


  const filteredQuests = questData && questData.filter((quest) => {
    const genreMatch = activeGenre === Object.keys(Filter.GENRES)[0] || quest.type === activeGenre;
    const levelMatch = activeLevel === 'any' || quest.level === activeLevel;

    return genreMatch && levelMatch;
  });
  const genres = Object.keys(Filter.GENRES);
  const levels = Object.keys(Filter.LEVELS);

  return (
    <main className="page-content">
      <Helmet>
        <title>Escape Room: главная</title>
      </Helmet>
      <div className="container">
        <div className="page-content__title-wrapper">
          <h1 className="subtitle page-content__subtitle">
        квесты в Санкт-Петербурге
          </h1>
          <h2 className="title title--size-m page-content__title">
        Выберите тематику
          </h2>
        </div>
        <div className="page-content__item">
          <form className="filter" action="#" method="get">
            <fieldset className="filter__section">
              <legend className="visually-hidden">Тематика</legend>
              <ul className="filter__list">

                {genres.map((item) =>(
                  <li className="filter__item" key={item} >
                    <input type="radio" name="type" id={item} value={item}
                      checked={activeGenre === item}
                      onChange={() => setActiveGenre(item)}
                    />
                    <label className="filter__label" htmlFor={item}>
                      <svg
                        className="filter__icon"
                        width={26}
                        height={30}
                        aria-hidden="true"
                      >
                        <use xlinkHref={`#icon-${item}`} />
                      </svg>
                      <span className="filter__label-text">{Filter.GENRES[`${item}`]}</span>
                    </label>
                  </li>))}
              </ul>
            </fieldset>
            <fieldset className="filter__section">
              <legend className="visually-hidden">Сложность</legend>
              <ul className="filter__list">
                {levels.map((item) =>(
                  <li className="filter__item" key={item}>
                    <input type="radio" name="level" id={item} checked={activeLevel === item} onChange={() => setActiveLevel(item)}/>
                    <label className="filter__label" htmlFor={item}>
                      <span className="filter__label-text">{Filter.LEVELS[`${item}`]}</span>
                    </label>
                  </li>))}
              </ul>
            </fieldset>
          </form>
        </div>
        <h2 className="title visually-hidden">Выберите квест</h2>

        {filteredQuests && filteredQuests.length > 0 ? (<CardList dataQuests={filteredQuests}/>) : (
          <div className="quest-card__info-wrapper">
        Нет доступных квестов по выбранным фильтрам.
          </div>)}
      </div>
    </main>

  );
}

export default MainPage;
