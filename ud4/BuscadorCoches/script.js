// Escucha el evento 'submit' del formulario y ejecuta la función cuando el usuario envíe la búsqueda.
document.getElementById('carSearchForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de la forma tradicional y recargue la página.
    
    // Mostrar el contenedor de resultados.
    const resultContainer = document.getElementById('resultContainer');
    resultContainer.style.display = 'block'; // Hace visible el área donde se mostrarán los resultados.
    
    // Función para obtener el texto de una opción seleccionada en un <select>.
    function getSelectedText(elementId) {
        const select = document.getElementById(elementId);
        return select.options[select.selectedIndex].text;
    }
    
    // Obtener valores seleccionados por el usuario.
    const tipo = document.getElementById('tipo').value;
    const combustible = document.getElementById('combustible').value;
    const transmision = document.getElementById('transmision').value;
    const precio = document.getElementById('precio').value;
    const plazas = document.getElementById('plazas').value;
    const potencia = document.getElementById('potencia').value;
    
    // Mapeo de extras para que se muestren con nombres legibles.
    const extrasMap = {
        'gps': 'GPS/Navegador',
        'camara': 'Cámara de aparcamiento',
        'sensors': 'Sensores de aparcamiento',
        'bluetooth': 'Bluetooth',
        'asistente': 'Asistente de conducción'
    };
    
    // Obtener todos los extras seleccionados.
    const extrasSeleccionados = [];
    document.querySelectorAll('input[name="extras"]:checked').forEach(checkbox => {
        extrasSeleccionados.push(extrasMap[checkbox.value]);
    });

    // Asignar un precio base aproximado según el tipo de coche elegido.
    let precioEstimado = 0;
    const preciosBase = {
        'sedan': 25000,
        'suv': 35000,
        'hatchback': 20000,
        'coupe': 30000,
        'pickup': 40000,
        'familiar': 28000,
        'furgoneta': 32000,
        'descapotable': 50000
    };

    if (tipo) {
        precioEstimado = preciosBase[tipo] || 0; // Si hay un tipo seleccionado, asigna su precio base.
    }

    // Ajustar el precio en función del combustible.
    const ajusteCombustible = {
        'gasolina': 0,        // Sin ajuste
        'diesel': 2000,       // +2000€ por ser diésel
        'hibrido': 5000,      // +5000€ por ser híbrido
        'electrico': 10000    // +10000€ por ser eléctrico
    };

    if (combustible) {
        precioEstimado += ajusteCombustible[combustible] || 0;
    }

    // Ajustar el precio según la transmisión.
    const ajusteTransmision = {
        'manual': 0,          // Sin ajuste
        'automatica': 3000,   // +3000€ por ser automática
        'semiautomatica': 2000 // +2000€ por ser semiautomática
    };

    if (transmision) {
        precioEstimado += ajusteTransmision[transmision] || 0;
    }

    // Ajustar el precio según la potencia elegida.
    const ajustePotencia = {
        '100': 0,      // Menos de 100CV, sin ajuste
        '150': 3000,   // 100-150 CV, +3000€
        '200': 6000,   // 150-200 CV, +6000€
        '250': 9000,   // 200-250 CV, +9000€
        '300': 15000   // Más de 250 CV, +15000€
    };

    if (potencia) {
        precioEstimado += ajustePotencia[potencia] || 0;
    }

    // Ajustar el precio según los extras seleccionados (cada extra suma 500€).
    precioEstimado += extrasSeleccionados.length * 500;

    // Construir el mensaje del prompt con las selecciones del usuario.
    let promptText = "Quiero que me busques los 3 mejores coches que cumplan con las siguientes características:\n\n";
    
    if (tipo) promptText += `• Tipo: 🚗 ${getSelectedText('tipo')}\n`;
    if (combustible) promptText += `• Combustible: ⛽ ${getSelectedText('combustible')}\n`;
    if (transmision) promptText += `• Transmisión: 🕹 ${getSelectedText('transmision')}\n`;
    if (precio) promptText += `• Precio máximo indicado: 💲 ${parseInt(precio).toLocaleString('es-ES')}€\n`;
    if (plazas) promptText += `• Número de plazas: 👪 ${plazas}\n`;
    if (potencia) promptText += `• Potencia mínima: 🐎 ${getSelectedText('potencia')}\n`;
    if (extrasSeleccionados.length > 0) {
        promptText += `• Equipamiento: 💼 ${extrasSeleccionados.join(', ')}\n`;
    }

    // Incluir el precio estimado en el resultado.
    promptText += `\n💰 Precio estimado basado en tus selecciones: ${precioEstimado.toLocaleString('es-ES')}€\n`;

    promptText += "\nPor favor, proporcióname:\n";
    promptText += "1. Los 3 modelos que mejor se ajusten\n";
    promptText += "2. Sus características principales\n";
    promptText += "3. Precios aproximados\n";
    promptText += "4. Una breve comparativa entre ellos\n";
    promptText += "5. Recomendación final basada en relación calidad-precio";
    
    // Mostrar el prompt y la estimación de precio en la página.
    resultContainer.innerHTML = `
        <h3>Tu búsqueda:</h3>
        <div class="prompt-text">${promptText}</div>
        <p class="note">Copia este texto y pégaselo a tu asistente de IA favorito para obtener recomendaciones personalizadas.</p>
    `;
    
    // Desplazarse suavemente hasta la sección de resultados.
    resultContainer.scrollIntoView({ behavior: 'smooth' });
});