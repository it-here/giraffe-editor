/**
 * Created by Bane.Shi.
 * Copyright MoenSun
 * User: Bane.Shi
 * Date: 2019-05-25
 * Time: 22:15
 */
import Quill from "quill"
import Parchment from 'parchment';
import logger from 'quill/core/logger';
let debug = logger('quill:toolbar');
const Toolbar = Quill.import("modules/toolbar");
class GiraffeToolbar extends Toolbar{

    constructor(quill, options){
        super(quill,options);
    }

    attach(input) {
        let format = [].find.call(input.classList, (className) => {
            return className.indexOf('ql-') === 0;
        });
        if (!format) return;
        format = format.slice('ql-'.length);
        if (input.tagName === 'BUTTON') {
            input.setAttribute('type', 'button');
        }
        if (this.handlers[format] == null) {
            if (this.quill.scroll.whitelist != null && this.quill.scroll.whitelist[format] == null) {
                debug.warn('ignoring attaching to disabled format', format, input);
                return;
            }
            if (Parchment.query(format) == null) {
                debug.warn('ignoring attaching to nonexistent format', format, input);
                return;
            }
        }
        let eventName = input.tagName === 'SELECT' ? 'change' : 'click';
        input.addEventListener(eventName, (e) => {
            let value;
            if (input.tagName === 'SELECT') {
                if (input.selectedIndex < 0) return;
                let selected = input.options[input.selectedIndex];
                if (selected.hasAttribute('selected')) {
                    value = false;
                } else {
                    value = selected.value || false;
                }
            } else {
                if (input.classList.contains('ql-active')) {
                    value = false;
                } else {
                    value = input.value || !input.hasAttribute('value');
                }
                e.preventDefault();
            }
            if(format !== 'inserts'){
                this.quill.focus();
            }

            let [range, ] = this.quill.selection.getRange();
            if (this.handlers[format] != null) {
                this.handlers[format].call(this, value);
            } else if (Parchment.query(format).prototype instanceof Parchment.Embed) {
                value = prompt(`Enter ${format}`);
                if (!value) return;
                this.quill.updateContents(new Delta()
                        .retain(range.index)
                        .delete(range.length)
                        .insert({ [format]: value })
                    , Quill.sources.USER);
            } else {
                this.quill.format(format, value, Quill.sources.USER);
            }
            this.update(range);
        });
        // TODO use weakmap
        this.controls.push([format, input]);
    }

}
export default GiraffeToolbar