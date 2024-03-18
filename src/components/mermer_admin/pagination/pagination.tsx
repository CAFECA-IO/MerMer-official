import {Dispatch, SetStateAction} from 'react';
import {RiArrowLeftSLine, RiArrowRightSLine} from 'react-icons/ri';

interface IPagination {
  activePage: number;
  setActivePage: Dispatch<SetStateAction<number>>;
  totalPages: number;
}

const Pagination = ({activePage, setActivePage, totalPages}: IPagination) => {
  const pagesArr = Array.from({length: totalPages}, (_, i) => i + 1);
  // 判斷是否顯示某頁碼
  const shouldShowPageNumber = (page: number) => {
    // 總是顯示第一頁和最後一頁
    if (page === 1 || page === totalPages) return true;
    // 在前5頁或後5頁時顯示所有這些頁碼
    if (activePage <= 2) {
      return page <= 5;
    }
    if (activePage > totalPages - 3) {
      return page > totalPages - 5;
    }
    // 其他情況下顯示當前頁面前後兩頁
    return page >= activePage - 2 && page <= activePage + 2;
  };

  const pages = pagesArr.map(page => {
    let pageBtn;
    if (shouldShowPageNumber(page)) {
      pageBtn = (
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
    } else if (
      page === activePage - 3 ||
      page === activePage + 3 ||
      (activePage <= 2 && page === 6) ||
      (activePage > totalPages - 3 && page === totalPages - 5)
    ) {
      // 只在當前頁面前後第三頁顯示省略號
      pageBtn = (
        <li key={page} className="flex items-center">
          <div className={`flex size-40px items-center justify-center rounded-full p-4`}>...</div>
        </li>
      );
    }

    return pageBtn;
  });

  const previousBtn = (
    <button
      onClick={() => setActivePage(activePage - 1)}
      // Info: (20230907 - Julian) 總頁數為 0 或 當前頁數為第一頁時，按鈕 disabled
      disabled={totalPages === 0 || activePage === 1 ? true : false}
      className="flex items-center text-base text-lightWhite1 hover:text-lightBlue1 disabled:text-lightGray1"
    >
      <RiArrowLeftSLine className="text-2xl" />
      {/* <p className="px-2">{t('KM_PAGE.PAGINATION_PREVIOUS')}</p> */}
      <p className="px-2">{'上一頁'}</p>
    </button>
  );

  const nextBtn = (
    <button
      onClick={() => setActivePage(activePage + 1)}
      // Info: (20230907 - Julian) 總頁數為 0 或 當前頁數為最後一頁時，按鈕 disabled
      disabled={totalPages === 0 || activePage === totalPages ? true : false}
      className="flex items-center text-base text-lightWhite1 hover:text-lightBlue1 disabled:text-lightGray1"
    >
      {/* <p className="px-2">{t('KM_PAGE.PAGINATION_NEXT')}</p> */}
      <p className="px-2">{'下一頁'}</p>
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
