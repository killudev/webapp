// src/pages/TermsOfService.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const TermsOfService = () => {
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
            <h1 className="text-3xl font-bold leading-tight text-gray-900">Términos de Servicio</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-8">
              <div className="px-4 py-5 sm:p-6">
                <div className="prose prose-indigo prose-lg text-gray-500 mx-auto">
                  <p className="text-gray-700">Última actualización: Abril 15, 2025</p>
                  
                  <h2>1. Introducción</h2>
                  <p>
                    KilluApp ("nosotros", "nuestro", o "nos") provee un servicio de recomendación de teléfonos móviles 
                    a través de nuestra aplicación web (el "Servicio"). Estos Términos de Servicio rigen su acceso y uso 
                    del Servicio y constituyen un acuerdo legal entre usted y KilluApp.
                  </p>
                  
                  <h2>2. Uso del Servicio</h2>
                  <p>
                    Para utilizar nuestro Servicio, debe registrarse y mantener una cuenta activa. 
                    Usted es responsable de mantener la confidencialidad de su cuenta y contraseña y de 
                    todas las actividades que ocurran bajo su cuenta.
                  </p>
                  
                  <h2>3. Contenido del Servicio</h2>
                  <p>
                    KilluApp se esfuerza por proporcionar recomendaciones precisas basadas en sus preferencias. 
                    Sin embargo, no garantizamos la exactitud, integridad o utilidad de cualquier recomendación. 
                    Las decisiones de compra son su responsabilidad.
                  </p>
                  
                  <h2>4. Privacidad</h2>
                  <p>
                    Nuestra Política de Privacidad describe cómo recopilamos, usamos y compartimos su información 
                    personal. Al utilizar nuestro Servicio, usted acepta nuestras prácticas de privacidad.
                  </p>
                  
                  <h2>5. Propiedad Intelectual</h2>
                  <p>
                    El Servicio y su contenido original, características y funcionalidad son propiedad de KilluApp 
                    y están protegidos por derechos de autor, marcas registradas, patentes y otras leyes 
                    de propiedad intelectual.
                  </p>
                  
                  <h2>6. Terminación</h2>
                  <p>
                    Podemos terminar o suspender su cuenta y acceso al Servicio inmediatamente, sin previo aviso, 
                    por cualquier razón, incluyendo, sin limitación, si usted viola estos Términos de Servicio.
                  </p>
                  
                  <h2>7. Limitación de Responsabilidad</h2>
                  <p>
                    En ningún caso KilluApp será responsable por daños indirectos, incidentales, especiales, 
                    consecuentes o punitivos, incluyendo pérdida de ganancias, derivados de su uso del Servicio.
                  </p>
                  
                  <h2>8. Cambios a los Términos</h2>
                  <p>
                    Nos reservamos el derecho de modificar estos Términos de Servicio en cualquier momento. 
                    Si realizamos cambios materiales, le notificaremos a través del Servicio o por correo electrónico.
                  </p>
                  
                  <h2>9. Contacto</h2>
                  <p>
                    Si tiene alguna pregunta sobre estos Términos de Servicio, 
                    puede contactarnos en support@killuapp.com.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TermsOfService;