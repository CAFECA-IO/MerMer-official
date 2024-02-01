'use client'
// InitializedMDXEditor.tsx
import type { ForwardedRef } from 'react'
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  type MDXEditorMethods,
  type MDXEditorProps,
  toolbarPlugin,
  linkDialogPlugin,
} from '@mdxeditor/editor'
import ToolbarContents from './toolbar_contents'
// eslint-disable-next-line import/no-unresolved
import '@mdxeditor/editor/style.css'

// Only import this to the next file
export default function InitializedMDXEditor({
  editorRef,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {

  const { className, ...restProp } = props
  return (
    <MDXEditor
      plugins={[
        // Example Plugin Usage
        headingsPlugin(),
        listsPlugin(),
        linkDialogPlugin({
          linkAutocompleteSuggestions: ['https://mermer.com.tw/', 'https://github.com/', 'https://www.figma.com/']
        }),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        toolbarPlugin({
          toolbarContents: () => (
            <ToolbarContents />
          )
        })
      ]}

      // eslint-disable-next-line tailwindcss/no-custom-classname
      className={`dark-editor dark-theme ${className}`}
      contentEditableClassName="prose prose-sm prose-slate prose-invert"
      {...restProp}
      ref={editorRef}
    />
  )
}
