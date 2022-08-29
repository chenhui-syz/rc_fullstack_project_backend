import log4js from "log4js";
enum LevelInfo {
  "trace" = "trace",
  "debug" = "debug",
  "info" = "info",
  "warn" = "warn",
  "error" = "error",
  "fatal" = "fatal",
}
class LogUtil {
  // 单例设计模式
  static logUtil: LogUtil = new LogUtil();
  // 日志实例
  logInstance!: log4js.Logger;
  private constructor() {
    this.config();
  }
  config() {
    log4js.configure({
      // 输出目的地【追加器输出】配置，供categories 使用。
      appenders: {
        console: { type: "console" },
        // 直接配置文件。
        debug_file: { type: "file", filename: "mylog/debug.log" },
        // 按日期当文件名创建文件,执行该代码时生成一个mylog目录下的warn+日期为文件名的文件。
        info_file: {
          type: "dateFile",
          filename: "mylog/info",
          pattern: "yyyy-MM-dd.log",
          encoding: "utf-8",
          // 这个属性为true的时候，生成的日志文件名是info+日期
          alwaysIncludePattern: true,
        },
        warn_file: {
          type: "dateFile",
          filename: "mylog/warn",
          pattern: "yyyy-MM-dd.log",
          encoding: "utf-8",
          alwaysIncludePattern: true,
        },
        error_file: {
          type: "dateFile",
          filename: "mylog/err",
          pattern: "yyyy-MM-dd.log",
          encoding: "utf-8",
          alwaysIncludePattern: true,
        },
      },
      // 类别，按照日志的级别进行分类
      categories: {
        //  default日志输出配置对象注意两点 1.default 是固定关键字,不能修改，表示debug级别i遏制的配置
        // default就是代表debug的意思
        default: {
          appenders: ["console", "debug_file"],
          // 日志级别，当输出的日志级别高于这个级别就能输出，低于这个级别就不能输出
          level: LevelInfo.debug,
        },
        info: {
          appenders: ["console"],
          level: LevelInfo.info,
        },
        warn: {
          appenders: ["console","warn_file"],
          level: LevelInfo.warn,
        },
      },
    });
  }

  // 日志实例为根据categories配置的日志输出位置和级别去产生对应的日志
  getCategories(level: LevelInfo) {
    this.logInstance = log4js.getLogger(level);
  }

  // 日志方法，input是外传递过来的日志信息，会通过日志实例logInstance对应的方法进行日志输出
  debug(input: string) {
    this.getCategories(LevelInfo.debug);
    this.logInstance.debug(input);
  }

  info(input: string) {
    this.getCategories(LevelInfo.info);
    this.logInstance.info(input);
  }
  warn(input: string) {
    this.getCategories(LevelInfo.warn);
    this.logInstance.warn(input);
  }
}

export default LogUtil.logUtil;
