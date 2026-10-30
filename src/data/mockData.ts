import type { Post, ServiceItem, Inquiry, SiteConfig, UserProfile } from '../types';
import sample1 from '../assets/sample_image_1.jpeg';
import sample2 from '../assets/sample_image_2.jpeg';
import sample3 from '../assets/sample_image_3.jpeg';
import sample4 from '../assets/sample_image_4.jpeg';
import sample5 from '../assets/sample_image_5.jpg';
import sample6 from '../assets/sample_image_6.jpeg';
import sample7 from '../assets/sample_image_7.jpeg';
import sample8 from '../assets/sample_image_8.jpeg';

export const initialSiteConfig: SiteConfig = {
  site_name: "Yayasan Griya Mahir Al-Qur'an (GMQ)",
  tagline: "Membina Generasi Qur'ani yang Berkarakter, Mahir Membaca, Menghafal, dan Mengamalkan Al-Qur'an",
  description: "Portal Resmi Yayasan Griya Mahir Al-Qur'an (GMQ) - Lembaga pendidikan Al-Qur'an terpadu yang menaungi unit pendidikan formal dan non-formal dengan sanad keilmuan muttashil.",
  phone: '+62 21 8240 1234',
  email: 'sekretariat@griyamahirquran.or.id',
  address: 'Jl. Rawa Semut No. 88, Margahayu, Bekasi Timur, Kota Bekasi, Jawa Barat 17113',
  whatsapp: '+6281288990011',
  social_links: {
    linkedin: 'https://youtube.com/@griyamahirquran',
    instagram: 'https://instagram.com/griyamahirquran.official',
    facebook: 'https://facebook.com/griyamahirquran'
  }
};

export const mockUsers: UserProfile[] = [
  {
    id: 'usr-admin-1',
    email: 'admin@griyamahirquran.or.id',
    full_name: 'Ustadz Ahmad Fauzi, Lc., M.Ag. (Mudir Yayasan)',
    role: 'superadmin',
    avatar_url: sample2,
    created_at: '2026-01-10T08:00:00Z'
  },
  {
    id: 'usr-editor-1',
    email: 'humas@griyamahirquran.or.id',
    full_name: 'Ustadzah Nurul Hidayah, S.Pd.I. (Divisi Humas & Media)',
    role: 'editor',
    avatar_url: sample3,
    created_at: '2026-02-01T09:30:00Z'
  }
];

