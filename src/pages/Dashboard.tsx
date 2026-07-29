import { useState, useRef } from "react";
import Navbar from "../components/layout/Navbar";
import SubjectCard from "../components/ui/SubjectCard";
import Button from "../components/ui/Button";
import Footer from "../components/layout/Footer.tsx";
import logo from "../assets/Echo-Logo.png";
// import { toPng } from "html-to-image"; 
import { calculateGWA } from "../utils/calculateGwa.ts";
import type { Subject } from "../utils/calculateGwa.ts";

function Dashboard() {
  // const [downloading, setDownloading] = useState<boolean>(false);
  // const [isExporting, setIsExporting] = useState<boolean>(false);
  const scheduleRef = useRef<null>(null);
  const [gwa, setGwa] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: crypto.randomUUID(), grade: "", units: "" },
  ]);

  const addSubject = () => {
    setSubjects((prev) => [...prev, { id: crypto.randomUUID(), grade: "", units: "" }]);
  };

  const removeSubject = (id: string) => {
    setSubjects((prev) => prev.filter((s) => s.id !== id));
  };

  const updateSubject = (id: string, field: "grade" | "units", value: string) => {
    setSubjects((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const calculateGrades = () => {
    const hasEmptyFields = subjects.some(
      (s) => s.grade.trim() === "" || s.units.trim() === ""
    );

    if (hasEmptyFields) {
      setError("Grades or Units field can not be empty.");
      setGwa(null);
      return;
    }

    setError(null);
    setGwa(calculateGWA(subjects));
  };

  // const handleDownload = async () => {
  //   if (!scheduleRef.current) return;
  //   setDownloading(true);
  //   setIsExporting(true);

  //   await new Promise((resolve) =>
  //     requestAnimationFrame(() => requestAnimationFrame(resolve))
  //   );

  //   try {
  //     const dataUrl = await toPng(scheduleRef.current);
  //     const link = document.createElement("a");
  //     link.download = "Echo | GWA Summarization Report.png";
  //     link.href = dataUrl;
  //     link.click();
  //   } catch (err) {
  //     console.error("Download failed:", err);
  //   } finally {
  //     setIsExporting(false);
  //     setDownloading(false);
  //   }
  // };

  const date = new Date();
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(date);

  const time24 = date.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  return (
    <div className="bg-[#FBF8F3] min-h-screen flex flex-col">
      <Navbar />
      <p className="font-[Amaranth] text-center my-10 italic text-2xl">Know where your GWA is headed.</p>

      {/* CARD */}
      <div className="bg-white flex-col flex justify-center items-center w-fit mx-auto shadow-sm rounded overflow-hidden mb-10">
        <p className="bg-[#232323] text-sm w-full text-white font-semibold px-3 py-1">Calculate your grades</p>

        <div className="px-5 mt-5 flex flex-col gap-3">
          {subjects.map((s, index) => (
            <SubjectCard
              key={s.id}
              grades={s.grade}
              units={s.units}
              onGradeChange={(v: string) => updateSubject(s.id, "grade", v)}
              onUnitsChange={(v: string) => updateSubject(s.id, "units", v)}
              onRemove={() => removeSubject(s.id)}
              canRemove={index !== 0}
              showError={error !== null}
            />
          ))}
        </div>

        {error && <p className="text-xs text-red-500 text-center mt-2">{error}</p>}

        <div className="my-3 flex flex-row gap-3">
          <Button
            onClick={addSubject}
          >
            <span className="font-mono px-3 py-1.5 rounded text-xs text-[#232323] border border-[#232323] hover:bg-[#232323] hover:text-white transition duration-200 leading-none">+ Add Subject</span>
          </Button>

          <Button
            onClick={calculateGrades}
          >
            <span className="font-mono leading-none px-3 py-1.5 rounded text-xs text-white border border-[#232323] bg-[#232323] hover:bg-white hover:text-[#232323] transition duration-200">Calculate GWA</span>
          </Button>
        </div>
      </div>
      
      {/* SUMMARY REPORT */}
      {gwa !== null && (
        <div ref={scheduleRef} className="bg-white mb-20 py-3 px-5 shadow w-fit mx-auto rounded">

          {/* HEADER */}
          <div className="grid grid-cols-2 items-center gap-70 border-b border-b-gray-200">
            <div className="flex flex-col items-start">
              <div className="flex flex-row items-center">
                <img src={logo} alt="Echo Logo" className="w-10 h-10 rounded mr-1" />
                <p className="font-mono text-[#232323] mt-0.5 text-[1.5rem]">Echo</p>
              </div>
              <p className="text-sm font-[Amaranth] mt-1 italic">Know where your GWA is headed.</p>
            </div>
            <div className="text-right">
              <p className="font-mono font-medium text-sm">{formattedDate}</p>
              <p className="font-mono text-xs">{time24}</p>
            </div>
          </div>

          <p className="font-bold text-center my-5">GWA Summary Report</p>

          {/* TABLE */}
          <table className="border border-gray-200 w-full">
            <thead>
              <tr className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-5 mx-2 text-gray-500">
                <td className="text-xs font-mono mt-1">Subjects</td>
                <td className="text-xs font-mono mt-1">Grades</td>
                <td className="text-xs font-mono mt-1">Units</td>
                <td className="text-xs font-mono mt-1">Weighted Grade</td>
              </tr>
            </thead>
          </table>
        
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Dashboard;