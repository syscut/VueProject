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
    };
    let msg = "";
    Object.keys(errStatus).forEach((v) => {
      if (e.message?.includes(v)) {
        msg = errStatus[v];
      }
    });
    return msg;
  },
};
{
  /* <div class="menu">
      <Menu-item />
    </div>
    <span style="color: yellow">★★★ 提醒您 ★★★</span> */
}