export const initialServices: ServiceItem[] = [
  {
    id: 'unit-1',
    title: "Kuttab Tahfidz Al-Qur'an GMQ (Pendidikan Formal Usia Dini/Dasar)",
    slug: 'kuttab-tahfidz-formal',
    category: 'Unit Formal',
    iconName: 'BookOpen',
    short_desc: "Pendidikan tingkat dasar (usia 5-12 tahun) yang memadukan pondasi keimanan, tahfidz Al-Qur'an target 7 juz, dan dasar adab islami.",
    full_desc: "Kuttab Al-Qur'an GMQ mengembalikan kejayaan peradaban Islam dengan mendahulukan adab sebelum ilmu dan iman sebelum Al-Qur'an. Dilengkapi kurikulum pendidikan formal terpadu yang diakui pemerintah.",
    features: [
      'Target Hafalan 5 - 7 Juz Mutqin bersanad',
      'Kurikulum Adab, Sirah Nabawiyyah, & Bahasa Arab Dasar',
      'Ijazah Formal Tingkat Dasar Terakreditasi',
      'Rasio Guru dan Santri Maksimal 1:12 untuk Talaqqi Optimal'
    ],
    image_url: sample1,
    video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'unit-2',
    title: "Ma'had Tahfidz Al-Qur'an Boarding School (Formal SMP/SMA)",
    slug: 'mahad-tahfidz-boarding',
    category: 'Unit Formal',
    iconName: 'Building',
    short_desc: "Pesantren tahfidz berasrama 30 juz putra & putri dengan ijazah formal nasional dan lingkungan berbahasa Arab aktif.",
    full_desc: "Ma'had Tahfidz GMQ memadukan kurikulum pesantren salafiyah dengan pendidikan formal modern. Santri dididik menjadi generasi hafidz yang berilmu mendalam, mandiri, dan berjiwa kepemimpinan.",
    features: [
      "Target 30 Juz Mutqin dalam 3 Tahun",
      "Sanad Al-Qur'an Riwayat Hafsh 'an 'Ashim",
      "Bahasa Arab & Inggris sebagai Pengantar Keseharian",
      "Persiapan Beasiswa Timur Tengah & Perguruan Tinggi Negeri"
    ],
    image_url: sample2,
    video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'unit-3',
    title: "Griya Tahsin & Talaqqi Al-Qur'an Dewasa / Eksekutif",
    slug: 'tahsin-talaqqi-dewasa',
    category: 'Unit Non-Formal',
    iconName: 'GraduationCap',
    short_desc: "Program bimbingan membaca Al-Qur'an dari dasar hingga tartil dan mahir bagi kalangan dewasa, profesional, dan lansia.",
    full_desc: "Tidak ada kata terlambat untuk membaguskan bacaan Kitabullah. Metode pengajaran dirancang sistematis, mudah dipahami, bebas rasa canggung, dengan pengajar asatidz bersertifikat sanad.",
    features: [
      "Bimbingan Makharijul Huruf & Sifatul Huruf Aplikatif",
      "Jadwal Fleksibel (Kelas Pagi, Malam, atau Weekend)",
      "Tersedia Kelas Tatap Muka & Online Interaktif",
      "Ujian Kenaikan Tingkat & Sertifikat Kemahiran Tajwid"
    ],
    image_url: sample3
  },
  {
    id: 'unit-4',
    title: "Rumah Tahfidz Balita & Anak (RTBA)",
    slug: 'rumah-tahfidz-anak',
    category: 'Unit Non-Formal',
    iconName: 'HeartHandshake',
    short_desc: "Metode stimulasi Qur'ani ceria untuk balita dan anak-anak agar mencintai Al-Qur'an sejak langkah pertama kehidupannya.",
    full_desc: "Menanamkan kecintaan pada kalam Ilahi dengan metode audio-visual gerak dan irama yang ramah anak. Melatih daya ingat dan konsentrasi anak melalui pendekatan Qur'anic fun learning.",
    features: [
      "Hafalan Juz 'Amma (Juz 30) dengan Irama Murottal Standar",
      "Pengenalan Huruf Hijaiyyah Melalui Media Ceria",
      "Penanaman Karakter Adab Sehari-hari & Doa Harian",
      "Konsultasi Parenting Qur'ani untuk Orang Tua"
    ],
    image_url: sample4
  },
  {
    id: 'unit-5',
    title: "Dauroh Al-Qur'an Bersanad & Sertifikasi Guru Al-Qur'an",
    slug: 'dauroh-sanad-sertifikasi-guru',
    category: 'Unit Non-Formal',
    iconName: 'Award',
    short_desc: "Program karantina tahfidz intensif serta pengambilan sanad Matan Tuhfatul Athfal dan Al-Jazariyyah bagi para asatidz.",
    full_desc: "Dauroh berkala untuk mencetak guru-guru Al-Qur'an yang kompeten secara keilmuan tajwid teoritis maupun tajwid terapan dengan mata rantai sanad tersambung hingga Rasulullah SAW.",
    features: [
      "Karantina Tahfidz Intensif Liburan Sekolah (Hafal 5-10 Juz)",
      "Pengambilan Ijazah Sanad Matan Tajwid Al-Jazariyyah",
      "Metodologi Pengajaran Al-Qur'an Standar GMQ",
      "Dukungan Penyaluran Guru Al-Qur'an ke Berbagai Lembaga"
    ],
    image_url: sample5
  }
];

