import React, { useEffect, useState } from "react";

const InstallPWAButton: React.FC = () => {
  const [installPrompt, setInstallPrompt] = useState<Event | null>(null);
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault(); // Evita que el navegador muestre automáticamente el prompt
      setInstallPrompt(e);
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
      });
    }
  };

  return (
      <button onClick={handleInstallClick} style={{ padding: "10px", fontSize: "16px" }}>
        Instalar App
      </button>
    
  );
};

export default InstallPWAButton;
