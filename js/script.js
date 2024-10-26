
function calcularPago() {

    const obtenerValor = (mensaje, validacion) => {
        let valor;
        do {
            valor = parseFloat(prompt(mensaje));
        } while (!validacion(valor));
        return valor;
    };

    const monto = obtenerValor(
        "Ingrese el monto del préstamo:",
        (val) => !isNaN(val) && val > 0
    );

    const tasaInteresAnual = obtenerValor(
        "Ingrese la tasa de interés anual (en %):",
        (val) => !isNaN(val) && val >= 0
    ) / 100;

    const plazoPrestamo = obtenerValor(
        "Ingrese el plazo del préstamo (en años):",
        (val) => !isNaN(val) && val > 0
    );

    const calcularPagoMensual = (monto, tasaAnual, plazo) => {
        const totalPagos = plazo * 12;
        const tasaInteresMensual = tasaAnual / 12;
        return (monto * tasaInteresMensual) / (1 - Math.pow(1 + tasaInteresMensual, -totalPagos));
    };

    const pagoMensual = calcularPagoMensual(monto, tasaInteresAnual, plazoPrestamo);

    alert(`El pago mensual es: $${pagoMensual.toFixed(2)}`);
}

