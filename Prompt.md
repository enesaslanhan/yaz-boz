# Okey 101 Skor Takip Uygulaması

Sen deneyimli bir frontend developer ve UI/UX tasarımcısısın. Benden istenen, Okey 101 oyunu oynayan kişilerin skorlarını ve cezalarını kolayca takip edebileceği, modern ve kullanımı kolay bir web uygulaması geliştirmek.

Bu uygulama gerçek bir Okey 101 skor takip aracı olacak. Sadece görsel bir demo oluşturma; bütün butonlar, skor hesaplamaları, oyun akışı ve kayıt işlemleri gerçekten çalışmalı.

## 1. Teknoloji

- React
- JavaScript (TypeScript kullanma)
- Tailwind CSS
- Vite
- localStorage ile veri saklama
- Responsive tasarım

Backend, API veya üyelik sistemi oluşturma. İlk sürüm tamamen tarayıcı üzerinde çalışacak.

## 2. Ana sayfa ve oyun oluşturma

Kullanıcı siteye girdiğinde yeni oyun oluşturma ekranı karşısına çıkmalı.

İlk olarak oyun türünü seçmeli:

- Tekli Oyun
- Eşli Oyun

**Tekli oyun seçilirse:**
- 4 oyuncunun ismi girilmeli.
- Her oyuncu kendi adına yarışmalı.

**Eşli oyun seçilirse:**
- 2 takımın ismi girilmeli.
- Oyuncu isimleri istenmemeli.
- Her takım kendi adına yarışmalı.

Ardından kullanıcıya isteğe bağlı el sayısı belirleme alanı sunulmalı.

El sayısı girilmezse oyun sınırsız el mantığıyla başlamalı. Oyun ekranında Sayma Eli butonu bulunmalı.

El sayısı girilirse:
- Girilen el sayısı toplam oyun uzunluğu olmalı.
- Otomatik olarak toplam el sayısının bir eksiği sayma eli olarak belirlenmeli.
- Örneğin 10 el seçilmişse 9. el sayma eli, 10. el son el olmalı.

## 3. Oyun ekranı

Oyun ekranı uygulamanın en önemli bölümü.

Modern, sade, anlaşılır ve skor takibi yapmaya uygun bir tasarım oluştur.

Ekranda şunlar bulunmalı:

- Oyun türü
- Oyuncu veya takım isimleri
- Mevcut el numarası
- Normal skorlar
- Ceza puanları
- Genel toplamlar
- Skor giriş alanları
- Ceza ekleme butonları
- Sayma Eli butonu
- Oyunu Bitir butonu

### Skor sistemi

Her el sonunda oyuncuların veya takımların normal oyun puanları ayrı ayrı girilmeli.

Skor giriş ekranında her taraf için ayrı bir giriş alanı bulunmalı.

Girilen puanlar ilgili tarafın önceki normal skorlarına eklenmeli.

Skorlar el bazında saklanmalı. Böylece geçmiş ellerin skorları görüntülenebilmeli.

### Ceza sistemi

Ceza sistemi normal skorlardan tamamen bağımsız tutulmalı.

Her oyuncunun veya takımın yanında Ceza Ekle butonu bulunmalı.

Ceza ekleme işleminde:
- Ceza puanı elle girilebilmeli.
- Örneğin 101, 202 veya 404 puan eklenebilmeli.
- Ceza puanı ilgili oyuncuya veya takıma yazılmalı.
- Birden fazla ceza eklenebilmeli.

Ceza puanları normal skorlarla karıştırılmadan ayrı saklanmalı.

Ancak ekranda gösterilen genel toplam şu şekilde hesaplanmalı:

Genel Toplam = Normal Oyun Puanı + Ceza Puanı

Tekli oyunda cezalar oyunculara, eşli oyunda takımlara yazılmalı.

## 4. Sayma eli sistemi

Sayma eli uygulamanın önemli oyun mekaniklerinden biri.

Kullanıcı başlangıçta el sayısı belirtmemişse oyun ekranında Sayma Eli butonu bulunmalı.

Bu butona basıldığında:

1. Mevcut ana kadar oynanmış bütün ellerin normal skorları hesaplanmalı.
2. Eklenmiş bütün ceza puanları hesaba katılmalı.
3. Her oyuncunun veya takımın toplam puanı ekranda açıkça gösterilmeli.
4. Sayma eli aşamasına geçilmeli.
5. Son el oynanması için yeni bir skor giriş ekranı açılmalı.

