/**
 * PRIME WEALTH INVESTIMENTOS - ÁREA DO CLIENTE & PLATAFORMA DE GESTÃO PATRIMONIAL
 * Dashboard consolidado, gráficos de performance, extratos e informe de IR
 */

let portalDonutChartInstance = null;
let portalLineChartInstance = null;
let isBalanceHidden = false;

// Dados originais para alternância de visibilidade do saldo
const ORIGINAL_BALANCES = {
  total: "R$ 342.850,20",
  rentability: "16,84% a.a.",
  dividends: "R$ 18.420,00",
  cash: "R$ 5.420,00"
};

/**
 * Inicializa a navegação por abas dentro do portal do cliente
 */
function initPortalTabs() {
  const tabs = document.querySelectorAll('.portal-tab-btn');
  const panes = document.querySelectorAll('.portal-pane');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetPaneId = 'pane-' + tab.getAttribute('data-portal-tab');

      // Alterna classes ativas nos botões
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Alterna visibilidade dos painéis
      panes.forEach(pane => {
        pane.classList.remove('active');
        if (pane.id === targetPaneId) {
          pane.classList.add('active');
        }
      });

      // Se abriu a aba de rentabilidade, redesenha o gráfico de linha se necessário
      if (targetPaneId === 'pane-rentabilidade' && portalLineChartInstance) {
        portalLineChartInstance.resize();
      }
    });
  });
}

/**
 * Inicializa o gráfico Donut de alocação de ativos do cliente
 */
function initPortalDonutChart() {
  const ctx = document.getElementById('portalDonutChart');
  if (!ctx) return;

  if (portalDonutChartInstance) {
    portalDonutChartInstance.destroy();
  }

  portalDonutChartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: [
        'Renda Fixa (59,8%)',
        'Fundos Imobiliários (25,1%)',
        'Mercado Global (13,5%)',
        'Caixa Imediato (1,6%)'
      ],
      datasets: [{
        data: [205000, 86000, 46430, 5420],
        backgroundColor: [
          '#D4AF37', // Dourado Sóbrio
          '#38BDF8', // Azul Claro
          '#A855F7', // Púrpura Internacional
          '#64748B'  // Muted Slate
        ],
        borderWidth: 2,
        borderColor: '#FFFFFF'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            font: { family: 'Inter', size: 11 },
            boxWidth: 10,
            padding: 10
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const val = context.parsed;
              return ` ${context.label}: R$ ${val.toLocaleString('pt-BR')}`;
            }
          }
        }
      },
      cutout: '65%'
    }
  });
}

/**
 * Inicializa o gráfico de rentabilidade acumulada (Carteira x CDI x Ibovespa)
 */
function initPortalLineChart() {
  const ctx = document.getElementById('portalLineChart');
  if (!ctx) return;

  if (portalLineChartInstance) {
    portalLineChartInstance.destroy();
  }

  const months = ['Jan/25', 'Mar/25', 'Mai/25', 'Jul/25', 'Set/25', 'Nov/25', 'Jan/26', 'Mar/26', 'Mai/26', 'Jul/26', 'Set/26', 'Nov/26'];
  const walletGrowth = [100, 102.8, 105.4, 108.9, 112.5, 116.1, 119.8, 123.5, 126.9, 130.4, 132.8, 134.2];
  const cdiGrowth =    [100, 101.8, 103.6, 105.5, 107.5, 109.6, 111.7, 113.8, 116.0, 118.2, 120.5, 122.8];
  const ibovGrowth =   [100, 104.2,  98.5, 103.1, 107.0, 104.8, 109.2, 114.5, 110.8, 112.4, 117.1, 115.4];

  portalLineChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: months,
      datasets: [
        {
          label: 'Sua Carteira Prime Wealth (+34,2%)',
          data: walletGrowth,
          borderColor: '#D4AF37',
          backgroundColor: 'rgba(212, 175, 55, 0.1)',
          borderWidth: 3,
          tension: 0.3,
          fill: true,
          pointRadius: 3,
          pointBackgroundColor: '#D4AF37'
        },
        {
          label: '100% CDI (+22,8%)',
          data: cdiGrowth,
          borderColor: '#1E3A5F',
          borderWidth: 2,
          tension: 0.3,
          fill: false,
          pointRadius: 2,
          pointBackgroundColor: '#1E3A5F'
        },
        {
          label: 'IBOVESPA (+15,4%)',
          data: ibovGrowth,
          borderColor: '#38BDF8',
          borderWidth: 1.5,
          borderDash: [4, 4],
          tension: 0.3,
          fill: false,
          pointRadius: 2,
          pointBackgroundColor: '#38BDF8'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#0A192F',
          titleFont: { family: 'Plus Jakarta Sans', size: 12 },
          bodyFont: { family: 'Inter', size: 11 },
          callbacks: {
            label: function(ctx) {
              const gain = (ctx.parsed.y - 100).toFixed(1);
              return `${ctx.dataset.label.split(' ')[0]}: +${gain}% acumulado`;
            }
          }
        }
      },
      scales: {
        y: {
          grid: { color: '#E2E8F0' },
          ticks: {
            callback: function(val) {
              return (val - 100) + '%';
            }
          }
        },
        x: {
          grid: { display: false }
        }
      }
    }
  });
}

/**
 * Alterna a visibilidade dos saldos na tela
 */
function toggleBalanceVisibility() {
  const eyeBtn = document.getElementById('toggleBalanceVisibility');
  const eyeIcon = document.getElementById('eyeIcon');
  const totalNet = document.getElementById('portalTotalNet');
  const rentability = document.getElementById('portalRentability');
  const dividends = document.getElementById('portalDividends');
  const cash = document.getElementById('portalCash');

  if (!eyeIcon || !totalNet) return;

  isBalanceHidden = !isBalanceHidden;

  if (isBalanceHidden) {
    eyeIcon.classList.remove('fa-eye');
    eyeIcon.classList.add('fa-eye-slash');
    totalNet.textContent = "••••••••••";
    rentability.textContent = "••••••";
    dividends.textContent = "••••••••";
    cash.textContent = "••••••••";
  } else {
    eyeIcon.classList.remove('fa-eye-slash');
    eyeIcon.classList.add('fa-eye');
    totalNet.textContent = ORIGINAL_BALANCES.total;
    rentability.textContent = ORIGINAL_BALANCES.rentability;
    dividends.textContent = ORIGINAL_BALANCES.dividends;
    cash.textContent = ORIGINAL_BALANCES.cash;
  }
}

/**
 * Simula o download do informe de rendimentos ou extrato
 */
function simulateDownloadIR() {
  showDashboardToast("Gerando arquivo de Informe de Rendimentos IRPF 2026...");
  setTimeout(() => {
    showDashboardToast("Download concluído: 'Informe_Rendimentos_2026_PrimeWealth.pdf'");
  }, 1200);
}

/**
 * Exibe notificações toast na tela
 */
function showDashboardToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-circle-check text-gold"></i> <span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Inicialização dos elementos do Dashboard
document.addEventListener('DOMContentLoaded', () => {
  initPortalTabs();
  initPortalDonutChart();
  initPortalLineChart();

  const eyeBtn = document.getElementById('toggleBalanceVisibility');
  if (eyeBtn) {
    eyeBtn.addEventListener('click', toggleBalanceVisibility);
  }
});
