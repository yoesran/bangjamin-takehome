import Image from 'next/image';

import { cn } from '@/lib/utils';

export function BrandLogo({ className, priority }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/brand/logo.webp"
      alt="Bang Jamin"
      width={132}
      height={48}
      priority={priority}
      className={cn('h-9 w-auto', className)}
    />
  );
}
