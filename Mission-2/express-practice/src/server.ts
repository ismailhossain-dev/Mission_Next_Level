import app from "./app";
import config from "./config";

const main = async () => {
  try {
    //ekane database ta call korbo run kora jonno
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log("Failed to server run", error);
  }
};

main();
