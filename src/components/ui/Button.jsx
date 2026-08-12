import { forwardRef } from "react";

const Button = forwardRef(({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
  const Comp = asChild ? "span" : "button";
  
  const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 font-inter";
  
  const variants = {
    default: "bg-[#F1FF00] text-black hover:bg-[#F1FF00]/90",
    outline: "border border-[#F1FF00]/50 text-white hover:bg-[#F1FF00]/10",
    ghost: "hover:bg-white/10 hover:text-white text-white/70",
    icon: "bg-[#F1FF00] text-black hover:bg-[#F1FF00]/90 rounded-full",
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-12 w-12",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className || ""}`}
      ref={ref}
      {...props}
    />
  );
});

Button.displayName = "Button";

export { Button };
