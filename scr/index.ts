// @ts-nocheck
import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const askQuestion = (query: string): Promise<string> => {
    return new Promise((resolve) => rl.question(query, resolve));
};

async function main() {
    console.log("==============================");
    console.log("   SISTEM KASIR BENGKEL MOTOR ");
    console.log("==============================\n");

    let totalBiaya: number = 0;
    let totalDiskon: number = 0;
    let biayaService: number = 0; 
    let biayasparepart: number = 0; 

    // 1. PENGGUNAAN SWITCH (TIPE MOTOR: BEBEK, MATIC, SPORT)
    const inputMotor = await askQuestion("Pilih Tipe Motor (1: Bebek, 2: Matic, 3: Sport): ");
    const tipeMotor: number = parseInt(inputMotor);

    const inputPaket = await askQuestion("Pilih Paket service (1: Ringan, 2: Lengkap): ");
    const paketService: number = parseInt(inputPaket);

    switch (tipeMotor) {
        case 1:
            console.log("Kategori Motor: Bebek");
            switch (paketService) {
                case 1: 
                    biayaService = 50000;
                    break;
                case 2: 
                    biayaService = 80000;
                    break; 
                default:
                    biayaService = 40000;
                    break;
            }
            break;

        case 2:
            console.log("Kategori Motor: Matic");
            switch (paketService) {
                case 1: 
                    biayaService = 50000;
                    break;
                case 2: 
                    biayaService = 80000;
                    break; 
                default:
                    biayaService = 40000;
                    break;
            }
            break;

        case 3:
            console.log("Kategori Motor: Sport");
            if (paketService === 1) {
                biayaService = 75000;
            } else {
                biayaService = 110000;
            }
            break; 

        default:
            console.log("Pilihan motor tidak valid, set ke tarif standar.");
            biayaService = 50000; 
            break;
    }

    totalBiaya += biayaService;

    // 2. PENGGUNAAN IF SPAREPART
    const inputSparepart = await askQuestion("\nApakah ganti sparepart/oli? (1: Ya, 2: Tidak): ");
    const isGantiSparepart: number = parseInt(inputSparepart);

    if (isGantiSparepart === 1) {
        const inputJenisOli = await askQuestion("Pilih Sparepart (1: Oli Standard, 2: Oli Synthetic): ");
        const jenisOli: number = parseInt(inputJenisOli); 
        
        if (jenisOli === 1) {
            biayasparepart = 45000; 
        } else {
            biayasparepart = 75000; 
        }
        
        totalBiaya += biayasparepart; 
    }

    // 3. DISKON MEMBER
    const inputMember = await askQuestion("\nApakah pelanggan memiliki kartu member? (iya/tidak): ");
    const memberInputClean = inputMember.toLowerCase();
    const isMember: boolean = memberInputClean === 'iya' || memberInputClean === 'y';

    if (isMember) {
        const inputDurasi = await askQuestion("Berapa lama menjadi member (berapa bulan)? ");
        const durasiMember: number = parseInt(inputDurasi); 

        if (durasiMember >= 6) {
            console.log("Pelanggan mendapat Diskon Member Setia (10%)");
            const diskonMember: number = totalBiaya * 0.10;
            totalDiskon += diskonMember; 
        } else {
            console.log("Pelanggan mendapat Diskon Member Baru (5%)");
            const diskonMember: number = totalBiaya * 0.05; 
            totalDiskon += diskonMember;
        }
    }

    // 4. VOUCHER PROMO
    const kodeVoucer: string = await askQuestion("\nMasukan Kode Voucher Promo (Tekan enter jika tidak ada): ");

    if (kodeVoucer === "ANDRAGANTENG10" && !(totalBiaya < 50000)) {
        console.log("Voucher Promo Valid! Potongan Tambahan Rp 10.000"); 
        totalDiskon += 10000; 
    } else if (kodeVoucer !== "") { 
        console.log("Kode voucher tidak berlaku.");
    }

    // Perhitungan total
    const subtotal = biayaService + biayasparepart;
    const totalBayar = subtotal - totalDiskon;

    console.log("\n-----------------------------------------");
    console.log("              NOTA TRANSAKSI             ");
    console.log("-----------------------------------------");
    console.log(`Biaya Service               : Rp ${biayaService}`);
    console.log(`Biaya Sparepart             : Rp ${biayasparepart}`);
    console.log(`Subtotal Biaya              : Rp ${subtotal}`);
    console.log(`Total Diskon                : Rp ${totalDiskon}`);
    console.log("-----------------------------------------");
    console.log(`TOTAL BAYAR AKHIR           : Rp ${totalBayar}`);
    console.log("-----------------------------------------");
    
    rl.close();
}

main();