function toggleMode(mode) {
    const manualControls = document.getElementById('manual-controls');
    const automaticControls = document.getElementById('automatic-controls');

    if (mode === 'manual') {
        manualControls.style.display = 'block';
        automaticControls.style.display = 'none';
    } else if (mode === 'automatic') {
        manualControls.style.display = 'none';
        automaticControls.style.display = 'block';
    }
}

function togglePump(isOn) {
    const pumpStatus = document.getElementById('pump-status');
    pumpStatus.innerText = isOn ? 'Đang bật' : 'Đang tắt';
    // Cập nhật trạng thái máy bơm
    console.log(isOn ? 'Bơm đã bật' : 'Bơm đã tắt');
}

function setAutoPump() {
    const waterAmount = document.getElementById('water-amount').value;
    const dateSet = document.getElementById('date-set').value;
    const timeSet = document.getElementById('time-set').value;
    const repeatSet = document.getElementById('repeat-set').value;

    if (!waterAmount || !dateSet || !timeSet) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
    }

    alert(`Cài đặt bơm tự động thành công! 
           Lượng nước: ${waterAmount}
           Ngày: ${dateSet}
           Giờ: ${timeSet}
           Lặp lại: ${repeatSet === "no" ? "Không" : repeatSet}`);
    // Thực hiện các hành động cần thiết để cài đặt bơm tự động (lưu trữ dữ liệu hoặc kết nối với server)
}

function logout() {
    alert("Đăng xuất thành công!");
    window.location.href = "index.html"; // Quay về trang chính
}

// Thêm xử lý cho quản lý thực vật
// document.getElementById('plant-form').addEventListener('submit', function(event) {
//     event.preventDefault();
//     const plantType = document.getElementById('plant-type').value.toLowerCase();

