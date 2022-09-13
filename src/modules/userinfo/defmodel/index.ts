import { DataTypes } from "sequelize";
import { sequelize } from "../../BaseDao";

class Userinfo {
  static createModel() {
    // 要连接的表,和数据表的字段进行一一对应，最终返回一个模型对象
    // 字段一定要和数据表完全对应
    const model = sequelize.define(
      "userinfo",
      {
        userid: {
          type: DataTypes.INTEGER, //表示属性的数据类型
          field: "userid", //属性对应的列名,若不定义field则表中的列名(userid)就是属性名
          primaryKey: true, //表示主键
          autoIncrement: true, //表示主键自增
        },
        username: {
          type: DataTypes.STRING(30),
          field: "username",
          allowNull: false, //表示当前列是否允许为空，false表示该列不能为空
          //unique:true    //表示该列的值必须唯一
        },
        psw: {
          type: DataTypes.STRING(20),
          field: "psw",
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING(50),
          field: "address",
          allowNull: true,
        },
        valid: {
          type: DataTypes.TINYINT,
          field: "valid",
          allowNull: true,
        },
        birth: {
          type: DataTypes.TINYINT,
          field: "birth",
          allowNull: true,
        },
        age: {
          type: DataTypes.TINYINT,
          field: "age",
          allowNull: true,
        },
      },
      {
        // freezeTableName: true, //true表示使用给定的表名，false表示模型名后加s作为表名
        timestamps: false, //true表示给模型加上时间戳属性(createAt、updateAt),false表示不带时间戳属性
      }
    );
    //同步数据库，force的值为true，表若存在则先删除后创建
    // force的值为false表示表若存在则不创建，不存在才创建
    // model.sync({ force: false });
    return model;
  }
}

export const model = Userinfo.createModel();
