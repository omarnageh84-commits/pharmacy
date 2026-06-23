Papa.parse(sheetUrl, {
    download: true,
    header: true,
    complete: function(results) {
        const container = document.getElementById('cards-container');
        const groupedData = {}; // "وعاء" عشان نجمع فيه كل حاجة

        results.data.forEach(item => {
            const name = item['اسم التحليل / المرض'];
            if (!name) return;

            // لو المرض مش موجود في الوعاء، ضيفه
            if (!groupedData[name]) {
                groupedData[name] = { ...item };
            } else {
                // لو موجود، ضيف بس الخانات اللي فاضية
                for (let key in item) {
                    if (item[key] && !groupedData[name][key]) {
                        groupedData[name][key] = item[key];
                    }
                }
            }
        });

        // دلوقت نعرض اللي اتجمع بس
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