//     // Tìm điều kiện lý tưởng cho loại thực vật
//     const idealConditions = {
//         "cà chua": { "temperature": "20-25°C", "soilMoisture": "40-60%", "humidity": "60-70%" },
//         "rau cải": { "temperature": "15-20°C", "soilMoisture": "30-50%", "humidity": "70-80%" },
//         "cà rốt": { "temperature": "16-21°C", "soilMoisture": "40-50%", "humidity": "65-75%" },
//         "bắp cải": { "temperature": "15-18°C", "soilMoisture": "30-45%", "humidity": "70-80%" },
//         "dưa chuột": { "temperature": "22-28°C", "soilMoisture": "50-60%", "humidity": "70-80%" },
//         "xà lách": { "temperature": "15-20°C", "soilMoisture": "35-55%", "humidity": "70-80%" },
//         "cải bó xôi": { "temperature": "15-20°C", "soilMoisture": "30-50%", "humidity": "65-75%" },
//         "bí đỏ": { "temperature": "18-25°C", "soilMoisture": "40-60%", "humidity": "60-70%" },
//         "cà tím": { "temperature": "22-28°C", "soilMoisture": "40-55%", "humidity": "65-75%" },
//         "khoai lang": { "temperature": "20-30°C", "soilMoisture": "40-60%", "humidity": "60-70%" },
//         "củ cải đỏ": { "temperature": "16-20°C", "soilMoisture": "35-50%", "humidity": "70-80%" },
//         "hành lá": { "temperature": "12-20°C", "soilMoisture": "30-45%", "humidity": "70-80%" },
//         "ớt": { "temperature": "22-30°C", "soilMoisture": "40-60%", "humidity": "60-70%" },
//         "rau dền": { "temperature": "18-30°C", "soilMoisture": "30-50%", "humidity": "60-70%" },
//         "rau muống": { "temperature": "25-30°C", "soilMoisture": "40-60%", "humidity": "75-85%" },
//         "cải thảo": { "temperature": "15-20°C", "soilMoisture": "35-50%", "humidity": "70-80%" },
//         "dưa lê": { "temperature": "22-28°C", "soilMoisture": "40-60%", "humidity": "65-75%" },
//         "cải thìa": { "temperature": "15-22°C", "soilMoisture": "35-50%", "humidity": "70-80%" },
//         "húng quế": { "temperature": "20-25°C", "soilMoisture": "40-60%", "humidity": "65-75%" },
//         "rau mùi": { "temperature": "15-20°C", "soilMoisture": "30-50%", "humidity": "65-75%" },
//         "hoa cúc": { "temperature": "18-24°C", "soilMoisture": "40-50%", "humidity": "60-70%" },
//         "cỏ mực": { "temperature": "18-30°C", "soilMoisture": "35-55%", "humidity": "65-75%" },
//         "cúc tần": { "temperature": "18-30°C", "soilMoisture": "30-50%", "humidity": "60-70%" },
//         "dâu tây": { "temperature": "15-25°C", "soilMoisture": "40-50%", "humidity": "65-75%" },
//         "mía": { "temperature": "25-30°C", "soilMoisture": "40-60%", "humidity": "70-80%" },
//         "cà phê": { "temperature": "18-25°C", "soilMoisture": "40-55%", "humidity": "60-70%" },
//         "lúa mì": { "temperature": "15-25°C", "soilMoisture": "30-50%", "humidity": "50-60%" },
//         "lúa": { "temperature": "20-30°C", "soilMoisture": "40-60%", "humidity": "70-80%" },
//         "ngô": { "temperature": "22-30°C", "soilMoisture": "40-60%", "humidity": "65-75%" },
//         "đậu tương": { "temperature": "18-28°C", "soilMoisture": "35-50%", "humidity": "60-70%" },
//         "vừng": { "temperature": "20-30°C", "soilMoisture": "30-45%", "humidity": "50-60%" },
//         "lạc": { "temperature": "22-30°C", "soilMoisture": "35-50%", "humidity": "60-70%" },
//         "bạc hà": { "temperature": "15-20°C", "soilMoisture": "35-55%", "humidity": "70-80%" },
//         "tỏi": { "temperature": "12-20°C", "soilMoisture": "30-45%", "humidity": "60-70%" },
//         "hành tây": { "temperature": "15-25°C", "soilMoisture": "30-50%", "humidity": "60-70%" },
//         "hành tím": { "temperature": "16-24°C", "soilMoisture": "30-50%", "humidity": "60-70%" },
//         "mướp đắng": { "temperature": "22-28°C", "soilMoisture": "40-60%", "humidity": "70-80%" },
//         "khoai tây": { "temperature": "15-20°C", "soilMoisture": "40-60%", "humidity": "60-70%" },
//         "gừng": { "temperature": "20-30°C", "soilMoisture": "40-60%", "humidity": "70-80%" },
//         "nghệ": { "temperature": "20-30°C", "soilMoisture": "40-60%", "humidity": "70-80%" },
//         "mít": { "temperature": "22-30°C", "soilMoisture": "40-60%", "humidity": "60-70%" },
//         "bưởi": { "temperature": "22-30°C", "soilMoisture": "40-60%", "humidity": "60-70%" },
//         "chanh leo": { "temperature": "20-28°C", "soilMoisture": "40-55%", "humidity": "60-70%" },
//         "nhãn": { "temperature": "22-30°C", "soilMoisture": "40-60%", "humidity": "60-70%" },
//         "vải": { "temperature": "22-30°C", "soilMoisture": "40-60%", "humidity": "60-70%" },
//         "mận": { "temperature": "15-25°C", "soilMoisture": "35-50%", "humidity": "60-70%" },
//         "măng cụt": { "temperature": "20-30°C", "soilMoisture": "40-60%", "humidity": "65-75%" },
//         "sầu riêng": { "temperature": "22-30°C", "soilMoisture": "40-60%", "humidity": "65-75%" },
//         "táo": { "temperature": "15-25°C", "soilMoisture": "35-50%", "humidity": "65-75%" },
//         "lê": { "temperature": "12-22°C", "soilMoisture": "30-50%", "humidity": "60-70%" }
//     };

