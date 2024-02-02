import React from 'react'
import {
  UndoRedo,
  BoldItalicUnderlineToggles,
  Separator,
  BlockTypeSelect,
  CodeToggle,
  CreateLink,
  InsertImage,
  InsertTable,
  ListsToggle,
  InsertThematicBreak,
  InsertCodeBlock,
  ConditionalContents,
  ChangeCodeMirrorLanguage,
  DiffSourceToggleWrapper,
} from '@mdxeditor/editor'


// type Props = {}

export default function ToolbarContents() {
  return (
    <div className='flex w-full items-center justify-center'>
      <DiffSourceToggleWrapper>
        {/* <Separator /> 是分隔線*/}
        <UndoRedo />
        <Separator />
        <BoldItalicUnderlineToggles />
        <CodeToggle />
        <Separator />
        <ListsToggle />
        <Separator />
        <BlockTypeSelect />
        <Separator />
        <CreateLink />
        <InsertImage />
        <Separator />
        <InsertTable />
        <InsertThematicBreak />
        <Separator />
        <ConditionalContents
          options={[
            { when: (editor) => editor?.editorType === 'codeblock', contents: () => <ChangeCodeMirrorLanguage /> },
            {
              fallback: () => (<>
                <InsertCodeBlock />
              </>)
            }
          ]}
        />

        {/* <ChangeCodeMirrorLanguage /> */}
      </DiffSourceToggleWrapper>
    </div>
  )
}