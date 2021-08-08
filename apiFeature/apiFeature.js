const APIFeatures = (query) => {
  const where = { ...query };

  const excludeFields = ["offset", "order", "limit", "attributes", "group"];

  excludeFields.forEach((itm) => delete where[itm]);

  let exclude = [];

  if (query.attributes && typeof query.attributes == "string") {
    exclude = query.attributes.split(",");
  }

  let order = [];

  if (query.order && typeof query.order == "string") {
    let sort = [];

    if (query.order.includes(";")) {
      sort = query.order.split(";");
      sort = sort.map((itm) => {
        return itm.split(",");
      });

      order = sort;
    } else {
      sort = query.order.split(",");
      order.push(sort);
    }
  }

  let limit;
  let offset;

  if (query.offset && query.limit) {
    offset = +query.offset || 0;
    limit = +query.limit || 5;
  }

  return { where, exclude, order, limit, offset };
};

module.exports = APIFeatures;
