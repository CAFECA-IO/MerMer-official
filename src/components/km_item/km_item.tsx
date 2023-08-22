import Image from 'next/image';
import Link from 'next/link';
import {MERURL} from '../../constants/url';
import {KM_TAG_LIMIT} from '../../constants/config';
import {IAuthor} from '../../interfaces/author_data';
import {timestampToString} from '../../lib/common';
import {useTranslation} from 'next-i18next';
import {TranslateFunction} from '../../interfaces/locale';
interface IKMItemProps {
  id: string;
  title: string;
  description: string;
  category: string[];
  picture: string;
  author: IAuthor;
  date: number;
}

const KMItem = ({id, title, description, category, picture, author, date}: IKMItemProps) => {
  const {t}: {t: TranslateFunction} = useTranslation('common');

  const dateStr = timestampToString(date).date;

  const displayedAuthor = (
    <Link href={`${MERURL.AUTHOR}/${author.id}`} className="z-10">
      <div className="flex items-center space-x-4 border-t border-lightGray1 pt-4">
        {/* Info: (20230718 - Julian) Author avatar */}
        <div className="relative flex h-48px w-48px items-center justify-center overflow-hidden rounded-full bg-lightGray2">
          <Image src={author.avatar} fill style={{objectFit: 'cover'}} alt="author_avatar" />
        </div>
        {/* Info: (20230718 - Julian) Author name */}
        <div className="flex flex-col">
          <p className="text-base text-lightBlue1">{t(author.name)}</p>
          <p className="text-base text-lightWhite1">{t(author.jobTitle)}</p>
        </div>
      </div>
    </Link>
  );

  const displayedCategory = category.slice(0, KM_TAG_LIMIT).map((item, i) => {
    return (
      <Link key={i} href={MERURL.KM + `?category=` + item}>
        <p className="pr-1 hover:text-lightBlue1">{t(item)}</p>
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
        <div className="flex w-full flex-1 flex-col px-4 py-3">
          {/* Info: (20230718 - Julian) Category & Title */}
          <div className="flex flex-col">
            <div className="z-10 flex w-230px items-center overflow-x-hidden whitespace-nowrap text-sm text-lightWhite1">
              {displayedCategory}
            </div>
            <div className="flex h-56px items-center">
              <h2 className="line-clamp-2 text-xl text-lightBlue1">{title}</h2>
            </div>
          </div>
          {/* Info: (20230718 - Julian) Description */}
          <p className="my-2 line-clamp-3 h-75px text-base text-lightWhite1">{description}</p>
          {/* Info: (20230811 - Julian) Date */}
          <p className="mb-3 text-right text-sm text-lightGray1">{dateStr}</p>
          {/* Info: (20230718 - Julian) Author */}
          {displayedAuthor}
        </div>
      </div>

      {/* Info: (20230719 - Julian) Link to KM Detail Page */}
      <Link href={`${MERURL.KM}/${id}`} className="absolute left-0 top-0 h-full w-full"></Link>
    </li>
  );
};

export default KMItem;
