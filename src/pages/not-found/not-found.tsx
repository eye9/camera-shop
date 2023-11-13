import { Link } from 'react-router-dom';
import { AppRoutes } from '../../const';
import { Helmet } from 'react-helmet-async';

export function NotFound() {
  return (
    <div className="wrapper">
      <Helmet>
        <title>Страница не найдена - Фотошоп</title>
      </Helmet>
      <h1>404 Not Found</h1>
      <Link to={AppRoutes.Main}>На главную</Link>
    </div>
  );
}
