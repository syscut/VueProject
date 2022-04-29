export const valid = {
  /**
   *
   * @param {String} n 身分證字號
   * @returns Boolean
   */
  checkId(n) {
    let idnum = {
      A: 10,
      B: 11,
      C: 12,
      D: 13,
      E: 14,
      F: 15,
      G: 16,
      H: 17,
      I: 34,
      J: 18,
      K: 19,
      L: 20,
      M: 21,
      N: 22,
      O: 35,
      P: 23,
      Q: 24,
      R: 25,
      S: 26,
      T: 27,
      U: 28,
      V: 29,
      W: 32,
      X: 30,
      Y: 31,
      Z: 33,
    };

    let plus = [1, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1];

    let parseNumArr = Array.from(
      idnum[n.slice(0, 1).toUpperCase()] + n.slice(1),
      Number
    );

    return (
      parseNumArr.reduce((pre, cur, i) => pre + cur * plus[i]) % 10 == 0 ||
      "身分證字號錯誤"
    );
  },
  /**
   *
   * @param {Number} n 統一編號
   * @returns Boolean || String
   */
  checkUnify(n) {
    let numArr = Array.from("" + n, Number);
    let mul = [1, 2, 1, 2, 1, 2, 4, 1];
    const plus = (arr) => {
      return arr
        .map((v, i) => Math.floor((v * mul[i]) / 10) + ((v * mul[i]) % 10))
        .reduce((p, c) => p + c);
    };
    if (numArr[6] !== 7) {
      return plus(numArr) % 10 == 0 || "統編錯誤";
    } else {
      numArr[6] == 0;
      let ans = plus(numArr);
      return ans % 10 == 0 || (ans + 1) % 10 == 0 || "統編錯誤";
    }
  },
};
