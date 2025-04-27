Halo ini kelompok tim sebelah

Tutorial membuat branch baru untuk keperluan code collaboration:
1. Clone repository dari project yang akan digunakan untuk kolaborasi (github.com)
2. Buat branch baru dari main branch
   - git checkout -b my-new-branch
3. Buat file baru README.md, kemudian lakukan pengeditan
4. Tambahkan ke dalam list of changes file dalam git
   a. Command line 
      - Tambahkan semua file atau update file semuanya: git add . 
      - Tambahkan hanya beberapa file yg akan di update: git add file-1 file-2
   b. VSCode UI
      - Klik tombol “+” pada file yang akan ditambahkan
5. Lakukan commit (check point pengerjaan untuk file yang diupdate)
   a. VSCode UI - Source Control
      - Edit commit message
   b. Command line
      - git commit -m “perubahan apa yang dilakukan”
6. Lakukan push code ke cloud github
      - git push
      - git push origin kelompok-tim-sebelah
========================================================================================
pull and push ke git hub dari VSCode
1. git pull origin kelompok-tim-sebelah -> ambil perubahan terbaru dari branch kelompok-tim-sebelah (di terminal)
2. git branch {memastikan di branch mana} -> dengan ada tanda (*) (di terminal)
3. git checkout kelompok-tim-sebelah {masuk ke brench yg kita mau} (di terminal)
4. lakukan perubahan, mau bikin folder baru bisa, drag and drop gambar bisa, edit readme bisa.
5. buat commit message dulu di Source Control (Ctrl+Shift+G)>CHANGES>tulis pesan perubahan, lalu ceklis
6. git push atau git push origin kelompok-tim-sebelah (di terminal)