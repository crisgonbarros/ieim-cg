/* Faixa de avisos — IEIM Campo Grande
   Carregada por todas as páginas institucionais (nunca nas landing pages de evento).
   Para incluir, alterar ou tirar um aviso, edite só a lista AVISOS abaixo.

   Campos de cada aviso:
     nome        nome do aviso (uso interno e leitor de tela)
     de, ate     período em que aparece (AAAA-MM-DD, horário de Campo Grande). "de" é opcional
     logo        imagem do logo do evento, na pasta /img/
     frase       a chamada do aviso (obrigatória). Pode usar {data}: vira a data calculada pela repetição
     repete      repetição automática (opcional). 'domingos-1-2' = aparece desde a segunda-feira
                 antes do 1º domingo do mês até o 2º domingo; {data} mostra o próximo desses domingos.
                 A semana vira no domingo às 19h30 (horário de Campo Grande)
     botao       texto do botão (opcional; só quando o aviso leva a uma página)
     link        endereço da página do evento (opcional)
     externo     true quando o link é de fora do site (abre em outra aba)
     fundo       cor de fundo da faixa
     imagemFundo imagem de fundo (opcional, na pasta /img/)
     texto       cor do texto
     destaque    cor do botão
     textoBotao  cor do texto do botão
     foto        imagem que entra no canto direito da faixa, só em telas largas (opcional, na pasta /img/)
     evento      data do evento (AAAA-MM-DD). O aviso aparece e some sozinho como os lembretes
                 (desde o domingo anterior às 19h30, "Amanhã" na véspera, "Hoje" no dia, some depois).
                 Na frase, {quando} vira "Próxima semana · sábado, 28/11" (domingo à noite),
                 "Esta semana · sábado, 28/11", "Amanhã" ou "Hoje"
     substitui   trecho do título do evento no calendário (mesma data de "evento"): o lembrete
                 automático desse evento não aparece, porque este aviso já cumpre o papel

   LEMBRETES AUTOMÁTICOS DO CALENDÁRIO
   Todo evento cadastrado em /calendario/eventos.js aparece sozinho nesta faixa:
     - desde o domingo anterior às 19h30 (horário de Campo Grande, depois dos avisos no culto):
       "Próxima semana · quinta, 26/11"; a partir de segunda: "Esta semana · quinta, 26/11"
     - na véspera: "Amanhã" (mesmo que a véspera seja o domingo da semana anterior)
     - no dia: "Hoje"; evento de vários dias fica como "Acontecendo" até o último dia
     - depois da data, some sozinho
     - evento sem página própria: botão "Ver no calendário"
     - evento com link (página própria): botão "Saiba mais", que leva à página
     - evento que já tem aviso com arte própria aqui embaixo (mesmo link): o lembrete
       automático não aparece, para não duplicar
   Não precisa mexer neste arquivo para os lembretes: basta cadastrar o evento no calendário.
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
    },
    {
      nome: 'Projeto 1 Quilo com Amor',
      repete: 'domingos-1-2',
      logo: '/img/aviso_1kg_com_amor_logo.webp',
      frase: 'Domingo, {data}, traga 1 kg de alimento não perecível para a igreja e apoie o trabalho da ONG SOMAR',
      fundo: 'linear-gradient(90deg, #f4f3f8 0%, #ecebf2 100%)',
      texto: '#151518',
      destaque: '#D7193F'
    },
    {
      nome: 'Culto de Jovens · feat. Thamilis Campos',
      evento: '2026-11-28',
      substitui: 'Culto de Jovens',
      logo: '/img/aviso_culto_jovens_logo.webp',
      frase: '{quando} · 19h30 · feat. Thamilis Campos · Rua Camapuã, 141',
      fundo: '#1a1a1a',
      imagemFundo: '/img/aviso_culto_jovens_fundo.webp',
      foto: '/img/aviso_culto_jovens_foto.webp',
      texto: '#E6E6E6',
      destaque: '#FFFFFF'
    }
  ];

  /* ───────── daqui para baixo não precisa mexer ───────── */
  var script = document.currentScript;
  var agora = new Date();
  // data de hoje em Campo Grande (UTC-4), sem horas
  var cg = new Date(agora.getTime() - 4 * 3600000);
  var hoje = Date.UTC(cg.getUTCFullYear(), cg.getUTCMonth(), cg.getUTCDate());
  var DIA = 86400000;
  // virada da semana: domingo às 19h30 (horário de Campo Grande), quando os avisos são dados no culto.
  // A partir daí a faixa já mostra a semana seguinte. Vale igual para quem acessa de qualquer fuso.
  var virada = cg.getUTCDay() === 0 && cg.getUTCHours() * 60 + cg.getUTCMinutes() >= 19 * 60 + 30;
  // dia usado pela repetição: depois da virada, conta como se já fosse segunda-feira
  var hojeSemana = virada ? hoje + DIA : hoje;
  function primeiroDomingo(ano, mes) {
    var d = Date.UTC(ano, mes, 1);
    return d + ((7 - new Date(d).getUTCDay()) % 7) * DIA;
  }
  function textoData(t) {
    var d = new Date(t), dia = d.getUTCDate();
    return (dia === 1 ? '1º' : dia) + '/' + (d.getUTCMonth() + 1);
  }
  // devolve a data do próximo domingo de coleta, ou null se hoje não está no período
  function repeticao(regra) {
    if (regra !== 'domingos-1-2') return null;
    for (var k = 0; k < 2; k++) {
      var ano = cg.getUTCFullYear(), mes = cg.getUTCMonth() + k;
      if (mes > 11) { mes -= 12; ano++; }
      var d1 = primeiroDomingo(ano, mes), d2 = d1 + 7 * DIA;
      if (hojeSemana >= d1 - 6 * DIA && hojeSemana <= d1) return d1;
      if (hojeSemana > d1 && hojeSemana <= d2) return d2;
    }
    return null;
  }
  var SEMANA = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
  // domingo que fecha a semana mostrada (segunda a domingo; depois da virada, a semana seguinte)
  var domingo = virada ? hoje + 7 * DIA : hoje + ((7 - new Date(hoje).getUTCDay()) % 7) * DIA;
  function diaUTC(txt) { var p = txt.split('-'); return Date.UTC(+p[0], +p[1] - 1, +p[2]); }
  // "Hoje", "Acontecendo", "Amanhã", "Esta semana", "Próxima semana" (domingo depois da virada) ou null
  function quandoDe(ini, fim) {
    if (hoje > fim) return null;
    if (hoje === ini) return 'Hoje';
    if (hoje > ini) return 'Acontecendo';
    if (hoje === ini - DIA) return 'Amanhã';
    if (ini <= domingo) return virada ? 'Próxima semana' : 'Esta semana';
    return null;
  }
  function rotuloDe(quando, ini, cor) {
    return '<strong style="color:' + cor + '">' + quando + '</strong>'
      + (quando === 'Esta semana' || quando === 'Próxima semana' ? ' · ' + SEMANA[new Date(ini).getUTCDay()] + ', ' + textoData(ini) : '');
  }
  var ativos = AVISOS.filter(function (a) {
    if (a.de && agora < new Date(a.de + 'T00:00:00-04:00')) return false;
    if (a.ate && agora > new Date(a.ate + 'T23:59:59-04:00')) return false;
    if (a.repete) {
      var d = repeticao(a.repete);
      if (d === null) return false;
      a._data = textoData(d);
    }
    if (a.evento) {
      var ini = diaUTC(a.evento), q = quandoDe(ini, ini);
      if (!q) return false;
      a._quando = q; a._ordem = ini;
    }
    return true;
  });
  if (!script) return;

  /* ───── Lembretes automáticos a partir do calendário ───── */
  var LUZ = ['#ff5cb0', '#6c9bff', '#ffc93d', '#4fdc8a']; // mesma luz por mês usada no calendário
  function lembretes() {
    var cal = window.IEIM_CALENDARIO, lista = [];
    if (!cal) return lista;
    var comArte = {};
    var substituidos = [];
    AVISOS.forEach(function (a) {
      if (a.link) comArte[a.link] = true;
      if (a.evento && a.substitui) substituidos.push(a);
    });
    Object.keys(cal).forEach(function (ano) {
      (cal[ano].eventos || []).forEach(function (ev) {
        if (!ev || !ev.data || !ev.titulo) return;
        if (ev.link && comArte[ev.link]) return;
        if (substituidos.some(function (a) { return a.evento === ev.data && ev.titulo.indexOf(a.substitui) !== -1; })) return;
        var ini = diaUTC(ev.data), fim = ev.ate ? diaUTC(ev.ate) : ini;
        var quando = quandoDe(ini, fim);
        if (!quando) return;
        var rotulo = rotuloDe(quando, ini, LUZ[new Date(ini).getUTCMonth() % 4]);
        var cor = LUZ[new Date(ini).getUTCMonth() % 4];
        var extra = [ev.hora, ev.local].filter(Boolean).join(' · ');
        lista.push({
          nome: quando + ': ' + ev.titulo,
          lembrete: true,
          _ordem: ini,
          logo: '/img/aviso_lembrete_logo.svg',
          fraseHtml: rotulo + ' · ' + esc(ev.titulo) + (extra ? ' · <span style="opacity:.75">' + esc(extra) + '</span>' : ''),
          botao: ev.link ? 'Saiba mais' : 'Ver no calendário',
          link: ev.link || '/calendario/',
          fundo: 'radial-gradient(70% 160% at 12% 50%, ' + cor + '40 0%, transparent 70%), linear-gradient(90deg, #08080a, #111114)',
          texto: '#FFFFFF',
          destaque: cor,
          textoBotao: '#0a0a0c'
        });
      });
    });
    return lista.sort(function (a, b) { return a._ordem - b._ordem; });
  }
  var css = ''
    + '.faixa-avisos{position:relative;overflow:hidden;font-family:"Raleway",system-ui,sans-serif;font-variant-numeric:lining-nums;z-index:60}'
    + '.faixa-avisos *{box-sizing:border-box;margin:0;padding:0}'
    + '.fa-trilho{display:grid}'
    + '.fa-slide{grid-area:1/1;display:flex;align-items:center;justify-content:center;gap:22px;min-height:80px;padding:12px 16px;text-decoration:none;background-size:cover;background-position:center;opacity:0;visibility:hidden;transition:opacity .6s ease,visibility 0s linear .6s}'
    + '.fa-slide.ativo{opacity:1;visibility:visible;transition:opacity .6s ease}'
    + '.fa-slide::after{content:"";position:absolute;inset:0;pointer-events:none;background:linear-gradient(110deg,transparent 30%,rgba(255,255,255,.10) 48%,transparent 66%);transform:translateX(-120%);animation:fa-brilho 6s ease-in-out 1.2s infinite}'
    + '@keyframes fa-brilho{0%{transform:translateX(-120%)}35%,100%{transform:translateX(120%)}}'
    + '.fa-foto{position:absolute;right:0;top:0;height:100%;width:auto;pointer-events:none;display:none}'
    + '@media (min-width:1100px){.fa-foto{display:block}}'
    + '.fa-slide>:not(.fa-foto){position:relative;z-index:1}'
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

  var atualFaixa = null, timer = null;
  function montar(lista) {
    if (!lista.length) { if (atualFaixa) { atualFaixa.remove(); atualFaixa = null; } return; }
    var faixa = document.createElement('aside');
    faixa.className = 'faixa-avisos';
    faixa.setAttribute('aria-label', 'Avisos');
    var trilho = document.createElement('div');
    trilho.className = 'fa-trilho';
    faixa.appendChild(trilho);

    lista.forEach(function (a, i) {
      var el = document.createElement(a.link ? 'a' : 'div');
      el.className = 'fa-slide' + (i === 0 ? ' ativo' : '');
      if (a.link) el.href = a.link;
      if (a.link && a.externo) { el.target = '_blank'; el.rel = 'noopener'; }
      el.style.background = a.fundo || '#000';
      if (a.imagemFundo) el.style.backgroundImage = 'url(' + a.imagemFundo + ')';
      el.style.color = a.texto || '#fff';
      if (i !== 0) el.setAttribute('aria-hidden', 'true');
      el.innerHTML = (a.foto ? '<img class="fa-foto" src="' + esc(a.foto) + '" alt="" height="80">' : '')
        + (a.logo ? '<img class="fa-logo" src="' + esc(a.logo) + '" alt="" height="52">' : '')
        + '<p class="fa-frase">' + (a.fraseHtml ? a.fraseHtml : esc(a.frase).replace('{data}', '<strong style="color:' + esc(a.destaque || 'inherit') + '">' + esc(a._data || '') + '</strong>').replace('{quando}', a._quando ? rotuloDe(a._quando, a._ordem, esc(a.destaque || 'inherit')) : '')) + '</p>'
        + (a.botao && a.link ? '<span class="fa-botao" style="background:' + esc(a.destaque || '#fff') + ';color:' + esc(a.textoBotao || '#000') + '">' + esc(a.botao) + SETA + '</span>' : '');
      trilho.appendChild(el);
    });

    if (atualFaixa) atualFaixa.parentNode.replaceChild(faixa, atualFaixa);
    else script.parentNode.insertBefore(faixa, script);
    atualFaixa = faixa;

    if (lista.length < 2) return;

    var slides = trilho.children, atual = 0, pausado = false;
    clearInterval(timer);
    var pontos = document.createElement('div');
    pontos.className = 'fa-pontos';
    pontos.style.color = lista[0].texto || '#fff';
    lista.forEach(function (a, i) {
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
      pontos.style.color = lista[atual].texto || '#fff';
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
  }

  // lembretes e avisos de evento juntos, pela data do evento; depois os demais avisos
  function juntar(l) {
    var datados = ativos.filter(function (a) { return a._ordem != null; });
    var outros = ativos.filter(function (a) { return a._ordem == null; });
    return l.concat(datados).sort(function (a, b) { return a._ordem - b._ordem; }).concat(outros);
  }
  montar(juntar(lembretes()));
  // carrega os eventos do calendário (se a página ainda não carregou) e refaz a faixa com os lembretes
  if (!window.IEIM_CALENDARIO) {
    var cal = document.createElement('script');
    cal.src = '/calendario/eventos.js';
    cal.onload = function () { var l = lembretes(); if (l.length) montar(juntar(l)); };
    document.head.appendChild(cal);
  }
})();
