let urlPrime = 'https://rickandmortyapi.com/api/character'
let charactersList = [];
let pagesInfo;
let currentStatus = 'all'
// Puxando dados da API
async function getCharacters(url) {

    // Requisiçao
    try {
        // Loading 
        cardSection.innerHTML = 'Loading characters...'

        const resp = await fetch(url)

        if (resp.status === 404) {
            renderCharacters([])
            disablePagination()
            return
        } else if (!resp.ok) {
            throw new Error('Erro na rede: ' + resp.status)
        }

        const dados = await resp.json()
        charactersList = dados.results
        pagesInfo = dados.info

        renderPagination(pagesInfo)
        renderCharacters(charactersList)

    } catch (error) {
        console.log(`${error}`)
        cardSection.innerHTML = `&#9888; Unable to load characters. Try again.`
    }

}
const cardSection = document.querySelector('#cards-section')

// Rendereziando no HTML
function renderCharacters(characters) {

    if (characters.length === 0) {
        cardSection.innerHTML = `&#9888; No characters found. Try another.`
    } else {
        const cards = characters.map(character => {
            const card = `
            <div class="card flex flex-col justify-between border border-zinc-800 rounded-3xl [corner-shape: squircle] p-4 gap-3 shadow-2xl ">
                <div class="rounded-xl bg-zinc-900/40">
                    <img loading="lazy"  class="w-full rounded-3xl [corner-shape: squircle]" src="${character.image}" alt="">
                </div>
                <div class="flex flex-col gap-1">
                    <p class="character-name">${character.name}</p>
                    <p class="character-status text-green-700/70">&#9679; ${character.status}</p>
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
        getCharacters(buildSearchUrl())
    }, 600);


})

// Filtros
const filterButtons = document.querySelector('#filter-buttons')

filterButtons.addEventListener('click', (e) => {
    const clickedButton = e.target
    const clickedButtonId = e.target.id
    // selecionado = bg-green-300/20 border border-green-400
    // Normal = border border-zinc-800
    currentStatus = clickedButtonId


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

        clickedButton.classList.add('bg-green-300/20')
        clickedButton.classList.add('border-green-400')
        clickedButton.classList.remove('border-zinc-800')
        getCharacters(buildSearchUrl())
    } else {
        clickedButton.classList.add('bg-green-300/20')
        clickedButton.classList.add('border-green-400')
        clickedButton.classList.remove('border-zinc-800')


        getCharacters(buildSearchUrl())
    }

})

// Paginação
//const paginationContainer = document.querySelector('#pagination')
const previousButton = document.querySelector('#previous')
const nextButton = document.querySelector('#next')
let nextUrl;
let previousUrl;

function disablePagination() {
    previousButton.disabled = true;
    nextButton.disabled = true;

    previousUrl = ''
    nextUrl = ''
}

function renderPagination(info) {

    if (info.prev === null) {
        previousButton.disabled = true;
        previousUrl = ''
    } else if (info.prev) {
        previousButton.disabled = false;
        previousUrl = info.prev
    }

    if (info.next === null) {
        nextButton.disabled = true;
        nextUrl = ''
    } else if (info.next) {
        nextButton.disabled = false;
        nextUrl = info.next
    }

}

nextButton.addEventListener('click', () => {
    getCharacters(nextUrl)
})

previousButton.addEventListener('click', () => {
    getCharacters(previousUrl)
})

// Criando URL
function buildSearchUrl() {
    const inputValue = inputSearch.value
    const params = new URLSearchParams()

    if (inputValue) {
        params.set('name', inputValue)
    }

    if (currentStatus !== 'all') {
        params.set('status', currentStatus)
    }

    if (params.toString()) {
        return `${urlPrime}?${params}`
    } else {
        return urlPrime
    }

}







getCharacters(urlPrime)