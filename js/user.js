class FieldValidator {
  /**
   * 构造器
   * @param {string} txtId 文本框的ID
   * @param {function} validatorFunc 验证规则函数，当需要对该文本框验证时，会调用该函数
   */
  constructor(txtId, validatorFunc) {
    this.input = $("#" + txtId);
    this.p = this.input.nextElementSibling; //选中下一个兄弟元素
    this.validatorFunc = validatorFunc;
    this.input.onblur = () => {
      //当该文本框失去焦点
      this.validate();
    };
  }
  /**
   * 验证表单数据，成功返回true,失败返回false
   */
  async validate() {
    const err = await this.validatorFunc(this.input.value);
    if (err) {
      this.p.innerText = err;
      return false;
    } else {
      this.p.innerText = "";
      return true;
    }
  }
  /**
   * 静态方法，对传入的所有验证器统一验证，全通过返回true,有一个不通过即返回false
   * @param {Array} validators 所有的验证器
   *
   */
  static async validate(validators) {
    const proms = validators.map((v) => v.validate());
    const results = await Promise.all(proms);
    return results.every((r) => r);
  }
}
