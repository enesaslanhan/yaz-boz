# Okey 101 – Baştan Tasarım Yenileme (UI/UX Redesign)

Mevcut Okey 101 Skor Takip uygulamasının tasarımını tamamen yenilemeni istiyorum.

Şu anki tasarım işlevsel açıdan başlangıç seviyesinde ancak görsel olarak oldukça basit. Sıradan bir web formu veya yönetim paneli gibi görünüyor.

Ben daha profesyonel, modern, premium hissiyat veren, mobil kullanım öncelikli bir ürün istiyorum.

Önemli: Mevcut uygulamanın çalışan özelliklerini, oyun mantığını, skor hesaplamalarını, ceza sistemini ve localStorage yapısını bozma. Bu görev öncelikli olarak UI/UX ve frontend tasarım yenilemesidir.

## 1. Tasarım konsepti

Uygulama için Dark Premium tasarım dili kullan.

Genel atmosfer:
- Modern
- Minimal
- Premium
- Dinamik
- Eğlenceli ama profesyonel
- Mobil uygulama kalitesinde

Renk paleti:
- Ana arka plan: #0B1220
- Kart arka planı: #151F2E
- İkincil yüzey: #1E293B
- Ana vurgu: #A3E635 (Neon Lime)
- İkincil vurgu: #22C55E
- Ana metin: #F8FAFC
- İkincil metin: #94A3B8
- Hata/ceza: #F87171

Neon renkleri ölçülü kullan. Her alanı parlak yapma. Özellikle aktif durumlar, önemli skorlar, butonlar ve kazanan göstergelerinde kullan.

Kartlarda hafif border, dengeli gölge ve yumuşak köşeler kullan.

Gereksiz gradient, aşırı animasyon ve karmaşık görsel efektlerden kaçın.

## 2. Mobile First yaklaşımı

Bu uygulama çoğunlukla cep telefonlarından kullanılacak.

Tasarımı önce 375px genişliğindeki mobil ekran için oluştur. Daha sonra tablet ve masaüstü ekranlara uyumlu hale getir.

Mobilde:
- İçerik ekranın tamamını verimli kullanmalı.
- Gereksiz boşluklar bulunmamalı.
- Butonlar kolay tıklanabilir boyutta olmalı.
- Formlar tek sütun halinde düzenlenmeli.
- Skorlar rahat okunmalı.
- Kullanıcı mümkün olduğunca az kaydırma ve tıklamayla işlemlerini yapabilmeli.
- Yatay taşma kesinlikle olmamalı.

Masaüstünde içerik daha geniş ve dengeli bir yerleşim kullanmalı. Ancak masaüstü tasarımı için mobil deneyimden ödün verme.

## 3. Ana sayfa tasarımı

Mevcut ana sayfayı sıradan iki karttan oluşan görünümden çıkar.

Üst bölümde:
- Modern bir logo veya Okey 101 simgesi
- Okey 101 Skor Takip başlığı
- Kısa ve şık bir açıklama

Ana içerikte Yeni Oyun alanı görsel olarak ön planda olmalı.

Tekli ve Eşli oyun seçimlerini sıradan butonlar yerine büyük, seçilebilir tasarım kartları olarak göster.

Kartların içinde:
- İlgili ikon
- Oyun modu ismi
- Kısa açıklama
- Seçili olduğunda neon lime border ve belirgin aktif durum

Oyuncu isimleri girilirken her oyuncuya ait alanları daha modern tasarla.

Toplam el sayısı alanını diğer alanlardan görsel olarak ayır.

Oyun Başlat butonu güçlü, dikkat çekici ve mobilde kolay erişilebilir olmalı.

Oyun Geçmişi bölümü de tasarıma dahil edilmeli. Geçmiş oyun yoksa sıradan bir metin yerine güzel bir boş durum tasarımı oluştur.

## 4. Oyun ekranı – En önemli bölüm

Oyun ekranına özel önem ver. Kullanıcı uygulamanın en fazla bu bölümünde zaman geçirecek.

Burada sıradan tablo tasarımından uzaklaş.

Üst bölümde:
- Oyun modu
- Oyun adı veya takım isimleri
- Mevcut el numarası
- Toplam el bilgisi
- Sayma eli / Son el gibi aşama göstergesi

bulunmalı.

### Skor kartları

Her oyuncu veya takım için modern skor kartları oluştur.

Kartlarda:
- Oyuncu veya takım adı
- Toplam normal skor
- Toplam ceza puanı
- Genel toplam
- Ceza ekleme butonu
- Skor giriş işlemi

