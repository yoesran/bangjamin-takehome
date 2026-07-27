import Image from 'next/image';

import { SITE } from '@/lib/content';

export function WhatsappFab({ label }: { label: string }) {
  return (
    <a
      href={SITE.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="fixed right-5 bottom-5.5 z-40 block transition-transform hover:scale-105"
    >
      <Image src="/brand/wa-icon.webp" alt="" width={50} height={50} className="h-12.5 w-12.5" />
    </a>
  );
}
