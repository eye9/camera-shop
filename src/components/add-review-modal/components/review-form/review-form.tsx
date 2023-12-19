import cn from 'classnames';
import {
  MutableRefObject,
  useState,
  useRef,
  Dispatch,
  SetStateAction,
  ChangeEvent,
  FormEvent,
  Fragment,
} from 'react';
import { ReviewFieldsLength, ReviewRateTitles } from '../../../../const';
import { useAppDispatch } from '../../../../hooks/hooks';
import { sendReviewAction } from '../../../../store/api-actions';
import { MAX_STARS } from '../../../rating-element/rating-element-utils';
import { Product } from '../../../../types/product';

type ReviewFormProps = {
  product: Product;
  focusOn: MutableRefObject<HTMLInputElement | null>;
};

export function ReviewForm({ product, focusOn }: ReviewFormProps) {
  const dispatch = useAppDispatch();

  const [isValidRating, setRaitingValidity] = useState(true);
  const [isValidName, setUserNameValidity] = useState(true);
  const [isValidAdvantage, setAdvantageValidity] = useState(true);
  const [isValidDisadvantage, setDisadvantageValidity] = useState(true);
  const [isValidReview, setReviewValidity] = useState(true);

  const [raiting, setRaiting] = useState(0);
  const userNameRef = focusOn;
  const advantageRef = useRef<HTMLInputElement | null>(null);
  const disadvantageRef = useRef<HTMLInputElement | null>(null);
  const reviewRef = useRef<HTMLTextAreaElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  function ValidateRaiting() {
    if (raiting === 0) {
      setRaitingValidity(false);
    }

    return Boolean(raiting);
  }

  const ValidateTextField = (
    field: MutableRefObject<HTMLInputElement | HTMLTextAreaElement | null>,
    dispatchFn: Dispatch<SetStateAction<boolean>>
  ): boolean => {
    const isValid =
      field.current !== null &&
      field.current.value.length >= ReviewFieldsLength.Min &&
      field.current.value.length <= ReviewFieldsLength.Max;

    dispatchFn(isValid);
    return isValid;
  };

  const validateForm = () =>
    ValidateRaiting() &&
    ValidateTextField(userNameRef, setUserNameValidity) &&
    ValidateTextField(advantageRef, setAdvantageValidity) &&
    ValidateTextField(disadvantageRef, setDisadvantageValidity) &&
    ValidateTextField(reviewRef, setReviewValidity);

  const handleRaitingInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRaiting(+e.target.value);
    setRaitingValidity(true);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (validateForm()) {
      dispatch(
        sendReviewAction({
          rating: raiting,
          cameraId: product.id,
          userName: userNameRef.current?.value,
          advantage: advantageRef.current?.value,
          disadvantage: disadvantageRef.current?.value,
          review: reviewRef.current?.value,
        })
      );
      formRef.current?.reset();
    }
  };

  return (
    <div className="form-review">
      <form method="post" onSubmit={handleSubmit} noValidate ref={formRef}>
        <div className="form-review__rate">
          <fieldset
            className={cn('rate form-review__item', {
              'is-invalid': !isValidRating,
            })}
          >
            <legend className="rate__caption">
              Рейтинг
              <svg width={9} height={9} aria-hidden="true">
                <use xlinkHref="#icon-snowflake" />
              </svg>
            </legend>
            <div className="rate__bar">
              <div className="rate__group">
                {Array.from({ length: MAX_STARS }, (_, k) => MAX_STARS - k).map(
                  (i) => (
                    <Fragment key={`fragment-${i}`}>
                      <input
                        className="visually-hidden"
                        id={`star-${i}`}
                        name="rate"
                        type="radio"
                        defaultValue={i}
                        onChange={handleRaitingInputChange}
                      />
                      <label
                        className="rate__label"
                        htmlFor={`star-${i}`}
                        title={ReviewRateTitles[i - 1]}
                      />
                    </Fragment>
                  )
                )}
              </div>
              <div className="rate__progress">
                <span className="rate__stars">{raiting}</span> <span>/</span>{' '}
                <span className="rate__all-stars">{MAX_STARS}</span>
              </div>
            </div>
            <p className="rate__message">Нужно оценить товар</p>
          </fieldset>
          <div
            className={cn('custom-input form-review__item', {
              'is-invalid': !isValidName,
            })}
          >
            <label>
              <span className="custom-input__label">
                Ваше имя
                <svg width={9} height={9} aria-hidden="true">
                  <use xlinkHref="#icon-snowflake" />
                </svg>
              </span>
              <input
                ref={userNameRef}
                onChange={() =>
                  ValidateTextField(userNameRef, setUserNameValidity)}
                type="text"
                name="user-name"
                placeholder="Введите ваше имя"
                required
              />
            </label>
            <p className="custom-input__error">Нужно указать имя</p>
          </div>
          <div
            className={cn('custom-input form-review__item', {
              'is-invalid': !isValidAdvantage,
            })}
          >
            <label>
              <span className="custom-input__label">
                Достоинства
                <svg width={9} height={9} aria-hidden="true">
                  <use xlinkHref="#icon-snowflake" />
                </svg>
              </span>
              <input
                ref={advantageRef}
                onChange={() =>
                  ValidateTextField(advantageRef, setAdvantageValidity)}
                type="text"
                name="user-plus"
                placeholder="Основные преимущества товара"
                required
              />
            </label>
            <p className="custom-input__error">Нужно указать достоинства</p>
          </div>
          <div
            className={cn('custom-input form-review__item', {
              'is-invalid': !isValidDisadvantage,
            })}
          >
            <label>
              <span className="custom-input__label">
                Недостатки
                <svg width={9} height={9} aria-hidden="true">
                  <use xlinkHref="#icon-snowflake" />
                </svg>
              </span>
              <input
                ref={disadvantageRef}
                onChange={() =>
                  ValidateTextField(disadvantageRef, setDisadvantageValidity)}
                type="text"
                name="user-minus"
                placeholder="Главные недостатки товара"
                required
              />
            </label>
            <p className="custom-input__error">Нужно указать недостатки</p>
          </div>
          <div
            className={cn('custom-textarea form-review__item', {
              'is-invalid': !isValidReview,
            })}
          >
            <label>
              <span className="custom-textarea__label">
                Комментарий
                <svg width={9} height={9} aria-hidden="true">
                  <use xlinkHref="#icon-snowflake" />
                </svg>
              </span>
              <textarea
                ref={reviewRef}
                onChange={() => ValidateTextField(reviewRef, setReviewValidity)}
                name="user-comment"
                minLength={2}
                placeholder="Поделитесь своим опытом покупки"
                defaultValue={''}
              />
            </label>
            <div className="custom-textarea__error">
              Нужно добавить комментарий
            </div>
          </div>
        </div>
        <button className="btn btn--purple form-review__btn" type="submit">
          Отправить отзыв
        </button>
      </form>
    </div>
  );
}
