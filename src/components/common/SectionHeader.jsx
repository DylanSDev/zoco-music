export function SectionHeader({ title, actionText, onAction, isNeon = false, className = "" }) {
  return (
    <div className={`flex items-center justify-between mb-4 ${className}`}>
      <h2
        className={`font-heading font-bold tracking-tight ${
          isNeon
            ? "text-lg md:text-xl text-[#F1FF00] drop-shadow-[0_0_10px_rgba(241,255,0,0.6)]"
            : "text-xl md:text-2xl text-white"
        }`}
      >
        {title}
      </h2>
      {actionText && (
        <button
          onClick={onAction}
          className="font-sans text-xs font-semibold text-[#9bb2c4] transition-colors duration-200 hover:text-[#F1FF00]"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
