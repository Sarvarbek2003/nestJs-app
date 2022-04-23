const form = document.querySelector('.form');

form.onsubmit = async(ev) => {
    ev.preventDefault()

    let email = emailInput.value.trim();
    let password = passwordInput.value.trim();
    let firstName = first_name.value.trim();
    let lastName = last_name.value.trim();
    let file = inputFile.files[0]
    let formData = new FormData()

    formData.append('file',file)
    formData.append('email',email)
    formData.append('password',password)
    formData.append('firstName',firstName)
    formData.append('lastName',lastName)

    let res = await req('/auth/signup','POST',formData);
    if (res?.access_token){
        window.localStorage.setItem('token', res.access_token)
        window.localStorage.setItem('userId', res.id)
        window.location = '/'
    }else  {
        alert(res.message[0])
    }
}