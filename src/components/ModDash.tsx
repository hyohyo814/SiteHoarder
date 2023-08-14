import Link from "next/link";
import { api } from "~/utils/api";
import { LoadingPage, LoadingSpinner } from "./loading";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

export default function ModDash() {
  const { data, isLoading: sitesLoading } = api.sites.getAll.useQuery();
  const ctx = api.useContext();
  const { mutate, isLoading: isDeleting } = api.sites.delete.useMutation({
    onSuccess: () => {
      void ctx.sites.getAll.invalidate();
    },
    onError: (err) => {
      const errMsg = err.data?.zodError?.fieldErrors.content;
      if (errMsg?.[0]) {
        toast.error(errMsg[0]);
      } else {
        toast.error("Failed to delete!");
      }
    },
  });

  if (sitesLoading) return <LoadingPage />;
  if (!data) return <div>Something went wrong!</div>;

  function remove(e: React.SyntheticEvent) {
    e.preventDefault();
    const target = e.target as HTMLButtonElement;
    if (!target) {
      toast.error("An error has occurred!");
    }
    mutate({ content: target.value });
  }

  return (
    <div
      className="no-scrollbar md:flex w-full flex-wrap
      md:justify-center overflow-y-scroll h-full"
    >
      {data.length === 0 && 
        <div className='flex h-2/3 items-center text-8xl
        font-bold bg-gradient-to-r
        from-green-300 via-blue-500 to-purple-600
        bg-clip-text text-transparent'>
          <span>Start adding websites!</span>
        </div>
      }
      {data?.map((content) => (
        <div
          key={content.id}
          className="group m-3 rounded-xl px-8 shadow-sm
          shadow-white transition duration-500 ease-in-out
          md:shadow-inner md:hover:shadow-white md:h-96
          py-4 h-56"
        >
          <div className="flex w-full justify-end">
            {!isDeleting &&
                <button
                  onClick={remove}
                  value={content.id}
                  className="text-bold flex w-20 justify-center
                  rounded-full bg-gray-800 text-white-500
                  font-semibold md:py-1 md:hover:shadow-inner
                  md:hover:shadow-white md:hover:bg-rose-500
                  md:hover:text-gray-800 transition ease-in"
                >
                  Remove
                </button>
            }
            {isDeleting && 
              <div className='m-4'>
                <LoadingSpinner size={20} />
              </div>
            }
          </div>
          <Link href={content.url}>
            <div
              className="flex h-[157px] w-[300px] flex-col
            md:h-[315px] md:w-[600px]"
            >
              <div
                className="flex h-1/2 w-full justify-center 
              bg-transparent md:h-2/3"
              >
                <div
                  className="flex flex-col justify-center text-2xl
                font-bold md:text-6xl"
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
        </div>
      ))}
    </div>
  );
}
