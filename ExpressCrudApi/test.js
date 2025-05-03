fetch('http://localhost:5000/api/v1/products', {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: "Smart Watch",
        price: 199.99,
        description: "A feature-rich smartwatch with health tracking",
        category: "Electronics"
    })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));

fetch('http://localhost:5000/api/v1/products')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));

const productId = '60d21b4667d0d8992e610c85';
fetch(`http://localhost:5000/api/v1/products/${productId}`)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));

fetch(`http://localhost:5000/api/v1/products/${productId}`, {
    method: "PUT",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: "Premium Smart Watch",
        price: 249.99,
        description: "Updated premium smartwatch with advanced features",
        category: "Electronics",
        inStock: true
    })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));

fetch(`http://localhost:5000/api/v1/products/${productId}`, {
    method: "DELETE"
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));