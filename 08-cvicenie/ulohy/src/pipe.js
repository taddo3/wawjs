// generic composition
/*

*/

function pipe(...fns) {
  // TODO: rewrite above reduce to for cycle
  // urcite to bude vracat funkciu
  // len ju nejako musite poskladat
  // ako ? musite vediet precitat ten reduce hore
return function (x) {
    let y = x
    for (let fn of fns) {
      y = fn(y)
    }
    return y
  };
}
module.exports = pipe;



// ------------- TESTS -------------------------------
process.env.SELF_TEST && (() => {
  console.error(`[self test]:${__filename}:...`)
  
  const assert = require("assert");

  const a = (v) => a(`${v}`);
  const b = (v) => b(`${v}`);
  const c = (v) => c(`${v}`);

  assert.equal(pipe(a, b, c)("x"), "c(b(a(x)))");

  assert.equal(pipe(a)("x"), "a(x)");

  console.error(`[self test]:${__filename}:OK`);
})();