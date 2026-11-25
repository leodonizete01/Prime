/**
 * PRIME WEALTH INVESTIMENTOS - APLICAÇÃO PRINCIPAL (APP.JS)
 * Catálogo de produtos, filtros, glossário, modais, FAQ e lógica institucional
 */

// =========================================================================
// 1. BASE DE DADOS DO CATÁLOGO DE PRODUTOS
// =========================================================================
const PRODUCTS_DATA = [
  // Renda Fixa
  {
    category: 'renda-fixa',
    categoryName: 'Renda Fixa',
    name: 'CDB Banco Master 130% CDI',
    issuer: 'Banco Master S.A. • Garantia FGC',
    returnVal: '130% do CDI',
    returnSub: 'Rentabilidade líquida diferenciada',
    risk: 2,
    riskLabel: 'Baixo (2/5)',
    liquidity: 'Vencimento',
    liquidityLabel: 'No Vencimento (Nov/2028)',
    minInvestment: 'R$ 1.000,00',
    tax: 'IR Regressivo (15% a 22,5%)'
  },
  {
    category: 'renda-fixa',
    categoryName: 'Renda Fixa',
    name: 'Tesouro IPCA+ 2035',
    issuer: 'Tesouro Nacional • Risco Soberano',
    returnVal: 'IPCA + 6,75% a.a.',
    returnSub: 'Ganho real garantido contra a inflação',
    risk: 1,
    riskLabel: 'Muito Baixo (1/5)',
    liquidity: 'D+0',
    liquidityLabel: 'Resgate D+0 pelo Tesouro',
    minInvestment: 'R$ 38,50',
    tax: 'IR Regressivo (15% a 22,5%)'
  },
  {
    category: 'renda-fixa',
    categoryName: 'Renda Fixa',
    name: 'LCI BTG Pactual 94% CDI',
    issuer: 'Banco BTG Pactual • Garantia FGC',
    returnVal: '94% do CDI (Isento IR)',
    returnSub: 'Equivale a um CDB de 118% do CDI',
    risk: 1,
    riskLabel: 'Muito Baixo (1/5)',
    liquidity: 'D+1',
    liquidityLabel: 'Após carência de 90 dias',
    minInvestment: 'R$ 1.000,00',
    tax: '100% ISENTO de IR'
  },
  {
    category: 'renda-fixa',
    categoryName: 'Renda Fixa',
    name: 'CDB Reserva Imediata Prime Wealth',
    issuer: 'Banco Sofisa Direto • Garantia FGC',
    returnVal: '104% do CDI',
    returnSub: 'Liquidez para reserva de emergência',
    risk: 1,
    riskLabel: 'Muito Baixo (1/5)',
    liquidity: 'D+0',
    liquidityLabel: 'Liquidez Diária Imediata',
    minInvestment: 'R$ 10,00',
    tax: 'IR Regressivo'
  },

  // Renda Variável & FIIs
  {
    category: 'renda-variavel',
    categoryName: 'Fundo Imobiliário',
    name: 'HGLG11 - CSHG Logística',
    issuer: 'Credit Suisse Hedging-Griffo • B3',
    returnVal: 'DY 10,4% a.a.',
    returnSub: 'Aluguéis mensais isentos de Imposto de Renda',
    risk: 3,
    riskLabel: 'Moderado (3/5)',
    liquidity: 'D+2',
    liquidityLabel: 'Negociado em bolsa (D+2)',
    minInvestment: 'R$ 164,00',
    tax: 'Rendimentos Isentos de IR'
  },
  {
    category: 'renda-variavel',
    categoryName: 'Fundo Imobiliário',
    name: 'XPML11 - XP Malls',
    issuer: 'XP Vista Asset Management • B3',
    returnVal: 'DY 9,8% a.a.',
    returnSub: 'Portfólio de 17 shopping centers premium',
    risk: 3,
    riskLabel: 'Moderado (3/5)',
    liquidity: 'D+2',
    liquidityLabel: 'Negociado em bolsa (D+2)',
    minInvestment: 'R$ 114,00',
    tax: 'Rendimentos Isentos de IR'
  },
  {
    category: 'renda-variavel',
    categoryName: 'Ações Selecionadas',
    name: 'Carteira Top Dividendos Prime Wealth',
    issuer: 'Comitê de Análise Fundamentalista',
    returnVal: 'DY 8,7% + Ganho de Capital',
    returnSub: 'Itaú, Vale, BB Seguridade e Engie',
    risk: 4,
    riskLabel: 'Arrojado (4/5)',
    liquidity: 'D+2',
    liquidityLabel: 'Liquidação D+2 na B3',
    minInvestment: 'R$ 500,00',
    tax: 'Isenção até R$ 20k/mês nas vendas'
  },
  {
    category: 'renda-variavel',
    categoryName: 'Ações Growth',
    name: 'Prime Wealth Small Caps Alpha',
    issuer: 'Seleção Ativa de Empresas Exponenciais',
    returnVal: 'Benchmark SMLL + 7,2% a.a.',
    returnSub: 'Empresas líderes em forte expansão',
    risk: 5,
    riskLabel: 'Agressivo (5/5)',
    liquidity: 'D+2',
    liquidityLabel: 'Bolsa de Valores B3',
    minInvestment: 'R$ 1.000,00',
    tax: '15% sobre o ganho de capital'
  },

  // Fundos de Investimento
  {
    category: 'fundos',
    categoryName: 'Multimercado',
    name: 'Prime Wealth Macro FIC FIM',
    issuer: 'Prime Wealth Asset Management',
    returnVal: '138% do CDI (36M)',
    returnSub: 'Estratégia macro global em juros, moedas e bolsa',
    risk: 4,
    riskLabel: 'Arrojado (4/5)',
    liquidity: 'D+30',
    liquidityLabel: 'Resgate em D+30 úteis',
    minInvestment: 'R$ 1.000,00',
    tax: 'Come-cotas semestral (15%)'
  },
  {
    category: 'fundos',
    categoryName: 'Renda Fixa Crédito Privado',
    name: 'Sparta Top Crédito FIC FIRF',
    issuer: 'Sparta Administradora de Recursos',
    returnVal: '115% do CDI Líquido',
    returnSub: 'Debêntures e CRIs de empresas grau de investimento',
    risk: 2,
    riskLabel: 'Baixo (2/5)',
    liquidity: 'D+15',
    liquidityLabel: 'Resgate em D+15 corridos',
    minInvestment: 'R$ 500,00',
    tax: 'Come-cotas semestral'
  },
  {
    category: 'fundos',
    categoryName: 'Fundo de Ações',
    name: 'Real Investor Ações FIC FIA',
    issuer: 'Real Investor Gestão de Recursos',
    returnVal: '19,4% a.a. Histórico',
    returnSub: 'Filosofia Value Investing consagrada',
    risk: 5,
    riskLabel: 'Agressivo (5/5)',
    liquidity: 'D+32',
    liquidityLabel: 'Resgate em D+32 úteis',
    minInvestment: 'R$ 1.000,00',
    tax: '15% de IR apenas no resgate'
  },

  // Previdência Privada
  {
    category: 'previdencia',
    categoryName: 'Previdência PGBL / VGBL',
    name: 'Prime Wealth Futuro IPCA+ Previdência',
    issuer: 'Icatu Seguros & Prime Wealth Asset',
    returnVal: 'IPCA + 6,20% a.a.',
    returnSub: 'Dedução de até 12% da renda bruta no IRPF',
    risk: 2,
    riskLabel: 'Baixo (2/5)',
    liquidity: 'D+1',
    liquidityLabel: 'Longo prazo (Portabilidade grátis)',
    minInvestment: 'R$ 200,00/mês',
    tax: 'Tabela Regressiva (até 10% de IR)'
  },
  {
    category: 'previdencia',
    categoryName: 'Previdência Multimercado',
    name: 'Ibiuna Previdência FIC FIM',
    issuer: 'Ibiuna Investimentos',
    returnVal: '124% do CDI',
    returnSub: 'Excelente para planejamento sucessório',
    risk: 3,
    riskLabel: 'Moderado (3/5)',
    liquidity: 'D+30',
    liquidityLabel: 'Sem taxa de carregamento',
    minInvestment: 'R$ 500,00',
    tax: 'Sem come-cotas'
  },

  // Internacional & Global
  {
    category: 'internacional',
    categoryName: 'Ativo Global (B3 / NYSE)',
    name: 'IVVB11 - S&P 500 Dolarizado',
    issuer: 'BlackRock Brasil • Negociado na B3',
    returnVal: 'Variação S&P 500 + Dólar',
    returnSub: 'Exposição direta às 500 maiores empresas americanas',
    risk: 4,
    riskLabel: 'Arrojado (4/5)',
    liquidity: 'D+2',
    liquidityLabel: 'Bolsa de Valores (D+2)',
    minInvestment: 'R$ 315,00',
    tax: '15% sobre o ganho de capital'
  },
  {
    category: 'internacional',
    categoryName: 'Renda Fixa Global (EUA)',
    name: 'US Treasury Bonds 10 Anos (Conta Global)',
    issuer: 'Governo dos Estados Unidos (Treasury)',
    returnVal: '4,45% a.a. em Dólares (USD)',
    returnSub: 'O título mais seguro do sistema financeiro mundial',
    risk: 1,
    riskLabel: 'Muito Baixo (1/5)',
    liquidity: 'D+1',
    liquidityLabel: 'Liquidez Diária no mercado dos EUA',
    minInvestment: 'US$ 100,00',
    tax: '15% de IR sobre rendimentos no exterior'
  }
];

