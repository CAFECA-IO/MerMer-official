import {ITableOfContentsItem} from '../../interfaces/table_of_contents';

interface ITableOfContentsProps {
  contents: ITableOfContentsItem[];
}

const TableOfContents = ({contents}: ITableOfContentsProps) => {
  const displayContent = contents.map(item => {
    const marginLeft =
      item.level === 'h1'
        ? 'ml-0'
        : item.level === 'h2'
        ? 'ml-4'
        : item.level === 'h3'
        ? 'ml-8'
        : 'ml-12';

    return (
      <a
        key={item.id}
        href={`#${item.id}`}
        className={`text-sm hover:text-lightBlue1 ${marginLeft}`}
      >
        {item.title}
      </a>
    );
  });

  return (
    <div className="sticky top-100px hidden h-fit max-h-500px max-w-200px shrink-0 flex-col gap-1 overflow-y-auto rounded border px-16px py-8px backdrop-blur-sm lg:flex">
      {displayContent}
    </div>
  );
};

export default TableOfContents;
