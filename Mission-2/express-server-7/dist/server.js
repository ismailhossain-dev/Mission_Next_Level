

   import { createRequire } from 'module';

   const require = createRequire(import.meta.url);

  

// src/app.ts
import express from "express";

// src/config/index.ts
import dotenv from "dotenv";
import path from "path";
dotenv.config({
  path: path.join(process.cwd(), ".env")
  //env root e rakchi // path.json er bodole path.join ebong '.env' string kora holo
});
var config = {
  connnection_string: process.env.CONNECTIIONSTRING,
  port: process.env.PORT,
  secret: process.env.JWT_SECRET,
  refresh_secret: process.env.JWT_REFRESH_SECRET
};
var config_default = config;

// src/db/index.ts
import { Pool } from "pg";
var pool = new Pool({
  connectionString: config_default.connnection_string
});
var initDB = async () => {
  await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY, 
        name  VARCHAR(25),
        email VARCHAR(30) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        is_active BOOLEAN DEFAULT true,
        age INT,
        role VARCHAR(15) DEFAULT  'user',
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()

        )
    `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS profiles(
        id SERIAL PRIMARY KEY, 
        user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
        bio TEXT,
        address TEXT,
        phone VARCHAR(15),
        gender VARCHAR(10),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
    )
`);
  console.log("database connectend successfully");
};

// src/modules/user/user.route.ts
import { Router } from "express";

// src/modules/user/user.service.ts
import bcrypt from "bcryptjs";
var createUserIntoDB = async (payload) => {
  const { name, email, password, age, role } = payload;
  const hashPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    `INSERT INTO users(name, email, password, age, role) VALUES ($1, $2, $3, $4, COALESCE($5 , 'user')) RETURNING * `,
    [name, email, hashPassword, age, role]
  );
  delete result.rows[0].password;
  return result;
};
var getAllUsersFromDB = async (payload) => {
  const result = await pool.query(`SELECT * FROM users`);
  return result;
};
var getSingleUser = async (id) => {
  const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
  return result;
};
var updateUserIntoDB = async (id, name, password, age) => {
  const result = await pool.query(
    `UPDATE users SET 
    name = COALESCE($1, name),
    password = COALESCE($2, password), 
    age = COALESCE($3, age),
    is_active = COALESCE($4, is_active)
    WHERE id = $5 
    RETURNING *`,
    [name, password, age, true, id]
    // Ekhane 5ta value thakte hobe: $1, $2, $3, $4, ebong $5 (id)
  );
  return result;
};
var deleteUserIntoDB = async (id) => {
  const result = await pool.query(
    `DELETE FROM users WHERE id = $1 RETURNING *`,
    [id]
  );
  return result;
};
var userService = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUser,
  updateUserIntoDB,
  deleteUserIntoDB
};

// src/utility/sendResponse.ts
var sendResponse = (res, data) => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    data: data.data,
    error: data.error
  });
};
var sendResponse_default = sendResponse;

// src/modules/user/user.controller.ts
var createUser = async (req, res) => {
  try {
    const result = await userService.createUserIntoDB(req.body);
    sendResponse_default(res, {
      statusCode: 201,
      success: true,
      message: "User created successfully!",
      data: result.rows[0]
    });
  } catch (error) {
    sendResponse_default(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error
    });
  }
};
var getAllUsers = async (req, res) => {
  try {
    const result = await userService.getAllUsersFromDB(req.body);
    res.status(200).json({
      ssuccess: true,
      message: "Users retrived successfully",
      data: result.rows
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error
    });
  }
};
var getSingleUser2 = async (req, res) => {
  const { id } = req.params;
  if (!id || Array.isArray(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid User ID"
    });
  }
  try {
    const result = await userService.getSingleUser(id);
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found!"
      });
    }
    return res.status(200).json({
      success: true,
      message: "Single User fetched successfully",
      data: result.rows[0]
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
var updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, password, age } = req.body;
  if (!id || Array.isArray(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid User ID"
    });
  }
  try {
    const result = await userService.updateUserIntoDB(id, name, password, age);
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found to update!"
      });
    }
    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result.rows[0]
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      error
    });
  }
};
var deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!id || Array.isArray(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid User ID"
    });
  }
  try {
    const result = await userService.deleteUserIntoDB(id);
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found to delete!"
      });
    }
    return res.status(200).json({
      success: true,
      message: "User deleted successfully!!",
      data: result.rows[0]
      // Konti delete holo tar info
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error
    });
  }
};
var userController = {
  createUser,
  getAllUsers,
  getSingleUser: getSingleUser2,
  updateUser,
  deleteUser
};

