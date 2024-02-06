import React, { Dispatch, SetStateAction } from 'react'
import type { Category } from '@prisma/client';
import { Tag } from './tag';

type Props = {
  tags: Category[],
  setTags: Dispatch<SetStateAction<Category[]>>,
}

export default function TagsList({ tags, setTags }: Props) {
  return (
    <>
      {
        tags.map((tag) => (
          <Tag
            key={tag.id}
            tag={tag}
            setTags={setTags}
          />
        ))
      }
    </>
  )
}