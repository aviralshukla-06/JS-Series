const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const height = parseInt(document.getElementById('height').value);
    const weight = parseInt(document.getElementById('weight').value);
    const resultBox = document.getElementById('result-box');
    const result = document.getElementById('result');

    if (isNaN(height) || height <= 0) {
        result.innerHTML = 'Please input a valid height';
        resultBox.classList.remove('invisible');
    } else if (isNaN(weight) || weight <= 0) {
        result.innerHTML = 'Please input a valid weight';
        resultBox.classList.remove('invisible');
    } else {
        const heightInMeters = height / 100;
        const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
        result.innerHTML = `<span>${bmi}</span>`;
        resultBox.classList.remove('invisible');
    }
});
