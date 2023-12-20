import { useEffect, useState } from "react";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import {
  IDomEditor,
  IEditorConfig,
  IToolbarConfig,
  i18nChangeLanguage,
} from "@wangeditor/editor";
import "@wangeditor/editor/dist/css/style.css";

type PropsType = {
  value: string;
  setValue: (html: string) => void;
};

export default function EmailEntry({ value, setValue }: PropsType) {
  const [editor, setEditor] = useState<IDomEditor | null>(null);

  i18nChangeLanguage("en");

  const toolbarConfig: Partial<IToolbarConfig> = {};

  const editorConfig: Partial<IEditorConfig> = {
    placeholder: "Type here...",
  };

  toolbarConfig.excludeKeys = [
    "blockquote",
    "fontFamily",
    "todo",
    "emotion",
    "group-image",
    "group-video",
    "insertTable",
    "codeBlock",
    "fullScreen",
  ];

  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  return (
    <div className="drop-shadow-lg rounded">
      <div style={{ border: "1px solid #ccc", zIndex: 100 }}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: "1px solid #ccc" }}
        />
        <Editor
          defaultConfig={editorConfig}
          value={value}
          onCreated={setEditor}
          onChange={(editor: any) => setValue(editor.getHtml())}
          mode="default"
          style={{ height: "500px", overflowY: "hidden" }}
        />
      </div>
    </div>
  );
}
