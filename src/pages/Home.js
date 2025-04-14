// src/pages/Home.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getPhones, saveUserPreferences } from "../services/firestoreService";
import { logout } from "../services/authService";
import logo from "../assets/images/logo.png"; // Ensure you have this logo file

const Home = () => {
  const { currentUser, userProfile } = useAuth();
  const navigate = useNavigate();
  
  // Filter states
  const [priceRange, setPriceRange] = useState(
    userProfile?.preferences?.priceRange || null
  );
  const [os, setOS] = useState(userProfile?.preferences?.os || null);
  const [selectedFeatures, setSelectedFeatures] = useState(
    userProfile?.preferences?.features || []
  );
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // Price ranges
  const priceRanges = [
    "0-$200",
    "$200-$400",
    "$400-$600",
    "$600-$800",
    "$800 o más"
  ];

  // OS options
  const osOptions = ["iOS", "Android", "Da igual"];

  // Feature options
  const featureOptions = ["Batería", "Cámara", "Rendimiento"];

  // Handle feature selection
  const toggleFeature = (feature) => {
    if (selectedFeatures.includes(feature)) {
      setSelectedFeatures(selectedFeatures.filter(f => f !== feature));
    } else {
      setSelectedFeatures([...selectedFeatures, feature]);
    }
  };

  // Apply filters and search for phones
  const handleSearch = async () => {
    setLoading(true);
    try {
      // Save user preferences if logged in
      if (currentUser) {
        await saveUserPreferences(currentUser.uid, {
          priceRange,
          os,
          features: selectedFeatures
        });
      }

      // Get filtered phones
      const phones = await getPhones({
        priceRange,
        os,
        features: selectedFeatures
      });
      
      setResults(phones);
    } catch (error) {
      console.error("Error searching phones:", error);
      // You might want to show an error message here
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Toggle profile menu
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  // Load user's saved preferences on component mount
  useEffect(() => {
    if (userProfile?.preferences) {
      setPriceRange(userProfile.preferences.priceRange);
      setOS(userProfile.preferences.os);
      setSelectedFeatures(userProfile.preferences.features || []);
      
      // If user had previous preferences, automatically search
      if (
        userProfile.preferences.priceRange ||
        userProfile.preferences.os ||
        (userProfile.preferences.features && userProfile.preferences.features.length > 0)
      ) {
        handleSearch();
      }
    }
  }, [userProfile]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <img className="h-8 w-auto" src={logo} alt="KilluApp" />
                <span className="ml-2 text-xl font-bold">KilluApp</span>
              </div>
            </div>
            <div className="flex items-center">
              {currentUser && (
                <div className="ml-3 relative">
                  <div>
                    <button
                      onClick={toggleMenu}
                      className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                      id="user-menu"
                      aria-haspopup="true"
                    >
                      <span className="sr-only">Open user menu</span>
                      {currentUser.photoURL ? (
                        <img
                          className="h-8 w-8 rounded-full"
                          src={currentUser.photoURL}
                          alt=""
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                          <span className="text-xs font-medium text-gray-700">
                            {currentUser.displayName
                              ? currentUser.displayName.charAt(0).toUpperCase()
                              : "U"}
                          </span>
                        </div>
                      )}
                    </button>
                  </div>
                  
                  {/* Profile dropdown */}
                  {showMenu && (
                    <div
                      className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu"
                    >
                      <a
                        href="#"
                        onClick={() => navigate('/profile')}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Mi Perfil
                      </a>
                      <a
                        href="#"
                        onClick={() => navigate('/notifications')}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Notificaciones
                      </a>
                      <a
                        href="#"
                        onClick={() => navigate('/support')}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Soporte
                      </a>
                      <a
                        href="#"
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Cerrar sesión
                      </a>
                    </div>
                  )}
                </div>
              )}
              
              {!currentUser && (
                <div>
                  <button
                    onClick={() => navigate('/login')}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    Iniciar sesión
                  </button>
                  <button
                    onClick={() => navigate('/register')}
                    className="ml-2 px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800"
                  >
                    Registrarse
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Compra el celular indicado para ti
            </h1>

            {/* Filters */}
            <div className="space-y-6">
              {/* Price Range */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-3">
                  Precio (En miles de pesos :3)
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {priceRanges.map((range) => (
                    <button
                      key={range}
                      onClick={() => setPriceRange(range)}
                      className={`px-4 py-2 rounded-md text-sm font-medium 
                        ${
                          priceRange === range
                            ? "bg-teal-100 text-teal-800 border border-teal-300"
                            : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
                        }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              {/* Operating System */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-3">
                  Sistema Operativo
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {osOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => setOS(option)}
                      className={`px-4 py-2 rounded-md text-sm font-medium 
                        ${
                          os === option
                            ? "bg-teal-100 text-teal-800 border border-teal-300"
                            : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
                        }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-3">
                  Preferencia
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {featureOptions.map((feature) => (
                    <button
                      key={feature}
                      onClick={() => toggleFeature(feature)}
                      className={`px-4 py-2 rounded-md text-sm font-medium 
                        ${
                          selectedFeatures.includes(feature)
                            ? "bg-teal-100 text-teal-800 border border-teal-300"
                            : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
                        }`}
                    >
                      {feature}
                    </button>
                  ))}
                </div>
              </div>

              {/* Search Button */}
              <div className="pt-4">
                <button
                  onClick={handleSearch}
                  disabled={loading}
                  className="w-full px-6 py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {loading ? "Buscando..." : "Buscar"}
                </button>
              </div>
            </div>

            {/* Results */}
            {results.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-medium text-gray-900 mb-3">
                  Resultado
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.map((phone) => (
                    <div
                      key={phone.id}
                      className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
                    >
                      <div className="p-5">
                        <div className="flex items-center justify-center h-40 bg-gray-200 rounded-md">
                          {phone.imageUrl ? (
                            <img
                              src={phone.imageUrl}
                              alt={phone.name}
                              className="h-full object-contain"
                            />
                          ) : (
                            <div className="text-gray-400">No image</div>
                          )}
                        </div>
                        <h3 className="mt-4 text-lg font-medium text-gray-900">
                          {phone.name}
                        </h3>
                        <p className="mt-1 text-xl font-semibold text-teal-600">
                          ${phone.price.toFixed(2)}
                        </p>
                        <p className="mt-2 text-sm text-gray-600">
                          {phone.description || "Sin descripción"}
                        </p>
                        <div className="mt-4">
                          <button className="w-full px-4 py-2 bg-teal-100 text-teal-800 font-medium rounded-md hover:bg-teal-200">
                            Recieve Funds
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No results */}
            {results.length === 0 && loading === false && (
              <div className="mt-8 text-center p-6 bg-gray-50 rounded-lg">
                <p className="text-gray-500">
                  Por favor, selecciona tus preferencias y haz clic en "Buscar"
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;