const prisma = require("../../prisma");
const router = require("express").Router();
module.exports = router;

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!res.locals.user) {
      return next({
        status: 400,
        message: "You are not logged into the correct account",
      });
    }
    const userId = res.locals.user.id;
    const searchedIncome = await prisma.income.findFirst({
      where: {
        id: +id,
      },
    });
    if (!searchedIncome) {
      return next({
        status: 401,
        message: "This income does not exist. Please try again",
      });
    }

    if (searchedIncome.userId !== userId) {
      return next({
        status: 401,
        message:
          "You are not the user of this income. You cannot delete this income.",
      });
    }
    const deletedIncome = await prisma.income.delete({
      where: {
        id: +id,
      },
    });

    //this sets recommendationChangesMade to true, so that next time they go to the statistics page
    // they have made changes to their user profile so they are eligible to recieve a new
    // chatgpt recommendation
    await prisma.user.update({
      where: { id: userId },
      data: { recommendationChangesMade: true },
    });

    res.json(deletedIncome);
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, incomeType, amount, yearlyIncrease } = req.body;

    if (!res.locals.user) {
      return next({
        status: 400,
        message: "You are not logged into the correct account",
      });
    }
    const userId = res.locals.user.id;

    const newIncome = await prisma.income.create({
      data: {
        userId: userId,
        name: name,
        incomeType: incomeType,
        amount: +amount,
        yearlyIncrease: +yearlyIncrease,
      },
    });

    //this sets recommendationChangesMade to true, so that next time they go to the statistics page
    // they have made changes to their user profile so they are eligible to recieve a new
    // chatgpt recommendation
    await prisma.user.update({
      where: { id: userId },
      data: { recommendationChangesMade: true },
    });

    res.json(newIncome);
  } catch (err) {
    next(err);
  }
});
