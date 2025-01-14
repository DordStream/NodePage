let spinnerControl = spinnerLoader();



let loader = {
    hide: function () {
        spinnerControl.remove();
    },
    show: function (htmlElement) {
        htmlElement.parentElement.appendChild(spinnerControl);
    }



}






function spinnerLoader() {
    let spinnerContainer = document.createElement("div");
    spinnerContainer.style = "position: absolute; top: 0; left: 0; z-index: 1000; width: 98%; height:  100%; display: block";
    let spinnerInner = document.createElement("div");
    spinnerInner.style = "position: relative; left: 50%; top: 35%; width: 100px;";
    let spinnerProgress = document.createElement("div");
    spinnerProgress.style = "width: 50px; height: 50px; ";
    spinnerProgress.className = "spinner-border  text-success progress-bar-animated  m-auto";
    spinnerProgress.setAttribute("role", "status");
    let span = document.createElement("span");
    span.className = "visually-hidden";
    span.innerText = "Loading...";
    span.style.display = "none";
    spinnerProgress.appendChild(span);
    spinnerInner.appendChild(spinnerProgress);
    spinnerContainer.appendChild(spinnerInner);
    return spinnerContainer;
}

