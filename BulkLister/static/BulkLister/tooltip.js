document.addEventListener('DOMContentLoaded', function() {
    let setUpToolTip = function() {
        let tooltip = "";
        let toolTipDiv = document.querySelector(".div-tooltip");
        let toolTipElements = Array.from(document.querySelectorAll(".glyphicon"));

        let displayTooltip = function(e, obj) {
            tooltip = obj.dataset.tooltip;
            toolTipDiv.innerHTML = tooltip;
            toolTipDiv.style.top = e.pageY - 200 + "px";
            toolTipDiv.style.left = e.pageX - 300 + "px";
            toolTipDiv.style.opacity = 1;
        }

        let hideTooltip = function(e, obj) {
            tooltip = "";
            toolTipDiv.innerHTML = tooltip;
            toolTipDiv.style.opacity = 0;
        }

        toolTipElements.forEach(function(elem) {
            elem.addEventListener("click", function(e) {
                if(toolTipDiv.style.opacity == 0) {
                    displayTooltip(e, this);
                } else {
                    hideTooltip(e, this);
                }
            })
        })
    }

    setUpToolTip();
})