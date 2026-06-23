const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSvlBUTo7Z4iFMHkH0cDGRsba99RlGiFjtGiLsO9MANiIIn_coI7xndvEht7LropZIHXA5SUde0hQo2/pub?output=csv';

Papa.parse(sheetUrl, {
    download: true,
    header: false, // تعامل مع الأعمدة كأرقام (0, 1, 2...)
    complete: function(results) {
        const container = document.getElementById('cards-container');
        container.innerHTML = '';
        
        const grouped = {};
        let lastKnownName = "";

        // بنبدأ من الصف التاني (i=1) عشان نتخطى العناوين
        for (let i = 1; i < results.data.length; i++) {
            let row = results.data[i];
            
            // ترتيب الأعمدة: 0:اسم المرض | 1:الحالة | 2:ماهو | 3:التحليل | 4:العلاج | 5:معدي | 6:الطبيعي | 7:العالي | 8:الوطي | 9:الرابط
            let currentName = row[0]?.trim();

            if (currentName && currentName !== "") {
                lastKnownName = currentName;
            } else {
                currentName = lastKnownName;
            }

            if (!currentName || currentName === "") continue;

            if (!grouped[currentName]) {
                grouped[currentName] = { name: currentName, data: row };
            } else {
                // دمج البيانات في الخانات الفاضية
                for (let col = 1; col < row.length; col++) {
                    if (row[col] && row[col].trim() !== "" && (!grouped[currentName].data[col] || grouped[currentName].data[col] === "")) {
                        grouped[currentName].data[col] = row[col].trim();
                    }
                }
            }
        }

        // عرض الكروت
        Object.values(grouped).forEach(item => {
            let d = item.data;
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h2>${item.name}</h2>
                <p><strong>الحالة:</strong> ${d[1] || ''}</p>
                <p><strong>ماهو:</strong> ${d[2] || ''}</p>
                <p><strong>التحليل المناسب:</strong> ${d[3] || ''}</p>
                <p><strong>العلاج الصيدلي والطبيعي:</strong> ${d[4] || ''}</p>
                <p><strong>معدي:</strong> ${d[5] || ''}</p>
                <p><strong>الطبيعي:</strong> ${d[6] || ''}</p>
                <p><strong>العالي:</strong> ${d[7] || ''}</p>
                <p><strong>الوطي:</strong> ${d[8] || ''}</p>
                ${d[9] ? `<img src="${d[9]}" style="max-width:100%; border-radius:8px;">` : ''}
            `;
            container.appendChild(card);
        });
    }
});
