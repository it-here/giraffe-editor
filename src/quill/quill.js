/**
 * Created by Bane.Shi.
 * Copyright MoenSun
 * User: Bane.Shi
 * Date: 2019-05-19
 * Time: 10:30
 */
import Quill from "quill";

let Size = Quill.import('attributors/style/size');
Size.whitelist = ['9pt', '10pt', '11pt', '12pt','14pt','16pt','18pt','22pt','24pt','30pt','36pt'];


const Icons = Object.assign(Quill.import("ui/icons"),require("../ui/icons"));


Quill.register({
    'formats/size': Size,
    'ui/icons': Icons,
}, true);


export default Quill;