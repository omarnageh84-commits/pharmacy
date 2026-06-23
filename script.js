<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>موسوعة صيدلية زينهم</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.2/papaparse.min.js"></script>
    <style>
        body { font-family: sans-serif; text-align: center; background: #f4f4f4; padding: 20px; }
        #cards-container { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 15px; margin-top: 20px; }
        .card { background: white; border-radius: 10px; padding: 15px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); text-align: right; border-right: 5px solid #0083b0; }
        input { width: 80%; padding: 10px; margin-bottom: 20px; border-radius: 5px; border: 1px solid #ccc; }
    </style>
</head>
<body>

    <h1>وإذا مرضت فهو يشفين</h1>
    <input type="text" id="search-input" placeholder="ابحث عن اسم المرض أو التحليل...">
    <div id="cards-container"></div>

    <script>
        const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSvlBUTo7Z4iFMHkH0cDGRsba99RlGiFjtGiLsO9MANiIIn_coI7xndvEht7LropZIHXA5SUde0hQo2/pub?output=csv';

        Papa.parse(sheetUrl, {
            download: true,
            header: true,
            complete: function(results) {
                const container = document.getElementById('cards-container');
                const grouped = {};

                // 1. تجميع البيانات
                results.data.forEach(row => {
                    let name = row['اسم التحليل / المرض']?.trim();
                    if (!name) return;

                    if (!grouped[name]) {
                        grouped[name] = { ...row };
                    } else {
                        for (let key in row) {
                            if (row[key] && row[key].trim() !== "" && !grouped[name][key]) {
                                grouped[name][key] = row[key].trim();
                            }
                        }
                    }
                });

                // 2. عرض الكروت
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

        // كود البحث
        document.getElementById('search-input').addEventListener('input', function(e) {
            const term = e.target.value.toLowerCase();
            document.querySelectorAll('.card').forEach(card => {
                card.style.display = card.querySelector('h2').innerText.toLowerCase().includes(term) ? 'block' : 'none';
            });
        });
    </script>
</body>
</html>
