import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getPhones, saveUserPreferences } from "../services/firestoreService";
import { logout } from "../services/authService";
import logo from "../assets/images/logo.png";
import mountainBackground from "../assets/images/mountain-background.jpg";
import "../styles/animations.css";

// Imagen de banner por defecto
const DEFAULT_BANNER = mountainBackground;

// Estilos para el componente
const styles = {
  container: {
    maxWidth: '100%', minWidth: '600px',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
    position: 'relative',
    overflow: 'hidden',
  },
  content: {
    padding: '16px',
    // Ya no tiene transición para que permanezca estático
  },
  sidePanel: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '280px',
    height: '100vh',
    backgroundColor: 'white',
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
    zIndex: 100,
    transform: 'translateX(-100%)',
    transition: 'transform 0.3s ease',
  },
  sidePanelOpen: {
    transform: 'translateX(0)',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 90,
    opacity: 0,
    visibility: 'hidden',
    transition: 'all 0.3s ease',
  },
  overlayVisible: {
    opacity: 1,
    visibility: 'visible',
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    padding: '16px 0',
  },
  menuButton: {
    position: 'absolute',
    left: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#e5e7eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    border: 'none',
    overflow: 'hidden',
    zIndex: 10,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  profileInitial: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#4b5563',
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    width: '80px',
    height: 'auto',
    marginBottom: '8px',
  },
  appName: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginTop: '8px',
  },
  sidePanelHeader: {
    padding: '0',
    borderBottom: '1px solid #eee',
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '120px',
    objectFit: 'cover',
    borderRadius: '0',
    backgroundColor: '#4ade80',
  },
  userContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '-40px',
    padding: '0 16px 16px',
  },
  userAvatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: '#4ade80',
    border: '4px solid white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '24px',
    fontWeight: 'bold',
    overflow: 'hidden',
  },
  userName: {
    marginTop: '12px',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  userEmail: {
    color: '#6c757d',
    fontSize: '14px',
    marginTop: '4px',
  },
  menuSection: {
    padding: '16px',
    borderBottom: '1px solid #eee',
  },
  menuSectionTitle: {
    fontSize: '14px',
    color: '#6c757d',
    marginBottom: '8px',
  },
  menuItem: {
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    color: '#333',
    fontSize: '16px',
    textDecoration: 'none',
    borderRadius: '8px',
    marginBottom: '4px',
    cursor: 'pointer',
  },
  menuItemIcon: {
    marginRight: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
  },
  menuItemActive: {
    backgroundColor: '#f3f4f6',
  },
  logoutButton: {
    margin: '16px',
    padding: '12px',
    backgroundColor: '#f3f4f6',
    color: '#333',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    width: 'calc(100% - 32px)',
    textAlign: 'center',
    cursor: 'pointer',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '24px',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: '14px',
    color: '#6c757d',
    marginBottom: '8px',
    textAlign: 'center',
  },
  optionContainer: {
    display: 'flex',
    flexWrap: 'nowrap',
overflowX: 'auto',
    gap: '8px',
    justifyContent: 'center',
    marginBottom: '24px',
  },
  optionButton: {
    padding: '8px 16px',
    borderRadius: '24px',
    border: '1px solid #ddd',
    backgroundColor: 'white',
    fontSize: '14px',
    cursor: 'pointer',
  },
  selectedOption: {
    backgroundColor: '#4ade80',
    color: 'white',
    borderColor: '#4ade80',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '20px 0',
  },
  loadingSpinner: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    border: '3px solid rgba(0, 0, 0, 0.1)',
    borderTopColor: '#4ade80',
    animation: 'spin 1s linear infinite',
  },
  // Actualizado para mostrar los resultados de lado a lado
  
  highlightCard: {
    border: '2px solid #4ade80',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    transform: 'scale(1.05)',
  },
  resultsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    margin: '0 auto',
    flexWrap: 'nowrap',
