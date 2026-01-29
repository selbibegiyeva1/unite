export const tm = {
  languageSwitcher: {
    russian: 'Rusça',
    turkmen: 'Türkmençe',
  },
  signIn: {
    title: 'Şahsy kabinet',
    subtitle: 'Işe başlamak üçin şahsy kabinetiňize giriň.',
    loginLabel: 'Login',
    loginPlaceholder: 'Logini giriziň',
    passwordLabel: 'Parol',
    passwordPlaceholder: 'Paroly giriziň',
    submitButton: 'Girmek',
    loading: 'Ýüklenýär...',
    registrationNote: 'Özbaşdak hasaba alynmak elýeterli däl. Girişi goldaw berýär.',
    support: 'Goldaw:',
    supportPhone: '+993 62 42-31-18',
    successMessage: 'Giriş amala aşyryldy',
    closeNotification: 'Duýduryşy ýap',
    closeErrorNotification: 'Sowal duýduryşyny ýap',
  },
} as const;

export type TmTranslations = typeof tm;
