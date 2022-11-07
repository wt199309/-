//验证账号
const loginIdValidator = new FieldValidator("txtLoginId", async function (val) {
  if (!val) {
    return "请填写账号";
  } else if (val.length > 20) {
    return "账号长度不能超过20个字符";
  }
});
// 验证密码
const loginPwdValidator = new FieldValidator("txtLoginPwd", function (val) {
  if (!val) {
    return "请输入密码";
  } else if (val.length > 20) {
    return "密码长度不能超过20个字符";
  }
});

//验证所有文本框
const form = $(".user-form");
form.onsubmit = async function (e) {
  e.preventDefault();
  const result = await FieldValidator.validate([
    loginIdValidator,
    loginPwdValidator,
  ]);
  if (!result) {
    // 验证未通过
    return;
  }
  const datas = {
    loginId: loginIdValidator.input.value,
    loginPwd: loginPwdValidator.input.value,
  };

  const resp = await API.login(datas);
  if (resp.code === 0) {
    location.href = "./index.html";
  } else {
    loginIdValidator.p.innerText = "账号或密码错误";
    loginPwdValidator.input.value = "";
  }
};
