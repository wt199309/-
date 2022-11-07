const TOKEN_KEY = "token";
const REST_URL = "https://study.duyiedu.com";

/**
 * 用户注册
 * @param {obj} userInfo 一个对象，需要有用户名loginId、昵称nickname、密码loginPwd
 */
async function reg(userInfo) {
  const resp = await fetch(REST_URL + "/api/user/reg", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  });
  return await resp.json();
}
/**
 * 用户登录
 * @param {obj} loginInfo
 * @returns
 */
async function login(loginInfo) {
  const resp = await fetch(REST_URL + "/api/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginInfo),
  });
  const result = await resp.json();
  if (result.code === 0) {
    //登录成功
    //将响应头中的token保存到localStorage
    const token = resp.headers.get("authorization");
    localStorage.setItem(TOKEN_KEY, token);
  }
  return result;
}
/**
 * 用户名验证
 * @param {string} loginId
 * @returns
 */
async function exists(loginId) {
  const resp = await fetch(REST_URL + "/api/user/exists?loginId=" + loginId);
  return await resp.json();
}
/**
 * 获取当前登录的用户信息
 */
async function profile() {
  const token = localStorage.getItem("token");
  const resp = await fetch(REST_URL + "/api/user/profile", {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return await resp.json();
}
/**
 * 发送聊天消息
 * @param {*} content
 * @returns
 */
async function senChat(content) {
  const token = localStorage.getItem("token");
  const resp = await fetch(REST_URL + "/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(content),
  });
  return await resp.json();
}
/**
 * 获取聊天记录
 */
async function getHistory() {
  const token = localStorage.getItem("token");
  const resp = await fetch(REST_URL + "/api/chat/history", {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return await resp.json();
}
