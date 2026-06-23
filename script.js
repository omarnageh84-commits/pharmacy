Papa.parse(sheetUrl, {
    download: true,
    header: false, // مش هنعتمد على العناوين عشان نتجنب اللخبطة
    complete: function(results) {
        const container = document.getElementById('cards-container');
        container.innerHTML = '';
        
        const grouped = {}; // ده القاموس اللي هيجمع البيانات
        let lastKnownName = "";

        // بنبدأ من الصف التاني (i=1) عشان نتخطى صف العناوين
        for (let i = 1; i < results.data.length; i++) {
            let row = results.data[i];
            
            // ترتيب الأعمدة: A=0, B=1, C=2, D=3, E=4, F=5, G=6, H=7, I=8, J=9
            let currentName = row[0]?.trim();

            if (currentName && currentName !== "") {
                lastKnownName = currentName;
            } else {
                currentName = lastKnownName; // لو اسم المرض فاضي، بنستخدم اسم المرض اللي فوقه
            }

            if (!currentName || currentName === "") continue;

            if (!grouped[currentName]) {
                grouped[currentName] = { name: currentName, data: [...row] };
            } else {
                // دمج البيانات في الخانات الفاضية
                for (let col = 1; col < row.length; col++) {
                    if (row[col] && row[col].trim() !== "" && (!grouped[currentName].data[col] || grouped[currentName].data[col] === "")) {
                        grouped[currentName].data[col] = row[col].trim();
                    }
                }
            }
        }

        // عرض الكروت المجمعة
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
                ${d[9] ? `<img src="${d[9]}" style="max-width:100%; border-radius:8px; margin-top:10px;">` : ''}
            `;
            container.appendChild(card);
        });
    }
});
