export default function getListStudentIds(students) {
  if (!Array.isArray(students)) {
    return [];
  }

  const studentsID = students.map((item) => item.id);

  return studentsID;
}
