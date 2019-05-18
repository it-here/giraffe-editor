/**
 * Created by Bane.Shi.
 * Copyright MoenSun
 * User: Bane.Shi
 * Date: 2019-05-18
 * Time: 08:49
 */
import "../src/giraffe.less";
 import GiraffeEditor from "../src/giraffe";
// import Quill from "quill";
import "quill/dist/quill.snow.css"
$(function () {

    var quill = new GiraffeEditor('#editor', {
        modules: { toolbar: '#toolbar' },
        theme: 'snow'
    });
    let title = document.createElement('div');
    title.className = 'ql-title';
    let titleBox = document.createElement('div');
    titleBox.className = 'ql-title-box';
    let titleInput = document.createElement('input');
    titleBox.append(titleInput);
    title.append(titleBox);
    quill.addContainer(title,document.querySelector(".ql-editor"));
});