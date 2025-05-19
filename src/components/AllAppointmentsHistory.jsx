import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './AllAppointmentsHistory.module.css';

/* ------- MOCK LOCAL ( ligar na API) ------ */
const MOCK = [
  /* 3 que já tinha */
  { id: 101, service:'Unhas', type:'Gel', date:'15/05/2025', time:'10:00', client:'Ana Silva', employee:'Juliana', payment:'Pix',     value:'R$ 85,00',  discount:'—',  status:'Concluído', notes:'Cliente satisfeita.' },
  { id: 102, service:'Cabelo', type:'Corte', date:'16/05/2025', time:'14:30', client:'Carlos Pereira', employee:'Mariana', payment:'Cartão',  value:'R$ 120,00', discount:'10%', status:'Em aberto',  notes:'Agendado para retoque.' },
  { id: 103, service:'Cílios', type:'Volume russo', date:'20/05/2025', time:'09:00', client:'Bianca Rocha', employee:'Laura',   payment:'Dinheiro', value:'R$ 180,00', discount:'—',  status:'Cancelado', notes:'Cliente desmarcou.' },

  /* +12 novos para forçar scrollbar */
  { id: 104, service:'Unhas',   type:'Fibra',      date:'22/05/2025', time:'11:00', client:'Larissa Lima',   employee:'Juliana', payment:'Pix',     value:'R$ 150,00', discount:'—',  status:'Concluído', notes:'—' },
  { id: 105, service:'Cabelo',  type:'Mechas',     date:'23/05/2025', time:'13:00', client:'Paula Souza',    employee:'Bruna',   payment:'Pix',     value:'R$ 300,00', discount:'5%', status:'Concluído', notes:'Aplicado tonner.' },
  { id: 106, service:'Cílios',  type:'Clássico',   date:'24/05/2025', time:'09:30', client:'Rafaela Dias',   employee:'Laura',   payment:'Cartão',  value:'R$ 160,00', discount:'—',  status:'Concluído', notes:'—' },
  { id: 107, service:'Unhas',   type:'Esmaltação', date:'24/05/2025', time:'15:00', client:'Julio Costa',   employee:'Juliana', payment:'Dinheiro',value:'R$ 50,00',  discount:'—',  status:'Em aberto', notes:'—' },
  { id: 108, service:'Cabelo',  type:'Escova',     date:'25/05/2025', time:'10:15', client:'Marta Prado',    employee:'Mariana', payment:'Pix',     value:'R$ 70,00',  discount:'—',  status:'Concluído', notes:'—' },
  { id: 109, service:'Cílios',  type:'Foxy eyes',  date:'25/05/2025', time:'12:45', client:'Sara Nunes',     employee:'Laura',   payment:'Cartão',  value:'R$ 200,00', discount:'—',  status:'Concluído', notes:'—' },
  { id: 110, service:'Unhas',   type:'Spa pés',    date:'26/05/2025', time:'09:00', client:'Beatriz Melo',   employee:'Juliana', payment:'Pix',     value:'R$ 90,00',  discount:'—',  status:'Concluído', notes:'—' },
  { id: 111, service:'Cabelo',  type:'Coloração',  date:'26/05/2025', time:'14:00', client:'Daniela Cruz',   employee:'Bruna',   payment:'Dinheiro',value:'R$ 280,00', discount:'—',  status:'Cancelado', notes:'Não compareceu.' },
  { id: 112, service:'Cílios',  type:'Mega volume',date:'27/05/2025', time:'11:30', client:'Luana Borges',   employee:'Laura',   payment:'Pix',     value:'R$ 220,00', discount:'—',  status:'Concluído', notes:'—' },
  { id: 113, service:'Unhas',   type:'Francesinha',date:'28/05/2025', time:'16:00', client:'Fernanda Reis',  employee:'Juliana', payment:'Cartão',  value:'R$ 110,00', discount:'—',  status:'Em aberto', notes:'—' },
  { id: 114, service:'Cabelo',  type:'Tratamento', date:'29/05/2025', time:'10:45', client:'Otávia Neves',   employee:'Mariana', payment:'Pix',     value:'R$ 180,00', discount:'—',  status:'Concluído', notes:'—' },
  { id: 115, service:'Cílios',  type:'Lash Lifting',date:'30/05/2025',time:'08:45', client:'Patrícia Alves', employee:'Laura',   payment:'Pix',     value:'R$ 140,00', discount:'—',  status:'Concluído', notes:'—' },
];
/* ------------------------------------------------------ */