//     // ẩn ô điều kiện lí tưởng khi chưa có loại thực vẩt
//     if (idealConditions[plantType]) {
//         document.getElementById('ideal-temperature').innerText = idealConditions[plantType].temperature;
//         document.getElementById('ideal-soil-moisture').innerText = idealConditions[plantType].soilMoisture;
//         document.getElementById('ideal-humidity').innerText = idealConditions[plantType].humidity;

//         // Hiện phần "Điều Kiện Lý Tưởng"
//         document.getElementById('ideal-conditions').style.display = 'block';
//     } else {
//         // Nếu không có điều kiện lý tưởng, ẩn phần "Điều Kiện Lý Tưởng"
//         document.getElementById('ideal-conditions').style.display = 'none';
//         alert("Không tìm thấy điều kiện cho loại thực vật này!");
//     }
//     // end ẩn ô điều kiện lí tưởng khi chưa có loại thực vẩt

//     const conditions = idealConditions[plantType.toLowerCase()];
//     if (conditions) {
//         document.getElementById('ideal-temperature').innerText = conditions.temperature;
//         document.getElementById('ideal-soil-moisture').innerText = conditions.soilMoisture;
//         document.getElementById('ideal-humidity').innerText = conditions.humidity;
//     } else {
//         alert("Không tìm thấy điều kiện cho loại thực vật này!");
//     }
// });

