'use client'
// InitializedMDXEditor.tsx
import type { ForwardedRef } from 'react';
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
  imagePlugin,
  tablePlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
} from '@mdxeditor/editor';

import ToolbarContents from './toolbar_contents'
// eslint-disable-next-line import/no-unresolved
import '@mdxeditor/editor/style.css';
import { imageUploadHandler } from './imageUploadHandler';
import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { coolGlow } from 'thememirror';

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
        tablePlugin(),
        imagePlugin({
          imageUploadHandler: imageUploadHandler
        }),
        codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
        codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS', ts: 'TypeScript', bash: 'Bash', tsx: 'tsx', jsx: 'jsx', python: 'Python' } }),
        diffSourcePlugin({ diffMarkdown: 'An older version', viewMode: 'rich-text', codeMirrorExtensions: [coolGlow] }),
        toolbarPlugin({
          toolbarContents: () => (
            <ToolbarContents />
          )
        }),
      ]}

      // eslint-disable-next-line tailwindcss/no-custom-classname
      className={`dark-editor dark-theme size-full justify-center ${className}`}
      contentEditableClassName="max-w-none min-h-[235px] h-full prose prose-sm prose-slate prose-invert"
      {...restProp}
      ref={editorRef}
    />
  )
}
