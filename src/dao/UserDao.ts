// 具体到指定表的Dao操作

import Userinfo from "@/model/Userinfo";
import { isNotEmpty } from "../common/index";
import BaseDao from "./BaseDao";

class UserDao {
  // 单键设计模式
  static userDao:UserDao = new UserDao()
  findUserinfo(username: string, psw: string) {
    // 1=1没有实质查询意义，但可以让该语句后面可以直接拼接and，也可以防止where后面没有and的时候出现语法错误
    let sql = "select * from userinfo where 1=1";
    if (isNotEmpty(username)) {
      // and前面注意一定要有空格
      sql += ` and username='${username}'`;
    }
    if (isNotEmpty(psw)) {
      // and前面注意一定要有空格
      sql += ` and psw='${psw}'`;
    }
    // 调用baseDao的方法，传入拼接好的sql就行了
    // 传入具体化的泛型Userinfo
    return BaseDao.query<Userinfo[]>(sql);
  }
}

export default UserDao.userDao