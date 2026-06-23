// دالة دمج البيانات (تجمع كل شيء في مكان واحد)
function processData(data) {
    const merged = {};
    
    data.forEach(item => {
        // تنظيف اسم المرض/التحليل
        const name = item['اسم التحليل / المرض'] ? item['اسم التحليل / المرض'].trim() : null;
        if (!name) return; // لو السطر فاضي سكيب

        if (!merged[name]) {
            // لو أول مرة نشوف المرض، نحفظه
            merged[name] = { ...item };
        } else {
            // لو شفناه قبل كدة، ندمج البيانات فيه
            for (let key in item) {
                if (item[key] && item[key].trim() !== "" && !merged[name][key]) {
                    merged[name][key] = item[key];
                }
            }
        }
    });
    return Object.values(merged);
}

// دالة العرض (دي اللي هتشتغل بعد ما البيانات تتدلق في الـ merged)
function renderCards(data) {
    const container = document.getElementById('cards-container');
    container.innerHTML = '';
    
    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        
        // التحقق من نوع البيانات
        const isAnalysis = !item['ماهو'] || item['ماهو'].trim() === "";

        // بناء محتوى الكارت
        let html = `<h2>${item['اسم التحليل / المرض'] || ''}</h2>`;
        
        if (isAnalysis) {
            html += `<p><strong>العلاج:</strong> ${item['العلاج الصيدلي والطبيعي'] || ''}</p>
                     <p><strong>معدي:</strong> ${item['معدي'] || ''}</p>
                     <p><strong>الطبيعي:</strong> ${item['الطبيعي'] || ''}</p>
                     <p><strong>العالي:</strong> ${item['العالي'] || ''}</p>
                     <p><strong>الوطي:</strong> ${item['الوطي'] || ''}</p>`;
        } else {
            html += `<p><strong>ماهو:</strong> ${item['ماهو'] || ''}</p>
                     <p><strong>التحليل المناسب:</strong> ${item['التحليل المناسب'] || ''}</p>
                     <p><strong>العلاج:</strong> ${item['العلاج الصيدلي والطبيعي'] || ''}</p>
                     <p><strong>معدي:</strong> ${item['معدي'] || ''}</p>`;
        }

        if (item['رابط الصور'] && item['رابط الصور'].trim() !== "") {
            html += `<img src="${item['رابط الصور']}" style="max-width:100px; display:block; margin:10px auto;">`;
        }

        card.innerHTML = html;
        container.appendChild(card);
    });
}

// تشغيل الكود الرئيسي
Papa.parse('https://docs.google.com/spreadsheets/d/e/2PACX-1vSvlBUTo7Z4iFMHkH0cDGRsba99RlGiFjtGiLsO9MANiIIn_coI7xndvEht7LropZIHXA5SUde0hQo2/pub?output=csv', {
    download: true,
    header: true,
    complete: function(results) {
        const cleanData = processData(results.data);
        renderCards(cleanData);
    }
});
