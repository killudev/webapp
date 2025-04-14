// src/pages/Support.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Support = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <button 
                onClick={() => navigate('/profile')}
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
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
                Volver al perfil
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">Soporte</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-8">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-lg leading-6 font-medium text-gray-900">¿Cómo podemos ayudarte?</h2>
                <div className="mt-5">
                  <div className="rounded-md bg-gray-50 px-6 py-5 sm:flex sm:items-start sm:justify-between">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 sm:mt-0 sm:ml-4">
                        <h3 className="text-sm font-medium text-gray-900">Email de soporte</h3>
                        <div className="mt-1 text-sm text-gray-600">
                          <p>support@killuapp.com</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 rounded-md bg-gray-50 px-6 py-5 sm:flex sm:items-start sm:justify-between">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 sm:mt-0 sm:ml-4">
                        <h3 className="text-sm font-medium text-gray-900">Teléfono de soporte</h3>
                        <div className="mt-1 text-sm text-gray-600">
                          <p>+1 (555) 123-4567</p>
                          <p className="mt-1">Lun - Vie: 9:00 AM - 6:00 PM</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5">
                    <h3 className="text-lg font-medium text-gray-900">Preguntas frecuentes</h3>
                    <div className="mt-3 space-y-4">
                      <div className="bg-gray-50 px-4 py-5 sm:px-6 rounded-md">
                        <dt className="text-sm font-medium text-gray-900">¿Cómo cambio mis preferencias de notificación?</dt>
                        <dd className="mt-2 text-sm text-gray-600">
                          Puedes cambiar tus preferencias de notificación en la sección "Notificaciones" de tu perfil.
                        </dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-5 sm:px-6 rounded-md">
                        <dt className="text-sm font-medium text-gray-900">¿Cómo actualizo mi información de perfil?</dt>
                        <dd className="mt-2 text-sm text-gray-600">
                          Ve a "Editar Perfil" en el menú de tu perfil para actualizar tu información personal.
                        </dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-5 sm:px-6 rounded-md">
                        <dt className="text-sm font-medium text-gray-900">¿Cómo cambio mi contraseña?</dt>
                        <dd className="mt-2 text-sm text-gray-600">
                          Puedes cambiar tu contraseña en la sección "Editar Perfil" de tu cuenta.
                        </dd>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Support;