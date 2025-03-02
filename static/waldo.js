document.addEventListener("DOMContentLoaded", function () {
    const waldoImage = document.getElementById("waldo-image");
    const messageBox = document.getElementById("message-box"); 

    //  coordinates
    const waldoX = 2563;
    const waldoY = 1413;
    const threshold = 50;

    waldoImage.addEventListener("click", function (event) {

        const rect = waldoImage.getBoundingClientRect();
        const scaleX = waldoImage.naturalWidth / rect.width;
        const scaleY = waldoImage.naturalHeight / rect.height;

        const clickX = (event.clientX - rect.left) * scaleX;
        const clickY = (event.clientY - rect.top) * scaleY;

        console.log(`Clicked at: (${clickX}, ${clickY})`);

        if (
            Math.abs(clickX - waldoX) < threshold &&
            Math.abs(clickY - waldoY) < threshold
        ) {
            showMessage("GOOD JOB!");
            setTimeout(() => {
                window.location.href = "/after_game"; 
            }, 2000);
        } else {
            showMessage("WRONG LOSER");
        }
    });

    function showMessage(text) {
        messageBox.innerText = text;
        messageBox.style.display = "block";

        setTimeout(() => {
            messageBox.style.display = "none";
        }, 2000);
    }
});
