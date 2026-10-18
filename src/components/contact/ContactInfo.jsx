import { useTranslation } from 'react-i18next';
import OfficeCard from './OfficeCard';

export default function ContactInfo() {
  const { t } = useTranslation();

  return (
    <div data-aos="fade-up" data-aos-duration="600" data-aos-once="true">
      <h2 className="mb-6 text-4xl font-extrabold leading-tight text-primary-900 md:text-5xl">
        {t('contactPage.officesEyebrow')}
      </h2>
      <div className="space-y-6">
        {/* Kuwait office is currently hidden. To bring it back, add another <OfficeCard> here:
            title={t('contactPage.kuwaitOffice')} phone={t('contactPage.phonePlaceholder')} */}
        <OfficeCard
          title={t('contactPage.ksaOffice')}
          address={t('contactPage.addressPlaceholder')}
          phone={t('contactPage.phonePlaceholder2')}
          email={t('contactPage.emailPlaceholder')}
        />
      </div>
    </div>
  );
}