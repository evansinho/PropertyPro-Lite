/************sign in****************/
const login_btn = document.querySelector('.login_btn');
const close_icon = document.querySelector('.close');
const showcase_btn = document.querySelector('.showcase_btn');
const close_signUp = document.querySelector('.close_register');
const sign_up = document.querySelector('#sign_up');
const sign_in = document.querySelector('#sign_in');


const showSignInModal=()=>{
	return document.querySelector('.login-bg-modal').style.display = "flex";
};

const closeSignInModal = () =>{
	return document.querySelector('.login-bg-modal').style.display = "none";
}

const showSignUpModal = () => {
 	return document.querySelector('.register-bg-modal').style.display = "flex";
 }

 const closeSignUpModal = () =>{
	return document.querySelector('.register-bg-modal').style.display = "none";
}

const switchToSignUp = () =>{
	closeSignInModal();
	showSignUpModal();
}

const switchToSignIn = () =>{
	closeSignUpModal();
	showSignInModal();
}



login_btn.addEventListener("click", showSignInModal);
close_icon.addEventListener("click", closeSignInModal);
showcase_btn.addEventListener("click", showSignUpModal);
close_signUp.addEventListener("click", closeSignUpModal);
sign_up.addEventListener("click", switchToSignUp);
sign_in.addEventListener("click", switchToSignIn);

 







