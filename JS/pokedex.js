//Funcion arrow estructura: let *nombre de la funcion* = () *con o sin argumentos* => retorno o {} donde va el cuerpo de la funcion
//let fetchPokemon= ()=>console.log("este es una funcion arrow");


//una funcion fetch sirve para consultar datos desde una API
// la funcion .then es una promesa que indica programacion asincrona, es decir puedo seguir ejecutando mi pagina mientras
// espero la respuesta de la API
let fetchPokemon=()=>{
    const pokeName = document.getElementById("pokeName");//accedo al input text por medio de su id
    let pokeInput = pokeName.value.toLowerCase();//guardo el contenido del input
    let url=`https://pokeapi.co/api/v2/pokemon/${pokeInput}`;//comillas invertidas para posteriormente poner una variable
    fetch(url).then((res)=>{//Hago la consulta a la api con arguemento de entrada url, pongo mi promesa con .then y res va a ser lo que me devuele el fectch (un objeto) por eso no la declaro, cuando la api me devuelve res entonces ejecuto el cidogo de la promesa
        
         const pokeType1=document.getElementById("pokeType1");
         pokeType1.innerHTML='';
         const pokeType2=document.getElementById("pokeType2");
         pokeType2.innerHTML='';
        
        if (res.status != "200") {//el status correcto es 200, entonces hago la concdicional, existes status estandar como por ejemplo 404 no lo encuentra, 500 hubo un error, 403 no tienes autorizacion
            console.log(res);//visualizo el contenido de mi objeto (res) en la consola, cuando consulto a la url es lo que me va a dar, me da el status de mi respuesta
            _PokeImage("./assets/pikachuSad.gif")
            _BorrarTodo();

        }
        else {
            return res.json();//retorno un objeto (json) necesario para poder entrar a mi segunda promesa
        }
        console.log(res);
    }).then((data)=>{//despues de recibir res, creo otra promesa para acceder a los  o la informacion de res, es decir los data de res, data y res pueden tener cualquier nombre, pero es necesario tener las dos promesas, una para acceder al objeto y la segunda para acceder a los datos
        console.log(data);//datos de la respuesta, me muestra todos los atributos de mi pokemon
        //let pokeImg=data.forms[0].url;  para aceder a los arreglos
        
       
        let pokeNum=data.id;//despues del pokemon 650 ya no hay imagenes claras, solo pixeleadas
        let pokeImg="";
        if (pokeNum>=650)
        {
            pokeImg=data.sprites.front_default;
        }
        else{
             pokeImg=data.sprites.other.dream_world.front_default;// ahora accedo a el atributo sprites que es otro objeto y accedo a su atributo fron_default solo con "."
        }
        let types=data.types;
        //let {stats, types}=data;//si los atributos del objeto "data" es decir el pokemos tienen el mismo nombre de las variables que creé, en esas variables se van a guardar los atributos
        let pokeWeight=data.weight;
        let pokeHeight=data.height;
        let pokeNamePrint=data.name;
        let pokeExp=data.base_experience;
        let infoExtra=data.species.url;// esta me manda a otra url en donde me da mas informacion como la descripcion etc, pero al ser otra url me debo conectar otra vez con un fecth
        _InfoExtra(infoExtra);
        _PokeExp(pokeExp);
        _PokeImage(pokeImg);
        const pokeType0=document.getElementById("pokeType0");
        pokeType0.innerHTML='Tipo de pokemon:<br/>';
        console.log(types);

        _TipodePokemon(types);
        // types.forEach(type => { accedo a cada elemento del arreglo, si vienen por ejemplo uno o dos tipos de pokemon, 
        //     _PokeTypes(type);
        //     console.log(type)
            
        // });

        
        
        _PokeNumber(pokeNum);
        
        _PokeWeight(pokeWeight);
        _PokeHeight(pokeHeight);
        _PokeName(pokeNamePrint);
    })
    
}

//fetchPokemon();//para llamar a traer mi funcion


/* 
const imprimir=()=>{ //se añadiría en un metodo onclick en html para poder concatenar la cadenas
    const pokeName = document.getElementById("pokeName");//accedo al input text por medio de su id
    let pokeInput = pokeName.value;//guardo el contenido del input
    console.log("hola "+ pokeInput);//imprimo en consola

} 
*/

const _PokeImage = (url) =>{
    const pokeImg = document.getElementById("pokeImg");    
    pokeImg.src=url;
    //const pokeText=document.getElementById("prueba"); para cambiar parrafos
    //pokeText.innerHTML=url;
}

const _PokeNumber=(url)=>{
    const pokeNum=document.getElementById("pokeNum");// para cambiar parrafos
    pokeNum.innerHTML= "Número de pokemón: " + url;
}

/* const _PokeTypes=(url)=>{    por cada tipo de pokemos que había lo mandaba a imprimir pero todo junto
    const pokeType=document.getElementById("pokeType0");
    let tipo=url.type.name;
    pokeType.innerHTML += "&nbsp"+ tipo;
} */


