export interface Subject {
  id: string;
  subjectName: string;
  grade: string;
  units: string;
}

interface Restrictions {
  maxGwaForCumLaude: string;
  maxGwaForMagna: string;
  maxGwaForSumma: string;

  minGradeForCumLaude: string;
  minGradeForMagna: string;
  minGradeForSumma: string;

  noFailedGrades: boolean
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

export function LatinHonor(gwa: number, subjects:Subject[], restrictions:Restrictions): string {

  const isFailed = (grade: string) => {
    const numeric = parseFloat(grade);
    return !isNaN(numeric) && numeric === 5.00;
  }

  for (const subject of subjects){
    if (restrictions.noFailedGrades && isFailed(subject.grade)) {
      return `Not eligible for Latin Honor because ${subject.subjectName} has a failing grade.`;
    }
  }

  const hasGradeAboveLimit = (subjects: Subject[], limit: string): boolean => {
    const limitValue = parseFloat(limit);
    if (isNaN(limitValue)) return false;

    return subjects.some((s) => {
      const grade = parseFloat(s.grade);
      return !isNaN(grade) && grade > limitValue;
    });
  };

  if (gwa >= 1.00 && gwa <= parseFloat(restrictions.maxGwaForSumma)) {
    if (hasGradeAboveLimit(subjects, restrictions.minGradeForSumma)) {
      return "Not eligible for Summa Cum Laude due to a subject grade exceeding the allowed limit.";
    }
    return "Eligible for Summa Cum Laude";
  }
  else if (gwa > parseFloat(restrictions.maxGwaForSumma) && gwa <= parseFloat(restrictions.maxGwaForMagna)) {
    if (hasGradeAboveLimit(subjects, restrictions.minGradeForMagna)) {
      return "Not eligible for Magna Cum Laude due to a subject grade exceeding the allowed limit.";
    }
    return "Eligible for Magna Cum Laude";
  }
  else if (gwa > parseFloat(restrictions.maxGwaForMagna) && gwa <= parseFloat(restrictions.maxGwaForCumLaude)) {
    if (hasGradeAboveLimit(subjects, restrictions.minGradeForCumLaude)) {
      return "Not eligible for Cum Laude due to a subject grade exceeding the allowed limit.";
    }
    return "Eligible for Cum Laude";
  }
  else {
    return "Not eligible for any Latin Honor.";
  }
}