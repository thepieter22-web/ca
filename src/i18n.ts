import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';

export default getRequestConfig(async ({locale}) => {
  if (locale !== 'nl') notFound();

  return {
    messages: (await import('./messages/nl.json')).default
  };
});