export default function AllAppointmentsHistory() {
  const [allAppointments, setAllAppointments]   = useState([]);
  const [serviceFilter, setServiceFilter]       = useState('');
  const [searchText,    setSearchText]          = useState('');
  const [dateFilter,    setDateFilter]          = useState(null);   // null => todas as datas
  const [showCalendar,  setShowCalendar]        = useState(false);

  /* ------ busca (mock ou API real) ------ */
  useEffect(() => {
    async function fetchData() {
      try {
        // ---------- troque pelo fetch real -------------
        // const resp = await fetch('/api/todos-os-atendimentos');
        // if (!resp.ok) throw new Error(resp.status);
        // const data = await resp.json();
        const data = MOCK;                      // <- mock local
        // ----------------------------------------------
        setAllAppointments(data);
      } catch (e) {
        console.error('Falha ao buscar atendimentos:', e);
      }
    }
    fetchData();
  }, []);

  /* ---------------- Filtro ---------------- */
  const filtered = allAppointments.filter(a => {
    const sMatch = !serviceFilter ||
      a.service.toLowerCase().includes(serviceFilter.toLowerCase());

    const text = searchText.trim().toLowerCase();
    const tMatch = !text ||
      a.client.toLowerCase().includes(text) ||
      a.employee.toLowerCase().includes(text);

    const dMatch = !dateFilter ||
      a.date === dateFilter.toLocaleDateString('pt-BR');

    return sMatch && tMatch && dMatch;
  });

  /* -------------- render ------------------ */
  return (
    <div className={styles.panel}>
      <h2>Histórico geral de atendimentos</h2>

      {/* Filtros ------------------------------------------------ */}
      <div className={styles.filters}>
        <select
          value={serviceFilter}
          onChange={e => setServiceFilter(e.target.value)}
        >
          <option value="">Serviço</option>
          <option value="unhas">Unhas</option>
          <option value="cilios">Cílios</option>
          <option value="cabelo">Cabelo</option>
        </select>

        <input
          className={styles.searchInput}
          type="text"
          placeholder="Buscar cliente ou funcionário"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />

        <div className={styles.dateSelector}>
          <input
            readOnly
            placeholder="Data"
            value={dateFilter ? dateFilter.toLocaleDateString() : ''}
            onClick={() => setShowCalendar(!showCalendar)}
          />
          {showCalendar && (
            <div className={styles.calendarPopup}>
              <Calendar
                locale="pt-BR"
                onChange={d => { setDateFilter(d); setShowCalendar(false); }}
                value={dateFilter || new Date()}
              />
            </div>
          )}
        </div>
      </div>

      {/* Lista -------------------------------------------------- */}
      <div className={styles.listBox}>
        {filtered.length ? (
          filtered.map(a => (
            <div key={a.id} className={styles.card}>
              <div><strong>ID do atendimento:</strong> {a.id}</div>
              <div><strong>Serviço:</strong> {a.service} | <strong>Tipo:</strong> {a.type}</div>
              <div><strong>Data:</strong> {a.date} | <strong>Hora:</strong> {a.time}</div>
              <div><strong>Cliente:</strong> {a.client}</div>
              <div><strong>Funcionário:</strong> {a.employee} | <strong>Pagamento:</strong> {a.payment}</div>
              <div>
                <strong>Valor:</strong> {a.value} | <strong>Desconto:</strong> {a.discount} | <strong>Status:</strong>
                <span className={`${styles.status} ${
                  a.status === 'Concluído'
                    ? styles.statusConcluido
                    : a.status === 'Cancelado'
                    ? styles.statusCancelado
                    : styles.statusAberto
                }`}>{a.status}</span>
              </div>
              <div><strong>Observações:</strong> {a.notes}</div>
            </div>
          ))
        ) : (
          <p>Nenhum atendimento encontrado com os filtros selecionados.</p>
        )}
      </div>
    </div>
  );
}
