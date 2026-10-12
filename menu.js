/* Menu do site — IEIM Campo Grande
   Carregado por todas as páginas institucionais, logo depois do /avisos.js.
   Para incluir, alterar ou tirar um item do menu, edite só as listas abaixo.
   Páginas de políticas não entram no menu (ficam no rodapé).

   Campos:
     texto   o que aparece no menu
     link    endereço da página
     ate     (só eventos, opcional) último dia em que o item aparece, AAAA-MM-DD
     externo true quando o link é de fora do site (abre em outra aba)
*/
(function () {
  var PAGINAS = [
    { texto: 'Início', link: '/' },
    { texto: 'Nossas igrejas', link: '/#igrejas' },
    { texto: 'Quem somos', link: '/quem-somos/' },
    { texto: 'Calendário', link: '/calendario/' },
    { texto: 'Fotos', link: 'https://drive.google.com/drive/folders/1-09oqXg5XkZW8LQDTHCvXGy8yiEekWmv', externo: true }
    // { texto: 'SOMAR', link: '/somar/' }   ← ativar quando a página da SOMAR existir
  ];

  var EVENTOS = [
    { texto: 'Retiro de Homens 2026', link: '/retiro-de-homens/', ate: '2026-11-15' }
  ];

  /* ───────── daqui para baixo não precisa mexer ───────── */
  var script = document.currentScript;
  if (!script) return;
  var agora = new Date();
  var eventos = EVENTOS.filter(function (e) { return !e.ate || agora <= new Date(e.ate + 'T23:59:59-04:00'); });

  var css = ''
    + '.menu-topo{position:sticky;top:0;z-index:80;height:68px;color:#fff;font-family:"Raleway",system-ui,sans-serif;font-variant-numeric:lining-nums;'
    + 'background:rgba(8,8,10,.42);-webkit-backdrop-filter:blur(18px) saturate(160%);backdrop-filter:blur(18px) saturate(160%);border-bottom:1px solid rgba(255,255,255,.08);transition:background-color .4s}'
    + '.menu-topo.rolado{background:rgba(6,6,8,.9);border-bottom-color:rgba(255,255,255,.06)}'
    + '.menu-topo *,.mt-painel *{box-sizing:border-box;margin:0;padding:0}'
    + '.mt-interno{height:100%;max-width:1120px;margin:0 auto;padding:0 24px;display:flex;align-items:center;justify-content:space-between;gap:16px}'
    + '.mt-marca{display:flex;align-items:center;gap:14px;text-decoration:none;position:relative;z-index:2}'
    + '.mt-marca img{display:block;height:auto}'
    + '.mt-simbolo{width:46px}.mt-nome{width:150px;opacity:.92}'
    + '.mt-botao{position:relative;z-index:2;width:46px;height:46px;border-radius:50%;display:grid;place-items:center;cursor:pointer;color:#fff;'
    + 'background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.22);box-shadow:inset 0 1px 0 rgba(255,255,255,.18);transition:background-color .3s,transform .3s}'
    + '.mt-botao:hover{background:rgba(255,255,255,.16)}'
    + '.mt-botao:focus-visible{outline:2px solid #fff;outline-offset:3px}'
    + '.mt-barras{position:relative;width:20px;height:14px}'
    + '.mt-barras i{position:absolute;left:0;width:100%;height:2px;border-radius:2px;background:currentColor;transition:transform .45s cubic-bezier(.2,.75,.2,1),opacity .3s,top .45s cubic-bezier(.2,.75,.2,1)}'
    + '.mt-barras i:nth-child(1){top:0}.mt-barras i:nth-child(2){top:6px}.mt-barras i:nth-child(3){top:12px}'
    + '.menu-aberto .mt-barras i:nth-child(1){top:6px;transform:rotate(45deg)}'
    + '.menu-aberto .mt-barras i:nth-child(2){opacity:0;transform:scaleX(.2)}'
    + '.menu-aberto .mt-barras i:nth-child(3){top:6px;transform:rotate(-45deg)}'
    + '.mt-painel{position:fixed;inset:0;z-index:90;overscroll-behavior:contain;font-family:"Raleway",system-ui,sans-serif;overflow-y:auto;padding:116px 24px 48px;visibility:hidden;opacity:0;'
    + 'background:rgba(5,5,7,.93);-webkit-backdrop-filter:blur(26px) saturate(150%);backdrop-filter:blur(26px) saturate(150%);'
    + 'transition:opacity .45s ease,visibility 0s linear .45s}'
    + '.mt-painel-topo{position:absolute;left:0;right:0;top:0;height:68px;z-index:2}'
    + '.mt-painel-topo .mt-interno{position:relative}'
    + '.mt-painel::before{content:"";position:absolute;inset:0;pointer-events:none;'
    + 'background:radial-gradient(45% 40% at 90% 10%,rgba(47,95,224,.35),transparent 70%),radial-gradient(40% 40% at 5% 95%,rgba(230,0,126,.25),transparent 70%)}'
    + '.mt-painel .mt-barras i:nth-child(1){top:6px;transform:rotate(45deg)}.mt-painel .mt-barras i:nth-child(2){opacity:0}.mt-painel .mt-barras i:nth-child(3){top:6px;transform:rotate(-45deg)}'
    + '.mt-painel.aberto{visibility:visible;opacity:1;transition:opacity .45s ease}'
    + '.mt-lista{position:relative;max-width:1072px;margin:0 auto;list-style:none;display:grid;gap:4px}'
    + '.mt-lista a{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:14px 4px;text-decoration:none;color:#fff;'
    + 'font-size:clamp(1.7rem,5vw,2.6rem);font-weight:700;line-height:1.15;letter-spacing:-.01em;border-bottom:1px solid rgba(255,255,255,.1);'
    + 'opacity:0;transform:translateY(18px);transition:opacity .5s ease,transform .7s cubic-bezier(.2,.75,.2,1),color .3s}'
    + '.mt-lista a svg{width:26px;height:26px;flex-shrink:0;opacity:.35;transition:transform .4s cubic-bezier(.2,.75,.2,1),opacity .3s}'
    + '.mt-lista a:hover svg,.mt-lista a:focus-visible svg{opacity:1;transform:translateX(6px)}'
    + '.mt-lista .sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}'
    + '.mt-lista a[aria-current="page"]{color:rgba(255,255,255,.55)}'
    + '.mt-lista a:focus-visible{outline:2px solid #fff;outline-offset:2px;border-radius:8px}'
    + '.mt-painel.aberto .mt-lista a{opacity:1;transform:none;transition-delay:calc(var(--i) * .06s + .12s)}'
    + '.mt-grupo{position:relative;max-width:1072px;margin:40px auto 10px;font-size:.78rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,.5);'
    + 'opacity:0;transition:opacity .5s ease}'
    + '.mt-painel.aberto .mt-grupo{opacity:1;transition-delay:.35s}'
    + '.mt-lista.eventos a{font-size:clamp(1.25rem,3.4vw,1.6rem);font-weight:600}'
    + '@media (max-width:860px){.menu-topo{height:60px}.mt-interno{padding:0 16px}.mt-marca .mt-nome{display:none}.mt-simbolo{width:42px}.mt-botao{width:42px;height:42px}.mt-painel-topo{height:60px}.mt-painel{padding:96px 16px 40px}}'
    + '@media (prefers-reduced-motion:reduce){.mt-painel,.mt-lista a,.mt-grupo,.mt-barras i{transition:none!important}.mt-lista a{transform:none}}';
  var estilo = document.createElement('style');
  estilo.textContent = css;
  document.head.appendChild(estilo);

  var EXTERNO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>';
  var SETA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function atual(link) { return link.indexOf('#') === -1 && link === location.pathname; }
  var n = 0;
  function itens(lista) {
    return lista.map(function (p) {
      return '<li><a href="' + esc(p.link) + '" style="--i:' + (n++) + '"' + (atual(p.link) ? ' aria-current="page"' : '') + (p.externo ? ' target="_blank" rel="noopener"' : '') + '>' + esc(p.texto) + (p.externo ? '<span class="sr"> (abre em outra aba)</span>' + EXTERNO : SETA) + '</a></li>';
    }).join('');
  }

  var topo = document.createElement('header');
  topo.className = 'menu-topo';
  topo.id = 'topo';
  topo.innerHTML = '<div class="mt-interno">'
    + '<a class="mt-marca" href="/" aria-label="Igreja Evangélica Irmãos Menonitas, início">'
    + '<img class="mt-simbolo" src="/img/logo_ieim_simbolo_branco.svg" alt="" width="46" height="30">'
    + '<img class="mt-nome" src="/img/logo_ieim_nome_branco.svg" alt="" width="150" height="24"></a>'
    + '<button class="mt-botao" type="button" aria-expanded="false" aria-controls="menu-painel" aria-label="Abrir menu"><span class="mt-barras" aria-hidden="true"><i></i><i></i><i></i></span></button>'
    + '</div>';
  var painel = document.createElement('nav');
  painel.className = 'mt-painel'; painel.id = 'menu-painel'; painel.setAttribute('aria-label', 'Menu do site');
  painel.innerHTML = ''
    + '<div class="mt-painel-topo"><div class="mt-interno">'
    + '<a class="mt-marca" href="/" aria-label="Igreja Evangélica Irmãos Menonitas, início"><img class="mt-simbolo" src="/img/logo_ieim_simbolo_branco.svg" alt="" width="46" height="30"><img class="mt-nome" src="/img/logo_ieim_nome_branco.svg" alt="" width="150" height="24"></a>'
    + '<button class="mt-botao mt-fechar" type="button" aria-label="Fechar menu"><span class="mt-barras" aria-hidden="true"><i></i><i></i><i></i></span></button>'
    + '</div></div>'
    + '<ul class="mt-lista">' + itens(PAGINAS) + '</ul>'
    + (eventos.length ? '<p class="mt-grupo">Eventos</p><ul class="mt-lista eventos">' + itens(eventos) + '</ul>' : '');
  script.parentNode.insertBefore(topo, script);
  script.parentNode.insertBefore(painel, script);

  var botao = topo.querySelector('.mt-botao');
  var fechar = painel.querySelector('.mt-fechar');
  var barraPainel = painel.querySelector('.mt-painel-topo');
  painel.setAttribute('inert', '');
  function abrir(sim) {
    topo.classList.toggle('menu-aberto', sim); painel.classList.toggle('aberto', sim);
    botao.setAttribute('aria-expanded', sim ? 'true' : 'false');
    botao.setAttribute('aria-label', sim ? 'Fechar menu' : 'Abrir menu');
    if (sim) {
      // a barra do painel (logo + X) fica exatamente onde está o menu na tela
      var r = topo.getBoundingClientRect(), alto = Math.max(0, Math.round(r.top));
      barraPainel.style.top = alto + 'px';
      painel.style.paddingTop = (alto + Math.round(r.height) + 28) + 'px';
      painel.removeAttribute('inert');
      setTimeout(function () { fechar.focus({ preventScroll: true }); }, 120);
    }
    else painel.setAttribute('inert', '');
  }
  botao.addEventListener('click', function () { abrir(!topo.classList.contains('menu-aberto')); });
  fechar.addEventListener('click', function (e) { e.stopPropagation(); abrir(false); botao.focus({ preventScroll: true }); });
  painel.addEventListener('click', function (e) {
    if (e.target.closest('a')) abrir(false);
    else if (!e.target.closest('.mt-marca, .mt-fechar')) { abrir(false); botao.focus({ preventScroll: true }); }
  });
  document.addEventListener('keydown', function (e) {
    if (!topo.classList.contains('menu-aberto')) return;
    if (e.key === 'Escape') { abrir(false); botao.focus(); return; }
    if (e.key !== 'Tab') return;
    var foco = Array.prototype.slice.call(painel.querySelectorAll('a, button'));
    var i = foco.indexOf(document.activeElement);
    if (e.shiftKey && i <= 0) { e.preventDefault(); foco[foco.length - 1].focus(); }
    else if (!e.shiftKey && i === foco.length - 1) { e.preventDefault(); foco[0].focus(); }
  });
  function aoRolar() { topo.classList.toggle('rolado', window.scrollY > 40); }
  window.addEventListener('scroll', aoRolar, { passive: true }); aoRolar();
})();
