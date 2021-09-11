import { useRouter } from "next/router";

export default function Navbar() {
  const route = useRouter().route;

  return (
    <nav className="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-white shadow sm:items-baseline w-full">
      <div className="mb-2 sm:mb-0">
        {route !== "/" && (
          <a href="/">
            <svg
              width="30"
              height="30"
              viewBox="0 0 512 512"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <a href="/"></a>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M188 279.977V423.977C188 440.545 201.432 453.977 218 453.977C234.569 453.977 248 440.545 248 423.977V279.977H256V467.976C256 484.545 269.432 497.977 286 497.977C302.569 497.977 316 484.545 316 467.976V279.977H324V359.977C324 376.545 337.432 389.977 354 389.977C370.569 389.977 384 376.545 384 359.977V131.977C384 59.0748 324.902 8.00012 252 8.00012C179.098 8.00012 120 59.075 120 131.977L120 383.977C120 400.545 133.432 413.977 150 413.977C166.569 413.977 180 400.545 180 383.976V279.977H188ZM314 145.976C321.732 145.976 328 139.708 328 131.976C328 124.244 321.732 117.976 314 117.976C306.268 117.976 300 124.244 300 131.976C300 139.708 306.268 145.976 314 145.976ZM216 179.976C216 179.976 216 207.976 252 207.976C288 207.976 288 179.976 288 179.976H216ZM204 131.976C204 139.708 197.732 145.976 190 145.976C182.268 145.976 176 139.708 176 131.976C176 124.244 182.268 117.976 190 117.976C197.732 117.976 204 124.244 204 131.976Z"
                fill="black"
              />
            </svg>
          </a>
        )}
      </div>
      <div>
        {route !== "/login" && (
          <a
            href="/login"
            className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2"
          >
            Login / Sign Up
          </a>
        )}
      </div>
    </nav>
  );
}
