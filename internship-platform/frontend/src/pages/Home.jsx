import { Link } from 'react-router-dom';
import { Search, Building, User, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Home = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative isolate overflow-hidden bg-gradient-to-b from-blue-100/20 pt-14">
                <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:pt-40">
                    <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
                        <div className="mt-24 sm:mt-32 lg:mt-16">
                            <a href="#" className="inline-flex space-x-6">
                                <span className="rounded-full bg-blue-600/10 px-3 py-1 text-sm font-semibold leading-6 text-blue-600 ring-1 ring-inset ring-blue-600/10">
                                    {t('home.stats_title')}
                                </span>
                            </a>
                        </div>
                        <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                            {t('home.title')}
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            {t('home.subtitle')}
                        </p>
                        <div className="mt-10 flex items-center gap-x-6">
                            <Link to="/register" className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                                {t('home.get_started')}
                            </Link>
                            <Link to="/internships" className="text-sm font-semibold leading-6 text-gray-900 flex items-center gap-1">
                                {t('home.browse_internships')} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                            </Link>
                        </div>
                    </div>
                    <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
                        <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
                            <img
                                src="/images/hero.png"
                                alt="Students collaborating"
                                className="w-[76rem] rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section with Company Image */}
            <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center">
                        <div className="lg:order-last">
                            <img
                                src="/images/company.png"
                                alt="Corporate recruitment"
                                className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
                            />
                        </div>
                        <div className="lg:max-w-lg">
                            <h2 className="text-base font-semibold leading-7 text-blue-600">{t('home.stats_title')}</h2>
                            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                {t('home.stats_headline')}
                            </p>
                            <p className="mt-6 text-lg leading-8 text-gray-600">
                                {t('home.stats_desc')}
                            </p>
                            <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                                <div className="relative pl-9 rtl:pl-0 rtl:pr-9">
                                    <dt className="inline font-semibold text-gray-900">
                                        <User className="absolute left-1 rtl:left-auto rtl:right-1 top-1 h-5 w-5 text-blue-600" aria-hidden="true" />
                                        {t('home.stats_students')}
                                    </dt>{' '}
                                    <dd className="inline">{t('home.stats_students_desc')}</dd>
                                </div>
                                <div className="relative pl-9 rtl:pl-0 rtl:pr-9">
                                    <dt className="inline font-semibold text-gray-900">
                                        <Building className="absolute left-1 rtl:left-auto rtl:right-1 top-1 h-5 w-5 text-blue-600" aria-hidden="true" />
                                        {t('home.stats_companies')}
                                    </dt>{' '}
                                    <dd className="inline">{t('home.stats_companies_desc')}</dd>
                                </div>
                                <div className="relative pl-9 rtl:pl-0 rtl:pr-9">
                                    <dt className="inline font-semibold text-gray-900">
                                        <Search className="absolute left-1 rtl:left-auto rtl:right-1 top-1 h-5 w-5 text-blue-600" aria-hidden="true" />
                                        {t('home.stats_internships')}
                                    </dt>{' '}
                                    <dd className="inline">{t('home.stats_internships_desc')}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
