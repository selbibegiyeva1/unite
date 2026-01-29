export const ru = {
  languageSwitcher: {
    russian: 'Русский',
    turkmen: 'Туркменский',
  },
  signIn: {
    title: 'Личный кабинет',
    subtitle: 'Войдите в личный кабинет чтобы начать работу.',
    loginLabel: 'Логин',
    loginPlaceholder: 'Введите логин',
    passwordLabel: 'Пароль',
    passwordPlaceholder: 'Введите пароль',
    submitButton: 'Войти',
    loading: 'Загрузка...',
    registrationNote: 'Самостоятельная регистрация недоступна. Доступ выдаёт поддержка',
    support: 'Поддержка:',
    supportPhone: '+993 62 42-31-18',
    successMessage: 'Вход выполнен',
    closeNotification: 'Закрыть уведомление',
    closeErrorNotification: 'Закрыть уведомление об ошибке',
  },
} as const;

export type RuTranslations = typeof ru;
