Papa.parse(sheetUrl, {
    download: true,
    header: true,
    complete: function(results) {
        const container = document.getElementById('cards-container');
        container.innerHTML = '';
        
        const grouped = {};
        let lastKnownName = ""; // متغير عشان "نفتكر" آخر اسم مرض قرأناه

        results.data.forEach(row => {
            // 1. تحديث اسم المرض: لو الخلية فاضية، استخدم آخر اسم معروف
            let currentName = row['اسم التحليل / المرض']?.trim();
            if (currentName && currentName !== "") {
                lastKnownName = currentName;
            } else {
                currentName = lastKnownName;
            }

            if (!currentName || currentName === "") return;

            // 2. تجميع البيانات
            if (!grouped[currentName]) {
                grouped[currentName] = { ...row, 'اسم التحليل / المرض': currentName };
            } else {
                // دمج الخانات في الكارت الواحد (بدل ما نكرر الكارت)
                for (let key in row) {
                    if (row[key] && row[key].trim() !== "" && key !== 'اسم التحليل / المرض') {
                        // لو فيه داتا جديدة، نضيفها جنب القديمة
                        grouped[currentName][key] = (grouped[currentName][key] || "") + " " + row[key].trim();
                    }
                }
            }
        });

        // 3. العرض
        Object.values(grouped).forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h2>${item['اسم التحليل / المرض']}</h2>
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
