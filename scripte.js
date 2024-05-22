//primero vamos a seleccionar por selector todos aquellos que tengan counter:
const counters = document.querySelectorAll('.counter');

/*Ahora, procedemos a filtrar sobre cada uno de esos elementos, con el document.querySelectAll(), hemos creado
un array de todos los elementos que poseen el selector ".counter"*/
counters.forEach((counter)=>{
    //Por cada iteracion establecemos el elemento a 0, es decir cuando vamos por youtube, lo ponemos a 0, luego a twitter y asi sucesivamente.
    counter.innerText = '0';

        //definimos una funcion, que se encargara de realizar la animacion de conteo
        const updateCounter = () =>{
            //buscamos dentro del actual counter, el atributo data-target, que es como la meta final, y lo convertimos a numero usando el
            //simbolo (+) JS hara como que suma esto a lo que haya en nuestra constante target, y alli guardamos ese numero que sera el limite
            const target = +counter.getAttribute('data-target');
            //nuevamente obtenemos el valor inicial del contador, que deberia a este punto ser (0), y lo convertirmos a numero
            //usando el operador + nuevamente, esto, es lo mismo que hacer coercion -> Number(counter.innerText)
          const c =+ counter.innerText;
            //Ahora, vamos a ver cuanto debe de incrementar por cada iteracion, lo hacemos tomando el total donde deseamos llegar y lo
            //dividimos a 200
        const increment = target / 10;
            //si el contador actual es menor que el limite al que deseamos llegar entonces entramos al if y alli: 
            if(c < target){
                //colocaremos en nuestro counter.innerText, que seria el div que tiene el class coutner, y le pondremos el resultado
                //de incrementar ligeramente usando el metodo Math.ceil, 
                counter.innerText = `${Math.ceil(c + increment)}`;
                //una vez que se incrementa de manera recursiva llamamos el mismo metodo otra vez!!! y hacemos que se retrase por un milisegundo..
                //o un poco mas de un milisegundo.
                setTimeout(updateCounter, 50);
            }else{
                counter.innerText = targer;
            }
        }
    
        updateCounter();
}

);