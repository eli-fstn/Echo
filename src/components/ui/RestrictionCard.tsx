interface RestrictionCardProps {
  maxGwaForCumLaude?: string;
  maxGwaForMagna?: string;
  maxGwaForSumma?: string;

  minGradeForCumLaude?: string;
  minGradeForMagna?: string;
  minGradeForSumma?: string;

  onMaxGwaForCumLaudeChange: (value: string) => void;
  onMaxGwaForMagnaChange: (value: string) => void;
  onMaxGwaForSummaChange: (value: string) => void;

  onMinGradeForCumLaudeChange: (value: string) => void;
  onMinGradeForMagnaChange: (value: string) => void;
  onMinGradeForSummaChange: (value: string) => void;

  noFailedGrades?: boolean;

  onNoFailedGradesChange: (value: boolean) => void;
}

function RestrictionCard(
  { maxGwaForCumLaude, maxGwaForMagna, maxGwaForSumma,
    minGradeForCumLaude, minGradeForMagna, minGradeForSumma,
    onMaxGwaForCumLaudeChange, onMaxGwaForMagnaChange, onMaxGwaForSummaChange,
    onMinGradeForCumLaudeChange, onMinGradeForMagnaChange, onMinGradeForSummaChange,
    noFailedGrades, onNoFailedGradesChange,
   }: RestrictionCardProps
) {

  const cumLaude = [
    {
      label: "Maximum GWA",
      value: maxGwaForCumLaude,
      onChange: onMaxGwaForCumLaudeChange,
      placeholder: "1.75",
    },
    {
      label: "Lowest Allowable Grade",
      value: minGradeForCumLaude,
      onChange: onMinGradeForCumLaudeChange, 
    }
  ];

  const magnaCumLaude = [
    {
      label: "Maximum GWA",
      value: maxGwaForMagna,
      onChange: onMaxGwaForMagnaChange,
      placeholder: "1.45",
    },
    {
      label: "Lowest Allowable Grade",
      value: minGradeForMagna,
      onChange: onMinGradeForMagnaChange, 
    }
  ];

  const summaCumLaude = [
    {
      label: "Maximum GWA",
      value: maxGwaForSumma,
      onChange: onMaxGwaForSummaChange,
      placeholder: "1.20",
    },
    {
      label: "Lowest Allowable Grade",
      value: minGradeForSumma,
      onChange: onMinGradeForSummaChange, 
    }
  ];

  return (
    <div className="p-4 sm:p-5">

      <p>Academic Policy</p>
      <p className="text-gray-500 text-xs">Configure the academic policy used to determine Latin Honor eligibility.</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5">
        {/* LEFT GRID */}
        <div className="px-5 pt-3 pb-4 sm:pb-0 border border-gray-200 rounded-md shadow hover:shadow-md hover:-translate-y-1 transition duration-200">
          <p className="font-mono text-sm font-bold sm:mb-3">Cum Laude</p>

          <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-0 my-2 sm:my-0">
            {cumLaude.map((field) => (
              <div key={field.label} className="flex flex-col sm:mb-3">
                <label className="text-xs font-mono text-gray-500 font-medium mb-1 min-h-8 sm:min-h-0 flex items-end sm:block">{field.label}</label>

                <input
                  type="number"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder={field.placeholder}
                  min={1}
                  max={5}
                  step={0.25}
                  className="text-xs w-full sm:w-20 border border-gray-300 px-2 py-1 rounded outline-none focus:border-[#232323]"
                />
              </div>
            ))}
          </div>
        </div>

        {/* MIDDLE GRID */}
        <div className="px-5 pt-3 pb-4 sm:pb-0 border border-gray-200 rounded-md shadow hover:shadow-md hover:-translate-y-1 transition duration-200">
          <p className="font-mono text-sm font-bold sm:mb-3">Magna Cum Laude</p>

          <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-0 my-2 sm:my-0">
            {magnaCumLaude.map((field) => (
              <div key={field.label} className="flex flex-col sm:mb-3">
                <label className="text-xs font-mono text-gray-500 font-medium mb-1 min-h-8 sm:min-h-0 flex items-end sm:block">{field.label}</label>

                <input
                  type="number"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder={field.placeholder}
                  min={1}
                  max={5}
                  step={0.25}
                  className="text-xs w-full sm:w-20 border border-gray-300 px-2 py-1 rounded outline-none focus:border-[#232323]"
                />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT GRID */}
        <div className="px-5 pt-3 pb-4 sm:pb-0 border border-gray-200 rounded-md shadow hover:shadow-md hover:-translate-y-1 transition duration-200">
          <p className="font-mono text-sm font-bold sm:mb-3">Summa Cum Laude</p>

          <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-0 my-2 sm:my-0">
            {summaCumLaude.map((field) => (
              <div key={field.label} className="flex flex-col sm:mb-3">
                <label className="text-xs font-mono text-gray-500 font-medium mb-1 min-h-8 sm:min-h-0 flex items-end sm:block">{field.label}</label>

                <input
                  type="number"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder={field.placeholder}
                  min={1}
                  max={5}
                  step={0.25}
                  className="text-xs w-full sm:w-20 border border-gray-300 px-2 py-1 rounded outline-none focus:border-[#232323]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* CHECKBOXES */}
        <div className="p-3 mt-5 border border-gray-200 rounded-md shadow hover:shadow-md hover:-translate-y-1 transition duration-200">
          <p className="font-mono text-sm font-bold">Additional Requirements</p>
          <div className="flex my-3">
            <input 
              type="checkbox"
              checked={noFailedGrades}
              onChange={(e) => onNoFailedGradesChange(e.target.checked)}
              className="text-xs border border-gray-300 px-2 py-1 rounded outline-none focus:border-[#232323] cursor-pointer accent-[#232323]"
            />
            <label className="text-xs font-mono text-gray-500 font-medium ml-1.5">No Failing Grades</label>
          </div>
        </div>
    </div>
  )
}

export default RestrictionCard;