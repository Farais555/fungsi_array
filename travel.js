const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Pelanggan {
    constructor(nama, nomorTelepon, kendaraanDisewa) {
        this.nama = nama;
        this.nomorTelepon = nomorTelepon;
        this.kendaraanDisewa = kendaraanDisewa;
  }

infoPenyewaan() {
    return `Nama: ${this.nama}, Telepon: ${this.nomorTelepon}, Kendaraan: ${this.kendaraanDisewa}`;
  }
}

class SistemTransportasi {
    constructor() {
        this.daftarPelanggan = [];
        this.daftarKendaraan = ["Mobil", "Motor", "Minibus", "Bus"];
  }

sewaKendaraan(nama, nomorTelepon, kendaraanDisewa) {
    const pelangganBaru = new Pelanggan(nama, nomorTelepon, kendaraanDisewa);
        this.daftarPelanggan.push(pelangganBaru);
            console.log(`\nTransaksi berhasil: ${nama} menyewa ${kendaraanDisewa}\n`);
  }

tampilkanPelanggan() {
    console.log("\nDaftar Pelanggan yang Menyewa Kendaraan:");
        if (this.daftarPelanggan.length === 0) {
            console.log("Belum ada pelanggan yang menyewa.\n");
    }   else {
        this.daftarPelanggan.forEach((pelanggan, index) => {
            console.log(`${index + 1}. ${pelanggan.infoPenyewaan()}`);
      });
            console.log("");
    }
  }

selesaikanTransaksi(index) {
    if (index >= 0 && index < this.daftarPelanggan.length) {
        const pelanggan = this.daftarPelanggan.splice(index, 1)[0];
            console.log(`\nTransaksi selesai: ${pelanggan.nama} telah mengembalikan ${pelanggan.kendaraanDisewa}, silahkan kirim bukti pengembalian\n`);
    }   else {
            console.log("\nPilihan tidak valid.\n");
    }
  }
}

const sistem = new SistemTransportasi();

function menu() {
    console.log("==== Sistem Transportasi ====");
    console.log("1. Sewa Kendaraan");
    console.log("2. Tampilkan Pelanggan");
    console.log("3. Selesaikan Transaksi");
    console.log("4. Keluar");

    rl.question("Pilih menu: ", pilihan => {
        if (pilihan === "1") {
        rl.question("Nama pelanggan: ", nama => {
            rl.question("Nomor telepon: ", telepon => {
            console.log("\nJenis Kendaraan:");
            sistem.daftarKendaraan.forEach((kendaraan, i) => {
                console.log(`${i + 1}. ${kendaraan}`);
            });
            rl.question("Pilih kendaraan (1-4): ", pilihanKendaraan => {
                const idx = Number(pilihanKendaraan) - 1;
                if (idx >= 0 && idx < sistem.daftarKendaraan.length) {
                const kendaraan = sistem.daftarKendaraan[idx];
                sistem.sewaKendaraan(nama, telepon, kendaraan);
                } else {
                console.log("Pilihan kendaraan tidak valid.\n");
                }
                menu();
            });
            });
        });
    }   else if (pilihan === "2") {
            sistem.tampilkanPelanggan();
            menu();
    }   else if (pilihan === "3") {
        if (sistem.daftarPelanggan.length === 0) {
            console.log("\nBelum ada pelanggan yang menyewa.\n");
            menu();
      } else {
            console.log("\nPelanggan yang sedang menyewa:");
                sistem.daftarPelanggan.forEach((p, i) => {
                    console.log(`${i + 1}. ${p.infoPenyewaan()}`);
        });
    rl.question("Pilih nomor pelanggan yang selesai menyewa: ", nomor => {
        const index = Number(nomor) - 1;
            sistem.selesaikanTransaksi(index);
            menu();
        });
      }
    }   else if (pilihan === "4") {
            console.log("Terima kasih! Program selesai.");
            rl.close();
    }   else {
            console.log("Pilihan tidak valid.\n");
            menu();
    }
  });
}

// Jalankan menu utama
menu();
