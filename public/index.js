const containerEl = document.getElementById('container')
const socket = io()
socket.on('change-ui', (data)=>{
    const checkboxEl = document.getElementById(data.index)
    checkboxEl.checked = data.checked
    
    
})


window.addEventListener('load', async ()=>{
    const response = await fetch('/checkboxes')
    const data = await response.json()
    
    const array = data.checkboxes
    array.forEach((checked, index)=>{
        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.id = index
        checkbox.className = 'checkbox'
        checkbox.checked = checked
        checkbox.addEventListener('change', (e)=>{
            const checked = e.target.checked
            const data = {index, checked}
            socket.emit('client:checkbox:change', data)
        

    })

    containerEl.appendChild(checkbox)
})

})



