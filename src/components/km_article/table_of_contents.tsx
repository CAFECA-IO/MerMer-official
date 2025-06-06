import {ITableOfContentsItem} from '../../interfaces/table_of_contents';

interface ITableOfContentsProps {
  contents: ITableOfContentsItem[];
}

const TableOfContents = ({contents}: ITableOfContentsProps) => {
  const displayContent = contents.map(item => (
    <li key={item.id}>
      <a href={`#${item.id}`} className="text-sm hover:text-lightBlue1">
        {item.title}
      </a>
    </li>
  ));

  return (
    <div className="sticky top-100px hidden h-fit max-w-200px shrink-0 flex-col items-center gap-1 rounded bg-cyan-700 px-12px py-6px lg:flex">
      <ul className="list-none">{displayContent}</ul>
    </div>
  );
};

export default TableOfContents;
