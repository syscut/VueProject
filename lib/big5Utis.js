// ref: https://github.com/ashtuchkin/iconv-lite/blob/master/encodings/tables/cp950.json
import big5_table from "./gfc_cp950.json";
import gfc_axios_table from "./gfc_axios_characters.json";

export const big5Utis = {
  /**
   * 將透過axios取得wio傳出之字串轉換為崇友內部造字之字串
   * 注意: 此function會將常用字"包"轉為"琼"
   * @example
   * returns "測試abc123 堃菓蕋侊綉磘瀞亘"
   * axiosStringToGfc("測試abc123 𠕇鋛𠗟𣿅蕌䊵珯况");
   * @param {String} text 欲轉換之字串
   * @return {String} 轉換後之字串
   */
  axiosStringToGfc(text) {
    if (typeof text === "string") {
      const converted = [];
      for (let c of text) {
        if (gfc_axios_table[c] !== undefined) {
          converted.push(gfc_axios_table[c]);
        } else {
          converted.push(c);
        }
      }
      return converted.join("");
    } else {
      return text;
    }
  },
  /**
   *
   * @param {string} string 要轉換為big5 URL編碼的字串
   * @return {String} 編碼過後的字串 例：測試=>%b4%fa%b8%d5，若轉換不出來變問號「?」=>%3F
   */
  encodeBig5(string = "") {
    if (typeof string !== "string") {
      return string;
    }
    const encodes = [];
    for (const v of string) {
      if (v.charCodeAt() < 128) {
        encodes.push(encodeURIComponent(v));
      } else {
        let arr = big5_table.find(function (el) {
          return el[1].includes(v);
        });
        if (arr) {
          let index = -1;
          for (const char of arr[1]) {
            index++;
            // '==' won't work
            if (char.match(v)) break;
          }
          let hex = (parseInt(arr[0], 16) + index).toString(16);
          encodes.push(`%${hex.substring(0, 2)}%${hex.substring(2, 4)}`);
        } else {
          encodes.push("%3f");
        }
      }
    }
    return encodes.join("");
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
      c.charCodeAt() < 128 ? counter++ : (counter += 2);
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
    const nonBig5Texts = [];
    for (const c of text) {
      if (c.charCodeAt() >= 128) {
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
