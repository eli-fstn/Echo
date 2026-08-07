import logo from "../../assets/Echo-Logo.png";

function Footer() {
  const date = new Date();
  const currentYear = new Intl.DateTimeFormat('en-US', {
    year: "numeric",
  }).format(date);

  return (
    <div className="bg-[#232323] mt-auto min-h-60 w-full flex flex-col">
      <div className="flex-1 py-10 px-6 md:px-20 lg:px-50">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Echo Logo" className="w-8 h-8 sm:w-10 sm:h-10 rounded" loading="lazy" />
          <p className="font-mono text-white text-xl sm:text-[1.7rem]">Echo</p>
        </div>

        <p className="text-white/80 text-sm mt-5 max-w-full sm:max-w-100">A simple academic tool designed to help students calculate and predict their General Weighted Average with confidence.</p>

        <div className="flex gap-6 mt-4">
          <p onClick={() => document.getElementById("dashboard")?.scrollIntoView()} className="text-white/70 hover:text-white text-xs transition cursor-pointer">Back to Top</p>
        </div>
      </div>

      <div className="pb-3">
        <p className="text-white text-center text-xs px-4">
          &copy; {currentYear} Echo - GWA Calculator. Developed for academic purposes.
        </p>
      </div>
    </div>
  );
}

export default Footer;