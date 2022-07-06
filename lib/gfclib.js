export const glib = {
  /**
   * 依照傳入的Column Name And Column Value 產生SQL String，如果沒有alias或ignore可不必傳入參數
   * @param {object} field 所有欄位object EX : { item : " " , ct_no : " " , elev_no : " " . . .}
   * @param {object} alias 有alias的Column EX : { a : [ " item " , " ct_no " ] , b : [ "  elev_no " ] }
   * @param {array} ignore 不套用特殊查詢的Column EX : [ " remk " , . . . ]
   * @return and後的查詢條件
   */
  sqlBuilder(field = {}, alias = {}, ignore = []) {
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
