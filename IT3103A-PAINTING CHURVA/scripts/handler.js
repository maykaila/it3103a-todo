document.addEventListener("DOMContentLoaded", () => {
    // REGISTER HANDLER
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const formData = new FormData(registerForm);

            try {
                const response = await fetch("../php/register.php", {
                    method: "POST",
                    body: formData,
                });

                const result = await response.json();

                if (result.status === "success") {
                    alert(result.message);
                    window.location.href = "/it3103a-todo/it3103a-todo/IT3103A-PAINTING%20CHURVA/views/homepage.html";
                } else {
                    alert(result.message);
                }
            } catch (error) {
                console.error("Registration Error:", error);
                alert("Something went wrong while registering.");
            }
        });
    }

    // LOGIN HANDLER
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const formData = new FormData(loginForm);

            try {
                const response = await fetch("../php/login.php", {
                    method: "POST",
                    body: formData,
                });

                if (response.redirected) {
                    window.location.href = "/it3103a-todo/it3103a-todo/IT3103A-PAINTING%20CHURVA/views/homepage.html";
                } else {
                    const message = await response.text();
                    alert(message);
                }
            } catch (error) {
                console.error("Login Error:", error);
                alert("Something went wrong while logging in.");
            }
        });
    }

    
    fetch("../php/check_session.php")
        .then((res) => res.json())
        .then((data) => {
            const loginBtn = document.getElementById("loginBtn");
            const registerBtn = document.getElementById("registerBtn");
            const logoutBtn = document.getElementById("logoutBtn");

            if (!loginBtn || !registerBtn || !logoutBtn) return;

            if (data.loggedIn) {
                logoutBtn.classList.remove("d-none");
                loginBtn.classList.add("d-none");
                registerBtn.classList.add("d-none");

                logoutBtn.addEventListener("click", () => {
                    window.location.href = "../php/logout.php";
                });
            } else {
                logoutBtn.classList.add("d-none");
                loginBtn.classList.remove("d-none");
                registerBtn.classList.remove("d-none");
            }
        })
        .catch((err) => console.error("Session check error:", err));

        document.addEventListener('DOMContentLoaded', () => {
        const badge = document.getElementById('cartCount');
        if (!badge) return;

        fetch('/it3103a-todo/it3103a-todo/IT3103A-PAINTING%20CHURVA/php/getCartCount.php')
            .then(r => r.json())
            .then(data => {
            badge.textContent = data.count;
            })
            .catch(() => {
            badge.textContent = '0';
            });
        });

        document.addEventListener('DOMContentLoaded', () => {
        const badge = document.getElementById('cartCount');
        if (!badge) {
            console.log('handler.js: no #cartCount found');
            return;
        }

        console.log('handler.js: #cartCount found, fetching count…');
        fetch('../php/getCartCount.php')
            .then(r => {
            console.log('handler.js: getCartCount.php status', r.status);
            return r.json();
            })
            .then(data => {
            console.log('handler.js: getCartCount.php JSON', data);
            badge.textContent = data.count;
            })
            .catch(err => {
            console.error('handler.js: fetch error', err);
            badge.textContent = '0';
            });
        });

        fetch('/it3103a-todo/it3103a-todo/IT3103A-PAINTING%20CHURVA/php/getCartCount.php')
        .then(r => r.json())
        .then(data => {
            document.getElementById('cartCount').textContent = data.count;
        });
});

