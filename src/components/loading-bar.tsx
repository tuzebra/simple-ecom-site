import { ComponentPropsWithoutRef } from 'react';
import { createPortal } from 'react-dom';
import'@/css/loading-bar.scss';


//////////////////////// TYPE DEFINITIONS ////////////////////////

type LoadingBarProps = ComponentPropsWithoutRef<'div'> & {}


//////////////////////// "REACT COMPONENT" FUNCTIONS ////////////////////////

export const LoadingBar = ({children, ...rest}: LoadingBarProps) => {
  return createPortal(
    (
      <div id="loading-bar" {...rest}>{children}</div>
    ),
    document.body
  );
}

export default LoadingBar;
