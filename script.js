// دمج ذكي بيجمع النصوص مش بس بياخد أول سطر
function mergeData(data) {
    const merged = {};
    data.forEach(item => {
        const name = item['اسم التحليل / المرض'] ? item['اسم التحليل / المرض'].trim() : 'غير معروف';
        if (!merged[name]) {
            merged[name] = { ...item };
        } else {
            for (let key in item) {
                // هنا بنجمع النصوص بدل ما نستبدلها
                if (item[key] && item[key].trim() !== "") {
                    if (merged[name][key] && merged[name][key] !== item[key]) {
                        merged[name][key] += " " + item[key];
                    } else {
                        merged[name][key] = item[key];
                    }
                }
            }
        }
    });
    return Object.values(merged);
}

// عرض الكروت المحدث
function renderCards(data) {
    const container = document.getElementById('cards-container');
    container.innerHTML = '';
    
    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        
        // التحقق: هل ده تحليل؟ (لو خانة "ماهو" فاضية)
        const isAnalysis = !item['ماهو'] || item['ماهو'].trim() === "";

        let html = `<h2>${item['اسم التحليل / المرض'] || ''}</h2>`;
        
        if (isAnalysis) {
            html += `<p><strong>ماهو:</strong> ${item['ماهو'] || ''}</p>
                     <p><strong>العلاج:</strong> ${item['العلاج الصيدلي والطبيعي'] || ''}</p>
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
