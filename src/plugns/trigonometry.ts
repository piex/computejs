// 三角函数
// 圆括号
import { IPluginOperator, PLUGIN_TYPE } from '../computer';

export const sinPlugin: IPluginOperator = {
  type: PLUGIN_TYPE.operator,
  symbol: 'sin',
  priority: 500,
  params: 1,
  resolve: (x: number[]): number => {
    return  Math.sin(x[0]);
  }
};

