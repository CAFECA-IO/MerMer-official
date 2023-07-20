import KMItem from '../km_item/km_item';
import Pagination from '../pagination/pagination';
import {IKnowledgeManagement} from '../../interfaces/km_article';
import {useState} from 'react';
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
  const totalPages = 10; //ToDo: (20230718 - Julian) Get total pages

  const displayKMList = briefs.map(item => {
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
  });

  return (
    <div className="flex min-h-screen w-full flex-col font-Dosis">
      {/* ToDo: (20230718 - Julian) Breadcrumb */}
      <div className="px-20 py-10">breadcrumb</div>
      {/* Info: (20230718 - Julian) Page Body */}
      <div className="flex w-full flex-col items-center space-y-16 px-20">
        <div className="flex w-full flex-col items-center space-y-8 lg:flex-row lg:space-x-20 lg:space-y-0">
          {/* Info: (20230717 - Julian) category dropmenu */}
          <div className="flex items-center space-x-2 text-base hover:cursor-pointer">
            <p>{t('KM_PAGE.CATEGORY_TITLE')}</p>
            <MdOutlineKeyboardArrowDown />
          </div>
          {/* Info: (20230717 - Julian) search input */}
          <div className="relative flex flex-1 items-center">
            <input
              type="search"
              className="w-full items-center rounded-full bg-dropDownHover px-10 py-3 text-base"
              placeholder={t('KM_PAGE.SEARCH_PLACEHOLDER')}
            />
            <div className="absolute left-4 text-base font-bold">
              <RiSearchLine />
            </div>
          </div>
          {/* Info: (20230717 - Julian) sort menu */}
          <div className="flex items-center space-x-2 text-base hover:cursor-pointer">
            <TbSortDescending />
            <p>{t('KM_PAGE.SORT_BY_TITLE')}</p>
          </div>
        </div>
        <ul className="flex flex-wrap justify-center gap-x-4 gap-y-16">{displayKMList}</ul>
        {/* ToDo: (20230718 - Julian) Pagination */}
        <Pagination activePage={activePage} setActivePage={setActivePage} totalPages={totalPages} />
      </div>
    </div>
  );
};

export default KMPageBody;