// =========================================================================
// 2. BASE DO GLOSSÁRIO FINANCEIRO
// =========================================================================
const GLOSSARY_TERMS = [
  {
    term: "CDI (Certificado de Depósito Interbancário)",
    def: "Taxa média de juros cobrada nos empréstimos diários entre bancos. É a régua e benchmark padrão da renda fixa no Brasil."
  },
  {
    term: "Taxa SELIC",
    def: "Taxa básica de juros da economia brasileira, fixada a cada 45 dias pelo Comitê de Política Monetária (COPOM) do Banco Central."
  },
  {
    term: "FGC (Fundo Garantidor de Créditos)",
    def: "Entidade que protege investidores de bancos e corretoras, garantindo até R$ 250.000 por CPF e por conglomerado financeiro em caso de intervenção ou falência."
  },
  {
    term: "Marcação a Mercado (MtM)",
    def: "Atualização diária do preço dos títulos de renda fixa de acordo com o valor pelo qual poderiam ser negociados no mercado secundário."
  },
  {
    term: "Come-Cotas",
    def: "Antecipação semestral do recolhimento de Imposto de Renda que incide sobre os lucros de fundos de renda fixa e multimercados nos meses de maio e novembro."
  },
  {
    term: "Dividend Yield (DY)",
    def: "Indicador financeiro que mede a relação entre os proventos pagos por uma empresa ou fundo imobiliário nos últimos 12 meses e o preço atual da sua cota."
  },
  {
    term: "Duration",
    def: "Métrica que calcula o tempo médio que o investidor leva para recuperar o capital investido em um título, refletindo sua sensibilidade às variações de juros."
  },
  {
    term: "PGBL vs. VGBL",
    def: "Modelos de previdência. O PGBL permite deduzir até 12% da renda bruta tributável na declaração completa do IRPF; o VGBL é indicado para quem faz a simplificada."
  },
  {
    term: "Alfa (Alpha)",
    def: "Capacidade de um gestor de gerar retorno excedente acima do benchmark de referência através da seleção apurada de ativos."
  }
];

