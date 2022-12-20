//Global Variables
const displayPassword = document.querySelector('.input-box input');
const passwordStrenghtIndicator = document.querySelector('.pass-indicator');
const passwordLengthNumber = document.querySelector('.details span');
const passwordLengthRange = document.querySelector('.pass-length input');
const lowerCaseElement = document.getElementById('lowercase');
const upperCaseElement = document.getElementById('uppercase');
const numbersElement = document.getElementById('numbers');
const symbolsElement = document.getElementById('symbols');
const excludeDuplicateElement = document.getElementById('exc-duplicate');
const includeSpacesElement = document.getElementById('spaces');
const generateBtn = document.querySelector('.generate-btn');
const copyBtn = document.querySelector('.input-box span');

passwordLengthNumber.innerText = passwordLengthRange.value;
passwordLengthRange.addEventListener('input', () => {
    passwordLengthNumber.innerText = passwordLengthRange.value;
})

//event listener for generating random passwords 
generateBtn.addEventListener('click', () => {    
    const passWordLength = passwordLengthRange.value;    
    const includeUpperCase = upperCaseElement.checked;
    const includeNumbers = numbersElement.checked;
    const includeSymbols = symbolsElement.checked;
    const excludeDuplicate = excludeDuplicateElement.checked;
    const includeSpaces = includeSpacesElement.checked;
    const password = generatePassword(passWordLength,includeUpperCase, includeNumbers, includeSymbols, excludeDuplicate, includeSpaces);    
    displayPassword.value = password;
    const strength = calculatePasswordStrength(password, passWordLength)
    console.log(strength)
    updateStrengthIndicator(strength)
});


//this function updates the strength indicator as appropriate.
function updateStrengthIndicator(strength){
    const indicatorTextEl = document.querySelector('.indicator-text')
    if(strength >= 90){
        indicatorTextEl.innerText = 'Your Password is very Strong';
        indicatorTextEl.style.color = '#008000';
        passwordStrenghtIndicator.style.setProperty('--strenghtIndicator', strength);
        passwordStrenghtIndicator.style.setProperty('--backgroundColor', '#008000');       
    }else if(strength > 60){
        indicatorTextEl.innerText = 'Your Password is Strong';
        indicatorTextEl.style.color = '#ffa500';
        passwordStrenghtIndicator.style.setProperty('--strenghtIndicator', strength);
        passwordStrenghtIndicator.style.setProperty('--backgroundColor', '#ffa500');
    }else if(strength > 40){
        indicatorTextEl.innerText = 'Your Password is weak';
        indicatorTextEl.style.color = '#ff4757';
        passwordStrenghtIndicator.style.setProperty('--strenghtIndicator', strength);
        passwordStrenghtIndicator.style.setProperty('--backgroundColor', '#ff4757');
    }else{
        indicatorTextEl.innerText = 'Your Password is very weak';
        indicatorTextEl.style.color = '#ff0000';
        passwordStrenghtIndicator.style.setProperty('--strenghtIndicator', strength);
        passwordStrenghtIndicator.style.setProperty('--backgroundColor', '#ff0000');
    }
}

//This function uses RegEx to calculate password strength
function calculatePasswordStrength(password, passWordLength){
    let strength = 100;
    const lowercaseCharacters = /[a-z]/g;
    const upperCaseCharacters = /[A-Z]/g;
    const numberCharacters = /[0-9]/g;
    const specialCharacters = /[^a-zA-Z0-9\s]/g;
    const repeatedCharacters = /(.)\1/g;
    if(passWordLength < 6){
        strength-=60;
    }
    if(password.match(lowercaseCharacters) == null){
        strength-=10;
    }
    if(password.match(upperCaseCharacters) == null){
        strength-=10;
    }
    if(password.match(numberCharacters) == null){
        strength-=10;
    }
    if(password.match(specialCharacters) == null){
        strength-=10;
    }
    if(password.match(repeatedCharacters) != null){
        strength-=10;
    }
    return strength;
}

//this fuctions generates random passwords
function generatePassword(passWordLength, includeUpperCase, includeNumbers, includeSymbols, excludeDuplicate, includeSpaces){
    const lowercase = loopThroughASCIICodes(97, 122);
    const uppercase = loopThroughASCIICodes(65, 90);
    const numbers = loopThroughASCIICodes(48, 57);
    const symbols = loopThroughASCIICodes(33, 47)
    .concat(loopThroughASCIICodes(58, 64))
    .concat(loopThroughASCIICodes(91, 96))
    .concat(loopThroughASCIICodes(123, 126));
    const spaces = ['32', '32', '32', '32'];
   
    //By default set the lowercase character codes as default
    let charCodes = lowercase;

    //concat upperCase character codes if uppercase is selected
    if(includeUpperCase) charCodes = charCodes.concat(uppercase);

    //concat Number character codes if uppercase is selected
    if(includeNumbers) charCodes = charCodes.concat(numbers);

    //concat Symbol charactercodes if symbol checkbox is checked
    if(includeSymbols) charCodes = charCodes.concat(symbols);

    //concat Spaces charactercodes if spaces checkbox is checked
    if(includeSpaces)  charCodes = charCodes.concat(spaces);   

    //array for storing generated passwords
    let array = [];


    for(let i = 0; i < passWordLength; i++){
        let character = charCodes[Math.floor(Math.random() * charCodes.length)];
        array.push(String.fromCharCode(character));
    }

    //if exclude duplicated checkbox is checked, remove duplicate digits or letters of the password
    if(excludeDuplicate) {  
        //remove all duplicates      
        array = array.filter((digit, index) => array.indexOf(digit) == index);       

        //if the password length is greater than the greatest possible length
        if(charCodes.length < passWordLength ){
            alert('you have exceeded the possible password length limit');
        }

        //if the array length is less than the set password length, add new unrepeated digits
        while(array.length < passWordLength && passWordLength <= charCodes.length){ 
            let char = charCodes[Math.floor(Math.random() * charCodes.length)];
            array.push(String.fromCharCode(char))
            array = array.filter((code, index) => array.indexOf(code) == index);             
        }        
    };    
    return array.join('')
}

//Function for producing all the needed ASCII codes
function loopThroughASCIICodes (low, high){
    const array = []
    for(let i = low; i <= high; i ++){
        array.push(i)
    }
    return array
}

//Event listener for copying generated password to clipboard
copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(displayPassword.value);
    copyBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;
    copyBtn.style.color = "#4285F4";
    setTimeout(() => {
        copyBtn.innerHTML = `<i class="fa-regular fa-copy"></i>`;
        copyBtn.style.color = "#707070";
    },2000)
})
