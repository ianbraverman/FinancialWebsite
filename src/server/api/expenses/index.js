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
    const searchedExpense = await prisma.expenses.findFirst({
      where: {
        id: +id,
      },
    });
    if (!searchedExpense) {
      return next({
        status: 401,
        message: "This expense does not exist. Please try again",
      });
    }

    if (searchedExpense.userId !== userId) {
      return next({
        status: 401,
        message:
          "You are not the user of this expense. You cannot delete this expense.",
      });
    }
    const deletedExpense = await prisma.expenses.delete({
      where: {
        id: +id,
      },
    });
    res.json(deletedExpense);
  } catch (e) {
    next(e);
  }
});
