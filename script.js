

let departments = [];

function addDepartment() {
    const deptName = document.querySelector('.dept-name').value;
    const keaktifan = parseFloat(document.querySelector('.dept-keaktifan').value);
    const kerjaSama = parseFloat(document.querySelector('.dept-kerja-sama').value);
    const pengelolaan = parseFloat(document.querySelector('.dept-pengelolaan').value);
    const ketepatan = parseFloat(document.querySelector('.dept-ketepatan').value);
    const anggaran = parseFloat(document.querySelector('.dept-anggaran').value);

    if (deptName && !isNaN(keaktifan) && !isNaN(kerjaSama) && !isNaN(pengelolaan) && !isNaN(ketepatan) && !isNaN(anggaran)) {
        departments.push({
            name: deptName,
            keaktifan,
            kerjaSama,
            pengelolaan,
            ketepatan,
            anggaran
        });

        clearDepartmentInputs();
        alert('Departemen berhasil ditambahkan!');
    } else {
        alert('Mohon isi semua field dengan benar.');
    }
}

function clearDepartmentInputs() {
    document.querySelector('.dept-name').value = '';
    document.querySelector('.dept-keaktifan').value = '';
    document.querySelector('.dept-kerja-sama').value = '';
    document.querySelector('.dept-pengelolaan').value = '';
    document.querySelector('.dept-ketepatan').value = '';
    document.querySelector('.dept-anggaran').value = '';
}

function calculateSAW() {
    const bobotKeaktifan = parseFloat(document.getElementById('bobot-keaktifan').value);
    const bobotKerjaSama = parseFloat(document.getElementById('bobot-kerja-sama').value);
    const bobotPengelolaan = parseFloat(document.getElementById('bobot-pengelolaan').value);
    const bobotKetepatan = parseFloat(document.getElementById('bobot-ketepatan').value);
    const bobotAnggaran = parseFloat(document.getElementById('bobot-anggaran').value);

    if (departments.length === 0) {
        alert('Mohon tambahkan setidaknya satu departemen terlebih dahulu.');
        return;
    }

    const maxValues = {
        keaktifan: Math.max(...departments.map(d => d.keaktifan)),
        kerjaSama: Math.max(...departments.map(d => d.kerjaSama)),
        pengelolaan: Math.max(...departments.map(d => d.pengelolaan)),
        ketepatan: Math.max(...departments.map(d => d.ketepatan)),
        anggaran: Math.max(...departments.map(d => d.anggaran))
    };

    const results = departments.map(dept => {
        const nilaiKeaktifan = (dept.keaktifan / maxValues.keaktifan) * bobotKeaktifan;
        const nilaiKerjaSama = (dept.kerjaSama / maxValues.kerjaSama) * bobotKerjaSama;
        const nilaiPengelolaan = (dept.pengelolaan / maxValues.pengelolaan) * bobotPengelolaan;
        const nilaiKetepatan = (dept.ketepatan / maxValues.ketepatan) * bobotKetepatan;
        const nilaiAnggaran = (dept.anggaran / maxValues.anggaran) * bobotAnggaran;

        const totalNilai = nilaiKeaktifan + nilaiKerjaSama + nilaiPengelolaan + nilaiKetepatan + nilaiAnggaran;
        return { name: dept.name, totalNilai };
    });

    results.sort((a, b) => b.totalNilai - a.totalNilai);

    const resultBody = document.getElementById('result-body');
    resultBody.innerHTML = '';
    results.forEach(result => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${result.name}</td><td>${result.totalNilai.toFixed(2)}</td>`;
        resultBody.appendChild(row);
    });
}
