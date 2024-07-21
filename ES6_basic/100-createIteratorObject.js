export default function createIteratorObject(report) {
  const allEmployees = [];

  for (const items of Object.values(report.allEmployees)) {
    for (const item of items) {
      allEmployees.push(item);
    }
  }

  return allEmployees;
}
