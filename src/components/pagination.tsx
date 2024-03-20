import { type ComponentPropsWithoutRef } from 'react';
import { useUrl } from '@/hooks/router';
import { urlToRelativeString } from '@/utils/url';
import Link from '@/components/link';
import '@/css/pagination.scss';


//////////////////////// TYPE DEFINITIONS ////////////////////////

type PaginationProps = ComponentPropsWithoutRef<'div'> & {
  totalPage: number; // the total number of pages
}


//////////////////////// "REACT COMPONENT" FUNCTIONS ////////////////////////

export const Pagination = ({totalPage, ...rest}: PaginationProps) => {
  const [url] = useUrl();

  if(totalPage < 2){
    return null;
  }

  return (
    <div className='pagination' {...rest}>
      <ul className='pagination-ul'>
        { /* loop to create the pagination links from 0 to totalPage */ }
        {Array.from({length: totalPage}).map((_, i) => (
          <li key={i}>
            <Link href={urlToRelativeString(url, {page: i > 0 ? i+1 : null})} activeClass='active' activeFactors={['page']}>{i+1}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pagination;
