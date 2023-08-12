import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { api } from "~/utils/api";
import { type NextPage } from "next";
import { PageLayout } from "~/components/layout";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const ModDash = () => {
  const { data, isLoading: sitesLoading } = api.sites.getAll.useQuery();
  if (sitesLoading) return <div>Loading sites</div>;
  if (!data) return <div>Something went wrong!</div>;

  return (
    <div className="no-scrollbar flex w-full flex-wrap justify-center overflow-y-scroll  p-4">
      {data?.map((content) => (
        <Link key={content.id} href={content.url}>
          <Image
            src={`/api/og?title=${content.name}&desc=${content.description}`}
            width={1200}
            height={630}
            alt={`${content.name} image`}
            className="m-4 rounded-2xl p-3 shadow-sm shadow-slate-600 md:h-[315px] md:w-[600px] md:hover:shadow-slate-300"
          />
        </Link>
      ))}
    </div>
  );
};

const SiteForm = () => {
  const [input, setInput] = useState("");
  const ctx = api.useContext();
  
  const { mutate } = api.sites.create.useMutation({
    onSuccess: () => {
      void ctx.sites.getAll.invalidate()
    },
    onError: (e) => {
      const errMsg = e.data?.zodError?.fieldErrors.content;
      if (errMsg?.[0]) {
        toast.error(errMsg[0]!);
      } else {
        toast.error("Failed to add site.");
      }
    },
  });


  return (
    <div>
      <form onSubmit={function(e: React.SyntheticEvent) {
        e.preventDefault();
        if (input !== "") {
          mutate({ content: input })
        }
      }}>
        <input
          placeholder="Add a new site here!"
          className="grow bg-transparent outline-none"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-slate-700 shadow-sm shadow-slate-400 px-3 rounded-xl"
        >Add</button>
      </form>
    </div>
  );
};

const Home: NextPage = () => {
  const { isSignedIn, isLoaded: userLoaded } = useUser();



  if (!userLoaded) return <div />;

  return (
    <PageLayout>
      <div className="h-24 border-b-2 bg-slate-600 p-2">
        {!!isSignedIn && <SignOutButton />}
        {!isSignedIn && <SignInButton />}
        <SiteForm />
      </div>
      <ModDash />
    </PageLayout>
  );
};

export default Home;
