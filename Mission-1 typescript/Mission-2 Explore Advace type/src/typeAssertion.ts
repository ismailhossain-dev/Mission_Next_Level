/**
 * type Assertion => mane holo typescript teke besi buja. mane holo amra typescript er age bole divo type ta ki hobe
 * Roles=> Amra jdoi sure na hoy tahole amra typeAssertion use korbo na
 */

//========for example========

//any mans =>undefined
let anything: any;
//anything jei number eta typescript jane na
anything = "Sabbir";

//sure hoye bole dilam anything ta string hobe
//anything as string;

//function er mardome example divo ei function er kaj holo kg teke gram covert korbe

//1kg = 1000 gram

const kgToGMConverter = (input: string | number): string | number | undefined => {
  if (typeof input === "number") {
    return input * 1000;
  } else if (typeof input === "string") {
    //[] mordome Destructuring korchi and split er mardome space cut korchi and array te convert korchi
    const [value] = input.split(" ");
    return `Converted output is: ${Number(value) * 1000}`;
  }
};

//kgToGmConverter ta ekbar number return korbe
//KgToGmConverter ta ekbar string return korbe
const result = kgToGMConverter("2 kg") as string; //over confident hoye bole dilam eta string hobe karone amra jani function string return korbe
const result2 = kgToGMConverter(2) as number; // eta o sem
console.log(result);

//amra try , catch use korle ekta error moder ekta message pai seta ts use korbo

type CustomError = {
  message: string;
};
try {
} catch (error) {
  //console.log(error.message);❌❌
  console.log((error as CustomError).message); //amra use ekane je message takbe overconfident
}

//practice
//over confident hoye type set kore divo

//gram to convert kg
const gramToCovertKg = (gram: number): number => {
  return gram / 1000;
};

const output = gramToCovertKg(2000);
console.log(output);
