Papa.parse(sheetUrl, {
    download: true,
    header: false, // هنعتمد على ترتيب الأعمدة عشان نضمن كل حاجة تظهر
    complete: function(results) {
        const container = document.getElementById('cards-container');
        container.innerHTML = '';
        
        const grouped = {}; // هنا هنجمع الأمراض

        // بنبدأ من i=1 عشان نتخطى صف العناوين
        for (let i = 1; i < results.data.length; i++) {
            let row = results.data[i];
            let name = row[0]?.trim(); // العمود الأول هو الاسم

            if (!name || name === "") continue;

            if (!grouped[name]) {
                // لو ده أول مرة نشوف المرض ده، نخزن الصف كله
                grouped[name] = { ...row };
            } else {
                // لو المرض متكرر، ندمج البيانات الناقصة فقط
                for (let j = 1; j < row.length; j++) {
                    if (row[j] && row[j].trim() !== "" && (!grouped[name][j] || grouped[name][j] === "")) {
                        grouped[name][j] = row[j].trim();
                    }
                }
            }
        }

        // دلوقتي نعرض الكروت المجمعة
        Object.values(grouped).forEach(d => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h2>${d[0] || ''}</h2>
                <p><strong>الحالة:</strong> ${d[1] || ''}</p>
                <p><strong>ماهو:</strong> ${d[2] || ''}</p>
                <p><strong>التحليل المناسب:</strong> ${d[3] || ''}</p>
                <p><strong>العلاج:</strong> ${d[4] || ''}</p>
                <p><strong>معدي:</strong> ${d[5] || ''}</p>
                ${d[9] ? `<img src="${d[9]}" style="max-width:100%; border-radius:8px;">` : ''}
            `;
            container.appendChild(card);
        });
    }
});
