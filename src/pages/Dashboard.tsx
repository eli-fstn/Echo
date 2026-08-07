import { useState, useRef } from "react";
import Navbar from "../components/layout/Navbar";
import SubjectCard from "../components/ui/SubjectCard";
import Button from "../components/ui/Button";
import Footer from "../components/layout/Footer.tsx";
import logo from "../assets/Echo-Logo.png";
import { calculateGWA, calculateWeightedGrade, TotalUnits, TotalWeighted, LatinHonor } from "../utils/calculateGwa.ts";
import type { Subject } from "../utils/calculateGwa.ts";
import TypingText from "../components/ui/TypingText.tsx";
import RestrictionCard from "../components/ui/RestrictionCard.tsx";

function Dashboard() {
  const [downloading, setDownloading] = useState<boolean>(false);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const scheduleRef = useRef<null>(null);
  const [gwa, setGwa] = useState<string | null>(null);
  const [reportSubjects, setReportSubjects] = useState<Subject[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: crypto.randomUUID(), subjectName: "", grade: "", units: "" },
  ]);
  const [restrictions, setRestrictions] = useState({
    maxGwaForCumLaude: "1.75",
    maxGwaForMagna: "1.45",
    maxGwaForSumma: "1.20",
    minGradeForCumLaude: "",
    minGradeForMagna: "",
    minGradeForSumma: "",
    noFailedGrades: false,
  });
  const [confirmedRestrictions, setConfirmedRestrictions] = useState(restrictions);
  const [, setRestrictionsConfirmed] = useState(false);
  const honorResult = LatinHonor(parseFloat(gwa ?? ""), reportSubjects, confirmedRestrictions);
  const isDisqualified = honorResult.startsWith("Not eligible");
  const isPassing = honorResult.startsWith("Passing");
  const isBelowPassing = honorResult.startsWith("Below passing");
  const isFailed = honorResult.startsWith("Failed");

  const addSubject = () => {
    setSubjects((prev) => [...prev, { id: crypto.randomUUID(), subjectName: "", grade: "", units: "" }]);
  };

  const removeSubject = (id: string) => {
    setSubjects((prev) => prev.filter((s) => s.id !== id));
  };

  const updateSubject = (id: string, field: "subjectName" | "grade" | "units", value: string) => {
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
    setReportSubjects(subjects);
  };

  const handleDownload = async () => {
    const { toPng } = await import("html-to-image");

    if (!scheduleRef.current) return;
    setDownloading(true);

    await document.fonts.ready;
    await new Promise((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(resolve))
    );

    try {
      const dataUrl = await toPng(scheduleRef.current);
      const link = document.createElement("a");
      link.download = "Echo - GWA Summarization Report.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Download failed:", err);
    } finally {
      setDownloading(false);
    }
  };

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

  const updateRestrictions = () => {
    setConfirmedRestrictions(restrictions);
    setRestrictionsConfirmed(true);
    setIsConfirmed(true);
  };

  return (
    <div className="bg-[#FBF8F3] min-h-screen flex flex-col" id="dashboard">
      <Navbar />

      <TypingText text="Know where your GWA is headed." speed={50} />

      {/* CARD */}
      <div className="bg-white flex-col flex justify-center items-center w-[calc(100%-2rem)] sm:w-fit mx-auto shadow-sm rounded overflow-hidden mb-10">
        <p className="bg-[#232323] font-semibold text-sm w-full text-white px-3 py-1">Calculate your grades</p>

        <div className="px-3 sm:px-5 mt-5 flex flex-col gap-3 w-full">
          {subjects.map((s, index) => (
            <SubjectCard
              key={s.id}
              subjectName={s.subjectName}
              grades={s.grade}
              units={s.units}
              onSubjectNameChange={(v: string) => updateSubject(s.id, "subjectName", v)}
              onGradeChange={(v: string) => updateSubject(s.id, "grade", v)}
              onUnitsChange={(v: string) => updateSubject(s.id, "units", v)}
              onRemove={() => removeSubject(s.id)}
              canRemove={index !== 0}
              showError={error !== null}
            />
          ))}
        </div>

        {error && <p className="text-xs text-red-500 text-center mt-2 px-3">{error}</p>}

        <div className="my-3 flex flex-row flex-wrap justify-center gap-3 px-3">
          <Button onClick={addSubject}>
            <span className="font-mono px-3 py-1 rounded text-xs text-[#232323] border border-[#232323] hover:bg-[#232323] hover:text-white transition duration-200">+ Add Subject</span>
          </Button>

          <Button onClick={calculateGrades}>
            <span className="font-mono px-3 py-1 rounded text-xs text-white border border-[#232323] bg-[#232323] hover:bg-white hover:text-[#232323] transition duration-200">Calculate GWA</span>
          </Button>
        </div>
      </div>

      {/* SUMMARY REPORT */}
      {gwa !== null && (
        <div className="mb-10 mx-auto w-[calc(100%-2rem)] max-w-198.5 overflow-x-auto">
          <div className="bg-white shadow w-198.5 rounded">
            <div ref={scheduleRef} className="bg-white py-3 px-5">

              <p className="font-bold text-[1.3rem] text-center mt-3">GWA Summary Report</p>

              <div className="mt-3 flex flex-col text-center">
                <p className="text-xs">Your GWA:</p>
                <p className={`font-mono text-[2rem] font-bold ${parseFloat(gwa) >= 4  ? "text-red-500" : parseFloat(gwa) >= 3 ? "text-amber-500" : parseFloat(gwa) > parseFloat(confirmedRestrictions.maxGwaForCumLaude) ? "text-green-500" : parseFloat(gwa) > parseFloat(confirmedRestrictions.maxGwaForMagna) ? "text-cyan-500" : parseFloat(gwa) > parseFloat(confirmedRestrictions.maxGwaForSumma) ? "text-blue-500" : parseFloat(gwa) >= 1 ? "text-purple-500" : ""}`}>{gwa}</p>
              </div>

              {gwa !== null && (
                <p className={`text-xs font-semibold font-mono w-fit mx-auto border px-4 py-1 rounded-2xl text-center mt-3 ${isDisqualified || isFailed || isBelowPassing ? "text-red-500 border-red-200 bg-red-50" : isPassing ? "text-amber-500 border-amber-200 bg-amber-50" : parseFloat(gwa) > parseFloat(confirmedRestrictions.maxGwaForCumLaude) ? "text-green-500 border-green-200 bg-green-50" : parseFloat(gwa) > parseFloat(confirmedRestrictions.maxGwaForMagna) ? "text-cyan-500 border-cyan-200 bg-cyan-50" : parseFloat(gwa) > parseFloat(confirmedRestrictions.maxGwaForSumma) ? "text-blue-500 border-blue-200 bg-blue-50" : parseFloat(gwa) >= 1 ? "text-purple-500 border-purple-200 bg-purple-50" : ""}`}>
                  {honorResult}
                </p>
              )}

              {/* TABLE */}
              <table className="border border-gray-200 w-full mt-5">
                <thead>
                  <tr className="grid grid-cols-[3fr_.5fr_.5fr_.7fr] text-xs font-bold gap-5 px-3 py-2 text-gray-500 bg-gray-100 tracking-wide uppercase">
                    <td className="">Subjects</td>
                    <td className="">Grades</td>
                    <td className="">Units</td>
                    <td className="">Weighted</td>
                  </tr>
                </thead>
                <tbody>
                  {reportSubjects.map((s) => (
                    <tr key={s.id} className="grid grid-cols-[3fr_.5fr_.5fr_.7fr] gap-5 py-2 mx-3 border-b border-b-gray-100">
                      <td className="text-xs font-mono truncate">{s.subjectName}</td>
                      <td className="text-xs font-mono">{s.grade}</td>
                      <td className="text-xs font-mono">{s.units}</td>
                      <td className="text-xs font-mono">{calculateWeightedGrade(s)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* DETAILS */}
              <div className="border-t border-t-gray-200 mt-5 pt-5 grid grid-cols-2 gap-3 items-start">

                {/* TOP LEFT — Summary */}
                <div className="border border-gray-100 rounded-lg p-4 bg-gray-50/50">
                  <p className="font-bold text-gray-700 uppercase tracking-wide text-[0.7rem] mb-3">Summary</p>
                  <div className="flex flex-col gap-1 font-mono text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 text-xs">Total Subjects</span>
                      <span>{reportSubjects.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 text-xs">Total Units</span>
                      <span>{TotalUnits(reportSubjects)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 text-xs">Total Weighted</span>
                      <span>{TotalWeighted(reportSubjects)}</span>
                    </div>
                  </div>
                </div>

                {/* TOP RIGHT — How this was calculated */}
                <div className="border border-gray-100 rounded-lg p-4 bg-gray-50/50">
                  <p className="font-bold text-gray-700 uppercase tracking-wide text-[0.7rem] mb-3">How this was calculated</p>
                  <div className="font-mono text-xs text-gray-600 flex flex-col gap-1">
                    <p>GWA = Σ(Grade × Units) ÷ Σ(Units)</p>
                    <p>= {TotalWeighted(reportSubjects)} ÷ {TotalUnits(reportSubjects)}</p>
                    <p className="font-bold text-gray-800">= {gwa}</p>
                  </div>
                </div>

                {/* BOTTOM LEFT — Lowest Allowable Grade (conditional) */}
                {[confirmedRestrictions.minGradeForSumma, confirmedRestrictions.minGradeForMagna, confirmedRestrictions.minGradeForCumLaude].some((v) => v.trim() !== "") && (
                  <div className="border border-gray-100 rounded-lg p-4 bg-gray-50/50">
                    <p className="font-bold text-gray-700 uppercase tracking-wide text-[0.7rem] mb-3">Lowest Allowable Grade</p>
                    <div className="flex flex-col gap-1 font-mono text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Summa Cum Laude</span>
                        <span>{confirmedRestrictions.minGradeForSumma}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Magna Cum Laude</span>
                        <span>{confirmedRestrictions.minGradeForMagna}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Cum Laude</span>
                        <span>{confirmedRestrictions.minGradeForCumLaude}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* BOTTOM RIGHT — Latin Honor Qualifications */}
                <div className="border border-gray-100 rounded-lg p-4 bg-gray-50/50">
                  <p className="font-bold text-gray-700 uppercase tracking-wide text-[0.7rem] mb-3">Latin Honor Qualifications</p>
                  <div className="flex flex-col gap-1 font-mono text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Summa Cum Laude</span>
                      <span>1.00 – {confirmedRestrictions.maxGwaForSumma}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Magna Cum Laude</span>
                      <span>{(parseFloat(confirmedRestrictions.maxGwaForSumma) + 0.01).toFixed(2)} – {confirmedRestrictions.maxGwaForMagna}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Cum Laude</span>
                      <span>{(parseFloat(confirmedRestrictions.maxGwaForMagna) + 0.01).toFixed(2)} – {confirmedRestrictions.maxGwaForCumLaude}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* LICENSE */}
              <div className="border-t border-t-gray-200 my-5 pt-5">
                <p className="text-xs text-center text-gray-500">Generated with</p>
                <div className="grid grid-cols-2 items-center gap-70">
                  <div className="flex flex-col items-start">
                    <div className="flex flex-row items-center">
                      <img src={logo} alt="Echo Logo" className="w-7 h-7 rounded mr-1" loading="lazy"/>
                      <p className="font-mono text-[#232323] mt-1 text-[1.2rem]">Echo</p>
                    </div>
                    <p className="text-xs font-[Amaranth] mt-1 italic">Know where your GWA is headed.</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-medium text-sm">{formattedDate}</p>
                    <p className="font-mono text-gray-500 text-xs">{time24}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {subjects.length > 0 && (
            <div className="text-center my-5">
              <Button onClick={() => handleDownload()} disabled={downloading}>
                <span className="border border-gray-200 text-sm font-mono bg-[#232323] text-white rounded-md shadow px-4 py-1 hover:scale-105 transition-all duration-100">{downloading ? "Downloading..." : "Download Report"}</span>
              </Button>
            </div>
          )}
          <p className="text-gray-400 text-xs sm:hidden py-3">Swipe sideways to see the full report.</p>
        </div>
      )}
      


      {/* RESTRICTION CARD */}
      <div className="bg-white flex-col flex justify-center items-center w-[calc(100%-2rem)] sm:w-fit mx-auto shadow-sm rounded overflow-hidden mb-10">
        <p className="bg-[#232323] font-semibold text-sm w-full text-white px-3 py-1">Restrictions (Optional)</p>

        <div className="w-full">
          <RestrictionCard
              maxGwaForCumLaude={restrictions.maxGwaForCumLaude}
              maxGwaForMagna={restrictions.maxGwaForMagna}
              maxGwaForSumma={restrictions.maxGwaForSumma}
              minGradeForCumLaude={restrictions.minGradeForCumLaude}
              minGradeForMagna={restrictions.minGradeForMagna}
              minGradeForSumma={restrictions.minGradeForSumma}
              noFailedGrades={restrictions.noFailedGrades}
              onMaxGwaForCumLaudeChange={(v) => setRestrictions((prev) => ({ ...prev, maxGwaForCumLaude: v }))}
              onMaxGwaForMagnaChange={(v) => setRestrictions((prev) => ({ ...prev, maxGwaForMagna: v }))}
              onMaxGwaForSummaChange={(v) => setRestrictions((prev) => ({ ...prev, maxGwaForSumma: v }))}
              onMinGradeForCumLaudeChange={(v) => setRestrictions((prev) => ({ ...prev, minGradeForCumLaude: v }))}
              onMinGradeForMagnaChange={(v) => setRestrictions((prev) => ({ ...prev, minGradeForMagna: v }))}
              onMinGradeForSummaChange={(v) => setRestrictions((prev) => ({ ...prev, minGradeForSumma: v }))}
              onNoFailedGradesChange={(v) => setRestrictions((prev) => ({ ...prev, noFailedGrades: v }))}
            />
        </div>

        <div className="my-3 flex flex-row gap-3">
          <Button onClick={updateRestrictions}>
            <span className="font-mono px-3 py-1 rounded text-xs text-white border border-[#232323] bg-[#232323] hover:bg-white hover:text-[#232323] transition duration-200">{isConfirmed ? "Confirmed" : "Confirm"}</span>
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Dashboard;