function resetTimer() {
    var timer = document.querySelector(".timer");
    timer.textContent = "0:00.000";
    timer.style.color = "black";
    awa = false
}
var awa = false;
var startTime = 0;
var animationFrame
function stopTimer() {
    awa=false;
    cancelAnimationFrame(animationFrame);
}
function Timer() {
    var timer = document.querySelector(".timer");
    var elapsed = performance.now() - startTime;

    var minutes = Math.floor(elapsed / 60000);
    var seconds = Math.floor((elapsed % 60000) / 1000);
    var milliseconds = Math.floor(elapsed % 1000);

    timer.textContent =
        minutes + ":" +
        String(seconds).padStart(2, "0") + "." +
        String(milliseconds).padStart(3, "0");
    timer.style.color = "white";
    animationFrame = requestAnimationFrame(Timer); 
}