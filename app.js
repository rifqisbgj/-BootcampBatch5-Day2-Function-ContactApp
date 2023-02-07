const fs = require('fs');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});
const Validator = require('validator');

const folder = './data'
if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
}

const filejson = './data/contacts.json'
if (!fs.existsSync(filejson)) {
    fs.writeFileSync(filejson, '[]', 'utf-8');
}

let inputanUser = (pertanyaan) => {
    return new Promise( function (resolve, reject){
        readline.question(pertanyaan, (jawabanUser) => {
            resolve(jawabanUser);
        });
    });
}

(async () => {
    let namaUser = await inputanUser("Apa nama mu? ");
    let emailUser = await inputanUser("Apa email mu? ");
    while (!Validator.isEmail(emailUser)) {
        console.log("Format email salah (Contoh: example@domain.com");
        emailUser = await inputanUser("Apa email mu? ");
    }

    let nohp = await inputanUser("Apa no hp mu? ");
    while (!Validator.isMobilePhone(nohp,'id-ID')) {
        console.log("Format nombor handphone salah (Contoh: 082xxxxxx");
        nohp = await inputanUser("Apa no hp mu? ");
    }

    let alamat = await inputanUser("Apa alamatmu? ");

    const dataUser = { 
        nama: namaUser,
        email: emailUser,
        no_hp: nohp,
        alamat: alamat
    }
    
    const rawData = fs.readFileSync('./data/contacts.json','utf-8');
    const user = JSON.parse(rawData);
    
    user.push(dataUser);
    
    fs.writeFileSync('./data/contacts.json', JSON.stringify(user));
    console.log(`Hai ${namaUser}, datamu sukses diproses dengan email ${emailUser}, nomor HP ${nohp}, dan alamatmu di ${alamat}`);

    readline.close();
    
})();