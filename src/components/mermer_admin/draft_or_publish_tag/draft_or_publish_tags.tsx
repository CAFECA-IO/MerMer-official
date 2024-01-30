import React from 'react'
import DraftOrPublishTag from './draft_or_publish_tag';

export type tagData = {
  tagName: string,
  amount: number
}
type Props = {
  tagDatas: tagData[]
  activeTag: string,
  setActiveTag: React.Dispatch<React.SetStateAction<string>>
}

export default function DraftOrPublishTags({ tagDatas, activeTag, setActiveTag }: Props) {


  const tags = tagDatas.map((tagData, index) => {
    return (
      <DraftOrPublishTag
        key={index}
        tagName={tagData.tagName}
        amount={tagData.amount}
        activeTag={activeTag}
        setActiveTag={setActiveTag}
      />
    );
  });


  return (
    <div className='flex items-center justify-center gap-6'>
      {tags}
    </div>
  );
}