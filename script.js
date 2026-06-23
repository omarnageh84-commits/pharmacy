Papa.parse(sheetUrl, {
    download: true,
    header: true,
    complete: function(results) {
        const container = document.getElementById('cards-container');
        const groupedData = {}; 

        results.data.forEach(item => {
            const name = item['اسم التحليل / المرض'];
            if (!name) return;

            if (!groupedData[name]) {
                groupedData[name] = { ...item };
            } else {
                // التعديل هنا: دمج النصوص بدل تجاهلها
                for (let key in item) {
                    if (item[key] && item[key].trim() !== "" && !groupedData[name][key]) {
                        groupedData[name][key] = item[key];
                    } else if (item[key] && groupedData[name][key] && !groupedData[name][key].includes(item[key])) {
                        // لو النص موجود بس مختلف، ضيفه جنبه
                        groupedData[name][key] += " " + item[key];
                    }
                }
            }
        });

        // عرض الكروت بعد الدمج الكامل
        Object.values(groupedData).forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';
            
            // هنا بنبني الكارت وبنضمن ظهور البيانات
            card.innerHTML = `
                <h2>${item['اسم التحليل / المرض'] || ''}</h2>
                <p><strong>ماهو:</strong> ${item['ماهو'] || ''}</p>
                <p><strong>العلاج:</strong> ${item['العلاج الصيدلي والطبيعي'] || ''}</p>
                <p><strong>معدي:</strong> ${item['معدي'] || ''}</p>
            `;
            container.appendChild(card);
        });
    }
});
