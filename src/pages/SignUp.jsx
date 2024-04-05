import { useState } from "react";
import { MdError } from "react-icons/md";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [errEmail, setErrEmail] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) {
      setErrEmail("Required Email.");
    }
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail(false);
  };

  return (
    <div>
      <div className="flex">
        <div className="w-1/2 flex justify-end mr-[70px] items-center">
          <div className="">
            <h1 className="font-nunito text-primary font-bold text-[34.4px]">
              Get started with easily register
            </h1>
            <p className="font-nunito text-primary font-normal text-xl">
              Free register and you can enjoy it
            </p>

            <form onSubmit={handleSubmit}>
              <div className="relative mt-[40px]">
                <label
                  className="absolute top-[-14px] left-4 bg-white px-4"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  onChange={handleEmail}
                  className="border border-1 w-full p-6 rounded-lg text-lg text-primary"
                  placeholder="Ladushing691@gmail.com"
                  type="email"
                  name="email"
                  id="email"
                />
                {errEmail && (
                  <div>
                    <p className="text-red-500 mt-3 font-nunito">{errEmail}</p>
                    <div className="text-red-700 absolute top-6 text-xl right-4">
                      <MdError />
                    </div>
                  </div>
                )}
              </div>
              <div className="relative mt-[40px]">
                <label
                  className="absolute top-[-14px] left-4 bg-white px-4"
                  htmlFor="name"
                >
                  Full Name
                </label>
                <input
                  className="border border-1 w-full p-6 rounded-lg text-lg text-primary"
                  placeholder="Ladushing GTG"
                  type="text"
                  name="name"
                  id="name"
                />
              </div>
              <div className="relative mt-[40px]">
                <label
                  className="absolute top-[-14px] left-4 bg-white px-4"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="border border-1 w-full p-6 rounded-lg text-lg text-primary"
                  placeholder="********"
                  type="password"
                  name="password"
                  id="password"
                />
              </div>

              <button
                className="py-5 w-full bg-[#5F35F5] rounded-full mt-[40px] text-white text-lg font-semibold"
                type="submit"
              >
                Sign Up
              </button>

              <p
                href="#"
                className="font-nunito text-center mt-9 text-[#03014C]"
              >
                Already have an account ?
                <span className="text-[#EA6C00] font-bold"> Sign In</span>
              </p>
            </form>
          </div>
        </div>
        <div className="w-2/4 ">
          <img
            className="w-full h-screen object-cover"
            src="signUp.png"
            alt="signUpImage"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
