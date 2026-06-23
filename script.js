const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSvlBUTo7Z4iFMHkH0cDGRsba99RlGiFjtGiLsO9MANiIIn_coI7xndvEht7LropZIHXA5SUde0hQo2/pub?output=csv';

Papa.parse(sheetUrl, {
    download: true,
    header: true,
    complete: function(results) {
        const container = document.getElementById('cards-container');
        container.innerHTML = ''; 
        
        const grouped = {};
        let lastKnownName = ""; // عشان نفتكر اسم المرض في السطور الفاضية

        results.data.forEach(row => {
            // 1. استخراج وتوحيد اسم المرض
            let currentName = row['اسم التحليل / المرض']?.trim();
            if (currentName && currentName !== "") {
                lastKnownName = currentName;
            } else {
                currentName = lastKnownName;
            }

            if (!currentName || currentName === "") return;

            // 2. تجميع البيانات في كارت واحد
            if (!grouped[currentName]) {
                grouped[currentName] = { ...row, 'اسم التحليل / المرض': currentName };
            } else {
                for (let key in row) {
                    if (row[key] && row[key].trim() !== "" && key !== 'اسم التحليل / المرض') {
                        // دمج البيانات الجديدة مع القديمة لو كانت فاضية
                        if (!grouped[currentName][key] || grouped[currentName][key].trim() === "") {
                            grouped[currentName][key] = row[key].trim();
                        } else {
                            // لو فيه داتا فعلاً، بنضيفها جنب بعض
                            grouped[currentName][key] += " " + row[key].trim();
                        }
                    }
                }
            }
        });

        // 3. عرض الكروت
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
