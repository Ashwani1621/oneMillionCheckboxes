const containerEl = document.getElementById('container')
const checkbox = document.createElement('input')
checkbox.type = 'checkbox'

const CHECKBOX_COUNT = 1000
const array = new Array(CHECKBOX_COUNT).fill(null)
array.forEach((_, index)=>{
    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.id = index
    containerEl.appendChild(checkbox)
})