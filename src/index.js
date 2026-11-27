"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline-sync"));
// PENYIMPANAN DATA
const dataTransaksi = [];
let nomorID = 1;
// INPUT DAN VALIDASI
function inputTeks(pesan) {
    let hasil = readline.question(pesan).trim();
    while (hasil === "") {
        console.log("Input tidak boleh kosong!");
        hasil = readline.question(pesan).trim();
    }
    return hasil;
}
function inputAngka(pesan, minimal, maksimal) {
    let angka = Number(readline.question(pesan));
    while (isNaN(angka) ||
        angka < minimal ||
        angka > maksimal ||
        angka % 1 !== 0) {
        console.log("Input tidak valid! Masukkan angka yang benar.");
        angka = Number(readline.question(pesan));
    }
    return angka;
}
// MENU UTAMA
function main() {
    let pilihan = 0;
    while (pilihan !== 2) {
        console.log("\n================================");
        console.log("       KASIR BENGKEL MOTOR");
        console.log("================================");
        console.log("1. Tambah Transaksi");
        console.log("2. Keluar");
        console.log("================================");
        pilihan = inputAngka("Pilih menu: ", 1, 2);
        // Menjalankan menu sesuai pilihan pengguna.
        switch (pilihan) {
            case 1:
                tambahTransaksi();
                break;
            case 2:
                console.log("Terima kasih telah menggunakan aplikasi.");
                break;
            default:
                console.log("Pilihan tidak tersedia.");
                break;
        }
    }
}
main();
// MENGHITUNG BIAYA SERVICE
function hitungBiayaService(tipeMotor, paket) {
    let biaya = 0;
    if (tipeMotor === 1) {
        console.log("Tipe motor: Bebek");
        if (paket === 1) {
            biaya = 50000;
        }
        else {
            biaya = 80000;
        }
    }
    else if (tipeMotor === 2) {
        console.log("Tipe motor: Matic");
        if (paket === 1) {
            biaya = 50000;
        }
        else {
            biaya = 80000;
        }
    }
    else if (tipeMotor === 3) {
        console.log("Tipe motor: Sport");
        if (paket === 1) {
            biaya = 75000;
        }
        else {
            biaya = 110000;
        }
    }
    else {
        console.log("Pilihan motor tidak tersedia.");
    }
    return biaya;
}
// MEMBUAT DATA TRANSAKSI
function buatTransaksi(id) {
    console.log("\n========== INPUT TRANSAKSI ==========");
    const nama = inputTeks("Nama pelanggan: ");
    console.log("\nTipe Motor:");
    console.log("1. Bebek");
    console.log("2. Matic");
    console.log("3. Sport");
    const pilihanMotor = inputAngka("Pilih tipe motor: ", 1, 3);
    let tipeMotor = "";
    if (pilihanMotor === 1) {
        tipeMotor = "Bebek";
    }
    else if (pilihanMotor === 2) {
        tipeMotor = "Matic";
    }
    else {
        tipeMotor = "Sport";
    }
    // Memilih paket service.
    console.log("\nPaket Service:");
    console.log("1. Basic");
    console.log("2. Premium");
    const pilihanPaket = inputAngka("Pilih paket: ", 1, 2);
    let paketService = "";
    if (pilihanPaket === 1) {
        paketService = "Ringan";
    }
    else {
        paketService = "Lengkap";
    }
    const biayaService = hitungBiayaService(pilihanMotor, pilihanPaket);
    // Memilih oli.
    console.log("\nGanti oli?");
    console.log("1. Ya");
    console.log("2. Tidak");
    const pilihanOli = inputAngka("Pilihan: ", 1, 2);
    let jenisOli = "Tidak ada";
    let biayaOli = 0;
    if (pilihanOli === 1) {
        console.log("\nJenis Oli:");
        console.log("1. Standard - Rp45.000");
        console.log("2. Synthetic - Rp75.000");
        console.log("3. Premium - Rp95.000");
        const pilihanJenis = inputAngka("Pilih jenis oli: ", 1, 3);
        switch (pilihanJenis) {
            case 1:
                jenisOli = "Standard";
                biayaOli = 45000;
                break;
            case 2:
                jenisOli = "Synthetic";
                biayaOli = 75000;
                break;
            case 3:
                jenisOli = "Premium";
                biayaOli = 95000;
                break;
        }
    }
    // Memilih metode pembayaran.
    console.log("\nMetode Pembayaran:");
    console.log("1. Tunai");
    console.log("2. Transfer");
    const pilihanPembayaran = inputAngka("Pilih metode pembayaran: ", 1, 2);
    let metodePembayaran = "";
    if (pilihanPembayaran === 1) {
        metodePembayaran = "Tunai";
    }
    else {
        metodePembayaran = "Transfer";
    }
    // Memilih status member.
    console.log("\nStatus Member:");
    console.log("1. Member");
    console.log("2. Bukan member");
    const pilihanMember = inputAngka("Pilihan: ", 1, 2);
    let member = false;
    if (pilihanMember === 1) {
        member = true;
    }
    // Menghitung subtotal.
    let subtotal = biayaService;
    subtotal += biayaOli;
    // Menghitung diskon member.
    let diskon = 0;
    if (member === true) {
        if (subtotal > 0) {
            if (pilihanPaket === 2) {
                console.log("Diskon member 10% untuk paket lengkap.");
                diskon += subtotal * 0.10;
            }
            else {
                console.log("Diskon member 5%.");
                diskon += subtotal * 0.05;
            }
        }
    }
    // Menghitung total pembayaran.
    let totalBayar = subtotal;
    totalBayar -= diskon;
    // Menyusun data transaksi.
    const transaksiBaru = {
        id: id,
        nama: nama,
        tipeMotor: tipeMotor,
        paketService: paketService,
        biayaService: biayaService,
        jenisOli: jenisOli,
        biayaOli: biayaOli,
        metodePembayaran: metodePembayaran,
        member: member,
        subtotal: subtotal,
        diskon: diskon,
        totalBayar: totalBayar
    };
    return transaksiBaru;
}
// CREATE - MENAMBAHKAN TRANSAKSI
function tambahTransaksi() {
    const dataBaru = buatTransaksi(nomorID);
    dataTransaksi.push(dataBaru);
    nomorID += 1;
    console.log("\nTransaksi berhasil ditambahkan!");
    console.log("ID Transaksi: " + dataBaru.id);
}
//# sourceMappingURL=index.js.map