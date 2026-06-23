function processData(data) {
    const merged = {};
    
    data.forEach(item => {
        // تنظيف اسم المرض/التحليل من المسافات الزائدة
        const name = item['اسم التحليل / المرض'] ? item['اسم التحليل / المرض'].trim() : null;
        if (!name) return; // تخطي الأسطر الفارغة

        if (!merged[name]) {
            // إذا كان هذا هو ظهور المرض الأول، نحفظه ككائن جديد
            merged[name] = { ...item };
        } else {
            // إذا كان المرض موجوداً بالفعل، نقوم بدمج البيانات
            for (let key in item) {
                // ندمج فقط إذا كانت الخانة تحتوي على بيانات جديدة ولم نضفها من قبل
                if (item[key] && item[key].trim() !== "") {
                    // إذا كانت القيمة موجودة مسبقاً وتختلف عن القيمة الحالية، نضيفها
                    if (merged[name][key] && merged[name][key].trim() !== item[key].trim()) {
                        // إضافة مسافة وفصل بين النصوص المدمجة
                        merged[name][key] += " " + item[key].trim();
                    } else if (!merged[name][key] || merged[name][key].trim() === "") {
                        // إذا كانت الخانة فارغة، نملأها
                        merged[name][key] = item[key].trim();
                    }
                }
            }
        }
    });
    return Object.values(merged);
}
