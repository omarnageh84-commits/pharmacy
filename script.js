// 1. الدالة الأساسية لجلب البيانات ومعالجتها
function loadData() {
    const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSvlBUTo7Z4iFMHkH0cDGRsba99RlGiFjtGiLsO9MANiIIn_coI7xndvEht7LropZIHXA5SUde0hQo2/pub?output=csv';

    Papa.parse(sheetUrl, {
        download: true,
        header: true,
        complete: function(results) {
            const merged = {};
            
            // دمج البيانات (كل مرض/تحليل في كارت واحد)
            results.data.forEach(item => {
                const name = item['اسم التحليل / المرض'] ? item['اسم التحليل / المرض'].trim() : null;
                if (!name) return;

                if (!merged[name]) {
                    merged[name] = { ...item };
                } else {
                    for (let key in item) {
                        if (item[key] && item[key].trim() !== "" && !merged[name][key]) {
                            merged[name][key] = item[key].trim();
                        }
                    }
                }
            });

            // عرض البيانات
            renderCards(Object.values(merged));
        }
    });
}

// 2. دالة العرض (بناء الكارت)
function renderCards(data) {
    const container = document.getElementById('cards-container');
    container.innerHTML = '';
    
    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        
        // هنا الشرط اللي بيعتمد على عمود "الحالة"
        const status = item['الحالة'] ? item['الحالة'].trim().toLowerCase() : '';
        const isDisease = status === 'مرض';

        let html = `<h2>${item['اسم التحليل / المرض'] || 'غير معروف'}</h2>`;
        
        if (isDisease) {
            html += `<p><strong>التعريف:</strong> ${item['ماهو'] || ''}</p>
                     <p><strong>العلاج:</strong> ${item['العلاج الصيدلي والطبيعي'] || ''}</p>
                     <p><strong>معدي:</strong> ${item['معدي'] || ''}</p>`;
        } else {
            html += `<p><strong>الطبيعي:</strong> ${item['الطبيعي'] || ''}</p>
                     <p><strong>العالي:</strong> ${item['العالي'] || ''}</p>
                     <p><strong>الوطي:</strong> ${item['الوطي'] || ''}</p>
                     <p><strong>التحليل المناسب:</strong> ${item['التحليل المناسب'] || ''}</p>`;
        }

        if (item['رابط الصور']) {
            html += `<img src="${item['رابط الصور']}" style="max-width:150px; display:block; margin:10px auto;">`;
        }

        card.innerHTML = html;
        container.appendChild(card);
    });
}

// 3. تشغيل الكود
loadData();

// 4. كود البحث (عشان يفلتر البيانات لما تكتب)
document.getElementById('search-input').addEventListener('input', function(e) {
    const term = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const title = card.querySelector('h2').innerText.toLowerCase();
        card.style.display = title.includes(term) ? 'block' : 'none';
    });
});
