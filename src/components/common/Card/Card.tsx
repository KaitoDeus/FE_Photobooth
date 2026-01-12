// ============================================
// Common Component: Card
// ============================================

import React from 'react';
import './Card.css';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'glass';
  hoverable?: boolean;
  selected?: boolean;
  children: React.ReactNode;
}

/**
 * Reusable Card component with multiple variants
 */
export const Card: React.FC<CardProps> = ({
  variant = 'default',
  hoverable = false,
  selected = false,
  children,
  className = '',
  ...props
}) => {
  const classes = [
    'card',
    `card--${variant}`,
    hoverable ? 'card--hoverable' : '',
    selected ? 'card--selected' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

/**
 * Card Header sub-component
 */
export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <div className={`card__header ${className}`} {...props}>
    {children}
  </div>
);

/**
 * Card Body sub-component
 */
export const CardBody: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <div className={`card__body ${className}`} {...props}>
    {children}
  </div>
);

/**
 * Card Footer sub-component
 */
export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <div className={`card__footer ${className}`} {...props}>
    {children}
  </div>
);

export default Card;
