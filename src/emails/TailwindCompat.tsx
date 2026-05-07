import { Tailwind as ReactEmailTailwind } from '@react-email/components';
import type { ReactNode } from 'react';

type TailwindProps = {
  children?: ReactNode;
};

const TypedTailwind = ReactEmailTailwind as React.ComponentType<TailwindProps>;

/** Bridges react-email Tailwind typings (ReactNode) to TS JSX expectations. */
export function Tailwind({ children }: TailwindProps) {
  return <TypedTailwind>{children}</TypedTailwind>;
}
