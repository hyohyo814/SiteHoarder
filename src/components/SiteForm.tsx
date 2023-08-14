import { useState } from "react";
import toast from "react-hot-toast";
import { api } from "~/utils/api";

export default function SiteForm() {
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
          placeholder:text-slate-700 focus:animate-none w-36
          md:w-56"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        {input !== '' && (
          <button
            type="submit"
            className="rounded-xl px-2 font-semibold
            shadow shadow-slate-800/30 transition ease-in-out
            md:hover:bg-green-300"
          >
            Add
          </button>)}
      </form>
    </div>
  );
}