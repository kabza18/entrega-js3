document.addEventListener("DOMContentLoaded", function () {
    const inputs = {
        monto: document.getElementById("monto"),
        plazo: document.getElementById("plazo"),
        tasa: document.getElementById("tasa")
    };

    const displays = {
        plazo: document.getElementById("plazo-display"),
        tasa: document.getElementById("tasa-display"),
        cuota: document.getElementById("cuota"),
        montoError: document.getElementById("monto-error")
    };

    const updateDisplay = () => {
        displays.plazo.textContent = `${inputs.plazo.value} meses`;
        displays.tasa.textContent = `${inputs.tasa.value}%`;
    };

    const validarMonto = (monto) => monto >= 20000000 && monto <= 500000000;

    const calcularCuota = ({ monto, plazo, tasa }) => {
        const totalPagos = plazo / 12 * 12;
        const tasaMensual = tasa / 100;
        return (monto * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -totalPagos));
    };

    const actualizarCuota = () => {
        const valores = {
            monto: parseFloat(inputs.monto.value),
            plazo: parseInt(inputs.plazo.value),
            tasa: parseFloat(inputs.tasa.value)
        };

        if (!validarMonto(valores.monto)) {
            displays.montoError.style.display = "block";
            displays.cuota.textContent = "0";
            return;
        } else {
            displays.montoError.style.display = "none";
        }

        const cuota = calcularCuota(valores);
        displays.cuota.textContent = cuota ? cuota.toFixed(0) : "0";
    };

    inputs.monto.addEventListener("input", actualizarCuota);
    inputs.plazo.addEventListener("input", () => {
        updateDisplay();
        actualizarCuota();
    });
    inputs.tasa.addEventListener("input", () => {
        updateDisplay();
        actualizarCuota();
    });

    updateDisplay();
});
