import { DataTypes } from "sequelize/types";
import { sequelize } from "../dao/BaseDaoDefine";

class Userinfo {
  static createModel() {
    // 要连接的表,和数据表的字段进行一一对应，最终返回一个模型对象
    return sequelize.define("userinfo", {
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
        field: "password",
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
    });
  }
}

export const model = Userinfo.createModel()
