export const isDev = process.env.NODE_ENV === "development";


export const ORIGIN_URL = isDev
    ? process.env.NEXT_PUBLIC_BASE_URL
    : process.env.NEXT_PUBLIC_APP_URL;

