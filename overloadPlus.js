function stringifyWithFunctions(object) {
  return JSON.stringify(object, (key, val) => {
    if (typeof val === 'function') {
      return `(${val})`;
    }
    return val;
  });
};

function parseWithFunctions(obj) {
  return JSON.parse(obj, (k, v) => {
    if (typeof v === 'string' && v.indexOf('function') >= 0) {
      return eval(v);
    }
    return v;
  });
};
const o = {
  $overload(obj){
    return obj.constructor.name + stringifyWithFunctions(obj) + " ";
  },
  $p(str){
    let objStrings = str.split(' ');
    objStrings.pop();
    objStrings = objStrings.map(str => {
      const matches = /([A-Za-z0-9$]+)\{(.+)\}/.exec(str);
      const obj = new (eval(matches[1]))();
      const props = parseWithFunctions("{" + matches[2] + "}");
      Object.assign(obj, props);
      return obj;
    });
    return objStrings.reduce((t, v) => t.$plus(v));
  }
}
if(module){
  module.exports = o;
}
export default o;
