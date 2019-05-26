import axios from "axios";
import Emitter from "quill/core/emitter";
import Delta from 'quill-delta';
/**
 * Created by Bane.Shi.
 * Copyright MoenSun
 * User: Bane.Shi
 * Date: 2019-05-25
 * Time: 17:18
 */

export default function( toolbar ) {

    let me = this;
    if(!me){
        me = toolbar;
    }

    let fileInput = me.container.querySelector('input.ql-cover[type=file]');
    if (fileInput == null) {
        fileInput = document.createElement('input');
        fileInput.setAttribute('type', 'file');
        fileInput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
        fileInput.classList.add('ql-cover');
        fileInput.addEventListener('change', () => {
            if (fileInput.files != null && fileInput.files[0] != null) {
                me.quill.removeCover();
                if( me.options.upload && me.options.upload.cover && me.options.upload.cover.url ){
                    let formData = new FormData();
                    formData.append("file",fileInput.files[0]);
                    axios({
                        method:'post',
                        url: me.options.urls.cover,
                        headers:{
                            'content-type': 'multipart/form-data'
                        },
                        data: formData
                    }).then((response)=>{
                        let imageUrl = null;
                        if( me.options.upload.cover.afterUpload ){
                            imageUrl = me.options.upload.cover.afterUpload(response);
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
                    });
                }else {
                    let reader = new FileReader();
                    reader.onload = (e) => {

                        me.quill.setCover(e.target.result);
                        fileInput.value = "";
                    };
                    reader.readAsDataURL(fileInput.files[0]);
                }


            }

        });
        me.container.appendChild(fileInput);
    }
    fileInput.click();
}