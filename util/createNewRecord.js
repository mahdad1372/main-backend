const AppError = require("../appError/appError");

const createNewRecord = async (model, obj) => {
  try {
    const instanceOfModel = await model.create(obj);

    return instanceOfModel;
  } catch (err) {
    console.log(err);
    throw new AppError("BAD REQUEST", 400);
  }
};

module.exports = createNewRecord;
