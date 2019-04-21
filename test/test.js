var assert = require('assert');
var Utils = require("../lib/utils/Utils")
// function textOfStockcodeOnClick(text){
//   // (((002|000|300|600)[\d]{3})|60[\d]{4})
//   // ((002|000|300|600|601|603|60[\d]{1})[\d]{3})
//   text = text.replace(/((002|000|300|600|601|603|60[\d]{1})[\d]{3})/,function(match,param1){
//       let astock = `<a className="stockcode" data-stockclick="${match}">${match}</a>`
//       return astock
//   })
//   return text
// }
// console.log(textOfStockcodeOnClick("sadasd6008945dsa"))
describe('Utils', function() {
  describe('#textOfStockcodeOnClick()', function() {
    it('should back a tag', function() {
      assert.equal(Utils.textOfStockcodeOnClick("sadasd6008945dsa"), `sadasd<a className="stockcode" data-stockclick="600894">600894</a>5dsa`);
    });
  });
});