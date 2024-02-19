import React, { Dispatch, KeyboardEventHandler } from 'react';
// eslint-disable-next-line import/named
import { MultiValue } from 'react-select';
import AsyncCreatableSelect from 'react-select/async-creatable';
import { IKmTag } from '../../../interfaces/km';
import { useAlerts } from '../../../contexts/alert_context';

type Props = {
  tags: IKmTag[],
  setTags: Dispatch<React.SetStateAction<IKmTag[]>>
}

export default function TagsInputField({
  tags,
  setTags
}: Props) {

  const { addAlert, clearAlerts } = useAlerts();

  const [inputValue, setInputValue] = React.useState('');

  const createOption = async (label: string): Promise<IKmTag | null> => {
    const response = await fetch('/api/tags', {
      method: 'POST',
      body: JSON.stringify({ label }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      addAlert({
        severity: 'error', message: "Can't fetch tags", timeout: 3000, handleDismiss: () => {
          setTimeout(() => {
            clearAlerts();
          }, 2000);
        }
      });
      return null
    }

    const newTag = await response.json();
    return newTag;
  };

  const handleKeyDown: KeyboardEventHandler = async (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        const newTag = await createOption(inputValue);
        if (!newTag || tags.some(tag => tag.label === newTag.label)) {
          return
        }
        setTags((prev) => [...prev, newTag]);
        setInputValue('');

        // eslint-disable-next-line no-console
        console.log('handleKeyDown', tags)
        event.preventDefault();
    }
  };

  const handleOnChange = async (newValues: MultiValue<IKmTag>): Promise<void> => {
    // newValues = [...new Set(newValues)]
    const newTags = await Promise.all(newValues.map(async (newValue) => {
      if (newValue.__isNew__ && !tags.some(tag => tag.label === newValue.label)) {
        const newTag = await createOption(newValue.label);
        return newTag ? newTag : newValue
      } else {
        // newValue.id = newValue.id
        return newValue
      }
    }));
    setTags(newTags)

    // eslint-disable-next-line no-console
    console.log('OnChange', newTags)
  };

  const filterTags = async (inputValue: string): Promise<IKmTag[]> => {
    const response = await fetch('/api/tags');
    if (!response.ok) {
      addAlert({
        severity: 'error', message: "Can't fetch tags", timeout: 3000, handleDismiss: () => {
          setTimeout(() => {
            clearAlerts();
          }, 2000);
        }
      });
      return []
    }
    const allTags: IKmTag[] = await response.json();
    return allTags.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const promiseOptions = (inputValue: string) =>
    new Promise<IKmTag[]>((resolve) => {
      resolve(filterTags(inputValue));
    });

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
    className='z-10 w-full'
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
