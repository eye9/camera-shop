import { Link } from 'react-router-dom';
import { AppRoutes } from '../../const';
import { Helmet } from 'react-helmet-async';
import './style.css';

export function NotFound() {
  return (
    <div className="wrapper container">
      <Helmet>
        <title>Страница не найдена - Фотошоп</title>
      </Helmet>
      <main>
        <h1>404 Not Found</h1>
        <Link to={AppRoutes.Main}>На главную</Link>
      </main>
    </div>
  );
}
