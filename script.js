const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSvlBUTo7Z4iFMHkH0cDGRsba99RlGiFjtGiLsO9MANiIIn_coI7xndvEht7LropZIHXA5SUde0hQo2/pub?output=csv';

// جلب البيانات من الشيت
function fetchData() {
    Papa.parse(sheetUrl, {
        download: true,
        header: true,
        complete: function(results) {
            renderCards(results.data); // عرض البيانات لما تخلص تحميل
        }
    });
}

// استدعاء الدالة أول ما الصفحة تفتح
fetchData();

// دالة العرض اللي إنت كتبتها (زي ما هي)
function renderCards(data) {
    const container = document.getElementById('cards-container');
    container.innerHTML = '';
    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h2>${item['اسم التحليل / المرض']}</h2>
            <p><strong>ماهو:</strong> ${item['ماهو']}</p>
            <p><strong>التحليل المناسب:</strong> ${item['التحليل المناسب']}</p>
            <p><strong>العلاج الصيدلي والطبيعي:</strong> ${item['العلاج الصيدلي والطبيعي']}</p>
            <p><strong>معدي:</strong> ${item['معدي']}</p>
            <p><strong>الطبيعي:</strong> ${item['الطبيعي']}</p>
            <p><strong>العالي:</strong> ${item['العالي']}</p>
            <p><strong>الوطي:</strong> ${item['الوطي']}</p>
            ${item['رابط الصور'] ? `<img src="${item['رابط الصور']}" alt="صورة المرض" style="width:100%; border-radius:10px;">` : ''}
        `;
        container.appendChild(card);
    });
}
