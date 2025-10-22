const form = document.getElementById("loginForm");
const errorEl = document.getElementById("error");

const accounts = [
  { email: "admin@example.com", password: "123456", role: "admin" },
  { email: "user@example.com", password: "123456", role: "user" },
];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const user = accounts.find(
    (acc) => acc.email === email && acc.password === password
  );

  if (!user) {
    errorEl.textContent = "Email hoặc mật khẩu không đúng!";
    return;
  }

  localStorage.setItem("currentUser", JSON.stringify(user));

  if (user.role === "admin") window.location.href = "admin.html";
  else window.location.href = "home.html";
});
