
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show")
        } else {
            entry.target.classList.remove("show")

        }
    })
})



const appearingText = document.querySelectorAll(".text")
appearingText.forEach((el) => scrollObserver.observe(el))