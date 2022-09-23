import findSecThrdCtgysByFstCtgyId from "../defmodel/OneToMany";
import { Op, Sequelize } from "sequelize";
import {sequelize} from '../../BaseDao'

class CtgyDao {
  static ctgyDao: CtgyDao = new CtgyDao();

    async findSecThirdCtgys(firstctgyId: number) {
      let sql: string = `select  * from test.secondctgy  sc inner join test.thirdctgy  tc on sc.secondctgyid=tc.secctgyid  where sc.firstctgyId=${firstctgyId}`;
      return (await sequelize.query(sql));
    //   return (await sequelize.query(sql)) as [SecondCtgy[], SecondCtgy[]];
    }

//   async findSecThirdCtgys(firstctgyId: number) {
//     return findSecThrdCtgysByFstCtgyId(firstctgyId);
//   }
}

export default CtgyDao.ctgyDao;
