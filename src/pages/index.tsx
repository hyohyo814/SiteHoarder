import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { sitesRouter } from "~/server/api/routers/sites";
import { api } from "~/utils/api";
import { type NextPage } from "next";
import { PageLayout } from "~/components/layout";
import { filterMetadata } from "~/server/helpers/filterMetadata";

const ModDash = () => {
  const { data, isLoading: sitesLoading } = api.sites.getAll.useQuery();
  if (sitesLoading) return <div>Loading sites</div>
  if (!data) return <div>Something went wrong!</div>

  return (
    <div className="flex overflow-y-scroll p-4 flex-wrap no-scrollbar justify-around  w-full">
      {[...data, ...data, ...data, ...data]?.map((content) => (
          <Image
            src={`/api/og?title=${content.name}&desc=${content.description}`}
            width={1200}
            height={630}
            alt={`${content.name} image`}
            className="rounded-2xl md:w-[600px] md:h-[315px] p-3 mb-4 shadow-sm shadow-slate-600 md:hover:shadow-slate-300"
            key={content.id}
          />
      ))}
    </div>
  );
};

const Home: NextPage = () => {
  const { user, isSignedIn, isLoaded: userLoaded } = useUser();

  if (!userLoaded) return <div />

  console.log(user?.id);

  filterMetadata('https://react-hot-toast.com');

  return (
    <PageLayout>
      <div className="h-24 border-b-2 p-2 bg-slate-600">
        {!!isSignedIn && <SignOutButton />}
        {!isSignedIn && <SignInButton />}
      </div>
      <ModDash />
    </PageLayout>
  );
};

export default Home;
