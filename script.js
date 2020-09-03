const keysArray = document.querySelectorAll('#structure button');
const inputArea = document.querySelector('#inputArea input');
const operatorArea = document.querySelector('#operation')
let operation = "";
let firstValue = 0;
let secondValue = 0;
let justFinished = false;
// la funcion calcula el resultado a partir de tener un numero A y otro B y un operador, dependiendo de el operador se hace una operacion determinada
const calculate = function(numA,numB,operator) {
    let resultado = ""
    switch (operator) {
        case "-":
        resultado = numA - numB
        break
        case "+":
        resultado = numA + numB
        break
        case "*":
        resultado = numA * numB
        break
        case "/":
        resultado = numA / numB
        break
    }
    
    inputArea.value = resultado
    return resultado
}
//Funcion para limpiar el input cuando es necesario
const cleanInput = function() {
    inputArea.value = ""
}
// Por cada boton se agrega un watcher que revisa si se clickea o si se presiona con enter o espacio alguno de los botones
for (i=0; i < keysArray.length; i++) {
    keysArray[i].addEventListener('click' || 'keyPressed', function(event) {
// Si es un numero (no una operacion o igual) 
        if (!isNaN(parseInt(event.target.id))) {
            // Tengo que fijarme si la ultima tecla que se apreto fue igual, de esta forma puedo hacer operaciones como (((2+2)+2)+2)
            if (justFinished === true) {
                cleanInput()
                justFinished = false
            }
    //Se concatenan los valores hasta que se presiona un operador
            inputArea.value += event.target.id;
        } 
        // Si se presiona igual se llama a la funcion que realiza el calculo
        else if (event.target.id == "=") {
            if (justFinished === false){
            secondValue = parseFloat(inputArea.value);
            calculate(firstValue,secondValue,operation)
            operatorArea.innerText = ""
            justFinished = true}
             else {
                 calculate(parseFloat(inputArea.value),secondValue,operation)
             }
        }
        // Si se presiona el operador el numero del input se guarda en la variable firstValue para luego ser usada en calculate
        else {
        firstValue = parseFloat(inputArea.value)
        cleanInput()
        if (event.target.id != "c"){
            operation = event.target.id
            operatorArea.innerText = operation}
            else {
                cleanInput()
            }
            }
    }) 
}
/* KNOWN BUGS:
    No se pueden accionar los numeros u operaciones con el teclado (se pueden teclear en el input o seleccionandolos con tab y clickeando con enter o espaco)
    Se pueden introducir numeros decimales por el input con el teclado pero no hay tecla de decimales. 
    Por alguna razon nunca pude lograr parsear el punto y concatenarlo al string del input
*/
