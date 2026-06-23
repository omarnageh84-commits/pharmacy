// في جزء العرض (Object.values)، عدلنا الترتيب بناءً على أعمدتك:
Object.values(grouped).forEach(item => {
    let d = item.data; 
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <h2>${item.name}</h2>
        <p><strong>الحالة:</strong> ${d[1] || ''}</p>
        <p><strong>ماهو:</strong> ${d[2] || ''}</p>
        <p><strong>التحليل المناسب:</strong> ${d[3] || ''}</p>
        <p><strong>العلاج الصيدلي والطبيعي:</strong> ${d[4] || ''}</p>
        <p><strong>معدي:</strong> ${d[5] || ''}</p>
        <p><strong>الطبيعي:</strong> ${d[6] || ''}</p>
        <p><strong>العالي:</strong> ${d[7] || ''}</p>
        <p><strong>الوطي:</strong> ${d[8] || ''}</p>
        ${d[9] ? `<img src="${d[9]}" style="max-width:100%; border-radius:8px;">` : ''}
    `;
    container.appendChild(card);
});
