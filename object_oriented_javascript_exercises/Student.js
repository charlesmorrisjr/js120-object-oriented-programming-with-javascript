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

let foo = createStudent('Foo', '1st');
foo.info();
// "Foo is a 1st year student"
foo.listCourses();
// [];
foo.addCourse({ name: 'Math', code: 101 });
foo.addCourse({ name: 'Advanced Math', code: 102 });
foo.listCourses();
// [{ name: 'Math', code: 101 }, { name: 'Advanced Math', code: 102 }]
foo.addNote(101, 'Fun course');
foo.addNote(101, 'Remember to study for algebra');
foo.viewNotes();
// "Math: Fun course; Remember to study for algebra"
foo.addNote(102, 'Difficult subject');
foo.viewNotes();
// "Math: Fun course; Remember to study for algebra"
// "Advanced Math: Difficult subject"
foo.updateNote(101, 'Fun course');
foo.viewNotes();
// "Math: Fun course"
// "Advanced Math: Difficult subject"