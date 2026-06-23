Papa.parse(sheetUrl, {
    download: true,
    header: true,
    complete: function(results) {
        const container = document.getElementById('cards-container');
        container.innerHTML = ''; 
        
        const grouped = {}; // ده الوعاء اللي هيتجمع فيه كل حاجة

        results.data.forEach(row => {
            const name = row['اسم التحليل / المرض']?.trim();
            if (!name) return; // لو السطر مفيش فيه اسم مرض، سيبك منه

            // لو ده أول مرة نشوف المرض ده، نحفظ بياناته
            if (!grouped[name]) {
                grouped[name] = { ...row };
            } else {
                // لو شفناه قبل كدة، ندمج البيانات الجديدة في نفس الكارت
                for (let key in row) {
                    if (row[key] && row[key].trim() !== "" && !grouped[name][key]) {
                        grouped[name][key] = row[key].trim();
                    } else if (row[key] && row[key].trim() !== "" && grouped[name][key] !== row[key].trim()) {
                        // لو فيه داتا تانية (زي تكملة العلاج)، نضيفها جنب القديمة
                        grouped[name][key] += " " + row[key].trim();
                    }
                }
            }
        });

        // عرض الكروت بعد ما جمعنا كل حاجة
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
