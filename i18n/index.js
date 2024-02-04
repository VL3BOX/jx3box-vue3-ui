import { createI18n } from "vue-i18n";
import { $cms } from "@jx3box/jx3box-common/js/https_v2";

// default language that is preloaded
const currentLang = localStorage.getItem("lang") || "zh-CN";
const loadedLanguages = ["zh-CN"];
const translationWarn = ~~localStorage.getItem("translationWarn");


function setLocale(i18n, locale) {
    if (i18n.mode === "legacy") {
        i18n.global.locale = locale;
    } else {
        i18n.global.locale.value = locale;
    }
    // axios.defaults.headers.common['Accept-Language'] = lang
    document.querySelector("html").setAttribute("lang", locale);
    return locale;
}

function getLocale(i18n) {
    if (i18n.mode === "legacy") {
        return i18n.global.locale;
    }
    return i18n.global.locale.value;
}

export function changeLocale(i18n, lang) {
    if (currentLang === "zh-CN") {
        // momment or dayjs locale
    } else {
        // momment or dayjs locale
    }
    localStorage.setItem("lang", lang);
    loadLanguageAsync(i18n, lang);
    // window.location.reload();
}

export function loadLanguageAsync(i18n, lang) {
    const locale = getLocale(i18n);
    // If the same language
    if (locale === lang) {
        return Promise.resolve(setLocale(i18n, lang));
    }

    // If the language was already loaded
    if (loadedLanguages.includes(lang)) {
        return Promise.resolve(setLocale(i18n, lang));
    }

    async function importOffline(lang) {
        console.log("OFFLINE", lang);
        const messages = await import(/* webpackChunkName: "[request]" */ `./locales/${lang}.json`);
        console.log("messages", JSON.stringify(messages.default));
        localStorage.setItem("locale", JSON.stringify(messages.default));
        i18n.global.setLocaleMessage(lang, messages.default);
        loadedLanguages.push(lang);
        return setLocale(i18n, lang);
    }

    async function importOnline(lang) {
        console.log("ONLINE", lang);

        return $cms()
            .get(`/locales/${lang}.json`)
            .then((res) => {
                localStorage.setItem("locale", JSON.stringify(res.data));
                loadedLanguages.push(lang);

                i18n.global.setLocaleMessage(lang, res.data);
                return setLocale(i18n, lang);
            })
            .catch(() => {
                return importOffline(lang);
            });
    }

    const langData = localStorage.getItem("locale");
    if (langData) {
        loadedLanguages.push(lang);
        i18n.global.setLocaleMessage(lang, JSON.parse(langData));
        return setLocale(i18n, lang);
    }
    return process.env.OFFLINE ? importOffline(lang) : importOnline(lang);
}

const i18n = createI18n({
    fallbackLocale: "zh-CN",
    globalInjection: true,
    legacy: false,
    locale: "zh-CN",
    messages: {},
    missingWarn: translationWarn,
});

changeLocale(i18n, "vi");

export default i18n;
