async function authenticateUser(event){
    // prevents the browser from submitting
    event.preventDefault();

    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password-field").value;
    //const sessionToken = await response.text();
    // console.log(username, password);

    const response = await fetch('/api/login', {
        method:"POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: "username=" + username + "&password=" + password
    });

    if (response.status ===200) {
        const sessionToken = await response.text();
        //document.cookie = 'sessionToken=${sessionToken}'
        // Save data to sessionStorage
        sessionStorage.setItem('username', username);
        document.cookie = "sessionToken=" + sessionToken;
        window.location.href = "http://localhost:3000/dashboard";


    } else {
        //console.log('login failed. Status code: ', response.status);
        const validation = document.querySelector('#validation')
        validation.innerText = 'Name or Password is invalid!'
    }
}

    //const status = fetch('/api/login').then(response => console.log(response.status))
    //console.log(status)