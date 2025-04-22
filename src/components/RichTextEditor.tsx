
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { Button } from "@/components/ui/button";
import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon, 
  List, 
  ListOrdered 
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
    ],
    content: value,
    editorProps: {
      attributes: {
        class: 'min-h-[100px] prose prose-sm max-w-none focus:outline-none rounded-md p-3 text-sm',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="border rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 ring-offset-background">
      <div className="flex flex-wrap gap-1 p-1 border-b bg-muted/50">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className={`h-8 px-2 ${editor.isActive('bold') ? 'bg-muted' : ''}`}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className={`h-8 px-2 ${editor.isActive('italic') ? 'bg-muted' : ''}`}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className={`h-8 px-2 ${editor.isActive('underline') ? 'bg-muted' : ''}`}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <UnderlineIcon className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className={`h-8 px-2 ${editor.isActive('bulletList') ? 'bg-muted' : ''}`}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className={`h-8 px-2 ${editor.isActive('orderedList') ? 'bg-muted' : ''}`}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
      </div>
      <EditorContent 
        editor={editor} 
        placeholder={placeholder}
        className="min-h-[100px]"
      />
    </div>
  );
}
