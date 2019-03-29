// 除法
import { IPluginOperator, PLUGIN_TYPE } from '../computer';

export const jiaoPlugin: IPluginOperator = {
  type: PLUGIN_TYPE.operator,
  symbol: '角',
  priority: 2,
  params: 1,
  resolve: (x: number[]) => {
    return x[0] / 10;
  }
};

export const yuanPlugin: IPluginOperator = {
  type: PLUGIN_TYPE.operator,
  symbol: '元',
  priority: 2,
  params: 1,
  resolve: (x: number[]) => {
    return x[0];
  }
};
