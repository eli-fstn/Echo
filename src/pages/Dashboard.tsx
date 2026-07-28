import Navbar from "../components/layout/Navbar";
import SubjectCard from "../components/ui/SubjectCard";
import Button from "../components/ui/Button";
import Footer from "../components/layout/Footer";
import { useState } from "react";

function Dashboard() {
  const [subjects, setSubjects] = useState<string[]>([crypto.randomUUID()])

  const addSubject = () => {
    setSubjects((prev) => [...prev, crypto.randomUUID()]);
  };

  const calculateGWA = () => {
    console.log("ad");
  }

  const removeSubject = (id: string) => {
    setSubjects((prev) => prev.filter((subjectId) => subjectId !== id));
  };

  return (
    <div className="bg-[#FAF7FF] h-vh">
      <Navbar />
      <p className="font-[Amaranth] text-center my-10 italic text-xl">Know where your GWA is headed.</p>

      {/* BOX */}
      <div className="bg-white flex-col flex justify-center items-center w-fit mx-auto shadow-sm rounded overflow-hidden">
        <p className="bg-[#C4B5FD] text-sm w-full items-center text-white font-semibold px-3 py-1">Calculate your grades</p>

        {/* Input Fields */}
        <div className="px-5 mt-5 flex flex-col gap-3">
          {subjects.map((id, index) => (
            <SubjectCard 
            onRemove={() => removeSubject(id)}
            canRemove={index !== 0}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="my-2 flex flex-row gap-3">
          <Button
            onClick={() => addSubject()}
          >
            <p className="px-3 py-1 rounded text-xs text-[#6D28D9] border border-[#6D28D9] hover:bg-[#6D28D9] hover:text-white transition duration-200">+ Add Subject</p>
          </Button>
          <Button
            onClick={() => calculateGWA()}
          >
            <p className="px-3 py-1 rounded text-xs border text-white bg-[#6D28D9] hover:text-[#6D28D9] hover:bg-white hover:border-[#6D28D9] transition duration-200">Calculate GWA</p>
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Dashboard;