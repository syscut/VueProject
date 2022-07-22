export const glib = {
  /**
   * 依照傳入的Column Name And Column Value 產生SQL String，如果沒有alias或ignore可不必傳入參數
   * @param {object} field 所有欄位object EX : { item : " " , ct_no : " " , elev_no : " " . . .}
   * @param {object} alias 有alias的Column EX : { a : [ " item " , " ct_no " ] , b : [ "  elev_no " ] }
   * @param {array} ignore 不套用特殊查詢的Column EX : [ " remk " , . . . ]
   * @return and後的查詢條件
   */
  sqlAndBuilder(field = {}, alias = {}, ignore = []) {
    let sqlString = "";
    Object.entries(field).forEach((obj) => {
      const parsedVal = obj[1].toString().trim();
      if (parsedVal !== "") {
        sqlString += " and ";
        if (ignore.includes(obj[0])) {
          sqlString += `${obj[0]} = '${obj[1]}'`;
        } else {
          const aliasString = Object.keys(alias).find((k) =>
            alias[k].includes(obj[0])
          );
          if (aliasString !== undefined) {
            sqlString += parseSql(aliasString + "." + obj[0], parsedVal);
          } else {
            sqlString += parseSql(obj[0], parsedVal);
          }
        }
      }
    });
    return sqlString;
  },
  /**
   * 依照傳入的Column Name 產生SQL String，如果沒有alias可不必傳入參數
   * @param {object} field 所有欄位object EX : { item : " " , ct_no : " " , elev_no : " " . . .}
   * @param {object} alias 有alias的Column EX : { a : [ " item " , " ct_no " ] , b : [ "  elev_no " ] }
   * @return select a.item,b.ct_no...
   */
  sqlSelectBuilder(field = {}, alias = {}) {
    let sqlString = "select ";
    sqlString += Object.keys(field)
      .map((k) => {
        const aliasString = Object.keys(alias).find((a) =>
          alias[a].includes(k)
        );
        if (aliasString !== undefined) {
          return aliasString + "." + k;
        } else {
          return k;
        }
      })
      .join(",");
    return sqlString;
  },
  /**
   * 依照傳入的field key 與 Spring 回傳的result ,mapping 成 key value 的 object array ( 若field key 比 result 長,超過的key value 會是 undefined)
   * @param {object} field 所有欄位object EX : { item : " " , ct_no : " " , elev_no : " " . . . }
   * @param {array}  result spring回傳的結果 EX : [ [ 1 , " aaa " , " bbb " ] , [ 2 , "  ccc " , " ddd " ] . . . ]
   * @return object array EX : [ { item : 1 , ct_no : " aaa " , elev_no : " bbb "} , { item : 2 , ct_no : " ccc " , elev_no : " ddd "} . . . ]
   */
  resultMapping(field={},result=[]){
    let mappingResult = [];
    for(let r of result){
      let entries = [];
      Object.keys(field).forEach((v,i)=>entries.push([[v],r[i]]))
      mappingResult.push(Object.fromEntries(entries));
    }
    return mappingResult;
  }
};
function parseSql(k = "", v = "") {
  switch (true) {
    case /^(<|>)(?!=).+/.test(v):
      return `${k} ${v.slice(0, 1)} '${v.slice(1)}'`;
    case /^(<=|>=).+/.test(v):
      return `${k} ${v.slice(0, 2)} '${v.slice(2)}'`;
    case /^=$/.test(v):
      return `(${k} is null or ${k} = '')`;
    case /^!=$/.test(v):
      return `(${k} is not null or ${k} <> '')`;
    case /.*?:.*/.test(v):
      return `${k} between '${v.split(":")[0]}' and '${v.split(":")[1]}'`;
    case v.includes("*"):
      return `${k} like '${v.replaceAll("*", "%")}'`;
    case v.includes("?"):
      return `${k} like '${v.replaceAll("?", "_")}'`;
    case /^[^|].+[^|]$/.test(v) && v.includes("|") && !v.includes("||"):
      return `${k} in (${v
        .split("|")
        .map((v) => "'" + v + "'")
        .join(",")})`;
    default:
      return `${k} = '${v}'`;
  }
}
