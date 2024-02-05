import React, { Dispatch, SetStateAction } from 'react';

type Props = {
  kmTitle: string,
  setKmTitle: Dispatch<SetStateAction<string>>,
  selectedKmTopic: string,
  setSeletedKmTopic: Dispatch<SetStateAction<string>>,
  kmTopics: string[]
};

export default function KmTitleAndTopic({
  kmTitle,
  setKmTitle,
  selectedKmTopic,
  setSeletedKmTopic,
  kmTopics
}: Props) {

  // 判斷選中的選項是否為初始提示選項
  const isPlaceholderOptionSelected = selectedKmTopic === '';

  const handleTitleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKmTitle(event.target.value);
  };

  const handleTopicSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSeletedKmTopic(event.target.value);
  };

  return (
    <div className='flex w-full shrink flex-col gap-6 font-Dosis'>

      {/* Title */}
      <div className='flex flex-col gap-1'>
        <label
          className="px-0 text-base"
          htmlFor="title"
        >
          Title
        </label>
        <input
          className="h-12 w-full  border-b-[1px] border-lightWhite1 bg-lightGray1/0 px-4 py-3 text-lightWhite1 outline-none placeholder:text-lightGray1"
          type="text"
          id="title"
          placeholder="Article Title"
          value={kmTitle}
          onChange={handleTitleOnChange}
        />
      </div>

      {/* Topic */}
      <div className='flex flex-col gap-1'>
        <label
          className="px-0 text-base"
          htmlFor="topic"
        >
          Topic
        </label>
        <select
          className={`h-12 w-full border-b-[1px] border-lightWhite1 bg-lightGray1/0 px-4 py-3  outline-none ${isPlaceholderOptionSelected ? 'text-lightGray1' : 'text-lightWhite1'}`}
          id="topic"
          value={selectedKmTopic}
          onChange={handleTopicSelectChange}
        >
          <option value="" disabled className='text-lightGray1'>Main Topic</option>
          {kmTopics.map((topic, index) => (
            <option key={index} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