bulunmalı.

Genel toplam rakamı kart içerisinde en belirgin bilgi olmalı.

Tekli oyunda dört oyuncu, eşli oyunda iki takım gösterilmeli.

Mobilde dört oyuncuyu rahat gösterebilmek için 2x2 kart düzenini değerlendir. Ekran boyutuna göre dikey kart düzenine geçebilirsin.

Eşli oyunda iki takım daha geniş kartlar içerisinde gösterilebilir.

### Skor girişi

Skor girişi için ayrı, modern bir modal veya bottom sheet tasarla.

Mobilde ekranın altından açılan bottom sheet tercih edilebilir.

Her oyuncunun veya takımın puanını kolayca girebileceği alanlar bulunmalı.

Sayısal klavye açılmasına uygun input kullan.

Kaydet butonu belirgin olmalı.

### Ceza sistemi

Ceza ekleme işlemini normal skor girişinden görsel olarak ayır.

Ceza ekleme alanında:
- Ceza eklenecek oyuncu veya takım
- Ceza puanı
- Onay butonu

bulunmalı.

Ceza işlemi için kırmızı tonları ölçülü kullan.

## 5. Sayma eli tasarımı

Sayma eli uygulamanın önemli aşamalarından biri.

Sayma eli başladığında bunu kullanıcıya özel bir ekran veya belirgin bir durum göstergesiyle bildir.

Bu ekranda:
- Bütün oyuncuların mevcut toplam puanları
- Ceza dahil genel toplamları
- Son elin başladığını anlatan bir gösterge

bulunmalı.

Son el aşaması görsel olarak normal ellerden farklı hissettirmeli.

Sayma eli aşamasında kullanıcı mevcut skorları kolayca karşılaştırabilmeli.

## 6. Oyun sonuç ekranı

Oyun tamamlandığında etkileyici bir sonuç ekranı oluştur.

Kazanan oyuncu veya takım görsel olarak öne çıkmalı.

Kazananı gösteren özel bir alan, kupa ikonu ve neon lime vurguları kullan.

Diğer oyuncuların sıralamasını da göster.

Her oyuncu için:
- Normal skor
- Ceza puanı
- Genel toplam

ayrı ayrı gösterilmeli.

El geçmişini açıp inceleyebileceği bir bölüm bulunmalı.

Sonuç ekranı hem mobilde hem masaüstünde düzgün görünmeli.

## 7. Oyun geçmişi tasarımı

Geçmiş oyunları modern liste veya kart görünümünde göster.

Her oyun kartında:
- Oyun türü
- Oyuncu veya takım isimleri
- Kazanan
- Tarih
- Toplam el sayısı

bulunsun.

Kullanıcı geçmiş oyunun detayına girebilmeli.

Silme işlemi için onay penceresi kullan.

## 8. Mikro etkileşimler

Uygulamanın daha kaliteli hissettirmesi için küçük animasyonlar kullan:

- Kart seçildiğinde hafif geçiş
- Butonlara basıldığında etkileşim
- Skor değiştiğinde kısa animasyon
- Modal açılış ve kapanış animasyonları
- Kazanan belirlendiğinde özel ama abartısız animasyon

Animasyonlar performansı düşürmemeli.

## 9. Teknik beklentiler

- Mevcut React ve JavaScript yapısını koru.
- Tailwind CSS kullanmaya devam et.
- Mevcut iş mantığını gereksiz yere değiştirme.
- Çalışan fonksiyonları kaldırma.
- Mevcut localStorage kayıtlarını bozmamaya dikkat et.
- Component yapısını düzenli hale getir.
- Tekrarlanan tasarım bileşenlerini ortak component haline getir.
- Responsive tasarımı gerçek ekran genişliklerine göre test et.
- Erişilebilirlik ve renk kontrastına dikkat et.

## 10. Çalışma şeklin

Önce mevcut projeyi ve component yapısını incele.

Ardından tasarımı bütün ekranlar için yenile.

Sadece ana sayfayı güzelleştirip diğer ekranları eski halinde bırakma. Yeni oyun, aktif oyun, skor girişi, sayma eli, oyun sonuçları ve oyun geçmişi dahil bütün ekranlar aynı tasarım dilini kullanmalı.

Mevcut işlevleri koruyarak doğrudan kod üzerinde çalış ve değişiklikleri uygula.

Sonuç olarak ortaya sıradan bir skor tablosu değil, gerçekten piyasaya sunulabilecek kalitede modern bir Okey 101 mobil web uygulaması çıkmasını istiyorum.