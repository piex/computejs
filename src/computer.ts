/**
 * 1）如果遇到操作数，我们就直接将其输出。
 * 2）如果遇到操作符，则我们将其放入到栈中，遇到左括号时我们也将其放入栈中。
 * 3）如果遇到一个右括号，则将栈元素弹出，将弹出的操作符输出直到遇到左括号为止。注意，左括号只弹出并不输出。
 * 4）如果遇到任何其他的操作符，如（“+”， “*”，“（”）等，从栈中弹出元素直到遇到发现更低优先级的元素(或者栈为空)为止。弹出完这些元素后，才将遇到的操作符压入到栈中。有一点需要注意，只有在遇到" ) "的情况下我们才弹出" ( "，其他情况我们都不会弹出" ( "。
 * 5）如果我们读到了输入的末尾，则将栈中所有元素依次弹出。
 */

export enum PLUGIN_TYPE {
  operator = 'operator',
  brackets = 'brackets',
  operand = 'operand',
}

export interface IPluginOperator {
  type: PLUGIN_TYPE.operator;
  symbol: string;
  priority: number;
  params: number;
  resolve: (x: number[]) => number;
}

export interface IPluginBrackets {
  type: PLUGIN_TYPE.brackets;
  priority: number;
  open: string;
  close: string;
}

export interface IPluginOperand {
  type: PLUGIN_TYPE.operand;
  symbol: string;
  resolve: (x: number) => number;
}

type Plugin = IPluginOperator | IPluginBrackets | IPluginOperand;
type Plugins = Plugin[];

// 需要转译的字符
const regTranslation = [
  '+',
  '*',
  '/',
  '%',
  '.',
  '?',
  ':',
  '!',
  '^',
  '$',
  '|',
  '#',
  '(',
  ')',
  '[',
  ']',
  '{',
  '}',
];

export class Computer {
  private plugins: { [key: string]: IPluginOperand | IPluginOperator } = {}; // kv 形式的 plugin
  private operators: string[] = []; // 所有的操作符
  private operand: string[] = [];
  private brackets: string[] = []; // 所有的 brackets 符号
  private bracketskv: { [key: string]: string } = {}; // 右括号作 key，左括号作 value

  private get symbolsReg(): RegExp {
    const operators = this.operators.map(op => {
      if (regTranslation.includes(op)) {
        return `\\${op}`;
      }
      return `(${op})`;
    });

    const operand = this.operand.map(op => {
      if (regTranslation.includes(op)) {
        return `\\${op}`;
      }
      return `(${op})`;
    });

    const brackets = this.brackets.map(op => {
      if (regTranslation.includes(op)) {
        return `\\${op}`;
      }
      return op;
    });

    const regArr = [...operators, ...operand, ...brackets];

    return new RegExp(regArr.join('|'), 'g');
  }

  public addPlugins(plugins: Plugins): void {
    plugins.forEach(plugin => {
      this.addPlugin(plugin.type, plugin);
    });
  }

  public addPlugin(type: PLUGIN_TYPE, plugin: Plugin): void {
    if (type === PLUGIN_TYPE.operator) {
      // 操作符
      const { symbol } = plugin as IPluginOperator;
      this.operators.push(symbol);
      this.plugins[symbol] = plugin as IPluginOperator;
    } else if (type === PLUGIN_TYPE.operand) {
      // 操作数
      const { symbol } = plugin as IPluginOperand;
      this.operand.push(symbol);
      this.plugins[symbol] = plugin as IPluginOperand;
    } else if (type === PLUGIN_TYPE.brackets) {
      // 括号
      const { open, close } = plugin as IPluginBrackets;
      this.brackets.push(open, close);
      this.bracketskv[close] = open;
    }
  }

  public transToRPN(expArr: string[]): string[] {
    const stack: string[] = [];
    const RPN: string[] = [];

    expArr.forEach(cur => {
      if (this.isOperator(cur)) {
        // 如果是操作符
        while (
          stack.length > 0 &&
          !this.brackets.includes(stack[stack.length - 1]) &&
          this.comparePrioratyies(cur, stack[stack.length - 1]) !== 'more'
        ) {
          RPN.push(stack.pop());
        }
        stack.push(cur);
      } else if (this.isOpenBrackets(cur)) {
        stack.push(cur);
      } else if (this.isCloseBrackets(cur)) {
        while (true) {
          const op = stack.pop();
          if (op === this.bracketskv[cur]) {
            break;
          } else {
            RPN.push(op);
          }
        }
      } else {
        RPN.push(cur);
      }
    });

    while (stack.length > 0) {
      RPN.push(stack.pop());
    }

    return RPN;
  }

  public calc(expression: string): number {
    const expArr = this.parse(expression);
    const RPN = this.transToRPN(expArr);

    const operand: number[] = [];
    RPN.forEach(cur => {
      if (this.isOperator(cur)) {
        const cbparam: number[] = [];
        const { params, resolve } = this.plugins[cur] as IPluginOperator;
        for (let i = 1; i <= params; i++) {
          cbparam.unshift(operand.pop());
        }

        const res = resolve(cbparam);
        operand.push(res);
      } else {
        operand.push(parseFloat(cur));
      }
    });

    return operand[0];
  }

  private parse(expression: string): string[] {
    // 去掉空格
    const exp = expression.replace(/\s/gi, '');

    const expArr: string[] = [];

    const reg = this.symbolsReg;

    let i = 0;
    const len = exp.length;

    while (i < len) {
      const op = reg.exec(exp);

      if (op === null) {
        if (i < len) {
          const last = exp.slice(i, len);
          expArr.push(last);
        }
        break;
      }

      const cur = op.index;

      const pre = exp.slice(i, cur);
      if (cur !== i) {
        expArr.push(pre);
      }

      expArr.push(op[0]);

      i = cur + op[0].length;
    }

    return expArr;
  }

  // 判断是否为操作符
  private isOperator(v: string): boolean {
    return this.operators.includes(v);
  }

  // 是否为操作数
  // private isOperand(v: string): boolean {
  //   return this.operand.includes(v);
  // }

  // 是否为开括号
  private isOpenBrackets(op: string): boolean {
    return this.brackets.includes(op) && typeof this.bracketskv[op] === 'undefined';
  }

  // 是否为闭括号
  private isCloseBrackets(op: string): boolean {
    return typeof this.bracketskv[op] !== 'undefined';
  }

  // 获取操作符分优先级
  private getPrioraty(v: string): number {
    return (this.plugins[v] as IPluginOperator).priority;
  }

  // 判断操作符的优先级
  private comparePrioratyies(op1: string, op2: string): 'more' | 'less' | 'equal' {
    if (this.getPrioraty(op1) > this.getPrioraty(op2)) {
      return 'more';
    } else if (this.getPrioraty(op1) === this.getPrioraty(op2)) {
      return 'equal';
    } else {
      return 'less';
    }
  }
}

export function creatComputer(plugins?: Plugins) {
  const calc = new Computer();
  calc.addPlugins(plugins);
  return calc.calc;
}
