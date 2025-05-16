Tutorial membuat branch baru untuk keperluan code collaboration:

1. Clone repository dari project yang akan digunakan untuk kolaborasi (github.com)

2. Buat branch baru dari main branch

git checkout -b my-new-branch

3. Buat file baru README.md, kemudian lakukan pengeditan

4. Tambahkan ke dalam list of changes file dalam git

a. Command line

Tambahkan semua file atau update file semuanya: git add .
Tambahkan hanya beberapa file yg akan di update: git add file-1 file-2

b. VSCode UI

Klik tombol “+” pada file yang akan ditambahkan

5. Lakukan commit (check point pengerjaan untuk file yang diupdate)

a. VSCode UI - Source Control

Edit commit message

b. Command line

git commit -m “perubahan apa yang dilakukan”

6. Lakukan push code ke cloud github

git push
git push origin kudalumping
*ini jika sudah clone repo project di github

* pull and push ke git hub dari fitur VSCode

git pull origin kudalumping -> ambil perubahan terbaru dari branch kualmping (di terminal)

git branch {memastikan di branch mana} -> dengan ada tanda (*) (di terminal)

git checkout kelompok-tim-sebelah {masuk ke brench yg kita mau} (di terminal)

lakukan perubahan, mau bikin folder baru bisa, drag and drop gambar bisa, edit readme bisa.

buat commit message dulu di Source Control (Ctrl+Shift+G)>CHANGES>tulis pesan perubahan, lalu ceklis

git push atau git push origin kudalumping (di terminal)

* kalau dari full terminal

git pull atau git pull origin kelompok-tim-sebelah

git branch (cek posisi sekarang)

git checkout kelompok-tim-sebelah

(lakukan perubahan: edit README.md, tambah gambar, buat folder baru)

git add .

git commit -m "perubahan apa yang dilakukan"

git push atau git push origin kudalumping
