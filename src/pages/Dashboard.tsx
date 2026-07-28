import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import SubjectCard from "../components/ui/SubjectCard";
import Button from "../components/ui/Button";
import Footer from "../components/layout/Footer.tsx";
import { calculateGWA } from "../utils/calculateGwa.ts";
import type { Subject } from "../utils/calculateGwa.ts";

function Dashboard() {
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

  return (
    <div className="bg-[#FAF7FF] h-screen">
      <Navbar />
      <p className="font-[Amaranth] text-center my-10 italic text-xl">Know where your GWA is headed.</p>

      <div className="bg-white flex-col flex justify-center items-center w-fit mx-auto shadow-sm rounded overflow-hidden">
        <p className="bg-[#C4B5FD] text-sm w-full text-white font-semibold px-3 py-1">Calculate your grades</p>

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

        <div className="my-2 flex flex-row gap-3">
          <Button onClick={addSubject}>
            <p className="px-3 py-1 rounded text-xs text-[#6D28D9] border border-[#6D28D9] hover:bg-[#6D28D9] hover:text-white transition duration-200">
              + Add Subject
            </p>
          </Button>
          <Button onClick={calculateGrades}>
            <p className="px-3 py-1 rounded text-xs text-white border bg-[#6D28D9] hover:bg-white hover:text-[#6D28D9] transition duration-200">
              Calculate GWA
            </p>
          </Button>
        </div>

        {gwa === null ? "" : <p>GWA: {gwa}</p>}

      </div>

      <Footer />
    </div>
  );
}

export default Dashboard;