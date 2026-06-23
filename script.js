complete: function(results) {
    const container = document.getElementById('cards-container');
    container.innerHTML = ''; 

    // 1. استخدام Map لتجميع البيانات، الـ Map يضمن عدم تكرار المفاتيح (أسماء الأمراض)
    const grouped = new Map();

    results.data.forEach(row => {
        // توحيد اسم المرض لتجنب مشاكل المسافات والأحرف غير المرئية
        const name = row['اسم التحليل / المرض']?.trim();
        if (!name) return;

        if (!grouped.has(name)) {
            // إضافة المرض لأول مرة
            grouped.set(name, { ...row });
        } else {
            // إذا كان موجوداً، نقوم بدمج البيانات المفقودة فقط
            const existing = grouped.get(name);
            for (let key in row) {
                if (row[key] && row[key].trim() !== "" && (!existing[key] || existing[key].trim() === "")) {
                    existing[key] = row[key].trim();
                }
            }
        }
    });

    // 2. العرض: التحويل من Map إلى Array ثم الطباعة
    grouped.forEach((item) => {
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