// =========================================================================
// 3. FUNÇÕES DE RENDERIZAÇÃO DO CATÁLOGO DE PRODUTOS
// =========================================================================
let currentCatalogCategory = 'renda-fixa';

function renderProductsGrid() {
  const container = document.getElementById('productsGrid');
  if (!container) return;

  const searchInput = document.getElementById('productSearchInput');
  const riskSelect = document.getElementById('filterRiskSelect');
  const liquiditySelect = document.getElementById('filterLiquiditySelect');

  const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
  const selectedRisk = riskSelect ? riskSelect.value : 'all';
  const selectedLiquidity = liquiditySelect ? liquiditySelect.value : 'all';

  // Filtra produtos
  const filtered = PRODUCTS_DATA.filter(item => {
    // Categoria
    if (currentCatalogCategory !== 'all' && item.category !== currentCatalogCategory) {
      return false;
    }
    // Risco
    if (selectedRisk !== 'all' && item.risk.toString() !== selectedRisk) {
      return false;
    }
    // Liquidez
    if (selectedLiquidity !== 'all' && !item.liquidity.includes(selectedLiquidity)) {
      return false;
    }
    // Busca textual
    if (searchTerm) {
      const matchName = item.name.toLowerCase().includes(searchTerm);
      const matchIssuer = item.issuer.toLowerCase().includes(searchTerm);
      const matchReturn = item.returnVal.toLowerCase().includes(searchTerm);
      if (!matchName && !matchIssuer && !matchReturn) return false;
    }
    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; background: #FFF; border-radius: 16px; border: 1px solid var(--color-card-border);">
        <i class="fa-solid fa-filter-circle-xmark" style="font-size: 2.5rem; color: var(--color-muted); margin-bottom: 1rem;"></i>
        <h3 style="color: var(--color-primary); font-size: 1.2rem; margin-bottom: 0.5rem;">Nenhum produto encontrado</h3>
        <p style="color: var(--color-muted); font-size: 0.9rem;">Tente ajustar os filtros de risco, liquidez ou o termo de busca.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => `
    <div class="product-card">
      <div class="product-card-top">
        <span class="product-category-tag">${item.categoryName}</span>
        <span class="product-risk-badge risk-${item.risk}">${item.riskLabel}</span>
      </div>

      <h3 class="product-name">${item.name}</h3>
      <p class="product-issuer">${item.issuer}</p>

      <div class="product-return-box">
        <span class="return-label">Rentabilidade Alvo / Histórica</span>
        <span class="return-val">${item.returnVal}</span>
        <small style="display: block; font-size: 0.72rem; color: var(--color-muted); margin-top: 2px;">${item.returnSub}</small>
      </div>

      <div class="product-meta-row">
        <div class="meta-item">
          <span>Liquidez:</span>
          <strong>${item.liquidityLabel}</strong>
        </div>
        <div class="meta-item">
          <span>Aplicação Mínima:</span>
          <strong>${item.minInvestment}</strong>
        </div>
        <div class="meta-item" style="grid-column: span 2;">
          <span>Tributação / IR:</span>
          <strong>${item.tax}</strong>
        </div>
      </div>

      <div class="product-card-footer">
        <button class="btn btn-gold btn-block" onclick="openProductInvestModal('${item.name}')">
          <i class="fa-solid fa-arrow-trend-up"></i> Investir Agora
        </button>
      </div>
    </div>
  `).join('');
}

function initCatalogTabs() {
  const tabs = document.querySelectorAll('.products-tabs .tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      currentCatalogCategory = tab.getAttribute('data-category');
      renderProductsGrid();
    });
  });

  // Listeners nos filtros
  const searchInput = document.getElementById('productSearchInput');
  const riskSelect = document.getElementById('filterRiskSelect');
  const liquiditySelect = document.getElementById('filterLiquiditySelect');

  if (searchInput) searchInput.addEventListener('input', renderProductsGrid);
  if (riskSelect) riskSelect.addEventListener('change', renderProductsGrid);
  if (liquiditySelect) liquiditySelect.addEventListener('change', renderProductsGrid);
}

