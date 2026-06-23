<script>
    const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSvlBUTo7Z4iFMHkH0cDGRsba99RlGiFjtGiLsO9MANiIIn_coI7xndvEht7LropZIHXA5SUde0hQo2/pub?output=csv';

    Papa.parse(sheetUrl, {
        download: true,
        header: true,
        complete: function(results) {
            const container = document.getElementById('cards-container');
            container.innerHTML = ''; 

            // "القاموس" اللي هيجمع كل البيانات تحت اسم المرض
            const grouped = {};

            results.data.forEach(row => {
                const name = row['اسم التحليل / المرض']?.trim();
                if (!name) return;

                // لو المرض ده مش موجود في القاموس، ضيفه
                if (!grouped[name]) {
                    grouped[name] = { ...row };
                } else {
                    // لو موجود، كمل الخانات الفاضية من السطور التانية
                    for (let key in row) {
                        if (row[key] && row[key].trim() !== "" && !grouped[name][key]) {
                            grouped[name][key] = row[key].trim();
                        }
                    }
                }
            });

            // عرض البيانات المجمعة
            Object.values(grouped).forEach(item => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <h2>${item['اسم التحليل / المرض'] || ''}</h2>
                    <p><strong>ماهو:</strong> ${item['ماهو'] || ''}</p>
                    <p><strong>التحليل المناسب:</strong> ${item['التحليل المناسب'] || ''}</p>
                    <p><strong>العلاج:</strong> ${item['العلاج الصيدلي والطبيعي'] || ''}</p>
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
</script>
