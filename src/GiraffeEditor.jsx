import * as React from "react";
import PropTypes from "prop-types";

import GiraffeQuill from "./quill/giraffeQuill";

class  GiraffeEditor extends React.Component{


    constructor(props, context) {
        super(props, context);
        this.quill = null;
    }

    componentDidMount() {
        const {onSaveDraft,placeholder,titlePlaceholder} = this.props;
        let me = this;
        const {onQuillReady} = this.props;
        const {options} = this.props;
        let defaultOptions = {
            modules: {
                toolbar: {
                    container:'.giraffe-toolbar',
                    handlers:{
                        save:function (value) {
                            if(onSaveDraft){
                                onSaveDraft();
                            }
                        }
                    }
                } ,
                imageResize:{
                    modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
                },
                imageDrop: true
            },
            scrollingContainer: '.editor-scroller',
            placeholder: placeholder,
            titlePlaceholder: titlePlaceholder,
            theme: 'giraffe'
        };
        this.quill = new GiraffeQuill('.giraffe-editor-body',Object.assign({},defaultOptions,options) );
        if(onQuillReady){
            onQuillReady(me.quill);
        }
    }


    render() {
        return (
            <div className="giraffe-editor">
                <div className={`sidebar right-sidebar`}>
                    {this.props.children}
                </div>
                <div className="toolbar-wrapper">
                    <div className="giraffe-toolbar">
                        <span className="ql-formats">
                            <button className="ql-save"/>
                            <button className="ql-clean"/>
                        </span>
                        <span className="ql-formats">
                            <select className="ql-header" defaultValue="false">
                                <option value="false" >正文</option>
                                <option value="1">标题</option>
                                <option value="2">副标题</option>
                                <option value="3">标题1</option>
                                <option value="4">标题2</option>
                                <option value="5">标题3</option>

                            </select>
                            <select className="ql-size" defaultValue="false">
                                <option value="9pt">9</option>
                                <option value="10pt">10</option>
                                <option value="false" >11</option>
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

                            <button className="ql-link"/>
                            <button className="ql-video"/>
                        </span>
                        <span className="ql-formats">
                            <button className="ql-inserts"/>
                            <span className="ql-inserts-label">
                                <select className="ql-image" data-label="图片">
                                    <option value="upload" >本地上传</option>
                                    <option value="image-url" >图片链接</option>
                                </select>
                                <button className="ql-cover">封面</button>
                            </span>
                        </span>
                    </div>
                </div>
                <div className="editor-scroller">
                    <div className="editor-wrapper">
                        <div className="giraffe-editor-body">

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

GiraffeEditor.propTypes = {
    options: PropTypes.object,
    onQuillReady: PropTypes.func,
    onSaveDraft: PropTypes.func,
    placeholder: PropTypes.string,
    titlePlaceholder : PropTypes.string
};

GiraffeEditor.defaultProps = {

};

export {  GiraffeQuill, GiraffeEditor as default}