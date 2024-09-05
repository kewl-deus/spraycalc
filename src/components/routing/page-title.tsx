import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export interface RouterTitleProps {
  title: string;
}

export const PageTitle = ({ title }: Readonly<RouterTitleProps>) => {
  const location = useLocation();
  useEffect(() => {
    document.title = title;
  }, [title, location]);

  return null;
};

export default PageTitle;
