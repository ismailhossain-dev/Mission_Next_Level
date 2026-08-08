// ekane just server ta run hobe 

import app from "./app";
import config from "./config";
import { initDB } from "./db";

const main = async () => {
  try {
    // database table create ba connection check korar jonno
    await initDB();
    
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

// Ekhane main function-ti call korte hobe!
main();