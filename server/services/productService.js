const db = require("../models");
const {
  createResponseSuccess,
  createResponseError,
  createResponseMessage,
} = require("../helpers/responseHelper");
const validate = require("validate.js");

const constraints = {
  name: {
    length: {
      minimum: 2,
      maximum: 100,
      tooShort: "^Produktnamnet måste vara minst %{count} tecken lång.",
      tooLong: "^Produktnamnet får inte vara längre än %{count} tecken lång.",
    },
  },
};

async function getAll() {
  try {
    const allProducts = await db.Product.findAll();
    return createResponseSuccess(allProducts.map(_formatProduct));
  } catch (error) {
    console.error("Error fetching products:", error);
    return createResponseError(500, "Kunde inte hämta produkter.");
  }
}

async function getById(id) {
  try {
    const product = await db.Product.findByPk(id, { include: [db.Review] });
    if (!product) return createResponseError(404, "Produkten hittades inte.");
    return createResponseSuccess(_formatProduct(product));
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return createResponseError(500, "Fel vid hämtning av produkt.");
  }
}

module.exports = { getAll, getById };
