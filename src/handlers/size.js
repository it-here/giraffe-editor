/**
 * Created by Bane.Shi.
 * Copyright MoenSun
 * User: Bane.Shi
 * Date: 2019-05-30
 * Time: 21:17
 */
export default function (value) {
    if(value==="false"){
        value = false;
    }
    this.quill.format('size',value);
}