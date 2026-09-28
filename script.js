document.addEventListener('DOMContentLoaded', () => {
    
    // ================= MODALES =================
    const modalTriggers = document.querySelectorAll('[data-modal-target]');
    const closeButtons = document.querySelectorAll('.close-modal');
    const modals = document.querySelectorAll('.modal');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modalId = trigger.getAttribute('data-modal-target');
            const targetModal = document.querySelector(modalId);
            
            if(targetModal) {
                targetModal.classList.add('active');
                document.body.style.overflow = 'hidden'; 
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });

    // ================= WHATSAPP CRO =================
    // Cambia con el número real de WhatsApp de Skalibur Gym
    const WHATSAPP_NUMBER = "573000000000"; 
    
    const buyButtons = document.querySelectorAll('.btn-buy');

    buyButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            const productName = card.getAttribute('data-product-name');
            
            const message = `¡Hola Skalibur Gym! 💪 Estoy interesado en adquirir o consultar precio sobre: *${productName}*. ¿Me dan información?`;
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
            
            window.open(whatsappUrl, '_blank');
        });
    });
});
