import logo from "../../assets/Echo-Logo.png";

function Navbar() {
  return (
    <div className="bg-white shadow-md h-15 w-200 mx-auto flex justify-center items-center mt-5 rounded-4xl cursor-pointer">
      <div className="flex flex-row items-center justify-between w-full mx-10">
        <div className="flex flex-row items-center">
          <img src={logo} alt="Echo Logo" className="w-10 h-10 rounded mr-1" loading="lazy"/>
          <p className="font-mono text-[#232323] text-[1.7rem] mt-1">Echo</p>
        </div>
        <p className="font-inter font-semibold text-[#232323] text-[1.2rem]">GWA Calculator</p>
      </div>
    </div>
  )
}

export default Navbar;