export const initialPosts: Post[] = [
  {
    id: 'post-quran-1',
    title: "Penerimaan Santri Baru (PSB) Tahun Ajaran Baru Yayasan Griya Mahir Al-Qur'an Telah Dibuka",
    slug: 'penerimaan-santri-baru-psb-gmq',
    excerpt: "Daftarkan putra-putri tercinta di Kuttab dan Ma'had Tahfidz Boarding GMQ untuk membina generasi penghafal Al-Qur'an berakhlak mulia.",
    content: `Alhamdulillah, Yayasan Griya Mahir Al-Qur'an (GMQ) secara resmi membuka pendaftaran Santri Baru (PSB) untuk tahun ajaran baru.

### Jalur Pendaftaran yang Dibuka:
1. **Kuttab Tahfidz GMQ (Formal Tingkat Dasar)** - Usia 5 - 12 Tahun.
2. **Ma'had Tahfidz Boarding Putra & Putri (Formal Tingkat SMP & SMA)** - Berasrama penuh dengan target 30 Juz.
3. **Kelas Tahsin & Rumah Tahfidz Sore (Non-Formal)**.

### Keunggulan Pendidikan di GMQ:
- Bimbingan langsung dari dewan asatidz penghafal 30 juz bersanad.
- Kurikulum memadukan pembentukan adab, kemahiran tahfidz, dan keunggulan akademik formal.
- Lingkungan asri, islami, dan kondusif untuk muraja'ah harian.

Untuk informasi persyaratan pendaftaran, jadwal tes seleksi, dan biaya infaq pendidikan, bapak/ibu dapat mengunduh brosur digital atau menghubungi panitia PSB via nomor sekretariat yayasan.`,
    category: 'Agenda & PSB',
    author: 'Panitia PSB GMQ',
    featured_image: sample6,
    status: 'published',
    views_count: 842,
    created_at: '2026-03-20T08:00:00Z',
    published_at: '2026-03-20T08:00:00Z'
  },
  {
    id: 'post-quran-2',
    title: "Wisuda Akbar Tahfidz 30 Juz: Melahirkan Generasi Penjaga Kalamullah yang Berkarakter",
    slug: 'wisuda-akbar-tahfidz-30-juz-gmq',
    excerpt: "Sebanyak 45 santri Ma'had GMQ berhasil menyelesaikan tasmi' 30 juz sekali duduk dan menerima syahadah tahfidz.",
    content: `Suasana haru dan penuh keberkahan menyelimuti aula utama Yayasan Griya Mahir Al-Qur'an dalam agenda Wisuda Akbar Tahfidz Al-Qur'an. Sebanyak 45 santri putra dan putri resmi diwisuda setelah menuntaskan setoran hafalan 30 juz secara mutqin.

Mudir Yayasan, Ustadz Ahmad Fauzi, Lc., M.Ag., dalam sambutannya berpesan agar para wisudawan senantiasa memelihara hafalan Al-Qur'an di dalam dada serta menjadikannya sebagai pedoman akhlak dalam kehidupan bermasyarakat.

Acara wisuda ditutup dengan pemasangan mahkota kehormatan secara simbolis kepada para orang tua santri, diiringi doa bersama untuk keselamatan dan keberkahan bangsa.`,
    category: 'Berita Yayasan',
    author: 'Humas GMQ',
    featured_image: sample7,
    status: 'published',
    views_count: 1250,
    created_at: '2026-03-18T10:30:00Z',
    published_at: '2026-03-18T10:30:00Z'
  },
  {
    id: 'post-quran-3',
    title: "Metode Efektif Menjaga Hafalan Al-Qur'an (Muraja'ah Mutqin) untuk Santri dan Orang Tua",
    slug: 'metode-efektif-murajaah-mutqin-santri',
    excerpt: "Tips praktis dari Dewan Asatidz GMQ dalam mengikat hafalan Al-Qur'an agar melekat kuat dan tidak mudah lupa.",
    content: `Menghafal Al-Qur'an adalah sebuah kemuliaan, namun menjaga hafalan tersebut (muraja'ah) adalah perjuangan seumur hidup. Rasulullah SAW mengumpamakan hafalan Al-Qur'an seperti unta yang diikat; bila dijaga maka akan tetap, bila dilepas maka ia akan pergi.

### 4 Kunci Muraja'ah Mutqin GMQ:
1. **Sabaq (Hafalan Baru):** Setorkan ayat baru kepada musyrif secara talaqqi setiap pagi.
2. **Sabqi (Hafalan Kemarin):** Ulangi hafalan 5 halaman terakhir sebelum memulai setoran baru.
3. **Manzil (Muraja'ah Besar):** Jadwalkan pengulangan minimal 1 hingga 2 juz per hari secara konsisten.
4. **Membaca dalam Shalat:** Gunakan ayat-ayat yang baru dihafal dalam shalat rawatib dan shalat malam (qiyamullail).`,
    category: 'Wawasan Qurani',
    author: 'Ustadz Ahmad Fauzi, Lc.',
    featured_image: sample8,
    status: 'published',
    views_count: 670,
    created_at: '2026-03-12T14:15:00Z',
    published_at: '2026-03-12T14:15:00Z'
  },
  {
    id: 'post-quran-4',
    title: "Dauroh Tajwid Bersanad Matan Al-Jazariyyah Angkatan ke-8 Resmi Dimulai",
    slug: 'dauroh-tajwid-bersanad-al-jazariyyah',
    excerpt: "Program pendalaman ilmu tajwid terapan bersanad bagi para pegiat dan pengajar Al-Qur'an nusantara.",
    content: `Sebanyak 80 peserta dari berbagai kota di Indonesia mengikuti pembukaan Dauroh Matan Al-Jazariyyah yang diselenggarakan oleh Divisi Pendidikan Non-Formal GMQ. Program ini menitikberatkan pada ketepatan makharijul huruf, sifat huruf, ahkamul mad, serta kaidah waqaf wal ibtida'.`,
    category: 'Program Dauroh',
    author: 'Divisi Sanad GMQ',
    featured_image: sample1,
    status: 'published',
    views_count: 420,
    created_at: '2026-03-05T09:00:00Z',
    published_at: '2026-03-05T09:00:00Z'
  }
];

