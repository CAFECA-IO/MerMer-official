import React from 'react'
import {
  UndoRedo,
  BoldItalicUnderlineToggles,
  Separator,
  BlockTypeSelect,
  CodeToggle,
  CreateLink,
  InsertImage,
} from '@mdxeditor/editor'


// type Props = {}

export default function ToolbarContents() {
  return (
    <div className='flex w-full items-center justify-center'>
      <UndoRedo />
      <Separator />
      <BoldItalicUnderlineToggles />
      <CodeToggle />
      <Separator />
      <CreateLink />
      <Separator />
      <BlockTypeSelect />
      <InsertImage />
      {/* <ChangeCodeMirrorLanguage /> */}
    </div>
  )
}