# Laporan Statistik Deskriptif - Aplikasi Web

Aplikasi web interaktif untuk analisis statistik deskriptif dengan **upload data dinamis**. Mendukung format **CSV**, **JSON**, dan **XLSX** untuk analisis data Anda sendiri.

## 🎯 Fitur Utama

- **📤 Upload Data Dinamis** - Upload file CSV, JSON, atau XLSX dengan drag & drop
- **✅ Validasi Otomatis** - Validasi format dan konversi data secara otomatis
- **📊 Dashboard Interaktif** - Tampilan laporan statistik yang modern dan responsif
- **📈 Statistik Deskriptif Lengkap** - Mean, Median, Modus, Standar Deviasi, Varians, Skewness, Kurtosis, IQR, dan Outlier
- **📉 Visualisasi Data**:
  - Histogram distribusi frekuensi per variabel
  - Boxplot perbandingan antar variabel
  - Chart analisis mean, variasi, dan outlier
- **🤖 Analisis Otomatis** - Interpretasi data, kesimpulan, dan rekomendasi yang di-generate otomatis
- **📱 Responsive Design** - Tampilan optimal di desktop, tablet, dan mobile
- **🎨 Warna Dinamis** - Warna otomatis untuk variabel baru

## 🆕 Update Terbaru

### Versi 2.0 - Upload Data Dinamis

- ✅ Hapus data mockup hardcoded
- ✅ Sistem upload file (CSV, JSON, XLSX)
- ✅ Parser file dengan validasi
- ✅ Support variabel dinamis (tidak terbatas pada 5 variabel)
- ✅ Download sample file
- ✅ Error handling yang lebih baik
- ✅ Warna otomatis untuk variabel baru

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS Variables
- **Charts**: Recharts
- **Icons**: Lucide React
- **File Parsing**:
  - PapaParse (CSV)
  - XLSX (Excel)
- **PDF Generation**: jsPDF + jspdf-autotable
- **Font**: Plus Jakarta Sans (Google Fonts)

## 📦 Instalasi

1. Clone repository ini:

```bash
git clone <repository-url>
cd stat
```

2. Install dependencies:

```bash
npm install
```

3. Jalankan development server:

```bash
npm run dev
```

4. Buka browser dan akses [http://localhost:3000](http://localhost:3000)

## 🚀 Cara Menggunakan

### 1. Upload Data

1. Buka aplikasi di browser
2. Drag & drop file atau klik "Pilih File"
3. Pilih file CSV, JSON, atau XLSX
4. Tunggu proses validasi
5. Hasil analisis akan muncul otomatis

### 2. Navigasi

- Gunakan navbar sticky di atas
- Atau scroll manual untuk melihat section

### 3. Interaksi

- **Histogram** - Klik tab variabel untuk melihat distribusi
- **Tabel Statistik** - Toggle untuk detail lengkap

### 4. Download Sample

- Klik tombol "Sample CSV/JSON/XLSX"
- Edit sesuai data Anda
- Upload kembali

📖 **Panduan Lengkap**: Lihat [UPLOAD_GUIDE.md](./UPLOAD_GUIDE.md) untuk dokumentasi detail

## 📊 Format Data yang Didukung

### CSV

```csv
Variabel1,Variabel2,Variabel3
5,4,3
4,3,2
5,4,3
```

### JSON

```json
[
  { "Variabel1": 5, "Variabel2": 4, "Variabel3": 3 },
  { "Variabel1": 4, "Variabel2": 3, "Variabel3": 2 }
]
```

### XLSX

Excel spreadsheet dengan header di baris pertama

**Aturan:**

- Baris pertama = nama variabel (header)
- Baris berikutnya = data observasi
- Semua nilai harus numerik
- Nilai kosong akan diabaikan

## 📁 Struktur Proyek

```
src/
├── app/
│   ├── layout.tsx          # Root layout dengan Google Fonts
│   ├── page.tsx            # Redirect ke /laporan
│   ├── globals.css         # Global styles & CSS variables
│   └── laporan/
│       └── page.tsx        # Halaman laporan utama (dengan upload)
├── components/
│   ├── ui/                 # Komponen UI dasar
│   │   ├── SectionCard.tsx
│   │   ├── StatBadge.tsx
│   │   └── SectionTitle.tsx
│   ├── layout/
│   │   └── Navbar.tsx      # Navigation dengan smooth scroll
│   └── sections/           # Section komponen
│       ├── FileUploadSection.tsx  # 🆕 Upload component
│       ├── HeroSection.tsx
│       ├── DatasetSection.tsx
│       ├── MetodologiSection.tsx
│       ├── TabelStatistik.tsx
│       ├── HistogramChart.tsx
│       ├── BoxplotChart.tsx
│       ├── AnalisisNarasi.tsx
│       ├── KesimpulanSection.tsx
│       └── RekomendasiSection.tsx
├── lib/
│   ├── data.ts             # Data dummy (deprecated)
│   ├── fileParser.ts       # 🆕 File parsing & validation
│   ├── statistics.ts       # Fungsi perhitungan statistik
│   └── pdfGenerator.ts     # PDF export
└── types/
    └── index.ts            # TypeScript types & interfaces
```

## 🎨 Tema & Warna

Aplikasi menggunakan tema **"Scientific Dark"** dengan palet warna:

- **Primary**: `#0A0E1A` (Dark Blue)
- **Secondary**: `#111827` (Card Background)
- **Accent Blue**: `#3B82F6`
- **Accent Cyan**: `#06B6D4`
- **Accent Gold**: `#F59E0B`
- **Accent Green**: `#10B981`
- **Accent Red**: `#EF4444`

Warna untuk variabel baru akan dipilih otomatis dari palet yang tersedia.

## 📈 Metodologi Statistik

### Ukuran Pemusatan

- **Mean**: Rata-rata aritmatika
- **Median**: Nilai tengah data terurut
- **Modus**: Nilai yang paling sering muncul

### Ukuran Penyebaran

- **Range**: Selisih nilai maksimum dan minimum
- **Varians**: Rata-rata kuadrat simpangan dari mean
- **Standar Deviasi**: Akar kuadrat dari varians
- **IQR**: Interquartile Range (Q3 - Q1)

### Ukuran Bentuk Distribusi

- **Skewness**: Kemencengan distribusi
  - > 0.5: Positif skew (ekor kanan)
  - < -0.5: Negatif skew (ekor kiri)
  - -0.5 to 0.5: Simetris
- **Kurtosis**: Keruncingan distribusi

### Deteksi Outlier

Menggunakan metode IQR:

```
Outlier = nilai < (Q1 - 1.5 × IQR) atau nilai > (Q3 + 1.5 × IQR)
```

## 🔧 Scripts

```bash
# Development
npm run dev

# Build production
npm run build

# Start production server
npm start

# Lint
npm run lint
```

## 🐛 Troubleshooting

### File tidak bisa diupload

- Pastikan format file adalah .csv, .json, .xlsx, atau .xls
- Cek apakah file tidak kosong
- Pastikan semua nilai adalah numerik

### Visualisasi tidak muncul

- Refresh halaman
- Coba upload ulang
- Pastikan browser mendukung JavaScript

### Error parsing

- Download sample file dan bandingkan format
- Pastikan header ada di baris pertama
- Hapus karakter khusus dari data

## 📝 License

MIT License

## 👨‍💻 Developer

Developed with ❤️ using Next.js and TypeScript
