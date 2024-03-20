import { useCallback, type ComponentPropsWithoutRef } from 'react';
import { goto, isSamePath } from '../utils/url';


//////////////////////// TYPE DEFINITIONS ////////////////////////

type AProps = ComponentPropsWithoutRef<'a'> & {
  activeClass?: string; // if the "href" matches the current URL, then add this class as an "active" class
  activeFactors?: string[]; // the search query string keys to be used to determine if the link is active
}


//////////////////////// "REACT COMPONENT" FUNCTIONS ////////////////////////

/**
 * A custom Link component.
 *
 * @param onClick - The custom click event handler.
 * @param activeClass - The class name to apply when the link is active (matched with the current page url).
 * @param activeFactors - The search query string keys to be used to determine if the link is active.
 * @param className - The additional class name(s) for the link.
 * @param href - The URL for the link.
 * and other props that can be passed to the <a> tag.
 */
const Link = ({onClick, activeClass = '', className = '', href = '', activeFactors = [], ...rest}: AProps) => {

  // compute the final class name of the <a> tag
  // if the "href" matches the current URL, then add the "active" class
  const finalClassNames = [];
  if(className){
    finalClassNames.push(className);
  }
  if(isSamePath(window.location.href, href, activeFactors)){
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