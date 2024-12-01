import React, { useEffect, useState } from "react";
interface Navigator {
  standalone?: boolean;
}
const InstallPWAButton: React.FC = () => {
  const [installPrompt, setInstallPrompt] = useState<Event | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Verifica si la PWA ya está instalada
    const checkIfInstalled = () => {
      const isStandalone =
        window.matchMedia("(display-mode: standalone)").matches || 
        (navigator as Navigator).standalone;
      setIsInstalled(!!isStandalone);
    };

    // Comprueba el estado al cargar el componente
    checkIfInstalled();

    // Captura el evento beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      if (!isInstalled) {
        setInstallPrompt(e);
        setIsVisible(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, [isInstalled]);

  const handleInstallClick = () => {
    if (installPrompt) {
      (installPrompt as any).prompt();
      (installPrompt as any).userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === "accepted") {
          console.log("PWA instalada");
          setIsInstalled(true);
        } else {
          console.log("PWA no instalada");
        }
        setInstallPrompt(null);
        setIsVisible(false);
      });
    }
  };


  
  return (
    !isInstalled && isVisible && (
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
