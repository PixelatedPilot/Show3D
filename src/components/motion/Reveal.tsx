import React from 'react';

export type RevealVariant = 'fade-up' | 'scale-in' | 'blur-in' | 'slide-persp' | 'hero-out';

export interface RevealProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  index?: number;
  className?: string;
  as?: React.ElementType;
  style?: React.CSSProperties;
  id?: string;
}

/**
 * Semantic container that wires elements into the Apple-style scroll reveal engine.
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  variant = 'fade-up',
  index,
  className = '',
  as: Component = 'div',
  style,
  id,
}) => {
  const customStyles: React.CSSProperties = {
    ...style,
    ...(index !== undefined ? ({ '--i': index } as React.CSSProperties) : {}),
  };

  return (
    <Component
      id={id}
      data-reveal={variant}
      data-stagger={index !== undefined ? 'true' : undefined}
      style={customStyles}
      className={className}
    >
      {children}
    </Component>
  );
};
