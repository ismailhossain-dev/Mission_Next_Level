//====generic means dynamic type define

//===generic use with interface
//=== when I define object. I will use an interface type

//I will define Smartwatch values dynamically . and Receive in T
interface Developer<T> {
  name: string;
  salary: number;
  device: {
    brand: string;
    model: string;
    releasedYear: string;
  };

  smartWatch: T;
}

//custom type
interface BrandCharaWatch {
  heartRate: string;
  stopwatch: boolean;
}
const poorDeveloper: Developer<BrandCharaWatch> = {
  name: "Mr. Poor",
  salary: 20,
  device: {
    brand: "lenovo",
    model: "A21",
    releasedYear: "2010",
  },

  smartWatch: {
    heartRate: "200",
    stopwatch: true,
  },
};

//For Example Rich Developer object

const RichDeveloper: Developer<{
  heartRate: string;
  callSupport: boolean;
  permissionAllow: boolean;
}> = {
  name: "Mr. Rich",
  salary: 20000,
  device: {
    brand: "mic bok",
    model: "A15",
    releasedYear: "2014",
  },
  smartWatch: {
    heartRate: "300",
    callSupport: false,
    permissionAllow: true,
  },
};
//type define
