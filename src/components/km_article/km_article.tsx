import Image from 'next/image';
import {IAuthor} from '../../interfaces/author_data';
import {timestampToString} from '../../lib/common';

interface IKMArticlerops {
  title: string;
  date: number;
  content: string;
  picture: string;
  author: IAuthor;
}

const KMArticle = ({title, date, content, picture, author}: IKMArticlerops) => {
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
      <div className="relative flex h-440px w-full items-center justify-center bg-authorIntro bg-150 bg-center bg-no-repeat">
        {/* ToDo: (20230718 - Julian) author information */}
        <div className="flex flex-col items-center rounded-3xl bg-glass p-12 px-20 py-10">
          <div className="h-96px w-96px relative"></div>
        </div>
      </div>
    </div>
  );
};

export default KMArticle;
