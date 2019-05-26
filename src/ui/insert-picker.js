import Quill from "quill";
import icons from "../ui/icons";
import CaretRight from "../icons/caret-right-mini.svg";
/**
 * Created by Bane.Shi.
 * Copyright MoenSun
 * User: Bane.Shi
 * Date: 2019-05-25
 * Time: 13:24
 */
const Picker = Quill.import("ui/picker");
class  InsertPicker extends Picker{

    constructor(select) {
        super(select);
        this.label.innerHTML = icons['image']+'<span class="ql-picker-label-text">'+select.getAttribute('data-label')+'</span>';
        let i = document.createElement('i');
        i.classList.add('ql-picker-arrow');
        i.innerHTML= CaretRight;
        this.container.append(i);
        this.container.classList.add('ql-hover-picker');
        [].forEach.call(this.container.querySelectorAll('.ql-picker-item'), (item) => {
            item.innerHTML = item.getAttribute('data-label');
        });
    }
}
export default InsertPicker