const glassRec = document.querySelector('.glass-preview__rectangle')
const blur = document.getElementById('blur')
const transparency = document.getElementById('transparency')
const color = document.getElementById('color')
const outline = document.getElementById('outline')
const cssRes = document.getElementById('css-code')
const copyButton = document.getElementById('copy-button')

// default value fo inputs

blur.value = 1
transparency.value = 0.3
color.value = '#000'
outline.value = 0;

updateGlassPreview()

blur.addEventListener('input', updateGlassPreview)
transparency.addEventListener('input', updateGlassPreview)
outline.addEventListener('input', updateGlassPreview)

color.addEventListener('input', () => {
    updateGlassPreview()
    updateCSSCode()
})

copyButton.addEventListener('click', copyToClipboard)

function copyToClipboard() {
    const copyText = cssRes.value
    const textArea = document.createElement('textarea')
    textArea.value = copyText
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)

    copyButton.textContent = 'Copied!'

    setTimeout(() => {
        copyButton.textContent = 'Copy To Clipboard'
    }, 1000)
}

function updateGlassPreview() {
    const blurValue = blur.value
    const outlineValue = outline.value
    const transparencyValue = transparency.value
    const colorValue = color.value

    // update glass
    glassRec.style.backdropFilter = `blur(${blurValue}px)`
    glassRec.style.outline = `${outlineValue}px solid ${colorValue}`
    glassRec.style.backgroundColor = `rgba(${hexToRgb(colorValue)}, ${transparencyValue})`

    updateCSSCode()
}

function updateCSSCode() {
    const blurValue = blur.value
    const outlineValue = outline.value
    const transparencyValue = transparency.value
    const colorValue = color.value

    const cssCode = `background-color: rgba(${hexToRgb(colorValue)}, ${transparencyValue});\nbackdrop-filter: blur(${blurValue}px);\n-webkit-backdrop-filter: blur(${blurValue}px);\noutline: ${outlineValue}px solid ${colorValue};\nborder-radius: 10px;\nbox-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);`

    cssRes.value = cssCode
}

function hexToRgb(hex) {
    const shorthandRegax = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegax, (m, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
}