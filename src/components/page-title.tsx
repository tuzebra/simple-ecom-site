import { useEffect, ComponentPropsWithoutRef } from 'react';


//////////////////////// TYPE DEFINITIONS ////////////////////////

type PageTitleProps = ComponentPropsWithoutRef<'h1'> & {
  title: string;
}


//////////////////////// "REACT COMPONENT" FUNCTIONS ////////////////////////

export const PageTitle = ({title, ...rest}: PageTitleProps) => {

  // update the document title when the title prop changes
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <h1 {...rest}>{title}</h1>
  );
}

export default PageTitle;
