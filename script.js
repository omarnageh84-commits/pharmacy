// دالة عرض الكروت
function renderCards(data) {
    const container = document.getElementById('cards-container');
    container.innerHTML = ''; // فضي الكونتينر قبل العرض

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
