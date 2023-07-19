import Image from 'next/image';
import Link from 'next/link';
import {MERURL} from '../../constants/url';
import {IAuthor} from '../../interfaces/author_data';

interface IKMItemProps {
  id: string;
  title: string;
  description: string;
  category: string;
  picture: string;
  author: IAuthor;
}

const KMItem = ({id, title, description, category, picture, author}: IKMItemProps) => {
  const displayedAuthor = (
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
  );

  return (
    <li className="flex w-300px flex-col items-center rounded-xl border border-transparent bg-mermerTheme p-5 font-Dosis hover:cursor-pointer hover:border-lightBlue1">
      {/* ToDo: (20230719 - Julian) Link to KM Detail Page */}
      <Link href={`${MERURL.KM}/km-julian-20230719001` /* `${MERURL.KM}/${id}` */}>
        {/* Info: (20230718 - Julian) Picture */}
        <div className="relative h-200px w-260px">
          <Image src={picture} fill style={{objectFit: 'cover'}} alt="picture" />
        </div>
        <div className="flex flex-col px-4 py-6">
          {/* Info: (20230718 - Julian) Category & Title */}
          <div className="flex flex-col">
            <p className="text-base text-lightWhite1">{category}</p>
            <p className="text-xl text-lightBlue1">{title}</p>
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
