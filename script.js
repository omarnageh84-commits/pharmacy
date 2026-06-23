const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSvlBUTo7Z4iFMHkH0cDGRsba99RlGiFjtGiLsO9MANiIIn_coI7xndvEht7LropZIHXA5SUde0hQo2/pub?output=csv';

Papa.parse(sheetUrl, {
    download: true,
    header: true,
    complete: function(results) {
        const data = results.data;
        const container = document.getElementById('cards-container');
        container.innerHTML = ''; // تنظيف الحاوية

        data.forEach(item => {
            if (!item['اسم التحليل / المرض']) return; // تخطي الأسطر الفارغة

            const card = document.createElement('div');
            card.className = 'card';
            
            const isDisease = item['الحالة'] && item['الحالة'].trim() === 'مرض';

            let html = `<h2>${item['اسم التحليل / المرض']}</h2>`;
            
            if (isDisease) {
                html += `<p><strong>التعريف:</strong> ${item['ماهو'] || ''}</p>
                         <p><strong>العلاج:</strong> ${item['العلاج الصيدلي والطبيعي'] || ''}</p>`;
            } else {
                html += `<p><strong>الطبيعي:</strong> ${item['الطبيعي'] || ''}</p>
                         <p><strong>العالي:</strong> ${item['العالي'] || ''}</p>`;
            }

            card.innerHTML = html;
            container.appendChild(card);
        });
    }
});
