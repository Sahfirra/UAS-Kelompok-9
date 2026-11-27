
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
