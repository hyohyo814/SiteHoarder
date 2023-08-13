import Link from "next/link";
import { api } from "~/utils/api";
import { LoadingPage } from "./loading";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

export default function ModDash() {
  const [id, setId] = useState('');

  const { data, isLoading: sitesLoading } = api.sites.getAll.useQuery();
  if (sitesLoading) return <LoadingPage />;
  if (!data) return <div>Something went wrong!</div>;

  function remove(e: Event) {
    e.preventDefault();
    console.log(e.target)
  }

  return (
    <div
      className="no-scrollbar flex w-full flex-wrap
      justify-center overflow-y-scroll  p-4"
    >
      {data?.map((content) => (
        <div key={content.id}>
          <div className='flex text-bold text-red-500'>
            <button
              onClick={() => remove}
              value={content.id}
            >
              Remove
            </button>
          </div>
        <Link
          
          href={content.url}
          className="group m-3
          rounded-xl px-8 shadow-sm shadow-white transition duration-500
          ease-in-out md:shadow-inner md:hover:shadow-white"
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
        </div>
      ))}
    </div>
  );
}