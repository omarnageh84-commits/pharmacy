const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSvlBUTo7Z4iFMHkH0cDGRsba99RlGiFjtGiLsO9MANiIIn_coI7xndvEht7LropZIHXA5SUde0hQo2/pub?output=csv';

Papa.parse(sheetUrl, {
    download: true,
    header: true, // بنعتمد هنا على أسماء الأعمدة اللي في الشيت
    complete: function(results) {
        const container = document.getElementById('cards-container');
        container.innerHTML = '';
        
        const grouped = {};

        results.data.forEach(row => {
            // بنستخدم اسم العمود بالظبط زي ما هو مكتوب في الشيت
            const name = row['اسم التحليل / المرض']?.trim();
            if (!name) return; // تجاهل أي صف مفيش فيه اسم

            if (!grouped[name]) {
                grouped[name] = { ...row };
            } else {
                // دمج البيانات لو لقيت صف تاني لنفس المرض
                for (let key in row) {
                    if (row[key] && row[key].trim() !== "" && !grouped[name][key]) {
                        grouped[name][key] = row[key].trim();
                    }
                }
            }
        });

        // عرض الكروت
        Object.values(grouped).forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h2>${item['اسم التحليل / المرض'] || ''}</h2>
                <p><strong>ماهو:</strong> ${item['ماهو'] || ''}</p>
                <p><strong>التحليل المناسب:</strong> ${item['التحليل المناسب'] || ''}</p>
                <p><strong>العلاج الصيدلي والطبيعي:</strong> ${item['العلاج الصيدلي والطبيعي'] || ''}</p>
                <p><strong>معدي:</strong> ${item['معدي'] || ''}</p>
                <p><strong>الطبيعي:</strong> ${item['الطبيعي'] || ''}</p>
                <p><strong>العالي:</strong> ${item['العالي'] || ''}</p>
                <p><strong>الوطي:</strong> ${item['الوطي'] || ''}</p>
                ${item['رابط الصور'] ? `<img src="${item['رابط الصور']}" style="max-width:100%; border-radius:8px;">` : ''}
            `;
            container.appendChild(card);
        });
    }
});
