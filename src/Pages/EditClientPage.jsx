import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { FaCamera } from 'react-icons/fa';
import styles from './EditEmployeePage.module.css'; // ajuste se o nome do CSS for diferente

/* ----- mock de API para salvar ----- */
const updateClient = (id, data) =>
  new Promise((resolve) =>
    setTimeout(() => {
      console.log('Cliente atualizado:', id, data);
      resolve({ success: true });
    }, 1000)
  );
/* ----------------------------------- */

export default function EditClientPage() {
  const navigate = useNavigate();
  const { id } = useParams();            // ID do cliente na URL

  /* feedback */
  const [saving, setSaving] = useState(false);
  const [saved,  setSaved]  = useState(false);

  /* estados dos campos (exemplo) */
  const [fullName,       setFullName]       = useState('');
  const [birthdate,      setBirthdate]      = useState('');
  const [cpf,            setCpf]            = useState('');
  const [clientId,       setClientId]       = useState('');
  const [startDate,      setStartDate]      = useState('');
  const [favorites,      setFavorites]      = useState('');
  const [healthIssues,   setHealthIssues]   = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [tel,            setTel]            = useState('');
  const [email,          setEmail]          = useState('');

  /* cancelar → volta para detalhes */
  const handleCancel = () => navigate(`/cliente/${id}`);

  /* salvar */
  const handleSave = async (e) => {
    e.preventDefault();
    if (saving) return;
    setSaving(true);
    setSaved(false);

    try {
      await updateClient(id, {
        fullName,
        birthdate,
        cpf,
        clientId,
        startDate,
        favorites,
        healthIssues,
        additionalInfo,
        tel,
        email,
      });
      setSaving(false);
      setSaved(true);
      setTimeout(() => navigate(`/cliente/${id}`), 1500);
    } catch {
      setSaving(false);
      alert('Erro ao salvar cliente'); // troque por toast se desejar
    }
  };

  return (
    <div className={styles.page}>
      <Sidebar />

      {/* Conteúdo principal */}
      <div className={styles.content}>
        <div className={styles.topBar}></div>

        {/* Container do formulário */}
        <div className={styles.formContainer}>
          {/* Avatar e upload */}
          <div className={styles.avatarSection}>
            <img
              src="https://randomuser.me/api/portraits/women/45.jpg"
              alt="Avatar"
              className={styles.avatar}
            />
            <label htmlFor="avatar-upload" className={styles.cameraIcon}>
              <FaCamera />
              <input id="avatar-upload" type="file" hidden accept="image/*" />
            </label>
          </div>

          {/* Formulário de edição */}
          <form className={styles.form} onSubmit={handleSave}>
            <div className={styles.row}>
              <div>
                <label htmlFor="fullName">Nome completo</label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Nome completo"
                />
              </div>
              <div>
                <label htmlFor="birthdate">Data de nascimento</label>
                <input
                  id="birthdate"
                  type="date"
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="cpf">CPF</label>
                <input
                  id="cpf"
                  type="text"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  placeholder="000.000.000-00"
                />
              </div>
            </div>

            <div className={styles.row}>
              <div>
                <label htmlFor="clientId">ID do Cliente</label>
                <input
                  id="clientId"
                  type="text"
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  placeholder="12345"
                />
              </div>
              <div>
                <label htmlFor="startDate">Cliente desde</label>
                <input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="favorites">Favoritos</label>
                <input
                  id="favorites"
                  type="text"
                  value={favorites}
                  onChange={(e) => setFavorites(e.target.value)}
                  placeholder="Ex: Manicure"
                />
              </div>
            </div>

            <div className={styles.row}>
              <div>
                <label htmlFor="healthIssues">Problemas de saúde</label>
                <input
                  id="healthIssues"
                  type="text"
                  value={healthIssues}
                  onChange={(e) => setHealthIssues(e.target.value)}
                  placeholder="Ex: Nenhum"
                />
              </div>
            </div>

            <div className={styles.row}>
              <div>
                <label htmlFor="additionalInfo">Informações adicionais</label>
                <input
                  id="additionalInfo"
                  type="text"
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  placeholder="Prefere vir de manhã"
                />
              </div>
              <div>
                <label htmlFor="tel">Telefone</label>
                <input
                  id="tel"
                  type="text"
                  value={tel}
                  onChange={(e) => setTel(e.target.value)}
                  placeholder="(XX) XXXXX-XXXX"
                />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="juliana@gmail.com"
                />
              </div>
            </div>

            {/* Botões */}
            <div className={styles.buttonGroup}>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={handleCancel}
                disabled={saving}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className={styles.saveBtn}
                disabled={saving}
              >
                {saving
                  ? 'Salvando...'
                  : saved
                  ? 'Salvo ✓'
                  : 'Salvar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
