const welcome_button = document.querySelector(".welcome_button");
const welcome_headings = document.querySelectorAll(".welcome_headings");
const welcome_screen = document.querySelector(".welcome_screen");

const modalContainer = document.querySelector(".modal_container");
const modal = document.querySelector(".modal");
const modalHeading = document.querySelector("#modal_heading");
const modalSubheading = document.querySelector("#modal_subheading");
const modalLogo = document.querySelector("#modal_logo");

const mainContainer = document.querySelector(".main_container");
const guess_heading = document.querySelector(".guess_heading");
const logos = document.querySelectorAll(".logo_imgs");
const logoDivs = document.querySelectorAll(".logo_div");
const credits = document.querySelector(".credit_box");
const nextLogoBtn = document.querySelector("#next_logo");

const message = document.querySelector(".message");

let path = "./images/";
let files = [];
let counter = 0;
let curLogos;
let rightLogo;
let score = 0;

let winStatements = [
    "There you go!",
    "You guessed it right!",
    "You are a genius 🚀",
]

let loseStatements = [
    "Oops! that's not the right answer",
    "Try again!",
]

while (counter <= 23) {
    files.push({
        fake: `image${counter}_f`,
        original: `image${counter}_o`,
    });

    counter++;
}


console.log(files);
// welcome_screen.style.display = "none";

welcome_button.addEventListener("click", (e) => {
    // welcome_screen.style.transform = "translateY(-100%)";
    welcome_screen.style.animation = "fadeScreen .6s ease-in-out .1s";
    welcome_headings.forEach((heading) => {
        heading.style.animation =
            "fadeHeadings .6s cubic-bezier(.9,-0.7,.36,1.19) forwards";
    });
    welcome_button.style.animation =
        "fadeButton .6s cubic-bezier(.9,-0.7,.36,1.19)";
    setTimeout(() => {
        welcome_screen.style.display = "none";
    }, 640);

    setTimeout(() => {
        loadMainPage();
    }, 640);
});

function loadMainPage() {
    mainContainer.style.opacity = "1";

    guess_heading.classList.add("animate__animated");
    guess_heading.classList.add("animate__fadeInUp");

    credits.classList.add("animate__animated");
    credits.classList.add("animate__fadeInUp");
    credits.style.animationDelay = ".4s";

    counter = 1;
    let random = Math.random();
    rightLogo = random > 0.5 ? 1 : 2;
    curLogos = files[counter];
    
    console.log(rightLogo);
    
    logos.forEach((logo, index) => {
        logo.addEventListener("click", (e) => {
            if (counter == 1) {
                message.style.opacity = 1;
            }
            
            logoDivs[0].style.pointerEvents = "none";
            logoDivs[1].style.pointerEvents = "none";
            if (index + 1 == rightLogo) {
                logoDivs[index].style.border = "7px solid var(--success-color)";
                logoDivs[index].style.width = "19vw";
                logoDivs[index].querySelector(".badge").style.opacity = "1";
                logoDivs[index].querySelector(".badge").style.animationDuration = ".8s"
                logoDivs[index].querySelector(".badge").classList.add("animate__bounceIn");
                logoDivs[index].querySelector(".badge").classList.remove("animate__bounceOut");
                
                message.style.color = "var(--success-color)";
                message.textContent = winStatements[Math.floor(Math.random() * 3)];
                score += 1;
            } else {
                logoDivs[index].style.border = "7px solid var(--danger-color)";
                logoDivs[index == 0 ? 1 : 0].style.border = "7px solid var(--success-color)";
                logoDivs[index == 0 ? 1 : 0].style.width = "22vw";
                message.style.color = "var(--danger-color)";
                message.textContent = loseStatements[Math.floor(Math.random() * 2)];

                logoDivs[index == 0 ? 1 : 0].querySelector(".badge").style.opacity = "1";
                logoDivs[index == 0 ? 1 : 0].querySelector(".badge").style.animationDuration = ".8s"
                logoDivs[index == 0 ? 1 : 0].querySelector(".badge").classList.add("animate__bounceIn");
                logoDivs[index == 0 ? 1 : 0].querySelector(".badge").classList.remove("animate__bounceOut");
            }
            
            message.style.opacity = "1"
            message.style.animationDuration = ".8s";
            message.classList.add("animate__bounceIn");
            message.classList.remove("animate__bounceOut");
            
            if (counter == 23) {
                console.log("Came here!")
                modalContainer.style.backgroundColor = "var(--theme-color)";
                modalContainer.style.display = "flex";
                modalSubheading.querySelector(".score_text").textContent = score.toString();
                modal.classList.add("animate__animated");
                modal.classList.add("animate__bounceIn");
            }
            counter += 1;
        });
    });
    
    nextLogoBtn.addEventListener("click", (e) => {
        
        message.style.opacity = "0"
        message.style.animationDuration = "0s";
        message.classList.remove("animate__bounceIn");
        message.classList.add("animate__bounceOut");
        
        logoDivs[0].classList.remove("animate__fadeInUp");
        logoDivs[0].classList.add("animate__fadeInUp");
        logoDivs[1].classList.remove("animate__fadeInUp");
        logoDivs[1].classList.add("animate__fadeInUp");
        
        logoDivs.forEach((logoDiv) => {
            logoDiv.style.width = "18vw";
            logoDiv.style.border = "none";
            logoDiv.querySelector(".badge").style.animationDuration = "0s";
            logoDiv.querySelector(".badge").style.opacity = "0";
            logoDiv.querySelector(".badge").classList.add("animate__bounceOut");
            logoDiv.querySelector(".badge").classList.remove("animate__bounceIn");
        });
        
        rightLogo = Math.random() > 0.5 ? 1 : 2;
        showNewLogos(rightLogo);
    });
    
    showNewLogos(rightLogo);
}

function showNewLogos(rightLogo) {
    let scopeRightLogo = (rightLogo -= 1);

    logoDivs.forEach((logoDiv) => {
        console.log(logoDiv);
        logoDiv.style.pointerEvents = "all";
        logoDiv.style.opacity = "1";
        logoDiv.classList.add("animate__animated");
        logoDiv.classList.add("animate__fadeInUp");
    });

    logos[scopeRightLogo].src = path + files[counter].original + ".png";
    logos[scopeRightLogo == 0 ? 1 : 0].src =
        path + files[counter].fake + ".png";

    console.log(nextLogoBtn);

    nextLogoBtn.classList.remove("animate_fadeInUp");
    nextLogoBtn.classList.add("animate__fadeInUp");
}
