/**
 * Created by Bane.Shi.
 * Copyright MoenSun
 * User: Bane.Shi
 * Date: 2019-05-26
 * Time: 21:56
 */
export default function(value) {
    if (value) {
        let range = this.quill.getSelection();
        if (range == null || range.length == 0) return;
        let preview = this.quill.getText(range);
        if (/^\S+@\S+\.\S+$/.test(preview) && preview.indexOf('mailto:') !== 0) {
            preview = 'mailto:' + preview;
        }
        let tooltip = this.quill.theme.tooltip;
        tooltip.edit('link', preview);
    } else {
        this.quill.format('link', false);
    }
}