// 这里是所有Dao公用的方法
// sequelize版本的BaseDao，等到这里封装好了,BaseDao.ts文件就可以删除了

import dbConConf from "../conf/DbConfig";
import { Dialect } from "sequelize";
import { Sequelize } from "sequelize-typescript";

class BaseDaoDefine {
  static baseDaoOrm: BaseDaoDefine = new BaseDaoDefine();
  sequelize!: Sequelize;
  constructor() {
    this.initSeqConf("mysql");
  }
  // 初始化sequelize配置
  initSeqConf(dialect: Dialect) {
    let { host, user, password, database, port } = dbConConf.getConf();
    this.sequelize = new Sequelize(database, user, password, {
      host,
      port,
      dialect, //   表示是何种数据库
      define: { timestamps: false, freezeTableName: true },
    });
  }
}

// 为什么可以直接这样导出呢 {sequelize} ？
// BaseDaoDefine.baseDaoOrm 这样就相当于调用了 new BaseDaoDefine();
export const {sequelize} = BaseDaoDefine.baseDaoOrm
