/**
 * WTECH - Scripts Principais
 * Navegação, Interatividades, Accordion, Modal e Visualizador de Fotos
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Navbar Glass Effect on Scroll
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // 2. Mobile Menu Navigation
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.toggle('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                if (isHidden) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                } else {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-xmark');
                }
            }
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // 3. Highlight Active Nav Link based on Current Page
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    // 4. Team Filter (Página da Equipe ou Seção)
    const teamFilterButtons = document.querySelectorAll('.team-filter-btn');
    const teamCards = document.querySelectorAll('.team-member-item');

    if (teamFilterButtons.length > 0 && teamCards.length > 0) {
        teamFilterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');

                teamFilterButtons.forEach(b => {
                    b.classList.remove('bg-gradient-to-r', 'from-cyber-blue', 'to-cyber-neon', 'text-cyber-dark', 'font-bold');
                    b.classList.add('glass-card', 'text-slate-300');
                });

                btn.classList.remove('glass-card', 'text-slate-300');
                btn.classList.add('bg-gradient-to-r', 'from-cyber-blue', 'to-cyber-neon', 'text-cyber-dark', 'font-bold');

                teamCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block';
                        card.classList.add('animate-fadeIn');
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // 5. Interactive Photo Slot Live Tester
    // Permite ao usuário clicar na foto de qualquer colaborador para testar como sua foto real fica instantaneamente!
    initPhotoLivePreview();
});

// FAQ Accordion Toggle
function toggleFaq(button) {
    if (!button) return;
    const content = button.nextElementSibling;
    const icon = button.querySelector('i');

    document.querySelectorAll('.faq-content').forEach(item => {
        if (item !== content) {
            item.classList.add('hidden');
            if (item.previousElementSibling) {
                const prevIcon = item.previousElementSibling.querySelector('i');
                if (prevIcon) prevIcon.style.transform = 'rotate(0deg)';
            }
        }
    });

    if (content) {
        const isHidden = content.classList.toggle('hidden');
        if (icon) {
            icon.style.transform = isHidden ? 'rotate(0deg)' : 'rotate(180deg)';
        }
    }
}

// Formulário de Contato Direto via WhatsApp
function handleContactSubmit(event) {
    event.preventDefault();
    const nameEl = document.getElementById('contact-name');
    const emailEl = document.getElementById('contact-email');
    const phoneEl = document.getElementById('contact-phone');
    const subjectEl = document.getElementById('contact-subject');
    const msgEl = document.getElementById('contact-msg');

    const name = nameEl ? nameEl.value.trim() : '';
    const email = emailEl ? emailEl.value.trim() : '';
    const phone = phoneEl ? phoneEl.value.trim() : '';
    const subject = subjectEl ? subjectEl.value.trim() : 'Atendimento Geral';
    const msg = msgEl ? msgEl.value.trim() : '';

    if (!name || !msg) {
        showToast('Por favor, preencha todos os campos obrigatórios.', 'error');
        return;
    }

    const text = `*Novo Contato via Site WTECH* 🚀%0A%0A` +
        `• *Nome:* ${encodeURIComponent(name)}%0A` +
        `• *E-mail:* ${encodeURIComponent(email)}%0A` +
        `• *WhatsApp:* ${encodeURIComponent(phone)}%0A` +
        `• *Assunto:* ${encodeURIComponent(subject)}%0A` +
        `• *Mensagem:* ${encodeURIComponent(msg)}%0A%0A` +
        `Aguardando atendimento da equipe!`;

    window.open(`https://wa.me/5511999999999?text=${text}`, '_blank');
}

// Visualizador / Testador de Fotos em Tempo Real
function initPhotoLivePreview() {
    const photoSlots = document.querySelectorAll('.photo-slot');
    if (!photoSlots || photoSlots.length === 0) return;

    // Criar input hidden de arquivo
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);

    let currentTargetImg = null;

    photoSlots.forEach(slot => {
        slot.style.cursor = 'pointer';
        slot.setAttribute('title', 'Clique para testar uma foto real do seu computador neste espaço!');

        slot.addEventListener('click', (e) => {
            currentTargetImg = slot.querySelector('img');
            fileInput.click();
        });
    });

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file && currentTargetImg) {
            const reader = new FileReader();
            reader.onload = function (evt) {
                currentTargetImg.src = evt.target.result;
                showToast(`Foto carregada com sucesso em modo de teste!`, 'success');
            };
            reader.readAsDataURL(file);
        }
        fileInput.value = '';
    });
}

// Toast de Notificação Elegante
function showToast(message, type = 'info') {
    let toastContainer = document.getElementById('wtech-toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'wtech-toast-container';
        toastContainer.className = 'fixed bottom-24 right-6 z-50 flex flex-col space-y-2 pointer-events-none';
        document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    const isSuccess = type === 'success';
    toast.className = `px-5 py-3 rounded-xl glass-card border ${isSuccess ? 'border-cyber-neon text-cyber-neon' : 'border-cyber-blue text-cyber-blue'} text-xs font-mono shadow-2xl transition-all duration-300 transform translate-y-4 opacity-0 flex items-center space-x-2 pointer-events-auto`;
    toast.innerHTML = `<i class="fa-solid ${isSuccess ? 'fa-circle-check text-base' : 'fa-circle-info text-base'}"></i> <span>${message}</span>`;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.classList.remove('translate-y-4', 'opacity-0');
    }, 10);

    setTimeout(() => {
        toast.classList.add('translate-y-4', 'opacity-0');
        setTimeout(() => toast.remove(), 300);
    }, 4500);
}
