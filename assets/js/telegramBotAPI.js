document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#monoblokModal form");

    if (!form) {
        console.error("Form topilmadi!");
        return;
    }

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const name = document.querySelector("#exampleInputName").value.trim();
        const phoneInput = document.querySelector("#exampleInputNumber").value;
        const phone = phoneInput.replace(/\D/g, '');

        const message = `🖥 <b>Buyurtma qoldirildi</b>\n\n👤 Ismi: ${name}\n📞 Telefon: +998${phone}\n🛒 Mahsulot: Monoblok 24'' Flat (H510 D238)`;

        const telegramToken = "7581646932:AAHgIayJavDR4suo4JTrSilWtulBJzP0dlE";
        const chatId = "-1002682507907";

        const modalEl = document.getElementById('monoblokModal');
        const modal = bootstrap.Modal.getInstance(modalEl);

        try {
            const response = await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                    parse_mode: "HTML"
                })
            });

            console.log("Telegram API javobi:", response);

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Telegram API xatosi:", errorData);
                alert("❌ Buyurtma yuborilmadi. Xatolik: " + errorData.description);
                return;
            }

            const data = await response.json();
            if (data.ok) {
                alert("✅ Buyurtma muvaffaqiyatli yuborildi!");
                form.reset();
            } else {
                console.error("Telegram API javobi:", data);
                alert("❌ Buyurtma yuborilmadi. Sabab: " + data.description);
            }

        } catch (error) {
            console.error("Catch xatolik:", error);
            alert("❌ Tarmoq yoki server bilan bog‘liq muammo yuz berdi.");
        } finally {
            // Modalni yopish har doim amalga oshiriladi
            modal.hide();
        }
    });
});