// 加法
import { IPluginOperator, PLUGIN_TYPE } from '../computer';

const plusPlugin: IPluginOperator = {
  type: PLUGIN_TYPE.operator,
  symbol: '+',
  priority: 1,
  params: 2,
  resolve: (x: number[]) => {
    return x[0] + x[1];
  }
};

export default plusPlugin;
