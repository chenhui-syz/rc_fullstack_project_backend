// 对成功响应和服务器错误两种情况的处理进行统一封装
// 如果开发的是一个数据库管理软件，或者是组件库等，状态码的精准是非常重要的，因为接口返回面对的是程序员，错误状态可能多达上万种
// 但开发应用程序，面对的是不懂代码的用户群体，服务器出错只要保证内部记录，外部统一500返回就行了

enum Code {
  SUCESS = 200,
  SERVERERROR = 500,
}
class ResRsult {
  static success(data: any = undefined, msg: any = "") {
    const code: Code = Code.SUCESS;
    return { data, msg, code };
  }
  static fail(msg: any = "") {
    const code: Code = Code.SERVERERROR;
    return { undefined, msg, code };
  }
}
export let { success, fail } = ResRsult;
