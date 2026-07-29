import logo from "../../assets/Echo-Logo.png";

function Navbar() {
  return (
    <div className="bg-white flex shadow-sm flex-row justify-between items-center px-90 h-15">
      <div className="flex flex-row items-center">
        <img src={logo} className="w-10 h-10 rounded mr-1" />
        <p className="font-mono text-[#232323] text-[1.7rem] mt-1">Echo</p>
      </div>
      <p className="font-inter font-semibold text-[#232323] text-[1.2rem]">GWA Calculator</p>
    </div>
  )
}

export default Navbar;