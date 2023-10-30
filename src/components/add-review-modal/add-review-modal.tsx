import cn from 'classnames';
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { sendReviewAction } from '../../store/api-actions';
import { Product } from '../../types/product';
import { selectReviewModalStatus } from '../../store/selectors';
import { setReviewModalVisibleStatus } from '../../store/actions';

type AddReviewModalProps = {
  product: Product;
};

export function AddReviewModal({ product }: AddReviewModalProps): JSX.Element {
  const dispatch = useAppDispatch();
  const isVisible = useAppSelector(selectReviewModalStatus);
  const RateTitles = ['Ужасно', 'Плохо', 'Нормально', 'Хорошо', 'Отлично'];

  const [isValidRating, setRaitingValidity] = useState(true);
  const [isValidName, setUserNameValidity] = useState(true);
  const [isValidAdvantage, setAdvantageValidity] = useState(true);
  const [isValidDisadvantage, setDisadvantageValidity] = useState(true);
  const [isValidReview, setReviewValidity] = useState(true);

  const [raiting, setRaiting] = useState(0);
  const userNameRef = useRef<HTMLInputElement | null>(null);
  const advantageRef = useRef<HTMLInputElement | null>(null);
  const disadvantageRef = useRef<HTMLInputElement | null>(null);
  const reviewRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    setTimeout(() => userNameRef.current?.focus(), 500);
  });

  function getScrollbarSize() {
    const doc = document.documentElement;
    const dummyScroller = document.createElement('div');
    dummyScroller.setAttribute(
      'style',
      'width:99px;height:99px;position:absolute;top:-9999px;overflow:scroll;'
    );
    doc.appendChild(dummyScroller);
    const scrollbarSize = dummyScroller.offsetWidth - dummyScroller.clientWidth;
    doc.removeChild(dummyScroller);
    return scrollbarSize;
  }

  function hasScrollbar() {
    return document.documentElement.scrollHeight > window.innerHeight;
  }

  useEffect(() => {
    let isOn = false;
    let scrollTop = 0;
    function disableScroll() {
      if (typeof document === 'undefined' || isOn) {
        return;
      }
      const root = document.documentElement;
      scrollTop = window.scrollY;
      if (hasScrollbar()) {
        root.style.width = `calc(100% - ${getScrollbarSize()}px)`;
      } else {
        root.style.width = '100%';
      }
      root.style.position = 'fixed';
      root.style.top = `-${scrollTop}px`;
      root.style.overflow = 'hidden';
      isOn = true;
    }

    function enableScroll() {
      if (typeof document === 'undefined' || !isOn) {
        return;
      }
      const root = document.documentElement;
      root.style.width = '';
      root.style.position = '';
      root.style.top = '';
      root.style.overflow = '';
      // document.documentElement.style.scrollBehavior = '';
      window.scroll(0, scrollTop);
      // root.style.scrollBehavior = 'smooth;';
      isOn = false;
    }
    if (isVisible) {
      disableScroll();
    }
    return () => enableScroll();
  }, [isVisible]);

  function ValidateRaiting() {
    if (raiting === 0) {
      setRaitingValidity(false);
    }
  }

  const ValidateTextField = (
    field: MutableRefObject<HTMLInputElement | HTMLTextAreaElement | null>,
    dispatchFn: Dispatch<SetStateAction<boolean>>
  ): boolean => {
    const isValid =
      field.current !== null &&
      field.current.value.length > 1 &&
      field.current.value.length < 161;

    dispatchFn(isValid);
    return isValid;
  };

  const validateForm = () => {
    ValidateRaiting();
    ValidateTextField(userNameRef, setUserNameValidity);
    ValidateTextField(advantageRef, setAdvantageValidity);
    ValidateTextField(disadvantageRef, setDisadvantageValidity);
    ValidateTextField(reviewRef, setReviewValidity);

    return (
      isValidRating &&
      isValidName &&
      isValidAdvantage &&
      isValidDisadvantage &&
      isValidReview
    );
  };

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
    }
  };

  return (
    <div className={cn('modal', { 'is-active': isVisible })}>
      <div className="modal__wrapper">
        <div
          className="modal__overlay"
          onClick={() => dispatch(setReviewModalVisibleStatus(false))}
        />
        <div className="modal__content">
          <p className="title title--h4">Оставить отзыв</p>
          <div className="form-review">
            <form method="post" onSubmit={handleSubmit} noValidate>
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
            onClick={() => dispatch(setReviewModalVisibleStatus(false))}
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
