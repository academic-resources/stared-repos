/*

(function anonymous() {
   debugger;
})();

(() => {
   debugger;
})();

*/

// 无限循环，锁死 debugger

(function anonymous() {
   debugger;
   anonymous();
})();
