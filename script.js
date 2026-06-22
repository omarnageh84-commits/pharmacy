let allData = [];

// 1. جلب البيانات من الشيت
Papa.parse('https://docs.google.com/spreadsheets/d/e/2PACX-1vSvlBUTo7Z4iFMHkH0cDGRsba99RlGiFjtGiLsO9MANiIIn_coI7xndvEht7LropZIHXA5SUde0hQo2/pub?output=csv', {
    download: true,
    header: true,
    complete: function(results) {
        // دمج البيانات المتكررة في كارت واحد
        allData = mergeData(results.data);
        renderCards(allData);
    }
});

// 2. دمج البيانات (الصدفية في سطر واحد بدل 5 سطور)
function mergeData(data) {
    const merged = {};
    data.forEach(item => {
        const name = item['اسم التحليل / المرض'] ? item['اسم التحليل / المرض'].trim() : 'غير معروف';
        if (!merged[name]) {
            merged[name] = { ...item };
        } else {
            for (let key in item) {
                if (item[key] && !merged[name][key]) merged[name][key] = item[key];
            }
        }
    });
    return Object.values(merged);
}

// 3. البحث الذكي
document.getElementById('search-input').addEventListener('input', function(e) {
    const term = e.target.value.toLowerCase();
    const filtered = allData.filter(item => 
        item['اسم التحليل / المرض'] && item['اسم التحليل / المرض'].toLowerCase().includes(term)
    );
    renderCards(filtered);
});

// 4. عرض الكروت
function renderCards(data) {
    const container = document.getElementById('cards-container');
    container.innerHTML = '';
    
    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        
        // التحقق مما إذا كان تحليل أو مرض
        const isAnalysis = !item['التحليل المناسب'] || item['التحليل المناسب'].trim() === "";

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

        if (item['رابط الصور']) {
            html += `<img src="${item['رابط الصور']}" style="max-width:100px; display:block; margin:10px auto;">`;
        }

        card.innerHTML = html;
        container.appendChild(card);
    });
}
