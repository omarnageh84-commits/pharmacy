Papa.parse(sheetUrl, {
    download: true,
    header: false, // مش هنعتمد على العناوين عشان نتجنب "الهبل"
    complete: function(results) {
        const container = document.getElementById('cards-container');
        container.innerHTML = '';
        
        const grouped = {};
        let lastKnownName = "";

        // نبدأ من 1 عشان نتخطى صف العناوين
        for (let i = 1; i < results.data.length; i++) {
            let row = results.data[i];
            
            // ترتيب الأعمدة اللي إنت حددتها:
            // 0:المرض | 1:الحالة | 2:ماهو | 3:التحليل | 4:العلاج | 5:معدي | 6:الطبيعي | 7:العالي | 8:الوطي | 9:الرابط
            let currentName = row[0]?.trim();

            if (currentName && currentName !== "") {
                lastKnownName = currentName;
            } else {
                currentName = lastKnownName;
            }

            if (!currentName || currentName === "") continue;

            if (!grouped[currentName]) {
                grouped[currentName] = { name: currentName, data: row };
            } else {
                // دمج البيانات لو لقيت صف مكمل لنفس المرض
