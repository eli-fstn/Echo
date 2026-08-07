import logo from "../../assets/Echo-Logo.png";

function Navbar() {
  return (
    <div className="bg-white shadow-md w-[calc(100%-2rem)] max-w-200 mx-auto flex items-center mt-5 rounded-full sm:rounded-4xl px-4 sm:px-6 py-3 cursor-pointer">
      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex flex-row items-center">
          <img src={logo} alt="Echo Logo" className="w-8 h-8 sm:w-10 sm:h-10 rounded mr-1" loading="lazy"/>
          <p className="font-mono text-[#232323] text-lg sm:text-[1.7rem]">Echo</p>
        </div>
        <p className="font-inter font-semibold text-[#232323] text-xs sm:text-[1.2rem]">GWA Calculator</p>
      </div>
    </div>
  )
}

export default Navbar;