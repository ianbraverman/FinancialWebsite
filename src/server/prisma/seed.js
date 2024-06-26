const prisma = require("../prisma");

let usersFirst = ["Ian", "Bob", "Joe", "Sarah", "Jeremy"];
let usersLast = ["Braverman", "Shoeman", "Billman", "Frogman", "Sadman"];
let usersMarried = [true, false, true, false, true];
const seed = async () => {
  for (let i = 0; i < usersFirst.length; i++) {
    await prisma.user.upsert({
      where: { username: usersFirst[i] },
      update: {},
      create: {
        username: usersFirst[i],
        password: usersLast[i],
        firstname: usersFirst[i],
        lastname: usersLast[i],
        age: Math.floor(Math.random() * 10) + 20,
        retired: false,
        lifeexpect: Math.floor(Math.random() * 10) + 90,
        inflation: Math.floor(Math.random() * 5) + 1,
        Income: {
          create: [
            {
              name: "Job",
              incomeType: "SALARY",
              amount: Math.floor(Math.random() * 150000) + 50000,
              yearlyIncrease: Math.floor(Math.random() * 5000),
            },
            {
              name: "Other Job",
              incomeType: "SIDE_HUSTLE",
              amount: Math.floor(Math.random() * 50000) + 20000,
              yearlyIncrease: Math.floor(Math.random() * 3000),
            },
            {
              name: "Yearly bonus",
              incomeType: "BONUS",
              amount: Math.floor(Math.random() * 50000),
              yearlyIncrease: Math.floor(Math.random() * 1000),
            },
          ],
        },
        Assets: {
          create: [
            {
              name: "House",
              assetType: "HOUSE",
              balance: Math.floor(Math.random() * 500000) + 100000,
              interest: Math.floor(Math.random() * 5),
              contributions: 0,
              physMon: "PHYSICAL",
            },
            {
              name: "Savings",
              assetType: "SAVINGS",
              balance: Math.floor(Math.random() * 500000) + 100000,
              interest: Math.floor(Math.random() * 3),
              contributions: Math.floor(Math.random() * 5000) + 1000,
              physMon: "MONETARY",
            },
            {
              name: "401k",
              assetType: "FOUR01K",
              balance: Math.floor(Math.random() * 500000) + 100000,
              interest: Math.floor(Math.random() * 7),
              contributions: Math.floor(Math.random() * 15000) + 6000,
              physMon: "MONETARY",
            },
            {
              name: "IRA",
              assetType: "IRA",
              balance: Math.floor(Math.random() * 500000) + 1,
              interest: Math.floor(Math.random() * 7),
              contributions: Math.floor(Math.random() * 7000),
              physMon: "MONETARY",
            },
          ],
        },
        Liabilities: {
          create: [
            {
              name: "Mortgage",
              interest: 0,
              liabilityType: "MORTGAGE",
              monthlyPayment: Math.floor(Math.random() * 5000) + 1000,
              amount: Math.floor(Math.random() * 500000) + 100000,
            },
            {
              name: "Credit Card",
              interest: Math.floor(Math.random() * 15) + 1,
              liabilityType: "CREDIT_CARD",
              monthlyPayment: Math.floor(Math.random() * 1000) + 100,
              amount: Math.floor(Math.random() * 100000) + 10000,
            },
            {
              name: "Student Loan",
              interest: Math.floor(Math.random() * 15) + 1,
              liabilityType: "STUDENT_LOAN",
              monthlyPayment: Math.floor(Math.random() * 1000) + 100,
              amount: Math.floor(Math.random() * 200000) + 10000,
            },
            {
              name: "Other",
              interest: Math.floor(Math.random() * 5) + 1,
              liabilityType: "OTHER",
              monthlyPayment: Math.floor(Math.random() * 1000) + 100,
              amount: Math.floor(Math.random() * 200000) + 10000,
            },
          ],
        },
        Goals: {
          create: [
            {
              name: "Retirement",
              goalType: "RETIREMENT",
              targetAge: Math.floor(Math.random() * 9) + 60,
              targetAmount: Math.floor(Math.random() * 700000) + 300000,
              goalPriority: "NECESSARY",
              savingsTowardAmount: Math.floor(Math.random() * 20000) + 10000,
              alreadySaved: Math.floor(Math.random() * 20000) + 10000,
              annualGrowthRate: Math.floor(Math.random() * 8) + 1,
              goalDuration: Math.floor(Math.random() * 10) + 20,
              continueToSave: false,
            },
            {
              name: "Home Purchase",
              goalType: "HOME_PURCHASE",
              targetAge: Math.floor(Math.random() * 5) + 31,
              targetAmount: Math.floor(Math.random() * 200000) + 100000,
              goalPriority: "IMPORTANT",
              savingsTowardAmount: Math.floor(Math.random() * 30000) + 5000,
              alreadySaved: Math.floor(Math.random() * 20000) + 10000,
              annualGrowthRate: Math.floor(Math.random() * 8) + 1,
              goalDuration: 1,
              continueToSave: false,
            },
            {
              name: "Travel",
              goalType: "TRAVEL",
              targetAge: Math.floor(Math.random() * 20) + 31,
              targetAmount: Math.floor(Math.random() * 10000) + 5000,
              goalPriority: "ASPIRATIONAL",
              savingsTowardAmount: Math.floor(Math.random() * 1000) + 1000,
              alreadySaved: Math.floor(Math.random() * 20000) + 10000,
              annualGrowthRate: Math.floor(Math.random() * 8) + 1,
              goalDuration: 1,
              continueToSave: false,
            },
          ],
        },
        Expenses: {
          create: [
            {
              name: "Groceries",
              expenseType: "FOOD",
              monthlyCost: Math.floor(Math.random() * 1000) + 200,
            },
            {
              name: "Gasoline",
              expenseType: "TRANSPORTATION",
              monthlyCost: Math.floor(Math.random() * 500) + 200,
            },
            {
              name: "Groceries",
              expenseType: "HOUSING",
              monthlyCost: Math.floor(Math.random() * 5000) + 500,
            },
            {
              name: "Entertainment",
              expenseType: "ENTERTAINMENT",
              monthlyCost: Math.floor(Math.random() * 1000) + 200,
            },
          ],
        },
      },
    });
  }
};
seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
