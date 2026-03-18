import "server-only";
import { defineLive } from "next-sanity";
import { client } from "@/sanity/lib/client";

const token = process.env.SANITY_API_READ_TOKEN;

export const { sanityFetch, SanityLive } = defineLive({
    client: client.withConfig({
        token,
        useCdn: false,
    }),
    serverToken: token,
    browserToken: token,
});