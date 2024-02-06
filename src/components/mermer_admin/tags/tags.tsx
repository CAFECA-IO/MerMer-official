import React, { useState } from 'react'
import TagsInputField from './tags_input_field';

type TestTag = {
  id: number,
  value: string,
  label: string,
  __isNew__?: boolean,
}
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

export default function Tags() {
  // 後端好了改這裡

  const [tags, setTags] = useState<TestTag[]>(TAGS.slice(0, 3));

  return (
    // Info Murky (20240206) - suppressHydrationWarning is a temporary fix for the following error:
    // Warning: Extra attributes from the server: aria-activedescendant
    <div className='w-full font-Dosis'>
      <label
        className="px-0 text-base"
        htmlFor="long-value-select"
      >
        Tags
      </label>
      <TagsInputField
        tags={tags}
        setTags={setTags}
      />
    </div>
  )
}