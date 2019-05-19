/**
 * Created by Bane.Shi.
 * Copyright MoenSun
 * User: Bane.Shi
 * Date: 2019-05-19
 * Time: 10:28
 */
import Parchment from 'parchment';

let SizeStyle = new Parchment.Attributor.Style('size', 'font-size', {
    scope: Parchment.Scope.INLINE,
    whitelist: ['9pt', '10pt', '11pt', '12pt','14pt','16pt','18pt','22pt','24pt','30pt','36pt']
});

export { SizeStyle };