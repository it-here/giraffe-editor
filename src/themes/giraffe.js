/**
 * Created by Bane.Shi.
 * Copyright MoenSun
 * User: Bane.Shi
 * Date: 2019-05-25
 * Time: 10:40
 */
import extend from 'extend';
import Quill from "quill";
import Delta from 'quill-delta';
import Emitter from "quill/core/emitter";
import InsertPicker from "../ui/insert-picker";
const IconPicker = Quill.import("ui/icon-picker");
const ColorPicker = Quill.import("ui/color-picker");
const Picker = Quill.import("ui/picker");
const SnowTheme = Quill.import("themes/snow");
const Tooltip = Quill.import("ui/tooltip");

const LinkBlot = Quill.import("formats/link");

import Keyboard from 'quill/modules/keyboard';

import icons from "../ui/icons";

import {formulaHandler,
    imageHandler,
    videoHandler,
    linkHandler,
    coverHandler,
    insertsHandler} from "../handlers/index";


const ALIGNS = [ false, 'center', 'right', 'justify' ];

const COLORS = [
    "#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff",
    "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff",
    "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff",
    "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2",
    "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466"
];

const FONTS = [ false, 'serif', 'monospace' ];

const HEADERS = [ '1', '2', '3', false ];

const SIZES = [ 'small', false, 'large', 'huge' ];

class GiraffeTheme extends SnowTheme{

    constructor(quill, options) {
        super(quill, options);

        let listener = (e) => {
            if (!document.body.contains(quill.root)) {
                return document.body.removeEventListener('click', listener);
            }
            if (this.tooltip != null && !this.tooltip.root.contains(e.target) &&
                document.activeElement !== this.tooltip.textbox && !this.quill.hasFocus()) {
                this.tooltip.hide();
            }

            if (this.pickers != null) {
                this.pickers.forEach(function(picker) {
                    if (!picker.container.contains(e.target)) {
                        picker.close();
                    }
                });
            }

            let insertPicker = document.querySelector(".ql-inserts-label");
            let insertBtn = document.querySelector(".ql-inserts");
            if(insertPicker){
                if( !insertPicker.contains(e.target)  && !insertBtn.contains(e.target) ){
                    insertPicker.classList.remove("ql-expanded");
                }
            }
        };
        quill.emitter.listenDOM('click', document.body, listener);

    }

    extendToolbar(toolbar) {
        toolbar.container.classList.add('ql-snow');
        this.buildButtons([].slice.call(toolbar.container.querySelectorAll('button')), icons);
        this.buildPickers([].slice.call(toolbar.container.querySelectorAll('select')), icons);
        this.tooltip = new GiraffeTooltip(this.quill, this.options.bounds);
        if (toolbar.container.querySelector('.ql-link')) {
            this.quill.keyboard.addBinding({ key: 'K', shortKey: true }, function(range, context) {
                toolbar.handlers['link'].call(toolbar, !context.format.link);
            });
        }
    }

    extendGiraffeToolbar(toolbar){
        console.log(toolbar)
    }


    addModule(name) {
        let module = super.addModule(name);
        if (name === 'toolbar') {
            this.extendGiraffeToolbar(module);
        }
        return module;
    }

    buildButtons(buttons, icons) {
        buttons.forEach((button) => {
            let className = button.getAttribute('class') || '';
            if(button.parentElement.classList.contains('ql-inserts-label')){
                let innerText = button.innerText;
                className.split(/\s+/).forEach((name) => {
                    button.classList.add('ql-hover-button');
                    if (!name.startsWith('ql-')) return;
                    name = name.slice('ql-'.length);
                    let icon = null;

                    if (name === 'direction') {
                        icon = icons[name][''] + icons[name]['rtl'];
                    } else if (typeof icons[name] === 'string') {
                        icon = icons[name];
                    } else {
                        let value = button.value || '';
                        if (value != null && icons[name][value]) {
                            icon = icons[name][value];
                        }
                    }
                    button.innerHTML = "";

                    let spanWrapper = document.createElement('span');
                    spanWrapper.classList.add('ql-button');
                    spanWrapper.innerHTML = icon;

                    let spanText = document.createElement('span');
                    spanText.innerHTML = innerText;
                    spanText.classList.add('ql-button-text');

                    spanWrapper.append(spanText);
                    button.append(spanWrapper);
                });

            }else {
                className.split(/\s+/).forEach((name) => {
                    if (!name.startsWith('ql-')) return;
                    name = name.slice('ql-'.length);
                    if (icons[name] == null) return;
                    if (name === 'direction') {
                        button.innerHTML = icons[name][''] + icons[name]['rtl'];
                    } else if (typeof icons[name] === 'string') {
                        button.innerHTML = icons[name];
                    } else {
                        let value = button.value || '';
                        if (value != null && icons[name][value]) {
                            button.innerHTML = icons[name][value];
                        }
                    }
                });
            }
        });
    }

    buildPickers(selects, icons) {
        this.pickers = selects.map((select) => {
            if( select.parentElement.classList.contains('ql-inserts-label') ){
                if (select.querySelector('option') == null) {
                    fillSelect(select, ALIGNS);
                }
                return new InsertPicker(select);
            }
            else if (select.classList.contains('ql-align')) {
                if (select.querySelector('option') == null) {
                    fillSelect(select, ALIGNS);
                }
                return new IconPicker(select, icons.align);
            } else if (select.classList.contains('ql-background') || select.classList.contains('ql-color')) {
                let format = select.classList.contains('ql-background') ? 'background' : 'color';
                if (select.querySelector('option') == null) {
                    fillSelect(select, COLORS, format === 'background' ? '#ffffff' : '#000000');
                }
                return new ColorPicker(select, icons[format]);
            } else {
                if (select.querySelector('option') == null) {
                    if (select.classList.contains('ql-font')) {
                        fillSelect(select, FONTS);
                    } else if (select.classList.contains('ql-header')) {
                        fillSelect(select, HEADERS);
                    } else if (select.classList.contains('ql-size')) {
                        fillSelect(select, SIZES);
                    }
                }
                return new Picker(select);
            }
        });
        let update = () => {
            this.pickers.forEach(function(picker) {
                picker.update();
            });
        };
        this.quill.on(Emitter.events.EDITOR_CHANGE, update);
    }

