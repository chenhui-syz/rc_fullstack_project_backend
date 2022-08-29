import Koa, { Context } from 'koa'
import path from 'path'
import fs from 'fs'
import body from 'koa-body'
import json from 'koa-json'
import Router from 'koa-router'
import globalException from './GlobalExce'

import {success,fail} from './ResResult'

// 洋葱模型逻辑演示
// 中间件里的逻辑执行顺序：
// 第一个中间件开始....
// 第二个中间件开始....
// 执行路由请求findUserinfo开始
// 执行路由请求findUserinfo结束
// 第二个中间件结束....
// 第一个中间件结束....
const middleware1=async (ctx:Context,next:Koa.Next)=>{
     console.log("第一个中间件开始....")
    //  next就是执行下一层中间件的意思
     await next()
     console.log("第一个中间件结束....")
}
const middleware2=async (ctx:Context,next:Koa.Next)=>{
  console.log("第二个中间件开始....")
  await next()
  console.log("第二个中间件结束....")
}
  
class AllRouterLoader {
  app!: Koa
  static allRouterLoader: AllRouterLoader = new AllRouterLoader()
  // 初始化方法
  init(app: Koa) {
    this.app = app
    const rootRouter=this.loadAllRouterWrapper()
    // this.app.use(middleware1)
    // this.app.use(middleware2)
    this.app.use(globalException)
    // 路由器也可以看做是一个中间件，是中间件的最后一层
    this.app.use(rootRouter.routes())
    // 直接将success和fail追加到AllRouterLoader类的上下文中，这样在各个路由中也都可以通过ctx进行使用了
    this.app.context.success = success
    this.app.context.fail = fail
    // 4. 监听方法
    this.listen()
  }
  //  1. 加载所有路由文件数组
  getFiles(dir: string) {
    // 同步读目录
    return fs.readdirSync(dir)
  }
  //  2. 加载所有路由文件绝对路径数组
  getAbsoluteFilePaths() {
    // process.cwd 在哪个目录执行脚本运行这个文件，打印出的就是那个路径
    // __dirname：当前文件所在的目录
    const dir = path.join(process.cwd(), '/src/router')
    const allFiles = this.getFiles(dir)
    const allFullFilePaths: string[] = []
    for (let file of allFiles) {
      // '\\'和'/'是一样的，表示下一级路径
      // mac电脑下不支持'\\'这样的写法
      const fullFilePath = dir + '\\' + file
      allFullFilePaths.push(fullFilePath)
    }
    return allFullFilePaths
  }

  //  3.加载所有二级路由到一级路由中
  loadAllRouterWrapper() {
    //  3.0  获取一级路由
    const rootRouter = this.getRootRouter()
    //  3.1  调用获取绝对路径数组方法
    const allFullFilePaths = this.getAbsoluteFilePaths()
    //  3.2  调用加载所有二级路由到一级路由方法
    this.loadAllRouter(allFullFilePaths, rootRouter)
    return rootRouter;
  }
  // 3.0  获取一级路由
  getRootRouter() {
    const rootRouter = new Router()
    rootRouter.prefix('/dang')
    this.app.use(json())
    this.app.use(body())
    return rootRouter
  }

  // 自定义守卫
  isRouter(data: any): data is Router {
    return data instanceof Router
  }


  loadAllRouter(allFullFilePaths: string[], rootRouter: Router) {
    for (let fullFilePath of allFullFilePaths) {
      const module = require(fullFilePath)
      // 这个模块一定是路由模块吗？判断一下，防止router文件夹掺杂了非路由文件
      if (this.isRouter(module)) {
        rootRouter.use(module.routes(), module.allowedMethods())
      }
    }
  }

  listen() {
    this.app.listen(3002)
    console.log('在3002端口监听....')
  }
}

export default AllRouterLoader.allRouterLoader
