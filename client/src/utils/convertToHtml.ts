import { EditorState, convertToRaw } from "draft-js";

export default function convertToHtml(editorState: EditorState) {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const blocks = rawContentState.blocks.map(block => {
        const { text, type } = block;
        if (type === 'unstyled') {
            return `<p>${text}</p>`;
        } else if (type === 'header-one') {
            return `<h1>${text}</h1>`;
        } else if (type === 'header-two') {
            return `<h2>${text}</h2>`;
        } else if (type === 'unordered-list-item') {
            return `<ul><li>${text}</li></ul>`;
        } else if (type === 'ordered-list-item') {
            return `<ol><li>${text}</li></ol>`;
        }
        return text;
    });
    return blocks.join('\n');
};
