
const form = document.querySelector('.form');

if(!window.localStorage.getItem('token')) {
    window.location = '/auth/login'
    
}

form.onsubmit = async(ev) => {
    ev.preventDefault()
    let title = titleinput.value.trim();
    let description = descriptioninput.value.trim();
    let link = linkinput.value.trim();
    let userId = window.localStorage.getItem('token') ? JSON.parse(window.localStorage.getItem('token')) : 0
    if(userId == 0) return

    if(!(titleinput.value &&
        descriptioninput.value &&
        linkinput.value) ) return alert('Malumotlarni to`ldiring')
    console.log(typeof userId)
    let body = {
        title,
        description,
        link,
        userId: +userId
    }
    titleinput.value = null
    descriptioninput.value = null
    linkinput.value = null
    let res = await req('/books','POST',body);

    if(!res){
    }

}