import { SignOutButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import { PageLayout } from "~/components/layout";
import React from "react";
import SiteForm from "~/components/SiteForm";
import ModDash from "~/components/ModDash";
import TitleDash from "~/components/TitleDash";


const Home: NextPage = () => {
  const { isSignedIn, isLoaded: userLoaded } = useUser();

  if (!userLoaded) return <div />;

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
