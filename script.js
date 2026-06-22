function renderCards(data) {
    const container = document.getElementById('cards-container');
    container.innerHTML = ''; 

    data.forEach(item => {
        // بننظف المفاتيح من أي مسافات زايدة
        const cleanItem = {};
        for(let key in item) { cleanItem[key.trim()] = item[key]; }
        
        const card = document.createElement('div');
        card.className = 'card';

        // بنشوف هل ده تحليل ولا مرض؟
        const isAnalysis = !cleanItem['التحليل المناسب'] || cleanItem['التحليل المناسب'].trim() === "";

        let htmlContent = `<h2>${cleanItem['اسم التحليل / المرض'] || 'بدون اسم'}</h2>`;

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
