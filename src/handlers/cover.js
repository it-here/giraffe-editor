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
                let coverConfig = null;
                if( me.quill && me.quill.options && me.quill.options.upload && me.quill.options.upload.cover ){
                    coverConfig = me.quill.options.upload.cover;
                }
                if( coverConfig ){

                    if( coverConfig.size < fileInput.files[0].size ){
                        if ( coverConfig.outSize ){
                            coverConfig.outSize();
                        }
                        return;
                    }
                    let fileFormKey = coverConfig.fileFormKey? coverConfig.fileFormKey: "file";
                    let formData = new FormData();
                    formData.append(fileFormKey,fileInput.files[0]);
                    axios({
                        method:'post',
                        url: coverConfig.url,
                        headers:Object.assign({},{
                            'content-type': 'multipart/form-data'
                        },coverConfig.headers),
                        data: formData
                    }).then((response)=>{
                        let imageUrl = null;
                        if( coverConfig.afterUpload ){
                            imageUrl = coverConfig.afterUpload(response);
                        }else {
                            imageUrl = response;
                        }
                        me.quill.setCover(imageUrl);
                        fileInput.value = "";
                    }).catch((error)=>{
                        if(coverConfig.uploadFail){
                            coverConfig.uploadFail(error);
                        }
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