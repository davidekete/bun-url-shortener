import { Elysia } from "elysia";
import { shortenUrl, fetchUrl } from "./shortener.service";

export const urlController = (app: Elysia) => {
  app.post("/shorten", async (context: any) => {
    const { longUrl } = context.body;

    const shortUrl = await shortenUrl(longUrl);

    return shortUrl;
  });

  app.get("/:uniqueId", async (context) => {
    const uniqueId = context.params.uniqueId;

    const url = await fetchUrl(uniqueId);

    if (url) {
      context.set.status = 301;
      context.set.redirect = url.longUrl;
    } else {
      context.set.status = 404;
      return {
        message: "Page not found",
      };
    }
  });
};
