const lengthConversionFactors = {
    cm: { cm: 1, m: 0.01, in: 0.393701, ft: 0.0328084 },
    m: { cm: 100, m: 1, in: 39.3701, ft: 3.28084 },
    in: { cm: 2.54, m: 0.0254, in: 1, ft: 0.0833333 },
    ft: { cm: 30.48, m: 0.3048, in: 12, ft: 1 }
};

const temperatureConversionFunctions = {
    celsius: {
        fahrenheit: (value) => (value * 9/5) + 32,
        kelvin: (value) => value + 273.15
    },
    fahrenheit: {
        celsius: (value) => (value - 32) * 5/9,
        kelvin: (value) => (value - 32) * 5/9 + 273.15
    },
    kelvin: {
        celsius: (value) => value - 273.15,
        fahrenheit: (value) => (value - 273.15) * 9/5 + 32
    }
};

function convert() {
    const input = parseFloat(document.getElementById("input").value);
    const conversionType = document.getElementById("conversionType").value;
    const fromUnit = document.getElementById("fromUnit").value;
    const toUnit = document.getElementById("toUnit").value;

    if (isNaN(input)) {
        document.getElementById("result").textContent = "Please enter a valid number.";
        return;
    }

    let result;

    if (conversionType === "length") {
        // Length conversion
        result = input * lengthConversionFactors[fromUnit][toUnit];
        document.getElementById("result").textContent = `${input} ${fromUnit} is equal to ${result} ${toUnit}`;
    } else if (conversionType === "temperature") {
        // Temperature conversion
        if (fromUnit === toUnit) {
            result = input; // No conversion needed if the units are the same
        } else {
            result = temperatureConversionFunctions[fromUnit][toUnit](input);
            document.getElementById("result").textContent = `${input} ${fromUnit} is equal to ${result.toFixed(2)} ${toUnit}`;
        }
    }
}