const _TipodePokemon = types => {
    const Tipo1 = types[0].type.name;
    const Tipo2 = types[1] ? types[1].type.name :0 ;
    const pokeType1=document.getElementById("pokeType1");
    const pokeType2=document.getElementById("pokeType2");
    pokeType1.style.backgroundColor=typeColors[Tipo1];
    pokeType1.innerHTML =Tipo1;
    
    if (Tipo2==0)
    {
        pokeType2.innerHTML ="";
    }
    else{
        pokeType2.style.backgroundColor=typeColors[Tipo2];
        pokeType2.innerHTML =Tipo2;
    }
    

    if (Tipo1=="fighting" ||Tipo1=="dark"){
        pokeType1.style.color= "#FFFFFF";

    }
    else{
        pokeType1.style.color= "#000000";

    }

    if (Tipo2=="fighting" ||Tipo2=="dark"){
        pokeType2.style.color= "#FFFFFF";

    }
    else{
        pokeType2.style.color= "#000000";

    }
    
}

const _PokeWeight=(url)=>{
    const pokeWeight=document.getElementById("pokeWeight");// para cambiar parrafos
    pokeWeight.innerHTML= "Peso:<br/>" + url/10 + " kg" ;
}

const _PokeHeight=(url)=>{
    const pokeHeight=document.getElementById("pokeHeight");// para cambiar parrafos
    pokeHeight.innerHTML= "Altura:<br/> " + url/10 + " m" ;
    
}

const _PokeExp=(url)=>{
    const pokeExp=document.getElementById("pokeExp");// para cambiar parrafos
    pokeExp.innerHTML= "Experiencia base:"+ url ;
    
}

const _PokeName=(url)=>{
    const pokeName=document.getElementById("pokeNamePrint");// para cambiar parrafos
    pokeName.innerHTML= url.toUpperCase();

}

const _BorrarTodo=()=>{
    const pokeNum=document.getElementById("pokeNum");// para cambiar parrafos
    pokeNum.innerHTML= "";
    pokeNum.innerHTML= "Ese pokemon  no existe";


    const pokeType0=document.getElementById("pokeType0");
    pokeType0.innerHTML = "";

    const pokeWeight=document.getElementById("pokeWeight");// para cambiar parrafos
    pokeWeight.innerHTML= "" ;

    
    const pokeHeight=document.getElementById("pokeHeight");// para cambiar parrafos
    pokeHeight.innerHTML= "" ;

    const pokeName=document.getElementById("pokeNamePrint");// para cambiar parrafos
    pokeName.innerHTML= "" ;
    const pokeExp=document.getElementById("pokeExp");// para cambiar parrafos
    pokeExp.innerHTML= "" ;
    const pokeApodo=document.getElementById("pokeApodo");    
    pokeApodo.innerHTML ="";
    const pokeInfo=document.getElementById("pokeInfo");    
    pokeInfo.innerHTML ="";

}

const _InfoExtra=(url)=>{

    fetch(url).then((res)=>{//Hago la consulta a la api con arguemento de entrada url, pongo mi promesa con .then y res va a ser lo que me devuele el fectch (un objeto) por eso no la declaro, cuando la api me devuelve res entonces ejecuto el cidogo de la promesa
      if (res.status != "200") {//el status correcto es 200, entonces hago la concdicional, existes status estandar como por ejemplo 404 no lo encuentra, 500 hubo un error, 403 no tienes autorizacion
            console.log(res);//visualizo el contenido de mi objeto (res) en la consola, cuando consulto a la url es lo que me va a dar, me da el status de mi respuesta
        }
        else {
            return res.json();//retorno un objeto (json) necesario para poder entrar a mi segunda promesa
        }
        console.log(res);
    }).then((data)=>{//despues de recibir res, creo otra promesa para acceder a los  o la informacion de res, es decir los data de res, data y res pueden tener cualquier nombre, pero es necesario tener las dos promesas, una para acceder al objeto y la segunda para acceder a los datos
        console.log(data);//datos de la respuesta, me muestra todos los atributos de mi pokemon
        //let pokeImg=data.forms[0].url;  para aceder a los arreglos

    //--------------------------------------------------------------------------------------
    let apodo=data.genera; //accedo al atributo genera que me dice el apodo del pokemon
    let i=0;
    let openEntrada=0;
    while(openEntrada != "es"){

   openEntrada=apodo[i].language.name;
   //key=i;
   i=i+1;   
    }
   let  EntradaPoke=apodo[i-1].genus;
    _PokeApodo(EntradaPoke);
    //--------------------------------------------------------------------------------------
        let entrada=data.flavor_text_entries;// ahora accedo a el atributo flavor_text_entries en donde viene descripcion del pokemon

        //escojo la de español

         i=0;
        openEntrada=0;
        while(openEntrada != "es"){

            openEntrada=entrada[i].language.name;
            //key=i;
            i=i+1;   
        }
         EntradaPoke=entrada[i-1].flavor_text;
        
        _PokeDesc(EntradaPoke);

         



    })



}

const _PokeDesc= (url)=>{

    const pokeInfo=document.getElementById("pokeInfo");    
    pokeInfo.innerHTML =url;
}
const _PokeApodo= (url)=>{

    const pokeApodo=document.getElementById("pokeApodo");    
    pokeApodo.innerHTML ="APODO DEL POKEMÓN:<br/>"+url;
}



const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    dark:'#000000',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};


 



