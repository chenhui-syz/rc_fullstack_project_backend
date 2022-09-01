function isString(data: any): data is string {
  return typeof data === 'string'
}

interface DbConConf {
  host: string
  user: string
  password: string
  port: number
  database: string
}

interface EnvConf {
  dev: DbConConf
  prod: DbConConf
}

class Conf {
  static conf: Conf = new Conf()
  env!: keyof EnvConf
  envConf!: EnvConf
  constructor() {
    this.env = process.env.NODE_ENV === 'dev' ? 'dev' : 'prod'
    this.initConf()
  }
  initConf() {
    this.envConf = {
      dev: {
        host: 'localhost',
        user: 'admin',
        password: '123456',
        database: 'test',
        port: 3306,
      },
      prod: {
        host: 'www.newdomain.com',
        user: 'root',
        password: '123',
        database: 'dangdang',
        port: 3306,
      },
    }
  }

  getConf(): DbConConf
  getConf(key: string): string
  getConf(key: any = ''): any {
    if (this.isDbConConfKeys(key) && key.length > 0) {
      return this.envConf[this.env][key]
    } else {
      return this.envConf[this.env]
    }
  }

  // 缩小key的范围，这样才不会报错
  isDbConConfKeys(key: any): key is keyof DbConConf {
    return (
      key === 'host' || key === 'user' || key === 'password' || key === 'database' || key === 'port'
    )
  }
}

export default Conf.conf
