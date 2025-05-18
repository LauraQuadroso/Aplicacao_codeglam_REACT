import React, { useState } from "react";
import styles from "./SettingsSection.module.css";

export default function Interactions() {
  const [notifications, setNotifications] = useState(true);
  const [chat, setChat] = useState(false);
  const [saved, setSaved] = useState(false); // estado para controle do status

  const handleSave = () => {
    console.log("Notificações:", notifications, "Chat:", chat);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000); // volta ao normal depois de 3 segundos
  };

  return (
    <section className={styles.section}>
      <h2>Interações</h2>
      <label>
        <input type="checkbox" checked={notifications} onChange={() => setNotifications(!notifications)} />
        Notificações por email
      </label>
      <label>
        <input type="checkbox" checked={chat} onChange={() => setChat(!chat)} />
        Habilitar chat interno
      </label>
      <button className={styles.salvar} onClick={handleSave} disabled={saved}>
        {saved ? "Salvo" : "Salvar"}
      </button>
    </section>
  );
}
