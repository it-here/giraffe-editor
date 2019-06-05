/**
 * Created by Bane.Shi.
 * Copyright MoenSun
 * User: Bane.Shi
 * Blog: http://blog.fengxiaotx.com
 * Date: 2019-06-05
 * Time: 07:47
 */
import Quill from "quill";

const Block =  Quill.import("blots/block");

class CodeBlock extends Block {

}
CodeBlock.blotName = 'code-block';
CodeBlock.tagName = 'PRE';
CodeBlock.TAB = '  ';
CodeBlock.defaultChild = 'code';


export { CodeBlock as default };
