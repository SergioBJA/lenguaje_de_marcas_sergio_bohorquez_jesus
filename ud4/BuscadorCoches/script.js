document.getElementById('carSearchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Mostrar el contenedor de resultados
    const resultContainer = document.getElementById('resultContainer');
    resultContainer.style.display = 'block';
    
    // Función para obtener el texto de una opción seleccionada
    function getSelectedText(elementId) {
        const select = document.getElementById(elementId);
        return select.options[select.selectedIndex].text;
    }
    
    // Obtener valores del formulario
    const tipo = document.getElementById('tipo').value;
    const combustible = document.getElementById('combustible').value;
    const transmision = document.getElementById('transmision').value;
    const precio = document.getElementById('precio').value;
    const plazas = document.getElementById('plazas').value;
    const potencia = document.getElementById('potencia').value;
    
    // Mapeo de extras a texto legible
    const extrasMap = {
        'gps': 'GPS/Navegador',
        'camara': 'Cámara de aparcamiento',
        'sensors': 'Sensores de aparcamiento',
        'bluetooth': 'Bluetooth',
        'asistente': 'Asistente de conducción'
    };
    
    // Obtener extras seleccionados
    const extrasSeleccionados = [];
    document.querySelectorAll('input[name="extras"]:checked').forEach(checkbox => {
        extrasSeleccionados.push(extrasMap[checkbox.value]);
    });
    
    // Construir el prompt
    let promptText = "Quiero que me busques los 3 mejores coches que cumplan con las siguientes características:\n\n";
    
    if (tipo) promptText += `• Tipo: ${getSelectedText('tipo')}\n`;
    if (combustible) promptText += `• Combustible: ${getSelectedText('combustible')}\n`;
    if (transmision) promptText += `• Transmisión: ${getSelectedText('transmision')}\n`;
    if (precio) promptText += `• Precio máximo: ${parseInt(precio).toLocaleString('es-ES')}€\n`;
    if (plazas) promptText += `• Número de plazas: ${plazas}\n`;
    if (potencia) promptText += `• Potencia mínima: ${getSelectedText('potencia')}\n`;
    if (extrasSeleccionados.length > 0) {
        promptText += `• Equipamiento: ${extrasSeleccionados.join(', ')}\n`;
    }
    
    promptText += "\nPor favor, proporcióname:\n";
    promptText += "1. Los 3 modelos que mejor se ajusten\n";
    promptText += "2. Sus características principales\n";
    promptText += "3. Precios aproximados\n";
    promptText += "4. Una breve comparativa entre ellos\n";
    promptText += "5. Recomendación final basada en relación calidad-precio";
    
    // Mostrar el prompt en la página
    resultContainer.innerHTML = `
        <h3>Tu búsqueda:</h3>
        <div class="prompt-text">${promptText}</div>
        <p class="note">Copia este texto y pégaselo a tu asistente de IA favorito para obtener recomendaciones personalizadas.</p>
    `;
    
    // Desplazarse suavemente a los resultados
    resultContainer.scrollIntoView({ behavior: 'smooth' });
});