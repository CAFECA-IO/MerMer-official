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
  linkPlugin,
} from '@mdxeditor/editor';

import ToolbarContents from './toolbar_contents'

// Till: (20240316 - Murky) 目前不加下面這個escape會有錯誤, 但功能完全正常
// eslint-disable-next-line import/no-unresolved
import '@mdxeditor/editor/style.css';
import { imageUploadHandler } from './imageUploadHandler';
import React from 'react';

// Till: (20240316 - Murky) 目前不加下面這個escape會有錯誤, 但功能完全正常
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
        linkPlugin(),
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
        codeMirrorPlugin({ codeBlockLanguages: { text: 'Text', js: 'JavaScript(js)', javascript: 'JavaScript', css: 'CSS', ts: 'TypeScript(ts)', typescript: 'TypeScript', bash: 'Bash', tsx: 'tsx', jsx: 'jsx', python: 'Python', json: 'JSON', solidity: 'Solidity' } }),
        diffSourcePlugin({ diffMarkdown: restProp.markdown, viewMode: 'rich-text', codeMirrorExtensions: [coolGlow] }),
        toolbarPlugin({
          toolbarContents: () => (
            <ToolbarContents />
          )
        }),
      ]}

      // Till: (20240316 - Murky) 需要使用mdx-editor自己的className，所以取消tailwind檢查
      // eslint-disable-next-line tailwindcss/no-custom-classname
      className={`dark-editor dark-theme size-full justify-center ${className}`}
      contentEditableClassName="max-w-none min-h-[235px] h-full prose prose-sm prose-slate prose-invert"
      {...restProp}
      ref={editorRef}
    />
  )
}
