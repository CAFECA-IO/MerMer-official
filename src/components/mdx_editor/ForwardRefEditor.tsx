'use client'

// Till: (20240316 - Murky) 目前不加下面這個escape會有錯誤, 但功能完全正常
// eslint-disable-next-line import/named
import { MDXEditorMethods, MDXEditorProps } from '@mdxeditor/editor'
import dynamic from 'next/dynamic'
import { forwardRef } from 'react'

// ForwardRefEditor.tsx

// This is the only place InitializedMDXEditor is imported directly.
const Editor = dynamic(() => import('./InitializedMDXEditor'), {
  // Make sure we turn SSR off
  ssr: false
})

// This is what is imported by other components. Pre-initialized with plugins, and ready
// to accept other props, including a ref.
export const ForwardRefEditor = forwardRef<MDXEditorMethods, MDXEditorProps>((props, ref) => <Editor {...props} editorRef={ref} />)

// TS complains without the following line
ForwardRefEditor.displayName = 'ForwardRefEditor'
