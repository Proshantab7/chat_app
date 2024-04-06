import { useState } from "react";
import { MdError } from "react-icons/md";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Audio } from "react-loader-spinner";

const SignUp = () => {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [errEmail, setErrEmail] = useState(false);
  const [name, setName] = useState("");
  const [errName, setErrName] = useState(false);
  const [password, setPassword] = useState("");
  const [errPassword, setErrPassword] = useState(false);
  const [loader, setLoader] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) {
      setErrEmail("Required Email.");
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setErrEmail("Valid Email Required");
    }

    if (!name) {
      setErrName("Required Name.");
    }

    if (!password) {
      setErrPassword("Required Password");
    }

    if (email && name && password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setLoader(true);
          setTimeout(()=>{
            setLoader(false);
          }, 3000);
        })
        .catch((error) => {
          if (error.code == "auth/email-already-in-use") {
            setErrEmail("Already registered this Email.");
          }
        });
    }
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail(false);
  };

  const handleName = (e) => {
    setName(e.target.value);
    setErrName(false);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword(false);
  };

  return (
    <div className="container pl-2">
      <div className=" md:flex">
        <div className="md:w-1/2 flex justify-end mr-2 md:mr-[70px] items-center">
          <div className="">
            <h1 className="font-nunito text-primary font-bold text-[34.4px]">
              Get started with easily register
            </h1>
            <p className="font-nunito text-primary font-normal text-xl">
              Free register and you can enjoy it
            </p>

            <form onSubmit={handleSubmit}>
              <div className="relative mt-[30px]">
                <label
                  className="absolute top-[-14px] left-4 bg-white px-4"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  onChange={handleEmail}
                  className="border border-1 w-full p-4 rounded-lg text-lg text-primary"
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
              <div className="relative mt-[30px]">
                <label
                  className="absolute top-[-14px] left-4 bg-white px-4"
                  htmlFor="name"
                >
                  Full Name
                </label>
                <input
                  onChange={handleName}
                  className="border border-1 w-full p-4 rounded-lg text-lg text-primary"
                  placeholder="Ladushing GTG"
                  type="text"
                  name="name"
                  id="name"
                />
                {errName && (
                  <div>
                    <p className="text-red-500 mt-3 font-nunito">{errName}</p>
                    <div className="text-red-700 absolute top-6 text-xl right-4">
                      <MdError />
                    </div>
                  </div>
                )}
              </div>
              <div className="relative mt-[30px]">
                <label
                  className="absolute top-[-14px] left-4 bg-white px-4"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  onChange={handlePassword}
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,10}"
                  required
                  title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more than 10 characters"
                  className="tracking-[.5rem] border border-1 w-full p-4 rounded-lg text-2xl text-primary"
                  placeholder="********"
                  type="password"
                  name="password"
                  id="password"
                />
                {errPassword && (
                  <div>
                    <p className="text-red-500 mt-3 font-nunito">
                      {errPassword}
                    </p>
                    <div className="text-red-700 absolute top-6 text-xl right-4">
                      <MdError />
                    </div>
                  </div>
                )}
              </div>

              <button
                className="py-4 w-full bg-[#5F35F5] rounded-full mt-[30px] text-white text-lg font-semibold"
                type="submit"
              >
                Sign Up
              </button>
              {loader && (
                <div className="flex justify-center">
                  <Audio
                    height="80"
                    width="80"
                    radius="9"
                    color="green"
                    ariaLabel="loading"
                    wrapperStyle
                    wrapperClass
                  />
                </div>
              )}

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
        <div className="hidden  md:block w-2/4 ">
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
