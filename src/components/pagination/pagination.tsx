import {Dispatch, SetStateAction} from 'react';
import {RiArrowLeftSLine, RiArrowRightSLine} from 'react-icons/ri';
import {useTranslation} from 'next-i18next';
import {TranslateFunction} from '../../interfaces/locale';

interface IPagination {
  activePage: number;
  setActivePage: Dispatch<SetStateAction<number>>;
  totalPages: number;
}

interface IPageBtnProps {
  page: number;
  clickHandler: () => void;
  isActive: boolean;
}

const PageBtn = ({page, clickHandler, isActive}: IPageBtnProps) => {
  return (
    <button
      onClick={clickHandler}
      className={`flex size-40px items-center justify-center rounded-full p-4 ${
        isActive ? 'bg-lightBlue1 text-darkBlue4' : 'text-lightWhite1 hover:bg-lightBlue1'
      }`}
    >
      {page}
    </button>
  );
};

const Pagination = ({activePage, setActivePage, totalPages}: IPagination) => {
  const {t}: {t: TranslateFunction} = useTranslation('common');

  const pagesArr = Array.from({length: totalPages}, (_, i) => i + 1);

  const pages = pagesArr
    .filter(p => {
      return (
        // Info: (20250605 - Julian) 保留當前頁數和前後各兩頁
        (p === activePage || (p >= activePage - 2 && p <= activePage + 2)) &&
        // Info: (20250605 - Julian) 移除首尾
        p !== totalPages &&
        p !== 1
      );
    })
    .map(page => {
      return (
        <li key={page} className="flex items-center">
          <button
            onClick={() => setActivePage(page)}
            className={`flex size-40px items-center justify-center rounded-full p-4 ${
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

  // Info: (20250605 - Julian) 上一頁按鈕
  const previousBtn = (
    <button
      onClick={() => setActivePage(activePage - 1)}
      // Info: (20230907 - Julian) 總頁數為 0 或 當前頁數為第一頁時，按鈕 disabled
      disabled={totalPages === 0 || activePage === 1 ? true : false}
      className="flex items-center text-base text-lightWhite1 hover:text-lightBlue1 disabled:text-lightGray1"
    >
      <RiArrowLeftSLine className="text-2xl" />
      <p className="px-2">{t('KM_PAGE.PAGINATION_PREVIOUS')}</p>
    </button>
  );

  // Info: (20250605 - Julian) 下一頁按鈕
  const nextBtn = (
    <button
      onClick={() => setActivePage(activePage + 1)}
      // Info: (20230907 - Julian) 總頁數為 0 或 當前頁數為最後一頁時，按鈕 disabled
      disabled={totalPages === 0 || activePage === totalPages ? true : false}
      className="flex items-center text-base text-lightWhite1 hover:text-lightBlue1 disabled:text-lightGray1"
    >
      <p className="px-2">{t('KM_PAGE.PAGINATION_NEXT')}</p>
      <RiArrowRightSLine className="text-2xl" />
    </button>
  );

  // Info: (20250605 - Julian) 第一頁按鈕
  const firstPageBtn = (
    <PageBtn page={1} clickHandler={() => setActivePage(1)} isActive={activePage === 1} />
  );

  // Info: (20250605 - Julian) 最後一頁按鈕
  const lastPageBtn = totalPages !== 1 && (
    <PageBtn
      page={totalPages}
      clickHandler={() => setActivePage(totalPages)}
      isActive={activePage === totalPages}
    />
  );

  return (
    <ul className="mt-10 flex flex-wrap items-center justify-center gap-1 text-sm font-medium">
      {/* Info: (20250605 - Julian) 上一頁 */}
      <li>{previousBtn}</li>

      {/* Info: (20250605 - Julian) 第一頁 */}
      <li>{firstPageBtn}</li>

      {/* Info: (20250605 - Julian) 省略號 */}
      {activePage > 3 && <li className="text-lightWhite1">...</li>}

      {/* Info: (20250605 - Julian) 當前頁數 */}
      {pages}

      {/* Info: (20250605 - Julian) 省略號 */}
      {activePage < totalPages - 2 && <li className="text-lightWhite1">...</li>}

      {/* Info: (20250605 - Julian) 最後一頁 */}
      <li>{lastPageBtn}</li>

      {/* Info: (20250605 - Julian) 下一頁 */}
      <li>{nextBtn}</li>
    </ul>
  );
};

export default Pagination;
