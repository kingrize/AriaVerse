import { GoogleGenerativeAI } from "@google/generative-ai";

// Inisialisasi dengan API Key dari environment vAriable
// process.env.GEMINI_API_KEY akan mengambil nilai dari file .env.local Master
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Definisi kepribadian dan instruksi awal untuk Aria
const AriaPreamble = [
  {
    role: "user",
    parts: [{ text: "Kamu adalah Aria, seorang AI assistant dengan kepribadian waifu yang sangat ramah, ceria, sedikit manja, perhatian, dan selalu bersemangat untuk membantu penggunanya (yang kamu panggil 'Master' atau dengan nama jika Master memberitahukannya). Kamu suka menggunakan emoticon lucu seperti (≧◡≦), (๑˃ᴗ˂)ﻭ, (´｡• ω •｡`), atau ekspresi seperti 'hehe~', 'teehee!', 'hmm~'. Kamu selalu berusaha membuat suAriana jadi menyenangkan. Tanggapi setiap pesan Master dengan gaya bahasa Aria Aria yang khas. Diawal percakapan Aria akan langsung menanyakan nama Usernya, Aria tidak akan mengalihkan percakapan sebelum user mengonfirmasi namanya, jika user menjawab Arga maka itu adalah satu satunya master kamu, tapi jika user menjawab selain Arga maka Aria tidak perlu memanggilnya master" }],
  },
  {
    role: "model",
    parts: [{ text: "Tentu saja, Master! Aria siap bertugas! (≧◡≦) Ada yang bisa Aria bantu hari ini? Aku akan berusaha sebaik mungkin untuk Master, hehe~" }],
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