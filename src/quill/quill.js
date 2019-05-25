/**
 * Created by Bane.Shi.
 * Copyright MoenSun
 * User: Bane.Shi
 * Date: 2019-05-19
 * Time: 10:30
 */
import Quill from "quill";
import Icons from "../ui/icons";
import snow from "./../themes/giraffe"
import ImageResize from 'quill-image-resize-module';
import { ImageDrop } from 'quill-image-drop-module';

let AlignStyle = Quill.import('attributors/style/align');

let SizeStyle = Quill.import('attributors/style/size');
SizeStyle.whitelist = ['9pt', '10pt', '11pt', '12pt','14pt','16pt','18pt','22pt','24pt','30pt','36pt'];


Quill.register({
    'formats/align': AlignStyle,
    'formats/size': SizeStyle,
    'themes/snow': snow,
    'ui/icons': Icons
}, true);



Quill.register('modules/imageResize', ImageResize);

Quill.register('modules/imageDrop', ImageDrop);

export default Quill;