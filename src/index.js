"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./config/db");
const app_1 = require("./app");
const PORT = process.env.PORT || 3000;
(0, db_1.connectDb)()
    .then(() => {
    console.log("Connected to MongoDB");
    app_1.app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
})
    .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});
