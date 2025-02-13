export function getHost() {
    if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production') {
      return 'iam-nantais.vercel.app';
    } else if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview') {
      return 'iam-nantais-staging.vercel.app';
    } else {
      return 'iam-nantais-dev.vercel.app';
    }
  }
  