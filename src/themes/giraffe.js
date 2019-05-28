/**
 * Created by Bane.Shi.
 * Copyright MoenSun
 * User: Bane.Shi
 * Date: 2019-05-25
 * Time: 10:40
 */
import extend from 'extend';
import Quill from "quill";
import Emitter from "quill/core/emitter";
import InsertPicker from "../ui/insert-picker";

import icons from "../ui/icons";


import GiraffeTooltip from "./tooltip/giraffe";

const IconPicker = Quill.import("ui/icon-picker");
const ColorPicker = Quill.import("ui/color-picker");
const Picker = Quill.import("ui/picker");
const SnowTheme = Quill.import("themes/snow");

import {
    boldHandler,
    coverHandler,
    formulaHandler,
    imageHandler,
    insertsHandler,
    linkHandler,
    videoHandler
} from "../handlers/index";

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
                bold: boldHandler,
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



export default GiraffeTheme