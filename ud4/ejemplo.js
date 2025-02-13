// Programa para calcular el área de un rectángulo

// Pedir al usuario que ingrese la base y la altura del rectángulo
let base = window.prompt("Ingresa la base del rectángulo:");
let altura = window.prompt("Ingresa la altura del rectángulo:");

// Convertir los valores a números
base = parseFloat(base);
altura = parseFloat(altura);

// Calcular el área del rectángulo
let area = base * altura;

// Mostrar el resultado
console.log("El área del rectángulo es: " + area + " unidades cuadradas");