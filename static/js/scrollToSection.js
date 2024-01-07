document.addEventListener('DOMContentLoaded', () => {
    const skillsSection = document.getElementById('skills');
    const skillsNavbarButton = document.querySelector('.navbar button[data-target="#skills"]');

    document.querySelectorAll('.navbar button, #skills button').forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const isSkillsIcon = this.closest('#skills');
            const targetId = this.getAttribute('data-target');
            const targetSection = document.querySelector(targetId);
            const scrollToSection = isSkillsIcon ? skillsSection : targetSection;

            if (scrollToSection) {
                const isInViewport = (element) => {
                    const rect = element.getBoundingClientRect();
                    return (
                        rect.top >= 0 &&
                        rect.left >= 0 &&
                        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
                    );
                };

                // Calculate the offset position
                let offsetPosition = scrollToSection.getBoundingClientRect().top + window.pageYOffset;

                // Adjust the offset depending on the button clicked
                if (this === skillsNavbarButton) {
                    offsetPosition += 250; // Add 250px offset for the skills navbar button
                } else if (isSkillsIcon) {
                    offsetPosition += 200; // Subtract 200px for skills icons
                }

                // Scroll to the target section only if it's not in the viewport
                if (!isInViewport(scrollToSection)) {
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }

                // Apply the pulse effect to the subsection if a skill icon is clicked
                if (isSkillsIcon && targetSection && this !== skillsNavbarButton) {
                    targetSection.classList.add('pulse');
                    setTimeout(() => {
                        targetSection.classList.remove('pulse');
                    }, 3000);
                }
            }
        });
    });
});
