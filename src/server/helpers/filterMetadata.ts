import urlMetadata from "url-metadata";
import { type Site } from "@prisma/client";

export function filterMetadata(link: string) {
  const url = link;
  
  if (!url) return null;

  urlMetadata(url, {
    mode: 'cors',
    requestHeaders: {},
    includeResponseBody: true
  })
  .then((metadata) => {
    console.log(metadata)
  },
  (e) => {
    console.error(e)
  })

  return 
};