import { AppRoutes } from '../../const';
import { BreadcrumbsElementProps, BreadcrumsText } from './components/breadcrums-text/breadcrumbs-text';
import { BreadcrumsLinkProps, BreadcrumsLink } from './components/breadcrums-link/breadcrums-link';

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
