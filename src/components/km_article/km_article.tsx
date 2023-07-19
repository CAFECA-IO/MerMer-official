import Image from 'next/image';
import Link from 'next/link';
import {ImArrowRight2} from 'react-icons/im';
import {IAuthor} from '../../interfaces/author_data';
import {timestampToString} from '../../lib/common';
import {useTranslation} from 'next-i18next';
import {TranslateFunction} from '../../interfaces/locale';

interface IKMArticlerops {
  title: string;
  date: number;
  content: string;
  picture: string;
  author: IAuthor;
}

const KMArticle = ({title, date, content, picture, author}: IKMArticlerops) => {
  const {t}: {t: TranslateFunction} = useTranslation('common');

  return (
    <div className="min-h-screen w-full font-Dosis">
      <div className="flex flex-col space-y-12 p-20">
        {/* Info: (20230718 - Julian) picture */}
        <div className="relative h-580px w-full">
          <Image src={picture} fill style={{objectFit: 'cover'}} alt="picture" />
        </div>
        {/* Info: (20230718 - Julian) article */}
        <div className="flex flex-col space-y-12">
          {/* Info: (20230718 - Julian) title & date */}
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold text-lightBlue1">{timestampToString(date)}</h2>
            <h1 className="text-42px font-bold">{title}</h1>
          </div>
          {/* Info: (20230718 - Julian) content */}
          <div className="">
            <p>{content}</p>
          </div>
        </div>
      </div>
      {/* Info: (20230718 - Julian) author */}
      <div className="relative flex h-440px w-full items-center justify-center bg-authorIntro bg-150 bg-center bg-no-repeat px-20 py-10">
        {/* ToDo: (20230718 - Julian) author information */}
        <div className="flex flex-1 flex-col items-center space-y-4 rounded-3xl bg-glass p-12">
          {/* Info: (20230718 - Julian) author avatar */}
          <div className="relative flex h-96px w-96px items-center justify-center overflow-hidden rounded-full bg-lightGray2">
            <Image src={author.avatar} fill style={{objectFit: 'cover'}} alt="author_avatar" />
          </div>
          {/* Info: (20230718 - Julian) author name & introduction */}
          <div className="flex flex-col items-center">
            <p className="text-2xl font-bold text-lightBlue1">{author.name}</p>
            <p className="text-lg text-lightWhite1">{author.jobTitle}</p>
          </div>
          <p className="text-lg text-lightWhite1">{author.intro}</p>
          <Link href={'#'} className="group flex items-center">
            <p className="text-sm text-lightBlue1">{t('KM_DETAIL_PAGE.CHECK_AUTHOR')}</p>
            <ImArrowRight2 className="ml-4 transition-all duration-300 ease-in-out group-hover:ml-8" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default KMArticle;
