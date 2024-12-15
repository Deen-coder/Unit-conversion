const conversionFactors = {
    cm: { cm: 1, m: 0.01, in: 0.393701, ft: 0.0328084 },
    m: { cm: 100, m: 1, in: 39.3701, ft: 3.28084 },
    in: { cm: 2.54, m: 0.0254, in: 1, ft: 0.0833333 },
    ft: { cm: 30.48, m: 0.3048, in: 12, ft: 1 }
};

function convert() {
    const input = parseFloat(document.getElementById("input").value);
    const fromUnit = document.getElementById("fromUnit").value;
    const toUnit = document.getElementById("toUnit").value;

    if (isNaN(input)) {
        document.getElementById("result").textContent = "Please enter a valid number.";
        return;
    }

    const result = input * conversionFactors[fromUnit][toUnit];
    document.getElementById("result").textContent = `${input} ${fromUnit} is equal to ${result} ${toUnit}`;
}
