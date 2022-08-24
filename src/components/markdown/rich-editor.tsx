import React from 'react';
import { Editor, EditorState } from 'react-draft-wysiwyg';

interface IRichTextEditor {
  state: EditorState | undefined;
  setState: any;
}

const RichTextEditor = ({ state, setState }: IRichTextEditor): JSX.Element => {
  return (
    <div
      style={{
        // border: '2px solid #8c8c8c',
        height: 500,
        boxShadow:
          '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
        overflow: 'scroll',
      }}
    >
      <Editor
        editorState={state}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        onEditorStateChange={setState}
        placeholder="The message goes here..."
      />
    </div>
  );
};

export default RichTextEditor;
