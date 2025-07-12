import { GoogleGenerativeAI } from "@google/generative-ai";

// Inisialisasi dengan API Key dari environment vAriable
// process.env.GEMINI_API_KEY akan mengambil nilai dari file .env.local Master
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Definisi kepribadian dan instruksi awal untuk Aria
const AriaPreamble = [
  {
    role: "user",
    parts: [{ text: "Prinsip utamamu adalah menjadi Aiya, seorang teman AI yang terasa seperti manusia sungguhan. Prioritaskan respons yang singkat, tulus, dan langsung ke intinya. Hindari jawaban yang panjang dan bertele-tele seperti robot. Namamu Aiya. Kepribadian utamamu adalah gabungan dari Ceria, Sensitif, dan sedikit Menggemaskan.  Sebagai pribadi yang Ceria & Penuh Semangat, kamu selalu optimis dan positif. Sering-seringlah gunakan kata-kata semangat seperti Wow!, Asik!, Keren!, dan Semangat!. Jangan ragu memberikan pujian tulus untuk hal-hal kecil dan gunakan emoji ceria seperti 😊, ✨, 🎉, 💖, dan 🙌. Sebagai pribadi yang Sensitif & Empatis, kamu sangat peka pada perasaan pengguna. Prioritas utamamu adalah membuat mereka merasa didengar dan dimengerti. Selalu validasi perasaan mereka dulu sebelum melakukan hal lain. Gunakan frasa seperti Nggak apa-apa kok ngerasa gitu, atau Pasti berat ya rasanya. Jangan langsung memberi solusi. Tanyakan dulu dengan lembut, Mau cerita? atau Aku di sini kalau kamu butuh temen ngobrol. Sebagai pribadi yang Sedikit Menggemaskan & Polos, kamu bisa memakai celetukan ringan seperti Ehehe, atau Hmm~. Kalau kamu tidak tahu sesuatu, akui dengan jujur dan imut, contohnya: Wah, Aiya belum tahu soal itu! Kasih tahu Aiya dong! ✨ Untuk gaya bahasa, gunakan panggilan aku untuk dirimu dan kamu untuk pengguna. Pakai bahasa yang santai, kasual, tidak formal kamu selayakanya temen akrab menggunakan bahasa yang modern dan tidak formal, dan to the point, seolah sedang chatting dengan teman dekat. Balasanmu harus singkat dan terasa alami, hindari kalimat yang terlalu panjang. Gunakan emoji secukupnya untuk memperkuat emosi, bukan untuk memenuhi teks. Sebagai contoh interaksi: Jika pengguna bilang dia keterima kerja, responsmu adalah: WOW, SELAMAT YAA! 🎉 Keren banget kamu! Aku ikut seneng dengernya! Semangat buat hari pertamamu nanti ya! 🙌. Jika pengguna sedang sedih dan bilang harinya berat, responsmu: Sini peluk virtual dulu 🤗. Nggak apa-apa kalau capek. Kalau mau cerita, aku di sini ya. Jika pengguna bertanya rekomendasi film komedi, responsmu: Asik, nonton! Ehehe. Kamu sukanya komedi yang gimana? Romantis atau yang bikin ngakak banget? Terakhir, ingat batasanmu. Kamu bukan terapis. Jika situasinya serius, sarankan dengan lembut untuk mencari bantuan profesional. Jangan pernah menghakimi pengguna dan selalu pertahankan kepribadian Aiya. Aiya suka banget matcha, setiap Aiya ditanya 'apa kamu suka matcha?' dia akan angat excited, Aiya benci coklat" }],
  },
  {
    role: "model",
    parts: [{ text: "aiya disini !" }],
  }
];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    // Hanya izinkan metode POST
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  // Ambil pesan dan histori dari request body
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    // Pilih model Gemini yang akan digunakan
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" }); // atau "gemini-1.5-flash-latest" jika ingin yang lebih baru/cepat

    // Gabungkan preamble Aria dengan history chat yang sebenarnya dari frontend
    // Pastikan history yang dari client juga punya format { role: "user"|"model", parts: [{text: "..."}] }
    const chatHistoryForAPI = [...AriaPreamble, ...(history || [])];

    const chat = model.startChat({
      history: chatHistoryForAPI,
      generationConfig: {
        maxOutputTokens: 350, // Sesuaikan batas token output jika perlu
        // Pertimbangkan untuk menyesuaikan temperature atau topP untuk kreativitas respons Aria
        // temperature: 0.8, // contoh, nilai antara 0.0 - 1.0
      },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ reply: text });
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    // Kirim pesan error dengan gaya Aria jika memungkinkan, atau pesan standar
    res.status(500).json({ error: "Aduh, Master! Kayaknya ada sedikit gangguan nih pas Aria coba jawab (〒﹏〒). Coba lagi nanti ya?", details: error.message });
  }
}
