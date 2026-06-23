Papa.parse(sheetUrl, {
    download: true,
    header: true,
    complete: function(results) {
        const container = document.getElementById('cards-container');
        container.innerHTML = ''; 
        
        // ده "القاموس" اللي هيجمع كل البيانات تحت اسم واحد
        const grouped = {};

        results.data.forEach(row => {
            const name = row['اسم التحليل / المرض']?.trim();
            // لو الاسم فاضي، سيبك منه خالص
            if (!name) return;

            // لو ده أول مرة نشوف المرض ده، نحفظ بياناته
            if (!grouped[name]) {
                grouped[name] = { ...row };
            } else {
                // لو شفناه قبل كدة، ندمج البيانات الجديدة اللي كانت ناقصة
                for (let key in row) {
                    if (row[key] && row[key].trim() !== "" && !grouped[name][key]) {
                        grouped[name][key] = row[key].trim();
                    }
                }
            }
        });

        // دلوقت نعرض الكروت "المجمعة" بس
        Object.values(grouped).forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h2>${item['اسم التحليل / المرض'] || ''}</h2>
                <p><strong>ماهو:</strong> ${item['ماهو'] || ''}</p>
                <p><strong>العلاج الصيدلي والطبيعي:</strong> ${item['العلاج الصيدلي والطبيعي'] || ''}</p>
                <p><strong>معدي:</strong> ${item['معدي'] || ''}</p>
                <p><strong>الطبيعي:</strong> ${item['الطبيعي'] || ''}</p>
                <p><strong>العالي:</strong> ${item['العالي'] || ''}</p>
                <p><strong>الوطي:</strong> ${item['الوطي'] || ''}</p>
                <p><strong>التحليل المناسب:</strong> ${item['التحليل المناسب'] || ''}</p>
                ${item['رابط الصور'] ? `<img src="${item['رابط الصور']}" style="max-width:100%; border-radius:8px;">` : ''}
            `;
            container.appendChild(card);
        });
    }
});
