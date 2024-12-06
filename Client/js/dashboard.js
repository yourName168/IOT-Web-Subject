// Hàm chuyển đổi giữa chế độ thủ công và tự động
async function toggleMode(mode) {
  await fetch("http://localhost:4000/climate/update-pump-status", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      isManualPump: mode === "manual",
    }),
  });
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
    method: "put",
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
// document.getElementById("apply-button").addEventListener("click", function () {
//   const temperature = document
//     .getElementById("custom-temperature")
//     .value.trim();
//   const soilMoisture = document
//     .getElementById("custom-soil-moisture")
//     .value.trim();
//   const airHumidity = document.getElementById("custom-humidity").value.trim();

//   if (temperature === "" || soilMoisture === "" || airHumidity === "") {
//     ok = 0;
//     alert(
//       "Vui lòng nhập đầy đủ các giá trị: Nhiệt độ, Độ ẩm đất, và Độ ẩm không khí."
//     );
//   } else {
//     fetch("http://localhost:4000/climate/update-climate", {
//       method: "UPDATE",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         temperature,
//         soilMoisture,
//         airHumidity,
//       }),
//     });
//   }
// });

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

function convertISOToDateTime(isoString) {
  const date = new Date(isoString);

  // Lấy ngày, tháng, năm
  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');  // Tháng bắt đầu từ 0
  const day = date.getUTCDate().toString().padStart(2, '0');

  // Lấy giờ, phút, giây
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const seconds = date.getUTCSeconds().toString().padStart(2, '0');

  // Trả về chuỗi ngày giờ theo định dạng "YYYY-MM-DD HH:mm:ss"
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Hàm vẽ các biểu đồ
function drawClimateCharts() {
  fetch("http://localhost:4000/climate/get-climate")
    .then((response) => response.json())
    .then((data) => {
      const firstData = data.data.climateData[0];
      const temperature = document.getElementById("temperature");
      const humidity = document.getElementById("humidity");
      const soilMoisture = document.getElementById("soil-moisture");
      const pumpStatus = document.getElementById("pump-status");

      pumpStatus.innerText =
        data.data.pumpStatus === "on" ? "Đang bật" : "Đang tắt";
      temperature.innerText = firstData.temperature + "°C";
      humidity.innerText = firstData.airHumidity + "%";
      soilMoisture.innerText = firstData.soilMoisture + "%";

      const temperatureData = data.data.climateData.map((d) => ({
        time: convertISOToDateTime(d.time),
        temperature: d.temperature,
      }));
      const humidityData = data.data.climateData.map((d) => ({
        time: convertISOToDateTime(d.time),
        humidity: d.airHumidity,
      }));
      const soilMoistureData = data.data.climateData.map((d) => ({
        time: convertISOToDateTime(d.time),
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

document
  .getElementById("find-plan-environment")
  .addEventListener("click", async function () {
    const plantType = document.getElementById("plant-type").value;
    console.log(plantType);
    await fetch(
      `http://localhost:4000/climate/get-plant-environment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plantName: plantType,
        }),
      }
    )
      .then((response) => {
        document.getElementById("suggested-conditions").style.display = "flex";
        return response.json();
      })
      .then((plantEnvironment) => {
        const idealTemperature = document.getElementById("ideal-temperature");
        const idealHumidity = document.getElementById("ideal-humidity");
        const idealSoilMoisture = document.getElementById(
          "ideal-soil-moisture"
        );

        // document.getElementById("custom-temperature").value = "29-9";
        document.getElementById("custom-temperature").value = plantEnvironment.data.temperature;
        document.getElementById("custom-soil-moisture").value = plantEnvironment.data.soilMoisture;
        document.getElementById("custom-humidity").value = plantEnvironment.data.airHumidity;

        idealTemperature.innerText = plantEnvironment.data.temperature + " °C";
        idealHumidity.innerText = plantEnvironment.data.airHumidity + " %";
        idealSoilMoisture.innerText = plantEnvironment.data.soilMoisture + " %";

        idealTemperature = idealTemperature.textContent.trim();

        
        
      });
  });
const applySettings = async () => {
  const temperature = document.getElementById("ideal-temperature").innerHTML.split(" ")[0]
  const soilMoisture = document.getElementById("ideal-soil-moisture").innerHTML.split(" ")[0]
  const airHumidity = document.getElementById("ideal-humidity").innerHTML.split(" ")[0]
  console.log(temperature, soilMoisture, airHumidity)

  await fetch("http://localhost:4000/climate/update-pump-status", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      temperature,
      soilMoisture,
      airHumidity,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.error("Error updating climate data:", error));
};


// sửa giao diện 
// Lấy phần tử nút và thanh trượt

// custom nhiệt độ 
const customizeButton = document.getElementById("customize-button");
const customizationFields = document.getElementById("customization-fields");

// Lắng nghe sự kiện click trên button
customizeButton.addEventListener("click", function() {
  // Kiểm tra trạng thái hiện tại của div và thay đổi display
  if (customizationFields.style.display === "none" || customizationFields.style.display === "") {
    customizationFields.style.display = "block";
  } else {
    customizationFields.style.display = "none";
  }
});

// add data custom -> input 
