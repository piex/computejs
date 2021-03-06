// 乘法
import { IPluginOperator, PLUGIN_TYPE } from '../computer';

const modPlugin: IPluginOperator = {
  type: PLUGIN_TYPE.operator,
  symbol: '%',
  priority: 2,
  params: 2,
  resolve: (x: number[]) => {
    return x[0] % x[1];
  }
};

export default modPlugin;
