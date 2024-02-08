async function updateUserData(){
    const username = sessionStorage.getItem('username')
    document.getElementById("username_input").textContent = `${username}'s Dashboard`;

    const picture_response = await fetch(`/api/${username}/profile-picture-path`);
    const picture = await picture_response.text();
    console.log(picture);
    document.getElementById("profile").src = `${picture}`;

}