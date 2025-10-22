const admin = getCurrentUser();
if (!admin || admin.role !== "admin") window.location.href = "login.html";

document.getElementById("logoutBtn").addEventListener("click", logout);

const userTab = document.getElementById("userTab");
const productTab = document.getElementById("productTab");
const userSection = document.getElementById("userSection");
const productSection = document.getElementById("productSection");

userTab.addEventListener("click", () => {
  userSection.classList.remove("hidden");
  productSection.classList.add("hidden");
});

productTab.addEventListener("click", () => {
  productSection.classList.remove("hidden");
  userSection.classList.add("hidden");
});

renderUsers();
renderProductsAdmin();
