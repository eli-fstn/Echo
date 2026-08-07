import Button from "./Button";
import { Icon } from "@iconify/react";

interface GradesProps {
  subjectName: string;
  grades: string;
  units: string;
  onSubjectNameChange: (value: string) => void;
  onGradeChange: (value: string) => void;
  onUnitsChange: (value: string) => void;
  onRemove?: () => void;
  canRemove?: boolean;
  showError?: boolean;
}

function SubjectCard({ subjectName, grades, units, onSubjectNameChange, onGradeChange, onUnitsChange, onRemove, canRemove, showError = false, }: GradesProps) {
  const gradeInvalid = showError && grades.trim() === "";
  const unitsInvalid = showError && units.trim() === "";

  return (
    <div className="bg-white border border-gray-300 rounded shadow flex flex-col sm:flex-row w-full sm:w-fit p-3 gap-3">
      <div className="flex flex-col flex-1 sm:flex-none">
        <label className="text-xs font-mono text-gray-500 font-medium mb-1">Subject (Optional)<span className="text-red-500">*</span></label>
        <input
          type="text"
          value={subjectName}
          onChange={(e) => onSubjectNameChange(e.target.value)}
          placeholder="e.g. Understanding The Self"
          className="text-xs w-full sm:w-60 border border-gray-300 px-2 py-1 rounded outline-none focus:border-[#232323]"
        />
      </div>

      <div className="flex flex-row gap-3">
        <div className="flex flex-col flex-1 sm:flex-none">
          <label className="text-xs font-mono text-gray-500 font-medium mb-1">Grades<span className="text-red-500">*</span></label>
          <input
            type="number"
            value={grades}
            onChange={(e) => onGradeChange(e.target.value)}
            placeholder="1.25"
            min={1}
            max={5}
            step={0.25}
            className={`text-xs w-full sm:w-auto border px-3 py-1 rounded outline-none focus:border-[#232323] ${
              gradeInvalid ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>

        <div className="flex flex-col flex-1 sm:flex-none">
          <label className="text-xs font-mono text-gray-500 font-medium mb-1">Units<span className="text-red-500">*</span></label>
          <input
            type="number"
            value={units}
            onChange={(e) => onUnitsChange(e.target.value)}
            placeholder="3"
            min={1}
            max={9}
            step={1}
            className={`text-xs w-full sm:w-auto border px-3 py-1 rounded outline-none focus:border-[#232323] ${
              unitsInvalid ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>

        <Button onClick={() => onRemove?.()} disabled={!canRemove}>
          <Icon
            icon="tabler:trash"
            className="w-6 h-6 text-red-300 bg-red-100 p-1 rounded hover:text-red-400 hover:bg-red-200 transition duration-100 mt-5"
          />
        </Button>
      </div>
    </div>
  );
}

export default SubjectCard;