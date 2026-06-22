// ده الرابط اللي بيجيب البيانات من الشيت
const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSvlBUTo7Z4iFMHkH0cDGRsba99RlGiFjtGiLsO9MANiIIn_coI7xndvEht7LropZIHXA5SUde0hQo2/pub?output=csv';

async function fetchData() {
    try {
        const response = await fetch(sheetUrl);
        const data = await response.text();
        const rows = data.split('\n').slice(1); 

        const container = document.getElementById('pharmacy-container');
        container.innerHTML = ''; 

        rows.forEach(row => {
            const columns = row.split(',');
            if (columns.length >= 3) {
                const name = columns[0].toUpperCase().trim();
                const price = columns[1].trim();
                const category = columns[2].trim();

                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <h3>${name}</h3>
                    <p><strong>السعر:</strong> ${price}</p>
                    <p><strong>الفئة:</strong> ${category}</p>
                `;
                container.appendChild(card);
            }
        });
    } catch (error) {
        console.error('مشكلة في تحميل البيانات:', error);
    }
}

fetchData();