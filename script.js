const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSvlBUTo7Z4iFMHkH0cDGRsba99RlGiFjtGiLsO9MANiIIn_coI7xndvEht7LropZIHXA5SUde0hQo2/pub?output=csv';

Papa.parse(sheetUrl, {
    download: true,
    header: true,
    complete: function(results) {
        renderCards(results.data);
    }
});

function renderCards(data) {
    const container = document.getElementById('cards-container');
    container.innerHTML = '';

    data.forEach(item => {
        // تنظيف المفاتيح من أي مسافات مخفية
        const cleanItem = {};
        for(let key in item) { cleanItem[key.trim()] = item[key]; }

        const card = document.createElement('div');
        card.className = 'card';

        // المنطق: لو "التحليل المناسب" فاضي يبقى ده تحليل، غير كدة يبقى مرض
        const isAnalysis = !cleanItem['التحليل المناسب'] || cleanItem['التحليل المناسب'].trim() === "";

        let htmlContent = `<h2>${cleanItem['اسم التحليل / المرض'] || ''}</h2>`;

        if (isAnalysis) {
            htmlContent += `
                <p><strong>العلاج:</strong> ${cleanItem['العلاج الصيدلي والطبيعي'] || ''}</p>
                <p><strong>معدي:</strong> ${cleanItem['معدي'] || ''}</p>
                <p><strong>الطبيعي:</strong> ${cleanItem['الطبيعي'] || ''}</p>
                <p><strong>العالي:</strong> ${cleanItem['العالي'] || ''}</p>
                <p><strong>الوطي:</strong> ${cleanItem['الوطي'] || ''}</p>
            `;
        } else {
            htmlContent += `
                <p><strong>ماهو:</strong> ${cleanItem['ماهو'] || ''}</p>
                <p><strong>التحليل المناسب:</strong> ${cleanItem['التحليل المناسب'] || ''}</p>
                <p><strong>العلاج:</strong> ${cleanItem['العلاج الصيدلي والطبيعي'] || ''}</p>
                <p><strong>معدي:</strong> ${cleanItem['معدي'] || ''}</p>
            `;
        }

        if (cleanItem['رابط الصور']) {
            htmlContent += `<img src="${cleanItem['رابط الصور']}" alt="صورة">`;
        }

        card.innerHTML = htmlContent;
        container.appendChild(card);
    });
}
