README — Pintarkit Affiliate BuyLink App
🎯 Tujuan Project

Project ini digunakan untuk memaparkan Affiliate Pintarkit (aktif sahaja) dan membolehkan pengguna:

Cari ID ejen

Pilih ejen secara rawak

Terus ke link pembelian ejen

⚠️ Branch main ialah PRODUCTION
Apa-apa perubahan di main akan terus update website live.

🗂 Struktur Folder
affiliate-buylink/
├─ src/          ← EDIT CODE DI SINI
│  ├─ index.html
│  ├─ app.js
│  └─ styles.css
├─ dist/         ← HASIL MINIFY (DEPLOY)
├─ package.json
├─ .gitignore
└─ README.md


❌ Jangan edit dist/
❌ Jangan edit terus di main

🔐 PERATURAN UTAMA (WAJIB IKUT)

❌ DILARANG edit di branch main

✔️ Semua edit mesti dibuat di branch lain

✔️ Hanya merge ke main bila code confirm stabil

🔄 WORKFLOW EDIT → DEPLOY (STEP BY STEP)
1️⃣ PASTIKAN BRANCH SEKARANG
git branch


✔️ Pastikan BUKAN main
Kalau masih main, terus buat Step 2.

2️⃣ BUAT BRANCH BARU UNTUK EDIT

(contoh: dev)

git checkout -b dev


📌 Sekarang kau berada di branch dev

3️⃣ EDIT CODE

✔️ Edit file dalam folder src/ sahaja:

src/index.html

src/app.js

src/styles.css

❌ Jangan sentuh dist/

4️⃣ TEST LOCAL

Buka src/index.html atau guna Live Server
Pastikan:

Button boleh klik

Data load

Tiada error console

5️⃣ MINIFY CODE (BINA FILE PRODUCTION)
npm run build


📌 Ini akan:

Ambil code dari src/

Generate file minify dalam dist/

Tak ubah code asal

6️⃣ COMMIT DI BRANCH EDIT
git status
git add src package.json README.md
git commit -m "feat: update affiliate buylink logic"

7️⃣ TUKAR KE BRANCH main
git checkout main

8️⃣ MERGE PERUBAHAN KE main
git merge dev


📌 Sekarang main mengandungi code yang dah siap & stabil

9️⃣ PUSH KE GITHUB (PRODUCTION)
git push origin main


⚠️ Ini akan:

Update repo main

Trigger update website (jika connected)

🔁 EDIT SETERUSNYA (ULANG PROCESS)

Setiap kali nak edit:

git checkout dev


❌ Jangan edit di main

🚀 DEPLOY KE NETLIFY (JIMAT KUOTA)

Cara disyorkan (Manual Deploy):

Buka Netlify

Drag FOLDER dist/

Publish

✔️ Tak auto deploy
✔️ Tak bazir quota
✔️ Kau control bila update

🧠 RINGKASAN CEPAT (CHEAT SHEET)
# Edit mode
git checkout dev

# Minify
npm run build

# Merge & deploy
git checkout main
git merge dev
git push origin main

❗ NOTA PENTING

main = LIVE WEBSITE

dev = TEMPAT EDIT

src/ = CODE ASAL

dist/ = HASIL MINIFY (DEPLOY SAHAJA)