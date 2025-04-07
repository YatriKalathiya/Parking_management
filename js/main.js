function showForgotPassword() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("forgotPasswordForm").style.display = "block";
}

function showLogin() {
    document.getElementById("forgotPasswordForm").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
}
function togglePassword(fieldId, icon) {
    let inputField = document.getElementById(fieldId);
    if (inputField.type === "password") {
        inputField.type = "text";
        icon.src = "img/icon/eye-close.png";
    } else {
        inputField.type = "password";
        icon.src = "img/icon/eye.png";
    }
}
function showOtpForm() {
    document.getElementById("forgotPasswordForm").style.display = "none";
    document.getElementById("otpForm").style.display = "block";
}

function showConfirmPassword() {
    document.getElementById("otpForm").style.display = "none";
    document.getElementById("ConfirmPassword").style.display = "block";
}

function moveToNext(input, event) {
    if (input.value.length === 1) {
        let next = input.nextElementSibling;
        if (next) next.focus();
    }
}

// function toggleSidebar() {
//     let sidebar = document.getElementById("y_sidebar");
//     sidebar.classList.toggle("active");
// }
function toggleDrawer() {
    const drawer = document.getElementById('y_drawer');
    drawer.classList.toggle('open');
  }

  document.addEventListener("DOMContentLoaded", function () {
    const legendData = [
        { color: "#172037", label: "level 1" },
        { color: "#D67800", label: "level 2" },
        { color: "#175CD3", label: "level 3" },
        { color: "#09784A", label: "level 4" },
        { color: "#970606", label: "level 5" }
    ];
    
    const levels = [
        { percentage: 50, color: "#172037" },
        { percentage: 40, color: "#D67800" },
        { percentage: 75, color: "#175CD3" },
        { percentage: 35, color: "#09784A" },
        { percentage: 60, color: "#970606" }
    ];
    
    const legendContainer = document.getElementById("y_legend");
    const chartContainer = document.getElementById("y_chart");
    
    legendContainer.innerHTML = '<h5 class="barchart_h5">Parking Overview</h5>' +
        legendData.map(item => `<div><span style='width:15px;height:15px;display:inline-block;background:${item.color};margin-right:8px;border-radius:3px;'></span> ${item.label}</div>`).join("");
    
    chartContainer.innerHTML = levels.map(level => `
    <div class="d-flex flex-column">
    <span class="percentage-label mb-2">${level.percentage}%</span>
        <div class="sub_div">
            <div style='width:100%;height:${level.percentage}%;background:${level.color};border-radius:15px;'></div>
            </div>
            </div>
    `).join("");
});

// buutons active 
document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".button_container a");

    buttons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault(); // Link ko reload hone se rokne ke liye
            
            // Pehle sabse active class hatao
            buttons.forEach(btn => btn.classList.remove("active"));
            
            // Ab jispe click kiya hai uspe active class add karo
            this.classList.add("active");
        });
    });
});


// donut chart 
 const chartData = {
    value: 6548,
    total: 10000
};

class DonutChart {
    constructor(elementId, data) {
        this.element = document.getElementById(elementId);
        this.data = data;
        this.initialize();
    }

