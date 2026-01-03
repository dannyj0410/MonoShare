const SignIn = () => {
  return (
    <div className="w-screen h-screen pt-40">
      <div className="flex flex-col w-md h-fit rounded-xl m-auto py-8 px-8 z-10 bg-white/1.5 border-gray-400/20 border">
        <h1 className="mx-auto text-3xl ">Welcome</h1>
        <h2 className="text-2xl noto-sans mt-3 mb-1">Sign In</h2>
        <p className="text-sm text-(--gray) noto-sans">
          Access your account to gain access to even more features.
        </p>
        <form action="" method="post">
          <div className="flex flex-col noto-sans mt-6 gap-1">
            <p className="">Email</p>
            <div className="flex gap-2 items-center border border-(--main-light-blue) px-3 rounded-xl outline-3 outline-cyan-600/30">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#a1a1a1"
                stroke-linecap="round"
                stroke-linejoin="round"
                id="Mail--Streamline-Tabler"
                height="20"
                width="20"
                className="stroke-(--main-light-blue)"
              >
                <desc>Mail Streamline Icon: https://streamlinehq.com</desc>
                <path
                  d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2H5a2 2 0 0 1 -2 -2V7z"
                  stroke-width="2"
                ></path>
                <path d="m3 7 9 6 9 -6" stroke-width="2"></path>
              </svg>
              <input
                type="email"
                name=""
                id=""
                placeholder="example@gmail.com"
                className="text-sm w-full text-(--gray) outline-0 py-2"
              />
            </div>
          </div>
          <div className="flex flex-col noto-sans mt-6 gap-1">
            <p className="">Password</p>
            <div className="flex gap-2 items-center border border-gray-400/20 px-3 rounded-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-0.5 -0.5 16 16"
                fill="none"
                id="Key-Line--Streamline-Majesticons"
                height="20"
                width="20"
                stroke="#a1a1a1"
                className=""
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9.375 9.375a3.75 3.75 0 1 0 -3.5893750000000004 -2.6606249999999996L5.625 6.875l-3.566875 3.566875a0.625 0.625 0 0 0 -0.18312499999999998 0.44187499999999996V12.5a0.625 0.625 0 0 0 0.625 0.625h1.25a0.625 0.625 0 0 0 0.625 -0.625 0.625 0.625 0 0 1 0.625 -0.625 0.625 0.625 0 0 0 0.625 -0.625 0.625 0.625 0 0 1 0.625 -0.625h0.36624999999999996a0.625 0.625 0 0 0 0.44187499999999996 -0.18312499999999998L8.125 9.375l0.16062500000000002 -0.16062500000000002A3.7493749999999997 3.7493749999999997 0 0 0 9.375 9.375zm1.25 -3.75a1.25 1.25 0 0 0 -1.25 -1.25"
                  stroke-width="1"
                ></path>
              </svg>
              <input
                type="password"
                name=""
                id=""
                placeholder="********"
                className="text-sm w-full text-(--gray) outline-0  py-2"
              />
            </div>
          </div>
          <button className="noto-sans w-full py-3 mt-10 text-sm font-medium cursor-pointer bg-(--white) text-black rounded-lg">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
