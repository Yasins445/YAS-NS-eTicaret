const wrapper = document.querySelector('.wrapper')
const basket = document.querySelector('.basket')





function startPage() {
    const sepet = JSON.parse(localStorage.getItem('sepet'))

    if(sepet){
        for(let i of sepet){
          sepeteEkle(i)
      }

    }else{
        localStorage.setItem('sepet','[]')
    }
}
startPage()

function sepeteEkle(urun) {

  
    const div = document.createElement('div')
    div.classList.add('d-flex','align-item-center','justify-content-between','p-2',`urun${urun.id}`)
    div.innerHTML=`
   
        <img src="${urun.resim}" width="100px" height="100px" alt="">
        <p class="m-0 ">${urun.isim}</p>
        <p class="m-0 fiyat ">${urun.fiyat * urun.adet}</p>
        <p class="m-0 "><span class="adet">${urun.adet}</span>x</p>
        <p class="m-0" onclick=sil(${urun.id}) >sil</p>
      </div>
    </div>
    `
    basket.append(div)
}
function sil(id){
 const div = document.querySelector(`.urun${id}`)
 let urunler =JSON.parse(localStorage.getItem('sepet'))
 let guncelHal =urunler.filter((urun,index)=>urun.id!=id)

 localStorage.setItem('sepet',JSON.stringify(guncelHal))
 div.remove()
 
}
let url = "https://dummyjson.com/products"

fetch(url)
    .then(res =>res.json())
    .then(data => dataYazdir(data))

function dataYazdir(bilgi){
    for(let i of bilgi.products){
        let yildizSayisi = Math.round(i.rating)

        const col = document.createElement('div')
        col.classList.add('col-lg-3', 'col-sm-6', 'col-12')
        let deneme = ``

        for(let i=1; i<yildizSayisi;i++){
            deneme += ` <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
        </svg>`
        }
        col.innerHTML=
        `
        <div class="card" id="${i.id}">
  <div class="card-header d-flex justify-content-between align-items-center ">

    <ol class="breadcrumb m-0">
      <li class="breadcrumb-item"><a href="#">${i.category}</a></li>
      <li class="breadcrumb-item active" aria-current="page"> ${(i.title).slice(0,10)} </li>
    </ol>

    <span class="d-flex">
        ${deneme}
       
       
    </span>
  </div>
  <div class="card-body p-0 ">
    <img class="w-100"  style="height: 300px;"  src=" ${i.thumbnail} " alt="">
   
    <div class="card-footer">
    <p class="isim">${i.title}</p>
    <p class="tasma"> <a href="kart.html">${i.description}</a></p>
    <p> <span class="fiyat">${i.price}</span>$</p>
    <button onclick=satinAl(${i.id}) class="btn btn-outline-primary">satın al </button>

    </div>
  </div>
  `
  wrapper.append(col)
    }
}

function satinAl(id){
    const card =document.getElementById(id)

    

    const isim = card.querySelector('.isim').textContent
    const fiyat = card.querySelector('.fiyat').textContent
    const resim = card.querySelector('img').src
    

    const urun = {
        'id':id,
        'isim':isim,
        'fiyat':fiyat,
        'resim':resim,
        'adet':1
    
    }
   let urunler = JSON.parse(localStorage.getItem('sepet'))
   let ilgiliUrun = urunler.find(i => i.id == urun.id)
   if(ilgiliUrun==undefined){
    urunler.push(urun)

   }else if(ilgiliUrun){
    ilgiliUrun.adet +=1
   }
   const sepettekiCard = basket.querySelector(`.urun${id}`)
   console.log(sepettekiCard)
   if(sepettekiCard !=null){
    const adet =sepettekiCard.querySelector('.adet')
    const price =sepettekiCard.querySelector('.fiyat')
    
   let art = Number(adet.textContent)
   art++
   
   let guncelFiyat = fiyat * art
   adet.textContent = art
   price.textContent = guncelFiyat
   console.log(adet)

   }else{
    sepeteEkle(urun)
   }
   localStorage.setItem('sepet',JSON.stringify(urunler))
}
// ! BUNU EKLEYİNCE SEPET SAYFASINDA ÇIKTI ALABİLDİM
function startPage() {
  try {
      const sepet = JSON.parse(localStorage.getItem('sepet'));
      // ... devam eden kodlar ...
  } catch (error) {
      console.error('LocalStorage hatası:', error);
      // Hata durumunda temizleme veya uygun bir işlem yapabilirsiniz.
  }
}

// Diğer fonksiyonlarda da benzer hata kontrollerini ekleyebilirsiniz.





document.addEventListener('DOMContentLoaded', function() {
  // Sayfa yüklendiğinde çalışacak olan fonksiyon
  sepetiYukle();
});

function sepetiYukle() {
  // Local Storage'dan sepet verisini al
  const sepetVerisi = JSON.parse(localStorage.getItem('sepet'));
  const sepetMain =document.querySelector('.sepet-main')
  // Sepet-main elementini seç
  const sepetMainElementi = document.querySelector('.sepet-main');

  // Eğer sepet verisi varsa, her bir ürün için bir kart oluştur ve sepet-main içine ekle
  if (sepetVerisi) {
      sepetVerisi.forEach(urun => {
          sepetMainElementi.appendChild(olusturUrunKarti(urun));
      });
  } else {
      // Sepet boşsa bir mesaj ekle
      sepetMainElementi.textContent = 'Sepetiniz boş';
  }
}

function olusturUrunKarti(urun) {
  // Ürün kartını oluştur
  const kart = document.createElement('div');
  kart.classList.add('urun-karti');

  // Kart içeriğini oluştur
  kart.innerHTML = `
      <img src="${urun.resim}" alt="${urun.isim}" class="urun-resmi">
      <p class="urun-isim">${urun.isim}</p>
      <p class="urun-fiyat">${urun.fiyat} $</p>
      <!-- Diğer ürün bilgileri buraya eklenebilir -->

      <button onclick="sepettenCikar(${urun.id})">Sepetten Çıkar</button>
  `;

  return kart;
}

function sepettenCikar(urunId) {
  // Sepet verisini Local Storage'dan al
  let sepetVerisi = JSON.parse(localStorage.getItem('sepet'));

  // Veriden çıkartılacak ürünü bul
  const guncelSepet = sepetVerisi.filter(urun => urun.id !== urunId);

  // Güncellenmiş sepet verisini Local Storage'a geri yaz
  localStorage.setItem('sepet', JSON.stringify(guncelSepet));

  // Sayfayı yenile
  location.reload();
}


//! sepetbutondinleme

const sepetButon =document.getElementById('sepet')

sepetButon.addEventListener('click',goster)

function goster(){
  basket.classList.toggle('basketaktif')
}
// !bu kısım hiç yardım alınmadan kurulmuştur.



// KAYIT OLMAK İÇİN
function kayitOl() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

 
  localStorage.setItem('kullanici', JSON.stringify({ username, password }));

  alert('Kayıt başarıyla tamamlandı!');
}


//!GİRİŞ YAPMAK İÇİN
function girisYap() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Local storage'dan kullanıcı bilgilerini al
  const kayitliKullanici = JSON.parse(localStorage.getItem('kullanici'));

  // Kullanıcı adı ve şifreyi kontrol et
  if (kayitliKullanici && username === kayitliKullanici.username && password === kayitliKullanici.password) {
      alert('Giriş başarılı!');
  } else {
      alert('Kullanıcı adı veya şifre hatalı!');
  }
}
