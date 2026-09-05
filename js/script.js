async function getCharacters(){
    try {
        const resp = await fetch('https://rickandmortyapi.com/api/character')
        if(!resp.ok) {
            throw new Error('Erro na rede: ' + resp.status)
        }

        const dados = await resp.json()
        const results = dados.results 

        renderCharacters(results)
    } catch (error) {
        console.log(`Error: ${error}`)
    }

}

getCharacters()

function renderCharacters(characters) {
    const cardSection = document.querySelector('#cards-section')

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