document.addEventListener('DOMContentLoaded', function() {
    console.log("Tệp JavaScript đã được nạp thành công.");

    // Sử dụng sự kiện click trực tiếp vào nút "Tìm Kiếm"
    document.querySelector('#plant-form button[type="submit"]').addEventListener('click', function(event) {
        event.preventDefault(); // Ngăn form gửi đi
        const plantType = document.getElementById('plant-type').value.toLowerCase().trim();
        
        console.log("Nút 'Tìm Kiếm' đã được nhấn. Loại thực vật:", plantType);
        
        // Tập hợp các điều kiện lý tưởng cho từng loại thực vật
        const idealConditions = {
            "cà chua": { "temperature": "20-25°C", "soilMoisture": "40-60%", "humidity": "60-70%" },
            "rau cải": { "temperature": "15-20°C", "soilMoisture": "30-50%", "humidity": "70-80%" },
            "cà rốt": { "temperature": "16-21°C", "soilMoisture": "40-50%", "humidity": "65-75%" },
            "bắp cải": { "temperature": "15-18°C", "soilMoisture": "30-45%", "humidity": "70-80%" },
            "dưa chuột": { "temperature": "22-28°C", "soilMoisture": "50-60%", "humidity": "70-80%" },
            "xà lách": { "temperature": "15-20°C", "soilMoisture": "35-55%", "humidity": "70-80%" },
            "cải bó xôi": { "temperature": "15-20°C", "soilMoisture": "30-50%", "humidity": "65-75%" },
            "bí đỏ": { "temperature": "18-25°C", "soilMoisture": "40-60%", "humidity": "60-70%" },
            "cà tím": { "temperature": "22-28°C", "soilMoisture": "40-55%", "humidity": "65-75%" },
            "khoai lang": { "temperature": "20-30°C", "soilMoisture": "40-60%", "humidity": "60-70%" },
            "củ cải đỏ": { "temperature": "16-20°C", "soilMoisture": "35-50%", "humidity": "70-80%" },
            "hành lá": { "temperature": "12-20°C", "soilMoisture": "30-45%", "humidity": "70-80%" },
            "ớt": { "temperature": "22-30°C", "soilMoisture": "40-60%", "humidity": "60-70%" },
            "rau dền": { "temperature": "18-30°C", "soilMoisture": "30-50%", "humidity": "60-70%" },
            "rau muống": { "temperature": "25-30°C", "soilMoisture": "40-60%", "humidity": "75-85%" },
            "cải thảo": { "temperature": "15-20°C", "soilMoisture": "35-50%", "humidity": "70-80%" },
            "dưa lê": { "temperature": "22-28°C", "soilMoisture": "40-60%", "humidity": "65-75%" },
            "cải thìa": { "temperature": "15-22°C", "soilMoisture": "35-50%", "humidity": "70-80%" },
            "húng quế": { "temperature": "20-25°C", "soilMoisture": "40-60%", "humidity": "65-75%" },
            "rau mùi": { "temperature": "15-20°C", "soilMoisture": "30-50%", "humidity": "65-75%" },
            "hoa cúc": { "temperature": "18-24°C", "soilMoisture": "40-50%", "humidity": "60-70%" },
            "cỏ mực": { "temperature": "18-30°C", "soilMoisture": "35-55%", "humidity": "65-75%" },
            "cúc tần": { "temperature": "18-30°C", "soilMoisture": "30-50%", "humidity": "60-70%" },
            "dâu tây": { "temperature": "15-25°C", "soilMoisture": "40-50%", "humidity": "65-75%" },
            "mía": { "temperature": "25-30°C", "soilMoisture": "40-60%", "humidity": "70-80%" },
            "cà phê": { "temperature": "18-25°C", "soilMoisture": "40-55%", "humidity": "60-70%" },
            "lúa mì": { "temperature": "15-25°C", "soilMoisture": "30-50%", "humidity": "50-60%" },
            "lúa": { "temperature": "20-30°C", "soilMoisture": "40-60%", "humidity": "70-80%" },
            "ngô": { "temperature": "22-30°C", "soilMoisture": "40-60%", "humidity": "65-75%" },
            "đậu tương": { "temperature": "18-28°C", "soilMoisture": "35-50%", "humidity": "60-70%" },
            "vừng": { "temperature": "20-30°C", "soilMoisture": "30-45%", "humidity": "50-60%" },
            "lạc": { "temperature": "22-30°C", "soilMoisture": "35-50%", "humidity": "60-70%" },
            "bạc hà": { "temperature": "15-20°C", "soilMoisture": "35-55%", "humidity": "70-80%" },
            "tỏi": { "temperature": "12-20°C", "soilMoisture": "30-45%", "humidity": "60-70%" },
            "hành tây": { "temperature": "15-25°C", "soilMoisture": "30-50%", "humidity": "60-70%" },
            "hành tím": { "temperature": "16-24°C", "soilMoisture": "30-50%", "humidity": "60-70%" },
            "mướp đắng": { "temperature": "22-28°C", "soilMoisture": "40-60%", "humidity": "70-80%" },
            "khoai tây": { "temperature": "15-20°C", "soilMoisture": "40-60%", "humidity": "60-70%" },
            "gừng": { "temperature": "20-30°C", "soilMoisture": "40-60%", "humidity": "70-80%" },
            "nghệ": { "temperature": "20-30°C", "soilMoisture": "40-60%", "humidity": "70-80%" },
            "mít": { "temperature": "22-30°C", "soilMoisture": "40-60%", "humidity": "60-70%" },
            "bưởi": { "temperature": "22-30°C", "soilMoisture": "40-60%", "humidity": "60-70%" },
            "chanh leo": { "temperature": "20-28°C", "soilMoisture": "40-55%", "humidity": "60-70%" },
            "nhãn": { "temperature": "22-30°C", "soilMoisture": "40-60%", "humidity": "60-70%" },
            "vải": { "temperature": "22-30°C", "soilMoisture": "40-60%", "humidity": "60-70%" },
            "mận": { "temperature": "15-25°C", "soilMoisture": "35-50%", "humidity": "60-70%" },
            "măng cụt": { "temperature": "20-30°C", "soilMoisture": "40-60%", "humidity": "65-75%" },
            "sầu riêng": { "temperature": "22-30°C", "soilMoisture": "40-60%", "humidity": "65-75%" },
            "táo": { "temperature": "15-25°C", "soilMoisture": "35-50%", "humidity": "65-75%" },
            "lê": { "temperature": "12-22°C", "soilMoisture": "30-50%", "humidity": "60-70%" }
        };

        // Kiểm tra nếu có điều kiện lý tưởng cho loại thực vật đã nhập
        if (idealConditions.hasOwnProperty(plantType)) {
            console.log("Tìm thấy điều kiện lý tưởng cho:", plantType);

            // Cập nhật thông tin điều kiện lý tưởng
            document.getElementById('ideal-temperature').innerText = idealConditions[plantType].temperature;
            document.getElementById('ideal-soil-moisture').innerText = idealConditions[plantType].soilMoisture;
            document.getElementById('ideal-humidity').innerText = idealConditions[plantType].humidity;

            // Hiển thị phần "Điều Kiện Lý Tưởng"
            document.getElementById('ideal-conditions').style.display = 'block';
        } else {
            document.getElementById('ideal-conditions').style.display = 'none';
            console.log("Không tìm thấy điều kiện cho loại thực vật này");
            alert("Không tìm thấy điều kiện cho loại thực vật này!");
        }
    });
});
var ok = 1;
document.getElementById('apply-button').addEventListener('click', function() {
    const temperature = document.getElementById('custom-temperature').value.trim();
    const soilMoisture = document.getElementById('custom-soil-moisture').value.trim();
    const humidity = document.getElementById('custom-humidity').value.trim();

    // Kiểm tra nếu bất kỳ ô nào bị bỏ trống
    if (temperature === "" || soilMoisture === "" || humidity === "") {
        ok = 0;
        alert("Vui lòng nhập đầy đủ các giá trị: Nhiệt độ, Độ ẩm đất, và Độ ẩm không khí.");
    } else {
        // Thực hiện hành động "Áp Dụng" khi tất cả các trường đều được điền
        // applySettings(temperature, soilMoisture, humidity);
    }
});

