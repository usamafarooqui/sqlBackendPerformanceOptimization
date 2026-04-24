const dotenv = require("dotenv");
dotenv.config();
const app = require("./src/app");
const { testConnection } = require("./src/config/dbConfig")
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`)
    testConnection();
})