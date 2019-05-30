import axios from "axios";
import Emitter from "quill/core/emitter";
import Delta from 'quill-delta';
/**
 * Created by Bane.Shi.
 * Copyright MoenSun
 * User: Bane.Shi
 * Date: 2019-05-25
 * Time: 16:28
 */
export default function (value) {
    let me = this;
    if(value === 'upload'){
        let fileInput = this.container.querySelector('input.ql-image[type=file]');
        if (fileInput == null) {
            fileInput = document.createElement('input');
            fileInput.setAttribute('type', 'file');
            fileInput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
            fileInput.classList.add('ql-image');
            fileInput.addEventListener('change', () => {
                if (fileInput.files != null && fileInput.files[0] != null) {
                    let imageConfig = null;
                    if( me.options.upload && me.options.upload.image ){
                        imageConfig = me.options.upload.image;
                    }
                    if( imageConfig ){
                        if( imageConfig.size < fileInput.files[0].size ){
                            if ( imageConfig.outSize ){
                                imageConfig.outSize();
                            }
                            return;
                        }
                        let formData = new FormData();
                        formData.append("file",fileInput.files[0]);
                        axios({
                            method:'post',
                            url: imageConfig.url,
                            headers:{
                                'content-type': 'multipart/form-data'
                            },
                            data: formData
                        }).then((response)=>{
                            let imageUrl = null;
                            if( afterUpload ){
                                imageUrl = afterUpload(response);
                            }else {
                                imageUrl = response;
                            }
                            let range = this.quill.getSelection(true);
                            this.quill.updateContents(new Delta()
                                    .retain(range.index)
                                    .delete(range.length)
                                    .insert({ image: imageUrl })
                                , Emitter.sources.USER);
                            this.quill.setSelection(range.index + 1, Emitter.sources.SILENT);
                            fileInput.value = "";
                        }).catch((error)=>{
                            if(imageConfig.uploadFail){
                                imageConfig.uploadFail(error);
                            }
                        });
                    }else {
                        let reader = new FileReader();
                        reader.onload = (e) => {
                            let range = this.quill.getSelection(true);
                            this.quill.updateContents(new Delta()
                                    .retain(range.index)
                                    .delete(range.length)
                                    .insert({ image: e.target.result })
                                , Emitter.sources.USER);
                            this.quill.setSelection(range.index + 1, Emitter.sources.SILENT);
                            fileInput.value = "";
                        };
                        reader.readAsDataURL(fileInput.files[0]);
                    }


                }

            });
            this.container.appendChild(fileInput);
        }
        fileInput.click();
    }else {
        this.quill.theme.tooltip.edit('image-url');
    }
}