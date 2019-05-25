/**
 * Created by Bane.Shi.
 * Copyright MoenSun
 * User: Bane.Shi
 * Date: 2019-05-19
 * Time: 10:30
 */
import Quill from "quill";
import Icons from "../ui/icons";
import snow from "../themes/giraffe"
import GiraffeToolbar from "../modules/giraffeToolbar";
import ImageResize from 'quill-image-resize-module';
import { ImageDrop } from 'quill-image-drop-module';
import IconCamera from "../icons/camera.svg";
import IconDelete from "../icons/delete.svg";

let AlignStyle = Quill.import('attributors/style/align');

let SizeStyle = Quill.import('attributors/style/size');
SizeStyle.whitelist = ['9pt', '10pt', '11pt', '12pt','14pt','16pt','18pt','22pt','24pt','30pt','36pt'];


Quill.register({
    'formats/align': AlignStyle,
    'formats/size': SizeStyle,
    'modules/toolbar': GiraffeToolbar,
    'themes/snow': snow,
    'ui/icons': Icons
}, true);



Quill.register('modules/imageResize', ImageResize);

Quill.register('modules/imageDrop', ImageDrop);


class GiraffeQuill extends Quill{
    constructor(container, options = {}){
        super(container,options);
        this.create();
    }

    create(){
        let me = this;
        let cover = document.createElement('div');
        cover.className = 'ql-cover-container';

        let coverWrapper = document.createElement('div');
        coverWrapper.classList.add('ql-cover-container-wrapper');
        let coverImgBox = document.createElement('div');
        coverImgBox.classList.add('ql-cover-img-box');
        coverWrapper.append(coverImgBox);


        //region cover action
        let coverAction = document.createElement('div');
        coverAction.classList.add('ql-cover-action');

        let btnCamera = document.createElement('button');
        btnCamera.innerHTML = IconCamera;
        btnCamera.addEventListener('click',function (e) {
            debugger
            let toolbar = me.getModule('toolbar');
            if(toolbar){
                let cover = toolbar.handlers.cover;
                if(cover ){
                    cover(toolbar);
                }
            }
        });
        coverAction.append(btnCamera);

        let btnDelete = document.createElement('button');
        btnDelete.innerHTML = IconDelete;
        btnDelete.addEventListener('click',function (e) {
            me.removeCover();
        });
        coverAction.append(btnDelete);

        coverWrapper.append(coverAction);
        //endregion

        cover.append(coverWrapper);
        this.coverContainer =  cover;
        this.addContainer(cover,document.querySelector(".ql-editor"));

        let title = document.createElement('div');
        title.className = 'ql-title';
        let titleBox = document.createElement('div');
        titleBox.className = 'ql-title-box';
        let titleInput = document.createElement('input');
        titleBox.append(titleInput);
        title.append(titleBox);
        this.titleContainer =  title;
        this.addContainer(title,document.querySelector(".ql-editor"));
    }

    focus() {
        debugger
        let scrollTop = this.scrollingContainer.scrollTop;
        this.selection.focus();
        this.scrollingContainer.scrollTop = scrollTop;
        this.scrollIntoView();
    }

    setCover(value){
        let me = this;
        me.cover = value;
        debugger
        if(value){
            let image = document.createElement('img');
            image.setAttribute('src',value);
            let cover = me.coverContainer.querySelector(".ql-cover-img-box");
            if(cover){
                cover.append(image);
            }
            me.coverContainer.classList.add("ql-show");
        }else {
            me.removeCover();
        }
    }

    getCover(){
        let cover = this.cover;
        console.log(cover)
    }

    removeCover(){
        this.coverContainer.classList.remove("ql-show");
        let coverImgBox = this.coverContainer.querySelector(".ql-cover-img-box");
        if(coverImgBox){
            let img = coverImgBox.querySelector("img");
            if(img){
                img.remove();
                this.setCover(null);
            }
        }
    }

    getTitle(){
        let title = this.titleContainer.querySelector("input");
        if(title){
            return title.value;
        }
    }

    setTitle(value){
        let title = this.titleContainer.querySelector("input");
        if(title){
            title.value = value;
        }
    }

}

export default GiraffeQuill;