import React from "react";

const IframeControl = () => {
    return (
        <div className="w-full h-screen">
            <iframe
                src="https://classbarber-control-asw-894.vercel.app/"
                style={{ width: "100%", height: "100%" }} // Estilo en línea para el iframe
                title="Control ClassBarber"
                frameBorder="0" // Opcional: Elimina los bordes
                allowFullScreen // Opcional: Permite modo pantalla completa si es necesario
            />
        </div>
    );
};

export default IframeControl;