// src/types/index.ts
var USER_ROLE = {
  admin: "admin",
  agent: "agent",
  user: "user"
};

// src/middleware/auth.ts
import jwt from "jsonwebtoken";
var auth = (...roles) => {
  return async (req, res, next) => {
    try {
      console.log(roles);
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Unautorized access!!"
        });
      }
      const decoded = jwt.verify(
        token,
        config_default.secret
      );
      const userData = await pool.query(
        `
      SELECT * FROM users WHERE email=$1
      `,
        [decoded.email]
      );
      const user = userData.rows[0];
      if (userData.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "User not found!!"
        });
      }
      console.log(user);
      if (!user?.is_active) {
        return res.status(403).json({
          success: false,
          message: "Is_Active false and Forbidden!!"
        });
      }
      console.log(user.role);
      if (roles.length && !roles.includes(user.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden !! This role have no access"
        });
      }
      req.user = decoded;
      next();
    } catch (error) {
      next(error);
    }
  };
};
var auth_default = auth;

// src/modules/user/user.route.ts
var router = Router();
router.post("/", userController.createUser);
router.get("/", auth_default(USER_ROLE.admin, USER_ROLE.agent), userController.getAllUsers);
router.get("/:id", userController.getSingleUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
var useRoute = router;

// src/modules/profile/profile.route.ts
import { Router as Router2 } from "express";

// src/modules/profile/profile.service.ts
var createProfileIntoDB = async (payload) => {
  const { user_id, bio, address, phone, gender } = payload;
  const user = await pool.query(
    `
        SELECT * FROM users WHERE id=$1
        `,
    [user_id]
  );
  if (user.rows.length === 0) {
    throw new Error("User not exists");
  }
  const result = await pool.query(
    `
       

        INSERT INTO profiles(user_id, bio, address, phone, gender) VALUES($1, $2, $3, $4, $5 ) RETURNING *
    `,
    [user_id, bio, address, phone, gender]
  );
  return result;
};
var profileService = {
  createProfileIntoDB
};

// src/modules/profile/profile.controller.ts
var createProfile = async (req, res) => {
  try {
    const result = await profileService.createProfileIntoDB(req.body);
    res.status(201).json({
      success: true,
      message: "Profile Created Successfully",
      data: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error
    });
  }
};
var profileController = {
  createProfile
};

// src/modules/profile/profile.route.ts
var router2 = Router2();
router2.post("/", profileController.createProfile);
var useRouteProfile = router2;

// src/modules/authentication/auth.route.ts
import { Router as Router3 } from "express";

// src/modules/authentication/auth.service.ts
import bcrypt2 from "bcryptjs";
import jwt2 from "jsonwebtoken";
var loginUserIntoDB = async (payload) => {
  const { email, password } = payload;
  const userData = await pool.query(
    `
        SELECT * FROM users WHERE email =$1  
        `,
    [email]
  );
  if (userData.rows.length === 0) {
    throw new Error("Invaild Credentials JWT !");
  }
  const user = userData.rows[0];
  const matchPassword = await bcrypt2.compare(password, user.password);
  if (!matchPassword) {
    throw new Error("Invaild Credentials JWT !");
  }
  const jwtPayload = {
    id: user.id,
    name: user.name,
    role: user.role,
    is_active: user.is_active,
    email: user.email
  };
  const accessToken = jwt2.sign(jwtPayload, config_default.secret, {
    expiresIn: "7d"
  });
  const refreshToken2 = jwt2.sign(jwtPayload, config_default.refresh_secret, {
    expiresIn: "1d"
    //set token expire date most important
  });
  return { accessToken, refreshToken: refreshToken2 };
};
var generateFreshToken = async (token) => {
  if (!token) {
    throw new Error("Unauthorized!!!");
  }
  const decoded = jwt2.verify(
    token,
    config_default.refresh_secret
  );
  const userData = await pool.query(
    `
      SELECT * FROM users WHERE email=$1
      `,
    [decoded.email]
  );
  const user = userData.rows[0];
  if (userData.rows.length === 0) {
    throw new Error("User not found");
  }
  console.log(user);
  if (!user?.is_active) {
    throw Error("Forbidden");
  }
  const jwtPayload = {
    id: user.id,
    name: user.name,
    role: user.role,
    is_active: user.is_active,
    email: user.email
  };
  const accessToken = jwt2.sign(jwtPayload, config_default.secret, {
    expiresIn: "1d"
  });
  return { accessToken };
};
var authService = {
  loginUserIntoDB,
  generateFreshToken
};

// src/modules/authentication/auth.controller.ts
var loginUser = async (req, res) => {
  try {
    const result = await authService.loginUserIntoDB(req.body);
    const { refreshToken: refreshToken2 } = result;
    res.cookie("refreshToken", refreshToken2, {
      //=====ei 3ta option security jonno bole dischi=========
      secure: false,
      //eta production deploy e true kore divo
      httpOnly: true,
      //brower cokkies ta amra js diye access korte pari na tai httponly tru kore dile tokon ni access korte pari
      sameSite: "lax"
      //eta use korle method bole dite parbo get, sathe naki post er sathe kaj korbe
    });
    res.status(201).json({
      success: false,
      message: "User login successfully",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error
    });
  }
};
var refreshToken = async (req, res) => {
  try {
    const result = await authService.generateFreshToken(req.cookies.refreshToken);
    res.status(201).json({
      success: true,
      message: "Access token generate successfully",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
      error: error.message
    });
  }
};
var authController = {
  loginUser,
  refreshToken
};

// src/modules/authentication/auth.route.ts
var router3 = Router3();
router3.post("/login", authController.loginUser);
router3.post("/refresh-token", authController.refreshToken);
var jwtRoute = router3;

// src/app.ts
import cookieParser from "cookie-parser";

// src/middleware/logger.ts
import fs from "fs";
var logger = (req, res, next) => {
  const log = `
 Method --> ${req.method} --> Time ${Date.now()} --> URL --> ${req.url} 
`;
  fs.appendFile("logger.text", log, (err) => {
  });
  next();
};
var logger_default = logger;

// src/app.ts
import cors from "cors";

// src/middleware/globallErrorHandler.ts
var globallErrorHandler = (err, req, res, next) => {
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
};
var globallErrorHandler_default = globallErrorHandler;

// src/app.ts
var app = express();
var port = config_default.port;
app.use(cookieParser());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(logger_default);
app.use(cors({
  //client link
  origin: "http://localhost:3000"
  //next js projec origin
}));
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Express Server",
    author: "Sabbir vai"
  });
});
app.use("/api/user", useRoute);
app.use("/api/user", useRoute);
app.use("/api/user", useRoute);
app.use("/api/user", useRoute);
app.use("/api/user", useRoute);
app.use("/api/profile", useRouteProfile);
app.use("/api/auth", jwtRoute);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
app.use(globallErrorHandler_default);
var app_default = app;

// src/server.ts
var main = async () => {
  try {
    await initDB();
    app_default.listen(config_default.port, () => {
      console.log(`Example app listening on port ${config_default.port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};
main();
//# sourceMappingURL=server.js.map