function applySettings(temperature, soilMoisture, humidity) {
    // Xử lý áp dụng các giá trị được nhập
    console.log("Đã áp dụng các cài đặt sau:");
    console.log("Nhiệt độ:", temperature);
    console.log("Độ ẩm đất:", soilMoisture);
    console.log("Độ ẩm không khí:", humidity);

    // alert("Cài đặt đã được áp dụng thành công!");
}





// gợi í khi nhập trong loại thực vật
const plantSuggestions = [
    "cà chua",
"rau cải",
"cà rốt",
"bắp cải",
"dưa chuột",
"xà lách",
"cải bó xôi",
"bí đỏ",
"cà tím",
"khoai lang",
"củ cải đỏ",
"hành lá",
"ớt",
"rau dền",
"rau muống",
"cải thảo",
"dưa lê",
"cải thìa",
"húng quế",
"rau mùi",
"hoa cúc",
"cỏ mực",
"cúc tần",
"dâu tây",
"mía",
"cà phê",
"lúa mì",
"lúa",
"ngô",
"đậu tương",
"vừng",
"lạc",
"bạc hà",
"tỏi",
"hành tây",
"hành tím",
"mướp đắng",
"khoai tây",
"gừng",
"nghệ",
"mít",
"bưởi",
"chanh leo",
"nhãn",
"vải",
"mận",
"măng cụt",
"sầu riêng",
"táo",
"lê"
];

document.getElementById('plant-type').addEventListener('input', function() {
    const input = this.value.toLowerCase();
    const suggestionsBox = document.getElementById('suggestions');
    suggestionsBox.innerHTML = ''; // Xóa gợi ý cũ

    if (input) {
        const filteredSuggestions = plantSuggestions.filter(plant => plant.toLowerCase().includes(input));

        filteredSuggestions.forEach(suggestion => {
            const suggestionItem = document.createElement('div');
            suggestionItem.classList.add('suggestion-item');
            suggestionItem.textContent = suggestion;
            suggestionItem.onclick = function() {
                document.getElementById('plant-type').value = suggestion; // Đặt giá trị ô nhập khi chọn
                suggestionsBox.innerHTML = ''; // Xóa gợi ý
                suggestionsBox.style.display = 'none'; // Ẩn danh sách gợi ý
            };
            suggestionsBox.appendChild(suggestionItem);
        });

        if (filteredSuggestions.length > 0) {
            suggestionsBox.style.display = 'block'; // Hiển thị danh sách gợi ý
        } else {
            suggestionsBox.style.display = 'none'; // Ẩn nếu không có gợi ý
        }
    } else {
        suggestionsBox.style.display = 'none'; // Ẩn nếu ô nhập rỗng
    }
});

