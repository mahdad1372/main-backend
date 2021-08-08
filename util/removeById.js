const AppError = require("../appError/appError");

const checkExistenceAndRemove = async (model, id) => {
  try {
    const instanceOfModel = await model.destroy({
      where: { id },
    });

    if (!instanceOfModel) throw new AppError("NOT FOUND", 404);

    return instanceOfModel;
  } catch (err) {
    throw err;
  }
};

module.exports = checkExistenceAndRemove;
