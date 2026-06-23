complete: function(results) {
    const container = document.getElementById('cards-container');
    container.innerHTML = ''; 

    // تجميع البيانات باستخدام reduce لضمان عدم التكرار
    const grouped = results.data.reduce((acc, item) => {
        const name = item['اسم التحليل / المرض']?.trim();
        if (!name) return acc;

        if (!acc[name]) {
            acc[name] = { ...item };
        } else {
            // دمج الحقول فقط إذا كانت فارغة في العنصر الأصلي
            for (let key in item) {
                if (item[key] && item[key].trim() !== "" && (!acc[name][key] || acc[name][key].trim() === "")) {
                    acc[name][key] = item[key].trim();
                }
            }
        }
        return acc;
    }, {});

    // عرض الكروت بعد التجميع
    Object.values(grouped).forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h2>${item['اسم التحليل / المرض']}</h2>
            <p><strong>ماهو:</strong> ${item['ماهو'] || ''}</p>
            <p><strong>العلاج:</strong> ${item['العلاج الصيدلي والطبيعي'] || ''}</p>
            <p><strong>معدي:</strong> ${item['معدي'] || ''}</p>
            <p><strong>التحليل المناسب:</strong> ${item['التحليل المناسب'] || ''}</p>
        `;
        container.appendChild(card);
    });
}
