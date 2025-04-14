
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "../../styles/EditProfile.css";

import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { getUserProfile, saveExtendedUserProfile } from "../../services/firestoreService";
import { uploadProfileImage } from "../../services/storageService";
import imageCompression from "browser-image-compression";

const EditProfile = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile(currentUser.uid);
        setDisplayName(data.displayName || "");
        setPhotoURL(data.photoURL || "");
        setBirthDate(data.birthDate || "");
        setGender(data.gender || "");
        setPhone(data.phone || "");
      } catch (error) {
        console.error("Error al cargar perfil:", error);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser?.uid) {
      fetchProfile();
    }
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await saveExtendedUserProfile(currentUser.uid, {
        displayName,
        photoURL,
        birthDate,
        gender,
        phone,
      });

      console.log("Perfil actualizado con éxito.");
      navigate("/profile");
    } catch (error) {
      console.error("Error al guardar el perfil:", error);
      alert("Hubo un error al guardar tu perfil. Intenta de nuevo.");
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="form-box" style={{ textAlign: "center" }}>
          <p>Cargando perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <button className="volver-btn" onClick={() => navigate("/")}>
        ← Volver
      </button>

      <form className="form-box" onSubmit={handleSubmit}>
        <h1>Editar Perfil</h1>

        <div className="profile-picture-container">
          <div className="profile-picture-wrapper">
            <img
              src={photoURL || "https://via.placeholder.com/150"}
              alt="Foto de perfil"
              className="profile-picture"
            />
            <label className="edit-icon">
              ✏️
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={async (e) => {
                  const file = e.target.files[0];
                  if (file) {
                    try {
                      const compressedFile = await imageCompression(file, {
                        maxWidthOrHeight: 300,
                        maxSizeMB: 0.2,
                      });
                      const url = await uploadProfileImage(compressedFile, currentUser.uid);
                      setPhotoURL(url);
                    } catch (error) {
                      console.error("Error subiendo imagen:", error);
                      alert("No se pudo subir la imagen. Intenta nuevamente.");
                    }
                  }
                }}
              />
            </label>
          </div>
        </div>

        <label>Nombre</label>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Tu nombre"
        />

        <label>Fecha de Nacimiento</label>
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />

        <label>Género</label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">Selecciona</option>
          <option value="masculino">Masculino</option>
          <option value="femenino">Femenino</option>
          <option value="otro">Otro</option>
          <option value="no_responder">Prefiero no decirlo</option>
        </select>

        <label>Celular</label>
        <PhoneInput
          defaultCountry="CL"
          value={phone}
          onChange={setPhone}
          placeholder="Ingresa tu número"
        />

        <div className="buttons">
          <button
            type="button"
            className="cancel"
            onClick={() => navigate("/profile")}
          >
            Cancelar
          </button>
          <button type="submit" className="save">
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
