import { EditorState, convertToRaw } from "draft-js";

export default function convertToPlainText(editorState: EditorState) {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const plainText = rawContentState.blocks.map(block => block.text).join('\n');
    return plainText;
};

