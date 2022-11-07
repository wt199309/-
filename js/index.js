//验证是否有登录，未登录调转到登录页面，已登录获取登录信息
(async function () {
  const resp = await API.profile();
  const user = resp.data;
  if (!user) {
    //未登录，或登录已过期
    alert("未登录，或登录已过期,确认重新登录");
    location.href = "./login.html";
    return;
  }
  //登录状态
  //   获取DOM
  const doms = {
    aside: {
      nickname: $(".aside #nickname"),
      loginId: $(".aside #loginId"),
    },
    close: $(".close"),
    chatContainer: $(".chat-container"),
    form: $(".msg-container"),
    txtMsg: $("#txtMsg"),
  };
  setUserInfo();

  // 注销事件，退出登录
  doms.close.onclick = function () {
    API.loginOut();
    location.href = "./login.html";
  };
  //设置用户信息
  function setUserInfo() {
    doms.aside.nickname.innerText = user.nickname;
    doms.aside.loginId.innerText = user.loginId;
  }
  //获取历史记录
  loadHistory();
  async function loadHistory() {
    const resp = await API.getHistory();
    resp.data.map((u) => addChat(u));
    scrollBottom();
  }
  //添加一条消息，根据消息对象，将其添加到页面中
  function addChat(chatInfo) {
    const chatItem = $$$("div");
    chatItem.classList.add("chat-item");
    if (chatInfo.from) {
      chatItem.classList.add("me");
    }
    const img = $$$("img");
    img.classList.add("chat-avatar");
    img.src = chatInfo.from ? "./asset/avatar.png" : "./asset/robot-avatar.jpg";
    const chatContent = $$$("div");
    chatContent.classList.add("chat-content");
    chatContent.innerText = chatInfo.content;
    const chatDate = $$$("div");
    chatDate.classList.add("chat-date");
    chatDate.innerText = formatTime(chatInfo.createdAt);
    chatItem.appendChild(img);
    chatItem.appendChild(chatContent);
    chatItem.appendChild(chatDate);
    doms.chatContainer.appendChild(chatItem);
  }
  //格式化时间
  function formatTime(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
    const second = date.getSeconds().toString().padStart(2, "0");
    return `${year}-${month}-${day} ${hour}-${minute}-${second}`;
  }
  //设置聊天窗口滚动条的位置到底部
  function scrollBottom() {
    doms.chatContainer.scrollTop = doms.chatContainer.scrollHeight;
  }
  //发送消息
  async function sendChat() {
    const content = doms.txtMsg.value.trim();
    if (!content) {
      return;
    }
    addChat({
      from: user.loginId,
      to: null,
      createdAt: Date.now(),
      content,
    });
    doms.txtMsg.value = "";
    scrollBottom();
    const resp = await API.sendChat(content);
    addChat({
      from: null,
      to: user.loginId,
      ...resp.data,
    });
    scrollBottom();
    console.log(resp.data);
  }
  //提交表单事件
  doms.form.onsubmit = function (e) {
    e.preventDefault();
    sendChat();
  };
})();
