const obtenerPersonajes = async ()=>{
    try{
        const respuesta = await fetch('./personajes.json')
        const datos = await respuesta.json()
        return datos.results
    } catch(error){
       Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudieron cargar los personajes.'
})
    }
}

obtenerPersonajes()

const devuelvePersonajes = (personajes)=>{ 
    const section = document.getElementById('card')
    const cards = personajes.map(personaje => `
        <div class="card" data-id="${personaje.id}">
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
    mostrarContador(personajes)

    const filtrar = document.getElementById('filtro-estado')
    const filtroAlfabetico = document.getElementById('ordenar')
    const section = document.getElementById('card')

      filtroAlfabetico.addEventListener('change',(event)=>{
        const orden = event.target.value
        const ordenados = [...personajes].sort((a,b)=>orden==='az'? a.name.localeCompare(b.name):b.name.localeCompare(a.name))
        devuelvePersonajes(ordenados)
        
    })
    filtrar.addEventListener('change',(event)=>{
        filtroAplicado = event.target.value
    const filtrado = personajes.filter(personaje => personaje.status === filtroAplicado)


    if(filtroAplicado === 'todos'){
        devuelvePersonajes(personajes)
            mostrarContador(personajes)

        Toastify({
        text: `Mostrando ${personajes.length} personajes`,
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
        color: "white",
    }
}).showToast()

    }else{
        devuelvePersonajes(filtrado)
            mostrarContador(filtrado)

        Toastify({
        text: `Mostrando ${filtrado.length} personajes`,
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
        color: "white",
    }
}).showToast()

    }
    })

    section.addEventListener('click', (event) =>{
        const card = event.target.closest('.card')
        if(card) {
        const id = parseInt(card.dataset.id)
        const personajeEncontrado = personajes.find(p => p.id === id)
            Swal.fire({
                title: personajeEncontrado.name,
                text: `Estado: ${personajeEncontrado.status} -- Especie: ${personajeEncontrado.species}`,
                imageUrl: personajeEncontrado.image,
                imageWidth: 300,
            })
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

const contarPorEstado = (personajes) => {
     return personajes.reduce((acum, personaje) => {
        acum[personaje.status] = (acum[personaje.status] || 0) + 1
        return acum
    }, {})
}

const mostrarContador = (personajes) => {
    const conteo = contarPorEstado(personajes)
    const div = document.getElementById('contador-estados')
    div.innerHTML = `Alive: ${conteo.Alive || 0} | Dead: ${conteo.Dead || 0} | Unknown: ${conteo.unknown || 0}`
}