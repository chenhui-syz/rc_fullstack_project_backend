// 具体到指定表的Dao操作
// sequelize版本
import { model } from "../defineModel";
import { Op, Sequelize } from "sequelize";

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
  static userDaoDefine: UserDaoDefine = new UserDaoDefine();
  // static addUser: UserDaoDefine = new UserDaoDefine();
  addUser(userinfo: Userinfo) {
    return model.create(userinfo);
    // return 123;
  }
  findAllUser() {
    return model.findAll({
      // 过滤掉底层掺杂的数据，只要原值
      raw: true,
    });
  }
  // 投影查询，查询指定的属性
  findByProps() {
    return model.findAll({
      raw: true,
      // 指定查询的属性
      attributes: ["username", "psw"],
    });
  }
  //and or 查询
  findByUserAndPsw(username: string, psw: string) {
    // 如果确定查询到了只有一条记录，那就用findOne，否则就用findAll
    return model.findOne({
      raw: true,
      where: {
        // Op下有or and in like 等属性，支持不同的查询
        [Op.and]: [{ username }, { psw }],
      },
    });
  }
  // 模糊查询
  findByLike(key: string) {
    const searchKey = `%${key}%`;
    return model.findAll({
      raw: true,
      where: {
        username: {
          // 以g开头的
          // [Op.like]: "g%",
          // 包含g的
          [Op.like]: searchKey,
        },
      },
    });
  }

  // or查询+模糊查询
  findUserAndAddress(username: string, address: string) {
    const searchUsername = `%${username}%`;
    const searchAddress = `%${address}%`;
    return model.findAll({
      raw: true,
      where: {
        [Op.and]: [
          {
            username: {
              [Op.like]: searchUsername,
            },
          },
          {
            address: {
              [Op.like]: searchAddress,
            },
          },
        ],
      },
    });
  }

  // 聚合查询：以求最大值，最小值，平均值等为代表的查询称为聚合查询
  // 计算表的总数的原生sql语句：*代表查询所有，下面三句效果是一样的
  // select count(*) from userinfo
  // select count(*) as 总户数 from userinfo    （起个别名，让显示更清晰）
  // select count(userid) from userinfo   （根据主键查询出的数量肯定就是数据条数）
  // 搜索用户id最大的数据：
  // select max(userid) from userinfo
  // 同时查询出最小用户id和最大用户id并起上别名
  // select min(userid) as 最小用户id.max(userid) as 最大用户id from userinfo
  // 求平均值
  // select avg(userid) as 平均 form userinfo
  // 查询address为北京的，并且valid为1的用户数
  // select address.count(valid) as 总人数 from userinfo where valid=1 group by address

  // 计算所有用户，并且按照地址来计算
  countUserinfo() {
    return model.findAll({
      raw: true,
      // 表明分组的字段依据
      group: "address",
      attributes: [
        // 分组依据，与group进行呼应
        "address",
        // 第一个参数传达的意思是计算valid这一列的count，第二个意思就为查出来的数据起别名
        [Sequelize.fn("count", Sequelize.col("valid")), "totalCount"],
      ],
      where: {
        valid: 1,
      },
    });
  }

  // 分页查询
  // 从第3条记录开始，查出来1条
  // select * from userinfo limit 2,1
  findUserWithPager(offset: number, pageSize: number) {
    return model.findAll({
      raw: true,
      limit: pageSize,
      offset,
    });
  }
}

// export default UserDaoDefine.addUser;
// 使用静态的写法，导出和引用的时候都需要一个个的写，但是好处就是使用的时候可以直接调用
// export const {
//   addUser,
//   findAllUser,
//   findByProps,
//   findByUserAndPsw,
//   findByLike,
//   findUserAndAddress,
// } = UserDaoDefine;
// 不用每次都需要增加导入导出的单键模式
export default UserDaoDefine.userDaoDefine;
