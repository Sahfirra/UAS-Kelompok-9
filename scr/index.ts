import * as readline from 'readline-sync';

function main() {
    console.log("==================================");
    console.log("      SISTEM KASIR BENGKEL MOTOR");
    console.log("==================================\n");

    let biayaService: number = 0;
    let biayaSparepart: number = 0;
    let totalDiskon: number = 0;
    let subtotal: number = 0;
    let totalBayar: number = 0;

    // 1 tipe motor
    let tipeMotor: number = parseInt(
        readline.question("Pilih Tipe Motor (1: Bebek, 2: Matic, 3: Sport): ")
    );

    // 2 paket service
    let paketService: number = parseInt(
        readline.question("Pilih Paket Service (1: Ringan, 2: Lengkap): ")
    );

    // 3 biaya service (Switch Case)
    switch (tipeMotor) {
        case 1:
            console.log("\nKategori Motor: Bebek");

            if (paketService === 1) {
                biayaService = 50000;
            } else {
                biayaService = 80000;
            }
            break;

        case 2:
            console.log("\nKategori Motor: Matic");

            if (paketService === 1) {
                biayaService = 50000;
            } else {
                biayaService = 80000;
            }
            break;

        case 3:
            console.log("\nKategori Motor: Sport");

            if (paketService === 1) {
                biayaService = 75000;
            } else {
                biayaService = 110000;
            }
            break;

        default:
            console.log("\nPilihan motor tidak valid.");
            biayaService = 50000;
            break;
    }

    // 4 sparepart atau oli (Switch Case)
    let pilihanSparepart: number = parseInt(
        readline.question("\nApakah ganti sparepart/oli? (1: Ya, 2: Tidak): ")
    );

    if (pilihanSparepart === 1) {
        let jenisOli: number = parseInt(
            readline.question("Pilih Oli (1: Standard, 2: Synthetic): ")
        );

        switch (jenisOli) {
            case 1:
                biayaSparepart = 45000;
                break;

            case 2:
                biayaSparepart = 75000;
                break;

            default:
                biayaSparepart = 0;
                console.log("Pilihan oli tidak valid.");
                break;
        }
    }

    // 5 member (Nested If)
    let member: number = parseInt(
        readline.question("\nApakah pelanggan memiliki kartu member? (1: Iya, 2: Tidak): ")
    );

    if (member === 1) {
        let durasiMember: number = parseInt(
            readline.question("Berapa lama menjadi member (bulan)? ")
        );

        if (durasiMember >= 6) {
            console.log("Pelanggan mendapat Diskon Member Setia 10%");
            totalDiskon = totalDiskon + (biayaService + biayaSparepart) * 0.10;
        } else {
            console.log("Pelanggan mendapat Diskon Member Baru 5%");
            totalDiskon = totalDiskon + (biayaService + biayaSparepart) * 0.05;
        }
    }

    // 6 kode voucher (If-Else)
    let kodeVoucher: string = readline.question(
        "\nMasukkan Kode Voucher (Tekan Enter jika tidak ada): "
    );

    if (kodeVoucher === "ANDRAGANTENG10" && (biayaService + biayaSparepart >= 50000)) {
        console.log("Voucher Valid! Potongan Tambahan Rp 10.000");
        totalDiskon = totalDiskon + 10000;
    } else if (kodeVoucher !== "") {
        console.log("Kode voucher tidak berlaku.");
    }

    // 7 total pembayaran
    subtotal = biayaService + biayaSparepart;
    totalBayar = subtotal - totalDiskon;

    // 8 nota transaksi
    console.log("\n==================================");
    console.log("           NOTA TRANSAKSI");
    console.log("==================================");
    console.log("Biaya Service       : Rp " + biayaService);
    console.log("Biaya Sparepart     : Rp " + biayaSparepart);
    console.log("Subtotal Biaya      : Rp " + subtotal);
    console.log("Total Diskon        : Rp " + totalDiskon);
    console.log("----------------------------------");
    console.log("TOTAL BAYAR AKHIR   : Rp " + totalBayar);
    console.log("==================================");
}

main();
