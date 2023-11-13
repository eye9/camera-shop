import { BreadcrumsLinkProps } from '../breadcrums-link/breadcrums-link';

export type BreadcrumbsElementProps = {
  lastElement?: string;
};
export function BreadcrumsText({ title }: Omit<BreadcrumsLinkProps, 'linkTo'>) {
  return (
    <li className="breadcrumbs__item">
      <span className="breadcrumbs__link breadcrumbs__link--active">
        {title}
      </span>
    </li>
  );
}
