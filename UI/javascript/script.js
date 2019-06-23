/**************TOGGLE****************************/

const toggle = document.querySelector(".toggle");
const e = document.querySelector("#nav");

const toggleNav = () =>{
	 if (e.style.display === "none"){
	 	 e.style.display = "block"
	 }else{
	 	 e.style.display = "none"
	 }
 };

toggle.addEventListener("click" , toggleNav);



 






