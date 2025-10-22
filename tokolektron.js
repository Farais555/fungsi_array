const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// data produk
let produkList = [
    { id: 1, nama: "Laptop", harga: 12000000 },
    { id: 2, nama: "Smartphone", harga: 5000000 },
    { id: 3, nama: "Keyboard", harga: 350000 },
    { id: 4, nama: "Mouse", harga: 200000 },
    { id: 5, nama: "Monitor", harga: 2500000 }
];

// event Handler
const eventHandler = {
    tampilkanSemua: () => tampilkanProduk()
};

// menambahkan produk dengan spread operator
function tambahProduk(id, nama, harga) {
    produkList = [...produkList, { id, nama, harga }];
    console.log(`Produk "${nama}" berhasil ditambahkan.`);
}

// menghapus produk dengan rest parameter
function hapusProduk(id) {
    const awal = produkList.length;
    produkList = produkList.filter(produk => produk.id !== id);
    if (produkList.length < awal) {
        console.log(`Produk dengan ID ${id} berhasil dihapus.`);
    } else {
        console.log(`Produk dengan ID ${id} tidak ditemukan.`);
    }
}

// menampilkan produk dengan destructuring
function tampilkanProduk() {
    console.log("\nDaftar Produk:");
    produkList.forEach(produk => {
        const { id, nama, harga } = produk;
        console.log(`ID: ${id}, Nama: ${nama}, Harga: Rp${harga}`);
    });
}

function menu() {
    console.log("=== Menu Produk ===");
    console.log("1. Tampilkan Semua Produk");
    console.log("2. Tambah Produk");
    console.log("3. Hapus Produk");
    console.log("4. Keluar");

    rl.question("Masukkan pilihan (1-4): ", (pilihan) => {
        switch (pilihan) {
            case "1":
                tampilkanProduk();
                menu();
                break;
            case "2":
                rl.question("Masukkan ID produk baru: ", (idBaru) => {
                    rl.question("Masukkan nama produk baru: ", (namaBaru) => {
                        rl.question("Masukkan harga produk baru: ", (hargaBaru) => {
                            const id = parseInt(idBaru);
                            const harga = parseInt(hargaBaru);
                            if (!isNaN(id) && namaBaru && !isNaN(harga)) {
                                tambahProduk(id, namaBaru, harga);
                            } else {
                                console.log("Input tidak valid!");
                            }
                            menu();
                        });
                    });
                });
                break;
            case "3":
                tampilkanProduk();
                    rl.question("Masukkan ID produk yang akan dihapus: ", (idHapus) => {
                        const id = parseInt(idHapus);
                        if (!isNaN(id)) {
                            hapusProduk(id);
                        } else {
                            console.log("Input tidak valid!");
                        }
                        menu();
                    });
                break;
            case "4":
                console.log("Terima kasih!");
                rl.close();
                break;
            default:
                console.log("Pilihan tidak valid!");
                menu();
        }
    });
}

menu();