const app = require("./app");

//Start a server
const port = process.env.PORT || 5000;
app.listen(port);
console.log(`server is created from port ${port}`);
