export interface Subject {
  id: string;
  grade: string;
  units: string;
}

export function calculateGWA(subjects: Subject[]): string {
  let totalGradeUnits = 0;
  let totalUnits = 0;

  for (const subject of subjects) {
    const grade = parseFloat(subject.grade);
    const units = parseFloat(subject.units);

    if (!isNaN(grade) && !isNaN(units)) {
      totalGradeUnits += grade * units;
      totalUnits += units;
    }
  }

  return totalUnits > 0 ? (totalGradeUnits / totalUnits).toFixed(2) : "—";
}