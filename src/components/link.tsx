import { useCallback, type ComponentPropsWithoutRef } from 'react';
import { goto, isSamePath } from '../utils/url';

type AProps = ComponentPropsWithoutRef<'a'> & {
  activeClass?: string; // if the "href" matches the current URL, then add this class as an "active" class
}

const Link = ({onClick, activeClass = '', className = '', href = '', ...rest}: AProps) => {

  // compute the final class name of the <a> tag
  // if the "href" matches the current URL, then add the "active" class
  const finalClassNames = [];
  if(className){
    finalClassNames.push(className);
  }
  if(isSamePath(window.location.href, href)){
    finalClassNames.push(activeClass);
  }

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {

    // always call the custom "onClick" handler first
    if(typeof onClick === 'function') {
      onClick(e);
    }
    // only continue if the custom "onClick" handler didn't call "e.preventDefault()
    if(e.isPropagationStopped() || e.defaultPrevented) {
      return;
    }
    e.preventDefault();
    goto(e.currentTarget.href);

  }, [onClick]);

  return (
    <a href={href} onClick={handleClick} className={finalClassNames.join(' ')} {...rest} />
  );
}

export default Link;