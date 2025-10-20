// Nonaktifkan klik kanan
document.addEventListener('contextmenu', e => e.preventDefault());

// Set year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu toggle
const hamb = document.getElementById('hamb');
const mobile = document.getElementById('mobileLinks');

hamb.addEventListener('click', () => mobile.classList.toggle('hide'));
document.querySelectorAll('#mobileLinks a').forEach(link => {
    link.addEventListener('click', () => mobile.classList.add('hide'));
});

// Active link on scroll
const sections = ['profile', 'education', 'skills', 'experience', 'projects', 'achievement', 'contact'];
const navLinks = [...document.querySelectorAll('#links a'), ...document.querySelectorAll('#mobileLinks a')];
const setActive = () => {
    let current = null;
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) current = id;
    });
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${current}`));
};
window.addEventListener('scroll', setActive);
setActive();

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
}, { threshold: .14 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Form contact me
async function submitForm(event) {
    event.preventDefault();
    const form = event.target;
    const status = document.getElementById("formStatus");
    status.innerHTML = "⏳ Sedang mengirim...";
    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
        });
        if (response.ok) {
            status.innerHTML = "✅ Pesan berhasil dikirim!";
            form.reset();
        } else {
            const data = await response.json();
            status.innerHTML = data.errors
                ? "❌ " + data.errors.map(e => e.message).join(", ")
                : "❌ Gagal mengirim pesan. Coba lagi.";
        }
    } catch {
        status.innerHTML = "⚠️ Terjadi kesalahan. Periksa koneksi internet.";
    }
}
// === Loading Screen Animation ===
window.addEventListener("load", () => {
    const loader = document.getElementById("loading-screen");
    setTimeout(() => {
        loader.classList.add("hidden");
    }, 2000); // tampil 2 detik
});
// Tombol "Read More"
document.querySelectorAll('.read-more-btn').forEach(button => {
    button.addEventListener('click', () => {
        const content = button.previousElementSibling;
        content.classList.toggle('show');
        if (content.classList.contains('show')) {
            content.style.display = 'block';
            button.textContent = 'Close';
        } else {
            content.style.display = 'none';
            button.textContent = 'Read More...';
        }
    });
});

// ✅ Spline 3D Background Header (versi aman)
import { Application } from "https://unpkg.com/@splinetool/runtime@1.3.1/build/runtime.js";
const canvas = document.getElementById("canvas3d");
const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
try {
    if (!isMobile) {
        // Untuk desktop (lebih kuat GPU)
        const app = new Application(canvas);
        app.load("https://prod.spline.design/ZmTlaVXSZTIQpqIa/scene.splinecode");
    } else {
        // Untuk mobile (ganti dengan gambar statis agar ringan)
        const img = document.createElement("img");
        img.src = "ASSETS/boxes-hover.gif";
        img.alt = "3D Preview";
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.objectFit = "cover";
        canvas.replaceWith(img);
    }
} catch (err) {
    console.error("Gagal memuat Spline:", err);
    const fallback = document.createElement("img");
    fallback.src = "ASSETS/boxes-hover.gif";
    fallback.alt = "3D Preview";
    fallback.style.width = "100%";
    fallback.style.height = "100%";
    fallback.style.objectFit = "cover";
    canvas.replaceWith(fallback);
}

// === Music Toggle Logic ===
const musicSwitch = document.getElementById("musicSwitch");
const bgMusic = document.getElementById("bgMusic");
const musicContainer = document.querySelector(".music-container");

bgMusic.volume = 0.6;

// Saat halaman dimuat
window.addEventListener("load", () => {
    // Pastikan switch dalam kondisi ON
    musicSwitch.checked = true;
    musicContainer.classList.remove("loading");

    // Coba nyalakan musik otomatis
    bgMusic.play().catch(() => {
        console.warn("Autoplay diblokir browser, musik akan nyala setelah interaksi user.");
    });
});

// Toggle manual
musicSwitch.addEventListener("change", () => {
    if (musicSwitch.checked) {
        bgMusic.play();
    } else {
        bgMusic.pause();
    }
});