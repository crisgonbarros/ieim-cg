/* Faixa de avisos — IEIM Campo Grande
   Carregada por todas as páginas institucionais (nunca nas landing pages de evento).
   Para incluir, alterar ou tirar um aviso, edite só a lista AVISOS abaixo.

   Campos de cada aviso:
     nome        nome do aviso (uso interno e leitor de tela)
     de, ate     período em que aparece (AAAA-MM-DD, horário de Campo Grande). "de" é opcional
     logo        imagem do logo do evento, na pasta /img/
     frase       a chamada do aviso (obrigatória)
     botao       texto do botão (opcional; só quando o aviso leva a uma página)
     link        endereço da página do evento (opcional)
     externo     true quando o link é de fora do site (abre em outra aba)
     fundo       cor de fundo da faixa
     imagemFundo imagem de fundo (opcional, na pasta /img/)
     texto       cor do texto
     destaque    cor do botão
     textoBotao  cor do texto do botão
*/
(function () {
  var AVISOS = [
    {
      nome: 'Retiro de Homens 2026',
      ate: '2026-11-15',
      logo: '/img/aviso_retiro_homens_logo.webp',
      frase: 'Retiro de Homens · 14 e 15 de novembro · Dourados/MS',
      botao: 'Garantir minha vaga',
      link: '/retiro-de-homens/',
      fundo: '#080810',
      texto: '#F2F0EC',
      destaque: '#6B85AA',
      textoBotao: '#080810'
    },
    {
      nome: 'Grupo de comunicação oficial',
      logo: '/img/aviso_grupo_comunicacao_logo.webp',
      frase: 'Fique por dentro de tudo o que acontece na nossa comunidade: participe do Grupo de comunicação oficial',
      botao: 'Entrar no Grupo',
      link: 'https://chat.whatsapp.com/K2lynhJGzAXKZrjBjL7HGr?mode=gi_t',
      externo: true,
      fundo: 'linear-gradient(90deg, #020c24 0%, #062259 50%, #020c24 100%)',
      texto: '#FFFFFF',
      destaque: '#1E9BFF',
      textoBotao: '#FFFFFF'
    }
  ];

  /* ───────── daqui para baixo não precisa mexer ───────── */
  var script = document.currentScript;
  var agora = new Date();
  var ativos = AVISOS.filter(function (a) {
    if (a.de && agora < new Date(a.de + 'T00:00:00-04:00')) return false;
    if (a.ate && agora > new Date(a.ate + 'T23:59:59-04:00')) return false;
    return true;
  });
  if (!ativos.length || !script) return;

  var css = ''
    + '.faixa-avisos{position:relative;overflow:hidden;font-family:"Raleway",system-ui,sans-serif;font-variant-numeric:lining-nums;z-index:60}'
    + '.faixa-avisos *{box-sizing:border-box;margin:0;padding:0}'
    + '.fa-trilho{display:grid}'
    + '.fa-slide{grid-area:1/1;display:flex;align-items:center;justify-content:center;gap:22px;min-height:80px;padding:12px 16px;text-decoration:none;background-size:cover;background-position:center;opacity:0;visibility:hidden;transition:opacity .6s ease,visibility 0s linear .6s}'
    + '.fa-slide.ativo{opacity:1;visibility:visible;transition:opacity .6s ease}'
    + '.fa-slide::after{content:"";position:absolute;inset:0;pointer-events:none;background:linear-gradient(110deg,transparent 30%,rgba(255,255,255,.10) 48%,transparent 66%);transform:translateX(-120%);animation:fa-brilho 6s ease-in-out 1.2s infinite}'
    + '@keyframes fa-brilho{0%{transform:translateX(-120%)}35%,100%{transform:translateX(120%)}}'
    + '.fa-logo{height:52px;width:auto;flex-shrink:0;display:block}'
    + '.fa-frase{font-weight:600;font-size:1rem;line-height:1.35;letter-spacing:.01em}'
    + '.fa-botao{display:inline-flex;align-items:center;gap:8px;min-height:40px;padding:0 20px;border-radius:999px;font-weight:700;font-size:.9rem;white-space:nowrap;flex-shrink:0;transition:transform .25s ease,filter .25s ease}'
    + '.fa-botao svg{width:16px;height:16px;transition:transform .25s ease}'
    + 'a.fa-slide:hover .fa-botao{filter:brightness(1.12)}'
    + 'a.fa-slide:hover .fa-botao svg{transform:translateX(3px)}'
    + 'a.fa-slide:focus-visible{outline:2px solid currentColor;outline-offset:-4px}'
    + '.fa-pontos{position:absolute;right:14px;bottom:8px;display:flex;gap:6px;z-index:2}'
    + '.fa-pontos button{width:7px;height:7px;border-radius:50%;border:0;background:currentColor;opacity:.35;cursor:pointer}'
    + '.fa-pontos button[aria-current="true"]{opacity:1}'
    + '@media (max-width:700px){'
    + '.fa-slide{display:grid;grid-template-columns:auto 1fr;justify-content:stretch;gap:10px 14px;padding:12px 16px 14px;min-height:0}'
    + '.fa-logo{height:42px}'
    + '.fa-frase{font-size:.9rem}'
    + '.fa-botao{grid-column:1/-1;justify-content:center;min-height:38px;font-size:.85rem}'
    + '.fa-pontos{left:50%;right:auto;bottom:6px;transform:translateX(-50%)}'
    + '.faixa-avisos.varios .fa-slide{padding-bottom:22px}'
    + '}'
    + '@media (prefers-reduced-motion:reduce){.fa-slide,.fa-slide.ativo{transition:none}.fa-slide::after{display:none}.fa-botao,.fa-botao svg{transition:none}}';
  var estilo = document.createElement('style');
  estilo.textContent = css;
  document.head.appendChild(estilo);

  var SETA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  var faixa = document.createElement('aside');
  faixa.className = 'faixa-avisos';
  faixa.setAttribute('aria-label', 'Avisos');
  var trilho = document.createElement('div');
  trilho.className = 'fa-trilho';
  faixa.appendChild(trilho);

  ativos.forEach(function (a, i) {
    var el = document.createElement(a.link ? 'a' : 'div');
    el.className = 'fa-slide' + (i === 0 ? ' ativo' : '');
    if (a.link) el.href = a.link;
    if (a.link && a.externo) { el.target = '_blank'; el.rel = 'noopener'; }
    el.style.background = a.fundo || '#000';
    if (a.imagemFundo) el.style.backgroundImage = 'url(' + a.imagemFundo + ')';
    el.style.color = a.texto || '#fff';
    if (i !== 0) el.setAttribute('aria-hidden', 'true');
    el.innerHTML = (a.logo ? '<img class="fa-logo" src="' + esc(a.logo) + '" alt="" height="52">' : '')
      + '<p class="fa-frase">' + esc(a.frase) + '</p>'
      + (a.botao && a.link ? '<span class="fa-botao" style="background:' + esc(a.destaque || '#fff') + ';color:' + esc(a.textoBotao || '#000') + '">' + esc(a.botao) + SETA + '</span>' : '');
    trilho.appendChild(el);
  });

  script.parentNode.insertBefore(faixa, script);

  if (ativos.length < 2) return;

  var slides = trilho.children, atual = 0, timer = null, pausado = false;
  var pontos = document.createElement('div');
  pontos.className = 'fa-pontos';
  pontos.style.color = ativos[0].texto || '#fff';
  ativos.forEach(function (a, i) {
    var b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-label', 'Aviso ' + (i + 1) + ': ' + a.nome);
    if (i === 0) b.setAttribute('aria-current', 'true');
    b.addEventListener('click', function () { ir(i); reiniciar(); });
    pontos.appendChild(b);
  });
  faixa.appendChild(pontos);
  faixa.classList.add('varios');

  function ir(n) {
    n = (n + slides.length) % slides.length;
    slides[atual].classList.remove('ativo'); slides[atual].setAttribute('aria-hidden', 'true');
    pontos.children[atual].removeAttribute('aria-current');
    atual = n;
    slides[atual].classList.add('ativo'); slides[atual].removeAttribute('aria-hidden');
    pontos.children[atual].setAttribute('aria-current', 'true');
    pontos.style.color = ativos[atual].texto || '#fff';
  }
  function reiniciar() {
    clearInterval(timer);
    timer = setInterval(function () { if (!pausado) ir(atual + 1); }, 5000);
  }
  faixa.addEventListener('mouseenter', function () { pausado = true; });
  faixa.addEventListener('mouseleave', function () { pausado = false; });
  faixa.addEventListener('focusin', function () { pausado = true; });
  faixa.addEventListener('focusout', function () { pausado = false; });
  var x0 = null;
  faixa.addEventListener('touchstart', function (e) { pausado = true; x0 = e.touches[0].clientX; }, { passive: true });
  faixa.addEventListener('touchend', function (e) {
    if (x0 !== null) {
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) { ir(atual + (dx < 0 ? 1 : -1)); reiniciar(); }
    }
    x0 = null;
    setTimeout(function () { pausado = false; }, 4000);
  }, { passive: true });
  reiniciar();
})();
