import Image from 'next/image';
import Link from 'next/link';
import MerMerButton from '../../components/mermer_button/mermer_button';
import {ImArrowRight2} from 'react-icons/im';
import {IAuthor} from '../../interfaces/author_data';
import {timestampToString} from '../../lib/common';
import {useTranslation} from 'next-i18next';
import {TranslateFunction} from '../../interfaces/locale';
import {MERURL} from '../../constants/url';
import PrismLoader from '../../components/prism_loader/prism_loader';
import TableOfContents from '../../components/km_article/table_of_contents';
import {ITableOfContentsItem} from '../../interfaces/table_of_contents';

interface IKMArticleProps {
  title: string;
  date: number;
  content: string;
  category: string[];
  picture: string;
  author: IAuthor;
  tableOfContents: ITableOfContentsItem[];
}

const KMArticle = ({
  title,
  date,
  content,
  category,
  picture,
  author,
  tableOfContents,
}: IKMArticleProps) => {
  const {t}: {t: TranslateFunction} = useTranslation('common');

  const parsedBody = content
    /* Info: (20250606 - Julian) 粗體 */
    .replaceAll(/\u003E\*\*([^<|^\*]+)\*\*/g, `><strong class="font-bold">$1</strong>`)
    /* Info: (20250516 - Julian) 斜體 */
    .replaceAll(/\u003E\*{([^<|^\*]+)\*/g, `><em class="italic">$1</em>`)
    /* Info: (20250606 - Julian) scroll-margin => 用於錨點偏移 */
    /* Info: (20230728 - Julian) h1 字體放大加粗 & 以 margin y 實現段落間距 */
    .replaceAll(/<h1(.*?)>/g, `<h1$1 class="scroll-mt-24 font-bold text-4xl my-4">`)
    /* Info: (20230728 - Julian) h2 字體放大加粗 & 以 margin y 實現段落間距 */
    .replaceAll(/<h2(.*?)>/g, `<h2$1 class="scroll-mt-24 font-bold text-3xl my-4">`)
    /* Info: (20230719 - Julian) h3 字體放大加粗 & 以 margin y 實現段落間距 */
    .replaceAll(/<h3(.*?)>/g, `<h3$1 class="scroll-mt-24 font-bold text-2xl my-4">`)
    /* Info: (20230719 - Julian) h4 字體放大加粗 & 以 margin y 實現段落間距 */
    .replaceAll(/<h4(.*?)>/g, `<h4$1 class="font-bold text-xl my-4">`)
    /* Info: (20230719 - Julian) ul, ol, li 縮排及列表樣式 */
    .replaceAll(/<ul/g, `<ul class="my-4 lg:ml-4 list-disc"`)
    .replaceAll(/<ol/g, `<ol class="my-4 lg:ml-4 list-roman"`)
    .replaceAll(/<li/g, `<li class="ml-5"`)
    /* Info: (20230719 - Julian) 超連結樣式 */
    .replaceAll(
      /<a /g,
      `<a class="text-lightBlue1 underline hover:text-indigo-300" target="_blank" rel="noopener noreferrer" `
    ) /* Info: (20230719 - Julian) 程式碼區塊 */
    .replaceAll(
      /<pre><code class="([^"]+)">([^<]+)<\/code><\/pre>/g,
      `<pre class="$1 line-numbers relative"><code class="text-sm $1">$2</code></pre>`
    )
    /* Info: (20250519 - Julian) 高光樣式 */
    .replaceAll(/<code>/g, `<code class="px-1 py-px rounded-sm mx-1 bg-darkBlue1">`)
    /* Info: (20250519 - Julian) 表格樣式 */
    .replaceAll(
      /<table/g,
      `<div class="my-4 overflow-x-scroll"><table class="lg:table-fixed w-auto"`
    )
    .replaceAll(/<\/table>/g, `</table></div>`)
    .replaceAll(/<th>(<\/th>)?/g, `<th class="border-x border-t border-lightWhite1">$1`)
    .replaceAll(/<td/g, `<td class="border border-lightWhite1 p-2 text-left"`)
    /* Info: (20230719 - Julian) 引用區塊樣式 */
    .replaceAll(/<blockquote/g, `<blockquote class="text-sm my-4 opacity-70"`)
    /* Info: (20250519 - Julian) 分隔線樣式 */
    .replaceAll(/<hr/g, '<hr class="my-4 border-0 p-3px bg-divider"');

  const displayedCategory = category.map((item, i) => (
    <MerMerButton key={i} className="px-4 py-px">
      <Link href={MERURL.KM + `?category=` + item}>{t(item)}</Link>
    </MerMerButton>
  ));

  return (
    <div className="min-h-screen w-full font-Dosis">
      <div className="flex flex-col space-y-12 p-10 lg:py-20">
        {/* Info: (20230718 - Julian) picture */}
        <div className="relative h-300px w-full lg:h-580px lg:px-20">
          <Image src={picture} fill style={{objectFit: 'cover'}} alt="picture" />
        </div>
        {/* Info: (20230718 - Julian) category tags */}
        <div className="flex flex-wrap items-center gap-2 lg:space-y-0 lg:px-20">
          {displayedCategory}
        </div>

        <div className="flex gap-20px">
          <div className="flex flex-1 items-center">
            {/* Info: (20230718 - Julian) article */}
            <div className="flex flex-col space-y-5 lg:space-y-12 lg:px-20">
              {/* Info: (20230718 - Julian) title & date */}
              <div className="flex flex-col items-center">
                <h2 className="text-xl font-bold text-lightBlue1">
                  {timestampToString(date).date}
                </h2>
                <h1 className="text-4xl font-bold lg:text-42px">{title}</h1>
              </div>

              {/* Info: (20230718 - Julian) content */}
              <div className="text-base leading-loose lg:text-lg">
                <article dangerouslySetInnerHTML={{__html: parsedBody}} />
                <PrismLoader />
              </div>
            </div>
          </div>

          {/* Info: (20250605 - Julian) 懸浮目錄 */}
          <TableOfContents contents={tableOfContents} />
        </div>
      </div>
      {/* Info: (20230718 - Julian) author */}
      <div className="relative flex w-full items-center justify-center bg-authorIntro bg-150 bg-center bg-no-repeat px-5 py-10 lg:h-440px lg:px-20">
        {/* Info: (20230718 - Julian) author information */}
        <div className="flex flex-1 flex-col items-center space-y-4 rounded-3xl bg-glass p-12">
          {/* Info: (20230718 - Julian) author avatar */}
          <div className="relative flex size-96px items-center justify-center overflow-hidden rounded-full bg-lightGray2">
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
