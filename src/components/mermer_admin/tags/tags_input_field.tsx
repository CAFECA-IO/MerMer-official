import React, { Dispatch, KeyboardEventHandler, useId } from 'react';
// eslint-disable-next-line import/named
import { MultiValue } from 'react-select';
import AsyncCreatableSelect from 'react-select/async-creatable';
type TestTag = {
  id: number,
  value: string,
  label: string,
  __isNew__?: boolean,
}
type Props = {
  tags: TestTag[],
  setTags: Dispatch<React.SetStateAction<TestTag[]>>
}

export default function TagsInputField({
  tags,
  setTags
}: Props) {

  // tags 是原始文章的 tags
  // TAGS 是後端拿到的所有 tags

  // 後端好了改這裡，從後端拿資料


  const TAGS: TestTag[] = [
    {
      id: 1,
      value: "Algorithm",
      label: "Algorithm",
    },
    {
      id: 2,
      value: "Programming",
      label: "Programming",
    },
    {
      id: 3,
      value: "Blockchain Technology",
      label: "Blockchain Technology",
    },
    {
      id: 4,
      value: "Smart Contract",
      label: "Smart Contract",
    },
    {
      id: 5,
      value: "Newbie",
      label: "Newbie",
    }
  ]

  const [inputValue, setInputValue] = React.useState('');

  const createOption = (label: string): TestTag => ({
    id: -1,
    label,
    value: label,
    __isNew__: true,
  });

  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        setTags((prev) => [...prev, createOption(inputValue)]);
        setInputValue('');

        // eslint-disable-next-line no-console
        console.log('handleKeyDown', tags)
        event.preventDefault();
    }
  };

  const handleOnChange = (newValues: MultiValue<TestTag>): void => {
    // MultiValue<TestTag> 是 readonly TestTag[]
    // setTags((prev) => [...prev, ...newValue])

    const newTags = newValues.map((newValue) => {
      newValue.__isNew__ ? newValue.id = -1 : newValue.id = newValue.id
      return newValue
    })
    setTags(newTags)
    // eslint-disable-next-line no-console
    console.log('OnChange', newTags)
  };

  const filterTags = (inputValue: string) => {
    return TAGS.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const promiseOptions = (inputValue: string) =>
    new Promise<TestTag[]>((resolve) => {
      setTimeout(() => {
        resolve(filterTags(inputValue));
      }, 1000);
    }
    );


  return (<AsyncCreatableSelect
    // id, instanceId, inputId 是為了解決 warning: Prop `id` did not match.
    id="long-value-select"
    instanceId="long-value-select"
    inputId="long-value-select"
    value={tags}
    isMulti
    isClearable
    cacheOptions
    defaultOptions
    loadOptions={promiseOptions}
    onKeyDown={handleKeyDown}
    onChange={handleOnChange}
    inputValue={inputValue}
    onInputChange={(newValue) => setInputValue(newValue)}
    placeholder="Add tags"
    // styling
    unstyled
    className='z-50 w-full'
    classNames={
      {
        control: () => "h-12 w-full  border-b-[1px] border-lightWhite1 bg-lightGray1/0 px-4 py-3 text-lightWhite1 outline-none",
        placeholder: () => "text-lightGray1",
        valueContainer: () => "gap-2 mb-3",
        multiValue: () => `text-darkBlue3 bg-lightBlue1 rounded-full text-[14px] font-Dosis px-2 py-1`,
        multiValueRemove: () => 'hover:text-red-500',
        menu: () => 'mt-2 py-1 bg-darkBlue3/50 backdrop-blur-lg rounded-md shadow-2xl border-[2px] border-lightGray2/50',
        option: () => 'px-4 py-1 hover:text-darkBlue3 hover:bg-lightBlue1/70',
      }
    }
  />)
}
