// src/components/profile/Notifications.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { updateNotificationPreferences } from "../../services/firestoreService";

const Notifications = () => {
  const { currentUser, userProfile, updateUserProfileState } = useAuth();
  const navigate = useNavigate();

  // Default notification settings
  const defaultSettings = {
    pushNotifications: true,
    emailNotifications: true,
    newDeals: true,
    phoneRecommendations: true,
    appUpdates: true,
    marketingEmails: false,
  };

  // State for notification settings
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Load user's notification settings on component mount
  useEffect(() => {
    if (userProfile && userProfile.notificationSettings) {
      setSettings(userProfile.notificationSettings);
    }
  }, [userProfile]);

  // Handle toggle change
  const handleToggle = (setting) => {
    setSettings({
      ...settings,
      [setting]: !settings[setting],
    });
  };

  // Save notification settings
  const handleSave = async () => {
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await updateNotificationPreferences(currentUser.uid, settings);
      
      // Update local state
      if (userProfile) {
        updateUserProfileState({
          ...userProfile,
          notificationSettings: settings,
        });
      }
      
      setSuccess(true);
    } catch (error) {
      console.error("Error updating notification settings:", error);
      setError("Error al guardar las preferencias de notificación. Por favor, intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="relative">
        <div className="bg-teal-500 h-32">
          <div className="w-full absolute top-0 left-0 h-12 bg-teal-600 flex items-center px-4">
            <button 
              onClick={() => navigate("/profile")}
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
              Perfil
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="-mt-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Notificaciones</h1>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
              Preferencias de notificación actualizadas con éxito.
            </div>
          )}

          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Canales de Notificación</h2>
              <div className="mt-3 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Notificaciones Push</h3>
                    <p className="text-xs text-gray-500">Recibir notificaciones en tu dispositivo</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleToggle("pushNotifications")}
                    className={`${
                      settings.pushNotifications ? 'bg-teal-600' : 'bg-gray-200'
                    } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500`}
                  >
                    <span className="sr-only">Enable push notifications</span>
                    <span
                      className={`${
                        settings.pushNotifications ? 'translate-x-5' : 'translate-x-0'
                      } pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                    >
                      <span
                        className={`${
                          settings.pushNotifications
                            ? 'opacity-0 ease-out duration-100'
                            : 'opacity-100 ease-in duration-200'
                        } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                      >
                        <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                          <path
                            d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span
                        className={`${
                          settings.pushNotifications
                            ? 'opacity-100 ease-in duration-200'
                            : 'opacity-0 ease-out duration-100'
                        } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                      >
                        <svg className="h-3 w-3 text-teal-600" fill="currentColor" viewBox="0 0 12 12">
                          <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                        </svg>
                      </span>
                    </span>
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Notificaciones por Email</h3>
                    <p className="text-xs text-gray-500">Recibir notificaciones por correo electrónico</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleToggle("emailNotifications")}
                    className={`${
                      settings.emailNotifications ? 'bg-teal-600' : 'bg-gray-200'
                    } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500`}
                  >
                    <span className="sr-only">Enable email notifications</span>
                    <span
                      className={`${
                        settings.emailNotifications ? 'translate-x-5' : 'translate-x-0'
                      } pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                    >
                      <span
                        className={`${
                          settings.emailNotifications
                            ? 'opacity-0 ease-out duration-100'
                            : 'opacity-100 ease-in duration-200'
                        } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                      >
                        <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                          <path
                            d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span
                        className={`${
                          settings.emailNotifications
                            ? 'opacity-100 ease-in duration-200'
                            : 'opacity-0 ease-out duration-100'
                        } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                      >
                        <svg className="h-3 w-3 text-teal-600" fill="currentColor" viewBox="0 0 12 12">
                          <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                        </svg>
                      </span>
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Tipos de Notificación</h2>
              <div className="mt-3 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Nuevas Ofertas</h3>
                    <p className="text-xs text-gray-500">Recibir notificaciones sobre nuevas ofertas</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleToggle("newDeals")}
                    className={`${
                      settings.newDeals ? 'bg-teal-600' : 'bg-gray-200'
                    } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500`}
                  >
                    <span className="sr-only">Enable new deals notifications</span>
                    <span
                      className={`${
                        settings.newDeals ? 'translate-x-5' : 'translate-x-0'
                      } pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                    >
                      <span
                        className={`${
                          settings.newDeals
                            ? 'opacity-0 ease-out duration-100'
                            : 'opacity-100 ease-in duration-200'
                        } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                      >
                        <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                          <path
                            d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span
                        className={`${
                          settings.newDeals
                            ? 'opacity-100 ease-in duration-200'
                            : 'opacity-0 ease-out duration-100'
                        } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                      >
                        <svg className="h-3 w-3 text-teal-600" fill="currentColor" viewBox="0 0 12 12">
                          <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                        </svg>
                      </span>
                    </span>
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Recomendaciones de Celulares</h3>
                    <p className="text-xs text-gray-500">Recibir sugerencias personalizadas</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleToggle("phoneRecommendations")}
                    className={`${
                      settings.phoneRecommendations ? 'bg-teal-600' : 'bg-gray-200'
                    } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500`}
                  >
                    <span className="sr-only">Enable phone recommendations</span>
                    <span
                      className={`${
                        settings.phoneRecommendations ? 'translate-x-5' : 'translate-x-0'
                      } pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                    ></span>
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Actualizaciones de la App</h3>
                    <p className="text-xs text-gray-500">Recibir notificaciones sobre nuevas funciones</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleToggle("appUpdates")}
                    className={`${
                      settings.appUpdates ? 'bg-teal-600' : 'bg-gray-200'
                    } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500`}
                  >
                    <span className="sr-only">Enable app updates</span>
                    <span
                      className={`${
                        settings.appUpdates ? 'translate-x-5' : 'translate-x-0'
                      } pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                    ></span>
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Emails de Marketing</h3>
                    <p className="text-xs text-gray-500">Recibir ofertas promocionales</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleToggle("marketingEmails")}
                    className={`${
                      settings.marketingEmails ? 'bg-teal-600' : 'bg-gray-200'
                    } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500`}
                  >
                    <span className="sr-only">Enable marketing emails</span>
                    <span
                      className={`${
                        settings.marketingEmails ? 'translate-x-5' : 'translate-x-0'
                      } pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                    ></span>
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => navigate("/profile")}
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={loading}
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  {loading ? "Guardando..." : "Guardar Cambios"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;