    initialize() {
        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");
        svg.setAttribute("viewBox", "0 0 100 100");
        
        const percentage = (this.data.value / this.data.total) * 100;
        
        const defs = document.createElementNS(svgNS, "defs");
        const gradient = document.createElementNS(svgNS, "linearGradient");
        gradient.setAttribute("id", "orangeGradient");
        gradient.setAttribute("x1", "0%");
        gradient.setAttribute("y1", "0%");
        gradient.setAttribute("x2", "100%");
        gradient.setAttribute("y2", "0%");
        
        const stop1 = document.createElementNS(svgNS, "stop");
        stop1.setAttribute("offset", "0%");
        stop1.setAttribute("stop-color", "#FF8C00"); 
        
        const stop2 = document.createElementNS(svgNS, "stop");
        stop2.setAttribute("offset", "100%");
        stop2.setAttribute("stop-color", "#FFC04D"); 
        
        gradient.appendChild(stop1);
        gradient.appendChild(stop2);
        defs.appendChild(gradient);
        svg.appendChild(defs);
        
        const bgCircle = document.createElementNS(svgNS, "circle");
        bgCircle.setAttribute("cx", "50");
        bgCircle.setAttribute("cy", "50");
        bgCircle.setAttribute("r", "35"); 
        bgCircle.setAttribute("fill", "none");
        bgCircle.setAttribute("stroke", "#f0f0f0");
        bgCircle.setAttribute("stroke-width", "12"); 
        svg.appendChild(bgCircle);
        
        if (percentage > 0) {
            const circumference = 2 * Math.PI * 35; 
            
            const progressCircle = document.createElementNS(svgNS, "circle");
            progressCircle.setAttribute("cx", "50");
            progressCircle.setAttribute("cy", "50");
            progressCircle.setAttribute("r", "35");
            progressCircle.setAttribute("fill", "none");
            progressCircle.setAttribute("stroke", "url(#orangeGradient)"); 
            progressCircle.setAttribute("stroke-width", "12"); 
            progressCircle.setAttribute("stroke-dasharray", circumference);
            progressCircle.setAttribute("stroke-dashoffset", circumference * (1 - percentage / 100));
            progressCircle.setAttribute("transform", "rotate(-90 50 50)");
            progressCircle.setAttribute("stroke-linecap", "round"); 
            svg.appendChild(progressCircle);
        }
        
        this.element.appendChild(svg);
        
        const textDiv = document.createElement("div");
        textDiv.className = "donut_chart_text";
        
        const valueDiv = document.createElement("div");
        valueDiv.className = "donut_chart_value";
        valueDiv.textContent = this.data.value;
        
        const totalDiv = document.createElement("div");
        totalDiv.className = "donut_chart_total";
        totalDiv.textContent = `/${this.data.total}`;
        
        textDiv.appendChild(valueDiv);
        textDiv.appendChild(totalDiv);
        this.element.appendChild(textDiv);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const myDonutChart = new DonutChart("donut_chart", chartData);
});


// revenue chart 
const ctx = document.getElementById('revenueChart').getContext('2d');

        function createGradient(ctx) {
            let gradient = ctx.createLinearGradient(0, 0, 0, 400);
            gradient.addColorStop(0, "rgba(0, 0, 0, 0.6)"); 
            gradient.addColorStop(0.5, "rgba(0, 0, 0, 0.3)"); 
            gradient.addColorStop(1, "rgba(0, 0, 0, 0)"); 
            return gradient;
        }

        let revenueChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
                datasets: [{
                    label: '',
                    data: [3200, 3000, 3500, 4520, 3900, 3700, 4000],
                    borderColor: 'black',
                    borderWidth: 2,
                    backgroundColor: createGradient(ctx),
                    fill: true,
                    pointBackgroundColor: 'black',
                    pointRadius: 4, 
                    pointHoverRadius: 6, 
                    tension: 0.5 
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false }, 
                    tooltip: {
                        backgroundColor: 'black',
                        titleColor: 'white',
                        bodyColor: 'white',
                    }
                },
                scales: {
                    x: { grid: { display: false } }, 
                    y: {
                        grid: { display: true, color: 'rgba(0,0,0,0.1)' }, 
                        ticks: { display: false } 
                    }
                }
            }
        });

        function changeData(period, event) {
            document.querySelectorAll('.button_container a').forEach(btn => btn.classList.remove('active'));

            if (event) event.target.classList.add('active');

            let newData = {
                weekly: [3200, 3000, 3500, 4520, 3900, 3700, 4000],
                monthly: [4000, 4200, 4400, 4600, 4700, 4800, 4900],
                yearly: [5000, 5200, 5400, 5600, 5800, 6000, 6200]
            };

            revenueChart.data.datasets[0].data = newData[period];
            revenueChart.update();
        }


// file upload input 
document.getElementById('fileInput').addEventListener('change', function () {
    let fileName = this.files[0] ? this.files[0].name : 'No file chosen';
    document.querySelector('.y_file_name').textContent = fileName;
});
document.querySelectorAll(".toggle-password2").forEach((eyeIcon) => {
    eyeIcon.addEventListener("click", function () {
      let passwordField = document.querySelector(this.getAttribute("data-target"));
      
      if (passwordField.type === "password") {
        passwordField.type = "text";
        this.src = "img/icon/eye-close.png"; // Change to closed eye icon
      } else {
        passwordField.type = "password";
        this.src = "img/icon/eye.png"; // Change to open eye icon
      }
    });
  });


//   date icon select 
