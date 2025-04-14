// src/pages/NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const NotFound = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <h1 className="text-9xl font-extrabold text-gray-900">404</h1>
        <p className="mt-2 text-3xl font-bold text-gray-900 tracking-tight sm:text-4xl">Página no encontrada</p>
        <p className="mt-4 text-lg text-gray-600">
          Lo sentimos, no pudimos encontrar la página que estás buscando.
        </p>
        <div className="mt-8">
          <Link
            to={isAuthenticated ? '/' : '/login'}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            {isAuthenticated ? 'Volver al inicio' : 'Iniciar sesión'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;