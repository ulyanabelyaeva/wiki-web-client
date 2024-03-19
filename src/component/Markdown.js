import React, { useState } from "react";
import { EditorState } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import '../style/Markdown.css';

function Markdown() {
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );
    return (
        <div className="markdown">
            <Editor
                toolbar={{
                    options: ['inline', 'fontSize', 'list', 'textAlign', 'colorPicker', 'image'],
                    inline: {
                        options: ['bold', 'italic', 'underline', 'strikethrough'],
                    },
                    list: {
                        options: ['unordered', 'ordered'],
                    },
                    fontSize: {
                        options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],

                    },
                }}
                wrapperClassName="editorWrapper"
                editorClassName="editor"
                editorState={editorState}
                onEditorStateChange={setEditorState}
            />
        </div>
    );
}

export default Markdown;