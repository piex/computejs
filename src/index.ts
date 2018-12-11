/**
 * 1、如果遇到操作数，我们就直接将压入操作数栈。
 * 2、如果遇到操作符，则我们将其放入到操作符栈中，遇到左括号时我们也将其放入操作符栈中。
 * 3、如果遇到一个右括号，则将栈元素弹出，将弹出的操作符输出直到遇到左括号为止。
 * 4、如果遇到任何其他的操作符，如（“+”， “*”，“（”）等，从栈中弹出元素直到遇到发现更低优先级的元素(或者栈为空)为止。弹出完这些元素后，才将遇到的操作符压入到栈中。有一点需要注意，只有在遇到" ) "的情况下我们才弹出" ( "，其他情况我们都不会弹出" ( "。
 * 5、如果我们读到了输入的末尾，则将栈中所有元素依次弹出。
 */

 import { BigNumber } from 'bignumber.js';

 // 将字符串表达式解析为数组
 function parse(expression: string) {
  // 去掉空格
  const exp = expression.replace(/\s/gi, '');

  const expArr: string[] = [];

  const reg = /\+|-|\*|\/|\%|\(|\)/g;

  let i = 0;
  const len = exp.length;

  while (i < len) {
    const op = reg.exec(exp);

    if (op === null) {
      if (i < len) {
        const last = exp.slice(i, len);
        // const num = /\./.test(next) ? parseFloat(next) : parseInt(next, 10);
        expArr.push(last);
      }
      break;
    }

    const cur = op.index;


    const pre = exp.slice(i, cur);
    if (cur !== i)  {
      // const num = /\./.test(pre) ? parseFloat(pre) : parseInt(pre, 10);
      expArr.push(pre);
    }

    expArr.push(op[0]);

    i = cur + 1;
  }

  return expArr;
}

 function computer(a: number, b: number, op: string) {
   const x = new BigNumber(a);
   switch (op) {
    case '+':
      return x.plus(b).toNumber() ;
    case '-':
      return x.minus(b).toNumber() ;
    case '*':
      return x.multipliedBy(b).toNumber() ;
    case '/':
      return x.dividedBy(b).toNumber() ;
    case '%':
      return x.mod(b).toNumber() ;
  }
}

// 判断是否为操作符
 function isOperator(v: string) {
  const operatorString = '+-*/%()';
  return operatorString.indexOf(v) > -1;
}

// 获取操作符优先级
 function getPrioraty(o: string) {
  switch (o) {
    case '+':
    case '-':
      return 1;
    case '*':
    case '/':
    case '%':
      return 2;
    default:
      return 0;
  }
}

// 判断操作符的优先级
 function prioraty(o1: string, o2: string) {
   return getPrioraty(o1) <= getPrioraty(o2);
}


 function calc(expression: string) {
  const expArr = parse(expression);
   // 构建两个栈 operand:操作数，operator:操作符
  const operand: number[] = [];
  const operator: string[] = [];

  expArr.forEach(cur => {
  if (isOperator(cur)) {
      if (cur === '(') {
        operator.push(cur);
      } else if (cur === ')') {
        while (true) {
          if (operator.length < 1) { break; }
          const op = operator.pop();
          if (op === '(') { break;  }
          const a = operand.pop();
          const b = operand.pop();
          operand.push(computer(b, a, op));
        }
      } else if (prioraty(cur, operator[operator.length - 1])) {
        const a = operand.pop();
        const b = operand.pop();
        const op = operator.pop();

        operand.push(computer(b, a, op));
        operator.push(cur);
      } else {
        operator.push(cur);
      }
    } else {
      operand.push(parseFloat(cur));
    }
  });

  while (operator.length > 0) {
    const a = operand.pop();
    const b = operand.pop();
    const op = operator.pop();
    operand.unshift(computer(b, a, op));
  }

  return operand[0];
}

 export default calc;
