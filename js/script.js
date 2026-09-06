let urlPrime = 'https://rickandmortyapi.com/api/character'
let charactersList = [];
// Puxando dados da API
async function getCharacters(url) {

    // Requisiçao
    try {
        // Loading 
        cardSection.innerHTML = 'Loading characters...'

        const resp = await fetch(url)

        if (resp.status === 404) {
            renderCharacters([])
            return
        } else if (!resp.ok) {
            throw new Error('Erro na rede: ' + resp.status)
        }

        const dados = await resp.json()
        charactersList = dados.results

        renderCharacters(charactersList)

    } catch (error) {
        console.log(`${error}`)
        cardSection.innerHTML = `&#9888; Unable to load characters. Try again.`
    }

}
const cardSection = document.querySelector('#cards-section')

// Funcao para filtrar status
function filterCharacters(characters, status) {
    return characters.filter(item => item.status === status)
}

// Rendereziando no HTML
function renderCharacters(characters) {

    if (characters.length === 0) {
        cardSection.innerHTML = `&#9888; No characters found. Try another.`
    } else {
        const cards = characters.map(character => {
            const card = `
            <div class="card flex flex-col justify-between border border-zinc-800 rounded-xl p-3 gap-3 shadow-2xl">
                <div class="rounded-xl bg-zinc-900/40">
                    <img class="w-full rounded-lg" src="${character.image}" alt="">
                </div>
                <div class="flex flex-col gap-1">
                    <p class="character-name">${character.name}</p>
                    <p class="character-status text-green-400">&#9679; ${character.status}</p>
                    <p class="character-species text-zinc-400">${character.species}</p>
                </div>
            </div>`

            return card
        })

        cardSection.innerHTML = cards.join('')
    }



}

// Filtro de pesquisa
const inputSearch = document.querySelector('#search-bar')
let timerOut
inputSearch.addEventListener('input', (event) => {
    clearTimeout(timerOut)

    timerOut = setTimeout(() => {
        const urlSearch = `https://rickandmortyapi.com/api/character?name=${event.target.value}`
        if (!event.target.value) {
            getCharacters('https://rickandmortyapi.com/api/character')
        } else {
            getCharacters(urlSearch)
        }
    }, 600);


})

// Filtros
const filterButtons = document.querySelector('#filter-buttons')

filterButtons.addEventListener('click', (e) => {
    const clickedButton = e.target
    const clickedButtonId = e.target.id
    // selecionado = bg-green-300/20 border border-green-400
    // Normal = border border-zinc-800

    const buttons = filterButtons.querySelectorAll('button')

    buttons.forEach(item => {
        item.classList.remove('border-green-400')
        item.classList.remove('bg-green-300/20')
        item.classList.add('border-zinc-800')
    })

    if (clickedButtonId === 'all') {
        buttons.forEach(item => {
            item.classList.remove('border-green-400')
            item.classList.remove('bg-green-300/20')
            item.classList.add('border-zinc-800')
        })

        clickedButton.classList.toggle('bg-green-300/20')
        clickedButton.classList.toggle('border-green-400')
        clickedButton.classList.toggle('border-zinc-800')
        renderCharacters(charactersList)
    } else {
        clickedButton.classList.toggle('bg-green-300/20')
        clickedButton.classList.toggle('border-green-400')
        clickedButton.classList.toggle('border-zinc-800')


        const filterResult = filterCharacters(charactersList, clickedButtonId)
        renderCharacters(filterResult)
    }

})







getCharacters(urlPrime)