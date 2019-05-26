/**
 * Created by Bane.Shi.
 * Copyright MoenSun
 * User: Bane.Shi
 * Date: 2019-05-25
 * Time: 21:48
 */
export default function (value) {
    let me = this;
    let inerts = me.container.querySelector('.ql-inserts');
    if(inerts){
        let insertsLabel = me.container.querySelector('.ql-inserts-label');
        if(insertsLabel){
            if(insertsLabel.classList.contains("ql-expanded")){
                insertsLabel.classList.remove("ql-expanded")
            }else {
                insertsLabel.classList.add("ql-expanded")
            }
        }
    }
}