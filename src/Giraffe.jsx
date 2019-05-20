import * as React from "react";

import Quill from "./quill/quill";

class  Giraffe extends React.Component{


    constructor(props, context) {
        super(props, context);
        this.quill = null;
    }

    componentDidMount() {
        this.quill = new Quill('#editor', {
            modules: {
                toolbar: '#toolbar' ,
                imageResize:{
                    modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
                },
                imageDrop: true
            },
            theme: 'snow'
        });
        let title = document.createElement('div');
        title.className = 'ql-title';
        let titleBox = document.createElement('div');
        titleBox.className = 'ql-title-box';
        let titleInput = document.createElement('input');
        titleBox.append(titleInput);
        title.append(titleBox);
        this.quill.addContainer(title,document.querySelector(".ql-editor"));
    }

    render() {
        return (
            <div className="giraffe-editor">
                <div className="toolbar-wrapper">
                    <div id="toolbar">
                        <span className="ql-formats">
                            <button className="ql-clean"/>
                        </span>
                        <span className="ql-formats">
                        <select className="ql-header">
                            <option value="false">正文</option>
                            <option value="1">标题</option>
                            <option value="2">副标题</option>
                            <option value="3">标题1</option>
                            <option value="4">标题2</option>
                            <option value="5">标题3</option>

                        </select>
                        <select className="ql-size">
                            <option value="9pt">9</option>
                            <option value="10pt">10</option>
                            <option value="11pt">11</option>
                            <option value="12pt">12</option>
                            <option value="14pt">14</option>
                            <option value="16pt">16</option>
                            <option value="18pt">18</option>
                            <option value="22pt">22</option>
                            <option value="24pt">24</option>
                            <option value="30pt">30</option>
                            <option value="36pt">36</option>
                        </select>
                    </span>
                        <span className="ql-formats">
                        <button className="ql-bold"/>
                        <button className="ql-italic"/>
                        <button className="ql-underline"/>
                        <button className="ql-strike"/>
                        <select className="ql-color"/>
                        <select className="ql-background"/>
                    </span>

                        <span className="ql-formats">
                        <button className="ql-list" value="ordered"/>
                        <button className="ql-list" value="bullet"/>
                        <button className="ql-indent" value="-1"/>
                        <button className="ql-indent" value="+1"/>
                        <button className="ql-blockquote"/>
                        <button className="ql-code-block"/>
                        <select className="ql-align"/>
                        <button className="ql-image"/>
                        <button className="ql-link"/>
                        <button className="ql-video"/>
                    </span>
                        <span className="ql-formats">
                        <button className="ql-inserts"/>
                            <span className="ql-inserts-label ql-expanded">

                        </span>
                    </span>
                    </div>
                </div>
                <div className="editor-scroller">
                    <div className="editor-wrapper">
                        <div id="editor">
                            <div>ss</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default Giraffe