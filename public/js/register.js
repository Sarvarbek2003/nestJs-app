const form = document.querySelector('.form');

form.onsubmit = async(ev) => {
    ev.preventDefault()

    let email = emailInput.value.trim();
    let password = passwordInput.value.trim();
    let firstName = first_name.value.trim();
    let lastName = last_name.value.trim();

    let body = {
        email,
        password,
        firstName,
        lastName
    }
    let res = await req('/auth/signup','POST',body);
    if (res?.id){
        window.localStorage.setItem('token', res.id)
        window.location = '/'
    }else  {
        alert(res.message[0])
    }
}