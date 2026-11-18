// Sayfadaki arama kutusu, filtreler ve masal penceresi
const searchInput = document.getElementById("search");
const storyCards = document.querySelectorAll(".story-card");
const filterButtons = document.querySelectorAll("[data-filter]");
const noResults = document.getElementById("empty");
let selectedFilter = "all";

// Arama kelimesine ve seçilen türe uyan masalları gösterir.
function showStories() {
  const searchWord = searchInput.value.toLocaleLowerCase("tr");
  let shownCount = 0;

  storyCards.forEach(function(card) {
    const cardText = card.innerText.toLocaleLowerCase("tr");
    const cardTags = card.dataset.tags.split(" ");
    const wordMatches = cardText.includes(searchWord);
    const filterMatches = selectedFilter === "all" || cardTags.includes(selectedFilter);

    if (wordMatches && filterMatches) {
      card.style.display = "flex";
      shownCount++;
    } else {
      card.style.display = "none";
    }
  });

  if (shownCount === 0) {
    noResults.style.display = "block";
  } else {
    noResults.style.display = "none";
  }
}

searchInput.addEventListener("input", showStories);

// Tür düğmelerinden birine basıldığında filtreyi değiştirir.
filterButtons.forEach(function(button) {
  button.addEventListener("click", function() {
    selectedFilter = button.dataset.filter;
    filterButtons.forEach(function(item) {
      item.classList.remove("active");
    });
    button.classList.add("active");
    showStories();
  });
});

// Arama kutusunu ve filtreyi sıfırlar.
document.getElementById("clearSearch").addEventListener("click", function() {
  searchInput.value = "";
  selectedFilter = "all";
  filterButtons.forEach(function(button) {
    button.classList.remove("active");
    if (button.dataset.filter === "all") button.classList.add("active");
  });
  showStories();
});

// Masal kartındaki anlatımı ayrı okuma penceresinde gösterir.
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");

