'use strict'

var colorBoxes = document.querySelectorAll(".colorBox");

colorBoxes.forEach(function(colorBox) {
    colorBox.addEventListener("mouseover", function() {
        colorBox.classList.add("hover");
    });

    colorBox.addEventListener("mouseout", function() {
        colorBox.classList.remove("hover");
    });
});