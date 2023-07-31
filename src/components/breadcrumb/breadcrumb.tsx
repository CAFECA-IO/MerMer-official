import Link from 'next/link';
import {FiChevronRight} from 'react-icons/fi';
import {ICrumbItem} from '../../interfaces/crumb_item';

export type BreadcrumbProps = {
  crumbs: ICrumbItem[];
};

const Breadcrumb = ({crumbs}: BreadcrumbProps) => {
  const crumbList = crumbs.map((crumb, i) => {
    const isLast = i === crumbs.length - 1;

    if (!isLast) {
      return (
        <div className="flex items-center space-x-2" key={i}>
          <Link
            href={crumb.path}
            className="text-lightWhite1 hover:text-lightBlue1 hover:underline"
          >
            {crumb.label}
          </Link>
          {/* Info: (20230724 - Julian) separator */}
          <FiChevronRight className="text-2xl" />
        </div>
      );
    } else {
      return (
        <p key={i} className="text-lightBlue1">
          {crumb.label}
        </p>
      );
    }
  });

  return (
    <div className="flex items-center space-x-2 text-center font-Dosis text-sm lg:text-lg">
      {crumbList}
    </div>
  );
};

export default Breadcrumb;
