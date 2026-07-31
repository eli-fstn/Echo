export interface Subject {
  id: string;
  subjectName: string;
  grade: string;
  units: string;
}

export function calculateWeightedGrade(subject: Subject): string {
  const grade = parseFloat(subject.grade);
  const units = parseFloat(subject.units);

  if (isNaN(grade) || isNaN(units)) {
    return "—";
  }

  return (grade * units).toFixed(2);
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

export function TotalUnits(subjects: Subject[]): number {
  return subjects.reduce((sum, s) => {
    const units = parseFloat(s.units);
    return isNaN(units) ? sum : sum + units;
  }, 0);
}

export function TotalWeighted(subjects: Subject[]): number {
  return subjects.reduce((sum, s) => {
    const grade = parseFloat(s.grade);
    const units = parseFloat(s.units);
    return isNaN(grade) || isNaN(units) ? sum : sum + grade * units;
  }, 0);
}

export function LatinHonor(gwa: number) {
  if (gwa >= 1.00 && gwa <= 1.20) {
    return "Summa Cum Laude";
  } else if (gwa >= 1.21 && gwa <= 1.45) {
    return "Magna Cum Laude";
  } else if (gwa >= 1.46 && gwa <= 1.75) {
    return "Cum Laude";
  }
}