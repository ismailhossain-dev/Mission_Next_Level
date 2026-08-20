//Generic Function means dynamic function dynamic function use korle amra jei type mon chai sei type use korte parbo

//the function return value
const createArrayWithString = (value: string) => [value];

const createArrayWithNumber = (value: number) => {
  [value];
};

const createArrayWithUserObj = (value: { id: number; name: string }) => {
  return [value];
};

const arrString = createArrayWithString("Apple");

const arrNum = createArrayWithNumber(222);
const arrObj = createArrayWithUserObj({ id: 123, name: "Next Level" });

//==amra uporer kaj korbo ekta function er mardome=======

//T means type
//<T> eta mardome amra dynamic type ke receive kori parameter ta
const createArrayWithGeneric = <T>(value: T) => [value];

//ekane amra sob gola value dithe parbo
const arrnum = createArrayWithGeneric(1122);
const arrobj = createArrayWithGeneric({ id: 1111, name: "sabbir" });

// main work start => multiple dynamic generics

const createTupleWithGeneric = <X, Y>(param1: X, param2: Y) => [param1, param2];

const res1 = createTupleWithGeneric("Sabbir", false);

const res2 = createTupleWithGeneric(222, { name: "sabbir" });

//generic function use korle amader teke type bole deya lage na . amra lekle automatic type define hoye jai

const addStudentToCourse = <T>(studentInfo: T) => {
  return {
    course: "Next Lever",
    ...studentInfo,
  };
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
