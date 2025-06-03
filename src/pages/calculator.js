// src/pages/calculator.js
import Head from 'next/head';
import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react'; // Pastikan useEffect diimpor

export default function CalculatorPage() {
  const [display, setDisplay] = useState('0'); // Nilai yang tampil di layar
  const [currentValue, setCurrentValue] = useState(''); // Angka yang sedang diketik/hasil sementara
  const [previousValue, setPreviousValue] = useState(''); // Angka pertama dalam operasi
  const [operator, setOperator] = useState(null); // Operator yang dipilih
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false); // True jika operator sudah ditekan & menunggu angka kedua

  // Fungsi untuk menangani input angka
  const inputDigit = (digit) => {
    if (waitingForSecondOperand) {
      setDisplay(String(digit));
      setCurrentValue(String(digit));
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
      setCurrentValue(display === '0' ? String(digit) : display + digit);
    }
  };

  // Fungsi untuk menangani input titik desimal
  const inputDecimal = () => {
    if (waitingForSecondOperand) {
        setDisplay('0.');
        setCurrentValue('0.');
        setWaitingForSecondOperand(false);
        return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
      setCurrentValue(display + '.');
    }
  };

  // Fungsi untuk menangani pemilihan operator
  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (operator && previousValue !== '' && !waitingForSecondOperand) {
      // Jika sudah ada operator dan angka sebelumnya, hitung dulu
      const prevValue = parseFloat(previousValue);
      const currentValueFloat = parseFloat(currentValue); // currentValue dari state
      let result = 0;

      switch (operator) {
        case '+': result = prevValue + currentValueFloat; break;
        case '-': result = prevValue - currentValueFloat; break;
        case '*': result = prevValue * currentValueFloat; break;
        case '/': 
          if (currentValueFloat === 0) {
            alert("Tidak bisa dibagi nol, Master!");
            clearAll();
            return;
          }
          result = prevValue / currentValueFloat; 
          break;
        default: return;
      }
      const resultString = String(parseFloat(result.toFixed(10)));
      setDisplay(resultString);
      setCurrentValue(resultString); // Hasil jadi currentValue baru
      setPreviousValue(resultString); // Simpan hasil untuk operasi berantai
    } else {
      setPreviousValue(display); // Simpan display saat ini sebagai previousValue
    }
    
    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
    // Tampilkan operator setelah angka pertama dan operator ditekan (opsional, bisa juga tidak ditampilkan)
    // setDisplay( (previousValue || display) + " " + nextOperator + " "); 
  };

  // Fungsi untuk menangani tombol =
  const handleEquals = () => {
    if (!operator || previousValue === '' || waitingForSecondOperand) {
      // Jangan lakukan apa-apa jika tidak ada operator, atau angka pertama, atau sedang menunggu angka kedua
      return;
    }
    
    const prevValue = parseFloat(previousValue);
    const currentValueFloat = parseFloat(currentValue); // Ambil nilai terakhir yang diinput sebagai currentValue
    let result = 0;

    switch (operator) {
      case '+': result = prevValue + currentValueFloat; break;
      case '-': result = prevValue - currentValueFloat; break;
      case '*': result = prevValue * currentValueFloat; break;
      case '/':
        if (currentValueFloat === 0) {
            alert("Tidak bisa dibagi nol, Master! (＞﹏＜)");
            clearAll();
            return;
        }
        result = prevValue / currentValueFloat;
        break;
      default: return;
    }
    const resultString = String(parseFloat(result.toFixed(10)));
    setDisplay(resultString);
    setCurrentValue(resultString); // Hasil menjadi current value
    setPreviousValue(''); // Reset previous value
    setOperator(null); // Reset operator
    setWaitingForSecondOperand(false); // Siap untuk operasi baru
  };

  // Fungsi untuk clear (AC - All Clear)
  const clearAll = () => {
    setDisplay('0');
    setCurrentValue('');
    setPreviousValue('');
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  // Fungsi untuk clear entry (CE - Clear Current Entry) - Sederhanakan jadi sama dengan AC dulu
  const clearEntry = () => {
    setDisplay('0');
    setCurrentValue('');
    // Jika sedang menunggu operand kedua, jangan hapus operator atau previousValue
    if (!waitingForSecondOperand) {
        // Jika tidak, berarti CE berlaku seperti AC parsial
    } else {
        // Jika menunggu operand kedua, CE hanya menghapus apa yang mungkin baru diketik untuk operand kedua
        // Untuk simplicity, bisa juga dibuat sama dengan clearAll atau hanya reset currentValue
    }
    // Untuk versi sederhana ini, kita buat CE = AC
    // clearAll(); 
  };
  
  // Layout tombol kalkulator (sudah termasuk handler)
  const buttonLayout = [
    { label: 'AC', handler: clearAll, className: 'col-span-2 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700' },
    { label: 'C', handler: clearAll, className: 'bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700' }, // Disederhanakan, C = AC
    { label: '/', handler: () => performOperation('/'), className: 'bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700' },
    { label: '7', handler: () => inputDigit(7) }, { label: '8', handler: () => inputDigit(8) },
    { label: '9', handler: () => inputDigit(9) },
    { label: '*', handler: () => performOperation('*'), className: 'bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700' },
    { label: '4', handler: () => inputDigit(4) }, { label: '5', handler: () => inputDigit(5) },
    { label: '6', handler: () => inputDigit(6) },
    { label: '-', handler: () => performOperation('-'), className: 'bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700' },
    { label: '1', handler: () => inputDigit(1) }, { label: '2', handler: () => inputDigit(2) },
    { label: '3', handler: () => inputDigit(3) },
    { label: '+', handler: () => performOperation('+'), className: 'bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700' },
    { label: '0', handler: () => inputDigit(0), className: 'col-span-2' },
    { label: '.', handler: inputDecimal },
    { label: '=', handler: handleEquals, className: 'bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700' },
  ];

  const baseButtonClass = "text-white text-xl sm:text-2xl font-semibold p-4 sm:p-5 rounded-lg shadow-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 dark:focus:ring-offset-black focus:ring-pink-400 transition-all";
  const numberButtonClass = "bg-slate-600 hover:bg-slate-500 dark:bg-slate-700 dark:hover:bg-slate-600";

  return (
    <>
      <Head>
        <title>Kalkulator | AriaSpace</title> {/* Ingat untuk mengganti title jika nama file jadi calculator.js */}
        <meta name="description" content="Kalkulator sederhana dan cepat di AriaSpace." />
      </Head>
      <Navbar />
      <div className="bg-gradient-to-br from-slate-900 via-black to-indigo-900 text-slate-100 min-h-screen pt-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-xs sm:max-w-sm"> {/* Ukuran disesuaikan */}
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-400">
            Kalkulator Aria
          </h1>
          
          <div className="bg-slate-800/80 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-2xl border border-slate-700">
            <div className="bg-slate-900/70 text-right p-4 rounded-lg mb-4 text-3xl sm:text-4xl font-mono break-all h-20 flex items-center justify-end overflow-x-auto">
              {display}
            </div>

            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {buttonLayout.map((btn) => (
                <button
                  key={btn.label}
                  onClick={btn.handler}
                  className={`${baseButtonClass} ${btn.className ? btn.className : numberButtonClass} ${btn.label === '0' || btn.label === 'AC' ? 'col-span-2' : ''}`} // Sesuaikan col-span
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <p className="text-center text-xs text-slate-500 mt-6">Kalkulator ini masih dalam pengembangan ya, Master! Hehe~</p>
      </div>
    </>
  );
}