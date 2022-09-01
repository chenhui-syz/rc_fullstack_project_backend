// 这里是所有Dao公用的方法

import mysql, { Connection } from 'mysql'
import dBConf from '../conf/DbConfig'
class BaseDao {
  // 所有 Dao 的 通用Dao
  static baseDao: BaseDao = new BaseDao()
  // con里面有可以用于增删改查的方法
  con!: Connection
  constructor() {
    this.connect()
  }
  async connect() {
    this.con = await mysql.createConnection(dBConf.getConf())
  }

  // 这里封装的方法需要手动封装promise进行返回，很麻烦
  // 调用方法传入的sql语句的拼接逻辑也很臃肿
  async query<T>(sql: string) {
    return new Promise<T>((resolve, reject) => {
      this.con.query(sql, (err:any, result:any) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }
}

export default BaseDao.baseDao
