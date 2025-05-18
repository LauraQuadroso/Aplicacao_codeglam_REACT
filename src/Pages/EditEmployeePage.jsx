import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { FaCamera } from 'react-icons/fa';
import styles from './EditEmployeePage.module.css';

/* ---------- mock de API ---------- */
const updateEmployee = (id, data) =>
  new Promise((resolve) =>
    setTimeout(() => {
      console.log('Funcionário atualizado:', id, data);
      resolve({ success: true });
    }, 1000)
  );
/* --------------------------------- */

export default function EditEmployeePage() {
  const navigate = useNavigate();
  const { id } = useParams();

  /* estados do feedback */
  const [saving, setSaving] = useState(false);
  const [saved,  setSaved]  = useState(false);

  /* estados dos campos (exemplo) */
  const [fullName,       setFullName]       = useState('');
  const [birthdate,      setBirthdate]      = useState('');
  const [cpf,            setCpf]            = useState('');
  const [employeeId,     setEmployeeId]     = useState('');
  const [startDate,      setStartDate]      = useState('');
  const [position,       setPosition]       = useState('');
  const [benefits,       setBenefits]       = useState('');
  const [healthIssues,   setHealthIssues]   = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [tel,            setTel]            = useState('');
  const [email,          setEmail]          = useState('');

  /* cancelar → rota fixa /funcionario/:id */
  const handleCancel = () => navigate(`/funcionario/${id}`);

  /* salvar */
  const handleSave = async (e) => {
    e.preventDefault();
    if (saving) return;
    setSaving(true);
    setSaved(false);

    try {
      await updateEmployee(id, {
        fullName,
        birthdate,
        cpf,
        employeeId,
        startDate,
        position,
        benefits,
        healthIssues,
        additionalInfo,
        tel,
        email,
      });
      setSaving(false);
      setSaved(true);
      /* mostra “Salvo ✓” e redireciona após 1,5 s */
      setTimeout(() => navigate(`/funcionario/${id}`), 1500);
    } catch {
      setSaving(false);
      alert('Erro ao salvar funcionário'); // troque por toast se desejar
    }
  };

  return (
    <div className={styles.page}>
      <Sidebar />
      <div className={styles.content}>
        <div className={styles.topBar}></div>

        <div className={styles.formContainer}>
          {/* avatar */}
          <div className={styles.avatarSection}>
            <img
              src="https://randomuser.me/api/portraits/women/89.jpg"
              alt="Avatar"
              className={styles.avatar}
            />
            <label htmlFor="avatar-upload" className={styles.cameraIcon}>
              <FaCamera />
              <input id="avatar-upload" type="file" hidden accept="image/*" />
            </label>
          </div>

          {/* formulário */}
          <form className={styles.form} onSubmit={handleSave}>
            {/* linha 1 */}
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

            {/* linha 2 */}
            <div className={styles.row}>
              <div>
                <label htmlFor="employeeId">ID do Funcionário</label>
                <input
                  id="employeeId"
                  type="text"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  placeholder="#EMP123"
                />
              </div>
              <div>
                <label htmlFor="startDate">Data de admissão</label>
                <input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="position">Cargo</label>
                <input
                  id="position"
                  type="text"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  placeholder="Ex: Designer de Unhas"
                />
              </div>
            </div>

            {/* linha 3 */}
            <div className={styles.row}>
              <div>
                <label htmlFor="benefits">Benefícios</label>
                <input
                  id="benefits"
                  type="text"
                  value={benefits}
                  onChange={(e) => setBenefits(e.target.value)}
                  placeholder="Ex: VT, VR"
                />
              </div>
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

            {/* linha 4 */}
            <div className={styles.row}>
              <div>
                <label htmlFor="additionalInfo">Informações adicionais</label>
                <input
                  id="additionalInfo"
                  type="text"
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  placeholder="Ex: Entrada 09:00 - Saída 18:00"
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
                  placeholder="exemplo@email.com"
                />
              </div>
            </div>

            {/* botões */}
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
