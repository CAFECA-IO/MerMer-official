import React, { Dispatch, KeyboardEventHandler, useEffect, useId } from 'react';
// eslint-disable-next-line import/named
import { MultiValue } from 'react-select';
import AsyncCreatableSelect from 'react-select/async-creatable';
import { IKmTag } from '../../../interfaces/km';

type Props = {
  tags: IKmTag[],
  setTags: Dispatch<React.SetStateAction<IKmTag[]>>
}

export default function TagsInputField({
  tags,
  setTags
}: Props) {

  // tags 是原始文章的 tags
  // allTags 是後端拿到的所有 tags

  const [allTags, setAllTags] = React.useState<IKmTag[]>([]);
  useEffect(() => {
    const fetchAllTags = async () => {
      const response = await fetch('/api/tags');
      if (!response.ok) return null;
      const json = await response.json();
      setAllTags(json);
    }
    fetchAllTags();
  }, [])


  const [inputValue, setInputValue] = React.useState('');

  const createOption = (label: string): IKmTag => ({
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

  const handleOnChange = (newValues: MultiValue<IKmTag>): void => {
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
    return allTags.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const promiseOptions = (inputValue: string) =>
    new Promise<IKmTag[]>((resolve) => {
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
