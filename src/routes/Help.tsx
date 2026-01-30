import { useState } from "react";
import { useTranslation } from "../hooks/useTranslation";

function Help() {
    const { t, lang } = useTranslation();
    document.title = t.help.pageTitle;

    const faqsRu = [
        {
            question: "Как изменить пароль или контактные данные?",
            content: (
                <p className="mt-[14px] text-[14px] text-[#00000099] font-medium">
                    Обратитесь к администратору вашей организации или к нашему менеджеру — они обновят данные и/или инициируют смену пароля.
                </p>
            ),
        },
        {
            question: "Что означают «Всего заработано», «Выведено» и «Доступно к выводу»?",
            content: (
                <ul className="mt-[14px] text-[14px] text-[#00000099] font-medium list-disc list-inside flex flex-col gap-[14px]">
                    <li>Всего заработано — суммарное вознаграждение (кэшбэк), начисленное по вашим продажам.</li>
                    <li>Выведено — сумма, которую вы уже получили (выплаты, выданные наличными или перечисленные на счёт/карту).</li>
                    <li>Доступно к выводу — сумма, которую можно вывести на текущий момент.</li>
                </ul>
            ),
        },
        {
            question: "Есть ли минимальная сумма для вывода?",
            content: (
                <p className="mt-[14px] text-[14px] text-[#00000099] font-medium">
                    Минимальной суммы нет. Выплаты производятся раз в месяц в установленную дату, независимо от накопленной суммы.
                </p>
            ),
        },
        {
            question: "Как часто обновляется информация о заработке?",
            content: (
                <p className="mt-[14px] text-[14px] text-[#00000099] font-medium">
                    Ежедневно, в 00:00 (по локальному времени кабинета). В течение дня цифры могут носить предварительный характер.
                </p>
            ),
        },
        {
            question: "Почему сумма в разделе «Доступно к выводу» меньше, чем «Всего заработано»?",
            content: (
                <p className="mt-[14px] text-[14px] text-[#00000099] font-medium">
                    Потому что часть средств вы уже получили в предыдущие периоды — они учтены во «Выведено» и не входят в текущую доступную сумму.
                </p>
            ),
        },
        {
            question: "Что делать, если API-ключ не работает?",
            content: (
                <div>
                    <p className="mt-[14px] text-[14px] text-[#00000099] font-medium">
                        Обратитесь в техническую поддержку и опишите проблему максимально подробно. Полезно сразу приложить:
                    </p>
                    <ul className="mt-[14px] text-[#00000099] font-medium list-disc list-inside">
                        <li>ваш partner ID/название компании;</li>
                        <li>пример запроса (метод, заголовки, тело) и ответа сервера;</li>
                        <li>скриншоты/логи.</li>
                    </ul>
                </div>
            ),
        },
        {
            question: "В какое время работает поддержка?",
            content: (
                <p className="mt-[14px] text-[14px] text-[#00000099] font-medium">
                    С понедельника по пятницу: 09:00–18:00. <br />В субботу: 09:00–13:00.
                </p>
            ),
        },
        {
            question: "Что делать, если у клиента проблема с покупкой?",
            content: (
                <div>
                    <p className="mt-[14px] text-[14px] text-[#00000099] font-medium">
                        Соберите максимум деталей и обратитесь в поддержку. Пожалуйста, укажите:
                    </p>
                    <ul className="mt-[14px] text-[14px] text-[#00000099] font-medium list-disc list-inside">
                        <li>ID транзакции;</li>
                        <li>дату и время операции;</li>
                        <li>товар/категорию и сумму;</li>
                        <li>краткое описание проблемы клиента.</li>
                    </ul>
                </div>
            ),
        },
    ];

    const faqsTm = [
        {
            question: "Paroly ýa-da habarlaşmak maglumatlaryny nähili üýtgetmeli?",
            content: (
                <p className="mt-[14px] text-[14px] text-[#00000099] font-medium">
                    Guramaňyzyň administratory ýa-da biziň menejerimiz bilen habarlaşyň — olar maglumatlary täzelärler we/ýa-da parolyň çalşylmagyny
                    gurarlar.
                </p>
            ),
        },
        {
            question: "«Jemi gazanyldy», «Alynan» we «Alynmaga elýeterli» diýen bölümler näme diýmek?",
            content: (
                <ul className="mt-[14px] text-[14px] text-[#00000099] font-medium list-disc list-inside flex flex-col gap-[14px]">
                    <li>Jemi gazanyldy — siziň satışlaryňyz boýunça hasaplanan umumy sylag (keshbek).</li>
                    <li>Alynan — eýýäm alan (nagt ýa-da hasap/kartaňyza geçirilýän) pullaryňyzyň jemi.</li>
                    <li>Alynmaga elýeterli — häzirki wagtda alyp bilýän möçberiňiz.</li>
                </ul>
            ),
        },
        {
            question: "Pul almak üçin iň az möçber barmy?",
            content: (
                <p className="mt-[14px] text-[14px] text-[#00000099] font-medium">
                    Ýok, iň az möçber kesgitlenmedik. Tölegler ýygy-ýygydan aýda bir gezek bellenen günde geçirilýär, ýygnanan
                    möçbere garamazdan.
                </p>
            ),
        },
        {
            question: "Gazanç baradaky maglumatlar näçe wagtda bir täzeilýär?",
            content: (
                <p className="mt-[14px] text-[14px] text-[#00000099] font-medium">
                    Her gün, ýerli wagta görä 00:00-da täzeilýär. Günüň dowamynda görkezijiler öňünden bellik häsiýetli bolup biler.
                </p>
            ),
        },
        {
            question: "Näme üçin «Alynmaga elýeterli» bölümindäki möçber «Jemi gazanyldy» bölüminden az?",
            content: (
                <p className="mt-[14px] text-[14px] text-[#00000099] font-medium">
                    Sebäbi öňki döwürlerde eýýäm alan serişdeleriňiz bar — olar «Alynan» bölüminde görkezilýär we häzirki elýeterli
                    möçbere goşulmaýar.
                </p>
            ),
        },
        {
            question: "API açary işlänok bolsa näme etmeli?",
            content: (
                <div>
                    <p className="mt-[14px] text-[14px] text-[#00000099] font-medium">
                        Tehniki goldawa ýüz tutuň we meseläni mümkin boldugyça jikme-jik beýan ediň. Aşakdakylary bir wagtda ibermek peýdaly:
                    </p>
                    <ul className="mt-[14px] text-[14px] text-[#00000099] font-medium list-disc list-inside">
                        <li>partner IDňiz/kompaniýanyň ady;</li>
                        <li>sorgynyň mysaly (usul, sahypa başlyklary, görkezilen maglumatlar) we serweriň jogaby;</li>
                        <li>screenshotlar/loglar.</li>
                    </ul>
                </div>
            ),
        },
        {
            question: "Goldaw hyzmaty haýsy wagtyň arasynda işleýär?",
            content: (
                <p className="mt-[14px] text-[14px] text-[#00000099] font-medium">
                    Duşenbe–Anna: 09:00–18:00. <br />Şenbe: 09:00–13:00.
                </p>
            ),
        },
        {
            question: "Müşderiniň satyn alşy bilen bagly näsazlyk ýüze çyksa näme etmeli?",
            content: (
                <div>
                    <p className="mt-[14px] text-[14px] text-[#00000099] font-medium">
                        Mümkin boldugyça köp maglumat ýygnaň we goldaw hyzmatyna ýüz tutuň. Hökmany görkezmeli maglumatlar:
                    </p>
                    <ul className="mt-[14px] text-[#00000099] font-medium list-disc list-inside">
                        <li>tranzaksiýanyň ID-si;</li>
                        <li>operasiýanyň senesi we wagty;</li>
                        <li>haryt/kategoriýa we möçberi;</li>
                        <li>müşderiniň näsazlyk baradaky gysgaça beýanlamasy.</li>
                    </ul>
                </div>
            ),
        },
    ];

    const faqs = lang === 'tm' ? faqsTm : faqsRu;

    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFaq = (index: number) => {
        setOpenIndex((prev) => (prev === index ? null : index));
    };

    return (
        <div className='px-20 mt-[28px] pb-[100px] max-1lg:px-15 max-md:px-8 max-sm:px-4'>
            <div className='max-w-[1680px] m-auto'>
                <center>
                    <p className="text-[36px] font-bold max-md:text-[24px]">{t.help.heading}</p>
                </center>
                <center>
                    <p className="mt-4 text-[#00000099] font-medium max-w-[317px] leading-6">
                        {t.help.subheading}
                    </p>
                </center>
                <div className="flex items-center gap-3 justify-center pt-[32px]">
                    <b className="mr-[20px]">{t.help.contactsLabel}</b>
                    <div className="flex items-center gap-3 flex-wrap">
                        <p className="px-[12px] py-[10px] border border-[#00000026] rounded-[8px] w-fit text-[14px] font-bold">
                            {t.help.contacts.email}
                        </p>
                        <p className="px-[12px] py-[10px] border border-[#00000026] rounded-[8px] w-fit text-[14px] font-bold">
                            {t.help.contacts.telegram}
                        </p>
                        <p className="px-[12px] py-[10px] border border-[#00000026] rounded-[8px] w-fit text-[14px] font-bold">
                            {t.help.contacts.support}
                        </p>
                    </div>
                </div>
                <div className='max-w-[672px] m-auto mt-[24px]'>
                    <p className="mb-[30px] font-bold text-[18px]">FAQ</p>

                    <div className="flex flex-col gap-9">
                        {faqs.map((faq, index) => {
                            const isOpen = openIndex === index;
                            return (
                                <button
                                    key={faq.question}
                                    type="button"
                                    onClick={() => toggleFaq(index)}
                                    className="cursor-pointer text-left w-full"
                                >
                                    <div className="flex items-center justify-between gap-4">
                                        <p className="font-bold">{faq.question}</p>
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className={`transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}
                                        >
                                            <path d="M4 8L12 16L20 8" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                    {isOpen && faq.content}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Help