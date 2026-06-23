Papa.parse(sheetUrl, {
    download: true,
    header: false, // خليناه false عشان نتعامل مع الصفوف كمصفوفات (Arrays)
    complete: function(results) {
        const container = document.getElementById('cards-container');
        container.innerHTML = '';
        
        const grouped = {};
        let lastKnownName = "";

        // بنبدأ من i=1 عشان نتجاهل صف العناوين (Header)
        for (let i = 1; i < results.data.length; i++) {
            let row = results.data[i];
            
            // ترتيب الأعمدة بناءً على الشيت بتاعك:
            // 0:اسم المرض | 1:ماهو | 2:التحليل | 3:العلاج | 4:معدي | 5:الطبيعي | 6:العالي | 7:الوطي | 8:رابط الصور
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
                // دمج البيانات في الأعمدة لو كانت فاضية في الكارت المجمع
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
                <p><strong>ماهو:</strong> ${d[1] || ''}</p>
                <p><strong>التحليل المناسب:</strong> ${d[8] || ''}</p> 
                <p><strong>العلاج الصيدلي والطبيعي:</strong> ${d[3] || ''}</p>
                <p><strong>معدي:</strong> ${d[4] || ''}</p>
                <p><strong>الطبيعي:</strong> ${d[5] || ''}</p>
                <p><strong>العالي:</strong> ${d[6] || ''}</p>
                <p><strong>الوطي:</strong> ${d[7] || ''}</p>
                ${d[9] ? `<img src="${d[9]}" style="max-width:100%; border-radius:8px;">` : ''}
            `;
            container.appendChild(card);
        });
    }
});
