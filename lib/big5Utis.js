// ref: https://github.com/ashtuchkin/iconv-lite/blob/master/encodings/tables/cp950.json
import big5_table from "./gfc_cp950.json";

export const big5Utis = {
  /**
   *
   * @param {string} string 要轉換為big5 URL編碼的字串
   * @return {String} 編碼過後的字串 例：測試=>%b4%fa%b8%d5，若轉換不出來變問號「?」=>%3F
   */
  encodeBig5(string = "") {
    if (typeof string !== "string") {
      return string;
    }
    var encode_return = "",
      arr = "";
    string.split("").forEach(function (v) {
      if (v.charCodeAt() < 127) {
        //ASCII碼直接加'%'
        return (encode_return +=
          "%" + ("00" + v.charCodeAt().toString(16)).slice(-2));
      }
      arr = big5_table.find(function (el) {
        return el[1].includes(v);
      });
      if (arr) {
        return (encode_return +=
          "%" +
          arr[0].slice(0, 2) +
          "%" +
          (parseInt(arr[0].slice(2), 16) + arr[1].indexOf(v)).toString(16));
      }
      return (encode_return += "%3f");
    });
    return encode_return;
  },
  /**
   * 取得字串寫進informix db之後的長度
   * @example
   * // returns 16
   * getNonBig5Text("測試abc123あいえ");
   * @param {string} text 需計算長度之字串
   * @return {number} 回傳字串進informix db後之長度
   */
  countBig5Text(text) {
    let counter = 0;
    // https://stackoverflow.com/questions/1966476/how-can-i-process-each-letter-of-text-using-javascript
    for (const c of text) {
      c.charCodeAt() < 127 ? counter++ : (counter += 2);
    }
    return counter;
  },
  /**
   * 取得非崇友informix支援之字串
   * @example
   * // returns "あ,い,え"
   * getNonBig5Text("測試abc123あいえ");
   * @param {string} text 原始字串
   * @return {string} 回傳不包含在big5(cp950)之字串
   */
  getNonBig5Text(text) {
    let nonBig5Texts = [];
    for (const c of text) {
      if (c.charCodeAt() >= 127) {
        if (this.encodeBig5(c) == "%3f") {
          nonBig5Texts.push(c);
        }
      }
    }
    return nonBig5Texts.join();
  },
  /**
   * 檢查字串是否包含非崇友informix支援big5文字
   * @param {String} text 原始字串
   * @return {boolean} true of false
   */
  hasNonBig5Text(text) {
    return this.getNonBig5Text(text) == "";
  },
};
