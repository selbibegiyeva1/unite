import { useState } from 'react';
import { useTranslation } from '../../../hooks/useTranslation';

function EsimFaq() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const { lang } = useTranslation();

    const toggleFaq = (index: number) => {
        setOpenIndex((prev) => (prev === index ? null : index));
    };

    const faqsRu = [
        {
            question: 'Что такое eSIM?',
            content: (
                <p className="text-[#00000099] font-medium">
                    Это цифровой QR‑код для установки профиля eSIM иностранных операторов только за рубежом.
                    <br /><br />
                    Продукт предоставляет <b>мобильный интернет‑доступ в поездках, не включает голос/звонки и SMS,
                        не выдаёт местный номер</b> и не работает внутри Туркменистана.
                </p>
            ),
        },
        {
            question: 'С какими устройствами работает eSIM?',
            content: (
                <div className="text-[#00000099] font-medium">
                    <p>
                        eSIM поддерживается на современных устройствах iPhone, iPad и Android.
                    </p>
                    <br />
                    <p>
                        Чтобы проверить, поддерживает ли ваше устройство eSIM, наберите <span className="font-bold">*#06#</span> в режиме набора номера.
                        Если вы видите номер <span className="font-bold">EID</span> — можно установить eSIM.
                    </p>
                    <br />
                    <p className="font-bold">
                        Важно: перед покупкой обязательно убедитесь, что модель телефона работает с eSIM.
                        Ответственность за эту проверку лежит на покупателе и продавце.
                    </p>
                </div>
            ),
        },
        {
            question: 'Можно ли вернуть деньги за eSIM после покупки?',
            content: (
                <p className="text-[#00000099] font-medium">
                    К сожалению, нет. eSIM невозвратный.
                </p>
            ),
        },
        {
            question: 'Как я получу eSIM после оплаты?',
            content: (
                <div className="text-[#00000099] font-medium">
                    <p>
                        После успешной оплаты QR‑код и инструкция по активации придут в течение 3–15 минут
                        на e‑mail, указанный при заполнении.
                    </p>
                    <br />
                    <p className="font-bold">
                        Важно: точка продаж и клиент несут ответственность за корректность указания e‑mail.
                        <br />
                        Если была допущена ошибка в написании адреса, система отправит ваучер на неверную почту,
                        и это не является техническим сбоем.
                    </p>
                </div>
            ),
        },
        {
            question: 'Что делать, если не пришло письмо с QR‑кодом?',
            content: (
                <div className="text-[#00000099] font-medium">
                    <p>
                        Первоначально проверьте в почте папку «Спам», «Промоакции» и «Рассылки». <br />
                        <br />Убедитесь, что адрес почты был указан без ошибок.
                    </p>
                    <br />
                    <b>
                        Если была допущена ошибка в указании почты при оформлении, точка продаж может выдать ваучер
                        клиенту лично и передать код вручную. <br />В истории транзакций будет доступна отдельная ссылка
                        <span className="text-[#2D85EA]"> «QR/Инструкция»</span>, по которой продавец может получить
                        код активации и выдать его клиенту.
                    </b>
                </div>
            ),
        },
        {
            question: 'С какого момента отсчитывается срок действия eSIM?',
            content: (
                <p className="text-[#00000099] font-medium">
                    eSIM начинает работать с момента подключения к поддерживаемой сети.
                </p>
            ),
        },
        {
            question: 'Что делать, если система пишет, что код уже активирован?',
            content: (
                <p className="text-[#00000099] font-medium">
                    Обратитесь в поддержку, указанную в письме. Мы проверим код у поставщика и при подтверждении
                    проблемы заменим его на новый.
                </p>
            ),
        },
        {
            question: 'В Туркменистане я могу использовать eSIM?',
            content: (
                <p className="text-[#00000099] font-medium">
                    Нет, это невозможно. eSIM работает только в той стране, для которой она была выпущена.
                </p>
            ),
        },
    ];

    const faqsTm = [
        {
            question: 'eSIM näme?',
            content: (
                <p className="text-[#00000099] font-medium">
                    eSIM — daşary ýurt operatorynyň profiline gatnaşmak üçin ulanylýan sanly QR‑kod bolup,
                    diňe ýurdumyzyň daşynda işe girizilýär.
                    <br /><br />
                    Bu haryt diňe <b>safari wagtynda mobil internet ulanyşyny üpjün edýär, ses jaňlaryny / SMS‑leri goşmaýar
                        we ýerli nomer bermeýär</b> hem-de Türkmenistanyň içinde işlemýär.
                </p>
            ),
        },
        {
            question: 'eSIM haýsy enjamlar bilen işleýär?',
            content: (
                <div className="text-[#00000099] font-medium">
                    <p>
                        eSIM häzirki zaman iPhone, iPad we Android enjamlarynda goldanylýar.
                    </p>
                    <br />
                    <p>
                        Enjamyňyz eSIM goldaýandygyny barlamak üçin jaň ediş ýagdaýynda
                        <span className="font-bold"> *#06# </span> giriziň.
                        Eger sanlaryň arasynda <span className="font-bold">EID</span> görseňiz — eSIM gurup bolýar.
                    </p>
                    <br />
                    <p className="font-bold">
                        Möhüm: satyn almazdan öň enjamyňyzyň eSIM bilen işleýändigine göz ýetirmegiň
                        jogapkärçiligi müşderiniň we satuw nokadynyň üzerine alynýar.
                    </p>
                </div>
            ),
        },
        {
            question: 'Satyn alan eSIM üçin puluňy yzyna alyp bolýarmy?',
            content: (
                <p className="text-[#00000099] font-medium">
                    Bagyşlaň, mümkin däl. eSIM yzyna gaýtarylmaýan haryt.
                </p>
            ),
        },
        {
            question: 'Tölegden soň eSIM‑i nähili alaryn?',
            content: (
                <div className="text-[#00000099] font-medium">
                    <p>
                        Üstünlikli tölegden soň eSIM gurmak üçin QR‑kod we aktiwasiýa görkezmesi
                        forma doldurylanda görkezilen e‑mail salgysyna 3–15 minut dowamynda iberiler.
                    </p>
                    <br />
                    <p className="font-bold">
                        Möhüm: e‑mail salgysyny dogry girizmek üçin müşderi hem, satuw nokady hem jogapkär.
                        <br />
                        Eger adresde ýalňyşlyk goýberilse, ulgam habary nädogry poçta iberer
                        we bu tehniki näsazlyk hasap edilmeýär.
                    </p>
                </div>
            ),
        },
        {
            question: 'QR‑kodly hat gelmedik bolsa näme etmeli?',
            content: (
                <div className="text-[#00000099] font-medium">
                    <p>
                        Ilki bilen poçtanyň «Spam», «Promosiýalar» we «Habarlar» bukjalaryny barlaň. <br />
                        <br />Poçta salgysynyň ýalňyşsyz girizilendigine göz ýetiriň.
                    </p>
                    <br />
                    <b>
                        Eger poçta salgysyny girizmekde ýalňyşlyk goýberilen bolsa, satuw nokady
                        woucher‑i müşderä eltip, kody elden berip biler. <br />Tranzaksiýalar taryhynda
                        satyjy üçin QR / görkezme almak boýunça aýratyn
                        <span className="text-[#2D85EA]"> «QR/Görkezme»</span> baglanyşygy elýeterli bolýar.
                    </b>
                </div>
            ),
        },
        {
            question: 'eSIM‑iň hereket möhleti haçandan başlanýar?',
            content: (
                <p className="text-[#00000099] font-medium">
                    eSIM görkezilen ýurtda goldanylýan operatoryň toruna birinji gezek
                    birikenden soň işe başlaýar.
                </p>
            ),
        },
        {
            question: 'Ulgam kod eýýäm aktiw diýse näme etmeli?',
            content: (
                <p className="text-[#00000099] font-medium">
                    Hatda görkezilen goldaw hyzmatyna ýüz tutuň. Kody üpjünçiden barlarys
                    we problema tassyk bolnanda täze kod bilen çalyşarys.
                </p>
            ),
        },
        {
            question: 'Men eSIM‑i Türkmenistanyň içinde ulanyp bilerinmi?',
            content: (
                <p className="text-[#00000099] font-medium">
                    Ýok, mümkin däl. eSIM diňe onuň üçin niýetlenen ýurduň we operatoryň torunda işleýär.
                </p>
            ),
        },
    ];

    const faqs = lang === 'tm' ? faqsTm : faqsRu;

    if (faqs.length === 0) {
        return null;
    }

    return (
        <div className='max-w-[1158px]'>
            <p className="text-[32px] font-bold mb-6">FAQ</p>
            <div className="flex flex-col gap-4">
                {faqs.map((faq, index) => {
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

export default EsimFaq;