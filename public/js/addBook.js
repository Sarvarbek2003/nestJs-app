
const form = document.querySelector('.form');

if(!window.localStorage.getItem('token')) {
    window.location = '/auth/login' 
}

form.onsubmit = async(ev) => {
    ev.preventDefault()
    let title = titleinput.value.trim();
    let description = descriptioninput.value.trim();
    let link = linkinput.value.trim();

    if(!(titleinput.value &&
        descriptioninput.value &&
        linkinput.value) ) return alert('Malumotlarni to`ldiring')

    let body = {
        title,
        description,
        link
    }
    
    titleinput.value = null
    descriptioninput.value = null
    linkinput.value = null
    
    let res = await req('/add/books','POST',body);
}