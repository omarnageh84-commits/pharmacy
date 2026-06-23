Papa.parse(sheetUrl, {
    download: true,
    header: true,
    complete: function(results) {
        const container = document.getElementById('cards-container');
        container.innerHTML = ''; 
        
        const grouped = {}; 

        // 1. التجميع الذكي: نمر على كل صف ونجمع البيانات حسب اسم المرض
        results.data.forEach(row => {
            const name = row['اسم التحليل / المرض']?.trim();
            // لو الاسم فاضي، نتجاهل الصف ده تماماً
            if (!name) return;

            if (!grouped[name]) {
                grouped[name] = { ...row };
            } else {
                // لو المرض موجود، ندمج البيانات اللي كانت ناقصة فيه
                for (let key in row) {
                    if (row[key] && row[key].trim() !== "" && (!grouped[name][key] || grouped[name][key].trim() === "")) {
                        grouped[name][key] = row[key].trim();
                    }
                }
            }
        });

        // 2. العرض: نعرض الكروت المجمعة فقط
        Object.values(grouped).forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h2>${item['اسم التحليل / المرض']}</h2>
                <p><strong>ماهو:</strong> ${item['ماهو'] || ''}</p>
                <p><strong>العلاج:</strong> ${item['العلاج الصيدلي والطبيعي'] || ''}</p>
                <p><strong>معدي:</strong> ${item['معدي'] || ''}</p>
            `;
            container.appendChild(card);
        });
    }
});
