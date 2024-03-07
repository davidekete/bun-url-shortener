import * as dotenv from "dotenv";
dotenv.config();
import Elysia from "elysia";
import { urlController } from "./src/shortener.controller";

const app = new Elysia();

app.use(urlController as any);

app.listen(4040, () => {
  console.log("Server is running on port 4040");
});
