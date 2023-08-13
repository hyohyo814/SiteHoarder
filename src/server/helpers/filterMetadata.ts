import urlMetadata from "url-metadata";
import { type Site } from "@prisma/client";
import { url_domain } from "./domainExtract";
import { TRPCError } from "@trpc/server";
import toast from "react-hot-toast";

type SiteInput = Omit<Site, "id"|"userId">;

export async function filterMetadata(link: string) {
  const url = link;
  
  if (!url) return null;

  const metadata = await urlMetadata(url, {
    mode: 'cors',
    requestHeaders: {},
  })
  .then((metadata) => {
    console.log(metadata);
    const nameOpt = metadata['application-name'] as string
      ?? url_domain(link);

    return {
      name: nameOpt,
      url: metadata['og:url'] as string,
      description: metadata.description as string,
    }
  },
  (e) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    toast.error(e);
  })

  if (!metadata) throw new TRPCError({
    code: 'BAD_REQUEST'
  });


  const filteredObject: SiteInput = {
    url: link,
    name: metadata.name,
    description: metadata.description.length < 90
      ? metadata.description
      : metadata.description.slice(0, 89) + '...'
  }

  console.log(filteredObject);

  return filteredObject;
};