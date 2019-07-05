/**
 * Created by Bane.Shi.
 * Copyright MoenSun
 * User: Bane.Shi
 * Date: 2019-05-18
 * Time: 22:25
 */

import Quill from "quill";

let Icons ={
    'save': require('../icons/save.svg'),
    'clean'     : require('../icons/clean.svg'),
    // 'code'      : require('../icons/code.svg'),
    // 'code-block': require('../icons/code.svg'),
    // 'indent': {
    //     '+1'      : require('../icons/indent.svg'),
    //     '-1'      : require('../icons/outdent.svg')
    // },
    'cover': require('../icons/cover.svg')
};
Icons = Object.assign(Quill.import("ui/icons"),Icons);
export default Icons;