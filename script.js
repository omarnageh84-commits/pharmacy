function renderCards(data) {
    const container = document.getElementById('cards-container');
    container.innerHTML = ''; 

    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';

        // بنحدد هل ده تحليل ولا مرض؟ (لو خانة "التحليل المناسب" فاضية يبقى تحليل)
        const isAnalysis = !item['التحليل المناسب'] || item['التحليل المناسب'].trim() === "";

        let htmlContent = `<h2>${item['اسم التحليل / المرض']}</h2>`;

        if (isAnalysis) {
            // لو تحليل - يظهر البيانات دي بس
            htmlContent += `
                <p><strong>العلاج:</strong> ${item['العلاج الصيدلي والطبيعي']}</p>
                <p><strong>معدي:</strong> ${item['معدي']}</p>
                <p><strong>الطبيعي:</strong> ${item['الطبيعي']}</p>
                <p><strong>العالي:</strong> ${item['العالي']}</p>
                <p><strong>الوطي:</strong> ${item['الوطي']}</p>
            `;
        } else {
            // لو مرض - يظهر البيانات دي
            htmlContent += `
                <p><strong>ماهو:</strong> ${item['ماهو']}</p>
                <p><strong>التحليل المناسب:</strong> ${item['التحليل المناسب']}</p>
                <p><strong>العلاج:</strong> ${item['العلاج الصيدلي والطبيعي']}</p>
                <p><strong>معدي:</strong> ${item['معدي']}</p>
            `;
        }

        // الصورة (صغرناها خليناها 120 بكسل عشان متبوظش الكارت)
        if (item['رابط الصور']) {
            htmlContent += `<img src="${item['رابط الصور']}" style="width:120px; height:120px; border-radius:10px; margin-top:10px; display:block; margin-right:auto; margin-left:auto;">`;
        }

        card.innerHTML = htmlContent;
        container.appendChild(card);
    });
}
