import { useState } from "react";
import { MdError } from "react-icons/md";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Audio } from "react-loader-spinner";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { Link } from "react-router-dom";
import { getDatabase, ref, set } from "firebase/database";

const SignUp = () => {
  const database = getDatabase();
  const db = getDatabase();
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [errEmail, setErrEmail] = useState(false);
  const [name, setName] = useState("");
  const [errName, setErrName] = useState(false);
  const [password, setPassword] = useState("");
  const [errPassword, setErrPassword] = useState(false);
  const [loader, setLoader] = useState(false);
  const [eye, setEye] = useState(false);

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
          const user = userCredential.user;
          setLoader(true);
          setTimeout(() => {
            setLoader(false);
          }, 3000);

          set(ref(db, 'users/'+ user.uid), {
            username: name,
            email: email,
          });

        })
        .catch((error) => {
          if (error.code.includes("auth/email-already-in-use")) {
            setErrEmail("Already registered this Email.");
          } else {
            alert(error.code);
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

  function handleEye() {
    setEye(!eye);
  }

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
                  type={eye ? "text" : "password"}
                  name="password"
                  id="password"
                />
                <div className="absolute top-6 text-xl right-4">
                  {eye ? (
                    <FaEye onClick={handleEye} />
                  ) : (
                    <IoEyeOff onClick={handleEye} />
                  )}
                </div>

                {errPassword && (
                  <div>
                    <p className="text-red-500 mt-3 font-nunito">
                      {errPassword}
                    </p>
                  </div>
                )}
              </div>

              <button
                className="py-4 w-full bg-[#5F35F5] rounded-full mt-[30px] text-white text-lg font-semibold"
                type="submit"
              >
                Sign Up
              </button>
              { loader && 
                <div className="flex flex-col gap-2 justify-center items-center">
                  <Audio
                    height="80"
                    width="80"
                    radius="9"
                    color="green"
                    ariaLabel="loading"
                    wrapperStyle
                    wrapperClass
                  />
                  <p className="font-nunito text-lg font-bold">Sign Up Successfully.</p>
                </div>
              }

              <p
                href="#"
                className="font-nunito text-center mt-9 text-[#03014C]"
              >
                Already have an account ?
                <Link to='signin' className="text-[#EA6C00] font-bold"> Sign In</Link>
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
