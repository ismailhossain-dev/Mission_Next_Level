import app from "./app";
import config from "./config";

const main = async ()=> {
    try {
        //database connect 

        app.listen(config.port, () => {
        console.log(`Example app listening on port ${config.port}`)
})
    } catch (error) {
        console.log("Failed to start server", error);
    }
}

main()