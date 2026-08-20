//constraint mane holo must value gola dithe hobe

//must be id and name value dithe hobe and name and id pore jodi ornno kichu dei tahole seta o receive korbe

//kono id and name chara hote pare na

const addStudentToCourse = <T extends { id: number; name: string }>(student: T) => {
  return student;
};

const student1 = {
  id: 123,
  name: "Mezba",
  hasPen: true,
};

const student2 = {
  id: 321,
  name: "Jhankar Mahbub",
  isMarried: true,
};

const result = addStudentToCourse(student1);
console.log(result);