// Ẩn danh sách gợi ý khi người dùng nhấp ra ngoài
document.addEventListener('click', function(event) {
    const suggestionsBox = document.getElementById('suggestions');
    if (!suggestionsBox.contains(event.target) && event.target.id !== 'plant-type') {
        suggestionsBox.style.display = 'none'; // Ẩn danh sách gợi ý
    }
});

// end gợi í khi nhập trong loại thực vật

document.getElementById('customize-button').addEventListener('click', function() {
    const customizationFields = document.getElementById('customization-fields');
    customizationFields.style.display = customizationFields.style.display === 'none' ? 'block' : 'none'; // Chuyển đổi hiển thị ô nhập
});

document.getElementById('apply-button').addEventListener('click', function() {
    const temperature = document.getElementById('custom-temperature').value;
    const soilMoisture = document.getElementById('custom-soil-moisture').value;
    const humidity = document.getElementById('custom-humidity').value;

    // Xử lý giá trị đã nhập
    // Bạn có thể thực hiện bất kỳ hành động nào ở đây (lưu lại, cập nhật trạng thái, v.v.)
    alert(`Đã áp dụng:\nNhiệt độ: ${temperature}\nĐộ ẩm đất: ${soilMoisture}\nĐộ ẩm không khí: ${humidity}`);
});

// Xử lí Lịch xử bơm nước 
let pumpHistory = []; // Mảng để lưu trữ lịch sử máy bơm

