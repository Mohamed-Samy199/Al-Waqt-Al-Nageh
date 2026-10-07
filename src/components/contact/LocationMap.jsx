import { useTranslation } from 'react-i18next';

function PinIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}

export default function LocationMap({
  address = 'King Fahad Bin Abdulaziz Rd, Al Khubar Ash Shamaliyah Dist., Saudi Arabia',
}) {
  const { t } = useTranslation();

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address
   )}`;

  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    address
   )}&output=embed`;

  return (
    <section className="pb-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative h-72 overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 md:h-96">
          <iframe
            title={t('contactPage.mapTitle')}
            src={mapEmbedUrl}
            className="h-full w-full border-0 grayscale-[15%]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          <div className="absolute inset-x-4 bottom-4 flex flex-col gap-3 rounded-xl bg-white/95 p-4 shadow-lg backdrop-blur sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3 text-primary-900">
              <span className="mt-0.5 text-primary-700">
                <PinIcon />
              </span>

              <div>
                <p className="text-sm font-bold">
                  {t('contactPage.mapTitle')}
                </p>

                <p className="mt-1 text-xs leading-relaxed text-neutral-500">
                  {address}
                </p>
              </div>
            </div>

            <a
              href={mapUrl}
              target="_blank"
              rel="noreferrer"
              className="shrink-0 rounded-full bg-primary-700 px-4 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-primary-900"
            >
              {t('contactPage.openMap')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
