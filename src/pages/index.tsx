import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { api } from "~/utils/api";
import { type NextPage } from "next";
import { PageLayout } from "~/components/layout";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { LoadingPage } from "~/components/loading";

function TitleDash() {
  return (
    <div
      className="no-scrollbar flex w-full flex-wrap
      justify-center overflow-y-scroll  p-4"
    >
      <SignInButton>
        <div
          className="group m-3
          rounded-xl px-8  md:hover:cursor-pointer
          "
        >
          <div
            className="flex h-[157px] w-[300px] flex-col
            md:h-[315px] md:w-[600px]"
          >
            <div
              className="flex h-1/2 w-full justify-center 
              bg-transparent md:h-2/3"
            >
              <div
                className="flex flex-col justify-center
                bg-gradient-to-r from-green-300 via-blue-500
                to-purple-600 bg-clip-text text-2xl
                font-bold text-transparent md:text-6xl"
              >
                <span>SiteHoarder</span>
              </div>
            </div>
            <div className="flex h-1/3 w-full justify-center">
              <div
                className="flex from-rose-400 via-fuchsia-500
                to-indigo-500 text-center
                text-sm text-white
                transition duration-1000 ease-in-out
                md:text-2xl md:group-hover:bg-gradient-to-r
                md:group-hover:bg-clip-text md:group-hover:text-transparent"
              >
                <span>click here to sign in and start using</span>
              </div>
            </div>
          </div>
        </div>
      </SignInButton>
    </div>
  );
}

function ModDash() {
  const { data, isLoading: sitesLoading } = api.sites.getAll.useQuery();
  if (sitesLoading) return <LoadingPage />;
  if (!data) return <div>Something went wrong!</div>;

  return (
    <div
      className="no-scrollbar flex w-full flex-wrap
      justify-center overflow-y-scroll  p-4"
    >
      {data?.map((content) => (
        <Link
          key={content.id}
          href={content.url}
          className="group m-3
          rounded-xl px-8 shadow-sm shadow-white transition duration-500
          ease-in-out md:shadow-inner md:hover:shadow-white
        "
        >
          <div
            className="flex h-[157px] w-[300px] flex-col
            md:h-[315px] md:w-[600px]"
          >
            <div
              className="flex h-1/2 w-full justify-center 
              bg-transparent md:h-2/3"
            >
              <div
                className="flex flex-col justify-center bg-gradient-to-r
                from-green-300 via-blue-500 to-purple-600 bg-clip-text text-2xl
                font-bold text-transparent md:text-6xl"
              >
                <span>{content.name}</span>
              </div>
            </div>
            <div className="flex h-1/3 w-full rounded-b-2xl">
              <div
                className="flex bg-clip-text text-center text-sm
                transition duration-300 ease-in-out
                md:text-2xl md:text-transparent md:group-hover:bg-white"
              >
                <span>{content.description}</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

function SiteForm() {
  const [input, setInput] = useState("");
  const ctx = api.useContext();

  const { mutate } = api.sites.create.useMutation({
    onSuccess: () => {
      setInput("");
      void ctx.sites.getAll.invalidate();
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
      <form
        onSubmit={function (e: React.SyntheticEvent) {
          e.preventDefault();
          if (input !== "") {
            mutate({ content: input });
          }
        }}
      >
        <input
          placeholder="Add a new site here!"
          className="m-4 grow animate-bounce bg-transparent
          font-semibold text-slate-700 outline-none
          placeholder:text-slate-700 focus:animate-none"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="rounded-xl px-3 font-semibold
          shadow shadow-slate-800/30 transition ease-in-out
          md:hover:bg-green-300"
        >
          Add
        </button>
      </form>
    </div>
  );
}

const Home: NextPage = () => {
  const { user, isSignedIn, isLoaded: userLoaded } = useUser();

  if (!userLoaded) return <div />;

  console.log(user?.id);

  return (
    <PageLayout>
      <div
        className="sticky top-0 z-50 flex h-14 items-center
        border-b border-gray-800 bg-gradient-to-r
        from-rose-400 via-fuchsia-500 to-indigo-500
        p-2 md:h-24"
      >
        <div className="flex w-full justify-between">
          <SiteForm />
          <div id="spacer" />
          {!!isSignedIn && (
            <SignOutButton>
              <div
                className="flex justify-center rounded-full p-4
                font-semibold transition ease-in-out md:hover:cursor-pointer
                md:hover:bg-rose-400 md:hover:shadow-xl"
              >
                Sign Out
              </div>
            </SignOutButton>
          )}
        </div>
      </div>
      {!isSignedIn && <TitleDash />}
      {!!isSignedIn && <ModDash />}
    </PageLayout>
  );
};

export default Home;
