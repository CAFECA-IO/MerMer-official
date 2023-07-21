import KMItem from '../km_item/km_item';
import Pagination from '../pagination/pagination';
import useOuterClick from '../../lib/hooks/use_outer_click';
import useStateRef from 'react-usestateref';
import {useState, useEffect} from 'react';
import {KM_PER_PAGE} from '../../constants/config';
import {IKnowledgeManagement} from '../../interfaces/km_article';
import {MdOutlineKeyboardArrowDown} from 'react-icons/md';
import {RiSearchLine} from 'react-icons/ri';
import {TbSortDescending} from 'react-icons/tb';
import {useTranslation} from 'next-i18next';
import {TranslateFunction} from '../../interfaces/locale';

interface IPageProps {
  briefs: IKnowledgeManagement[];
}

const KMPageBody = ({briefs}: IPageProps) => {
  const {t}: {t: TranslateFunction} = useTranslation('common');

  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(Math.ceil(briefs.length / KM_PER_PAGE));
  const [search, setSearch, searchRef] = useStateRef('');
  const [sorting, setSorting] = useState('Newest');

  const {
    targetRef: sortRef,
    componentVisible: sortVisible,
    setComponentVisible: setSortVisible,
  } = useOuterClick<HTMLDivElement>(false);

  useEffect(() => {
    setActivePage(1);
    setTotalPages(Math.ceil(kmList.length / KM_PER_PAGE));
  }, [searchRef.current]);

  const endIdx = activePage * KM_PER_PAGE;
  const startIdx = endIdx - KM_PER_PAGE;

  const kmList = briefs
    .filter(item => {
      const result =
        searchRef.current === '' || !searchRef.current
          ? true
          : item.title.toLowerCase().includes(searchRef.current.toLowerCase()) ||
            item.description.toLowerCase().includes(searchRef.current.toLowerCase()) ||
            // Info: (20230721 - Julian) 用 some() 比對 category 陣列中是否有符合條件的字串
            item.category.some(category =>
              category.toLowerCase().includes(searchRef.current.toLowerCase())
            ) ||
            item.content.toLowerCase().includes(searchRef.current.toLowerCase()) ||
            item.author.name.toLowerCase().includes(searchRef.current.toLowerCase());
      return result;
    })
    .sort((a, b) => (sorting === 'Newest' ? b.date - a.date : a.date - b.date));

  const searchChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setSearch(searchTerm);
  };

  /* Info: (20230721 - Julian) 切換排序方式 */
  const newestSortHandler = () => setSorting('Newest');
  const oldestSortHandler = () => setSorting('Oldest');

  const displayKMList = kmList
    .map(item => {
      return (
        <KMItem
          key={item.id}
          id={item.id}
          title={item.title}
          description={item.description}
          category={item.category}
          picture={item.picture}
          author={item.author}
        />
      );
    })
    // Info: (20230721 - Julian) 印出當前頁面的 KM
    .slice(startIdx, endIdx);

  const displaySearchBar = (
    <div className="relative flex flex-1 items-center">
      <input
        type="search"
        className="w-full items-center rounded-full bg-dropDownHover px-10 py-3 text-base"
        placeholder={t('KM_PAGE.SEARCH_PLACEHOLDER')}
        onChange={searchChangeHandler}
      />
      <div className="absolute left-4 text-base font-bold">
        <RiSearchLine />
      </div>
    </div>
  );

  const displaySortingDropmenu = (
    <div
      ref={sortRef}
      className="relative flex w-90px flex-col items-center text-base hover:cursor-pointer"
    >
      <div className="flex space-x-2" onClick={() => setSortVisible(!sortVisible)}>
        <TbSortDescending />
        <p>{t('KM_PAGE.SORT_BY_TITLE')}</p>
      </div>

      <ul
        className={`absolute right-0 top-8 z-10 flex flex-col bg-mermerTheme ${
          sortVisible ? 'visible opacity-100' : 'invisible opacity-0'
        } transition-all duration-150 ease-in`}
      >
        <li className="w-80px p-2 hover:bg-dropDownHover" onClick={newestSortHandler}>
          {t('KM_PAGE.SORT_BY_NEWEST')}
        </li>
        <li className="w-80px p-2 hover:bg-dropDownHover" onClick={oldestSortHandler}>
          {t('KM_PAGE.SORT_BY_OLDEST')}
        </li>
      </ul>
    </div>
  );

  return (
    <div className="flex w-full flex-col items-center space-y-16 px-20">
      <div className="flex w-full flex-col items-center space-y-8 lg:flex-row lg:space-x-20 lg:space-y-0">
        {/* Info: (20230717 - Julian) category dropmenu */}
        <div className="flex items-center space-x-2 text-base hover:cursor-pointer">
          <p>{t('KM_PAGE.CATEGORY_TITLE')}</p>
          <MdOutlineKeyboardArrowDown />
        </div>
        {/* Info: (20230717 - Julian) search input */}
        {displaySearchBar}
        {/* Info: (20230717 - Julian) sort menu */}
        {displaySortingDropmenu}
      </div>
      <ul className="flex flex-wrap justify-center gap-x-4 gap-y-16">{displayKMList}</ul>
      <Pagination activePage={activePage} setActivePage={setActivePage} totalPages={totalPages} />
    </div>
  );
};

export default KMPageBody;
