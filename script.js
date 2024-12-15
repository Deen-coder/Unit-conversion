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

const weightConversionFactors = {
    g: { g: 1, kg: 0.001, lb: 0.00220462, oz: 0.035274 },
    kg: { g: 1000, kg: 1, lb: 2.20462, oz: 35.274 },
    lb: { g: 453.592, kg: 0.453592, lb: 1, oz: 16 },
    oz: { g: 28.3495, kg: 0.0283495, lb: 0.0625, oz: 1 }
};

const units = {
    length: ['cm', 'm', 'in', 'ft'],
    temperature: ['celsius', 'fahrenheit', 'kelvin'],
    weight: ['g', 'kg', 'lb', 'oz']
};

function updateUnits() {
    const conversionType = document.getElementById("conversionType").value;
    const fromUnitSelect = document.getElementById("fromUnit");
    const toUnitSelect = document.getElementById("toUnit");

    // Clear previous options
    fromUnitSelect.innerHTML = '';
    toUnitSelect.innerHTML = '';

    // Get the units based on conversion type
    const selectedUnits = units[conversionType];

    // Populate the dropdowns with the correct units
    selectedUnits.forEach(unit => {
        const optionFrom = document.createElement("option");
        optionFrom.value = unit;
        optionFrom.textContent = unit;
        fromUnitSelect.appendChild(optionFrom);

        const optionTo = document.createElement("option");
        optionTo.value = unit;
        optionTo.textContent = unit;
        toUnitSelect.appendChild(optionTo);
    });

    // Trigger a conversion on type change
    convert();
}

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
        result = input * lengthConversionFactors[fromUnit][toUnit];
        document.getElementById("result").textContent = `${input} ${fromUnit} is equal to ${result} ${toUnit}`;
    } else if (conversionType === "temperature") {
        if (fromUnit === toUnit) {
            result = input; // No conversion needed if the units are the same
        } else {
            result = temperatureConversionFunctions[fromUnit][toUnit](input);
            document.getElementById("result").textContent = `${input} ${fromUnit} is equal to ${result.toFixed(2)} ${toUnit}`;
        }
    } else if (conversionType === "weight") {
        result = input * weightConversionFactors[fromUnit][toUnit];
        document.getElementById("result").textContent = `${input} ${fromUnit} is equal to ${result.toFixed(2)} ${toUnit}`;
    }
}

// Call updateUnits() on page load to initialize the dropdowns
updateUnits();
