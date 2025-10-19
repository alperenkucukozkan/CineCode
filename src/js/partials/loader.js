const btns = document.querySelectorAll('button')
btns.forEach((item) => {
    item.addEventListener('click', (evt) => {
        evt.target.classList.add('activeLoading')
    })
})