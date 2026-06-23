// 1. الدالة المسؤولة عن معالجة البيانات وعرضها
function loadData() {
    const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSvlBUTo7Z4iFMHkH0cDGRsba99RlGiFjtGiLsO9MANiIIn_coI7xndvEht7LropZIHXA5SUde0hQo2/pub?output=csv';

    Papa.parse(sheetUrl, {
        download: true,
        header: true,
        complete: function(results) {
            const merged = {};
            
            // معالجة البيانات ودمج المتكرر
            results.data.forEach(item => {
                const name = item['اسم التحليل / المرض'] ? item['اسم التحليل / المرض'].trim() : null;
                if (!name) return;

                if (!merged[name]) {
                    merged[name] = { ...item };
                } else {
                    for (let key in item) {
                        if (item[key] && item[key].trim() !== "") {
                            if (merged[name][key] && !merged[name][key].includes(item[key].trim())) {
                                merged[name][key] += " " + item[key].trim();
                            } else if (!merged[name][key]) {
                                merged[name][key] = item[key].trim();
                            }
                        }
                    }
                }
            });

            // عرض البيانات بعد دمجها
            renderCards(Object.values(merged));
        }
    });
}

// 2. دالة العرض (تأكد إن الـ ID في الـ HTML هو 'cards-container')
function renderCards(data) {
    const container = document.getElementById('cards-container');
    if (!container) return; // تأمين ضد الخطأ
    
    container.innerHTML = '';
    
    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        
        let html = `<h2>${item['اسم التحليل / المرض'] || 'غير معروف'}</h2>`;
        
        // التحقق من الخانات وإضافتها لو موجودة
        if (item['ماهو']) html += `<p><strong>ماهو:</strong> ${item['ماهو']}</p>`;
        if (item['التحليل المناسب']) html += `<p><strong>التحليل المناسب:</strong> ${item['التحليل المناسب']}</p>`;
        if (item['العلاج الصيدلي والطبيعي']) html += `<p><strong>العلاج:</strong> ${item['العلاج الصيدلي والطبيعي']}</p>`;
        if (item['معدي']) html += `<p><strong>معدي:</strong> ${item['معدي']}</p>`;
        // ... أضف باقي الخانات بنفس الطريقة

        if (item['رابط الصور']) {
            html += `<img src="${item['رابط الصور']}" style="max-width:150px; display:block; margin:10px auto;">`;
        }

        card.innerHTML = html;
        container.appendChild(card);
    });
}

// تشغيل الموقع
loadData();
