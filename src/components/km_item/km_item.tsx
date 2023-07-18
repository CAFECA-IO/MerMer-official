import Image from 'next/image';
import Link from 'next/link';
import {MERURL} from '../../constants/url';

interface IKMItemProps {
  id: string;
  title: string;
  description: string;
  category: string;
  picture: string;
  authorName: string;
  authorIntro: string;
  authorAvatar: string;
}

const KMItem = ({
  id,
  title,
  description,
  category,
  picture,
  authorName,
  authorIntro,
  authorAvatar,
}: IKMItemProps) => {
  const displayedAuthor = (
    <div className="flex items-center space-x-4 pt-4">
      {/* Info: (20230718 - Julian) Author avatar */}
      <div className="relative flex h-48px w-48px items-center justify-center overflow-hidden rounded-full bg-lightGray2">
        <Image src={authorAvatar} fill style={{objectFit: 'cover'}} alt="author_avatar" />
      </div>
      {/* Info: (20230718 - Julian) Author name */}
      <div className="flex flex-col">
        <p className="text-base text-lightBlue1">{authorName}</p>
        <p className="text-base text-lightWhite1">{authorIntro}</p>
      </div>
    </div>
  );

  return (
    <li>
      <Link
        href={`${MERURL.KM}/${id}`}
        className="flex w-300px flex-col items-center rounded-xl border border-transparent bg-mermerTheme p-5 font-Dosis hover:cursor-pointer hover:border-lightBlue1"
      >
        {/* Info: (20230718 - Julian) Picture */}
        <div className="relative h-200px w-260px">
          <Image src={picture} fill style={{objectFit: 'cover'}} alt="picture" />
        </div>
        <div className="flex flex-col px-4 py-6">
          {/* Info: (20230718 - Julian) Category & Title */}
          <div className="flex flex-col">
            <text className="text-base text-lightWhite1">{category}</text>
            <h2 className="text-xl text-lightBlue1">{title}</h2>
          </div>
          {/* Info: (20230718 - Julian) Description */}
          <p className="py-4 text-base text-lightWhite1">{description}</p>
          {/* Info: (20230718 - Julian) Author */}
          {displayedAuthor}
        </div>
      </Link>
    </li>
  );
};

export default KMItem;
