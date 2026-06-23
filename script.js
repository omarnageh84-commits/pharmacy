Papa.parse(sheetUrl, {
    download: true,
    header: false, // نلغي الاعتماد على العناوين عشان نتجنب مشاكل التسمية
    complete: function(results) {
        const container = document.getElementById('cards-container');
        container.innerHTML = '';
        
        const grouped = {};
        let lastKnownName = "";

        // نبدأ من الصف الثاني (i=1) عشان نتخطى صف العناوين
        for (let i = 1; i < results.data.length; i++) {
            let row = results.data[i];
            
            // ترتيب الأعمدة حسب ما كتبت لي:
            // A=0 (الاسم), B=1 (الحالة), C=2 (ماهو), D=3 (التحليل), 
            // E=4 (العلاج), F=5 (معدي), G=6 (الطبيعي), H=7 (العالي), I=8 (الوطي), J=9 (الرابط)
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
                // دمج البيانات لو كانت مكملة في صفوف تانية
                for (let col = 1; col < row.length; col++) {
                    if (row[col] && row[col].trim() !== "" && (!grouped[currentName].data[col] || grouped[currentName].data[col] === "")) {
                        grouped[currentName].data[col] = row[col].trim();
                    }
                }
            }
        }

        // العرض النهائي
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
