const http = require("http")
const app = require("./src/app");
const { error } = require("console");
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(PORT, ()=>{console.log(`Server is running on ${PORT}`)});
server.on("error", (error)=>{
    console.error("Server error", error);
})