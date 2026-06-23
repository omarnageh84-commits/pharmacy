const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSvlBUTo7Z4iFMHkH0cDGRsba99RlGiFjtGiLsO9MANiIIn_coI7xndvEht7LropZIHXA5SUde0hQo2/pub?output=csv';

Papa.parse(sheetUrl, {
    download: true,
    header: true,
    complete: function(results) {
        const container = document.getElementById('cards-container');
        container.innerHTML = ''; // تنظيف أي كروت قديمة
        
        const grouped = {}; 

        // 1. مرحلة التجميع (بنشيل التكرار في البيانات)
        results.data.forEach(item => {
            const name = item['اسم التحليل / المرض']?.trim();
            if (!name) return;

            if (!grouped[name]) {
                grouped[name] = { ...item };
            } else {
                for (let key in item) {
                    if (item[key] && item[key].trim() !== "" && (!grouped[name][key] || grouped[name][key].trim() === "")) {
                        grouped[name][key] = item[key].trim();
                    }
                }
            }
        });

        // 2. مرحلة العرض (بنعرض الكروت المجمعة فقط)
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
});
