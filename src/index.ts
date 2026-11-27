
import * as readline from "readline-sync";


// STRUKTUR DATA TRANSAKSI
interface Transaksi {
    id: number;
    nama: string;
    tipeMotor: string;
    paketService: string;
    biayaService: number;
    jenisOli: string;
    biayaOli: number;
    metodePembayaran: string;
    member: boolean;
    subtotal: number;
    diskon: number;
    totalBayar: number;
}

// PENYIMPANAN DATA
const dataTransaksi: Transaksi[] = [];
let nomorID: number = 1;

// INPUT DAN VALIDASI
function inputTeks(pesan: string): string {
    let hasil: string = readline.question(pesan).trim();

    while (hasil === "") {
        console.log("Input tidak boleh kosong!");
        hasil = readline.question(pesan).trim();
    }

    return hasil;
}

function inputAngka(
    pesan: string,
    minimal: number,
    maksimal: number
): number {
    let angka: number = Number(readline.question(pesan));

    while (
        isNaN(angka) ||
        angka < minimal ||
        angka > maksimal ||
        angka % 1 !== 0
    ) {
        console.log("Input tidak valid! Masukkan angka yang benar.");
        angka = Number(readline.question(pesan));
    }

    return angka;
}

// MENGHITUNG BIAYA SERVICE
function hitungBiayaService(tipeMotor: number, paket: number): number {
    let biaya: number = 0;

    if (tipeMotor === 1) {
        console.log("Tipe motor: Bebek");
        if (paket === 1) {
            biaya = 50000;
        } else {
            biaya = 80000;
        }
    } else if (tipeMotor === 2) {
        console.log("Tipe motor: Matic");
        if (paket === 1) {
            biaya = 50000;
        } else {
            biaya = 80000;
        }
    } else if (tipeMotor === 3) {
        console.log("Tipe motor: Sport");
        if (paket === 1) {
            biaya = 75000;
        } else {
            biaya = 110000;
        }
    } else {
        console.log("Pilihan motor tidak tersedia.");
    }

    return biaya;
}

// MEMBUAT DATA TRANSAKSI
function buatTransaksi(id: number): Transaksi {
    console.log("\n========== INPUT TRANSAKSI ==========");

    const nama: string = inputTeks("Nama pelanggan: ");

    console.log("\nTipe Motor:");
    console.log("1. Bebek");
    console.log("2. Matic");
    console.log("3. Sport");

    const pilihanMotor: number = inputAngka("Pilih tipe motor: ", 1, 3);

    let tipeMotor: string = "";

    if (pilihanMotor === 1) {
        tipeMotor = "Bebek";
    } else if (pilihanMotor === 2) {
        tipeMotor = "Matic";
    } else {
        tipeMotor = "Sport";
    }

    // Memilih paket service.
    console.log("\nPaket Service:");
    console.log("1. Basic");
    console.log("2. Premium");

    const pilihanPaket: number = inputAngka("Pilih paket: ", 1, 2);

    let paketService: string = "";

    if (pilihanPaket === 1) {
        paketService = "Ringan";
    } else {
        paketService = "Lengkap";
    }

    const biayaService: number = hitungBiayaService(
        pilihanMotor,
        pilihanPaket
    );

    // Memilih oli.
    console.log("\nGanti oli?");
    console.log("1. Ya");
    console.log("2. Tidak");

    const pilihanOli: number = inputAngka("Pilihan: ", 1, 2);

    let jenisOli: string = "Tidak ada";
    let biayaOli: number = 0;

    if (pilihanOli === 1) {
        console.log("\nJenis Oli:");
        console.log("1. Standard - Rp45.000");
        console.log("2. Synthetic - Rp75.000");
        console.log("3. Premium - Rp95.000");

        const pilihanJenis: number = inputAngka("Pilih jenis oli: ", 1, 3);

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

    const pilihanPembayaran: number = inputAngka(
        "Pilih metode pembayaran: ",
        1,
        2
    );

    let metodePembayaran: string = "";

    if (pilihanPembayaran === 1) {
        metodePembayaran = "Tunai";
    } else {
        metodePembayaran = "Transfer";
    }

    // Memilih status member.
    console.log("\nStatus Member:");
    console.log("1. Member");
    console.log("2. Bukan member");

    const pilihanMember: number = inputAngka("Pilihan: ", 1, 2);

    let member: boolean = false;

    if (pilihanMember === 1) {
        member = true;
    }

    // Menghitung subtotal.
    let subtotal: number = biayaService;
    subtotal += biayaOli;

    // Menghitung diskon member.
    let diskon: number = 0;

    if (member === true) {
        if (subtotal > 0) {
            if (pilihanPaket === 2) {
                console.log("Diskon member 10% untuk paket lengkap.");
                diskon += subtotal * 0.10;
            } else {
                console.log("Diskon member 5%.");
                diskon += subtotal * 0.05;
            }
        }
    }

    // Menghitung total pembayaran.
    let totalBayar: number = subtotal;
    totalBayar -= diskon;

    // Menyusun data transaksi.
    const transaksiBaru: Transaksi = {
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

function tambahTransaksi(): void {
    const dataBaru: Transaksi = buatTransaksi(nomorID);

    dataTransaksi.push(dataBaru);
    nomorID += 1;

    console.log("\nTransaksi berhasil ditambahkan!");
    console.log("ID Transaksi: " + dataBaru.id);
}
