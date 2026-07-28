import { Icon } from "@iconify/react";
import Button from "./Button";

interface GradesProps {
  subjectName?: string;
  grades: string;
  units: string;
  onGradeChange: (value: string) => void;
  onUnitsChange: (value: string) => void;
  onRemove?: () => void;
  canRemove?: boolean;
}

function SubjectCard({
  subjectName,
  grades,
  units,
  onGradeChange,
  onUnitsChange,
  onRemove,
  canRemove = true,
}: GradesProps) {
  return (
    <div className="bg-white border border-gray-300 rounded flex flex-row w-fit p-3 gap-3">
      <div className="flex flex-col">
        <label className="text-xs text-gray-500 font-medium mb-1">
          Subject <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          defaultValue={subjectName}
          placeholder="e.g. Understanding The Self"
          className="text-xs w-60 border border-gray-200 px-3 py-1 rounded outline-none focus:border-[#6D28D9]"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-xs text-gray-500 font-medium mb-1">
          Grades <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          value={grades}
          onChange={(e) => onGradeChange(e.target.value)}
          placeholder="1.25"
          min={1}
          max={5}
          step={0.25}
          className="text-xs border border-gray-200 px-3 py-1 rounded outline-none focus:border-[#6D28D9]"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-xs text-gray-500 font-medium mb-1">
          Units <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          value={units}
          onChange={(e) => onUnitsChange(e.target.value)}
          placeholder="3"
          min={1}
          max={9}
          step={1}
          className="text-xs border border-gray-200 px-3 py-1 rounded outline-none focus:border-[#6D28D9]"
        />
      </div>

      <Button
        onClick={canRemove ? onRemove ?? (() => {}) : () => {}}
        disabled={!canRemove}
      >
        <Icon
          icon="tabler:trash"
          className={
            canRemove
              ? "w-6 h-6 text-red-300 bg-red-100 p-1 rounded hover:text-red-400 hover:bg-red-200 transition duration-100"
              : "w-6 h-6 text-gray-300 bg-gray-100 p-1 rounded cursor-not-allowed"
          }
        />
      </Button>
    </div>
  );
}

export default SubjectCard;