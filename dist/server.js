"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./config/app");
const environment_1 = require("./environment");
const PORT = environment_1.default.getPort();
const port = process.env.PORT || 8080;
app_1.default.listen(port, () => {
    console.log('API REST - AOS GMAO is running on port ' + port);
});
