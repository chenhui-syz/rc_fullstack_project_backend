import path from 'path'
import dbConConf from '../conf/DbConfig'
import { Dialect } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'
class BaseDao {
  static baseDao: BaseDao = new BaseDao()
  sequelize!: Sequelize
  constructor() {
    console.log('初始化sequelize...')
    this.initSeqConf('mysql')
  }
  initSeqConf(dialect: Dialect) {
    //创建sequelize对象,参数分别为：数据库名称，数据库类型，密码，配置
    let { host, user, password, database, port } = dbConConf.getConf()
    this.sequelize = new Sequelize(database, user, password, {
      host,
      port,
      dialect, //   表示是何种数据库
      // freezeTableName固定死要查询的是哪个表
      define: { timestamps: false, freezeTableName: true },
    })
  // 方案和方案3的区别点：
  // 方案1在建立sequlize之后不加模型，而是提供给模型去使用
  // 方案3在构建sequlize的时候就把model加入绑定一起，创建实例对象
  // 所以方案3要是想和方案1统一，这个地方就是加入model，注释掉
  // this.addModels()
  }

  // 加入所有的模块
  addModels() {
    const modelPath = path.join(process.cwd(), '/src/modules/decormodel')
    this.sequelize.addModels([modelPath])
  }
}

const baseDao = BaseDao.baseDao
// 这里的addModels对应的是方案3
// baseDao.addModels()

// 这里的导出，对应的是方案1
export const { sequelize } = baseDao
