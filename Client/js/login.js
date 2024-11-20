document
  .getElementById("login-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const loginError = document.getElementById("login-error");

    // Kiểm tra định dạng email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/; // Chỉ cho phép email có đuôi @gmail.com
    if (!emailPattern.test(email)) {
      loginError.innerText = "Email phải có định dạng @gmail.com!";
      return;
    }

    // Kiểm tra mật khẩu
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/; // Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, chữ số và ký tự đặc biệt
    if (!passwordPattern.test(password)) {
      loginError.innerText =
        "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, chữ số và ký tự đặc biệt!";
      return;
    }

    fetch("http://localhost:4000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          loginError.innerText = data.error;
        } else {
          window.location.href = "../../Client/dashboard.html";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      }
    )
  });
