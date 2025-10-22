const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let produkToko = [
    { id: 1, nama: "Laptop", harga: 7000000, stok: 5 },
    { id: 2, nama: "Mouse", harga: 200000, stok: 10 },
    { id: 3, nama: "Keyboard", harga: 350000, stok: 7 }
];

function tampilkanProduk() {
    console.log("\nDaftar Produk Toko:");
    produkToko.forEach(produk => {
        console.log(`ID: ${produk.id}, Nama: ${produk.nama}, Harga: Rp${produk.harga}, Stok: ${produk.stok}`);
    });
}

function tambahProduk(nama, harga, stok) {
    const idBaru = produkToko.length > 0 ? produkToko[produkToko.length - 1].id + 1 : 1;
    produkToko.push({ id: idBaru, nama, harga, stok });
    console.log(`Produk "${nama}" berhasil ditambahkan.`);
}

function hapusProduk(id) {
    const index = produkToko.findIndex(p => p.id === id);
    if (index !== -1) {
        const nama = produkToko[index].nama;
        produkToko.splice(index, 1);
        console.log(`Produk "${nama}" berhasil dihapus.`);
    } else {
        console.log(`Produk dengan ID ${id} tidak ditemukan.`);
    }
}

function menu() {
    console.log("\n==== Toko Online ====");
    console.log("1. Tampilkan Produk");
    console.log("2. Tambah Produk");
    console.log("3. Hapus Produk");
    console.log("4. Keluar");

    rl.question("Pilih menu: ", pilihan => {
        if (pilihan === "1") {
            tampilkanProduk();
            menu();
        } else if (pilihan === "2") {
            rl.question("Nama produk: ", nama => {
                rl.question("Harga produk: ", hargaStr => {
                    rl.question("Stok produk: ", stokStr => {
                        const harga = Number(hargaStr);
                        const stok = Number(stokStr);
                        tambahProduk(nama, harga, stok);
                        menu();
                    });
                });
            });
        } else if (pilihan === "3") {
            tampilkanProduk();
            rl.question("Masukkan ID produk yang ingin dihapus: ", idStr => {
                const id = Number(idStr);
                hapusProduk(id);
                menu();
            });
        } else if (pilihan === "4") {
            console.log("Terima kasih! Program selesai.");
            rl.close();
        } else {
            console.log("Pilihan tidak valid.");
            menu();
        }
    });
}

// Jalankan menu utama
menu();
