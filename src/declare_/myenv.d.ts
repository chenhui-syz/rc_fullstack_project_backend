import { Context } from "koa";

// 通过声明一个模块，和底层的同名的模块，然后写上一个和底层同名的接口，这样就能把两个接口合并，上层和下层合二为一
declare module "Context" {
  export interface Context {
    params: any;
  }
}
