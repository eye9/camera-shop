import { Link } from 'react-router-dom';
import { AppRoutes } from '../../const';

type BreadcrumbsElementProps = {
  lastElement?: string;
};
type BreadcrumsLinkProps = {
  title: string;
  linkTo: string;
};

function BreadcrumsLink({ title, linkTo }: BreadcrumsLinkProps) {
  return (
    <li className="breadcrumbs__item">
      <Link className="breadcrumbs__link" to={linkTo}>
        {title}
        <svg width={5} height={8} aria-hidden="true">
          <use xlinkHref="#icon-arrow-mini" />
        </svg>
      </Link>
    </li>
  );
}

function BreadcrumsText({ title }: Omit<BreadcrumsLinkProps, 'linkTo'>) {
  return (
    <li className="breadcrumbs__item">
      <span className="breadcrumbs__link breadcrumbs__link--active">
        {title}
      </span>
    </li>
  );
}

export function BreadcrumbsElement({ lastElement }: BreadcrumbsElementProps) {
  const elements: BreadcrumsLinkProps[] = [
    { title: 'Главная', linkTo: AppRoutes.Main },
    { title: 'Каталог', linkTo: AppRoutes.Main },
  ];

  if (lastElement) {
    elements.push({ title: lastElement, linkTo: '' });
  }

  return (
    <div className="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          {elements.slice(0, -1).map((element) => (
            <BreadcrumsLink title={element.title} linkTo={element.linkTo} key={element.title}/>
          ))}

          <BreadcrumsText title={elements[elements.length - 1].title} />
        </ul>
      </div>
    </div>
  );
}
