import Quill from "quill";

import myicons from "./ui/icons";
let Size = Quill.import('attributors/style/size');
Size.whitelist = ['9pt', '10pt', '11pt', '12pt','14pt','16pt','18pt','22pt','24pt','30pt','36pt'];
Quill.register(Size, true);

import ImageResize from 'quill-image-resize-module';

Quill.register('modules/imageResize', ImageResize);

import { ImageDrop } from 'quill-image-drop-module';

Quill.register('modules/imageDrop', ImageDrop);

const icons = Quill.import("ui/icons");
// let s = myicons;
// debugger
// //icons['background'] = '<svg style="background: url("'+myicons.background+'")">';
// //icons['background'] = icons.background;
// icons['background'] = myicons.background;
Object.assign(icons,myicons);
class Giraffe extends Quill{

    constructor(container, options) {
        super(container,options)
    }
}
export default Giraffe