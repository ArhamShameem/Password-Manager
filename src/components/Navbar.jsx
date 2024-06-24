import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-slate-800 w-full">
      <div className="flex justify-between items-center px-4 py-5 h-14 w-full">
        <div className="logo font-bold py-8 text-white">Password Manager</div>
        <a href="" target="_blank">
          <button className="bg-green-400 p-1 text-sm border border-green-500 rounded-3xl w-35">GitHub</button>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
