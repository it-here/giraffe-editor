import Quill from "quill";


let Size = Quill.import('attributors/style/size');
Size.whitelist = ['9pt', '10pt', '11pt', '12pt','14pt','16pt','18pt','22pt','24pt','30pt','36pt'];
Quill.register(Size, true);

import ImageResize from 'quill-image-resize-module';

Quill.register('modules/imageResize', ImageResize);

import { ImageDrop } from 'quill-image-drop-module';

Quill.register('modules/imageDrop', ImageDrop);

const icons = Quill.import("ui/icons");

class Giraffe extends Quill{

    constructor(container, options) {
        super(container,options)
    }
}
export default Giraffe