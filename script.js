document.addEventListener("DOMContentLoaded", () => {
    // ================= CONFIGURACIÓN RÁPIDA =================
    const CONFIG = {
        // REEMPLAZA este valor por el WhatsApp real de Skalibur, sin + ni espacios.
        whatsappNumber: "573000000000",
        instagramUrl: "https://www.instagram.com/skalibur.gym/",
        facebookUrl: "https://www.facebook.com/skalibur.gym",
        googleReviewUrl: "https://www.google.com/maps/search/?api=1&query=Skalibur+Gym%2C+Suesca%2C+Cundinamarca",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Skalibur+Gym%2C+Suesca%2C+Cundinamarca",
        musicUrl: "audio/fondo.mp3"
    };

    const body = document.body;
    const modals = [...document.querySelectorAll(".modal")];

    const openModal = (modal) => {
        if (!modal) return;
        modal.classList.add("active");
        body.classList.add("modal-open");
    };

    const closeModal = (modal) => {
        if (!modal) return;
        modal.classList.remove("active");
        if (!document.querySelector(".modal.active")) body.classList.remove("modal-open");
    };

    document.querySelectorAll("[data-modal-target]").forEach((trigger) => {
        trigger.addEventListener("click", () => {
            openModal(document.querySelector(trigger.dataset.modalTarget));
        });
    });

    document.querySelectorAll(".close-modal").forEach((button) => {
        button.addEventListener("click", () => closeModal(button.closest(".modal")));
    });

    modals.forEach((modal) => {
        modal.addEventListener("click", (event) => {
            if (event.target === modal) closeModal(modal);
        });
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeModal(document.querySelector(".modal.active"));
    });

    const waUrl = (message) => {
        if (!CONFIG.whatsappNumber || CONFIG.whatsappNumber === "573000000000") {
            window.alert("Configura el número real de WhatsApp en script.js antes de publicar.");
            return null;
        }
        return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
    };

    document.querySelectorAll(".btn-buy").forEach((button) => {
        button.addEventListener("click", () => {
            const card = button.closest(".product-card");
            const productName = card?.dataset.productName || "un producto";
            const url = waUrl(`¡Hola Skalibur Gym! 💪 Estoy interesado en consultar o adquirir: *${productName}*. ¿Me dan información?`);
            if (url) window.open(url, "_blank", "noopener,noreferrer");
        });
    });

    document.querySelector(".btn-nutricion")?.addEventListener("click", () => {
        const url = waUrl("¡Hola! Me gustaría agendar una valoración para el asesoramiento nutricional. 🥗");
        if (url) window.open(url, "_blank", "noopener,noreferrer");
    });

    document.querySelector(".btn-whatsapp-general")?.addEventListener("click", () => {
        const url = waUrl("¡Hola Skalibur Gym! 👋 Quisiera información sobre el gimnasio.");
        if (url) window.open(url, "_blank", "noopener,noreferrer");
    });

    document.querySelectorAll(".btn-teacher-contact").forEach((button) => {
        button.addEventListener("click", () => {
            const teacherName = button.dataset.teacher || "el entrenador";
            const url = waUrl(`¡Hola! Me gustaría contactar al entrenador ${teacherName}. 💪`);
            if (url) window.open(url, "_blank", "noopener,noreferrer");
        });
    });

    const whatsappLink = document.querySelector('[data-social="whatsapp"]');
    if (whatsappLink) {
        if (CONFIG.whatsappNumber && CONFIG.whatsappNumber !== "573000000000") {
            whatsappLink.href = `https://wa.me/${CONFIG.whatsappNumber}`;
            whatsappLink.target = "_blank";
            whatsappLink.rel = "noopener noreferrer";
        } else {
            whatsappLink.addEventListener("click", (event) => {
                event.preventDefault();
                window.alert("Configura el número real de WhatsApp en script.js antes de publicar.");
            });
        }
    }

    const googleCta = document.querySelector(".google-review-cta");
    if (googleCta) googleCta.href = CONFIG.googleReviewUrl;

    const mapLink = document.querySelector(".cta-link");
    if (mapLink) mapLink.href = CONFIG.mapUrl;

    document.querySelectorAll('[data-social="facebook"]').forEach((link) => {
        link.href = CONFIG.facebookUrl;
    });

    // ================= MÚSICA OPCIONAL =================
    const audio = document.getElementById("backgroundMusic");
    const musicToggle = document.getElementById("musicToggle");

    if (audio && musicToggle) {
        audio.src = CONFIG.musicUrl;

        const showMusicControl = () => {
            musicToggle.hidden = false;
        };

        const hideMusicControl = () => {
            musicToggle.hidden = true;
        };

        audio.addEventListener("canplay", showMusicControl, { once: true });
        audio.addEventListener("error", hideMusicControl, { once: true });

        let musicStarted = false;

        const startMusicAfterInteraction = async () => {
            if (musicStarted) return;
            try {
                await audio.play();
                musicStarted = true;
                musicToggle.hidden = false;
                musicToggle.setAttribute("aria-label", "Pausar música");
                musicToggle.textContent = "❚❚";
                cleanupMusicListeners();
            } catch (_) {
                // El navegador puede bloquear audio; el control quedará disponible cuando corresponda.
            }
        };

        const interactionEvents = ["pointerdown", "keydown"];
        const cleanupMusicListeners = () => interactionEvents.forEach((name) => document.removeEventListener(name, startMusicAfterInteraction));

        interactionEvents.forEach((name) => document.addEventListener(name, startMusicAfterInteraction, { once: true }));

        musicToggle.addEventListener("click", async () => {
            if (audio.paused) {
                try {
                    await audio.play();
                    musicToggle.setAttribute("aria-label", "Pausar música");
                    musicToggle.textContent = "❚❚";
                } catch (_) {}
            } else {
                audio.pause();
                musicToggle.setAttribute("aria-label", "Reproducir música");
                musicToggle.textContent = "♫";
            }
        });
    }
});
