interface GradeData {
  first_partial?: number | null;
  second_partial?: number | null;
  third_partial?: number | null;
}

export function calculateSuccessProbability(grades: GradeData): number {
  // Verificar si hay calificaciones disponibles
  const availableGrades = [
    grades.first_partial,
    grades.second_partial,
    grades.third_partial,
  ].filter((grade) => grade !== null && grade !== undefined);

  // Si no hay calificaciones, retornar 0
  if (availableGrades.length === 0) {
    return 0;
  }

  // Calcular el promedio de las calificaciones disponibles
  const average =
    availableGrades.reduce((sum, grade) => sum + (grade || 0), 0) /
    availableGrades.length;

  // Factores que influyen en la probabilidad
  const passingGrade = 70; // Calificación mínima aprobatoria
  const maxGrade = 100; // Calificación máxima posible

  // Calcular la probabilidad basada en el promedio actual
  let probability = (average - passingGrade) / (maxGrade - passingGrade);

  // Ajustar la probabilidad según el número de parciales completados
  const completionFactor = availableGrades.length / 3;
  probability = probability * completionFactor;

  // Asegurar que la probabilidad esté entre 0 y 1
  probability = Math.max(0, Math.min(1, probability));

  return probability;
}

// Función auxiliar para verificar si una calificación es válida
export function isValidGrade(grade: number | null | undefined): boolean {
  return (
    grade !== null &&
    grade !== undefined &&
    !isNaN(grade) &&
    grade >= 0 &&
    grade <= 100
  );
}
