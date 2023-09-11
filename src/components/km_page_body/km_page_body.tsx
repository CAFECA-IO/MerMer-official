import KMItem from '../km_item/km_item';
import Pagination from '../pagination/pagination';
import useOuterClick from '../../lib/hooks/use_outer_click';
import useStateRef from 'react-usestateref';
import {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import {KM_PER_PAGE} from '../../constants/config';
import {IKnowledgeManagement} from '../../interfaces/km_article';
import {MdOutlineKeyboardArrowDown} from 'react-icons/md';
import {RiSearchLine} from 'react-icons/ri';
import {TbSortDescending} from 'react-icons/tb';
import {useTranslation} from 'next-i18next';
import {TranslateFunction} from '../../interfaces/locale';

interface IPageProps {
  posts: IKnowledgeManagement[];
  categorys: string[];
}

const KMPageBody = ({posts, categorys}: IPageProps) => {
  const {t}: {t: TranslateFunction} = useTranslation('common');

  const router = useRouter();
  const {category: categoryQuery} = router.query;

  const [kmList, setKmList] = useState<IKnowledgeManagement[]>(posts);
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(Math.ceil(posts.length / KM_PER_PAGE));
  const [search, setSearch, searchRef] = useStateRef('');
  const [sorting, setSorting] = useState('');
  const [category, setCategory] = useState((categoryQuery as string) ?? '');

  // Info: (20230721 - Julian) catagory dropmenu 的開關
  const {
    targetRef: catagoryRef,
    componentVisible: catagoryVisible,
    setComponentVisible: setCatagoryVisible,
  } = useOuterClick<HTMLUListElement>(false);

  // Info: (20230721 - Julian) sorting dropmenu 的開關
  const {
    targetRef: sortRef,
    componentVisible: sortVisible,
    setComponentVisible: setSortVisible,
  } = useOuterClick<HTMLUListElement>(false);

  useEffect(() => {
    const result = posts
      .filter(item => {
        const result = category === '' || !category ? true : item.category.includes(category);
        return result;
      })
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
      .sort((a, b) => (sorting === 'Oldest' ? a.date - b.date : b.date - a.date));
    setKmList(result);
  }, [sorting, category, searchRef.current]);

  useEffect(() => {
    setActivePage(1);
    setTotalPages(Math.ceil(kmList.length / KM_PER_PAGE));
  }, [kmList]);

  const endIdx = activePage * KM_PER_PAGE;
  const startIdx = endIdx - KM_PER_PAGE;

  const sortingText =
    sorting === 'Newest'
      ? t('KM_PAGE.SORT_BY_NEWEST')
      : sorting === 'Oldest'
      ? t('KM_PAGE.SORT_BY_OLDEST')
      : t('KM_PAGE.SORT_BY_TITLE');

  const searchChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setSearch(searchTerm);
  };

  /* Info: (20230721 - Julian) 切換排序方式 */
  const newestSortHandler = () => {
    setSorting('Newest');
    setSortVisible(false);
  };
  const oldestSortHandler = () => {
    setSorting('Oldest');
    setSortVisible(false);
  };

  /* Info: (20230907 - Julian) sort menu */
  const sortingMenu = (
    <div className="relative flex w-90px flex-col items-center text-base hover:cursor-pointer">
      <div
        onClick={() => setSortVisible(!sortVisible)}
        className="flex items-center space-x-2 hover:text-lightBlue1"
      >
        <TbSortDescending />
        <p>{sortingText}</p>
      </div>

      <ul
        ref={sortRef}
        className={`absolute top-8 z-20 flex flex-col bg-mermerTheme px-2 ${
          sortVisible ? 'visible opacity-100' : 'invisible opacity-0'
        } divide-y divide-lightWhite1 shadow-drop transition-all duration-150 ease-in`}
      >
        <li className="min-w-80px p-2 hover:bg-dropDownHover" onClick={newestSortHandler}>
          {t('KM_PAGE.SORT_BY_NEWEST')}
        </li>
        <li className="min-w-80px p-2 hover:bg-dropDownHover" onClick={oldestSortHandler}>
          {t('KM_PAGE.SORT_BY_OLDEST')}
        </li>
      </ul>
    </div>
  );

  /* Info: (20230907 - Julian) category dropmenu */
  const categoryMenu = (
    <div className="relative flex flex-1 flex-col items-start text-base hover:cursor-pointer lg:w-160px lg:flex-none">
      <div
        onClick={() => setCatagoryVisible(!catagoryVisible)}
        className="flex items-center space-x-2 whitespace-nowrap hover:text-lightBlue1"
      >
        <p>{category ? t(category) : t('KM_PAGE.CATEGORY_TITLE')}</p>
        <MdOutlineKeyboardArrowDown />
      </div>

      <ul
        ref={catagoryRef}
        className={`absolute left-0 top-8 z-20 flex flex-col whitespace-nowrap bg-mermerTheme px-2 ${
          catagoryVisible ? 'visible opacity-100' : 'invisible opacity-0'
        } divide-y divide-lightWhite1 shadow-drop transition-all duration-150 ease-in`}
      >
        <li
          className="min-w-80px p-2 hover:bg-dropDownHover"
          onClick={() => {
            setCategory('');
            setCatagoryVisible(false);
          }}
        >
          {t('KM_CATEGORY.ALL')}
        </li>
        {categorys.map((item, i) => (
          <li
            key={i}
            className="min-w-80px p-2 hover:bg-dropDownHover"
            onClick={() => {
              setCategory(item);
              setCatagoryVisible(false);
            }}
          >
            {t(item)}
          </li>
        ))}
      </ul>
    </div>
  );

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
          date={item.date}
        />
      );
    })
    // Info: (20230721 - Julian) 印出當前頁面的 KM
    .slice(startIdx, endIdx);

  const desktopFilter = (
    <div className="hidden w-full items-center space-x-10 lg:flex">
      {/* Info: (20230717 - Julian) category dropmenu */}
      {categoryMenu}
      {/* Info: (20230717 - Julian) search input */}
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
      {/* Info: (20230717 - Julian) sort menu */}
      {sortingMenu}
    </div>
  );

  const mobileFilter = (
    <div className="flex w-300px flex-col items-center space-y-10 pb-10 pt-2 lg:hidden">
      <div className="flex w-full items-center">
        {/* Info: (20230728 - Julian) category dropmenu */}
        {categoryMenu}
        {/* Info: (20230728 - Julian) sort menu */}
        {sortingMenu}
      </div>
      {/* Info: (20230728 - Julian) search input */}
      <div className="relative flex w-full items-center">
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
    </div>
  );

  return (
    <div className="flex w-full flex-col items-center px-5 lg:space-y-16 lg:px-20">
      {desktopFilter}
      {mobileFilter}
      <ul className="grid grid-flow-row grid-cols-1 gap-x-4 gap-y-16 md:grid-cols-2 xl:grid-cols-4">
        {displayKMList}
      </ul>
      <Pagination activePage={activePage} setActivePage={setActivePage} totalPages={totalPages} />
    </div>
  );
};

export default KMPageBody;
