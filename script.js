function processData(data) {
    const merged = {};
    
    data.forEach(item => {
        const name = item['اسم التحليل / المرض'] ? item['اسم التحليل / المرض'].trim() : null;
        if (!name) return;

        if (!merged[name]) {
            merged[name] = { ...item };
        } else {
            // التعديل هنا: دمج النصوص بدل تجاهلها
            for (let key in item) {
                if (item[key] && item[key].trim() !== "") {
                    // لو الخانة موجودة ومختلفة عن اللي متخزن، زودها عليه
                    if (merged[name][key] && !merged[name][key].includes(item[key])) {
                        merged[name][key] += " " + item[key];
                    } else if (!merged[name][key]) {
                        merged[name][key] = item[key];
                    }
                }
            }
        }
    });
    return Object.values(merged);
}
