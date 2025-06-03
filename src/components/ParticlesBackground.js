// src/components/ParticlesBackground.js
import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles'; // Engine untuk memuat semua fitur

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    // Inisialisasi tsParticles engine (memuat bundle tsparticles)
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    // console.log('Particles container loaded', container);
  }, []);

  // Opsi partikel bisa diambil inspirasi dari particlesjs-config.json Sky Clock
  // atau kita buat yang sederhana dulu yang cocok dengan tema gelap kita
  const particleOptions = {
    background: {
      color: {
        value: 'transparent', // Latar belakang partikel transparan agar gradien utama terlihat
      },
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: 'push',
        },
        onHover: {
          enable: true,
          mode: 'repulse',
        },
        resize: true,
      },
      modes: {
        push: {
          quantity: 2,
        },
        repulse: {
          distance: 100,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: '#ffffff', // Warna partikel putih
      },
      links: {
        color: '#ffffff',
        distance: 150,
        enable: false, // Kita matikan garis antar partikel agar tidak terlalu ramai
        opacity: 0.2,
        width: 1,
      },
      collisions: {
        enable: false,
      },
      move: {
        direction: 'none',
        enable: true,
        outModes: {
          default: 'bounce', // Partikel akan memantul di tepi layar
        },
        random: true,
        speed: 0.5, // Kecepatan gerak partikel
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 30, // Jumlah partikel, jangan terlalu banyak
      },
      opacity: {
        value: { min: 0.1, max: 0.4 }, // Opasitas acak
        animation: {
          enable: true,
          speed: 1,
          minimumValue: 0.05,
        }
      },
      shape: {
        type: 'circle', // Bentuk partikel (bisa juga 'star', 'polygon', atau gambar)
      },
      size: {
        value: { min: 1, max: 3 }, // Ukuran partikel acak
        animation: {
            enable: true,
            speed: 2,
            minimumValue: 0.3,
            sync: false
        }
      },
    },
    detectRetina: true,
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={particleOptions}
      className="fixed top-0 left-0 w-full h-full z-[-1]" // Membuat partikel sebagai background
    />
  );
};

export default ParticlesBackground;