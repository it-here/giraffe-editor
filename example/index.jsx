/**
 * Created by Bane.Shi.
 * Copyright MoenSun
 * User: Bane.Shi
 * Date: 2019-05-18
 * Time: 08:49
 */
import "../src/assets/giraffe-editor.less";
 import GiraffeEditor from "../src/GiraffeEditor";
import React from "react";
import * as ReactDom from "react-dom";
ReactDom.render(
    <GiraffeEditor placeholder={`正文`} titlePlaceholder={`文章标题`}>
     <div>边栏</div>
    </GiraffeEditor>,
    document.getElementById("edit-demo")
);
