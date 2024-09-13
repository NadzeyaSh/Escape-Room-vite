import { Link } from 'react-router-dom';
import { AppRoute, Filter } from '../../const';
import { CardProps } from '../../types/types';

function Card({data}:{data: CardProps}):JSX.Element {
  return (
    <div className="quest-card">
      <div className="quest-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`${data.previewImgWebp}, ${data.previewImgWebp} 2x`}
          />
          <img
            src={data.previewImg}
            srcSet={`${data.previewImg} 2x`}
            width={344}
            height={232}
            alt={data.title}
          />
        </picture>
      </div>
      <div className="quest-card__content">
        <div className="quest-card__info-wrapper">
          <Link className="quest-card__link" to={`/${AppRoute.Quest}/${data.id}`}>
            {data.title}
          </Link>
        </div>
        <ul className="tags quest-card__tags">
          <li className="tags__item">
            <svg width={11} height={14} aria-hidden="true">
              <use xlinkHref="#icon-person" />
            </svg>
            {data.peopleMinMax[0]}&ndash;{data.peopleMinMax[1]}&nbsp;чел
          </li>
          <li className="tags__item">
            <svg width={14} height={14} aria-hidden="true">
              <use xlinkHref="#icon-level" />
            </svg>
            {Filter.LEVELS[`${data.level}`]}
          </li>
        </ul>
      </div>
    </div>

  );
}
export default Card;
