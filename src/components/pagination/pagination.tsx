import {Dispatch, SetStateAction} from 'react';
import {RiArrowLeftSLine, RiArrowRightSLine} from 'react-icons/ri';
import {useTranslation} from 'next-i18next';
import {TranslateFunction} from '../../interfaces/locale';

interface IPagination {
  activePage: number;
  setActivePage: Dispatch<SetStateAction<number>>;
  totalPages: number;
}

const Pagination = ({activePage, setActivePage, totalPages}: IPagination) => {
  const {t}: {t: TranslateFunction} = useTranslation('common');

  const pagesArr = Array.from({length: totalPages}, (_, i) => i + 1);

  const pages = pagesArr.map(page => {
    return (
      <li key={page} className="flex items-center">
        <button
          onClick={() => setActivePage(page)}
          className={`flex h-40px w-40px items-center justify-center rounded-full p-4 ${
            activePage === page
              ? 'bg-lightBlue1 text-darkBlue4'
              : 'text-lightWhite1 hover:bg-lightBlue1'
          }`}
        >
          {page}
        </button>
      </li>
    );
  });

  const previousBtn = (
    <button
      onClick={() => setActivePage(activePage - 1)}
      disabled={activePage === 1 ? true : false}
      className="flex items-center text-base text-lightWhite1 hover:text-lightBlue1 disabled:text-lightGray1"
    >
      <RiArrowLeftSLine className="text-2xl" />
      <p className="px-2">{t('KM_PAGE.PAGINATION_PREVIOUS')}</p>
    </button>
  );

  const nextBtn = (
    <button
      onClick={() => setActivePage(activePage + 1)}
      disabled={activePage === totalPages ? true : false}
      className="flex items-center text-base text-lightWhite1 hover:text-lightBlue1 disabled:text-lightGray1"
    >
      <p className="px-2">{t('KM_PAGE.PAGINATION_NEXT')}</p>
      <RiArrowRightSLine className="text-2xl" />
    </button>
  );

  return (
    <ul className="mt-10 flex items-center justify-center gap-1 text-sm font-medium">
      <li>{previousBtn}</li>
      {pages}
      <li>{nextBtn}</li>
    </ul>
  );
};

export default Pagination;
