document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    // Variables para los controles deslizantes y campos de entrada
    const amplitudRange = document.getElementById("amplitudRange");
    const frecuenciaRange = document.getElementById("frecuenciaRange");
    const velocidadRange = document.getElementById("velocidadRange");
    const amplitudInput = document.getElementById("amplitudInput");
    const frecuenciaInput = document.getElementById("frecuenciaInput");
    const velocidadInput = document.getElementById("velocidadInput");
    const startSimulationButton = document.getElementById("startSimulation");
    const clearTableButton = document.getElementById("clearTable");
    const resultTableBody = document.getElementById("resultTableBody");

    // Función para calcular la longitud de onda
    function calcularLongitudOnda() {
        const amplitud = parseFloat(amplitudInput.value) || parseFloat(amplitudRange.value);
        const frecuencia = parseFloat(frecuenciaInput.value) || parseFloat(frecuenciaRange.value);
        const velocidad = parseFloat(velocidadInput.value) || parseFloat(velocidadRange.value);

        const longitud_onda = velocidad / frecuencia;

        // Agregar resultados a la tabla
        const newRow = resultTableBody.insertRow(0);
        newRow.insertCell(0).innerHTML = amplitud;
        newRow.insertCell(1).innerHTML = frecuencia.toFixed(3); // Mostrar 3 decimales
        newRow.insertCell(2).innerHTML = velocidad.toFixed(3); // Mostrar 3 decimales
        newRow.insertCell(3).innerHTML = longitud_onda.toFixed(2);
    }

    // Función para dibujar la onda
    function dibujarOnda(tiempo) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();

        const amplitud = amplitudRange.value;
        const frecuencia = frecuenciaRange.value;
        const velocidad = velocidadRange.value;

        for (let x = 0; x < canvas.width; x += 5) {
            const y = amplitud * Math.sin(frecuencia * x - velocidad * tiempo);
            ctx.lineTo(x, canvas.height / 2 - y); // Centrar verticalmente
        }

        ctx.strokeStyle = "blue";
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    // Función de animación
    function animar() {
        const tiempo = Date.now() * 0.001; // Tiempo en segundos
        dibujarOnda(tiempo);
        requestAnimationFrame(animar);
    }

    // Manejar evento para iniciar simulación
    startSimulationButton.addEventListener("click", function () {
        calcularLongitudOnda();
        animar();
    });

    // Manejar evento para limpiar la tabla de registro
    clearTableButton.addEventListener("click", function () {
        resultTableBody.innerHTML = ""; // Eliminar todas las filas
    });

    // Función para manejar botones de más y menos
    function handleButtonClick(button, inputField, step) {
        button.addEventListener("click", function () {
            const currentValue = parseFloat(inputField.value) || 0;
            const newValue = currentValue + step;

            // Actualizar el campo de entrada
            inputField.value = newValue.toFixed(3); // Mostrar 3 decimales

            // Actualizar el valor del rango
            if (inputField === amplitudInput) {
                amplitudRange.value = newValue;
            } else if (inputField === frecuenciaInput) {
                frecuenciaRange.value = newValue.toFixed(3); // Mostrar 3 decimales
            } else if (inputField === velocidadInput) {
                velocidadRange.value = newValue.toFixed(3); // Mostrar 3 decimales
            }
        });
    }

    // Manejar botones de más y menos para cada campo
    const decreaseAmplitud = document.getElementById("decreaseAmplitud");
    const increaseAmplitud = document.getElementById("increaseAmplitud");
    const decreaseFrecuencia = document.getElementById("decreaseFrecuencia");
    const increaseFrecuencia = document.getElementById("increaseFrecuencia");
    const decreaseVelocidad = document.getElementById("decreaseVelocidad");
    const increaseVelocidad = document.getElementById("increaseVelocidad");

    handleButtonClick(decreaseAmplitud, amplitudInput, -1);
    handleButtonClick(increaseAmplitud, amplitudInput, 1);
    handleButtonClick(decreaseFrecuencia, frecuenciaInput, -0.001);
    handleButtonClick(increaseFrecuencia, frecuenciaInput, 0.001);
    handleButtonClick(decreaseVelocidad, velocidadInput, -0.001);
    handleButtonClick(increaseVelocidad, velocidadInput, 0.001);

    // Sincronizar cambios en el campo de entrada con el rango
    amplitudInput.addEventListener("input", function () {
        amplitudRange.value = amplitudInput.value;
    });

    frecuenciaInput.addEventListener("input", function () {
        frecuenciaRange.value = frecuenciaInput.value;
    });

    velocidadInput.addEventListener("input", function () {
        velocidadRange.value = velocidadInput.value;
    });

    // Sincronizar cambios en el rango con el campo de entrada
    amplitudRange.addEventListener("input", function () {
        amplitudInput.value = amplitudRange.value;
    });

    frecuenciaRange.addEventListener("input", function () {
        frecuenciaInput.value = parseFloat(frecuenciaRange.value).toFixed(3); // Mostrar 3 decimales
    });

    velocidadRange.addEventListener("input", function () {
        velocidadInput.value = parseFloat(velocidadRange.value).toFixed(3); // Mostrar 3 decimales
    });
});
