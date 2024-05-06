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
    const editMode = useSelector(state => state.pageWindowReducer.editMode);
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

    useEffect(() => {
        const toolbar = document.getElementsByClassName('toolbar');
        if (!editMode && toolbar[0].classList.contains('dispay-none') === false) {
            toolbar[0].classList.add('dispay-none');
        }
        if (editMode && toolbar[0].classList.contains('dispay-none') === true) {
            toolbar[0].classList.remove('dispay-none')
        }

        if (content !== null) {
            const draftContent = htmlToDraft(content);
            const contentState = ContentState.createFromBlockArray(draftContent.contentBlocks);
            setEditorState(EditorState.createWithContent(contentState));
        }
    }, [editMode])

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
                toolbarClassName="toolbar"
                wrapperClassName="wrapper"
                editorClassName="editor"
                editorState={editorState}
                onEditorStateChange={setEditorState}
                readOnly={!editMode}
            />
        </div>
    );
}

export default Markdown;