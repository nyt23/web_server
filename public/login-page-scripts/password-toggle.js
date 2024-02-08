function togglePassword(){
    const passwordField = document.querySelector("#password-field")
    // const passwordToggle = document.querySelector("password-toggle")
    if(passwordField.type === "password"){
        passwordField.type = "text"
        document.getElementById("password-toggle").textContent = "Hide Password"
        //passwordToggle.textContent = "Hide Password"
    } else {
        passwordField.type = "password"
        document.getElementById("password-toggle").textContent = "Show Password"
    }
}