import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import '../style/Markdown.css';
import { EditorState } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import { ContentState } from "draft-js";

function Markdown() {
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );

    const content = useSelector(state => state.pageWindowReducer.content);
    useEffect(() => {
        if (content !== null) {
            const draftContent = htmlToDraft(content);
            const contentState = ContentState.createFromBlockArray(draftContent.contentBlocks);
            setEditorState(EditorState.createWithContent(contentState));
        }
    }, [])


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
                editorClassName="editor"
                editorState={editorState}
                onEditorStateChange={setEditorState}
            />
        </div>
    );
}

export default Markdown;