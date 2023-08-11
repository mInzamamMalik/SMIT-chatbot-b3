document.querySelector("#addProductForm")
.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.querySelector('#name').value;
    const price = document.querySelector('#price').value;
    const description = document.querySelector('#description').value;

    try {
        const resp = await axios.post(`http://localhost:3000/product`, {
            name: name,
            price,
            description
        });
        console.log("resp: ", resp.data);
        getAllProducts();

    } catch (e) {
        console.error("Error getting products");
    }

})


const getAllProducts = async () => {
try {

    const resp = await axios.get("http://localhost:3000/products");
    console.log("resp: ", resp.data.data);

    let productsDiv = document.querySelector("#products")
    productsDiv.innerHTML = "";

    resp.data.data.map(eachProduct => {
        productsDiv.innerHTML += `<div id="box_${eachProduct._id}">
            
            <h2>Name: ${eachProduct.name}</h2>
            <p>Price: ${eachProduct.price}</p>
            <p>Description: ${eachProduct.description}</p>
            <button onclick="deleteProduct('${eachProduct._id}') " >Delete</button>
            <button onclick='editProduct(${JSON.stringify(eachProduct)})'>Edit</button>
            
            </div>`
    })
} catch (e) {
    console.error("Error getting products");
}
};
window.addEventListener("load", getAllProducts);


window.editProduct = async (product) => {

console.log("product: ", product);

let box = document.querySelector(`#box_${product._id}`);
box.innerHTML = '';

box.innerHTML = `<form onsubmit="updateProduct(event, '${product._id}')">
    name: <input required type="text" id="name_${product._id}" value='${product.name}'>
    <br>
    price: <input required type="number" id="price_${product._id}" value='${product.price}'>
    <br>
    description: <input required maxlength="200" type="text" id="description_${product._id}" value='${product.description}'>
    <br>
    <button type="submit">Update</button>
    </form>
    `
}
window.updateProduct = async (event, id) => {
event.preventDefault();
console.log("id: ", id);

const name = document.querySelector(`#name_${id}`).value;
const price = document.querySelector(`#price_${id}`).value;
const description = document.querySelector(`#description_${id}`).value;

try {
    const resp = await axios.put(`http://localhost:3000/product/${id}`, {
        name, price, description
    });
    console.log("resp: ", resp.data);
    getAllProducts();

} catch (e) {
    console.error("Error getting products");
}
}


window.deleteProduct = async (id) => {
try {
    console.log("id: ", id);
    const resp = await axios.delete(`http://localhost:3000/product/${id}`);
    console.log("resp: ", resp.data);
    getAllProducts();

} catch (e) {
    console.error("Error getting products");
}
}