/**
 * PRIME WEALTH INVESTIMENTOS - TESTE DE PERFIL DE INVESTIDOR (SUITABILITY)
 * Questionário regulamentado pela CVM e ANBIMA para mapeamento de risco
 */

const SUITABILITY_QUESTIONS = [
  {
    id: 1,
    title: "1. Qual é o seu objetivo principal ao investir o seu patrimônio?",
    options: [
      { text: "Preservar meu capital a qualquer custo, aceitando uma rentabilidade menor para não correr riscos de perdas.", score: 1 },
      { text: "Obter rendimentos consistentes e previsíveis superiores à inflação, com segurança no médio prazo.", score: 2 },
      { text: "Multiplicar meu patrimônio no longo prazo, mesmo enfrentando oscilações pontuais de mercado.", score: 3 },
      { text: "Maximizar os retornos absolutos através de estratégias agressivas, aceitando alta volatilidade e risco.", score: 4 }
    ]
  },
  {
    id: 2,
    title: "2. Por quanto tempo você planeja manter seus recursos investidos sem precisar de resgates?",
    options: [
      { text: "Posso precisar do dinheiro a qualquer instante (necessito de liquidez imediata diária).", score: 1 },
      { text: "De 1 a 3 anos (planejamento de curto a médio prazo).", score: 2 },
      { text: "De 3 a 7 anos (projetos de médio a longo prazo).", score: 3 },
      { text: "Acima de 7 a 10 anos ou foco em aposentadoria/independência financeira.", score: 4 }
    ]
  },
  {
    id: 3,
    title: "3. Se os seus investimentos sofressem uma desvalorização temporária de 10% devido a oscilações normais da economia, qual seria a sua reação imediata?",
    options: [
      { text: "Ficaria desesperado(a) e resgataria tudo imediatamente para não perder mais nada.", score: 1 },
      { text: "Ficaria preocupado(a), mas aguardaria alguns meses antes de tomar uma decisão precipitada.", score: 2 },
      { text: "Entenderia que faz parte da volatilidade natural e manteria minha estratégia inalterada.", score: 3 },
      { text: "Aproveitaria a queda dos preços como uma oportunidade rara de comprar mais ativos com desconto.", score: 4 }
    ]
  },
  {
    id: 4,
    title: "4. Qual é o seu nível de familiaridade e experiência prévia com o mercado de capitais?",
    options: [
      { text: "Nenhuma experiência ou apenas utilizei caderneta de poupança até o momento.", score: 1 },
      { text: "Conheço e já investi em títulos de Renda Fixa básicos (CDBs, Tesouro Direto, LCIs).", score: 2 },
      { text: "Já invisto regularmente em Fundos Imobiliários, Ações ou Fundos Multimercado.", score: 3 },
      { text: "Tenho ampla experiência com análise de balanços, derivativos, mercado exterior e criptoativos.", score: 4 }
    ]
  }
];

const PROFILES = {
  conservador: {
    name: "Conservador",
    icon: "fa-shield-halved",
    description: "Sua prioridade primordial é a preservação e segurança do capital, buscando liquidez e rendimentos estáveis sem expor o patrimônio a oscilações bruscas.",
    chartData: [75, 10, 10, 5],
    chartLabels: ["Renda Fixa Pós-Fixada / Tesouro", "Renda Fixa IPCA+", "FIIs de Tijolo / Baixo Risco", "Caixa Imediato"],
    chartColors: ["#D4AF37", "#1E3A5F", "#38BDF8", "#94A3B8"],
    recommended: [
      { name: "Tesouro Selic & Prefixado Curto", pct: "40%" },
      { name: "CDBs Bancários com Garantia FGC (até 120% CDI)", pct: "35%" },
      { name: "LCI / LCA Isentas de Imposto de Renda", pct: "15%" },
      { name: "Fundos Renda Fixa Referenciados DI", pct: "10%" }
    ]
  },
  moderado: {
    name: "Moderado",
    icon: "fa-scale-balanced",
    description: "Você equilibra segurança e busca por rentabilidades expressivas acima do CDI. Aceita oscilações controladas no curto prazo em troca de valorização real e renda passiva no médio e longo prazo.",
    chartData: [45, 20, 20, 15],
    chartLabels: ["Renda Fixa (CDBs & IPCA+)", "Fundos Imobiliários (FIIs)", "Ações / Dividendos", "Internacional (S&P 500)"],
    chartColors: ["#1E3A5F", "#D4AF37", "#38BDF8", "#A855F7"],
    recommended: [
      { name: "Tesouro IPCA+ e Debêntures Incentivadas", pct: "45%" },
      { name: "Top Fundos Imobiliários (Renda Mensal Isenta)", pct: "20%" },
      { name: "Ações de Empresas Sólidas Boas Pagadoras de Dividendos", pct: "20%" },
      { name: "BDRs e ETFs Globais (Exposição Dólar)", pct: "15%" }
    ]
  },
  arrojado: {
    name: "Arrojado",
    icon: "fa-chart-line-up",
    description: "Seu foco é a maximização do patrimônio no longo prazo. Você possui alto conhecimento de mercado e tolerância emocional à volatilidade, capturando o prêmio de risco em ativos de renda variável globais.",
    chartData: [20, 35, 25, 20],
    chartLabels: ["Renda Fixa Oportunística", "Ações Brasil (Small & Large Caps)", "Investimentos Internacionais (EUA)", "Fundos Imobiliários & Alternativos"],
    chartColors: ["#1E3A5F", "#38BDF8", "#A855F7", "#D4AF37"],
    recommended: [
      { name: "Carteira Recomendada Alpha de Ações Brasileiras", pct: "35%" },
      { name: "Conta Internacional (Ações e REITs na NYSE/NASDAQ)", pct: "25%" },
      { name: "Fundos Imobiliários e Fundos de Crédito High Yield", pct: "20%" },
      { name: "Renda Fixa IPCA+ Longa (Ganho de Capital em Marcação a Mercado)", pct: "20%" }
    ]
  }
};

