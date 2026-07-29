import logo from "../../assets/Echo-Logo.png";

function Footer() {
  const date = new Date();
  const currentYear = new Intl.DateTimeFormat('en-US', {
    year: "numeric",
  }).format(date);

  return(
    <div className="bg-[#232323] mt-auto h-60 w-full flex flex-col">
      <div className="flex-1 py-10 px-50">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Echo Logo" className="w-10 h-10 rounded" />
          <p className="font-mono text-white mt-0.5 text-[1.7rem]">Echo</p>
        </div>

        <p className="text-white/80 text-sm mt-5 w-100">A simple academic tool designed to help students calculate and predict their General Weighted Average with confidence.</p>
      </div>

      <div className="pb-3">
        <p className="text-white text-center text-xs">
          &copy; {currentYear} Echo - GWA Calculator. Developed for academic purposes.
        </p>
      </div>
    </div>
  )
}

export default Footer;