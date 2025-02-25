// Simulate a loading process
function simulateLoading() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 3000); // Simulate a 3-second loading time
    });
}

function redirectToPage() {
    window.location.href = "reg/index.html"; // Redirect to your new HTML page
}

window.onload = async () => {
    await simulateLoading();
    document.getElementById("spinner").style.display = "none";
    document.getElementById("ok-button").style.display = "inline-block";
};
