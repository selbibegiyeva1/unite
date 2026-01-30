import { useState } from 'react';
import { type ProductGroupForm } from '../../../services/authService';
import { useTranslation } from '../../../hooks/useTranslation';

interface ProductFaqProps {
    productForm: ProductGroupForm;
    activeTab: 'popolnenie' | 'voucher';
}

function ProductFaq({ productForm, activeTab }: ProductFaqProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const { lang } = useTranslation();

    const toggleFaq = (index: number) => {
        setOpenIndex((prev) => (prev === index ? null : index));
    };

    // FAQ data for Steam product on 'popolnenie' tab (Russian)
    const steamTopupFaqsRu = [
        {
            question: "Что такое логин Steam?",
            content: (
                <div className='text-[14px]'>
                    <p className="text-[#00000099] font-medium">
                        Это комбинация букв, цифр и знака «_», которую вы указываете при входе в Steam. 
                        <br />Если вы введете неверный логин — деньги уйдут другому пользователю с этим логином.
                    </p>
                    <br />
                    <p className="text-[#00000099] font-bold">
                        Важно: точка продаж и клиент несут ответственность за корректность указания логина Steam.
                    </p>
                </div>
            ),
        },
        {
            question: "Как узнать регион своего аккаунта Steam?",
            content: (
                <div className='text-[14px]'>
                    <p className="text-[#00000099] font-medium">
                        Вы можете проверить регион своего аккаунта через сайт или приложение Steam (также мобильное):
                    </p>
                    <ol className="text-[#00000099] font-medium list-decimal list-inside">
                        <li>В правом верхнем углу нажмите на имя своего профиля</li>
                        <li>В выпадающем меню выберите "Об аккаунте: ..."</li>
                        <li>Найдите поле "Страна"</li>
                        <li>В строке «Страна» будет указан ваш текущий регион.</li>
                    </ol>
                </div>
            ),
        },
        {
            question: "Аккаунты Steam каких стран можно пополнить?",
            content: (
                <div className='text-[14px]'>
                    <p className="text-[#00000099] font-medium">
                        Пополнение игрового баланса с минимальной комиссией доступно для пользователей следующих стран:
                    </p>
                    <br />
                    <ul className="text-[#00000099] font-medium list-disc list-inside">
                        <li>Россия</li>
                        <li>Туркменистан</li>
                        <li>Азербайджан</li>
                        <li>Армения</li>
                        <li>Беларусь</li>
                        <li>Казахстан</li>
                        <li>Кыргызстан</li>
                        <li>Молдова</li>
                        <li>Таджикистан</li>
                        <li>Узбекистан</li>
                    </ul>
                </div>
            ),
        },
        {
            question: "Как пополнить новый аккаунт Steam?",
            content: (
                <div className='text-[14px]'>
                    <p className="text-[#00000099] font-medium">
                        При первом пополнении нового аккаунта есть риск сменить страну магазина Steam. Он может стать, к примеру, казахстанским, то цены везде будут в тенге.
                    </p>
                    <br />
                    <p className="text-[#00000099] font-medium">
                        Чтобы этого избежать, следуйте инструкции:
                    </p>
                    <ol className="text-[#00000099] font-medium list-decimal list-inside">
                        <li>Войдите в свой аккаунт Steam в браузере или программе. Не используйте VPN — иначе домашний регион аккаунта сменится, цены на товары Steam будут указаны в другой валюте.</li>
                        <li>Добавьте на аккаунт минимум две бесплатные игры. Например, PUBG и Dota 2. Можно добавлять игры через библиотеку Steam в приложении на смартфоне.</li>
                        <li>Играйте не менее 2-3 часов в добавленных играх.</li>
                        <li>Пополните аккаунт на минимальную сумму — 100 манат.</li>
                    </ol>
                </div>
            ),
        },
        {
            question: "Можно ли вернуть деньги после пополнения?",
            content: (
                <p className="text-[#00000099] font-medium text-[14px]">
                    К сожалению, это невозможно. Средства зачисляются на Steam-кошелёк мгновенно.
                </p>
            ),
        },
        {
            question: "Как быстро зачисляются деньги на игровой кошелек Steam?",
            content: (
                <div className='text-[14px]'>
                    <p className="text-[#00000099] font-medium">
                        Деньги поступят в Стим в течение 15 минут. В редких случаях — до 2 часов.
                    </p>
                    <br />
                    <p className="text-[#00000099] font-medium">
                        Если деньги не пришли в течение нескольких часов, напишите нам в поддержку указанную в письме. Мы проверим платёж и постараемся помочь.
                    </p>
                </div>
            ),
        },
        {
            question: "Можно ли вернуть деньги, если ошибся в логине при пополнении Steam?",
            content: (
                <p className="text-[#00000099] font-medium text-[14px]">
                    Если введенный логин существует — деньги вернуть не получится.
                </p>
            ),
        },
        {
            question: "Если платёж отменен по техническим причинам?",
            content: (
                <p className="text-[#00000099] font-medium text-[14px]">
                    Проведение платежа может быть недоступно по техническим причинам при обновлении сервиса, попробуйте выполнить операцию позже.
                </p>
            ),
        },
    ];

    // FAQ data for Steam product on 'popolnenie' tab (Turkmen)
    const steamTopupFaqsTm = [
        {
            question: 'Steam logini näme?',
            content: (
                <div className='text-[14px]'>
                    <p className="text-[#00000099] font-medium">
                        Bu Steam-e girmek üçin ulanýan harplaryň, sanlaryň we «_» nyşanynyň birleşmesidir.
                        <br />
                        Eger login nädogry girizilseňiz, serişdeler şol logini bolan başga bir ulanyjynyň hasabyna gider.
                    </p>
                    <br />
                    <p className="text-[#00000099] font-bold">
                        Möhüm: satuw nokady hem-de müşderi Steam loginiň dogry görkezilmegine jogapkärçilik edýär.
                    </p>
                </div>
            ),
        },
        {
            question: 'Steam hasabymyň sebitini nädip bilmeli?',
            content: (
                <div className='text-[14px]'>
                    <p className="text-[#00000099] font-medium">
                        Hasabyňyzyň sebitini Steam saýty ýa-da goýbermesi (mobil goşundy hem bolup biler) arkaly barlap bilersiňiz:
                    </p>
                    <ol className="text-[#00000099] font-medium list-decimal list-inside">
                        <li>Sag ýok burçda profil adyňyza basyň.</li>
                        <li>Açylan menýuda «Hasap barada ...» diýen bölümi saýlaň.</li>
                        <li>«Ýurt» diýen meýdany tapyň.</li>
                        <li>Şol ýerde häzirki sebitiňiz görkeziler.</li>
                    </ol>
                </div>
            ),
        },
        {
            question: 'Haýsy ýurtlaryň Steam hasaplaryny dolduryp bolýar?',
            content: (
                <div className='text-[14px]'>
                    <p className="text-[#00000099] font-medium">
                        Iň pes komissiýa bilen oýun balansyny aşakdaky ýurtlaryň ulanyjylary üçin dolduryp bolýar:
                    </p>
                    <br />
                    <ul className="text-[#00000099] font-medium list-disc list-inside">
                        <li>Russiýa</li>
                        <li>Türkmenistan</li>
                        <li>Azerbaýjan</li>
                        <li>Ermenistan</li>
                        <li>Belarus</li>
                        <li>Gazagystan</li>
                        <li>Gyrgyzystan</li>
                        <li>Moldowa</li>
                        <li>Täjigistan</li>
                        <li>Özbegistan</li>
                    </ul>
                </div>
            ),
        },
        {
            question: 'Täze Steam hasabyny nähili doldurmaly?',
            content: (
                <div className='text-[14px]'>
                    <p className="text-[#00000099] font-medium">
                        Ilkinji gezek täze hasaby dolduranyňyzda Steam dükanynyň sebitini tötänleýin üýtgetmek howpy bar. Mysal üçin, Gazagystan saýlanyp biler we bahalar tenňede görkeziler.
                    </p>
                    <br />
                    <p className="text-[#00000099] font-medium">
                        Munuň öňüni almak üçin, aşakdaky görkezmelere eýeriň:
                    </p>
                    <ol className="text-[#00000099] font-medium list-decimal list-inside">
                        <li>
                            Steam hasabyňa brauzer ýa-da programma arkaly giriň. VPN ulanmaň — başga sebit saýlanyp, bahalar
                            başga walýutada görkezilip bilner.
                        </li>
                        <li>
                            Hasaba azyndan iki mugt oýny goşuň. Mysal üçin, PUBG we Dota 2. Oýunlary smartfonuňyzdaky Steam
                            kitaplygynyň üsti bilen hem goşup bilersiňiz.
                        </li>
                        <li>Goşulan oýunlarda azyndan 2–3 sagat oýnaň.</li>
                        <li>Hasaby iň az 100 manada çenli dolduryň.</li>
                    </ol>
                </div>
            ),
        },
        {
            question: 'Hasaby doldurgandan soň puly yzyna gaýtarıp bolýarmy?',
            content: (
                <p className="text-[#00000099] font-medium text-[14px]">
                    Gynansak-da, bolmaýar. Pul Steam hamana dessine geçýär.
                </p>
            ),
        },
        {
            question: 'Steam oýun hamany näçe wagtda doldurylýar?',
            content: (
                <div>
                    <p className="text-[#00000099] font-medium text-[14px]">
                        Pul adatda 15 minudyň dowamynda Steam-a geçýär. Seýrek ýagdaýlarda — 2 sagada çenli dowam edip biler.
                    </p>
                    <br />
                    <p className="text-[#00000099] font-medium text-[14px]">
                        Eger birnäçe sagadyň dowamynda pul gelmese, hatda görkezilen goldaw hyzmatyna ýazyp bilersiňiz. Tölegi
                        barlarys we kömek etmäge synanyşarys.
                    </p>
                </div>
            ),
        },
        {
            question: 'Steam doldurylanda logini ýalňyş girizsem, puly yzyna alyp bilerminem?',
            content: (
                <p className="text-[#00000099] font-medium text-[14px]">
                    Eger girizilen login eýýäm bar bolsa, serişdeleri yzyna gaýtarmak mümkin bolmaz.
                </p>
            ),
        },
        {
            question: 'Töleg tehniki sebäplere görä ýatyrylandygy barada ýazsa näme etmeli?',
            content: (
                <p className="text-[#00000099] font-medium text-[14px]">
                    Töleg hyzmatynyň täzelemegi sebäpli wagtlaýyn tehniki näsazlyk bolup biler. Biraz wagt soň gaýtadan synanyşyň.
                </p>
            ),
        },
    ];

    // FAQ data for 'voucher' tab (any product) (Russian)
    const voucherFaqsRu = [
        {
            question: "Что такое ваучер?",
            content: (
                <p className="text-[#00000099] font-medium text-[14px]">
                    Ваучер — уникальная комбинация из цифр и букв. У ваучера есть денежный номинал, который зачисляется на игровой кошелек при активации.
                </p>
            ),
        },
        {
            question: "Есть ли ограничения по региону?",
            content: (
                <p className="text-[#00000099] font-medium text-[14px]">
                    Да, каждый ваучер привязан к определённому региону. 
                    <br />При покупке регион указывается заранее. 
                    <br /><br />
                    Если клиент ошибся при выборе региона, замена кода невозможна — выбирайте внимательно.
                </p>
            ),
        },
        {
            question: "Как я получу ваучер после оплаты?",
            content: (
                <div className='text-[14px]'>
                    <p className="text-[#00000099] font-medium text-[14px]">
                        После успешной оплаты, ваучер и инструкция по активации придет в течение 3-15 минут на ваш е-mail указанный при заполнении.
                    </p>
                    <br />
                    <p className="text-[#00000099] font-bold text-[14px]">
                        Важно: точка продаж и клиент несут ответственность за корректность указания email. <br />Если была допущена ошибка в написании адреса, система отправит ваучер на неверную почту, и это не является техническим сбоем.
                    </p>
                </div>
            ),
        },
        {
            question: "Что делать, если не пришло письмо с ваучером?",
            content: (
                <div className='text-[14px]'>
                    <p className="text-[#00000099] font-medium text-[14px]">
                        Первоначально проверьте в почте папку «Спам», «Промоакции» и «Рассылки». 
                        <br /><br />Убедитесь, что адрес почты был указан без ошибок.
                    </p>
                    <br />
                    <p className="text-[#00000099] font-medium text-[14px]">
                        Если была допущена ошибка в указании почты при оформлении, точка продаж может вручить ваучер клиенту лично и передать код вручную. 
                        <br />В истории транзакции будет доступна отдельная ссылка <span className="text-[#2D85EA]">"QR/Инструкция"</span>, по которому продавец может получить код активации и выдать его клиенту.
                    </p>
                </div>
            ),
        },
        {
            question: "Можно ли вернуть деньги за ваучер после покупки?",
            content: (
                <div>
                    <p className="text-[#00000099] font-medium text-[14px]">
                        К сожалению, нет. Ваучер невозвратный.
                    </p>
                    <br />
                    <p className="text-[#00000099] font-medium text-[14px]">
                        Если ваучер окажется недействительным, мы проведём проверку и предоставим новый рабочий код.
                    </p>
                </div>
            ),
        },
        {
            question: "Как долго действует ваучер?",
            content: (
                <p className="text-[#00000099] font-medium text-[14px]">
                    Срок действия не ограничен — вы можете активировать его в любое время.
                </p>
            ),
        },
        {
            question: "Что делать, если система пишет, что код уже активирован?",
            content: (
                <p className="text-[#00000099] font-medium text-[14px]">
                    Обратитесь в поддержку указанную в письме. Мы проверим код у поставщика и при подтверждении проблемы заменим его на новый.
                </p>
            ),
        },
        {
            question: "Можно ли купить ваучер в подарок?",
            content: (
                <p className="text-[#00000099] font-medium text-[14px]">
                    Да, вы можете указать любой еmail получателя или переслать письмо с кодом вручную.
                </p>
            ),
        },
    ];

    // FAQ data for 'voucher' tab (any product) (Turkmen)
    const voucherFaqsTm = [
        {
            question: 'Voucher näme?',
            content: (
                <p className="text-[#00000099] font-medium text-[14px]">
                    Voucher — sanlardan we harpdan ybarat özboluşly kombinasiýa. Voucheriň pul bahasy bar we ol işjeňleşdirilende
                    oýun hamanyna geçirilýär.
                </p>
            ),
        },
        {
            question: 'Sebit boýunça çäklendirmeler barmy?',
            content: (
                <p className="text-[#00000099] font-medium text-[14px]">
                    Hawa, her bir voucher belli bir sebite baglanan.
                    <br />
                    Satyn alanyňyzda sebit öňünden görkezilýär.
                    <br />
                    <br />
                    Eger müşderi sebit saýlanylşynda ýalňyşsa, kody çalşyp bolmaýar — üns bilen saýlaň.
                </p>
            ),
        },
        {
            question: 'Tölegden soň voucheri nädip alaryn?',
            content: (
                <div className='text-[14px]'>
                    <p className="text-[#00000099] font-medium text-[14px]">
                        Töleg üstünlikli tamamlanylandan soň, voucher we ony işjeňleşdirmegiň görkezmesi 3–15 minutyň dowamynda
                        forma doldurylanda görkezilen e-mail salgyňa iberiler.
                    </p>
                    <br />
                    <p className="text-[#00000099] font-bold text-[14px]">
                        Möhüm: satuw nokady hem-de müşderi e-mail salgyň dogry görkezilmegine jogapkär.{' '}
                        <br />
                        Eger salgyda ýalňyşlyk goýberilse, ulgam voucheri nädogry poçta salgysyna iberer we bu tehniki näsazlyk
                        hasaplanmaýar.
                    </p>
                </div>
            ),
        },
        {
            question: 'Voucher bilen hat gelmedik bolsa näme etmeli?',
            content: (
                <div className='text-[14px]'>
                    <p className="text-[#00000099] font-medium text-[14px]">
                        Ilki bilen poçtaňyzda «Spam», «Promosiýalar» we «Bölşedişler» ýaly bukjalary barlaň.
                        <br />
                        <br />
                        Poçta salgysynyň nädogry girizilmedigine göz ýetiriň.
                    </p>
                    <br />
                    <p className="text-[#00000099] font-medium text-[14px]">
                        Eger forma doldurylanda poçta nädogry ýazylan bolsa, satuw nokady voucheri müşderä el bilen berip
                        biler.
                        <br />
                        Tranzaksiýa taryhynyň içinde aýratyn <span className="text-[#2D85EA]">«QR/Görkezme»</span> diýen
                        baglanyşyk elýeterli bolýar, şonuň üsti bilen satyjy işjeňleşdiriş koduny alyp, müşderä ýetirip biler.
                    </p>
                </div>
            ),
        },
        {
            question: 'Satyn alnan voucheriň puluny yzyna gaýtaryp bolýarmy?',
            content: (
                <div>
                    <p className="text-[#00000099] font-medium text-[14px]">
                        Gynansak-da, ýok. Voucher yzyna gaýtarylmaýar.
                    </p>
                    <br />
                    <p className="text-[#00000099] font-medium text-[14px]">
                        Eger voucher işlemeýän bolsa, biz barlag geçireris we tassyklanan ýagdaýynda täze, işjeň kod bereris.
                    </p>
                </div>
            ),
        },
        {
            question: 'Voucher näçe wagt hereketde bolýar?',
            content: (
                <p className="text-[#00000099] font-medium text-[14px]">
                    Möhlet çäklendirilmedik — ony islendik wagtda işjeňleşdirip bilersiňiz.
                </p>
            ),
        },
        {
            question: 'Ulgam kod eýýäm işjeňleşdirildi diýip ýazsa näme etmeli?',
            content: (
                <p className="text-[#00000099] font-medium text-[14px]">
                    Hatda görkezilen goldaw hyzmatyna ýüz tutuň. Biz kody üpjünçiden barlarys we mesele tassyk edilse, ony täze
                    koda çalyşarys.
                </p>
            ),
        },
        {
            question: 'Voucheri sowgat hökmünde satyn alyp bolýarmy?',
            content: (
                <p className="text-[#00000099] font-medium text-[14px]">
                    Hawa, alyjy üçin islendik e-mail salgysyny görkezmek ýa-da kody özüňiz hat arkaly iberip bilersiňiz.
                </p>
            ),
        },
    ];

    // Choose language-specific FAQ sets
    const steamTopupFaqs = lang === 'tm' ? steamTopupFaqsTm : steamTopupFaqsRu;
    const voucherFaqs = lang === 'tm' ? voucherFaqsTm : voucherFaqsRu;

    // Determine which FAQs to show
    const isSteam = productForm.group === 'Steam';
    const isSteamPopolnenie = isSteam && activeTab === 'popolnenie';

    let currentFaqs = [];
    if (isSteamPopolnenie) {
        currentFaqs = steamTopupFaqs;
    } else if (activeTab === 'voucher') {
        currentFaqs = voucherFaqs;
    } else {
        // For other products on 'popolnenie' tab, don't show FAQs
        return null;
    }

    if (currentFaqs.length === 0) {
        return null;
    }

    return (
        <div className='max-w-[1158px]'>
            <p className="text-[32px] font-bold mb-6">FAQ</p>
            <div className="flex flex-col gap-4">
                {currentFaqs.map((faq, index) => {
                    const isOpen = openIndex === index;
                    return (
                        <button
                            key={index}
                            type="button"
                            onClick={() => toggleFaq(index)}
                            className="cursor-pointer text-left w-full px-5 py-6"
                        >
                            <div className="flex items-center justify-between gap-4">
                                <p className="font-medium text-left">{faq.question}</p>
                                <svg 
                                    width="24" 
                                    height="24" 
                                    viewBox="0 0 24 24" 
                                    fill="none" 
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`transition-transform duration-200 shrink-0 ${isOpen ? "rotate-180" : "rotate-0"}`}
                                >
                                    <path d="M18.9882 9C19.8882 9 20.3382 10.077 19.7022 10.706L16.5722 13.802C14.4182 15.934 13.3402 17 12.0002 17C10.6602 17 9.58319 15.934 7.42719 13.802L4.29819 10.706C3.66119 10.076 4.11219 9 5.01319 9C5.28019 9 5.53719 9.105 5.72719 9.293L8.85719 12.388C9.97519 13.494 10.6722 14.178 11.2462 14.611C11.7632 15.001 11.9432 15.001 11.9972 15.001H12.0032C12.0562 15.001 12.2372 15.001 12.7542 14.611C13.3282 14.179 14.0262 13.494 15.1442 12.388L18.2732 9.293C18.4636 9.10498 18.7206 8.99969 18.9882 9Z" fill="#626C77" />
                                </svg>
                            </div>
                            {isOpen && (
                                <div className='pt-4'>
                                    {faq.content}
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default ProductFaq;
