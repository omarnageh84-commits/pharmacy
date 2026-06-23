Papa.parse(sheetUrl, {
    download: true,
    header: true,
    complete: function(results) {
        const container = document.getElementById('cards-container');
        container.innerHTML = ''; // تفريغ الحاوية قبل البدء
        
        const groupedData = {}; // هذا "وعاء" لتجميع البيانات

        results.data.forEach(item => {
            const name = item['اسم التحليل / المرض']?.trim();
            if (!name) return;

            // إذا كان هذا المرض يظهر لأول مرة، أنشئ له كارت
            if (!groupedData[name]) {
                groupedData[name] = { ...item };
            } else {
                // إذا كان موجوداً، قم بدمج البيانات (بدون تكرار)
                for (let key in item) {
                    if (item[key] && item[key].trim() !== "" && !groupedData[name][key]) {
                        groupedData[name][key] = item[key].trim();
                    }
                }
            }
        });

        // الآن نعرض البيانات المجمعة فقط
        Object.values(groupedData).forEach(item => {
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
