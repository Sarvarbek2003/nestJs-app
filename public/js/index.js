const userslist = document.querySelector('.usersList')
const bookslist = document.querySelector('.books')
let UserId = JSON.parse(window.localStorage.getItem('userId')) 

let users;
let books;

logout.innerHTML = UserId ? `<a href="#">Logout</a>` : `<a href="#">Login</a>`

logout.onclick = () => {
    window.localStorage.removeItem('token');
    window.location = "/auth/login";
}


(async()=>{
    users = await req('/users');
    books = await req('/books');
    renderUsers(users)
})()


function renderUsers (users){
    users.forEach(el => {
        const [li,div1,img,div2,h2,p] = createElements('li','div','img','div','h2','p');
        li.setAttribute('class','user');
        h2.setAttribute('class','firstName');
        p.setAttribute('class','email');
        img.setAttribute('class','imgg')
        img.setAttribute('src',backendApi+'/'+el.imgUrl)
        div1.append(img)
        
        h2.textContent = el.firstName || 'Firstname';
        p.textContent = el.email;

        div2.append(h2, p)

        li.append(div1,div2);
        userslist.append(li);

        li.onclick = () => {
            renderBooks(el.id)
        }
    });

}

function renderBooks(id) {
    bookslist.innerHTML = null
    if(!books.length) return
    books.forEach((el,index) => {
        if(el.userId == id){
            const [li,img,h3,p,img2, img3, btn] = createElements('li','img','h3','p','img', 'img','button');
            img.setAttribute('src', el.link);
            img.setAttribute('class', 'img');
            img.setAttribute('alt', 'pic');

            if(el.userId == UserId) {
                h3.setAttribute('contenteditable', 'true')
                p.setAttribute('contenteditable', 'true')
                img2.setAttribute('src', 'https://www.svgrepo.com/show/293410/delete-stop.svg')
                img2.setAttribute('style', 'width: 20px; position: absolute; top:5px; left: 205px; cursor:pointer;')
                img3.setAttribute('src', 'https://www.svgrepo.com/show/273992/check.svg')
                img3.setAttribute('disabled', 'true')
                img3.setAttribute('style', 'width: 20px; position: absolute; top:5px; left: 5px; cursor:pointer;')
                btn.setAttribute('disabled', 'true')
                btn.append(img3)
                
                img2.onclick = () => {
                    li.remove()
                    req('/delete/book/'+el.id, 'DELETE');
                }

                h3.onkeyup = () => {
                    btn.removeAttribute('disabled', 'disabled')
                }
                p.onkeyup = () => {
                    btn.removeAttribute('disabled', 'disabled')
                }

                btn.onclick = () => {
                    update(el.id,h3.textContent,p.textContent)
                    btn.setAttribute('disabled', 'true')
                }
            }

            h3.textContent = el.title;
            p.textContent = el.description;

            li.append(img,h3,p,img2,btn);
            bookslist.append(li);

        }
    });
}

async function update(userId, titlee, descriptionn){
    let body = {
        id: userId,
        title: titlee,
        description: descriptionn
    }
    let res = await req('/update/book', 'PUT', body);
    if(res.status == '200') {
        users = await req('/users');
        books = await req('/books');
        alert (res.message)
    }
    else alert ('xatolik')
    
}



        