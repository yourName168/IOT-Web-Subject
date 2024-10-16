document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const loginError = document.getElementById('login-error');

    // Kiểm tra định dạng email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/; // Chỉ cho phép email có đuôi @gmail.com
    if (!emailPattern.test(email)) {
        loginError.innerText = "Email phải có định dạng @gmail.com!";
        return;
    }

    // Kiểm tra mật khẩu
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/; // Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, chữ số và ký tự đặc biệt
    if (!passwordPattern.test(password)) {
        loginError.innerText = "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, chữ số và ký tự đặc biệt!";
        return;
    }

    // Lấy dữ liệu tài khoản từ localStorage
    const accounts = JSON.parse(localStorage.getItem('accounts')) || [];

    // Kiểm tra tài khoản
    const account = accounts.find(acc => acc.email === email && acc.password === password);
    
    if (account) {
        // Đăng nhập thành công, chuyển đến trang dashboard
        window.location.href = "dashboard.html"; // Chuyển đến trang dashboard
    } else {
        // Tài khoản không tồn tại
        loginError.innerText = "Tài khoản chưa tồn tại. Vui lòng đăng ký!";
    }
});

// quên mật khẩu
document.getElementById('forgot-password').addEventListener('click', function(event) {
    event.preventDefault(); // Ngăn liên kết chuyển trang

    // Hiển thị hộp thoại yêu cầu nhập email để khôi phục mật khẩu
    const userEmail = prompt("Vui lòng nhập địa chỉ email của bạn để khôi phục mật khẩu:");

    if (userEmail) {
        // Giả lập việc gửi email khôi phục mật khẩu
        console.log(`Đã gửi yêu cầu khôi phục mật khẩu tới email: ${userEmail}`);
        alert("Nếu địa chỉ email tồn tại, bạn sẽ nhận được hướng dẫn khôi phục mật khẩu.");
        
        // Thực tế: Gửi yêu cầu tới máy chủ để xử lý khôi phục mật khẩu
        // Ví dụ:
        // fetch('/reset-password', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ email: userEmail })
        // })
        // .then(response => response.json())
        // .then(data => {
        //     if (data.success) {
        //         alert("Vui lòng kiểm tra email của bạn để khôi phục mật khẩu.");
        //     } else {
        //         alert("Không tìm thấy địa chỉ email. Vui lòng thử lại.");
        //     }
        // })
        // .catch(error => console.error('Lỗi:', error));
    }
});
