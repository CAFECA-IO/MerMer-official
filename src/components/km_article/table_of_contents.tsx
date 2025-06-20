import React, {useState, useEffect} from 'react';
import {ITableOfContentsItem} from '../../interfaces/table_of_contents';
import {IoIosList} from 'react-icons/io';
import MerMerButton from '../mermer_button/mermer_button';
import useOuterClick from '../../lib/hooks/use_outer_click';

interface ITableOfContentsProps {
  contents: ITableOfContentsItem[];
}

const TableOfContents = ({contents}: ITableOfContentsProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const {
    targetRef,
    componentVisible: isOpen,
    setComponentVisible: setIsOpen,
  } = useOuterClick<HTMLDivElement>(false);

  const toggleMenu = () => setIsOpen(prev => !prev);

  useEffect(() => {
    // Info: (20250611 - Julian) 尋找 <article>
    const articles = document.querySelector('article');
    if (!articles) return;

    // Info: (20250611 - Julian) 建立一個新的 IntersectionObserver，會接收到所有被監控的元素是否進入畫面
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          // Info: (20250611 - Julian) 取得元素的 id
          const id = entry.target.getAttribute('id');

          // Info: (20250611 - Julian) 如果元素有 id 且進入可視範圍，則更新 activeIndex
          if (entry.isIntersecting) {
            const index = contents.findIndex(item => item.id === id);
            if (index !== -1) {
              setActiveIndex(index);
            }
          }
        });
      },
      {
        threshold: 0.2, // Info: (20250611 - Julian) 設定閾值，當元素進入 20% 可視範圍時觸發
      }
    );

    // Info: (20250611 - Julian) 監控所有 <article> 中的 h1, h2, h3, h4 元素
    articles.querySelectorAll('h1, h2, h3, h4').forEach(element => {
      if (element.id) {
        observer.observe(element);
      }
    });

    // Info: (20250611 - Julian) 清理監控
    return () => {
      observer.disconnect();
    };
  }, []);

  const displayContent = contents.map(item => {
    const levelStyle =
      item.level === 'h1'
        ? 'w-0'
        : item.level === 'h2'
        ? 'w-4'
        : item.level === 'h3'
        ? 'w-8'
        : 'w-12';

    const isActive = activeIndex === item.index ? 'text-lightBlue1 border-lightBlue1' : '';
    const clickHandler = () => setActiveIndex(item.index);

    return (
      <a
        key={item.id}
        href={`#${item.id}`}
        onClick={clickHandler}
        className={`relative flex break-all border-l-2 border-transparent px-10px text-xs hover:border-lightBlue1 hover:text-lightBlue1 ${isActive}`}
      >
        <span className={`${levelStyle} block opacity-0`}>/</span>
        {item.title}
      </a>
    );
  });

  return (
    <div ref={targetRef} className="sticky top-100px z-10 hidden h-fit lg:flex">
      {/* Info: (20250611 - Julian) 下拉選單 */}
      <div
        className={`absolute right-80px h-fit w-200px shrink-0
      ${isOpen ? 'visible translate-x-0 opacity-100' : 'invisible translate-x-1/2 opacity-0'}
      rounded-[15px] bg-mermerTheme px-20px py-36px shadow-lg transition-all duration-300 ease-in-out`}
      >
        <div className="max-h-500px overflow-y-auto">
          <div className="flex flex-col gap-8px">{displayContent}</div>
        </div>
      </div>

      {/* Info: (20250611 - Julian) 按鈕 */}
      <div>
        <MerMerButton
          type="button"
          onClick={toggleMenu}
          className="flex h-60px w-60px items-center justify-center"
        >
          <IoIosList size={24} />
        </MerMerButton>
      </div>
    </div>
  );
};

export default TableOfContents;
