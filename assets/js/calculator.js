/**
 * WTECH - Calculadora Interativa de Orçamentos e Projetos
 */

function updateCalculator() {
    const serviceRadio = document.querySelector('input[name="calc-service"]:checked');
    const locationRadio = document.querySelector('input[name="calc-location"]:checked');
    const qtyInput = document.getElementById('calc-qty');
    const qtyValDisplay = document.getElementById('calc-qty-val');
    const qtyLabel = document.getElementById('calc-qty-label');
    const priceDisplay = document.getElementById('calc-price-range');

    if (!qtyInput || !qtyValDisplay || !priceDisplay) return;

    const qty = parseInt(qtyInput.value) || 1;
    qtyValDisplay.textContent = qty;

    const service = serviceRadio ? serviceRadio.value : 'IA e Automação de Processos';
    const location = locationRadio ? locationRadio.value : 'Comercial/Corporativo';

    let baseMin = 150;
    let baseMax = 350;
    let unitLabel = 'Unidades';

    switch (service) {
        case 'IA e Automação de Processos':
            unitLabel = 'Fluxos / Processos Inteligentes';
            baseMin = 450 * qty;
            baseMax = 950 * qty;
            break;
        case 'Redes e Infraestrutura TI':
            unitLabel = 'Pontos de Rede / Servidores';
            baseMin = 140 * qty;
            baseMax = 260 * qty;
            break;
        case 'Hardware & Manutenção Especializada':
            unitLabel = 'Máquinas / Workstations';
            baseMin = 180 * qty;
            baseMax = 380 * qty;
            break;
        case 'Segurança Digital & CFTV Inteligente':
            unitLabel = 'Câmeras / Pontos de Acesso';
            baseMin = 220 * qty;
            baseMax = 480 * qty;
            break;
        case 'Gestão e Consultoria de Projetos':
            unitLabel = 'Sprints / Escopos de Projeto';
            baseMin = 600 * qty;
            baseMax = 1400 * qty;
            break;
        default:
            unitLabel = 'Unidades';
            baseMin = 200 * qty;
            baseMax = 400 * qty;
    }

    if (qtyLabel) {
        qtyLabel.textContent = `3. Quantidade Estimada (${unitLabel}):`;
    }

    // Fator de escala por tipo de local
    let multiplier = 1.0;
    if (location === 'Comercial/Corporativo') multiplier = 1.15;
    if (location === 'Galpão/Industrial') multiplier = 1.3;

    const finalMin = Math.round(baseMin * multiplier);
    const finalMax = Math.round(baseMax * multiplier);

    priceDisplay.textContent = `R$ ${finalMin.toLocaleString('pt-BR')} - R$ ${finalMax.toLocaleString('pt-BR')}`;
}

function sendCalculatorWhatsApp() {
    const serviceRadio = document.querySelector('input[name="calc-service"]:checked');
    const locationRadio = document.querySelector('input[name="calc-location"]:checked');
    const qtyInput = document.getElementById('calc-qty');
    const priceDisplay = document.getElementById('calc-price-range');

    const service = serviceRadio ? serviceRadio.value : 'N/A';
    const location = locationRadio ? locationRadio.value : 'N/A';
    const qty = qtyInput ? qtyInput.value : '1';
    const priceRange = priceDisplay ? priceDisplay.textContent : 'Sob consulta';

    const message = `Olá, Equipe WTECH! 🚀 Realizei uma simulação no site:%0A%0A` +
        `• *Solução Desejada:* ${encodeURIComponent(service)}%0A` +
        `• *Ambiente:* ${encodeURIComponent(location)}%0A` +
        `• *Volume Estimado:* ${encodeURIComponent(qty)}%0A` +
        `• *Estimativa de Investimento:* ${encodeURIComponent(priceRange)}%0A%0A` +
        `Gostaria de agendar uma reunião técnica com os especialistas da WTECH para detalhar o projeto!`;

    // Número padrão da WTECH (pode ser substituído conforme necessidade)
    window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
}

// Inicializar calculadora ao carregar
document.addEventListener('DOMContentLoaded', () => {
    updateCalculator();
});

