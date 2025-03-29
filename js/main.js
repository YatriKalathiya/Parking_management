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