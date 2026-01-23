import { useState } from "react";

function Help() {
    document.title = 'Unite Shop - Помощь';
    
    const [faqs] = useState([
        {
            question: "Как изменить пароль или контактные данные?",
            content: (
                <p className="mt-[14px] text-[#00000099] font-medium">
                    Обратитесь к администратору вашей организации или к нашему менеджеру — они обновят данные и/или инициируют смену пароля.
                </p>
            ),
        },
        {
            question: "Что означают «Всего заработано», «Выведено» и «Доступно к выводу»?",
            content: (
                <ul className="mt-[14px] text-[#00000099] font-medium list-disc list-inside flex flex-col gap-[14px]">
                    <li>Всего заработано — суммарное вознаграждение (кэшбэк), начисленное по вашим продажам.</li>
                    <li>Выведено — сумма, которую вы уже получили (выплаты, выданные наличными или перечисленные на счёт/карту).</li>
                    <li>Доступно к выводу — сумма, которую можно вывести на текущий момент.</li>
                </ul>
            ),
        },
        {
            question: "Есть ли минимальная сумма для вывода?",
            content: (
                <p className="mt-[14px] text-[#00000099] font-medium">
                    Минимальной суммы нет. Выплаты производятся раз в месяц в установленную дату, независимо от накопленной суммы
                </p>
            ),
        },
        {
            question: "Как часто обновляется информация о заработке?",
            content: (
                <p className="mt-[14px] text-[#00000099] font-medium">
                    Ежедневно, в 00:00 (по локальному времени кабинета). В течение дня цифры могут носить предварительный характер.
                </p>
            ),
        },
        {
            question: "Почему сумма в разделе «Доступно к выводу» меньше, чем «Всего заработано»?",
            content: (
                <p className="mt-[14px] text-[#00000099] font-medium">
                    Потому что часть средств вы уже получили в предыдущие периоды — они учтены во «Выведено» и не входят в текущую доступную сумму.
                </p>
            ),
        },
        {
            question: "Что делать, если API-ключ не работает?",
            content: (
                <div>
                    <p className="mt-[14px] text-[#00000099] font-medium">
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
                <p className="mt-[14px] text-[#00000099] font-medium">
                    С понедельника по пятницу: 09:00–18:00. <br />В субботу: 09:00–13:00.
                </p>
            ),
        },
        {
            question: "Что делать, если у клиента проблема с покупкой?",
            content: (
                <div>
                    <p className="mt-[14px] text-[#00000099] font-medium">
                        Соберите максимум деталей и обратитесь в поддержку. Пожалуйста, укажите:
                    </p>
                    <ul className="mt-[14px] text-[#00000099] font-medium list-disc list-inside">
                        <li>ID транзакции;</li>
                        <li>дату и время операции;</li>
                        <li>товар/категорию и сумму;</li>
                        <li>краткое описание проблемы клиента.</li>
                    </ul>
                </div>
            ),
        },
    ]);

    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFaq = (index: number) => {
        setOpenIndex((prev) => (prev === index ? null : index));
    };

    return (
        <div className='px-6 mt-[28px] pb-[100px]'>
            <div className='w-[1680px] m-auto'>
                <center>
                    <p className="text-[36px] font-bold">Нужна помощь?</p>
                </center>
                <center>
                    <p className="mt-4 text-[#00000099] font-medium max-w-[317px] leading-6">Проверьте ответы ниже или напишите нам — мы рядом.</p>
                </center>
                <div className="flex items-center gap-3 flex-wrap justify-center pt-[32px]">
                    <b className="mr-[20px]">Контакты:</b>
                    <p className="px-[12px] py-[10px] border border-[#00000026] rounded-[8px] w-fit text-[14px] font-bold">Email: esim@unite-venture.com</p>
                    <p className="px-[12px] py-[10px] border border-[#00000026] rounded-[8px] w-fit text-[14px] font-bold">Telegram: @unite_esim</p>
                    <p className="px-[12px] py-[10px] border border-[#00000026] rounded-[8px] w-fit text-[14px] font-bold">Поддержка:+99362 42 31 18</p>
                </div>
                <div className='w-[672px] m-auto mt-[24px]'>
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