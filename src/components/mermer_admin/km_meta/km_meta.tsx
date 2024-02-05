import React, { Dispatch, SetStateAction } from 'react'
import KmCover from './km_cover'
import KmTitleAndTopic from './km_title_and_topic';

type Props = {
  kmTitle: string,
  setKmTitle: Dispatch<SetStateAction<string>>,
  setSelectedImage: React.Dispatch<React.SetStateAction<File | null>>,
  selectedKmTopic: string,
  setSeletedKmTopic: Dispatch<SetStateAction<string>>,
  // kmTopics: string[],
};

const mockTopics = [
  'Topic 1',
  'Topic 2',
  'Topic 3',
  'Topic 4',
  'Topic 5'
]

export default function KmMeta({
  kmTitle,
  setKmTitle,
  setSelectedImage,
  selectedKmTopic,
  setSeletedKmTopic,
  // kmTopics
}: Props) {

  return (
    <div className="flex w-full gap-4">
      <KmCover setSelectedImage={setSelectedImage} />
      <KmTitleAndTopic
        setKmTitle={setKmTitle}
        kmTitle={kmTitle}
        selectedKmTopic={selectedKmTopic}
        setSeletedKmTopic={setSeletedKmTopic}
        kmTopics={mockTopics}
      />
    </div>
  )
}