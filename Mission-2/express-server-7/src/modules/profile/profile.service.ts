import { pool } from "../../db";

const createProfileIntoDB = async (payload: any) => {
  // console.log("profile data" , payload)
  const { user_id, bio, address, phone, gender } = payload;

  //step-1: ekane cheek kora hoiche users table id sathe profile id matech koche kina and match korle update hobe
  const user = await pool.query(
    `
        SELECT * FROM users WHERE id=$1
        `,
    [user_id],
  );

  //console.log("chek user exist " , user);

  if (user.rows.length === 0) {
    throw new Error("User not exists");
  }

  // create post table
   // table morder ki ki filed takbe seta insert into morde bole deya lagbe
   //RETURNING * eta use korle amr profile controller.ts e data res ta dekte pabo
  const result = await pool.query(
    `
       

        INSERT INTO profiles(user_id, bio, address, phone, gender) VALUES($1, $2, $3, $4, $5 ) RETURNING *
    `,
    [user_id, bio, address, phone, gender],
  );

  return result;
};

export const profileService = {
  createProfileIntoDB,
};
