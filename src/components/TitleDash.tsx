import { SignInButton } from "@clerk/nextjs";

export default function TitleDash() {
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