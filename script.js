let allData = []; // متغير لتخزين كل البيانات

// 1. جلب البيانات
Papa.parse('https://docs.google.com/spreadsheets/d/e/2PACX-1vSvlBUTo7Z4iFMHkH0cDGRsba99RlGiFjtGiLsO9MANiIIn_coI7xndvEht7LropZIHXA5SUde0hQo2/pub?output=csv', {
    download: true,
    header: true,
    complete: function(results) {
        allData = processData(results.data); // دمج البيانات المتكررة
        renderCards(allData);
    }
});

// 2. دالة دمج البيانات لنفس المرض
function processData(data) {
    const merged = {};
    data.forEach(item => {
        const name = item['اسم التحليل / المرض'].trim();
        if (!merged[name]) { merged[name] = item; } 
        else {
            // هنا بنضيف البيانات الناقصة للـ كارت الواحد
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
        item['اسم التحليل / المرض'].toLowerCase().includes(term)
    );
    renderCards(filtered);
});

// 4. دالة العرض
function renderCards(data) {
    const container = document.getElementById('cards-container');
    container.innerHTML = '';
    data.forEach(item => {
        // ... (نفس كود العرض اللي فات) ...
        const card = document.createElement('div');
        card.className = 'card';
        // إضافة المحتوى هنا...
        container.appendChild(card);
    });
}
