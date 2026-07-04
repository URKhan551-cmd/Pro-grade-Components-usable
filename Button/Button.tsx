import { forwardRef, ButtonHTMLAttributes} from "react";
import clsx from "clsx";

const Spinner = (): JSX.Element => (
    <svg className="animate-spin -ml-1 mr-2 h-4 w-4"
    xlmns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
    >
        <circle className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        />
        <path className="opacity=75" 
        fill="currentColor"
        d="M4 12a8 8 0 018-8v8z"
        />

    </svg>
);

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost" | "outline";

type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
 variant?: ButtonVariant;
 size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  className = "",
  size = "sm",
  variant = "primary",
  type = "button",
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon = null,
  rightIcon = null,
  ...props


}, ref) => {
   
    const isDisabled: boolean = disabled || loading;

    return (
        <button ref={ref}
        type = {type}
        onClick = {onClick}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={loading}

        className={cslx (
            "inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
            variant === "primary" && 
            "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
            variant === "secondary" && 
            "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400",
            variant === "danger" && 
            "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
            variant === "ghost" &&
            "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-400",
            variant === "outilne" &&
            "border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 focus:ring-gray-400",
            variant === "outline-primary" &&
            "border border-blue-600 bg-transparent text-blue-600 hover:bg-blue-50 focus:ring-blue-500",

           size === "sm" &&
            "px-3 py-1 text-sm",
            size === "md" && "px-4 py-2 text-sm",
            size === "lg" && "px-6 py-3 text-base",

            isDisabled && "opacity-50 cursor-not-allowed",
            fullWidth && "w-full",
            className
        )}
        {...props}
        >
        {loading && <Spinner />}
        {!loading && leftIcon && (
                        <span className="ml-2 flex items-center">{leftIcon}</span>
        )}
        {children}

        {rightIcon && (
                        <span className="ml-2 flex items-center">{rightIcon}</span>
        )}
        </button>
    )

}) 

Button.displayName = "Button";
expo