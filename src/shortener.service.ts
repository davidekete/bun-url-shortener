import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";
import { isURLValid } from "./utils";

const prisma = new PrismaClient();

export async function shortenUrl(longUrl: string) {
  try {
    //Is the Url valid?
    const isUrlValid = isURLValid(longUrl);

    if (!isUrlValid) {
      throw new Error("Invalid URL. Please enter a valid URL and try again");
    }

    //Has url already been shortened
    const urlExists = await prisma.url.findFirst({
      where: {
        longUrl,
      },
    });

    //Return already shortened URL
    if (urlExists) {
      return urlExists.shortUrl;
    }

    //Your base URL
    const baseURL = process.env.BASE_URL;

    //Unique identifier for the short URL
    const uniqueId = nanoid(10);

    //short url
    const shortUrl = `${baseURL}/${uniqueId}`;

    //Save to your database
    const url = await prisma.url.create({
      data: {
        longUrl,
        shortUrl,
        uniqueId,
      },
    });

    //Return the short url
    return {
      message: "URL shortened successfully",
      shortUrl: url.shortUrl,
    };
  } catch (error) {
    throw error;
  }
}

export async function fetchUrl(urlUniqueId: string) {
  try {
    const url = await prisma.url.findFirst({
      where: {
        uniqueId: urlUniqueId,
      },
    });

    return url;
  } catch (error) {
    throw error;
  }
}
