let users = JSON.parse(localStorage.getItem("users")) || [];

function renderUsers() {
  const container = document.getElementById("userSection");
  container.innerHTML = `
    <h3>👥 Quản lý Người dùng</h3>
    <form id="userForm">
      <input id="userName" placeholder="Họ tên" required>
      <input id="userEmail" placeholder="Email" required>
      <select id="userRole">
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit">Thêm</button>
    </form>
    <table>
      <thead><tr><th>Tên</th><th>Email</th><th>Vai trò</th><th>Hành động</th></tr></thead>
      <tbody id="userTable"></tbody>
    </table>
  `;

  const form = container.querySelector("#userForm");
  const tbody = container.querySelector("#userTable");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newUser = {
      id: Date.now().toString(),
      name: form.userName.value,
      email: form.userEmail.value,
      role: form.userRole.value,
    };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    renderUsers();
  });

  tbody.innerHTML = users
    .map(
      (u) => `
    <tr>
      <td>${u.name}</td>
      <td>${u.email}</td>
      <td>${u.role}</td>
      <td><button onclick="deleteUser('${u.id}')">Xóa</button></td>
    </tr>
  `
    )
    .join("");
}

window.deleteUser = (id) => {
  users = users.filter((u) => u.id !== id);
  localStorage.setItem("users", JSON.stringify(users));
  renderUsers();
};
