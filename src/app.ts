import Koa, { Context } from "koa";
import body from "koa-body";
import json from "koa-json";
import Router from "koa-router";

// 导入路由
import userRouter from "./router/user";

const app = new Koa();
const router = new Router();
// 每个模块里加前缀好处：1.区分不同的模块，便与维护
// 2.防止不同的模块里出现重名的路由
router.prefix("/dang"); //为所有的路由访问添加路由前缀/dang，来作为一级路由
router.use(json());
router.use(body());

// 路由肯定是要分模块的，不能都怼在这里
// router.get("/test", async (ctx: Context, next: Koa.Next) => {
//   ctx.body = "第一个测试页面";
//   // ctx.app.context每个接口请求中能拿到的全局上下文，做到了高内聚，低耦合，非常有用的
//   // ctx.app.context
// });

//  加载路由到全局路由上
app.use(router.routes());
app.listen(3002);
console.log("server running on port 3002");
