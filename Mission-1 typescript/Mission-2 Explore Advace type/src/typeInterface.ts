//--Type Interface as like typeAssertion
//---Ihe interface only work with object
//----I will use Interface when small object type
//-----I will use normal type when big to type

//-Interface work=> object type: array, object, function

//Before learning interfaces, let’s first take a look at type aliases.

//----before learning interface, Let's first take a look at type alias

//
//custom type alias
type User = {
  name: string;
  age: number;
};

//I will User type convert to Interface

//when i will write interface . I don't use = , Ony use {}

interface IUser {
  name: string;
  age: number;
}
//
//custom type alias
type Role = {
  role: "admin" | "user";
};

//Together type User and Role type
type UserWithRole = User & Role;

const user1: UserWithRole = {
  name: "sabbir",
  age: 17,
  role: "admin",
};

const user2: IUserWithRole = {
  name: "abir",
  age: 15,
  role: "user",
};

//======type UserWithRole = User & Role; ei kaj ta amra interface e korbo=======

//Add IUser One role here
interface IUserWithRole extends IUser {
  role: "admin" | "user";
}

//interface use function type
//normal type function
type Add = (num1: number, num2: number) => number;

//interface function type
const add: Add = (num1, num2) => num1 + num2;

//Array define
type Friends = string[];
const friends: Friends = ["sabbir", "abir", "mitu"];

//array define interface
//if use array interface then We will counted index array like 0, 1, 2

interface IFriends {
  //the number is index
  [index: number]: string;
}

const arr: IFriends = ["A", "B", "C"];
//=============[index:1], "index:2", "index3"