Sayma eli, son elden önce oynanır. Sayma eli ekranında gösterilen puanlar o ana kadarki toplam puanlardır.

Sayma eli tamamlandıktan sonra son elin puanları girilmeli.

Son elin skorları da önceki puanlara eklenmeli ve kazanan belirlenmeli.

Başlangıçta el sayısı belirlenmişse bu süreç otomatik ilerlemeli. Örneğin 10 el seçildiyse 9. elde sayma eli aşaması, 10. elde son el aşaması uygulanmalı.

Sayma eli butonuna yanlışlıkla basılması ihtimaline karşı geri alma veya onay mekanizması bulunmalı.

## 5. Oyun sonuç ekranı

Oyun tamamlandığında ayrı bir sonuç ekranı göster.

Bu ekranda:

- Kazanan oyuncu veya takım
- Bütün oyuncuların/takımların normal skorları
- Toplam ceza puanları
- Ceza dahil genel toplam puanları
- Oynanan toplam el sayısı
- El el skor geçmişi

gösterilmeli.

Kazanan belirlenirken genel toplam puanlar karşılaştırılmalı. Okey 101'in standart mantığına göre en düşük toplam puana sahip taraf kazanır.

Eşitlik durumunda beraberlik gösterilmeli.

## 6. Oyun geçmişi

Tamamlanan oyunlar localStorage üzerinde saklanmalı.

Ana sayfada Oyun Geçmişi bölümü bulunmalı.

Kullanıcı:
- Önceki oyunlarını görebilmeli.
- Bir oyunun detaylarına girebilmeli.
- Oyun sonuçlarını tekrar görüntüleyebilmeli.
- İstediği oyunu silebilmeli.

Sayfa yenilendiğinde devam eden oyun da kaybolmamalı. Aktif oyun bilgileri de localStorage üzerinde tutulmalı.

## 7. UI/UX tasarım beklentileri

Uygulama profesyonel bir SaaS ürünü gibi görünmeli.

Tasarım özellikleri:
- Modern ve minimal tasarım
- Koyu yeşil, kırık beyaz ve antrasit tonları
- Okunabilir tipografi
- Büyük ve anlaşılır skor alanları
- Gereksiz animasyonlardan kaçınma
- Mobil, tablet ve masaüstü uyumluluğu
- Kullanımı kolay butonlar
- Hata ve onay bildirimleri

Oyun sırasında skor girmek çok kolay olmalı. Kullanıcı mümkün olduğunca az tıklamayla işlem yapabilmeli.

Özellikle mobil kullanım deneyimine önem ver.

## 8. Kod kalitesi

- Component bazlı mimari kullan.
- Oyun mantığını UI bileşenlerinden ayır.
- Skor hesaplamalarını ayrı fonksiyonlarda tut.
- Ceza ve normal skorları ayrı veri alanlarında sakla.
- localStorage işlemlerini merkezi bir yapı üzerinden yönet.
- Gereksiz kod tekrarlarından kaçın.
- Form doğrulamalarını uygula.
- Hatalı veya boş skor girişlerini kontrol et.
- Geri alma mekanizmasını düşün.
- Kod okunabilir ve geliştirilebilir olsun.

## 9. Geliştirme yaklaşımı

Öncelikle uygulamanın genel yapısını ve kullanıcı akışını oluştur.

Ardından bütün ekranları geliştir ve fonksiyonları birbirine bağla.

Sadece statik ekranlar üretme. Uygulama baştan sona kullanılabilir olmalı.

Özellikle aşağıdaki senaryoları test et:

1. Tekli oyun oluşturma ve 4 oyuncunun skorlarını takip etme.
2. Eşli oyun oluşturma ve 2 takımın skorlarını takip etme.
3. Bir oyuncuya veya takıma birden fazla ceza ekleme.
4. 10 el seçildiğinde 9. elin sayma eli, 10. elin son el olması.
5. El sayısı belirlemeden oyun başlatma ve manuel Sayma Eli butonunu kullanma.
6. Sayma eli sonrasında son el skorlarını girme.
7. Ceza puanlarının genel toplama doğru eklenmesi.
8. En düşük toplam puana sahip tarafın kazanması.
9. Sayfa yenilendiğinde aktif oyunun korunması.
10. Tamamlanan oyunların geçmişte görüntülenmesi.

Önce çalışan ve kaliteli bir MVP oluştur. Gereksiz özellikler ekleyerek projeyi karmaşıklaştırma.