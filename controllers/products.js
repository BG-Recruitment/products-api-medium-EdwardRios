const { resolve, reject } = require('bluebird');
const Products = require('../models/products');
const { param } = require('../routes');

const createProductDB = (productData) => {
  return new Promise((resolve, reject) => {
    Products.create({
      name: productData.name,
      price: productData.price,
      mrp: productData.mrp,
      stock: productData.stock
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

exports.createProduct = (req, res) => {
  createProductDB(req.body)
    .then(responseCreateProduct => {
      res.status(201)
      res.send({})
    }).catch(error => {
      res.json(error)
    })
}


const getProductsDB = () => {
  return new Promise((resolve, reject) => {
    Products.findAll({
      order: [['id', 'ASC']],
      raw: true
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

exports.getProducts = async (req, res) => {
  const products = await getProductsDB();
  res.status(200);
  res.json(products)
}

exports.patchProduct = async (req, res) => {
  const productId = req.params.id
  const product = await findProduct(productId).catch(error => { console.error(error) })
  if (product) {
    const resultCriterios = analizarCriterios(product)
    if (resultCriterios.criterio) {
      await actualizarProducto(productId)
      res.status(204);
      res.send()
    } else {
      res.status(422);
      res.send(resultCriterios.responseBody)
    }
  } else {
    res.status(401);
    res.send('Producto no existe')
  }
}

const actualizarProducto = (productId) =>{
  return new Promise((resolve, reject) => {
    Products.update({
      isPublished : true
    },{
      where: {
        id: productId
      }
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}
const criterioUno = (product) => {
  return product.mrp >= product.price
}
const criterioDos = (product) => {
  return product.stock > 0
}
const analizarCriterios = (product) => {
  let criterio = true
  let responseBody = []
  if (!criterioUno(product) && criterioDos(product)) {
    responseBody.push('MRP should be less than equal to the Price')
    criterio = false
  }
  if (!criterioDos(product) && criterioUno(product)) {
    responseBody.push('Stock count is 0')
    criterio = false
  }
  if (!criterioDos(product) && !criterioUno(product)) {
    responseBody.push('MRP should be less than equal to the Price y Stock count is 0')
    criterio = false
  }
  return { criterio, responseBody }
}

const findProduct = (productId) => {
  return new Promise((resolve, reject) => {
    Products.findOne({
      where: {
        id: productId
      }
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

exports.deletePutProduct = (req, res) => {
  const params = req.params
  const parseId = parseInt(params.id)
  if (!isNaN(parseId)) {
    res.status(405)
    res.send({})
  } else {
    res.status(401)
    res.send('Parametro tiene que ser un numero')
  }
}

