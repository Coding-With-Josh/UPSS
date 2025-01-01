'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Paragraph from '@tiptap/extension-paragraph'

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit, Paragraph],
    content: '<p style="color:gray">Hello World! 🌎️</p>',
  })

  return <EditorContent editor={editor} />
}

export default Tiptap
