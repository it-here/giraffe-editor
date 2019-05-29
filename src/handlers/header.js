/**
 * Created by Bane.Shi.
 * Copyright MoenSun
 * User: Bane.Shi
 * Date: 2019-05-29
 * Time: 20:49
 */
export default function (value) {
    debugger
    if(value==="false"){
        value = false;
    }
    this.quill.format('header',value);
}