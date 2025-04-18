// src/components/profile/ProfileMenu.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/authService";
import { useAuth } from "../../contexts/AuthContext";
import mountainBackground from "../../assets/images/mountain-background.jpg";

const ProfileMenu = () => {
  const { currentUser, userProfile } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header con imagen */}
      <div className="relative">
        <div
          className="h-48 bg-cover bg-center"
          style={{ backgroundImage: `url(${mountainBackground})` }}
        >
          <div className="absolute top-0 left-0 right-0 bg-teal-600/80 h-12 flex items-center px-4">
            <button
              onClick={() => navigate("/")}
              className="text-white font-medium flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              HomePage
            </button>
          </div>
        </div>
      </div>

      {/* Info del perfil */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="-mt-12 sm:-mt-16 flex flex-col items-center">
          <div className="h-24 w-24 rounded-full ring-4 ring-white bg-teal-100 flex items-center justify-center overflow-hidden">
            {userProfile?.photoURL ? (
              <img
                className="h-24 w-24 object-cover"
                src={userProfile.photoURL}
                alt="Foto de perfil"
              />
            ) : (
              <span className="text-3xl font-semibold text-teal-700">
                {userProfile?.displayName
                  ? userProfile.displayName.charAt(0).toUpperCase()
                  : "U"}
              </span>
            )}
          </div>

          <div className="mt-4 text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              {userProfile?.displayName || "[Nombre]"}
            </h1>
            <p className="text-sm text-gray-500">
              {userProfile?.email || currentUser?.email || "[Email]"}
            </p>
          </div>
        </div>

        {/* Opciones del menú */}
        <div className="mt-8 bg-white shadow rounded-lg overflow-hidden">
          <h2 className="sr-only">Cuenta</h2>
          <div className="divide-y divide-gray-200">
            <div className="p-4 bg-gray-50">
              <p className="text-sm font-medium text-gray-500">Cuenta</p>
            </div>

            <button
              onClick={() => navigate("/profile/edit")}
              className="w-full p-4 flex items-center text-left hover:bg-gray-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400 mr-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                <path
                  fillRule="evenodd"
                  d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm font-medium text-gray-700">Editar Perfil</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400 ml-auto"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <button
              onClick={() => navigate("/profile/notifications")}
              className="w-full p-4 flex items-center text-left hover:bg-gray-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400 mr-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
              <p className="text-sm font-medium text-gray-700">Notificaciones</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400 ml-auto"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {/* Más opciones si quieres… */}
          </div>
        </div>

        {/* Cierre de sesión */}
        <div className="mt-6">
          <button
            onClick={handleLogout}
            className="w-full py-3 text-center text-sm font-medium text-white bg-red-500 rounded-md shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;