// =========================================================================
// 4. GLOSSÁRIO INTERATIVO
// =========================================================================
function renderGlossary(filterText = '') {
  const container = document.getElementById('glossaryGrid');
  if (!container) return;

  const normalized = filterText.toLowerCase().trim();
  const filtered = GLOSSARY_TERMS.filter(item => 
    item.term.toLowerCase().includes(normalized) || item.def.toLowerCase().includes(normalized)
  );

  if (filtered.length === 0) {
    container.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; color: var(--color-muted); padding: 2rem;">Nenhum termo encontrado para "${filterText}".</p>`;
    return;
  }

  container.innerHTML = filtered.map(item => `
    <div class="glossary-item">
      <div class="glossary-term">
        <span>${item.term}</span>
        <i class="fa-solid fa-book-bookmark text-gold" style="font-size: 0.85rem;"></i>
      </div>
      <p class="glossary-def">${item.def}</p>
    </div>
  `).join('');
}

function initGlossary() {
  const searchInput = document.getElementById('glossarySearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderGlossary(e.target.value);
    });
  }
  renderGlossary();
}

// =========================================================================
// 5. MINI GRÁFICO NA HERO SECTION
// =========================================================================
function initHeroMiniChart() {
  const ctx = document.getElementById('heroMiniChart');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov'],
      datasets: [{
        data: [320, 328, 332, 345, 349, 356, 362, 370, 375, 381, 384.5],
        borderColor: '#D4AF37',
        backgroundColor: 'rgba(212, 175, 55, 0.15)',
        borderWidth: 2.5,
        fill: true,
        tension: 0.4,
        pointRadius: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false }
      },
      scales: {
        x: { display: false },
        y: { display: false }
      }
    }
  });
}

