import { secondCtgyModel } from "./secctgymodel";
import { thirdCtgyModel } from "./ThirdCtgyModel";

// 建立关联
// ManyToOne
// belongsTo 属于
// 三级分类的 secctgyId 外键 关联到二级分类的 secondctgyid
thirdCtgyModel.belongsTo(secondCtgyModel, {
  foreignKey: "secctgyId",
  targetKey: "secondctgyid",
});
// OneToMany
// hasMany方法，sequelize的model提供的方法
// as：为thirdCtgyModel起一个别名thirdctgy
// 单个表的别名严格意义上是绝对不能带s的，带s代表多个表
// foreignKey: 外键
secondCtgyModel.hasMany(thirdCtgyModel, {
  as: "thirdctgys",
  foreignKey: "secctgyId",
});

export default async function findSecThrdCtgysByFstCtgyId(firstctgyId: number) {
  const result = await secondCtgyModel.findAll({
    // raw: true,
    where: {
      firstctgyId,
    },
    include: [
      {
        model: thirdCtgyModel,
        // 这里的as起的别名一定要是对应上面的as
        as: "thirdctgys",
      },
    ],
  });
  console.log("result:", result);
  return result;
}
// findSecThrdCtgysByFstCtgyId(1);

async function findAllSecThrdCtgys() {
  const result = await secondCtgyModel.findAll({
    raw: true,
    include: [
      {
        model: thirdCtgyModel,
        // 这里的as起的别名一定要是对应上面的as
        as: "thirdctgys",
      },
    ],
  });
  console.log("result:", result);
}
// findAllSecThrdCtgys();

// async function findAllSecThrdCtgys2() {
//   const { rows, count } = (await secondCtgyModel.findAndCountAll({
//     raw: true,
//     include: [
//       {
//         model: thirdCtgyModel,
//         as: 'secctgy',
//       },
//     ],
//   })) as any
//   console.log('rows:', rows)
//   console.log('count:', count)
// }
