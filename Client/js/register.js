document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const registerError = document.getElementById('register-error');

    // Kiểm tra định dạng email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/; // Chỉ cho phép email có đuôi @gmail.com
    if (!emailPattern.test(email)) {
        registerError.innerText = "Email phải có định dạng @gmail.com!";
        return;
    }

    // Kiểm tra mật khẩu
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/; // Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, chữ số và ký tự đặc biệt
    if (!passwordPattern.test(password)) {
        registerError.innerText = "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, chữ số và ký tự đặc biệt!";
        return;
    }

    // Lấy dữ liệu tài khoản từ localStorage
    const accounts = JSON.parse(localStorage.getItem('accounts')) || [];

    // Kiểm tra xem tài khoản đã tồn tại chưa
    const existingAccount = accounts.find(acc => acc.email === email);
    
    if (existingAccount) {
        // Tài khoản đã tồn tại
        registerError.innerText = "Tài khoản đã tồn tại!";
    } else {
        // Thêm tài khoản mới
        accounts.push({ email, password });
        localStorage.setItem('accounts', JSON.stringify(accounts)); // Lưu vào localStorage
        alert("Đăng ký thành công!"); // Thông báo đăng ký thành công
        window.location.href = "login.html"; // Chuyển đến trang đăng nhập
    }
});
