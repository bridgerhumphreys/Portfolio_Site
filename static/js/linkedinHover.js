document.addEventListener('DOMContentLoaded', function () {
    // Select all elements with the class 'linkedin-button'
    var buttons = document.querySelectorAll('.linkedin-button');

    buttons.forEach(function(button) {
        var hoverText = button.querySelector('.hover-text');

        // Mouseover event
        button.addEventListener('mouseover', function() {
            var container = this.closest('.about-sub-containers');
            if (container) {
                container.style.transform = 'scale(1.05)';
                container.style.backgroundColor = 'rgba(128, 128, 128, 0.6)';
            }
            if (hoverText) {
                hoverText.style.display = 'block';
            }
        });

        // Mousemove event to update hover text position
        button.addEventListener('mousemove', function(event) {
            if (hoverText) {
                var buttonRect = this.getBoundingClientRect();
                var mouseX = event.clientX - buttonRect.left;
                var mouseY = event.clientY - buttonRect.top;
                hoverText.style.left = mouseX + 'px';
                hoverText.style.top = mouseY + 'px';
            }
        });

        // Mouseout event
        button.addEventListener('mouseout', function() {
            var container = this.closest('.about-sub-containers');
            if (container) {
                container.style.transform = '';
                container.style.backgroundColor = 'rgba(128, 128, 128, 0.5)';
            }
            if (hoverText) {
                hoverText.style.display = 'none';
            }
        });
    });
});
