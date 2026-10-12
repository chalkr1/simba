/* =========================================
   HAMBURGER MENU
========================================= */

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("show");

    const isOpen = navMenu.classList.contains("show");

    menuToggle.setAttribute("aria-expanded", isOpen);

    menuToggle.textContent = isOpen ? "✕" : "☰";
});


/* =========================================
   ZAVŘENÍ MENU PO KLIKNUTÍ
========================================= */

document.querySelectorAll(".nav-menu a").forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("show");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.textContent = "☰";

    });

});


/* =========================================
   FORMULÁŘ
========================================= */

const form = document.getElementById("kontaktForm");
const formMessage = document.getElementById("formMessage");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const submitButton = form.querySelector('button[type="submit"]');

    submitButton.disabled = true;
    submitButton.textContent = "Odesílám…";

    try {
        const response = await fetch(form.action, {
            method: "POST",
            body: new FormData(form),
            headers: {
                Accept: "application/json"
            }
        });

        if (response.ok) {
            formMessage.textContent =
                "Děkuji za zprávu! Poptávka byla úspěšně odeslána. Ozvu se vám co nejdříve a společně domluvíme další postup.";

            formMessage.style.color = "#6bb59a";

            form.reset();
        } else {
            formMessage.textContent =
                "Odeslání se nepodařilo. Zkuste to prosím znovu.";

            formMessage.style.color = "#c0392b";
        }
    } catch (error) {
        formMessage.textContent =
            "Odeslání se nepodařilo. Zkontrolujte připojení a zkuste to prosím znovu.";

        formMessage.style.color = "#c0392b";
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Odeslat poptávku";
    }
});