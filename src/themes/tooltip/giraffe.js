/**
 * Created by Bane.Shi.
 * Copyright MoenSun
 * User: Bane.Shi
 * Date: 2019-05-27
 * Time: 19:37
 */
import Quill from "quill";
import BaseTooltip from "./base";
const LinkBlot = Quill.import("formats/link");
import {Range} from "quill/core/selection";
import Emitter from "quill/core/emitter";

class GiraffeTooltip extends BaseTooltip{
    constructor(quill, bounds) {
        super(quill, bounds);
        this.preview = this.root.querySelector('a.ql-preview');
    }

    listen() {
        super.listen();
        this.root.querySelector('a.ql-action').addEventListener('click', (event) => {
            if (this.root.classList.contains('ql-editing')) {
                this.save();
            } else {
                this.edit('link', this.preview.textContent);
            }
            event.preventDefault();
        });
        this.root.querySelector('a.ql-remove').addEventListener('click', (event) => {
            if (this.linkRange != null) {
                let range = this.linkRange;
                this.restoreFocus();
                this.quill.formatText(range, 'link', false, Emitter.sources.USER);
                delete this.linkRange;
            }
            event.preventDefault();
            this.hide();
        });
        this.quill.on(Emitter.events.SELECTION_CHANGE, (range, oldRange, source) => {
            if (range == null) return;
            if (range.length === 0 && source === Emitter.sources.USER) {
                let [link, offset] = this.quill.scroll.descendant(LinkBlot, range.index);
                if (link != null) {
                    this.linkRange = new Range(range.index - offset, link.length());
                    let preview = LinkBlot.formats(link.domNode);
                    this.preview.textContent = preview;
                    this.preview.setAttribute('href', preview);
                    this.show();
                    this.position(this.quill.getBounds(this.linkRange));
                    return;
                }
            } else {
                delete this.linkRange;
            }
            this.hide();
        });
    }

    show() {
        super.show();
        this.root.removeAttribute('data-mode');
    }
}

GiraffeTooltip.TEMPLATE = [
    '<a class="ql-preview" target="_blank" href="about:blank"></a>',
    '<input type="text" data-formula="e=mc^2" data-link="https://www.ithere.net" data-video="Embed URL" data-image-url="图片地址">',
    '<a class="ql-action"></a>',
    '<a class="ql-remove"></a>'
].join('');

export default GiraffeTooltip