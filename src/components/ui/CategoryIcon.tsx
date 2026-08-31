// components/ui/CategoryIcon.tsx
'use client';

interface CategoryIconProps {
  icon: string;
  className?: string;
  size?: number;
}

export const CategoryIcon = ({ icon, className = '', size = 32 }: CategoryIconProps) => {
  return (
    <div
      className={`flex items-center justify-center ${className}`}
      dangerouslySetInnerHTML={{
        __html: icon
          .replace(/width="32"/, `width="${size}"`)
          .replace(/height="32"/, `height="${size}"`),
      }}
    />
  );
};
