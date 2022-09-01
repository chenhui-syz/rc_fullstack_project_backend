// 具体到指定表的Dao操作
// sequelize版本
import { model } from "../defineModel";

class UserDaoDefine {
  // 单键设计模式
  // static addUser: UserDaoDefine = new UserDaoDefine();
  static addUser(userinfo: Userinfo) {
    return model.create(userinfo);
  }
}

// export default UserDaoDefine.addUser;
export const { addUser } = UserDaoDefine;
// export const addUser = UserDaoDefine.addUser;

export type Userinfo = {
  userid: number;
  username: string;
  psw: string;
  address: string;
  valid: number;
  birth: any;
  age: any;
};