const storyTexts = [
  "Bir varmış, bir yokmuş. Denizin kıyısında, küçük bir kulübede yaşayan yoksul bir balıkçı varmış. Her sabah erkenden denize açılır, ağını atar, tuttuğu balıkları satarak ailesinin geçimini sağlarmış. Bir gün ağına güneş gibi parlayan, pulları ışıl ışıl bir balık takılmış. Balıkçı böyle bir balığı daha önce hiç görmemiş. Balığı pazara götürmek üzereyken balık dile gelmiş: “Beni denize bırakırsan bir gün iyiliğinin karşılığını görürsün,” demiş. Balıkçı şaşırmış ama canlıya kıyamamış ve onu yeniden denize salmış.\n\nO sırada ülkenin padişahı ağır bir hastalığa yakalanmış, gözleri görmez olmuş. Saraydaki hekimler çare ararken bir derviş, yalnızca denizde yaşayan olağanüstü bir balıktan hazırlanacak merhemin padişahı iyileştirebileceğini söylemiş. Padişahın oğlu şehzade, balığı bulmak için yola çıkmış. Balıkçıya rastlayınca balığın çoktan denize bırakıldığını öğrenmiş. Şehzade, görevini tamamlayamadığı için saraya dönmeye çekinmiş ve yoluna devam etmiş.\n\nYolculuğu sırasında karşısına balıkçıya yardım eden gizemli bir yol arkadaşı çıkmış. Bu kişi, balıkçının merhametle denize bıraktığı balığın iyiliğini unutmamış; şehzadeye yol göstermiş, tehlikelerden kurtulmasına yardım etmiş. Şehzade, yol boyunca gücün yanında merhametin ve dostluğun da önemli olduğunu anlamış. Sonunda başına gelenlerden ders çıkararak evine dönmüş. Masal, canlılara iyilikle yaklaşmanın ve zor zamanda başkasına yardım etmenin değerini anlatır.",
  "Bir varmış, bir yokmuş. Bir ülkede gözleri görmeyen yaşlı bir padişah yaşarmış. Sarayın hekimleri ne yaptıysa onu iyileştirememiş. Bir gün saraya gelen bir derviş, padişahın derdine denizde yaşayan olağanüstü bir balığın çare olabileceğini söylemiş. Bunun üzerine padişahın oğlu, balığı bulmak için yola çıkmış.\n\nŞehzade deniz kıyısına vardığında balığın bir balıkçının ağına takıldığını, fakat balıkçının onu yeniden denize bıraktığını öğrenmiş. Şehzade balığı aramayı sürdürürken yol üzerinde Balta Bıyık adlı güçlü ve sıra dışı bir adamla karşılaşmış. Balta Bıyık, şehzadenin yolculuğuna katılmış; aklı ve gücüyle onu birçok sıkıntıdan kurtarmış. Birlikte gecelemek için gittikleri handa, kimsenin kalmaya cesaret edemediği bir yerle karşılaşmışlar. Balta Bıyık, handaki korkunç varlığı yenerek orayı güvenli hâle getirmiş.\n\nYolculukları sonunda bir başka ülkeye ulaşmışlar. Bu ülkenin güzel prensesiyle evlenmek isteyen talipler, düğün gecesinde açıklanamayan bir nedenle ölüyorlarmış. Şehzade de prensesle evlenmek istemiş. Balta Bıyık, gece boyunca olup biteni izleyerek prensesin ağzından çıkan yılanların talipleri öldürdüğünü anlamış. Yılanları ortadan kaldırıp prensesi bu korkunç durumdan kurtarmış.\n\nŞehzade prensesle evlenmiş. Balta Bıyık’ın yardımları sayesinde hem prensesin sırrı çözülmüş hem de şehzadenin yolculuğu başarıya ulaşmış. Şehzade ve prenses, yaşlı padişahı da iyileştirecek çareye kavuşmuş; sarayda yeniden sevinç başlamış. Balta Bıyık’ın cesareti ve iyiliği sayesinde herkes muradına ermiş.",
  "Hasan Lahnu adında bir değirmenci varmış. Bir akşam işini bitirince değirmeni temizlemeyi unutmuş. Gece olunca sessizce içeri giren bir tilki, un çuvallarının yanına sokulmuş ve karnını doyurmuş. Sabah değirmenci eksilen unu görünce şaşırmış. “Bunu yapanı bulmadan rahat edemem,” diyerek ertesi gece saklanıp beklemeye karar vermiş.\n\nGece yarısı tilki yine gelmiş. Değirmenci hemen önüne çıkıp onu yakalamış. Tilki canını bağışlaması için yalvarmış. “Beni bırakırsan sana büyük bir iyilik yaparım,” demiş. Değirmenci önce inanmasa da tilkiye bir şans vermiş. Tilki, değirmencinin bekâr olduğunu öğrenince ona bir eş bulacağına söz vermiş.\n\nKurnaz tilki, zengin bir köşkün sahibinin kızını ve uygun bir damat aradığını öğrenmiş. Değirmenciyi olduğundan daha varlıklı ve önemli biri gibi tanıtmış. Bir yandan köşk sahibine güzel sözler söylemiş, bir yandan da değirmenciye nasıl davranması gerektiğini öğretmiş. Değirmenci ilk başta bu oyunun içinde kendini tuhaf hissetmiş; fakat tilkinin planına uymuş. Karşılaştıkları her güçlükte tilki yeni bir yol bulmuş ve değirmenciyi zor durumdan çıkarmış.\n\nTilkinin kurnazlığı sayesinde değirmencinin hayatı değişmiş. Değirmenci de yalnızca güç kullanmanın değil, düşünmenin ve doğru zamanda doğru söz söylemenin de işe yaradığını görmüş. Masal, zekânın gücünü ve verilen sözün sorumluluğunu anlatır.",
  "Bir varmış, bir yokmuş. Fatmacık ile Yusufçuk adlı iki kardeş, annelerini kaybettikten sonra üvey anneleriyle yaşamaya başlamış. Üvey anneleri onlara kötü davranır, ev işlerini bitirmeden dinlenmelerine izin vermezmiş. Kardeşler bir gün bu evde daha fazla kalamayacaklarını anlayıp birlikte yola çıkmışlar. Birbirlerini yalnız bırakmayacaklarına söz vermişler.\n\nUzun süre yürüdükten sonra sık ağaçlarla dolu bir ormana varmışlar. Hava kararmaya başlayınca sığınacak bir yer aramışlar. Uzakta küçük bir ev görüp kapısını çalmışlar. Evde yaşayan yaşlı kadın onları içeri almış, yemek vermiş ve dinlenmelerini söylemiş. İlk başta güvenli bir yere geldiklerini sanmışlar. Fakat gece ilerledikçe kadının davranışları değişmiş; çocuklar onun bir cadı olduğunu ve kendilerine zarar vermek istediğini anlamışlar.\n\nFatmacık ile Yusufçuk korkmuşlar ama birbirlerinden ayrılmamışlar. Cadı uyuduğunda kaçmak için sessizce hazırlanmışlar. Ormandaki yolları bilmedikleri için dikkatli ilerlemeleri gerekiyormuş. Cadı arkalarından geldiğinde kardeşler birbirlerine yardım ederek izlerini kaybettirmeye çalışmışlar. Yorulduklarında bile durup birbirlerini beklemişler; sonunda cadının evinden uzaklaşmayı başarmışlar.\n\nYolculukları kolay olmamış ama kardeş sevgileri onlara güç vermiş. Masal, dayanışmanın, cesaretin ve tehlike karşısında dikkatli davranmanın önemini anlatır.",
  "Uzak bir ülkede, geceleri yıldızlar gibi parlayan incilerle süslü bir çadır varmış. Çadırın nereden geldiğini ve içinde kimin yaşadığını kimse bilmiyormuş. Bir gün genç bir kız, yolculuk sırasında bu çadıra rastlamış. İçeride, derin bir uykuya dalmış güzel bir delikanlı görmüş. Onu uyandırmaya kıyamamış; fakat gördüğü manzara aklından çıkmamış.\n\nKız, delikanlının kim olduğunu öğrenmek için yola koyulmuş. Yol boyunca karşılaştığı insanlara çadırı sormuş, bazen yanlış yönlere gitmiş, bazen de uzun yollar yürümüş. Her defasında yorulsa da arayışından vazgeçmemiş. Bir köyde yaşlı bir kadın ona çadırın yalnızca geceleri ortaya çıktığını ve onu arayan kişinin sabırlı olması gerektiğini söylemiş.\n\nKız, geceleri gökyüzünü izlemeyi ve çadırın ışığını aramayı öğrenmiş. Bir gece uzakta parlayan incileri görünce hemen oraya gitmiş. Bu kez çadırın içinde beklemek yerine çevresini dikkatle incelemiş. Delikanlının bir büyü nedeniyle uyuduğunu ve büyünün ancak doğru zamanda söylenecek bir sözle bozulabileceğini öğrenmiş. Kız, yaşlı kadının öğüdünü hatırlayıp delikanlıya seslenmiş. Delikanlı gözlerini açmış; uzun uykusundan uyanınca kızın sabrına teşekkür etmiş.\n\nİkisi çadırdan çıkıp yeni bir hayata başlamışlar. Masal, sabırlı olmanın, umudunu kaybetmemenin ve karşılaştığımız sırları anlamak için dikkatle düşünmenin önemini anlatır.",
  "Bir zamanlar çok zengin bir adamın oğlu varmış. Babası ona malını dikkatli kullanmasını ve çevresindeki insanları iyi tanımasını öğütlermiş. Fakat genç adam eğlenmeyi sever, parasını arkadaşlarıyla harcarmış. Etrafında sürekli kalabalık olur, herkes onu övermiş. Genç adam da bu insanların kendisini gerçekten sevdiğine inanırmış.\n\nBir süre sonra babası ölmüş. Genç adam, servetin başında kimse kalmadığı için parasını daha da savurganca harcamış. Gün gelmiş, evindeki değerli eşyalar satılmış, altınları tükenmiş. Bir zamanlar onun sofrasında oturan arkadaşları artık kapısını çalmaz olmuş. Genç adam yardım istemek için onların yanına gitmiş ama herkesin bir bahanesi varmış. O zaman, dost sandığı kişilerin çoğunun yalnızca parasını sevdiğini anlamış.\n\nYoksul kalınca çalışmak zorunda olduğunu fark etmiş. Önce küçük işlerde çalışmış, sonra kazandığını biriktirmeye başlamış. Artık para harcarken düşünür, yeni tanıştığı insanları yalnızca sözlerine göre değil, davranışlarına göre değerlendirirmiş. Gerçekten zor zamanında yanında kalan birkaç kişiyle dostluğunu sürdürmüş.\n\nGenç adam zamanla yeniden düzenli bir hayat kurmuş. Babasının öğütlerinin değerini çok geç anlamış olsa da hatalarından ders çıkarmış. Masal, gerçek dostluğun zor günlerde belli olduğunu ve savurganlığın insanı yalnız bırakabileceğini anlatır.",
  "Çok korkak bir adam varmış. En küçük sesten ürker, geceleri kapının önüne çıkmaya bile çekinirmiş. Bir gün evden uzaklaşmış ve yolunu kaybedince büyük bir saraya ulaşmış. Sarayın kırk devin evi olduğunu öğrenince korkudan titremiş. Kaçmaya kalkarsa yakalanacağını düşündüğü için cesur görünmeye karar vermiş. Devlerin karşısına çıkıp kendisinin onların dedesi olduğunu söylemiş.\n\nDevler adamın bu kadar rahat konuşmasına şaşırmışlar. Onun gerçekten çok güçlü biri olduğunu sanıp sarayda kalmasına izin vermişler. Bir süre sonra adamı sınamak istemişler. Önce ona ağır taşlar taşıtmayı, sonra güç gösterilerinde yarışmayı düşünmüşler. Adam devlerle kuvvet bakımından yarışamayacağını biliyormuş; bu yüzden her sınavda aklını kullanmış.\n\nDevler bir taşı sıkıp suyunu çıkarmasını isteyince adam cebindeki peyniri çıkarıp avucunda ezmiş. Peynirin suyu akınca devler onun taştan bile su çıkarabildiğine inanmış. Başka bir sınavda, kendisini dövdüklerini sanmaları için yatağına bir kütük yerleştirip saklanmış. Devler kütüğü dövüp adamı yendiklerini düşünmüşler; sabah onu karşılarında görünce şaşırmışlar.\n\nAdam her seferinde yeni bir oyunla kurtulmuş. Sonunda devler ona altın verip saraydan göndermişler. Adam eve döndüğünde korkusunun hâlâ var olduğunu ama aklını kullanınca güçlükleri aşabildiğini anlamış. Masal, zekânın bazen kuvvetten daha etkili olabileceğini anlatır.",
  "Fakir bir köylünün üç kızı varmış. Bir gün köylü şehre gitmeye hazırlanırken kızlarına ne getirmesini istediğini sormuş. Büyük kızları güzel kumaşlar ve takılar istemiş. Küçük kızı ise “Baba, bana bir lahana getirmen yeter,” demiş. Köylü şehirden dönerken kızının isteğini hatırlamış ve yol kenarındaki tarladan bir lahana almış.\n\nEve vardığında lahananın içinden büyük, beyaz bir leylek çıkmış. Leylek, küçük kızın kendisiyle gelmesini istemiş. Köylü ne yapacağını bilememiş; sonunda kız, babasının çaresizliğini görüp leylekle gitmeyi kabul etmiş. Leylek onu uzak bir kaleye götürmüş. Kız burada geceleri gizemli bir delikanlının ortaya çıktığını fark etmiş. Her gece kendisine verilen şerbeti içip uyuduğu için delikanlıyı göremiyormuş.\n\nBir gece şerbeti içmiş gibi yapıp uyumamış. Böylece delikanlıyı görmüş; ancak büyülü sırrı öğrendiği için delikanlı kaleden ayrılmış. Kız yalnız kalmış ama umudunu yitirmemiş. Yollara düşmüş, karşılaştığı insanlara yardım etmiş ve sonunda bir saraya ulaşmış. Sarayda ağır bir hastalığa yakalanan genç bir kadına yardım edebilmek için cesaretle hareket etmiş. İyiliği sayesinde yeni dostlar edinmiş ve kendi yolunu bulmuş.\n\nLeylek dadının gizemi çözülürken kızın sabrı ve iyiliği ona yol göstermiş. Masal, cesaretin, yardımseverliğin ve umudunu kaybetmemenin önemini anlatır.",
  "Bir yolculuğa çıkan beş kız, akşam olunca ormanda kalmış. Hava soğumuş, ağaçların arasından garip sesler gelmeye başlamış. Kızlar uzakta bir evin ışığını görünce kapısını çalmışlar. Evde yaşayan yaşlı kadın onları içeri buyur etmiş; yemek verip geceyi orada geçirebileceklerini söylemiş. Kızlar önce rahatlamışlar, fakat evin içinde tuhaf şeyler olduğunu kısa sürede fark etmişler.\n\nMitişik Kız, ev sahibinin davranışlarından kuşkulanmış. Kadının ayak izleri çok büyükmüş, sesi de zaman zaman korkunç bir uğultuya dönüşüyormuş. Kız, onun bir dev anası olabileceğini düşünmüş. Arkadaşlarına sessizce dikkatli olmalarını söylemiş. Gece herkes uyuyunca evin çevresini incelemiş ve kaçabilecekleri bir kapı bulmuş.\n\nTam kaçacakları sırada dev anası uyanmış. Kızlar birbirlerinin elini tutup ormana doğru koşmuşlar. Dev anası peşlerinden gelince Mitişik Kız arkadaşlarına dalların arasına saklanmalarını, sonra da farklı yönlere gitmek yerine birlikte ilerlemelerini söylemiş. Böylece birbirlerini kaybetmeden karanlık ormandan çıkmayı başarmışlar.\n\nSabah olduğunda güvenli bir köye ulaşmışlar. Mitişik Kız'ın dikkatli davranması ve arkadaşlarının birbirine yardım etmesi onları kurtarmış. Masal, tehlikeyi fark etmenin, soğukkanlı kalmanın ve birlikte hareket etmenin değerini anlatır.",
  "Bir köyde insanlara öğüt veren bilge bir derviş yaşarmış. Köylüler sıkıntıya düştüklerinde ona danışır, o da kimseyi kırmadan doğru yolu göstermeye çalışırmış. Fakat köyde yaşayan bir kadın, dervişin kendisine verdiği öğütlerden hoşlanmazmış. Bir gün öfkesi büyümüş ve dervişe kötülük yapmaya karar vermiş. Ona ikram etmek için zehir kattığı bir katmer hazırlamış.\n\nKadın katmeri dervişe götürmüş. Derviş, kadının yüzündeki telaşı fark etmiş ama bir şey söylememiş. Tam yiyecekken kapıdan aç ve yorgun bir asker geçmiş. Derviş askerin hâlini görünce katmeri ona vermiş. Asker teşekkür ederek yemeği almış ve yoluna devam etmiş.\n\nBir süre sonra kadın, askerin kendi oğlu olduğunu öğrenmiş. Oğlunun katmeri yediğini ve hastalandığını duyunca büyük bir korkuya kapılmış. Dervişe zarar vermek isterken kendi evladını tehlikeye attığını anlamış. Pişmanlıkla dervişin yanına koşup yaptığını itiraf etmiş. Derviş onu azarlamak yerine öfkesinin kendisini nasıl kör ettiğini anlatmış. Kadın hatasını kabul etmiş ve bir daha kimseye kötülük etmemeye söz vermiş.\n\nO günden sonra köyde insanlar öfkeyle karar vermemeye daha çok dikkat etmişler. Masal, kötülük niyetiyle yapılan işlerin masum insanlara zarar verebileceğini ve insanın davranışlarının sonuçlarını düşünmesi gerektiğini anlatır."
];

storyCards.forEach(function(card, index) {
  const readButton = card.querySelector(".read-btn");
  readButton.addEventListener("click", function() {
    modalTitle.textContent = card.dataset.title;
    modalText.textContent = storyTexts[index];
    modal.classList.add("open");
  });
});

// Kapatma düğmesi, pencerenin dışı veya Escape tuşu pencereyi kapatır.
function closeStory() {
  modal.classList.remove("open");
}
document.getElementById("closeModal").addEventListener("click", closeStory);
modal.addEventListener("click", function(event) {
  if (event.target === modal) closeStory();
});
document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") closeStory();
});
