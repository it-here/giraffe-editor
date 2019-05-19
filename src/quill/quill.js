/**
 * Created by Bane.Shi.
 * Copyright MoenSun
 * User: Bane.Shi
 * Date: 2019-05-19
 * Time: 10:30
 */
import Quill from "quill";

let AlignStyle = Quill.import('attributors/style/align');

let SizeStyle = Quill.import('attributors/style/size');
SizeStyle.whitelist = ['9pt', '10pt', '11pt', '12pt','14pt','16pt','18pt','22pt','24pt','30pt','36pt'];


const Icons = Object.assign(Quill.import("ui/icons"),require("../ui/icons"));


Quill.register({
    'formats/align': AlignStyle,
    'formats/size': SizeStyle,
    'ui/icons': Icons,
}, true);


export default Quill;