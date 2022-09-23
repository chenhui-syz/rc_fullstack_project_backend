// import Koa, { Context } from "koa";
import Koa from "koa";
// import body from "koa-body";
// import json from "koa-json";
// import Router from "koa-router";

// 关键引入
// 路由加载和项目启动全部在这个文件中
import allRouterLoader from "./common/AllRouterLoader";

import dbconfig from "./conf/DbConfig";
console.log('打印下配置：',dbconfig.getConf('22'));

// 导入路由
// import userRouter from "./router/UserRouter";

const app = new Koa();
// const router = new Router();
// 每个模块里加前缀好处：1.区分不同的模块，便与维护
// 2.防止不同的模块里出现重名的路由
// 这个地方也给移动自动路由加载中去执行
// router.prefix("/dang"); //为所有的路由访问添加路由前缀/dang，来作为一级路由
// router.use(json());
// router.use(body());

// 路由肯定是要分模块的，不能都怼在这里
// router.get("/test", async (ctx: Context, next: Koa.Next) => {
//   ctx.body = "第一个测试页面";
//   // ctx.app.context每个接口请求中能拿到的全局上下文，做到了高内聚，低耦合，非常有用的
//   // ctx.app.context
// });
// router.use(userRouter.routes(),userRouter.allowedMethods())
// 我们期望以后添加新路由的时候，只需要把新添加的路由重新发布到服务器上就行了，而不是每次还需要修改这里的引入
// 这个app.ts文件是整个项目的入口，代码不宜过多
// 随着二级路由的扩大，这里的代码会变得很臃肿，所以我们手写一个自动路由加载，第三方有已经写的比较完善的 requireDirectory，但对ts支持不友好
// 思路：加载router文件夹里的所有的router路由器

//  加载路由到全局路由上
// 这些也全移到自动路由加载文件中执行
// app.use(router.routes());
// app.listen(3002);
// console.log("server running on port 3002");

// 执行这个方法，启动项目
allRouterLoader.init(app);
