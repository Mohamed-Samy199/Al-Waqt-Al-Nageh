import { useTranslation } from 'react-i18next';
import { PinIcon, PhoneIcon, MailIcon } from './ContactIcons';

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 text-primary-700">{icon}</span>
      <div>
        <dt className="text-xs font-semibold uppercase tracking-wide text-neutral-500">{label}</dt>
        <dd className="mt-0.5 text-sm text-neutral-700">{value}</dd>
      </div>
    </div>
  );
}

export default function OfficeCard({ title, address, phone, email }) {
  const { t } = useTranslation();

  return (
    <div className="rounded-2xl border border-neutral-100 p-6">
      <h3 className="font-bold text-primary-900">{title}</h3>
      <dl className="mt-4 space-y-4">
        <InfoRow icon={<PinIcon />} label={t('contactPage.addressLabel')} value={address} />
        <InfoRow icon={<PhoneIcon />} label={t('contactPage.phoneLabel')} value={phone} />
        <InfoRow icon={<MailIcon />} label={t('contactPage.emailLabel')} value={email} />
      </dl>
    </div>
  );
}
