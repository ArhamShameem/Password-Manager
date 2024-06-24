import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordref = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/");
    let passwords = await req.json();
    console.log(passwords);
    setPasswordArray(passwords);
  };

  useEffect(() => {
    getPasswords();
  }, []);

  const copytext = (text) => {
    toast("🦄 Text is Copied!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    passwordref.current.type = "text";
    if (ref.current) {
      if (ref.current.src.includes("icons/closedeye.png")) {
        ref.current.src = "icons/openeye.png";
        passwordref.current.type = "text";
      } else {
        ref.current.src = "icons/closedeye.png";
        passwordref.current.type = "password";
      }
    } else {
      console.error("Image ref is not initialized.");
    }
  };

  const savePassword = async () => {
    setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
    // localStorage.setItem(
    //   "passwords",
    //   JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
    // );
    await fetch("http://localhost:3000/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id:form.id }),
    });
    
    await fetch("http://localhost:3000/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, id: uuidv4() }),
    });
    console.log(...passwordArray, form);
    setForm({ site: "", username: "", password: "" });
    toast("🦄 Password Added Sucessfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const deletePassword = async (id) => {
    console.log("deleting password with id", id);
    let c = confirm("Do you really want to delete this password?");
    if (c) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      // localStorage.setItem(
      //   "passwords",
      //   JSON.stringify(passwordArray.filter((item) => item.id !== id))
      // );
      let res = await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      console.log(...passwordArray, form);
    }
    toast("🦄 Password Deleted Successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  const editPassword = (id) => {
    console.log("editing password with id", id);
    setForm({ ...passwordArray.filter((i) => i.id === id)[0], id: id });
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
    toast("🦄 Edited Sucessfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />

    
      <div className="mycontainer  bg-green-200">
        <h1 className="text-4xl text-green-500">Password Wallet</h1>
        <p className=" text-white">Your own Password Manager</p>
        <div className="text-black gap-8 flex flex-col p-4 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            name="site"
            placeholder="Enter Website Url"
            className="rounded-full border border-green-400 w-full text-black px-4 py-1"
            type="text"
          />
          <div className="flex w-full justify-between gap-8 ">
            <input
              value={form.username}
              onChange={handleChange}
              name="username"
              placeholder="Enter Username"
              className="rounded-full border border-green-400 w-full text-black px-4 py-1"
              type="text"
            />
            <div className="relative">
              <input
                ref={passwordref}
                value={form.password}
                onChange={handleChange}
                name="password"
                placeholder="Enter Password"
                className="rounded-full border border-green-400 w-full text-black px-4 py-1"
                type="password"
              />
              <span
                className="absolute right-0 top-[2px] ml-1px left-13 cursor-pointer 
              "
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="ml-3px"
                  width={25}
                  src="icons/openeye.png"
                ></img>
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="bg-green-400 rounded-full border-1 border-green-800 justify-center items-center w-fit p-2 hover:bg-green-300"
          >
            Add Password
          </button>
        </div>
        <div className="passwords">
          <h2 className="flex justify-between text-gray-500 font-bold py-4">
            Your Passwords
          </h2>
          {passwordArray.length == 0 && (
            <div className="text-gray-500 ">No passwords to show</div>
          )}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden">
              <thead className="bg-green-800">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 border text-center w-32">
                        <a href={item.site} target="_blank">
                          {" "}
                          {item.site}
                        </a>
                        <div
                          className="copyicon"
                          onClick={() => copytext(item.site)}
                        >
                          <img
                            width={20}
                            alt="copyicon"
                            className="ml-1 cursor-pointer"
                            src="/icons/copyicon.png"
                          />
                        </div>
                      </td>
                      <td className="py-2 border text-center w-32">
                        {item.username}
                        <div
                          className="copyicon"
                          onClick={() => copytext(item.username)}
                        >
                          <img
                            width={20}
                            alt="copyicon"
                            className="ml-1 cursor-pointer"
                            src="/icons/copyicon.png"
                          />
                        </div>
                      </td>
                      <td className="py-2 border text-center w-32">
                        {"*".repeat(item.password.length)}
                        <div
                          className="copyicon"
                          onClick={() => copytext(item.password)}
                        >
                          <img
                            width={20}
                            alt="copy icon"
                            className="ml-1 cursor-pointer"
                            src="/icons/copyicon.png"
                          />
                        </div>
                      </td>
                      <td className="py-2 border text-center w-32">
                        <div className="copyicon flex justify-center gap-2">
                          <img
                            onClick={() => {
                              editPassword(item.id);
                            }}
                            className="w-5"
                            src="/icons/edit.png"
                          />
                          <img
                            onClick={() => {
                              deletePassword(item.id);
                            }}
                            className="w-5"
                            src="/icons/delete.png"
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
