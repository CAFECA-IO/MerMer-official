import Image from 'next/image';
import Link from 'next/link';
import {ImArrowRight2} from 'react-icons/im';
import {IAuthor} from '../../interfaces/author_data';
import {timestampToString} from '../../lib/common';
import {useTranslation} from 'next-i18next';
import {TranslateFunction} from '../../interfaces/locale';
import {MERURL} from '../../constants/url';

interface IKMArticleProps {
  title: string;
  date: number;
  content: string;
  category: string[];
  picture: string;
  author: IAuthor;
}

const KMArticle = ({title, date, content, category, picture, author}: IKMArticleProps) => {
  const {t}: {t: TranslateFunction} = useTranslation('common');

  const parsedBody = content
    /* Info: (20230728 - Julian) h1 字體放大加粗 & 以 margin y 實現段落間距 */
    .replace(/<h1>([^<]+)<\/h1>/g, `<h1 class="font-bold text-4xl my-4">$1</h1>`)
    /* Info: (20230728 - Julian) h2 字體放大加粗 & 以 margin y 實現段落間距 */
    .replace(/<h2>([^<]+)<\/h2>/g, `<h2 class="font-bold text-3xl my-4">$1</h2>`)
    /* Info: (20230719 - Julian) h3 字體放大加粗 & 以 margin y 實現段落間距 */
    .replace(/<h3>([^<]+)<\/h3>/g, `<h3 class="font-bold text-2xl my-4">$1</h3>`)
    /* Info: (20230719 - Julian) h4 字體放大加粗 & 以 margin y 實現段落間距 */
    .replace(/<h4>([^<]+)<\/h4>/g, `<h4 class="font-bold text-lg my-4">$1</h4>`)
    /* Info: (20230719 - Julian) ul, ol, li 縮排及列表樣式 */
    .replace(/<ul>(<\/ul>)?/g, `<ul class="my-4 lg:ml-4 list-disc">$1`)
    .replace(/<ol>(<\/ol>)?/g, `<ol class="my-4 lg:ml-4 list-roman">$1`)
    .replace(/<li>(<\/li>)?/g, `<li class="ml-5">$1`)
    /* Info: (20230719 - Julian) 超連結樣式 */
    .replace(
      /<a /g,
      `<a class="text-lightBlue1 underline hover:text-indigo-300" target="_blank" rel="noopener noreferrer" `
    ) /* Info: (20230719 - Julian) 程式碼區塊 & copy button */
    .replace(
      /<pre><code class="([^"]+)">([^<]+)<\/code><\/pre>/g,
      /* ToDo: (20230721 - Julian) copy button
       * <button class="absolute opacity-70 top-4 text-sm right-4 hover:opacity-100">Copy</button> */
      `<pre class="bg-mermerTheme my-4 p-4 overflow-x-scroll relative"><code class="text-sm $1">$2</code></pre>`
    )
    .replace(/<code>/g, `<code class="px-1 bg-lightGray1">`)
    /* Info: (20230719 - Julian) 表格樣式 */
    .replace(/<th>(<\/th>)?/g, `<th class="border-x border-t border-lightWhite1 p-2">$1`)
    .replace(/<td/g, `<td class="border border-lightWhite1 p-2"`)
    /* Info: (20230719 - Julian) 引用區塊樣式 */
    .replace(/<blockquote/g, `<blockquote class="text-sm my-4 opacity-70"`);

  const displayedCategory = category.map((item, i) => {
    return (
      <Link key={i} href={MERURL.KM + `?category=` + item}>
        <p className="px-1 hover:text-lightBlue1">{t(item)}</p>
      </Link>
    );
  });

  return (
    <div className="min-h-screen w-full font-Dosis">
      <div className="flex flex-col space-y-12 p-10 lg:px-64 lg:py-20">
        {/* Info: (20230718 - Julian) picture */}
        <div className="relative h-300px w-full lg:h-580px">
          <Image src={picture} fill style={{objectFit: 'cover'}} alt="picture" />
        </div>
        {/* Info: (20230718 - Julian) article */}
        <div className="flex flex-col space-y-5 lg:space-y-12">
          {/* Info: (20230718 - Julian) title & date */}
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold text-lightBlue1">{timestampToString(date).date}</h2>
            <h1 className="text-4xl font-bold lg:text-42px">{title}</h1>
          </div>
          {/* Info: (20230718 - Julian) category tags */}
          <div className="flex items-center justify-end">{displayedCategory}</div>
          {/* Info: (20230718 - Julian) content */}
          <div className="text-base leading-loose lg:text-lg">
            <article dangerouslySetInnerHTML={{__html: parsedBody}} />
          </div>
        </div>
      </div>
      {/* Info: (20230718 - Julian) author */}
      <div className="relative flex w-full items-center justify-center bg-authorIntro bg-150 bg-center bg-no-repeat px-5 py-10 lg:h-440px lg:px-20">
        {/* Info: (20230718 - Julian) author information */}
        <div className="flex flex-1 flex-col items-center space-y-4 rounded-3xl bg-glass p-12">
          {/* Info: (20230718 - Julian) author avatar */}
          <div className="relative flex h-96px w-96px items-center justify-center overflow-hidden rounded-full bg-lightGray2">
            <Image
              src={author.avatar}
              fill
              style={{objectFit: 'cover'}}
              alt={`${author.id}_avatar`}
            />
          </div>
          {/* Info: (20230718 - Julian) author name & introduction */}
          <div className="flex flex-col items-center">
            <p className="text-2xl font-bold text-lightBlue1">{t(author.name)}</p>
            <p className="text-lg text-lightWhite1">{t(author.jobTitle)}</p>
          </div>
          <p className="text-lg text-lightWhite1">{t(author.intro)}</p>
          <Link href={`${MERURL.AUTHOR}/${author.id}`} className="group flex items-center">
            <p className="text-sm text-lightBlue1">{t('KM_DETAIL_PAGE.CHECK_AUTHOR')}</p>
            <ImArrowRight2 className="ml-4 transition-all duration-300 ease-in-out group-hover:ml-8" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default KMArticle;
