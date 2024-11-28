// Hàm chuyển đổi giữa chế độ thủ công và tự động
function toggleMode(mode) {
  const manualControls = document.getElementById("manual-controls");
  const automaticControls = document.getElementById("automatic-controls");

  if (mode === "manual") {
    manualControls.style.display = "block";
    automaticControls.style.display = "none";
  } else if (mode === "automatic") {
    manualControls.style.display = "none";
    automaticControls.style.display = "block";
  }
}

// Cập nhật trạng thái máy bơm
async function togglePump(isOn) {
  const pumpStatus = document.getElementById("pump-status");
  pumpStatus.innerText = isOn ? "Đang bật" : "Đang tắt";

  const oldValue = await fetch("http://localhost:4000/climate/get-pump-status");

  fetch("http://localhost:4000/climate/update-pump-status", {
    method: "UPDATE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...oldValue,
      status: isOn ? "on" : "off",
    }),
  });
}

// Thiết lập bơm tự động
function setAutoPump() {
  const waterAmount = document.getElementById("water-amount").value;
  const dateSet = document.getElementById("date-set").value;
  const timeSet = document.getElementById("time-set").value;
  const repeatSet = document.getElementById("repeat-set").value;

  if (!waterAmount || !dateSet || !timeSet) {
    alert("Vui lòng điền đầy đủ thông tin!");
    return;
  }

  alert(`Cài đặt bơm tự động thành công! 
           Lượng nước: ${waterAmount}
           Ngày: ${dateSet}
           Giờ: ${timeSet}
           Lặp lại: ${repeatSet === "no" ? "Không" : repeatSet}`);
}

// Đăng xuất
function logout() {
  alert("Đăng xuất thành công!");
  window.location.href = "index.html"; // Quay về trang chính
}

document.getElementById("plant-type").addEventListener("input", function () {
  const input = this.value.toLowerCase();
  const suggestionsBox = document.getElementById("suggestions");
  suggestionsBox.innerHTML = ""; // Xóa gợi ý cũ

  if (input) {
    const filteredSuggestions = plantSuggestions.filter((plant) =>
      plant.toLowerCase().includes(input)
    );

    filteredSuggestions.forEach((suggestion) => {
      const suggestionItem = document.createElement("div");
      suggestionItem.classList.add("suggestion-item");
      suggestionItem.textContent = suggestion;
      suggestionItem.onclick = function () {
        document.getElementById("plant-type").value = suggestion;
        suggestionsBox.innerHTML = ""; // Xóa gợi ý
        suggestionsBox.style.display = "none"; // Ẩn danh sách gợi ý
      };
      suggestionsBox.appendChild(suggestionItem);
    });

    suggestionsBox.style.display =
      filteredSuggestions.length > 0 ? "block" : "none";
  } else {
    suggestionsBox.style.display = "none"; // Ẩn nếu ô nhập rỗng
  }
});

// Ẩn danh sách gợi ý khi người dùng nhấp ra ngoài
document.addEventListener("click", function (event) {
  const suggestionsBox = document.getElementById("suggestions");
  if (
    !suggestionsBox.contains(event.target) &&
    event.target.id !== "plant-type"
  ) {
    suggestionsBox.style.display = "none";
  }
});

// Áp dụng cài đặt thủ công
let ok = 1;
document.getElementById("apply-button").addEventListener("click", function () {
  const temperature = document
    .getElementById("custom-temperature")
    .value.trim();
  const soilMoisture = document
    .getElementById("custom-soil-moisture")
    .value.trim();
  const airHumidity = document.getElementById("custom-humidity").value.trim();

  if (temperature === "" || soilMoisture === "" || airHumidity === "") {
    ok = 0;
    alert(
      "Vui lòng nhập đầy đủ các giá trị: Nhiệt độ, Độ ẩm đất, và Độ ẩm không khí."
    );
  } else {
    fetch("http://localhost:4000/climate/update-climate", {
      method: "UPDATE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        temperature,
        soilMoisture,
        airHumidity,
      }),
    });
  }
});

// Cập nhật lịch sử máy bơm
let pumpHistory = [];
function updatePumpHistory(mode, status) {
  const currentTime = new Date().toLocaleString();
  const historyEntry = { time: currentTime, mode, status };
  pumpHistory.push(historyEntry);

  const pumpHistoryTable = document.getElementById("pump-history");
  pumpHistoryTable.innerHTML = ""; // Xóa bảng cũ

  pumpHistory.forEach((entry) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${entry.time}</td><td>${entry.mode}</td><td>${entry.status}</td>`;
    pumpHistoryTable.appendChild(row);
  });
}

// Cập nhật trạng thái máy bơm và lịch sử
function togglePumpWithHistory(isOn) {
  const pumpStatus = document.getElementById("pump-status");
  const mode = document.querySelector('input[name="pump-mode"]:checked').value;
  pumpStatus.innerText = isOn ? "Đang bật" : "Đang tắt";

  const modeText = mode === "auto" ? "Chế Độ Bơm Tự Động" : "Bơm Thủ Công";

  fetch("http://localhost:4000/climate/update-pump-status", {
    method: "UPDATE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status: isOn ? "on" : "off",
    }),
  });

  updatePumpHistory(modeText, isOn ? "Bật" : "Tắt");
}

// Giả lập cập nhật trạng thái máy bơm mỗi 30 phút
setInterval(() => {
  const mode =
    document.querySelector('input[name="pump-mode"]:checked').value || "manual";
  const status = Math.random() > 0.5 ? "Bật" : "Tắt";
  togglePumpWithHistory(status === "Bật");
}, 1800000); // 30 phút

// Hàm vẽ biểu đồ
function drawChart(ctx, labels, data, label) {
  return new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label,
          data,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderWidth: 1,
          fill: true,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: label },
        },
        x: { title: { display: true, text: "Thời gian" } },
      },
      responsive: true,
    },
  });
}

// Hàm vẽ các biểu đồ
function drawClimateCharts() {
  fetch("http://localhost:4000/climate/get-climate")
    .then((response) => response.json())
    .then((data) => {
      const temperatureData = data.data.climateData.map((d) => ({
        time: d.time,
        temperature: d.temperature,
      }));
      const humidityData = data.data.climateData.map((d) => ({
        time: d.time,
        humidity: d.airHumidity,
      }));
      const soilMoistureData = data.data.climateData.map((d) => ({
        time: d.time,
        moisture: d.soilMoisture,
      }));

      drawChart(
        document.getElementById("tracking-chart").getContext("2d"),
        temperatureData.map((d) => d.time),
        temperatureData.map((d) => d.temperature),
        "Nhiệt Độ (°C)"
      );
      drawChart(
        document.getElementById("humidity-air-chart").getContext("2d"),
        humidityData.map((d) => d.time),
        humidityData.map((d) => d.humidity),
        "Độ ẩm không khí (%)"
      );
      drawChart(
        document.getElementById("soil-moisture-chart").getContext("2d"),
        soilMoistureData.map((d) => d.time),
        soilMoistureData.map((d) => d.moisture),
        "Độ ẩm đất (%)"
      );
    })
    .catch((error) => console.error("Error fetching climate data:", error));
}

// Lấy dữ liệu khí hậu và vẽ biểu đồ khi tải trang
document.addEventListener("DOMContentLoaded", drawClimateCharts);

// Cập nhật dữ liệu khí hậu mỗi 30 phút
setInterval(drawClimateCharts, 30 * 60 * 1000);

// Làm mới dữ liệu khí hậu khi nhấn nút
document
  .getElementById("refresh-button")
  .addEventListener("click", drawClimateCharts);