export const initialInquiries: Inquiry[] = [
  {
    id: 'inq-q1',
    name: 'H. Muhammad Rizky',
    email: 'rizky.hidayat@gmail.com',
    phone: '081287654321',
    subject: "Pendaftaran Santri Baru Ma'had Tahfidz Putra (SMP)",
    message: "Assalamu'alaikum, kami ingin menanyakan jadwal tes seleksi PSB untuk jenjang SMP Boarding tahun ajaran ini dan prosedur pendaftarannya.",
    status: 'new',
    created_at: '2026-03-24T08:15:00Z'
  },
  {
    id: 'inq-q2',
    name: 'Ustadzah Fatimah Azzahra',
    email: 'fatimah.zahra@pesantren-alikhlas.sch.id',
    phone: '081399887766',
    subject: 'Pendaftaran Dauroh Matan Al-Jazariyyah Bersanad',
    message: "Bismillah, kami ingin mendaftarkan 3 orang guru Al-Qur'an dari yayasan kami untuk mengikuti dauroh sanad angkatan berikutnya. Mohon informasi syarat dan ketentuannya.",
    status: 'in_progress',
    created_at: '2026-03-22T11:20:00Z'
  },
  {
    id: 'inq-q3',
    name: 'Bapak Ir. Hendra Kusuma',
    email: 'hendra.k@corporate-indonesia.com',
    phone: '081122334455',
    subject: 'Konsultasi Kelas Tahsin Eksekutif Karyawan Kantor',
    message: "Assalamu'alaikum ustadz, kami ingin mengadakan bimbingan tahsin Al-Qur'an rutin setiap hari Jumat di masjid kantor kami. Mohon info skema dan ketersediaan asatidz pembina.",
    status: 'resolved',
    created_at: '2026-03-19T14:40:00Z'
  }
];
