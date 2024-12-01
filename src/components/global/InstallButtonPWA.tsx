import React, { useEffect, useState } from "react";

const InstallPWAButton: React.FC = () => {
    const [installPrompt, setInstallPrompt] = useState<Event | null>(null);
    const [isVisible, setIsVisible] = useState(false);
  
    useEffect(() => {
      const handleBeforeInstallPrompt = (e: Event) => {
        e.preventDefault(); // Evita que el navegador muestre automáticamente el prompt
        setInstallPrompt(e);
        setIsVisible(true); // Muestra el botón de instalación
      };
  
      window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
  
      return () => {
        window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      };
    }, []);
  
    const handleInstallClick = () => {
      if (installPrompt) {
        (installPrompt as any).prompt(); // Muestra el cuadro de instalación
        (installPrompt as any).userChoice.then((choiceResult: any) => {
          if (choiceResult.outcome === "accepted") {
            console.log("PWA instalada");
          } else {
            console.log("PWA no instalada");
          }
          setInstallPrompt(null);
          setIsVisible(false); // Oculta el botón tras la acción
        });
      }
    };
  return (isVisible && (
    <div className="flex justify-center items-center  ">
      <button onClick={handleInstallClick} style={{ padding: "10px", fontSize: "16px" }} className="flex justify-center items-center flex-row bg-gray-500 text-white rounded w-[90%] mb-10">
        Instalar App &nbsp;
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-in-down" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M3.5 6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8A1.5 1.5 0 0 1 3.5 5h2a.5.5 0 0 1 0 1z"/>
        <path fill-rule="evenodd" d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
        </svg>
      </button>
      
      </div>
  ));
};

export default InstallPWAButton;
