const obtenerPersonajes = async ()=>{
    try{
        const respuesta = await fetch('https://rickandmortyapi.com/api/character')
        const datos = await respuesta.json()
        return datos.results
    } catch(error){
        console.error('Error al obtener personajes:', error)
    }
}

obtenerPersonajes()

const devuelvePersonajes = (personajes)=>{ 
    const section = document.getElementById('card')
    const cards = personajes.map(personaje => `
        <div class="card">
        <img src="${personaje.image}" alt="${personaje.name}">
        <h2>${personaje.name}</h2>
        <p>${personaje.status}</p>
    </div>
    `)
    section.innerHTML = cards.join('')

}

let personajes = []

const init = async()=>{
    personajes = await obtenerPersonajes()
    devuelvePersonajes(personajes)
    const filtrar = document.getElementById('filtro-estado')
    filtrar.addEventListener('change',(event)=>{
        filtroAplicado = event.target.value
    const filtrado = personajes.filter(personaje => personaje.status === filtroAplicado)

    if(filtroAplicado === 'todos'){
        devuelvePersonajes(personajes)
    }else{
        devuelvePersonajes(filtrado)
    }
    })
    const buscar = document.getElementById('buscador')
    buscar.addEventListener('input',(event)=>{
        filtroPorInput = event.target.value
        const buscadoPorInput = personajes.filter(personaje => personaje.name.toLowerCase().includes(filtroPorInput.toLowerCase()))

        devuelvePersonajes(buscadoPorInput)
    })
}
init()

const contarPorEstado = (personajes) =>{
    personajes.reduce((acum,personaje)=>{
        acum[personaje.status] = (acum[personaje.status] || 0) + 1
        return acum
    },{})
}

