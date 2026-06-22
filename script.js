let allData = []; // متغير لتخزين البيانات

// 1. جلب البيانات من اللينك اللي بعته
Papa.parse('https://docs.google.com/spreadsheets/d/e/2PACX-1vSvlBUTo7Z4iFMHkH0cDGRsba99RlGiFjtGiLsO9MANiIIn_coI7xndvEht7LropZIHXA5SUde0hQo2/pub?output=csv', {
    download: true,
    header: true,
    complete: function(results) {
        // بننظف البيانات ونجمعها
        allData = processData(results.data);
        renderCards(allData);
    }
});

// 2. دالة دمج البيانات لنفس المرض (عشان ميبقاش فيه كروت مكررة)
function processData(data) {
    const merged = {};
    data.forEach(item => {
        // trim() عشان نتخلص من أي مسافات زائدة في أسماء الأعمدة
        const name = item['اسم التحليل / المرض'] ? item['اسم التحليل / المرض'].trim() : 'غير معروف';
        
        if (!merged[name]) { 
            merged[name] = { ...item }; 
        } else {
            // بنضم البيانات لبعضها لو نفس الاسم متكرر
            for(let key in item) {
                if (item[key] && !merged[name][key]) merged[name][key] = item[key];
            }
        }
    });
    return Object.values(merged);
}

// 3. تشغيل البحث
document.getElementById('search-input').addEventListener('input', function(e) {
    const term = e.target.value.toLowerCase();
    const filtered = allData.filter(item => 
        item['اسم التحليل / المرض'] && item['اسم التحليل / المرض'].toLowerCase().includes(term)
    );
    renderCards(filtered);
});

// 4. دالة العرض المحدثة
function renderCards(data) {
    const container = document.getElementById('cards-container');
    container.innerHTML = '';
    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        
        // التحقق من نوع البيانات (تحليل ولا مرض)
        const isAnalysis = !item['التحليل المناسب'] || item['التحليل المناسب'].trim() === "";

        let htmlContent = `<h2>${item['اسم التحليل / المرض'] || ''}</h2>`;
        
        if (isAnalysis) {
            htmlContent += `
                <p><strong>العلاج:</strong> ${item['العلاج الصيدلي والطبيعي'] || ''}</p>
                <p><strong>معدي:</strong> ${item['معدي'] || ''}</p>
                <p><strong>الطبيعي:</strong> ${item['الطبيعي'] || ''}</p>
                <p><strong>العالي:</strong> ${item['العالي'] || ''}</p>
                <p><strong>الوطي:</strong> ${item['الوطي'] || ''}</p>
            `;
        } else {
            htmlContent += `
                <p><strong>ماهو:</strong> ${item['ماهو'] || ''}</p>
                <p><strong>التحليل المناسب:</strong> ${item['التحليل المناسب'] || ''}</p>
                <p><strong>العلاج:</strong> ${item['العلاج الصيدلي والطبيعي'] || ''}</p>
                <p><strong>معدي:</strong> ${item['معدي'] || ''}</p>
            `;
        }

        if (item['رابط الصور']) {
            htmlContent += `<img src="${item['رابط الصور']}" alt="صورة المرض" style="width:100px; display:block; margin:10px auto;">`;
        }

        card.innerHTML = htmlContent;
        container.appendChild(card);
    });
}
