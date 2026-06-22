const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSvlBUTo7Z4iFMHkH0cDGRsba99RlGiFjtGiLsO9MANiIIn_coI7xndvEht7LropZIHXA5SUde0hQo2/pub?output=csv';

// تشغيل الـ PapaParse فوراً
Papa.parse(sheetUrl, {
    download: true,
    header: true,
    complete: function(results) {
        console.log("البيانات اللي جت:", results.data); // عشان نشوف البيانات في الـ Console
        renderCards(results.data); 
    }
});

function renderCards(data) {
    const container = document.getElementById('cards-container');
    if (!container) return; // تأمين زيادة
    container.innerHTML = ''; 

    data.forEach(item => {
        // اتأكد إن اسم العمود هو نفسه اللي في الشيت بالظبط
        if (!item['اسم التحليل / المرض']) return; 

        const card = document.createElement('div');
        card.className = 'card';
        // ... باقي كود الـ render اللي كتبناه فوق ...
    });
}
