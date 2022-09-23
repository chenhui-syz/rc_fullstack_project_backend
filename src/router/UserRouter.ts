import { Context } from "koa";
import Router from "koa-router";
import Userinfo from "../interfaces/Userinfo";

import logger from "../common/LogUtil";

// 每个模块都需要单独引入success方法，可以有方法在路由自动加载的时候就引入这个方法，然后在路由模块中就不用每个模块都单独再引用了
// 直接将success和fail追加到AllRouterLoader类的上下文中
import { success } from "../common";

// 这里引入的userDao就已经是实例对象了，用小写就行
// import userDao from "../dao/UserDao";
import userDao from "../modules/userinfo/dao/UserDao"

// import userDaoOrm from '../dao/UserDaoOrm'

const router = new Router();

router.prefix("/usermodule");

// router.get("/findUserinfo/:username/:psw", async (ctx: Context) => {
//   const { username, psw } = ctx.params;
//   logger.debug("执行路由请求findUserinfo开始");

//   // 执行查询
//   const userinfos: Userinfo[] = await userDao.findUserinfo(username, psw);
//   console.log(
//     "🚀 ~ file: user.ts ~ line 24 ~ router.get ~ userinfos",
//     userinfos
//   );
//   console.log(
//     "🚀 ~ file: user.ts ~ line 24 ~ router.get ~ userinfos",
//     userinfos[0]
//   );
//   // userinfos[0]是我们想要的数据，是我们查到的第一个数据

//   // 人为制作一个异常
//   // result作为函数执行肯定会报错
//   // 如果不进行异常的统一封装处理，则node默认提示：
//   // 错误：result is not a function
//   // 不固定的错误处理方式，前端不好处理，所以要进行统一封装
//   // const userinfo = { username: "wangwu" };
//   // const result = (userinfo as any).phone;
//   // console.log(result())

//   // ctx.body = `欢迎！${username}`;
//   ctx.body = ctx.success(`欢迎！${username}`);
//   console.log("执行路由请求findUserinfo结束");
// });

router.get("/findAllUser", async (ctx: Context) => {
  const dbUserinfo = await userDao.findAllUser();
  console.log(
    "🚀 ~ file: user.ts ~ line 51 ~ router.get ~ dbUserinfo",
    dbUserinfo
  );
  ctx.body = success(dbUserinfo);
});

router.get("/findOneUser/:username/:psw", async (ctx: Context) => {
  const { username, psw } = ctx.params;
  ctx.body = success(await userDao.findByUserAndPsw(username, psw));
});

router.get("/findByProps", async (ctx: Context) => {
  ctx.body = success(await userDao.findByProps());
});

router.get("/findByLike/:key", async (ctx: Context) => {
  const { key } = ctx.params;
  ctx.body = success(await userDao.findByLike(key));
});
// userDaoOrm
router.get("/findByLikeWithOrm/:key", async (ctx: Context) => {
  const { key } = ctx.params;
  ctx.body = success(await userDao.findByLike(key));
});

router.get("/findUserAndAddress/:username/:address", async (ctx: Context) => {
  const { username, address } = ctx.params;
  ctx.body = success(await userDao.findUserAndAddress(username, address));
});

router.get("/countTotal", async (ctx: Context) => {
  ctx.body = success(await userDao.countUserinfo());
});

router.get("/findUserWithPager/:pageNo/:pageSize", async (ctx: Context) => {
  const { pageNo, pageSize } = ctx.params;
  const offset = (pageNo - 1) * pageSize;
  ctx.body = success(
    await userDao.findUserWithPager(offset, parseInt(pageSize))
  );
});

router.post("/addUser", async (ctx: Context) => {
  const userinfo: Userinfo = ctx.request.body;
  // const userinfo = ctx.request.body as Userinfo;

  const dbUserinfo = await userDao.addUser(userinfo);
  console.log(
    "🚀 ~ file: user.ts ~ line 57 ~ router.post ~ dbUserinfo",
    dbUserinfo
  );
  ctx.body = success(dbUserinfo);
  // ctx.body = `您好:${userinfo.username},年龄:${userinfo.age}`;
});

// 这里的导出方式要进行下改变，使用node的方式，在自动路由加载文件中require进行使用
// export default router;
module.exports = router;
