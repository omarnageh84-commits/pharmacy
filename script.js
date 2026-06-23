// التعديل جوه دالة renderCards
data.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    
    // هنا الشرط الذكي:
    const isDisease = item['الحالة'] && item['الحالة'].trim().toLowerCase() === 'مرض';

    let html = `<h2>${item['اسم التحليل / المرض']}</h2>`;
    
    if (isDisease) {
        // لو الحالة "مرض":
        html += `<p><strong>التعريف:</strong> ${item['ماهو'] || ''}</p>
                 <p><strong>العلاج:</strong> ${item['العلاج الصيدلي والطبيعي'] || ''}</p>`;
    } else {
        // لو الحالة "تحليل":
        html += `<p><strong>الطبيعي:</strong> ${item['الطبيعي'] || ''}</p>
                 <p><strong>العالي:</strong> ${item['العالي'] || ''}</p>
                 <p><strong>الوطي:</strong> ${item['الوطي'] || ''}</p>`;
    }
    
    card.innerHTML = html;
    container.appendChild(card);
});
