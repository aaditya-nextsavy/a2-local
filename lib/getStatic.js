import nextI18nextConfig from '@/next-i18next.config';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// import i18nextConfig from '../next-i18next.config'

export const getI18nPaths = () =>
    nextI18nextConfig.i18n.locales.map((lng) => ({
        params: {
            locale: lng
        }
    }))

export const getStaticPaths = () => ({
    fallback: false,
    paths: getI18nPaths()
})

export async function getI18nProps(ctx, ns = ['translation']) {
    const locale = ctx?.params?.locale
    let props = {
        ...(await serverSideTranslations(locale, ns))
    }
    return props
}

export function makeStaticProps(ns = {}) {
    return async function getStaticProps(ctx) {
        return {
            props: await getI18nProps(ctx, ns)
        }
    }
}