// =========================================================================
// 6. FAQ EM ACORDEÃO
// =========================================================================
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Fecha todos os outros
      faqItems.forEach(other => {
        other.classList.remove('active');
        other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      // Se não estava ativo, abre
      if (!isActive) {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

// =========================================================================
// 7. SISTEMA DE MODAIS & FORMS
// =========================================================================
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

// Fecha modal clicando fora
window.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-backdrop')) {
    e.target.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// =========================================================================
// 7.1 AUTENTICAÇÃO: LOGIN & CADASTRO (ESTADO DINÂMICO)
// =========================================================================
let isUserLoggedIn = false;

function handleLoginSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('btnLoginSubmit');
  const inputEl = document.getElementById('loginIdentifier');
  const originalText = btn.innerHTML;

  btn.disabled = true;
  btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Autenticando...`;

  const rawInput = inputEl ? inputEl.value.trim() : '';
  let userName = 'Investidor';

  if (rawInput) {
    if (rawInput.includes('@')) {
      const emailPrefix = rawInput.split('@')[0];
      userName = emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1);
    } else if (!/^\d+$/.test(rawInput.replace(/[-.]/g, ''))) {
      userName = rawInput.charAt(0).toUpperCase() + rawInput.slice(1);
    } else {
      userName = 'Investidor Prime';
    }
  }

  setTimeout(() => {
    closeModal('modalLogin');
    btn.disabled = false;
    btn.innerHTML = originalText;

    // Ativa o estado logado
    setLoggedInState(true, userName);

    // Rola até a Área do Cliente e exibe notificação
    scrollToSection('area-cliente');
    showDashboardToast(`Login realizado com sucesso! Bem-vindo(a), ${userName}.`);
  }, 650);
}

function handleLogout() {
  setLoggedInState(false);
  scrollToSection('hero');
  showDashboardToast('Você saiu da sua conta com segurança.');
}

function setLoggedInState(loggedIn, userName = 'Investidor') {
  isUserLoggedIn = loggedIn;
  const lockedCard = document.getElementById('clientLockedCard');
  const portalCard = document.getElementById('clientPortalCard');
  const greetingEl = document.getElementById('portalUserGreeting');
  const avatarEl = document.getElementById('portalUserAvatar');
  const userMetaEl = document.getElementById('portalUserMeta');

  // Elementos do header
  const btnLogin   = document.getElementById('btnOpenLoginModal');
  const btnAccount = document.getElementById('btnOpenAccountModal');
  const btnLogout  = document.getElementById('btnLogoutHeader');
  const userInfo   = document.getElementById('headerUserInfo');
  const userNameEl = document.getElementById('headerUserName');

  if (loggedIn) {
    // Esconde tela de bloqueio e exibe dashboard
    if (lockedCard) lockedCard.style.display = 'none';
    if (portalCard) {
      portalCard.classList.remove('hidden-dashboard');
      portalCard.style.display = 'block';
    }

    if (greetingEl) greetingEl.innerHTML = `Olá, <strong>${userName}</strong>`;
    if (avatarEl) {
      const initials = userName.length >= 2 ? userName.substring(0, 2).toUpperCase() : 'IP';
      avatarEl.innerHTML = `<span>${initials}</span>`;
    }
    if (userMetaEl) {
      userMetaEl.innerHTML = `Conta Prime Wealth • Acesso Ativo`;
    }

    // Header: esconde Entrar/Abrir Conta, mostra pill e Sair
    if (btnLogin) btnLogin.style.display = 'none';
    if (btnAccount) btnAccount.style.display = 'none';
    if (btnLogout) btnLogout.style.display = 'inline-flex';
    if (userInfo) userInfo.style.display = 'inline-flex';
    if (userNameEl) userNameEl.textContent = userName;

    // Gera iniciais (ex: "Gabriel de Castro" → "GC")
    const initialsEl = document.getElementById('headerUserInitials');
    if (initialsEl) {
      const parts = userName.split(' ').filter(p => p.length > 0 && !['de','da','do','dos','das','e'].includes(p.toLowerCase()));
      let initials = 'IP';
      if (parts.length >= 2) {
        initials = (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
      } else if (parts.length === 1) {
        initials = parts[0].substring(0, 2).toUpperCase();
      }
      initialsEl.textContent = initials;
    }

    // Inicializa ou redimensiona gráficos agora que o container está visível
    setTimeout(() => {
      if (typeof initPortalDonutChart === 'function') initPortalDonutChart();
      if (typeof initPortalLineChart === 'function') initPortalLineChart();
    }, 150);

  } else {
    // Mostra tela de bloqueio e esconde dashboard
    if (lockedCard) lockedCard.style.display = 'block';
    if (portalCard) {
      portalCard.classList.add('hidden-dashboard');
      portalCard.style.display = 'none';
    }

    // Header: mostra Entrar/Abrir Conta, esconde pill e Sair
    if (btnLogin) btnLogin.style.display = 'inline-flex';
    if (btnAccount) btnAccount.style.display = 'inline-flex';
    if (btnLogout) btnLogout.style.display = 'none';
    if (userInfo) userInfo.style.display = 'none';
  }
}

function togglePasswordVisibility(inputId, iconId) {
  const input = document.getElementById(inputId);
  const icon = document.getElementById(iconId);
  if (!input || !icon) return;

  if (input.type === 'password') {
    input.type = 'text';
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash');
  } else {
    input.type = 'password';
    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye');
  }
}

function switchToRegisterModal() {
  closeModal('modalLogin');
  setTimeout(() => openModal('modalOpenAccount'), 200);
}

function switchToLoginModal() {
  closeModal('modalOpenAccount');
  setTimeout(() => openModal('modalLogin'), 200);
}

function handleForgotPassword() {
  closeModal('modalLogin');
  showDashboardToast('Instruções de redefinição de senha enviadas para o seu e-mail.');
}

// Abertura de Conta (Cadastro) — loga automaticamente ao criar
function handleAccountSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('accName').value.trim();
  if (!name) {
    showDashboardToast('Preencha todos os campos obrigatórios.', 'error');
    return;
  }
  closeModal('modalOpenAccount');

  // Loga o usuário automaticamente com o nome informado
  setLoggedInState(true, name);
  scrollToSection('area-cliente');
  showDashboardToast(`Parabéns, ${name}! Conta criada com sucesso. Você já está logado(a)!`);
  e.target.reset();
}

// Agendamento com Assessor
function handleAdvisorSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('advName').value;
  closeModal('modalAdvisor');
  showDashboardToast(`Obrigado, ${name}! Um assessor certificado CFP® entrará em contato em instantes.`);
  e.target.reset();
}

function openAdvisorModal() {
  openModal('modalAdvisor');
}

function openWhatsAppModal() {
  openModal('modalWhatsApp');
}

function openOuvidoriaModal() {
  openModal('modalOuvidoria');
}

function openProductInvestModal(productName) {
  openModal('modalLogin');
  const noteEl = document.getElementById('modalLoginTitle');
  if (noteEl) {
    noteEl.textContent = `Acessar Conta para Investir`;
  }
}

// =========================================================================
// 7.2 CHAT WHATSAPP INTERATIVO COM RESPOSTAS AUTOMÁTICAS
// =========================================================================
const WA_PRESET_ANSWERS = {
  'como-abrir-conta': {
    userText: "Como posso abrir minha conta na Prime Wealth?",
    botReply: "Para abrir sua conta na <strong>Prime Wealth</strong>, o processo é 100% digital e gratuito! 🚀<br><br>Você só precisa preencher o formulário com seus dados básicos (Nome, CPF e telefone). O cadastro é aprovado em até 10 minutos com taxa zero de abertura e custódia.<br><br><button class='btn btn-gold btn-sm mt-2' onclick='closeModal(\"modalWhatsApp\"); openModal(\"modalOpenAccount\");'><i class=\"fa-solid fa-user-plus\"></i> Abrir Conta Agora</button>"
  },
  'falar-assessor': {
    userText: "Gostaria de falar com um assessor exclusivo.",
    botReply: "Excelente! Nossos assessores de Wealth Management possuem certificações <strong>CFP®, CFA e ANBIMA</strong>. 💼<br><br>Podemos agendar uma reunião por videoconferência (Google Meet/Zoom) para avaliar seu patrimônio e desenhar sua carteira ideal.<br><br><button class='btn btn-gold btn-sm mt-2' onclick='closeModal(\"modalWhatsApp\"); openModal(\"modalAdvisor\");'><i class=\"fa-regular fa-calendar-check\"></i> Agendar Reunião Gratuita</button>"
  },
  'taxas-custos': {
    userText: "Quais são as taxas e custos para investir?",
    botReply: "Na Prime Wealth prezamos pela <strong>transparência absoluta</strong>:<br>• <strong>Renda Fixa e Tesouro:</strong> Taxa ZERO<br>• <strong>Fundos Imobiliários (FIIs):</strong> Corretagem ZERO<br>• <strong>Custódia:</strong> R$ 0/mês<br>• <strong>Fundos e Previdência:</strong> Taxa de carregamento ZERO<br><br>Sem cobranças ocultas!"
  },
  'garantia-fgc': {
    userText: "Como funciona a segurança e a garantia do FGC?",
    botReply: "Segurança de nível bancário! 🛡️<br><br>1. Seus títulos de Renda Fixa bancária (CDB, LCI e LCA) contam com garantia do <strong>FGC (Fundo Garantidor de Créditos)</strong> de até <strong>R$ 250.000 por CPF</strong>.<br>2. Seus títulos e ações ficam custodiados e registrados no seu próprio CPF na B3 e no SELIC."
  }
};

function sendInteractiveWaOption(key) {
  const data = WA_PRESET_ANSWERS[key];
  if (!data) return;

  // 1. Mensagem enviada pelo usuário
  appendWaMessage(data.userText, true);

  // 2. Indicador de digitação
  showWaTyping();

  // 3. Resposta automática após 600ms
  setTimeout(() => {
    hideWaTyping();
    appendWaMessage(data.botReply, false);
  }, 650);
}

function handleWaInputSubmit(e) {
  e.preventDefault();
  const input = document.getElementById('waCustomInput');
  if (!input) return;

  const text = input.value.trim();
  if (!text) return;

  // Adiciona a mensagem do usuário
  appendWaMessage(text, true);
  input.value = '';

  // Indicador de digitação
  showWaTyping();

  // Resposta inteligente contextual
  setTimeout(() => {
    hideWaTyping();
    const lower = text.toLowerCase();
    let reply = "Obrigado pela sua mensagem! Nossos assessores da Prime Wealth já registraram seu contato. Em horário comercial, um de nossos especialistas também pode te chamar por ligação ou videoconferência.";

    if (lower.includes('abrir') || lower.includes('conta') || lower.includes('cadastro')) {
      reply = "A abertura de conta é 100% gratuita! Você pode iniciá-la clicando em <strong>Abra sua Conta</strong> no menu ou no botão abaixo.<br><br><button class='btn btn-gold btn-sm' onclick='closeModal(\"modalWhatsApp\"); openModal(\"modalOpenAccount\");'>Abrir Conta Agora</button>";
    } else if (lower.includes('taxa') || lower.includes('custo') || lower.includes('corretagem')) {
      reply = "Trabalhamos com política de <strong>Taxa Zero</strong> em Renda Fixa, Tesouro Direto e Fundos Imobiliários, além de isenção total de taxa de custódia!";
    } else if (lower.includes('rentabilidade') || lower.includes('cdi') || lower.includes('rendimento')) {
      reply = "Você pode simular qualquer rentabilidade na nossa ferramenta interativa! Temos CDBs de até 130% do CDI e títulos IPCA+ travados a taxas excelentes.";
    } else if (lower.includes('seguran') || lower.includes('fgc') || lower.includes('cvm')) {
      reply = "Somos autorizados pelo Banco Central e credenciados pela CVM. Emissores bancários contam com garantia do FGC até R$ 250 mil por CPF.";
    }

    appendWaMessage(reply, false);
  }, 800);
}

function appendWaMessage(content, isSent) {
  const chatContainer = document.getElementById('waChatMessages');
  if (!chatContainer) return;

  const now = new Date();
  const timeStr = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  const msgDiv = document.createElement('div');
  msgDiv.className = `wa-message ${isSent ? 'sent' : 'received'}`;
  msgDiv.innerHTML = `
    <div>${content}</div>
    <span class="wa-time">${timeStr} ${isSent ? '<i class="fa-solid fa-check-double text-blue"></i>' : ''}</span>
  `;

  chatContainer.appendChild(msgDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function showWaTyping() {
  const chatContainer = document.getElementById('waChatMessages');
  if (!chatContainer || document.getElementById('waTypingElem')) return;

  const typing = document.createElement('div');
  typing.id = 'waTypingElem';
  typing.className = 'wa-typing-indicator';
  typing.innerHTML = `<span></span><span></span><span></span>`;

  chatContainer.appendChild(typing);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function hideWaTyping() {
  const elem = document.getElementById('waTypingElem');
  if (elem) elem.remove();
}

// Modal de Relatórios do Research
const REPORT_CONTENTS = {
  copom: {
    title: "Relatório Macro: Decisão de Juros do Copom e IPCA+",
    content: `
      <h4>Resumo Executivo</h4>
      <p>Em sua última reunião ordinária, o Comitê de Política Monetária (Copom) manteve a taxa básica Selic em 10,50% a.a., sinalizando cautela frente às expectativas de inflação de longo prazo e ao cenário macroeconômico global nos Estados Unidos.</p>
      <h4>Oportunidades em Títulos Públicos IPCA+</h4>
      <p>Com as taxas de juros reais negociando acima de IPCA + 6,5% a.a., observamos um dos momentos mais atrativos dos últimos 8 anos para travar rentabilidades reais expressivas. Recomendamos prazos médios e longos (Tesouro IPCA+ 2029 e 2035) com alocação recomendada de até 40% em carteiras conservadoras e moderadas.</p>
    `
  },
  fiis: {
    title: "Top 8 Fundos Imobiliários: Renda Mensal Isenta de IR",
    content: `
      <h4>Tese do Setor de Galpões e Lajes Corporativas</h4>
      <p>Os fundos de logística de alto padrão (galpões AAA com locatários como Mercado Livre, Shopee e Amazon) continuam apresentando taxas de vacância física abaixo de 5% e reajustes contratuais atrelados ao IPCA e IGP-M.</p>
      <h4>Destaques da Carteira Prime Wealth</h4>
      <p>Priorizamos HGLG11, BTLG11 e XPML11, com Dividend Yield médio anual projetado de 10,8% isento de tributação, além de potencial de valorização das cotas com a compressão das taxas futuras de juros.</p>
    `
  },
  global: {
    title: "Global Markets: Proteção Cambial e S&P 500",
    content: `
      <h4>A Importância da Descorrelação Geográfica</h4>
      <p>Manter 100% do patrimônio no Brasil expõe o investidor aos riscos fiscais e cambiais domésticos. O mercado norte-americano representa mais de 50% de todo o valor acionário global.</p>
      <h4>Alocação Prática</h4>
      <p>Através de ETFs como IVVB11 (B3) ou diretamente via conta global na NYSE/NASDAQ, nossos clientes acessam gigantes mundiais de tecnologia com solidez incomparável e dividendos dolarizados.</p>
    `
  }
};

function openReportModal(reportKey) {
  const report = REPORT_CONTENTS[reportKey];
  if (!report) return;

  const titleEl = document.getElementById('complianceModalTitle');
  const bodyEl = document.getElementById('complianceModalBody');

  if (titleEl && bodyEl) {
    titleEl.textContent = report.title;
    bodyEl.innerHTML = report.content;
    openModal('modalCompliance');
  }
}

// Modal de Conformidade e Regulatório (LGPD, Termos, FGC)
const COMPLIANCE_TEXTS = {
  lgpd: {
    title: "Política de Privacidade e Proteção de Dados (LGPD)",
    content: `
      <h4>1. Compromisso com a Lei nº 13.709/2018</h4>
      <p>A Prime Wealth Investimentos adota rígidos padrões de segurança cibernética e criptografia de ponta a ponta para proteger seus dados cadastrais, financeiros e bancários. Seus dados jamais são comercializados ou compartilhados com terceiros não autorizados.</p>
      <h4>2. Finalidade do Tratamento</h4>
      <p>Os dados coletados destinam-se exclusivamente à identificação do cliente para cumprimento de normas do Banco Central do Brasil, CVM e COAF (Prevenção à Lavagem de Dinheiro).</p>
    `
  },
  termos: {
    title: "Termos e Condições Gerais de Uso",
    content: `
      <h4>1. Relação Institucional</h4>
      <p>A prestação de serviços de assessoria e intermediação de valores mobiliários é regida pelas instruções da Comissão de Valores Mobiliários (CVM) e códigos de autorregulação da ANBIMA.</p>
      <h4>2. Riscos de Mercado</h4>
      <p>O investidor declara estar ciente de que aplicações em títulos públicos, privados e renda variável estão sujeitas a flutuações de preços, riscos de crédito, liquidez e conjuntura macroeconômica.</p>
    `
  },
  etica: {
    title: "Código de Ética, Conduta e Dever Fiduciário",
    content: `
      <h4>1. Princípio da Primazia do Interesse do Cliente</h4>
      <p>Todos os assessores e analistas da Prime Wealth são estritamente proibidos de recomendar qualquer produto que não atenda ao perfil de risco e aos melhores interesses de longo prazo do investidor.</p>
      <h4>2. Ausência de Conflito de Interesses</h4>
      <p>Atuamos sob total transparência na remuneração, em cumprimento integral à Resolução CVM nº 179.</p>
    `
  },
  fgc: {
    title: "Garantia Ordinária do Fundo Garantidor de Créditos (FGC)",
    content: `
      <h4>1. Limites de Cobertura</h4>
      <p>O FGC garante créditos de até R$ 250.000,00 por CPF e por instituição financeira emissora, limitado ao teto global de R$ 1.000.000,00 a cada período de 4 anos.</p>
      <h4>2. Ativos Elegíveis</h4>
      <p>Contam com a garantia do FGC: Certificados de Depósito Bancário (CDB), Letras de Crédito Imobiliário (LCI), Letras de Crédito do Agronegócio (LCA), Letras Hipotecárias (LH) e depósitos em conta corrente.</p>
    `
  },
  riscos: {
    title: "Declaração de Riscos de Mercado e Investimentos",
    content: `
      <h4>1. Inexistência de Garantia de Rentabilidade Futura</h4>
      <p>Rentabilidade passada não representa garantia de retorno futuro. Projeções matemáticas apresentadas no simulador constituem mera estimativa ilustrativa baseada em premissas teóricas.</p>
    `
  }
};

function openComplianceModal(typeKey) {
  const data = COMPLIANCE_TEXTS[typeKey];
  if (!data) return;

  const titleEl = document.getElementById('complianceModalTitle');
  const bodyEl = document.getElementById('complianceModalBody');

  if (titleEl && bodyEl) {
    titleEl.textContent = data.title;
    bodyEl.innerHTML = data.content;
    openModal('modalCompliance');
  }
}

// =========================================================================
// 8. ROLAGEM SUAVE & NAVEGAÇÃO
// =========================================================================
function scrollToSection(sectionId) {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

function toggleMobileNav() {
  const navMenu = document.getElementById('navMenu');
  const hamburger = document.getElementById('btnHamburger');
  if (navMenu && hamburger) {
    navMenu.classList.toggle('open');
    const expanded = navMenu.classList.contains('open');
    hamburger.setAttribute('aria-expanded', expanded);
  }
}

function initNavigation() {
  const navMenu = document.getElementById('navMenu');
  const btnOpenClientArea = document.getElementById('btnOpenClientArea');
  const btnOpenAccountModal = document.getElementById('btnOpenAccountModal');

  if (navMenu) {
    // Fecha menu mobile ao clicar em um link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const hamburger = document.getElementById('btnHamburger');
        if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  if (btnOpenClientArea) {
    btnOpenClientArea.addEventListener('click', () => {
      scrollToSection('area-cliente');
      if (!isUserLoggedIn) {
        showDashboardToast("Faça login para desbloquear seu patrimônio completo!");
      }
    });
  }

  if (btnOpenAccountModal) {
    btnOpenAccountModal.addEventListener('click', () => {
      openModal('modalOpenAccount');
    });
  }
}

// =========================================================================
// 9. INICIALIZAÇÃO GERAL
// =========================================================================
document.addEventListener('DOMContentLoaded', () => {
  setLoggedInState(false);
  initNavigation();
  initCatalogTabs();
  renderProductsGrid();
  initGlossary();
  initHeroMiniChart();
  initFAQAccordion();
});
