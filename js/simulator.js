/**
 * PRIME WEALTH INVESTIMENTOS - SIMULADOR DE JUROS COMPOSTOS E RENTABILIDADE
 * Simulação comparativa em tempo real: Carteira Prime Wealth x Poupança x Aportes de Bolso
 */

let simChartInstance = null;

// Taxas anuais estimadas (baseadas no cenário macroeconômico atual)
const RATES = {
  poupanca: 0.0617, // ~6,17% a.a. (regra Poupança com Selic > 8.5%)
  cdi: 0.1040,      // 10,40% a.a.
  benchmarks: {
    conservative: 0.1144, // 110% do CDI
    moderate: 0.1331,     // 128% do CDI
    bold: 0.1508          // 145% do CDI
  }
};

/**
 * Converte valor numérico em moeda brasileira formatada (BRL)
 */
function formatBRL(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0
  }).format(value);
}

/**
 * Calcula juros compostos com aportes mensais recorrentes
 */
function calculateCompoundGrowth(initial, monthly, years, annualRate) {
  const months = years * 12;
  const monthlyRate = Math.pow(1 + annualRate, 1 / 12) - 1;
  const timeline = [];
  
  let currentTotal = initial;
  let totalInvested = initial;

  for (let m = 0; m <= months; m++) {
    if (m > 0) {
      currentTotal = currentTotal * (1 + monthlyRate) + monthly;
      totalInvested += monthly;
    }

    // Grava marcos anuais para alimentar o gráfico
    if (m % 12 === 0 || m === months) {
      const year = Math.floor(m / 12);
      timeline.push({
        year: `Ano ${year}`,
        accumulated: Math.round(currentTotal),
        invested: Math.round(totalInvested)
      });
    }
  }

  return {
    finalTotal: currentTotal,
    totalInvested: totalInvested,
    timeline: timeline
  };
}

/**
 * Atualiza o simulador e redesenha o gráfico
 */
function updateSimulator() {
  const initialInput = document.getElementById('initialDeposit');
  const monthlyInput = document.getElementById('monthlyDeposit');
  const yearsInput = document.getElementById('investmentYears');
  const benchmarkSelect = document.getElementById('simBenchmarkSelect');

  if (!initialInput || !monthlyInput || !yearsInput) return;

  const initial = parseFloat(initialInput.value) || 0;
  const monthly = parseFloat(monthlyInput.value) || 0;
  const years = parseInt(yearsInput.value, 10) || 1;
  const benchmarkKey = benchmarkSelect ? benchmarkSelect.value : 'moderate';
  const verticeRate = RATES.benchmarks[benchmarkKey] || RATES.benchmarks.moderate;

  // Atualiza mostradores de texto dos sliders
  document.getElementById('initialDepositDisplay').textContent = formatBRL(initial);
  document.getElementById('monthlyDepositDisplay').textContent = formatBRL(monthly);
  document.getElementById('investmentYearsDisplay').textContent = `${years} ${years === 1 ? 'ano' : 'anos'} (${years * 12} meses)`;

  // Realiza os cálculos
  const verticeSim = calculateCompoundGrowth(initial, monthly, years, verticeRate);
  const poupancaSim = calculateCompoundGrowth(initial, monthly, years, RATES.poupanca);

  const interestGained = verticeSim.finalTotal - verticeSim.totalInvested;
  const difference = verticeSim.finalTotal - poupancaSim.finalTotal;

  // Atualiza KPIs numéricos
  document.getElementById('kpiTotalInvested').textContent = formatBRL(verticeSim.totalInvested);
  document.getElementById('kpiAccumulatedVertice').textContent = formatBRL(verticeSim.finalTotal);
  document.getElementById('kpiInterestGained').textContent = `+ ${formatBRL(interestGained)} em juros líquidos`;
  document.getElementById('kpiAccumulatedPoupanca').textContent = formatBRL(poupancaSim.finalTotal);
  document.getElementById('kpiDifference').textContent = `Você ganha ${formatBRL(difference)} a mais que a poupança`;

  // Atualiza ou inicializa o gráfico Chart.js
  renderSimulatorChart(verticeSim.timeline, poupancaSim.timeline);
}

/**
 * Renderiza o gráfico de curvas de acumulação
 */
function renderSimulatorChart(verticeTimeline, poupancaTimeline) {
  const ctx = document.getElementById('simulatorChart');
  if (!ctx) return;

  const labels = verticeTimeline.map(item => item.year);
  const dataVertice = verticeTimeline.map(item => item.accumulated);
  const dataPoupanca = poupancaTimeline.map(item => item.accumulated);
  const dataInvested = verticeTimeline.map(item => item.invested);

  if (simChartInstance) {
    simChartInstance.data.labels = labels;
    simChartInstance.data.datasets[0].data = dataVertice;
    simChartInstance.data.datasets[1].data = dataPoupanca;
    simChartInstance.data.datasets[2].data = dataInvested;
    simChartInstance.update();
    return;
  }

  simChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Carteira Prime Wealth',
          data: dataVertice,
          borderColor: '#D4AF37',
          backgroundColor: 'rgba(212, 175, 55, 0.12)',
          borderWidth: 3,
          fill: true,
          tension: 0.35,
          pointRadius: 3,
          pointBackgroundColor: '#D4AF37'
        },
        {
          label: 'Poupança Tradicional',
          data: dataPoupanca,
          borderColor: '#94A3B8',
          borderWidth: 2,
          borderDash: [5, 5],
          fill: false,
          tension: 0.35,
          pointRadius: 2,
          pointBackgroundColor: '#94A3B8'
        },
        {
          label: 'Total Investido do Bolso',
          data: dataInvested,
          borderColor: '#1E3A5F',
          borderWidth: 2,
          fill: false,
          tension: 0,
          pointRadius: 0
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            font: { family: 'Inter', size: 12 },
            usePointStyle: true,
            boxWidth: 8
          }
        },
        tooltip: {
          backgroundColor: '#0A192F',
          titleFont: { family: 'Plus Jakarta Sans', size: 13, weight: 'bold' },
          bodyFont: { family: 'Inter', size: 12 },
          padding: 12,
          callbacks: {
            label: function(context) {
              return `${context.dataset.label}: ${formatBRL(context.parsed.y)}`;
            }
          }
        }
      },
      scales: {
        y: {
          grid: { color: '#E2E8F0' },
          ticks: {
            font: { family: 'Inter', size: 11 },
            callback: function(val) {
              if (val >= 1000000) return 'R$ ' + (val / 1000000).toFixed(1) + 'M';
              if (val >= 1000) return 'R$ ' + (val / 1000).toFixed(0) + 'k';
              return 'R$ ' + val;
            }
          }
        },
        x: {
          grid: { display: false },
          ticks: { font: { family: 'Inter', size: 11 } }
        }
      }
    }
  });
}

// Inicialização dos eventos do Simulador
document.addEventListener('DOMContentLoaded', () => {
  const initialInput = document.getElementById('initialDeposit');
  const monthlyInput = document.getElementById('monthlyDeposit');
  const yearsInput = document.getElementById('investmentYears');
  const benchmarkSelect = document.getElementById('simBenchmarkSelect');

  if (initialInput && monthlyInput && yearsInput) {
    initialInput.addEventListener('input', updateSimulator);
    monthlyInput.addEventListener('input', updateSimulator);
    yearsInput.addEventListener('input', updateSimulator);
    if (benchmarkSelect) benchmarkSelect.addEventListener('change', updateSimulator);

    // Primeira renderização
    updateSimulator();
  }
});
