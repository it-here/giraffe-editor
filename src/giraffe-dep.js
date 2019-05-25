import Quill from "./quill/giraffeQuill";


import ImageResize from 'quill-image-resize-module';

Quill.register('modules/imageResize', ImageResize);

import { ImageDrop } from 'quill-image-drop-module';

Quill.register('modules/imageDrop', ImageDrop);

class GiraffeDep extends Quill{

    constructor(container, options) {
        super(container,options)
    }
}
export default GiraffeDep