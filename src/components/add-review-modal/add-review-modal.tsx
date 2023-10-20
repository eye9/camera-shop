import cn from 'classnames';
import {
  ChangeEvent,
  FormEvent,
  MutableRefObject,
  useRef,
  useState,
} from 'react';
import { useAppDispatch } from '../../hooks/hooks';

export function AddReviewModal(): JSX.Element {
  const isVisible = true;
  const dispatch = useAppDispatch();
  const RateTitles = ['Ужасно', 'Плохо', 'Нормально', 'Хорошо', 'Отлично'];
  const [raiting, setRaiting] = useState(0);

  const userNameRef = useRef<HTMLInputElement | null>(null);
  const advantageRef = useRef<HTMLInputElement | null>(null);
  const disadvantageRef = useRef<HTMLInputElement | null>(null);
  const reviewRef = useRef<HTMLTextAreaElement | null>(null);

  const isValidTextField = (
    field: MutableRefObject<
      HTMLInputElement | HTMLTextAreaElement | null
    >
  ): boolean =>
    field.current !== null &&
    field.current?.value.length !== undefined &&
    field.current?.value.length > 1 &&
    field.current?.value.length < 161;

  const validateForm = () =>
    raiting > 0 &&
    isValidTextField(userNameRef) &&
    isValidTextField(advantageRef) &&
    isValidTextField(disadvantageRef) &&
    isValidTextField(reviewRef);

  const handleRaitingInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRaiting(+e.target.value);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (validateForm()) {
      console.log(true);
      // dispatch(sendReviewAction({}));
    }
  };

  return (
    <div className={cn('modal', { 'is-active': isVisible })}>
      <div className="modal__wrapper">
        <div className="modal__overlay" />
        <div className="modal__content">
          <p className="title title--h4">Оставить отзыв</p>
          <div className="form-review">
            <form method="post" onSubmit={handleSubmit}>
              <div className="form-review__rate">
                <fieldset className="rate form-review__item">
                  <legend className="rate__caption">
                    Рейтинг
                    <svg width={9} height={9} aria-hidden="true">
                      <use xlinkHref="#icon-snowflake" />
                    </svg>
                  </legend>
                  <div className="rate__bar">
                    <div className="rate__group">
                      {[5, 4, 3, 2, 1].map((i) => (
                        <>
                          <input
                            className="visually-hidden"
                            id={`star-${i}`}
                            key={`star-${i}`}
                            name="rate"
                            type="radio"
                            defaultValue={i}
                            onChange={handleRaitingInputChange}
                          />
                          <label
                            key={`star-label-${i}`}
                            className="rate__label"
                            htmlFor={`star-${i}`}
                            title={RateTitles[i - 1]}
                          />
                        </>
                      ))}
                    </div>
                    <div className="rate__progress">
                      <span className="rate__stars">{raiting}</span>{' '}
                      <span>/</span> <span className="rate__all-stars">5</span>
                    </div>
                  </div>
                  <p className="rate__message">Нужно оценить товар</p>
                </fieldset>
                <div className="custom-input form-review__item">
                  <label>
                    <span className="custom-input__label">
                      Ваше имя
                      <svg width={9} height={9} aria-hidden="true">
                        <use xlinkHref="#icon-snowflake" />
                      </svg>
                    </span>
                    <input
                      ref={userNameRef}
                      type="text"
                      name="user-name"
                      placeholder="Введите ваше имя"
                      required
                    />
                  </label>
                  <p className="custom-input__error">Нужно указать имя</p>
                </div>
                <div className="custom-input form-review__item">
                  <label>
                    <span className="custom-input__label">
                      Достоинства
                      <svg width={9} height={9} aria-hidden="true">
                        <use xlinkHref="#icon-snowflake" />
                      </svg>
                    </span>
                    <input
                      ref={advantageRef}
                      type="text"
                      name="user-plus"
                      placeholder="Основные преимущества товара"
                      required
                    />
                  </label>
                  <p className="custom-input__error">
                    Нужно указать достоинства
                  </p>
                </div>
                <div className="custom-input form-review__item">
                  <label>
                    <span className="custom-input__label">
                      Недостатки
                      <svg width={9} height={9} aria-hidden="true">
                        <use xlinkHref="#icon-snowflake" />
                      </svg>
                    </span>
                    <input
                      ref={disadvantageRef}
                      type="text"
                      name="user-minus"
                      placeholder="Главные недостатки товара"
                      required
                    />
                  </label>
                  <p className="custom-input__error">
                    Нужно указать недостатки
                  </p>
                </div>
                <div className="custom-textarea form-review__item">
                  <label>
                    <span className="custom-textarea__label">
                      Комментарий
                      <svg width={9} height={9} aria-hidden="true">
                        <use xlinkHref="#icon-snowflake" />
                      </svg>
                    </span>
                    <textarea
                      ref={reviewRef}
                      name="user-comment"
                      minLength={5}
                      placeholder="Поделитесь своим опытом покупки"
                      defaultValue={''}
                    />
                  </label>
                  <div className="custom-textarea__error">
                    Нужно добавить комментарий
                  </div>
                </div>
              </div>
              <button
                className="btn btn--purple form-review__btn"
                type="submit"
              >
                Отправить отзыв
              </button>
            </form>
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
          >
            <svg width={10} height={10} aria-hidden="true">
              <use xlinkHref="#icon-close" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
