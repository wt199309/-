//验证账号
const loginIdValidator = new FieldValidator("txtLoginId", async function (val) {
  if (!val) {
    return "请填写账号";
  } else if (val.length > 20) {
    return "账号长度不能超过20个字符";
  }
  const resp = await API.exists(val);
  if (resp.data) {
    return "该账号已存在";
  }
});
// 验证昵称
const nicknameValidator = new FieldValidator("txtNickname", function (val) {
  if (!val) {
    return "请输入昵称";
  } else if (val.length > 20) {
    return "昵称长度不能超过20个字符";
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

//确认密码
const loginPwdConfirmValidator = new FieldValidator(
  "txtLoginPwdConfirm",
  function (val) {
    if (!val) {
      return "请再次输入密码";
    }
    if (val !== loginPwdValidator.input.value) {
      return "两次输入的密码不一致";
    }
  }
);

//验证所有文本框
const form = $(".user-form");
form.onsubmit = async function (e) {
  e.preventDefault();
  const result = await FieldValidator.validate([
    loginIdValidator,
    nicknameValidator,
    loginPwdValidator,
    loginPwdConfirmValidator,
  ]);
  if (!result) {
    // 验证未通过
    return;
  }
  const datas = {
    loginId: loginIdValidator.input.value,
    loginPwd: loginPwdValidator.input.value,
    nickname: nicknameValidator.input.value,
  };

  const resp = await API.reg(datas);
  if (resp.code === 0) {
    alert("注册成功，确认调转到登录页面");
    location.href = "./login.html";
  }
};
