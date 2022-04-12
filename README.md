# Products API Medium

## Data:
Ejemplo de un objeto JSON de datos de producto:
```json
{
   "id":1,
   "name": "Premium Roast Coffee",
   "price": 1.19,
   "mrp": 1.19,
   "stock": 1,
   "isPublished": false
}
```

## Proyecto especificaciones:
La implementación del modelo está proporcionado y es sólo de lectura.

La tarea es implementar un servicio REST que exponga el endpoint `/products`, que permita gestionar la colección de productos de la siguiente manera:

- **POST** request a `/products`
    - Crea un nuevo producto.
    - Se espera un producto JSON sin los campos `id`, `isPublished` en el body, puedes asumir que el objeto json es siempre válido.
    - El nuevo producto se creará siempre con `isPublished = false`.
    - Si el body contiene el campo `isPublished`, se omitirá su valor y se creará con el valor `false`.
    - Agrega el producto a la BD con `id` único y autoincremental. El primer producto creado tendrá el **id 1**, el segundo **id 2**, y así sucesivamente.
    - Una vez que el objeto sea creado, el status code de respuesta debe ser `201`
.
- **GET** request to `/products`
    - Devuelve la colección de todos los productos.
    - `Status code` `200`, y el body debe ser un arreglo de todos los productos ordenados por su `id ASC`.

- **PATCH** request to `/products/<id>:id`
    - Puede asumir que el body enviado siempre será `{ "isPublished" : true }`
    - Si el producto existe, debe validar si el producto puede ser publicado si cumple los siguientes criterios, en el orden que se mencionan a continuación:
        - **CRITERIO 1**: verificar si el campo `mrp`  es mayor o igual que el campo `price` del producto encontrado.
        - **CRITERIO 2**: verificar si el campo `stock` es mayor a 0. 
    - Si alguna de las criterios falla, el response code is `422` y el response body contendrá un arreglo con los siguientes mensajes: 
      - Si sólo el **CRITERIO 1** falla, el `response body` deberá ser un arreglo de un elemento conteniendo el mensage **MRP should be less than equal to the Price**
      - Si sólo el **CRITERIO 2** falla, el `response body` deberá ser un arreglo de un elemento conteniendo el mensage **Stock count is 0** 
      - Si ambos **CRITERIO 1** y **CRITERIO 2** fallan, el `response body` debe ser un arreglo con los siguientes mensajes **MRP should be less than equal to the Price** y **Stock count is 0**
    - Si se pasan las criterios pasan, el producto se actualizará con `isPublished = true` con el response code `204` sin ningún `response body`.
    - Puede asumir que el **id** pasado será siempre válido.

- **DELETE**, **PUT** request to `/products/<id>:id`
    - El status code es `405` porque la API no permite borrar o modificar productos para ningún `id`.

Debe completar el proyecto dado para que pase todos los casos de prueba al ejecutar las pruebas unitarias proporcionadas. El proyecto por defecto soporta el uso de la base de datos SQLite3.

## Environment 
- Node Version: ^12.18.2
- Default Port: 8000

**Read Only Files**
- `test/*`

**Commands**
- run: 
```bash
bash bin/env_setup && . $HOME/.nvm/nvm.sh && npm start
```
- install: 
```bash
bash bin/env_setup && . $HOME/.nvm/nvm.sh && npm install
```
- test: 
```bash
bash bin/env_setup && . $HOME/.nvm/nvm.sh && npm test
```
