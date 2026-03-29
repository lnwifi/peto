import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
  variant?: 'default' | 'elevated' | 'outlined'
}

export function Card({ children, className = '', style, onClick, variant = 'default' }: CardProps) {
  const variants = {
    default: 'bg-white border border-carbon/5',
    elevated: 'bg-white shadow-card',
    outlined: 'bg-transparent border-2 border-primary/20',
  }

  return (
    <div 
      className={`rounded-2xl ${variants[variant]} ${onClick ? 'cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-transform' : ''} ${className}`}
      style={style}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  disabled?: boolean
  onClick?: () => void
  type?: 'button' | 'submit'
  className?: string
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
  className = ''
}: ButtonProps) {
  const variants = {
    primary: 'bg-primary text-white hover:bg-[#2A1669] shadow-sm',
    secondary: 'bg-secondary text-white hover:bg-[#D65F25]',
    outline: 'bg-transparent border-2 border-primary text-primary hover:bg-primary/5',
    ghost: 'bg-transparent text-carbon hover:bg-carbon/5',
    danger: 'bg-error text-white hover:bg-red-600',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-xl',
    md: 'px-5 py-3 text-base rounded-xl',
    lg: 'px-6 py-4 text-lg rounded-2xl',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        font-semibold transition-all duration-200
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'active:scale-[0.98]'}
        ${className}
      `}
    >
      {children}
    </button>
  )
}

interface BadgeProps {
  children: ReactNode
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md'
  className?: string
}

export function Badge({ children, variant = 'default', size = 'sm', className = '' }: BadgeProps) {
  const variants = {
    default: 'bg-carbon/10 text-carbon',
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-white',
    success: 'bg-success/10 text-success',
    warning: 'bg-[#FFCF5C] text-primary',
    error: 'bg-error/10 text-error',
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  }

  return (
    <span className={`inline-flex items-center font-semibold rounded-full ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  )
}

interface AvatarProps {
  src?: string
  alt?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  fallback?: string
  className?: string
}

export function Avatar({ src, alt = '', size = 'md', fallback, className = '' }: AvatarProps) {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base',
    xl: 'w-20 h-20 text-xl',
  }

  if (src) {
    return (
      <img 
        src={src} 
        alt={alt} 
        className={`${sizes[size]} rounded-full object-cover ${className}`}
      />
    )
  }

  return (
    <div 
      className={`${sizes[size]} rounded-full font-bold flex items-center justify-center ${className}`}
      style={{ background: '#FFCF5C', color: '#331B7E' }}
    >
      {fallback || alt.charAt(0).toUpperCase()}
    </div>
  )
}

interface InputProps {
  label?: string
  error?: string
  className?: string
  type?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  icon?: ReactNode
}

export function Input({ label, error, className = '', type = 'text', ...props }: InputProps) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-carbon mb-1.5">
          {label}
        </label>
      )}
      <input
        type={type}
        {...props}
        className={`
          w-full px-4 py-3 bg-white border border-carbon/10 rounded-xl
          placeholder:text-carbon/40 text-carbon
          focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
          transition-all
          ${error ? 'border-error focus:border-error focus:ring-error/20' : ''}
        `}
      />
      {error && (
        <p className="text-error text-sm mt-1">{error}</p>
      )}
    </div>
  )
}

interface TextareaProps {
  label?: string
  error?: string
  className?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  rows?: number
}

export function Textarea({ label, error, className = '', rows = 4, ...props }: TextareaProps) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-carbon mb-1.5">
          {label}
        </label>
      )}
      <textarea
        rows={rows}
        {...props}
        className={`
          w-full px-4 py-3 bg-white border border-carbon/10 rounded-xl
          placeholder:text-carbon/40 text-carbon
          focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
          transition-all resize-none
          ${error ? 'border-error focus:border-error focus:ring-error/20' : ''}
        `}
      />
      {error && (
        <p className="text-error text-sm mt-1">{error}</p>
      )}
    </div>
  )
}

interface SelectProps {
  label?: string
  error?: string
  className?: string
  options: { value: string; label: string }[]
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export function Select({ label, error, className = '', options, ...props }: SelectProps) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-carbon mb-1.5">
          {label}
        </label>
      )}
      <select
        {...props}
        className={`
          w-full px-4 py-3 bg-white border border-carbon/10 rounded-xl
          text-carbon
          focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
          transition-all
          ${error ? 'border-error focus:border-error focus:ring-error/20' : ''}
        `}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && (
        <p className="text-error text-sm mt-1">{error}</p>
      )}
    </div>
  )
}
