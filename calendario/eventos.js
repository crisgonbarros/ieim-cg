/* Calendário — IEIM Campo Grande · DADOS
   Este é o único arquivo que muda numa atualização do calendário.
   A página /calendario/ lê esta lista e se monta sozinha pela data de hoje
   (horário de Campo Grande/MS). Não precisa mexer no index.html.

   Cada ano tem:
     temas    o tema de cada mês (número do mês: texto)
     eventos  um evento por linha, em ordem de data

   Campos de cada evento:
     data    dia do evento, AAAA-MM-DD (obrigatório)
     ate     último dia, quando o evento dura mais de um dia (opcional)
     hora    horário, ex.: '19h30' (opcional)
     titulo  nome do evento (obrigatório)
     local   igreja ou cidade (opcional)
     link    página própria do evento, ex.: '/retiro-de-homens/' (opcional)

   Ano que não estiver aqui aparece como "Calendário AAAA indisponível".
   Cultos fixos semanais NÃO entram aqui (eles ficam nos cards das igrejas, na página inicial).
*/
window.IEIM_CALENDARIO = {
  2026: {
    temas: {
      7: 'Ide e fazei discípulos! Como podemos ir?',
      8: 'Comunhão – relacionamentos marcados pelo amor fraternal',
      9: 'Obediência a missões – indo até os confins da terra',
      10: 'Estabelecendo altares de adoração – Reforma Protestante',
      11: 'Colheita abundante, frutos de uma igreja viva',
      12: 'Celebrando a colheita'
    },
    eventos: [
      // Julho
      { data: '2026-07-03', titulo: 'Vigília' },
      { data: '2026-07-05', titulo: 'Santa Ceia' },
      { data: '2026-07-10', titulo: 'Noite de Adoração' },
      { data: '2026-07-11', titulo: 'Encontro de Casais' },
      { data: '2026-07-14', titulo: 'Reunião de lideranças' },
      { data: '2026-07-18', titulo: 'Pastoreio de líderes e pastores', local: 'Mundo Novo' },
      { data: '2026-07-20', titulo: 'Reunião diretoria' },
      { data: '2026-07-31', titulo: 'Vigília', local: 'Los Angeles' },

      // Agosto
      { data: '2026-08-02', titulo: 'Santa Ceia' },
      { data: '2026-08-04', titulo: 'Reunião de lideranças' },
      { data: '2026-08-08', titulo: 'Café com quem?' },
      { data: '2026-08-14', ate: '2026-08-16', titulo: 'Aniversário da Igreja' },
      { data: '2026-08-17', titulo: 'Reunião diretoria' },
      { data: '2026-08-28', ate: '2026-08-30', titulo: 'Congresso Nacional de Mulheres', local: 'Paraná' },

      // Setembro
      { data: '2026-09-04', titulo: 'Vigília' },
      { data: '2026-09-06', titulo: 'Santa Ceia' },
      { data: '2026-09-12', titulo: 'Reunião de Homens' },
      { data: '2026-09-13', titulo: 'Festa dos Tabernáculos' },
      { data: '2026-09-15', titulo: 'Reunião de lideranças' },
      { data: '2026-09-19', titulo: 'Pastoreio de líderes e pastores', local: 'Dourados' },
      { data: '2026-09-21', titulo: 'Reunião diretoria' },
      { data: '2026-09-26', titulo: 'Culto de Mulheres – Marianas' },

      // Outubro
      { data: '2026-10-02', titulo: 'Vigília' },
      { data: '2026-10-04', titulo: 'Santa Ceia' },
      { data: '2026-10-11', titulo: 'Cantina' },
      { data: '2026-10-13', titulo: 'Reunião de lideranças' },
      { data: '2026-10-19', titulo: 'Reunião diretoria' },
      { data: '2026-10-23', ate: '2026-10-24', titulo: 'AGO Nacional Cobim' },
      { data: '2026-10-30', titulo: 'Vigília', local: 'São Conrado' },

      // Novembro
      { data: '2026-11-01', titulo: 'Santa Ceia' },
      { data: '2026-11-07', titulo: 'Evento de Casais' },
      { data: '2026-11-08', titulo: 'Cantina' },
      { data: '2026-11-10', titulo: 'Reunião de lideranças' },
      { data: '2026-11-14', ate: '2026-11-15', titulo: 'Retiro Regional de Homens', local: 'Dourados/MS', link: '/retiro-de-homens/' },
      { data: '2026-11-16', titulo: 'Reunião diretoria' },
      { data: '2026-11-21', titulo: 'Confraternização Ministério Abraço' },
      { data: '2026-11-22', titulo: 'AGO da Igreja de Campo Grande' },
      { data: '2026-11-28', titulo: 'Planejamento 2027' },

      // Dezembro
      { data: '2026-12-04', titulo: 'Vigília' },
      { data: '2026-12-06', titulo: 'Santa Ceia' },
      { data: '2026-12-12', titulo: 'Encerramento da Liderança Regional MS' },
      { data: '2026-12-15', titulo: 'Reunião de lideranças' },
      { data: '2026-12-20', titulo: 'Culto Especial de Natal' },
      { data: '2026-12-21', titulo: 'Reunião diretoria' }
    ]
  }
};
