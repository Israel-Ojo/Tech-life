/**

function toggleMenu() {
            var menu = document.getElementById("menu");
            var hamburger = document.getElementById("hamburger");
            if (menu.style.display === "block") {
                menu.style.display = "none";
                hamburger.style.display = "block";
            } else {
                menu.style.display = "block";
            }
        }
        
       **/
        
 /**       function toggleMenu() {
    document.getElementById('menu').classList.toggle('active');
}
   **/
   
   /**
   function toggleMenu() {
    document.getElementById('menu').classList.toggle('active');
}
   
   **/
   
   
   
   
   function toggleMenu() {
    const menu = document.getElementById("menu");
    menu.classList.toggle("active");
}

function closeMenu() {
    const menu = document.getElementById("menu");
    menu.classList.remove("active");
}
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   