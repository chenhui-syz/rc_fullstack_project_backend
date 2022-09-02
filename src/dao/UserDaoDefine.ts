// 具体到指定表的Dao操作
// sequelize版本
import { model } from "../defineModel";

type Userinfo = {
  userid: number;
  username: string;
  psw: string;
  address: string;
  valid: number;
  birth: any;
  age: any;
};
class UserDaoDefine {
  // 单键设计模式
  // static addUser: UserDaoDefine = new UserDaoDefine();
  static addUser(userinfo: Userinfo) {
    return model.create(userinfo);
    // return 123;
  }
  static findAllUser(){
    return model.findAll()
  }
}

// export default UserDaoDefine.addUser;
export const { addUser,findAllUser } = UserDaoDefine;
// export const addUser = UserDaoDefine.addUser;
