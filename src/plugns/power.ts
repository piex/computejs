// 乘方
import { IPluginOperator, PLUGIN_TYPE } from '../computer';

const powerPlugin: IPluginOperator = {
  type: PLUGIN_TYPE.operator,
  symbol: '^',
  priority: 3,
  params: 2,
  resolve: (x: number[]) => {
    return Math.pow(x[0], x[1]);
  }
};

export default powerPlugin;
