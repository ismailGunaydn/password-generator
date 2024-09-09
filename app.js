// DOM Elemanlarını Seç
const resultElement = document.getElementById('result');
const lengthInput = document.getElementById('length');
const uppercaseCheckbox = document.getElementById('uppercase');
const lowercaseCheckbox = document.getElementById('lowercase');
const numbersCheckbox = document.getElementById('numbers');
const symbolsCheckbox = document.getElementById('symbols');
const generateButton = document.getElementById('generate');
const clipboardButton = document.getElementById('clipboard');

// Rastgele Karakter Fonksiyonları
const randomCharacterFunctions = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

// Panoya Kopyalama İşlevi
clipboardButton.addEventListener('click', copyPasswordToClipboard);

// Parola Oluşturma Butonu
generateButton.addEventListener('click', generateAndDisplayPassword);

// Panoya Kopyalama Fonksiyonu
function copyPasswordToClipboard() {
    const password = resultElement.innerText;
    if (!password) {
        alert('Öncelikle bir parola oluşturun.');
        return;
    }

    navigator.clipboard.writeText(password);
    alert('Parola panoya kopyalandı!');
}

// Parola Oluşturma ve Gösterme Fonksiyonu
function generateAndDisplayPassword() {
    const length = parseInt(lengthInput.value, 10);
    const hasLower = lowercaseCheckbox.checked;
    const hasUpper = uppercaseCheckbox.checked;
    const hasNumber = numbersCheckbox.checked;
    const hasSymbol = symbolsCheckbox.checked;

    // Geçersiz giriş kontrolü
    if (!isValidInput(length, hasLower, hasUpper, hasNumber,
    hasSymbol)) {
        alert('Lütfen geçerli bir uzunluk ve en az bir karakter türü seçin.');
        return;
    }

    const generatedPassword = createPassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
    resultElement.innerText = generatedPassword;
}

// Giriş Kontrol Fonksiyonu
function isValidInput(length, hasLower, hasUpper, hasNumber, hasSymbol) {
    return length > 0 && (hasLower || hasUpper || hasNumber || hasSymbol);
}

// Parola Oluşturma Fonksiyonu
function createPassword(lower, upper, number, symbol, length) {
    let password = '';
    const typesCount = lower + upper + number + symbol;
    const selectedTypes = [{ lower }, { upper }, { number }, { symbol }].filter(type => Object.values(type)[0]);

    // Hiçbir karakter türü seçilmemişse
    if (typesCount === 0) {
        return '';
    }

    // Parolayı Oluştur
    for (let i = 0; i < length; i++) {
        const functionName = selectedTypes[Math.floor(Math.random() * selectedTypes.length)];
        password += randomCharacterFunctions[Object.keys(functionName)[0]]();
    }

    return password;
}

// Rastgele Küçük Harf Oluşturma
function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

// Rastgele Büyük Harf Oluşturma
function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

// Rastgele Rakam Oluşturma
function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

// Rastgele Sembol Oluşturma
function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
}