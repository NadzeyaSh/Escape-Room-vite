import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LoadingScreen from '../../components/loading-screen/loading-screen';
import { APIRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import { api } from '../../store';
import { BookingCard } from '../../types/types';
import { Helmet } from 'react-helmet-async';

function Booking():JSX.Element {
  const questData = useAppSelector((state) => state.QuestsData);

  const {id:questId} = useParams();
  const [currentBooking, setCurrentBooking] = useState<BookingCard[] | undefined >();
  const [activePlace, setActivePlace] = useState<BookingCard | null>(null);

  const navigate = useNavigate();
  const currentQuest = questData?.find((item) => item.id === questId);

  useEffect(() => {
    if (currentBooking && currentBooking.length > 0) {
      setActivePlace(currentBooking[0]);
    }
  }, [currentBooking]);

  useEffect(() => {
    if(questId) {
      (async () => {
        try {
          const {data:currentBookingData} = await api.get<BookingCard[]>(`${APIRoute.CurrentQuest}/${questId}/${APIRoute.Booking}`);
          setCurrentBooking(currentBookingData);
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
    <main className="page-content decorated-page">
      <Helmet>
        <title>Бронирование квеста - Escape Room</title>
      </Helmet>
      <div className="decorated-page__decor" aria-hidden="true">
        <picture>
          <source type="image/webp" srcSet={`${currentQuest.previewImgWebp}, ${currentQuest.previewImgWebp} 2x`}/><img src={currentQuest.previewImg} srcSet={`${currentQuest.previewImg} 2x`} width="1366" height="1959" alt=""/>
        </picture>
      </div>
      <div className="container container--size-s">
        <div className="page-content__title-wrapper">
          <h1 className="subtitle subtitle--size-l page-content__subtitle">Бронирование квеста
          </h1>
          <p className="title title--size-m title--uppercase page-content__title">{currentQuest.title}</p>
        </div>
        <div className="page-content__item">
          <div className="booking-map">
            <div className="map">
              <div className="map__container"></div>
            </div>
            <p className="booking-map__address">Вы&nbsp;выбрали: {activePlace?.location.address}</p>
          </div>
        </div>
        <form className="booking-form" action="https://echo.htmlacademy.ru/" method="post">
          <fieldset className="booking-form__section">
            <legend className="visually-hidden">Выбор даты и времени</legend>
            <fieldset className="booking-form__date-section">
              <legend className="booking-form__date-title">Сегодня</legend>
              <div className="booking-form__date-inner-wrapper">
                {activePlace?.slots.today.map((item) => (
                  <label className="custom-radio booking-form__date" key={item.time}>
                    <input type="radio" id="today9h45m" name="date" required value="today9h45m" disabled = {!item.isAvailable}/>
                    <span className="custom-radio__label">{item.time}</span>
                  </label>))}
              </div>
            </fieldset>
            <fieldset className="booking-form__date-section">
              <legend className="booking-form__date-title">Завтра</legend>
              <div className="booking-form__date-inner-wrapper">
                {activePlace?.slots.tomorrow.map((item) => (
                  <label className="custom-radio booking-form__date" key={item.time}>
                    <input type="radio" id="tomorrow11h00m" name="date" required value="tomorrow11h00m" disabled = {!item.isAvailable}/><span className="custom-radio__label">{item.time}</span>
                  </label>))}
              </div>
            </fieldset>
          </fieldset>
          <fieldset className="booking-form__section">
            <legend className="visually-hidden">Контактная информация</legend>
            <div className="custom-input booking-form__input">
              <label className="custom-input__label" htmlFor="name">Ваше имя</label>
              <input type="text" id="name" name="name" placeholder="Имя" required pattern="[А-Яа-яЁёA-Za-z'- ]{1,}"/>
            </div>
            <div className="custom-input booking-form__input">
              <label className="custom-input__label" htmlFor="tel">Контактный телефон</label>
              <input type="tel" id="tel" name="tel" placeholder="Телефон" required pattern="[0-9]{10,}"/>
            </div>
            <div className="custom-input booking-form__input">
              <label className="custom-input__label" htmlFor="person">Количество участников</label>
              <input type="number" id="person" name="person" placeholder="Количество участников" required/>
            </div>
            <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--children">
              <input type="checkbox" id="children" name="children" checked/>
              <span className="custom-checkbox__icon">
                <svg width="20" height="17" aria-hidden="true">
                  <use xlinkHref="#icon-tick"></use>
                </svg>
              </span><span className="custom-checkbox__label">Со&nbsp;мной будут дети</span>
            </label>
          </fieldset>
          <button className="btn btn--accent btn--cta booking-form__submit" type="submit">Забронировать</button>
          <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--agreement">
            <input type="checkbox" id="id-order-agreement" name="user-agreement" required/>
            <span className="custom-checkbox__icon">
              <svg width="20" height="17" aria-hidden="true">
                <use xlinkHref="#icon-tick"></use>
              </svg>
            </span>
            <span className="custom-checkbox__label">Я&nbsp;согласен с
              <a className="link link--active-silver link--underlined" href="#">правилами обработки персональных данных</a>&nbsp;и пользовательским соглашением
            </span>
          </label>
        </form>
      </div>
    </main>
  );
}
export default Booking;
