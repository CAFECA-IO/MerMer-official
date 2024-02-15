import React, { Dispatch, SetStateAction } from 'react'
import KmCover from './km_cover'
import KmTitleAndTopic from './km_title_and_topic';
import { Topic } from '@prisma/client';

type Props = {
  kmTitle: string,
  setKmTitle: Dispatch<SetStateAction<string>>,
  selectedImage: File | null,
  setIsNewImage: Dispatch<React.SetStateAction<boolean>>,
  setSelectedImage: Dispatch<React.SetStateAction<File | null>>,
  selectedKmTopic: string,
  setSeletedKmTopic: Dispatch<SetStateAction<string>>,
  kmTopics: Topic[],
};

export default function KmMeta({
  kmTitle,
  setKmTitle,
  setIsNewImage,
  setSelectedImage,
  selectedKmTopic,
  selectedImage,
  setSeletedKmTopic,
  kmTopics
}: Props) {

  return (
    <div className="flex w-full gap-4">
      <KmCover
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        setIsNewImage={setIsNewImage}
      />
      <KmTitleAndTopic
        setKmTitle={setKmTitle}
        kmTitle={kmTitle}
        selectedKmTopic={selectedKmTopic}
        setSeletedKmTopic={setSeletedKmTopic}
        kmTopics={kmTopics}
      />
    </div>
  )
}