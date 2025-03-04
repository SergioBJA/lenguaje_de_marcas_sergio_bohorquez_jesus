/* Esperaremos hasta que el documento esté cargado y listo
 * para ser procesado por nuestro programa*/

let obj_documento = $(document)

/* Cuando esté cargado ejecutaremos la función cuyo nombre aparezca aquí*/
obj_documento.ready(inicio)

//* Error gravísimo*/
//obj_documento.ready( inicio() )

function inicio(){
        let obj_izq=$("#botonizq")
        obj_izq.click ( fn_click_izq )
        let obj_der=$("#botonder")
        obj_der.click ( fn_click_der )
}

function fn_click_izq(){
        let obj_div=$("#texto")
        obj_div.fadeOut()
}

function fn_click_der(){
        let obj_div=$("#texto")
        obj_div.fadeIn()
}