let currentQuestionIndex = 0;
let userScores = [];
let suitabilityChartInstance = null;

/**
 * Inicializa e renderiza a pergunta atual
 */
function renderQuestion() {
  const quizBody = document.getElementById('quizBody');
  const quizProgressFill = document.getElementById('quizProgressFill');
  const quizStepIndicator = document.getElementById('quizStepIndicator');
  const quizResult = document.getElementById('quizResult');

  if (!quizBody) return;

  // Se já respondeu todas
  if (currentQuestionIndex >= SUITABILITY_QUESTIONS.length) {
    showSuitabilityResult();
    return;
  }

  // Atualiza indicadores
  quizResult.classList.add('hidden');
  quizBody.classList.remove('hidden');

  const question = SUITABILITY_QUESTIONS[currentQuestionIndex];
  const progressPct = ((currentQuestionIndex + 1) / SUITABILITY_QUESTIONS.length) * 100;

  quizProgressFill.style.width = `${progressPct}%`;
  quizStepIndicator.textContent = `Pergunta ${currentQuestionIndex + 1} de ${SUITABILITY_QUESTIONS.length}`;

  let optionsHTML = '';
  question.options.forEach((opt, idx) => {
    optionsHTML += `
      <div class="quiz-option-card" onclick="selectSuitabilityOption(${opt.score})">
        <div class="option-radio-dot"></div>
        <div class="option-text">${opt.text}</div>
      </div>
    `;
  });

  quizBody.innerHTML = `
    <h3 class="quiz-question-title">${question.title}</h3>
    <div class="quiz-options-list">
      ${optionsHTML}
    </div>
  `;
}

/**
 * Processa a escolha do usuário
 */
function selectSuitabilityOption(score) {
  userScores.push(score);
  currentQuestionIndex++;
  renderQuestion();
}

/**
 * Exibe o resultado e a alocação recomendada
 */
function showSuitabilityResult() {
  const quizBody = document.getElementById('quizBody');
  const quizResult = document.getElementById('quizResult');
  const quizStepIndicator = document.getElementById('quizStepIndicator');
  const quizProgressFill = document.getElementById('quizProgressFill');

  quizBody.classList.add('hidden');
  quizResult.classList.remove('hidden');
  quizStepIndicator.textContent = "Perfil Identificado com Sucesso";
  quizProgressFill.style.width = "100%";

  // Soma as pontuações (min 4, max 16)
  const totalScore = userScores.reduce((acc, curr) => acc + curr, 0);

  let profileKey = 'moderado';
  if (totalScore <= 7) {
    profileKey = 'conservador';
  } else if (totalScore <= 12) {
    profileKey = 'moderado';
  } else {
    profileKey = 'arrojado';
  }

  const profile = PROFILES[profileKey];

  // Preenche dados do perfil
  document.getElementById('resultProfileName').textContent = profile.name;
  document.getElementById('resultProfileDesc').textContent = profile.description;

  // Renderiza a lista de produtos sugeridos
  const recList = document.getElementById('recommendedProductsList');
  if (recList) {
    recList.innerHTML = profile.recommended.map(item => `
      <div class="rec-item">
        <span class="rec-item-title"><i class="fa-solid fa-check text-gold"></i> ${item.name}</span>
        <span class="rec-item-pct">${item.pct}</span>
      </div>
    `).join('');
  }

  // Renderiza o gráfico Donut de Alocação
  renderSuitabilityDonut(profile);
}

/**
 * Renderiza o gráfico Donut de Alocação Recomendada
 */
function renderSuitabilityDonut(profile) {
  const ctx = document.getElementById('suitabilityChart');
  if (!ctx) return;

  if (suitabilityChartInstance) {
    suitabilityChartInstance.destroy();
  }

  suitabilityChartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: profile.chartLabels,
      datasets: [{
        data: profile.chartData,
        backgroundColor: profile.chartColors,
        borderColor: '#FFFFFF',
        borderWidth: 2,
        hoverOffset: 4
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
            padding: 12
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return ` ${context.label}: ${context.parsed}%`;
            }
          }
        }
      },
      cutout: '68%'
    }
  });
}

/**
 * Reinicia o questionário
 */
function restartSuitability() {
  currentQuestionIndex = 0;
  userScores = [];
  renderQuestion();
}

// Inicializa o suitability no carregamento
document.addEventListener('DOMContentLoaded', () => {
  const btnRestart = document.getElementById('btnRestartQuiz');
  if (btnRestart) {
    btnRestart.addEventListener('click', restartSuitability);
  }
  renderQuestion();
});
