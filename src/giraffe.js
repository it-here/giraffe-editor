import Quill from "quill";

const icons = Quill.import("ui/icons");
let Size = Quill.import('attributors/style/size');
Size.whitelist = ['9pt', '10pt', '11pt', '12pt','14pt','16pt','18pt','22pt','24pt','30pt','36pt'];
Quill.register(Size, true);
class Giraffe extends Quill{

    constructor(container, options) {
        super(container,options)
    }
}
export default Giraffe