    showInserts(){

    }



}

GiraffeTheme.DEFAULTS = extend(true, {}, SnowTheme.DEFAULTS, {
    modules: {
        toolbar: {
            handlers: {
                inserts: insertsHandler,
                formula: formulaHandler,
                image: imageHandler,
                video: videoHandler,
                link: linkHandler,
                cover: coverHandler,
            }
        }
    }
});

class GiraffeTooltip extends Tooltip{
    constructor(quill, boundsContainer) {
        super(quill, boundsContainer);
        this.textbox = this.root.querySelector('input[type="text"]');
        this.preview = this.root.querySelector('a.ql-preview');
        this.listen();
    }

    listen() {
        this.textbox.addEventListener('keydown', (event) => {
            if (Keyboard.match(event, 'enter')) {
                this.save();
                event.preventDefault();
            } else if (Keyboard.match(event, 'escape')) {
                this.cancel();
                event.preventDefault();
            }
        });

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

    cancel() {
        this.hide();
    }

    edit(mode = 'link', preview = null) {
        this.root.classList.remove('ql-hidden');
        this.root.classList.add('ql-editing');
        if (preview != null) {
            this.textbox.value = preview;
        } else if (mode !== this.root.getAttribute('data-mode')) {
            this.textbox.value = '';
        }
        this.position(this.quill.getBounds(this.quill.selection.savedRange));
        this.textbox.select();
        this.textbox.setAttribute('placeholder', this.textbox.getAttribute(`data-${mode}`) || '');
        this.root.setAttribute('data-mode', mode);
    }

    restoreFocus() {
        let scrollTop = this.quill.scrollingContainer.scrollTop;
        this.quill.focus();
        this.quill.scrollingContainer.scrollTop = scrollTop;
    }

    save() {
        let value = this.textbox.value;
        debugger
        switch(this.root.getAttribute('data-mode')) {
            case 'link': {
                let scrollTop = this.quill.root.scrollTop;
                if (this.linkRange) {
                    this.quill.formatText(this.linkRange, 'link', value, Emitter.sources.USER);
                    delete this.linkRange;
                } else {
                    this.restoreFocus();
                    this.quill.format('link', value, Emitter.sources.USER);
                }
                this.quill.root.scrollTop = scrollTop;
                break;
            }
            case 'video': {
                value = extractVideoUrl(value);
                if (!value) break;
                let range = this.quill.getSelection(true);
                if (range != null) {
                    let index = range.index + range.length;
                    this.quill.insertEmbed(index, this.root.getAttribute('data-mode'), value, Emitter.sources.USER);
                    this.quill.setSelection(index + 2, Emitter.sources.USER);
                }
                break;
            } // eslint-disable-next-line no-fallthrough
            case 'url':{
                value = extractVideoUrl(value);
                if (!value) break;
                let range = this.quill.getSelection(true);
                if (range != null) {
                    // let index = range.index + range.length;
                    // this.quill.insertEmbed(index, this.root.getAttribute('data-mode'), value, Emitter.sources.USER);
                    // this.quill.setSelection(index + 2, Emitter.sources.USER);

                    this.quill.updateContents(new Delta()
                            .retain(range.index)
                            .delete(range.length)
                            .insert({ image: value })
                        , Emitter.sources.USER);
                    this.quill.setSelection(range.index + 1, Emitter.sources.SILENT);

                }
                break;
            }
            case 'formula': {
                if (!value) break;
                let range = this.quill.getSelection(true);
                if (range != null) {
                    let index = range.index + range.length;
                    this.quill.insertEmbed(index, this.root.getAttribute('data-mode'), value, Emitter.sources.USER);
                    if (this.root.getAttribute('data-mode') === 'formula') {
                        this.quill.insertText(index + 1, ' ', Emitter.sources.USER);
                    }
                    this.quill.setSelection(index + 2, Emitter.sources.USER);
                }
                break;
            }
            default:
        }
        this.textbox.value = '';
        this.hide();
    }

    show() {
        super.show();
        this.root.removeAttribute('data-mode');
    }

}

function extractVideoUrl(url) {
    let match = url.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/) ||
        url.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtu\.be\/([a-zA-Z0-9_-]+)/);
    if (match) {
        return (match[1] || 'https') + '://www.youtube.com/embed/' + match[2] + '?showinfo=0';
    }
    if (match = url.match(/^(?:(https?):\/\/)?(?:www\.)?vimeo\.com\/(\d+)/)) {  // eslint-disable-line no-cond-assign
        return (match[1] || 'https') + '://player.vimeo.com/video/' + match[2] + '/';
    }
    return url;
}

function fillSelect(select, values, defaultValue = false) {
    values.forEach(function(value) {
        let option = document.createElement('option');
        if (value === defaultValue) {
            option.setAttribute('selected', 'selected');
        } else {
            option.setAttribute('value', value);
        }
        select.appendChild(option);
    });
}

GiraffeTooltip.TEMPLATE = [
    '<a class="ql-preview" target="_blank" href="about:blank"></a>',
    '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL" data-url="">',
    '<a class="ql-action"></a>',
    '<a class="ql-remove"></a>'
].join('');

export default GiraffeTheme