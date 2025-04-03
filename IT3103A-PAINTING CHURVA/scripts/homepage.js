document.addEventListener("DOMContentLoaded", function () {
    const overlay = document.getElementById("overlay");
    const accountIcon = document.getElementById("accountIcon");
    const dropdownMenu = document.getElementById("dropdownMenu");
    const loginPopup = document.getElementById("loginPopup");
    const registerPopup = document.getElementById("registerPopup");
    const loginBtn = document.getElementById("loginBtn");
    const registerBtn = document.getElementById("registerBtn");

    function openPopup(popup) {
        popup.style.display = "block";
        overlay.style.display = "block"; // Show overlay
        document.body.classList.add("no-scroll"); // Disable scrolling
        dropdownMenu.style.display = "none"; // Hide dropdown when popup opens
    }

    function closePopup(popup) {
        popup.style.display = "none";
        overlay.style.display = "none"; // Hide overlay
        document.body.classList.remove("no-scroll"); // Re-enable scrolling
    }

    // Toggle dropdown menu
    accountIcon.addEventListener("click", function (event) {
        event.stopPropagation(); // Prevents triggering document click event
        dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
    });

    // Show login popup
    loginBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        openPopup(loginPopup);
    });

    // Show register popup
    registerBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        openPopup(registerPopup);
    });

    // Close popups when clicking overlay
    overlay.addEventListener("click", function () {
        closePopup(loginPopup);
        closePopup(registerPopup);
    });

    // Close popups when clicking the close button (X)
    document.querySelectorAll(".close").forEach(button => {
        button.addEventListener("click", function () {
            closePopup(loginPopup);
            closePopup(registerPopup);
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function (event) {
        if (!accountIcon.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.style.display = "none";
        }
    });
});
