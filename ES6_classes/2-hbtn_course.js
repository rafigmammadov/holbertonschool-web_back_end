export default class HolbertonCourse {
  constructor(name, length, students) {
    if (typeof name !== 'string') {
      throw new TypeError("Name must be a string");
    }
    this._name = name;

    if (typeof length !== 'number') {
      throw new TypeError("Length must be a number");
    }
    this._length = length;

    if (!(students instanceof Array)) {
      throw new TypeError("Students must be an array");
    }

    for (let i = 0; i < students.length; i += 1) {
      if (typeof students[i] !== 'string') {
        throw new TypeError("Students should be the array of strings")
      }
    }
    this._students = students;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    if (typeof value !== 'string') {
      throw new TypeError("Name must be a string");
    }
    this._name = value;
  }

  get length() {
    return this._length;
  }
  
  set length(value) {
    if (typeof value !== 'number') {
      throw new TypeError("Length must be a number");
    }
    this._length = value;
  }
  
  set students(students) {
    if (!(students instanceof Array)) {
      throw new TypeError("Students must be an array of strings")
    }
    
    for (let i = 0; i < students.length; i += 1) {
      if (typeof students[i] !== 'string') {
        throw new TypeError("Students must be an array of strings")
      }
    }

    this._students = students;
  }
}
