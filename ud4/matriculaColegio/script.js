// Espera a que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', function() {
    // Selección de elementos del DOM que se utilizarán en el script
    const botonCalcular = document.getElementById('calcular');        // Botón para iniciar el cálculo
    const matematicas1 = document.getElementById('matematicas1');     // Checkbox de Matemáticas I
    const matematicas2 = document.getElementById('matematicas2');     // Checkbox de Matemáticas II
    const historia = document.getElementById('historia');             // Checkbox de Historia
    const fisica = document.getElementById('fisica');                 // Checkbox de Física
    const horas = document.getElementById('horas');                   // Input de horas semanales
    const tipoAlumno = document.getElementById('alumno');             // Select de tipo de alumno
    const resultado = document.getElementById('resultado');           // Div para mostrar resultado
    const mensajeError = document.getElementById('mensaje-error');    // Div para mostrar errores

    // Añade un evento de click al botón de calcular
    botonCalcular.addEventListener('click', calcularPrecio);

    // Función principal que calcula el precio basado en las selecciones
    function calcularPrecio() {
        // Oculta mensajes anteriores para empezar limpio
        mensajeError.style.display = 'none';
        resultado.innerHTML = '';

        // VALIDACIÓN 1: Verifica que no se haya seleccionado Mat II sin Mat I
        // Esta es la condición especial del enunciado
        if (matematicas2.checked && !matematicas1.checked) {
            mensajeError.style.display = 'block'; // Muestra el div de error
            mensajeError.textContent = 'Error: No puedes matricularte en Matemáticas II sin matricularte en Matemáticas I';
            return; // Detiene la ejecución de la función
        }

        // VALIDACIÓN 2: Verifica que al menos se ha seleccionado una asignatura
        if (!matematicas1.checked && !matematicas2.checked && !historia.checked && !fisica.checked) {
            mensajeError.style.display = 'block';
            mensajeError.textContent = 'Error: Debes seleccionar al menos una asignatura';
            return;
        }

        // VALIDACIÓN 3: Verifica que las horas son un número válido
        const horasSemanales = parseInt(horas.value);
        if (isNaN(horasSemanales) || horasSemanales <= 0) {
            mensajeError.style.display = 'block';
            mensajeError.textContent = 'Error: Debes introducir un número válido de horas';
            return;
        }

        // CÁLCULO DEL PRECIO: Calcula el precio base (5€ por hora)
        let precio = horasSemanales * 5;

        // Aplica descuento del 12% si es antiguo alumno
        if (tipoAlumno.value === 'antiguo') {
            precio = precio * 0.88; // Multiplica por 0.88 para aplicar 12% de descuento
        }

        // Crea un array con las asignaturas seleccionadas para mostrarlas
        let asignaturasSeleccionadas = [];
        if (matematicas1.checked) asignaturasSeleccionadas.push('Matemáticas I');
        if (historia.checked) asignaturasSeleccionadas.push('Historia');
        if (matematicas2.checked) asignaturasSeleccionadas.push('Matemáticas II');
        if (fisica.checked) asignaturasSeleccionadas.push('Física');
        
        // Genera el HTML del resultado y lo inserta en el div correspondiente
        resultado.innerHTML = `
            <p>Horas semanales: ${horasSemanales}</p>
            <p>Tipo de alumno: ${tipoAlumno.value === 'antiguo' ? 'Antiguo alumno (12% descuento)' : 'Nuevo alumno'}</p>
            <p>Asignaturas seleccionadas:</p>
            <p class="asignaturas">${asignaturasSeleccionadas.join('<br>')}</p>
            <p class="precio-final">Precio final mensual: ${precio.toFixed(2)} €</p>
        `;
    }
});