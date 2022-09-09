// orm形式和define形式相比的优点：
// 1.ormmodel通过装饰器生成的模型更利于维护和管理
// 2.define返回的model，而orm的封装返回的是userinfomodel，更加直观

import Userinfo from "../interfaces/Userinfo";

import "./BaseDaoOrm";
import { Op } from "sequelize";

import UserinfoModel from "../ormmodel/Userinfo";
class UserDaoModel {
  static userDaoModel: UserDaoModel = new UserDaoModel();
  // async findUserinfo(): Promise<UserinfoModel[]> {
  //   return await UserinfoModel.findAll({
  //     raw: true,
  //   });
  // }
  // async addUser(userinfo: Userinfo) {
  //   const userModelInstace = new UserinfoModel();
  //   const usermodel = combine(userModelInstace, userinfo);
  //   return await UserinfoModel.create(usermodel);
  // }

  findAllUser() {
    return UserinfoModel.findAll();
  }

  findByLike(key: string) {
    const searchKey = `%${key}%`;
    return UserinfoModel.findAll({
      raw: true,
      where: {
        username: {
          [Op.like]: searchKey,
        },
      },
    });
  }
}

export default UserDaoModel.userDaoModel;
