import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";
import { updateContent } from "../redux/slice/PageWindowSlice";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import '../style/Markdown.css';

function Markdown() {
    const dispatch = useDispatch();
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
    }, [content])

    useEffect(() => {
        const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        dispatch(updateContent(html));
    }, [editorState])

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