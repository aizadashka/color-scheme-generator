document.getElementById("get-color-button").addEventListener('click', getColorScheme)
document.addEventListener('click', copyToClipboard)

const  modal = document.getElementById('modal')

function getColorScheme() {
    let colorsNamesHTML = ''
    let colorsHTML = ''
    
    const hexInput = document.getElementById('color-input').value.slice(1)
    const mode = document.getElementById('color-scheme').value
    
    fetch(`https://www.thecolorapi.com/scheme?hex=${hexInput}&mode=${mode}&count=5`)
        .then(res => res.json())
        .then(data => {
            data.colors.forEach(item => {
                colorsNamesHTML += `<span id="${item.hex.value}">${item.hex.value}</span>`
                colorsHTML += `<div class="colors" id="${item.hex.value}" style="background: ${item.hex.value};"></div>`
            })
            document.getElementById('color-container').innerHTML = colorsHTML
            document.getElementById('colors-names').innerHTML = colorsNamesHTML
        })
}

function copyToClipboard(e) {
    let copyText = ''
        
    if (e.target.id[0] === '#') {
        copyText = e.target.id

        navigator.clipboard.writeText(copyText)
        modal.classList.remove('hidden')
        modal.innerHTML = `<p>Copied text: ${copyText}</p>`
        
        setTimeout(() => {
            modal.classList.add('hidden')
        }, 2000)
    }
}

window.onload = getColorScheme

