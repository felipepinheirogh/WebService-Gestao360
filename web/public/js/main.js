// web/public/js/main.js
console.log("JS carregado corretamente");

// // Lógica JavaScript principal do frontend 
// document.addEventListener("DOMContentLoaded", () => {
//   const form = document.getElementById("loginForm");
//   if (form) {
//     form.addEventListener("submit", async (e) => {
//       e.preventDefault();

//       const username = document.getElementById("username").value;
//       const password = document.getElementById("password").value;

//       try {
//         const res = await fetch("/api/auth/login", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ username, password }),
//         });

//         const data = await res.json();

//         if (res.ok) {
//           localStorage.setItem("token", data.token);
//           window.location.href = "../dashboard/index.html";
//         } else {
//           alert(data.error || "Erro no login");
//         }
//       } catch (err) {
//         alert("Falha ao conectar com o servidor");
//       }
//     });
//   }
// });
