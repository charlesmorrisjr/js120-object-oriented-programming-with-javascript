/* eslint-disable consistent-return */
/* eslint-disable no-case-declarations */
/* eslint-disable max-lines-per-function */
function createStudent(name, year) {
  return {
    name,
    year,
    courses: [],

    info: function() {
      console.log(`${name} is a ${year} year student`);
    },

    addCourse: function(course) {
      this.courses.push(course);
    },

    listCourses: function() {
      console.log(this.courses);
    },

    addNote: function(code, note) {
      for (let course of this.courses) {
        if (course.code === code) {
          if (course.hasOwnProperty('notes')) {
            course['notes'] += '; ' + note;
          } else {
            course['notes'] = note;
          }
        }
      }
    },

    updateNote: function(code, note) {
      for (let course of this.courses) {
        if (course.code === code) {
          course['notes'] = note;
        }
      }
    },

    viewNotes: function() {
      for (let course of this.courses) {
        if (course.hasOwnProperty('notes')) {
          console.log(`${course.name}: ${course.notes}`);
        }
      }
    },
  };
}

function createSchool() {
  return {
    students: [],

    addStudent: function(name, year) {
      switch (year) {
        case '1st':
        case '2nd':
        case '3rd':
        case '4th':
        case '5th':
          let student = createStudent(name, year);
          this.students.push(student);
          return student;
        default:
          console.log('Invalid Year.');
      }
    },

    enrollStudent: function(student, courseName, courseCode) {
      student.addCourse({name: courseName, code: courseCode});
    },

    addGrade: function(student, courseName, grade) {
      for (let course of student.courses) {
        if (course.name === courseName) {
          course.grade = grade;
        }
      }
    },

    getReportCard: function(student) {
      for (let course of student.courses) {
        let grade = course.hasOwnProperty('grade') ? course.grade : 'In progress';
        console.log(`${course.name}: ${grade}`);
      }
      console.log('');
    },

    courseReport: function(courseName) {
      let courseAvg = 0;
      let counter = 0;

      console.log(`=${courseName} Grades=`);

      for (let student of this.students) {
        for (let course of student.courses) {
          if (course.hasOwnProperty('grade') && course.name === courseName) {
            console.log(`${student.name}: ${course.grade}`);

            counter += 1;
            courseAvg += course.grade;
          }
        }
      }

      if (counter === 0) return;

      console.log('---');
      console.log(`Course Average: ${Math.floor(courseAvg / counter)}`);
      console.log('');
    },
  };
}

// let foo = {
//   name: 'foo',
//   year: '3rd',
//   courses: [
//     { name: 'Math', code: 101, grade: 95, },
//     { name: 'Advanced Math', code: 102, grade: 90, },
//     { name: 'Physics', code: 202, }
//   ],
// };

// let bar = {
//   name: 'bar',
//   year: '1st',
//   courses: [
//     { name: 'Math', code: 101, grade: 91, },
//   ],
// };

// let qux = {
//   name: 'qux',
//   year: '2nd',
//   courses: [
//     { name: 'Math', code: 101, grade: 93, },
//     { name: 'Advanced Math', code: 102, grade: 90, },
//   ],
// };

let school = createSchool();

let foo = school.addStudent('foo', '3rd');
let bar = school.addStudent('bar', '1st');
let qux = school.addStudent('qux', '2nd');

school.enrollStudent(foo, 'Math', 101);
school.addGrade(foo, 'Math', 95);
school.enrollStudent(foo, 'Advanced Math', 102);
school.addGrade(foo, 'Advanced Math', 90);
school.enrollStudent(foo, 'Physics', 202);

school.enrollStudent(bar, 'Math', 101);
school.addGrade(bar, 'Math', 91);

school.enrollStudent(qux, 'Math', 101);
school.addGrade(qux, 'Math', 93);
school.enrollStudent(qux, 'Advanced Math', 102);
school.addGrade(qux, 'Advanced Math', 90);

school.getReportCard(foo);
// Math: 95
// Advanced Math: 90
// Physics: In progress

school.courseReport('Math');
// =Math Grades=
// foo: 95
// bar: 91
// qux: 93
// ---
// Course Average: 93

school.courseReport('Advanced Math');
// =Advanced Math Grades=
// foo: 90
// qux: 90
// ---
// Course Average: 90

school.courseReport('Physics');
// undefined