function updatePumpHistory(mode, status) {
    const currentTime = new Date().toLocaleString(); // Lấy thời gian hiện tại với ngày, tháng, năm, giờ, phút, giây
    const historyEntry = {
        time: currentTime,
        mode: mode,
        status: status
    };
    pumpHistory.push(historyEntry); // Thêm mục mới vào lịch sử

    // Cập nhật bảng hiển thị lịch sử
    const pumpHistoryTable = document.getElementById('pump-history');
    pumpHistoryTable.innerHTML = ''; // Xóa nội dung cũ

    pumpHistory.forEach(entry => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${entry.time}</td><td>${entry.mode}</td><td>${entry.status}</td>`;
        pumpHistoryTable.appendChild(row);
    });
}




// Hàm cập nhật trạng thái máy bơm
function togglePump(isOn) {
    const pumpStatus = document.getElementById('pump-status');
    const mode = document.querySelector('input[name="pump-mode"]:checked').value; // Giả sử bạn có radio buttons để chọn chế độ

    pumpStatus.innerText = isOn ? 'Đang bật' : 'Đang tắt';

    // Chọn chế độ hiển thị chính xác
    const modeText = (mode === 'auto') ? 'Chế Độ Bơm Tự Động' : 'Bơm Thủ Công';

    // Cập nhật lịch sử
    updatePumpHistory(modeText, isOn ? 'Bật' : 'Tắt');
}

// Thiết lập tự động cập nhật lịch sử mỗi 30 phút
setInterval(() => {
    // Giả lập trạng thái máy bơm và chế độ
    const mode = document.querySelector('input[name="pump-mode"]:checked').value || 'manual'; // Mặc định là 'manual'
    const status = Math.random() > 0.5 ? 'Bật' : 'Tắt'; // Giả lập trạng thái bật/tắt
    togglePump(status === 'Bật');
}, 1800000); // 30 phút


// Biểu đồ theo dõi 
const temperatureData = [
    { time: '2024-10-12 08:00', temperature: 22 },
    { time: '2024-10-12 14:00', temperature: 24 },
    { time: '2024-10-12 20:00', temperature: 21 },
    { time: '2024-10-13 08:00', temperature: 23 },
    { time: '2024-10-13 14:00', temperature: 25 },
    { time: '2024-10-13 20:00', temperature: 22 },
    { time: '2024-10-14 08:00', temperature: 24 },
    { time: '2024-10-14 14:00', temperature: 26 },
    { time: '2024-10-14 20:00', temperature: 23 }
];

// Hàm để vẽ biểu đồ
function drawTemperatureChart() {
    const ctx = document.getElementById('tracking-chart').getContext('2d');
    
    const labels = temperatureData.map(data => data.time); // Trục X
    const temperatures = temperatureData.map(data => data.temperature); // Trục Y

    const myChart = new Chart(ctx, {
        type: 'line', // Hoặc 'bar' để tạo biểu đồ cột
        data: {
            labels: labels,
            datasets: [{
                label: 'Nhiệt Độ (°C)',
                data: temperatures,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 1,
                fill: true // Để có hiệu ứng đổ đầy dưới đường biểu đồ
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Nhiệt Độ (°C)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Thời Gian'
                    }
                }
            },
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            }
        }
    });
}

// Gọi hàm vẽ biểu đồ khi trang tải
document.addEventListener('DOMContentLoaded', drawTemperatureChart);

// bieu đồ độ ẩm không khí 
const humidityAirData = [
    { time: '2024-10-12 08:00', humidity: 60 },
    { time: '2024-10-12 14:00', humidity: 23 },
    { time: '2024-10-12 20:00', humidity: 58 },
    { time: '2024-10-13 08:00', humidity: 92 },
    { time: '2024-10-13 14:00', humidity: 90 },
    { time: '2024-10-13 20:00', humidity: 60 },
    { time: '2024-10-14 08:00', humidity: 65 },
    { time: '2024-10-14 14:00', humidity: 10 },
    { time: '2024-10-14 20:00', humidity: 64 }
];

// Hàm để vẽ biểu đồ độ ẩm không khí
function drawHumidityAirChart() {
    const ctx = document.getElementById('humidity-air-chart').getContext('2d');
    
    const labels = humidityAirData.map(data => data.time); // Trục X
    const humidityValues = humidityAirData.map(data => data.humidity); // Trục Y

    const myChart = new Chart(ctx, {
        type: 'line', // Dạng biểu đồ đường
        data: {
            labels: labels,
            datasets: [{
                label: 'Độ ẩm không khí (%)',
                data: humidityValues,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 1,
                fill: true // Để có hiệu ứng đổ đầy dưới đường biểu đồ
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Độ ẩm không khí (%)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Thời gian'
                    }
                }
            },
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            }
        }
    });
}

// Gọi hàm vẽ biểu đồ khi trang tải
document.addEventListener('DOMContentLoaded', drawHumidityAirChart);


// biểu đồ độ ẩm đất
const soilMoistureData = [
    { time: '2024-10-12 08:00', moisture: 1 },
    { time: '2024-10-12 14:00', moisture: 35 },
    { time: '2024-10-12 20:00', moisture: 28 },
    { time: '2024-10-13 08:00', moisture: 78 },
    { time: '2024-10-13 14:00', moisture: 34 },
    { time: '2024-10-13 20:00', moisture: 31 },
    { time: '2024-10-14 08:00', moisture: 99 },
    { time: '2024-10-14 14:00', moisture: 56 },
    { time: '2024-10-14 20:00', moisture: 34 }
];

// Hàm để vẽ biểu đồ độ ẩm đất
function drawSoilMoistureChart() {
    const ctx = document.getElementById('soil-moisture-chart').getContext('2d');
    
    const labels = soilMoistureData.map(data => data.time); // Trục X
    const moistureValues = soilMoistureData.map(data => data.moisture); // Trục Y

    const myChart = new Chart(ctx, {
        type: 'line', // Dạng biểu đồ đường
        data: {
            labels: labels,
            datasets: [{
                label: 'Độ ẩm đất (%)',
                data: moistureValues,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 1,
                fill: true // Để có hiệu ứng đổ đầy dưới đường biểu đồ
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Độ ẩm đất (%)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Thời gian'
                    }
                }
            },
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            }
        }
    });
}

// Gọi hàm vẽ biểu đồ khi trang tải
document.addEventListener('DOMContentLoaded', drawSoilMoistureChart);
