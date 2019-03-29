// 圆括号
import { IPluginBrackets, PLUGIN_TYPE } from '../computer';

const parenPlugin: IPluginBrackets = {
  type: PLUGIN_TYPE.brackets,
  priority: 1000,
  open: '(',
  close: ')'
};

export default parenPlugin;
