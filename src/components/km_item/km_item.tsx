import Image from 'next/image';
import Link from 'next/link';
import {MERURL} from '../../constants/url';
import {KM_TAG_LIMIT, KM_DESCRIPTION_LIMIT, KM_TITLE_LIMIT} from '../../constants/config';
import {truncateText} from '../../lib/common';
import {IAuthor} from '../../interfaces/author_data';
import {useTranslation} from 'next-i18next';
import {TranslateFunction} from '../../interfaces/locale';
interface IKMItemProps {
  id: string;
  title: string;
  description: string;
  category: string[];
  picture: string;
  author: IAuthor;
}

const KMItem = ({id, title, description, category, picture, author}: IKMItemProps) => {
  const {t}: {t: TranslateFunction} = useTranslation('common');

  const displayedAuthor = (
    <Link href={`${MERURL.AUTHOR}/${author.id}`} className="z-10">
      <div className="flex items-center space-x-4 pt-4">
        {/* Info: (20230718 - Julian) Author avatar */}
        <div className="relative flex h-48px w-48px items-center justify-center overflow-hidden rounded-full bg-lightGray2">
          <Image src={author.avatar} fill style={{objectFit: 'cover'}} alt="author_avatar" />
        </div>
        {/* Info: (20230718 - Julian) Author name */}
        <div className="flex flex-col">
          <p className="text-base text-lightBlue1">{author.name}</p>
          <p className="text-base text-lightWhite1">{author.jobTitle}</p>
        </div>
      </div>
    </Link>
  );

  const displayedTitle = truncateText(title, KM_TITLE_LIMIT);
  const displayedDescription = truncateText(description, KM_DESCRIPTION_LIMIT);

  const displayedCategory = category.slice(0, KM_TAG_LIMIT).map(item => {
    return (
      // ToDo: (20230720 - Julian) Link to Category
      <Link href={MERURL.KM + `?category=` + item} key={item}>
        <p className="px-1 hover:text-lightBlue1" key={item}>
          {t(item)}
        </p>
      </Link>
    );
  });

  return (
    <li className="relative flex h-auto w-300px items-center rounded-xl border border-transparent bg-mermerTheme p-5 font-Dosis hover:cursor-pointer hover:border-lightBlue1">
      <div className="flex flex-col items-center">
        {/* Info: (20230718 - Julian) Picture */}
        <div className="relative h-200px w-260px">
          <Image src={picture} fill style={{objectFit: 'cover'}} alt="picture" />
        </div>
        <div className="flex w-full flex-1 flex-col px-4 py-6">
          {/* Info: (20230718 - Julian) Category & Title */}
          <div className="flex flex-col">
            <div className="z-10 flex items-center whitespace-nowrap text-base text-lightWhite1">
              {displayedCategory}
            </div>
            <p className="text-xl text-lightBlue1">{displayedTitle}</p>
          </div>
          {/* Info: (20230718 - Julian) Description */}
          <p className="py-4 text-base text-lightWhite1">{displayedDescription}</p>
          {/* Info: (20230718 - Julian) Author */}
          {displayedAuthor}
        </div>
      </div>

      {/* ToDo: (20230719 - Julian) Link to KM Detail Page */}
      <Link href={`${MERURL.KM}/${id}`} className="absolute left-0 top-0 h-full w-full"></Link>
    </li>
  );
};

export default KMItem;
