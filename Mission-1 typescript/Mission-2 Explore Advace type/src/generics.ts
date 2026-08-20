//====generics mens dynamically generalize => mane holo amr type ta dynamic vabe create korbo
//=== we are receive dynamic in parameter js , but we I currently use parameter for dynamic type
//=====before understand . Lets First define array
//===A Array Can be written in two way

//==first way-1
// const friends: string[] = ["Mr. x", "Mr. y"];

//second way-2
const friends: Array<string> = ["Mr. x", "Mr. y"];
//====Generic type array . it is not only array, object type, This type use anywhere

//dynamic generic =>the value is parameter and receive value
type GenericArray<value> = Array<value>;

const helloFriend: GenericArray<string> = ["sabbir vai", "mitu"];
const rollNumber: GenericArray<number> = [4, 7, 11];

const isEligibleList: GenericArray<boolean> = [true, false];

//give me another dynamic generic example

type IsValue<X, Y> = [X, Y];
const myFri: IsValue<string, string> = ["miraj", "sahedul"];

//====Let's see How to use generic with array of object

const userList: GenericArray<{ name: string; age: number }> = [
  { name: "sabbir boss", age: 18 },
  { name: "abir ", age: 15 },
];
