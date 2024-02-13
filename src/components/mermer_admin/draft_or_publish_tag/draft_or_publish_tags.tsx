import React from 'react'
import DraftOrPublishTag from './draft_or_publish_tag';
import { IAllKmMeta } from '../../../interfaces/km';

type Props = {
  kmAllMetas: IAllKmMeta
  activePublishStatus: string,
  setActivePublishStatus: React.Dispatch<React.SetStateAction<'drafts' | 'published'>>
}

export default function DraftOrPublishTags({ kmAllMetas, activePublishStatus, setActivePublishStatus }: Props) {



  const tags = Object.values(kmAllMetas).map((kmDraftOrPublishMetas) => {
    return (
      <DraftOrPublishTag
        key={kmDraftOrPublishMetas.publishStatus}
        tagName={kmDraftOrPublishMetas.publishStatus}
        amount={kmDraftOrPublishMetas.kmMetas?.length || 0}
        activePublishStatus={activePublishStatus}
        setActivePublishStatus={setActivePublishStatus}
      />
    );
  });


  return (
    <div className='flex items-center justify-center gap-6'>
      {tags}
    </div>
  );
}