/**
 * Created by Bane.Shi.
 * Copyright MoenSun
 * User: Bane.Shi
 * Date: 2019-05-18
 * Time: 08:49
 */
import "../src/giraffe.less";
 import Giraffe from "../src/Giraffe";
// import Quill from "quill";
import "quill/dist/quill.snow.css"
import React from "react";
import * as ReactDom from "react-dom";
$(function () {

    // var quill = new GiraffeEditor('#editor', {
    //     modules: {
    //         toolbar: '#toolbar' ,
    //         imageResize:{
    //             modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
    //         },
    //         imageDrop: true
    //     },
    //     theme: 'snow'
    // });
    // let title = document.createElement('div');
    // title.className = 'ql-title';
    // let titleBox = document.createElement('div');
    // titleBox.className = 'ql-title-box';
    // let titleInput = document.createElement('input');
    // titleBox.append(titleInput);
    // title.append(titleBox);
    // quill.addContainer(title,document.querySelector(".ql-editor"));

    ReactDom.render(
        <Giraffe/>,
        document.getElementById("edit-demo")
    );


});