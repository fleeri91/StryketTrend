import React from 'react'
import clsx from 'clsx'

interface TypographyProps {
  variant: 'mega' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'preamble' | 'p'
  align?: 'left' | 'center' | 'right' | 'justify'
  color?: 'inherit' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'
  span?: boolean
  className?: string
  children: React.ReactNode
  component?: React.ElementType<any>
}

const TagMapper: Record<TypographyProps['variant'], keyof JSX.IntrinsicElements | React.ComponentType<any>> = {
  mega: 'h1',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  preamble: 'p',
  p: 'p',
}

const variantMap: Record<string, string> = {
  mega: 'text-6xl font-bold leading-9 tracking-tight',
  h1: 'text-5xl font-bold leading-9 tracking-tight',
  h2: 'text-4xl font-bold leading-9 tracking-tight',
  h3: 'text-3xl font-bold leading-9 tracking-tight',
  h4: 'text-2xl font-bold leading-9 tracking-tight',
  h5: 'text-xl font-bold leading-9 tracking-tight',
  preamble: 'text-lg font-bold leading-9 tracking-tight',
  p: 'text-base font-bold leading-9 tracking-tight',
}

const alignMap: Record<string, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify',
}

const colorMap: Record<string, string> = {
  inherit: 'text-gray-900 dark:text-white',
  primary: 'text-blue-600',
  secondary: 'text-gray-600',
  error: 'text-red-600',
  warning: 'text-yellow-600',
  info: 'text-blue-500',
  success: 'text-green-600',
}

const Typography: React.FC<TypographyProps> = ({
  variant,
  align = 'left',
  color = 'inherit',
  span,
  className,
  children,
  component: ComponentProp,
}): JSX.Element => {
  const Component = ComponentProp || (span ? 'span' : TagMapper[variant])

  return (
    <Component className={clsx(variantMap[variant], alignMap[align], colorMap[color], className)}>{children}</Component>
  )
}

export default Typography
