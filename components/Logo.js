const LOGO_URL = 'https://customer-assets.emergentagent.com/job_spice-ecosystem-pro/artifacts/zdifabq2_Untitled_design.png';

export default function Logo({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'h-12',
    md: 'h-20',
    lg: 'h-28',
    xl: 'h-56 sm:h-72',
  };
  return (
    <img
      src={LOGO_URL}
      alt="Nimad ZAYKA Spices"
      className={`${sizes[size] || sizes.md} w-auto object-contain ${className}`}
      style={{ filter: 'drop-shadow(0 6px 20px rgba(0,0,0,0.35))' }}
    />
  );
}

export { LOGO_URL };
