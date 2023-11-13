import { Link } from 'react-router-dom';

export type BreadcrumsLinkProps = {
  title: string;
  linkTo: string;
};

export function BreadcrumsLink({ title, linkTo }: BreadcrumsLinkProps) {
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
