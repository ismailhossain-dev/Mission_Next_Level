import app from "./app";
import config from "./config";
import { initDB } from "./db";

const main = async () => {
  try {
    initDB()
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log("Failed to server run", error);
  }
};

main();
