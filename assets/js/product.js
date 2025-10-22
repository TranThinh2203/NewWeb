let products = JSON.parse(localStorage.getItem("products")) || [];

function renderProductsAdmin() {
  const container = document.getElementById("productSection");
  container.innerHTML = `
    <h3>📦 Quản lý Sản phẩm</h3>
    <form id="productForm">
      <input id="productName" placeholder="Tên" required>
      <input id="productPrice" placeholder="Giá" required type="number">
      <input id="productDesc" placeholder="Mô tả">
      <input id="productImg" placeholder="URL Ảnh">
      <button type="submit">Thêm</button>
    </form>
    <table>
      <thead><tr><th>Tên</th><th>Giá</th><th>Mô tả</th><th>Ảnh</th><th>Hành động</th></tr></thead>
      <tbody id="productTable"></tbody>
    </table>
  `;

  const form = container.querySelector("#productForm");
  const tbody = container.querySelector("#productTable");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newProduct = {
      id: Date.now().toString(),
      name: form.productName.value,
      price: parseFloat(form.productPrice.value) || 0,
      description: form.productDesc.value,
      image: form.productImg.value,
    };
    products.push(newProduct);
    localStorage.setItem("products", JSON.stringify(products));
    renderProductsAdmin();
  });

  tbody.innerHTML = products
    .map(
      (p) => `
    <tr>
      <td>${p.name}</td>
      <td>${p.price.toLocaleString('vi-VN')}</td>
      <td>${p.description}</td>
      <td><img src="${
        p.image || "https://placehold.co/50x50"
      }" width="50"></td>
      <td><button onclick="deleteProduct('${p.id}')">Xóa</button></td>
    </tr>
  `
    )
    .join("");
}

window.deleteProduct = (id) => {
  products = products.filter((p) => p.id !== id);
  localStorage.setItem("products", JSON.stringify(products));
  renderProductsAdmin();
};
