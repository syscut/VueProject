export const errorHandle = {
  /**
   *
   * @param {Error} e axios的錯誤訊息
   * @returns String
   */
  errMsg(e) {
    let errStatus = {
      500: "伺服器錯誤!",
      "Network Error": "網路異常，伺服器無回應",
      "could not prepare statement": "SQL 語法錯誤--",
    };
    let msg = "";
    Object.keys(errStatus).forEach((v) => {
      if (e?.response?.data?.message?.includes(v)) {
        msg = errStatus[v] + e.response.data.message;
      }
    });
    return msg;
  },
};
{
  // org.hibernate.exception.SQLGrammarException: could not prepare statement sql語法錯誤
  /* <div class="menu">
      <Menu-item />
    </div>
    <span style="color: yellow">★★★ 提醒您 ★★★</span>
    props: {
    src: {
      type: String,
      default:
        "http://gfcweb/gfc/IDe25b8e68fa1246/?MIval=/gfc/prgr100.html&lang=T",
    },
  },
    */
}
