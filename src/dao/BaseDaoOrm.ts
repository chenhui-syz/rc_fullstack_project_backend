import path from 'path'
import dbConConf from '../conf/DbConfig'
import { Dialect } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'
class BaseDaoOrm {
  static baseDaoOrm: BaseDaoOrm = new BaseDaoOrm()
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
      define: { timestamps: false, freezeTableName: false },
    })
    this.addModels()
  }

  addModels() {
    const modelPath = path.join(process.cwd(), '/src/ormmodel')
    this.sequelize.addModels([modelPath])
  }
}

export default BaseDaoOrm.baseDaoOrm
export const { sequelize } = BaseDaoOrm.baseDaoOrm
