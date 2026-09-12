import app from "./app"
import config from "./config"
import { prisma } from "./lib/prisma"

const main = async()=> {
  try {
    //connect prisma 
    await prisma.$connect()
    app.listen(config.port,  ()=> {
      console.log(`Server is running on port ${config.port}`)
    })
  } catch (error) {
    console.log("Error starting the server", error)
    await prisma.$disconnect();
    process.exit(1)
  }
}

main()