overflowX: 'auto',
    padding: '16px',
    maxWidth: '100%', minWidth: '600px',
  },
  phoneCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    border: '1px solid #eee',
    padding: '12px',
    width: '100%',
    maxWidth: '180px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer',
  },
  emptyCard: {
    width: '100%',
    maxWidth: '180px',
    height: '260px', // Ajustar según sea necesario
  },
  phoneImage: {
    width: '100%',
    height: '120px',
    backgroundColor: '#f1f1f1',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '8px',
  },
  phoneName: {
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '4px',
    textAlign: 'center',
    color: '#333',
  },
  phonePrice: {
    fontSize: '16px',
    color: '#4ade80',
    fontWeight: 'bold',
    marginBottom: '8px',
    textAlign: 'center',
  },
  actionButton: {
    width: '100%',
    padding: '8px',
    backgroundColor: '#4ade80',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    cursor: 'pointer',
  },
};

// Iconos utilizados en el menú lateral
const Icons = {
  Edit: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
  ),
  Notification: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>
  ),
  Support: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
      <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
  ),
  Terms: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  ),
};

const Home = () => {
  const { currentUser, userProfile } = useAuth();
  const navigate = useNavigate();
  
  // Estados para los filtros
  const [priceRange, setPriceRange] = useState(
    userProfile?.preferences?.priceRange || null
  );
  const [os, setOS] = useState(userProfile?.preferences?.os || null);
  const [preference, setPreference] = useState(
    userProfile?.preferences?.preference || null
  );
  const [results, setResults] = useState([]);
  const [cache, setCache] = useState({});
  const [loading, setLoading] = useState(false);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  // Rangos de precios
  const priceRanges = [
    "0-$200",
    "$200-$400",
    "$400-$600",
    "$600-$800",
    "$800 o más"
  ];

  // Opciones de sistema operativo
  const osOptions = ["iOS", "Android", "Da igual"];

  // Opciones de preferencia
  const preferenceOptions = ["Batería", "Cámara", "Rendimiento"];

  // Función para buscar teléfonos con los filtros actuales
  const searchPhones = async () => {
    setLoading(true);
    try {
      console.log('Buscando con filtros:', {
        priceRange,
        os,
        preference
      });
      
      // Guardar preferencias si el usuario está conectado
      if (currentUser) {
        await saveUserPreferences(currentUser.uid, {
          priceRange,
          os,
          preference
        });
      }

      // Parámetros para la búsqueda
      const searchParams = {};
      
      // Aplicar filtro de precio
      if (priceRange) {
        searchParams.Filtro = priceRange;
      }
      
      // Aplicar filtro de OS, solo si no es "Da igual"
      if (os && os !== "Da igual") {
        searchParams.OS = os.toLowerCase();
      }
      
      // Campo para ordenar según la preferencia
      let orderByField = "";
      let orderDirection = "desc"; // Mayor a menor
      
      if (preference) {
        switch(preference) {
          case "Cámara":
            orderByField = "Dxo_Camera";
            break;
          case "Batería":
            orderByField = "Battery_Life_Nano";
            break;
          case "Rendimiento":
            orderByField = "Antutu";
            break;
          default:
            orderByField = "";
        }
      }
      
      // Obtener teléfonos filtrados desde Firebase
      const cacheKey = JSON.stringify({ filters: searchParams, orderByField });

      if (cache[cacheKey]) {
        setResults(cache[cacheKey]);
        setLoading(false);
        return;
      }

      const phones = await getPhones({
        filters: searchParams,
        orderByField: orderByField,
        orderDirection: orderDirection
      });
      
      // Limitar a 3 resultados
      const limitedResults = phones.slice(0, 3);
      
      // Transformar los resultados para el formato deseado
      const formattedResults = limitedResults.map(phone => ({
        id: phone.id,
        name: phone.Device,
        price: phone.Precio,
        imageUrl: phone.Link_IMG,
        linkUrl: phone.Link
      }));
      
      console.log('Resultados de búsqueda:', formattedResults);
      setResults(formattedResults);
      setCache(prev => ({ ...prev, [cacheKey]: formattedResults }));
    } catch (error) {
      console.error("Error buscando teléfonos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Manejadores para los cambios de selección con búsqueda automática
  const handlePriceRangeChange = (range) => {
    // Si ya está seleccionado, deseleccionar
    setPriceRange(range === priceRange ? null : range);
    
    // Esperar a que se actualice el estado antes de buscar
    setTimeout(() => {
      searchPhones();
    }, 100);
  };

  const handleOSChange = (option) => {
    setOS(option === os ? null : option);
    
    // Esperar a que se actualice el estado antes de buscar
    setTimeout(() => {
      searchPhones();
    }, 100);
  };

  const handlePreferenceChange = (pref) => {
    setPreference(pref === preference ? null : pref);
    
    // Esperar a que se actualice el estado antes de buscar
    setTimeout(() => {
      searchPhones();
    }, 100);
  };

  // Cerrar sesión
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  // Alternar menú lateral
  const toggleSideMenu = (e) => {
    if (e) e.stopPropagation();
    setSideMenuOpen(!sideMenuOpen);
  };

  // Cerrar menú al hacer clic en el overlay
  const closeSideMenu = () => {
    setSideMenuOpen(false);
  };

  // Cargar preferencias guardadas al montar el componente
  useEffect(() => {
    if (userProfile?.preferences) {
      setPriceRange(userProfile.preferences.priceRange);
      setOS(userProfile.preferences.os);
      setPreference(userProfile.preferences.preference);
      
      // Realizar una búsqueda inicial si hay preferencias guardadas
      if (
        userProfile.preferences.priceRange ||
        userProfile.preferences.os ||
        userProfile.preferences.preference
      ) {
        searchPhones();
      }
    }
  }, [userProfile]);

  // Reordenar los resultados para que el primer resultado esté en el medio,
  // el segundo a la izquierda y el tercero a la derecha
  const getOrderedResults = () => {
    let displayOrder = [];
    
    if (results.length === 1) {
      // Si solo hay un resultado, ponerlo en el medio
      displayOrder = [null, results[0], null];
    } else if (results.length === 2) {
      // Si hay dos resultados, ponerlos en el medio y a la izquierda
      displayOrder = [results[1], results[0], null];
    } else if (results.length >= 3) {
      // Si hay tres o más resultados, ordenarlos como se requiere
      displayOrder = [results[1], results[0], results[2]];
    } else {
      displayOrder = [null, null, null];
    }
    
    return displayOrder;
  };

  return (
    <div style={styles.container}>
      {/* Overlay para cerrar el menú lateral */}
      <div 
        style={{
          ...styles.overlay,
          ...(sideMenuOpen ? styles.overlayVisible : {})
        }} 
        onClick={closeSideMenu}
      />
      
      {/* Menú lateral */}
      <div 
        style={{
          ...styles.sidePanel,
          ...(sideMenuOpen ? styles.sidePanelOpen : {})
        }}
      >
        <div style={styles.sidePanelHeader}>
          <img src={DEFAULT_BANNER} alt="Banner" style={styles.bannerImage} />
          <div style={styles.userContainer}>
            <div style={styles.userAvatar}>
              {userProfile?.photoURL ? (
                <img 
                  src={userProfile.photoURL}
                  alt="Profile" 
                  style={styles.profileImage} 
                />
              ) : (
                <span>
                  {currentUser?.displayName
                    ? currentUser.displayName.charAt(0).toUpperCase()
                    : "R"}
                </span>
              )}
            </div>
            <h3 style={styles.userName}>
              {currentUser?.displayName || "Usuario"}
            </h3>
            <p style={styles.userEmail}>
              {currentUser?.email || ""}
            </p>
          </div>
        </div>
        
        <div style={styles.menuSection}>
          <h4 style={styles.menuSectionTitle}>Cuenta</h4>
          <div 
            style={styles.menuItem}
            onClick={() => {
              navigate('/profile/edit');
              closeSideMenu();
            }}
          >
            <span style={styles.menuItemIcon}><Icons.Edit /></span>
            Editar Perfil
          </div>
          <div 
            style={styles.menuItem}
            onClick={() => {
              navigate('/profile/notifications');
              closeSideMenu();
            }}
          >
            <span style={styles.menuItemIcon}><Icons.Notification /></span>
            Notificaciones
          </div>
        </div>
        
        <div style={styles.menuSection}>
          <h4 style={styles.menuSectionTitle}>Configuración</h4>
          <div 
            style={styles.menuItem}
            onClick={() => {
              navigate('/support');
              closeSideMenu();
            }}
          >
            <span style={styles.menuItemIcon}><Icons.Support /></span>
            Support
          </div>
          <div 
            style={styles.menuItem}
            onClick={() => {
              navigate('/terms');
              closeSideMenu();
            }}
          >
            <span style={styles.menuItemIcon}><Icons.Terms /></span>
            Terms of Service
          </div>
        </div>
        
        <button 
          style={styles.logoutButton}
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
      
      {/* Contenido principal - Ya no se desplaza cuando se abre el menú */}
      <div style={styles.content}>
        {/* Header con logo centrado y botón de menú a la izquierda */}
        <div style={styles.header}>
          <button 
            style={styles.menuButton} 
            onClick={toggleSideMenu}
          >
            {userProfile?.photoURL ? (
              <img 
                src={userProfile.photoURL} 
                alt="Profile" 
                style={styles.profileImage} 
              />
            ) : (
              <span style={styles.profileInitial}>
                {userProfile?.displayName
                  ? userProfile.displayName.charAt(0).toUpperCase()
                  : "R"}
              </span>
            )}

          </button>
          
          <div style={styles.logoContainer}>
            <img src={logo} alt="KilluApp" style={styles.logo} />
            <span style={styles.appName}>KilluApp</span>
          </div>
        </div>
        
        <h2 style={styles.title}>Compra el celular indicado para ti</h2>
        
        {/* Rango de precios */}
        <h3 style={styles.sectionTitle}>Precio (En miles de pesos :3)</h3>
        <div style={styles.optionContainer}>
          {priceRanges.map((range) => (
            <button
              key={range}
              onClick={() => handlePriceRangeChange(range)}
              style={{
                ...styles.optionButton,
                ...(priceRange === range ? styles.selectedOption : {})
              }}
            >
              {range}
            </button>
          ))}
        </div>
        
        {/* Sistema operativo */}
        <h3 style={styles.sectionTitle}>Sistema Operativo</h3>
        <div style={styles.optionContainer}>
          {osOptions.map((option) => (
            <button
              key={option}
              onClick={() => handleOSChange(option)}
              style={{
                ...styles.optionButton,
                ...(os === option ? styles.selectedOption : {})
              }}
            >
              {option}
            </button>
          ))}
        </div>
        
        {/* Preferencia */}
        <h3 style={styles.sectionTitle}>Preferencia</h3>
        <div style={styles.optionContainer}>
          {preferenceOptions.map((pref) => (
            <button
              key={pref}
              onClick={() => handlePreferenceChange(pref)}
              style={{
                ...styles.optionButton,
                ...(preference === pref ? styles.selectedOption : {})
              }}
            >
              {pref}
            </button>
          ))}
        </div>
        
        {/* Indicador de carga */}
        {loading && (
          <div style={styles.loadingContainer}>
            <div style={styles.loadingSpinner}></div>
          </div>
        )}
        
        {/* Resultados */}
        {!loading && (
          <>
            {results.length > 0 && <h3 style={styles.sectionTitle}>Resultado</h3>}
            
            <div style={styles.resultsContainer}>
              
{getOrderedResults().map((phone, index) => (
  phone ? (
    <a 
      key={phone.id || index}
      href={phone.linkUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      style={{ textDecoration: 'none' }}
    >
      <div style={{ 
        ...styles.phoneCard, 
        ...(index === 1 ? styles.highlightCard : {}) // Centro es el más importante
      }}>
        <div style={styles.phoneImage}>
          {phone.imageUrl ? (
            <img 
              src={phone.imageUrl} 
              alt={phone.name} 
              style={{ maxHeight: '100%', maxWidth: '100%', minWidth: '600px', objectFit: 'contain' }} 
            />
          ) : (
            <span style={{ color: '#aaa' }}>[Text Widget]</span>
          )}
        </div>
        <h4 style={styles.phoneName}>{phone.name || '[Text Widget]'}</h4>
        <p style={styles.phonePrice}>
          {phone.price ? `$${Number(phone.price).toLocaleString('es-CL')}` : 'Precio no disponible'}
        </p>
        <button style={styles.actionButton}>Ver celular</button>
      </div>
    </a>
  ) : (
    <div key={`empty-${index}`} style={styles.emptyCard}></div>
  )
))}

            </div>
            
            {/* Mensaje sin resultados */}
            {results.length === 0 && (
              <div style={{textAlign: 'center', color: '#6c757d', padding: '24px'}}>
                <p>Por favor, selecciona tus preferencias para ver recomendaciones</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;