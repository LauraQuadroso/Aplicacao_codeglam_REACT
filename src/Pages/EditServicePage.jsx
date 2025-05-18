import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import styles from './EditServicePage.module.css';

// Simula a busca dos dados do serviço para editar
const fetchServiceDetails = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        _id: id,
        titulo: `Serviço ${id}`,
        preco: (Math.random() * 100 + 30).toFixed(2),
        comissao: Math.floor(Math.random() * 25),
        duracao: `${Math.floor(Math.random() * 90) + 30} min`,
        recorrencia: 30,
        descricao: `Descrição detalhada do Serviço ${id}.`,
        status: Math.random() > 0.5 ? 'A' : 'B',
      });
    }, 500);
  });
};

// Simula a atualização dos dados do serviço
const updateService = (id, data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Serviço atualizado:', id, data);
      resolve({ success: true });
    }, 500);
  });
};

export default function EditServicePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Campos do formulário
  const [titulo, setTitulo] = useState('');
  const [preco, setPreco] = useState('');
  const [comissao, setComissao] = useState('');
  const [duracao, setDuracao] = useState('');
  const [recorrencia, setRecorrencia] = useState('');
  const [descricao, setDescricao] = useState('');
  const [status, setStatus] = useState('A');

  useEffect(() => {
    setLoading(true);
    fetchServiceDetails(id)
      .then((data) => {
        setService(data);
        setTitulo(data.titulo);
        setPreco(data.preco);
        setComissao(data.comissao);
        setDuracao(data.duracao);
        setRecorrencia(data.recorrencia);
        setDescricao(data.descricao);
        setStatus(data.status);
        setLoading(false);
      })
      .catch(() => {
        setError('Erro ao carregar dados do serviço');
        setLoading(false);
      });
  }, [id]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      await updateService(id, {
        titulo,
        preco,
        comissao,
        duracao,
        recorrencia,
        descricao,
        status,
      });
      setSaving(false);
      navigate(`/servico/${id}`); // Volta para detalhes após salvar
    } catch {
      setError('Erro ao salvar serviço.');
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate(`/servico/${id}`); // Volta para detalhes sem salvar
  };

  if (loading) return <div className={styles.loading}>Carregando dados do serviço...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.page}>
      <Sidebar />
      <div className={styles.mainArea}>
        <div className={styles.topBar}></div>
        <div className={styles.content}>
          <form className={styles.form} onSubmit={handleSave}>
            {/* Primeira linha: Título, Preço, Comissão */}
            <label>
              Título:
              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
              />
            </label>

            <label>
              Preço (R$):
              <input
                type="number"
                step="0.01"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                required
              />
            </label>

            <label>
              Comissão (%):
              <input
                type="number"
                value={comissao}
                onChange={(e) => setComissao(e.target.value)}
                min="0"
                max="100"
                required
              />
            </label>

            {/* Segunda linha: Duração, Recorrência, Status */}
            <label>
              Duração:
              <input
                type="text"
                value={duracao}
                onChange={(e) => setDuracao(e.target.value)}
                required
              />
            </label>

            <label>
              Recorrência (dias):
              <input
                type="number"
                value={recorrencia}
                onChange={(e) => setRecorrencia(e.target.value)}
                min="0"
                required
              />
            </label>

            <label>
              Status:
              <select value={status} onChange={(e) => setStatus(e.target.value)} required>
                <option value="A">Ativo</option>
                <option value="B">Bloqueado</option>
                <option value="C">Cancelado</option>
              </select>
            </label>

            {/* Descrição ocupando toda a largura embaixo */}
            <label className={styles.fullWidth}>
              Descrição:
              <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                rows="6"
                required
              />
            </label>

            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.buttons}>
              <button
                type="button"
                onClick={handleCancel}
                disabled={saving}
                className={styles.cancelBtn}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={saving}
                className={styles.saveBtn}
              >
                {saving ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
