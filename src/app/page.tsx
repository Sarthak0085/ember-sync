import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className='flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 py-12 text-center'>
      <section className='max-w-6xl w-full flex flex-col items-center md:flex-row gap-4'>
        <div className='w-full'>
          <h1 className='text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-50 mb-6 leading-tight'>
            <span className='bg-gradient-to-r from-blue-600 to-emerald-600 text-transparent bg-clip-text'>
              Your Digital Identity, Under Your Control
            </span>{' '}
          </h1>
          <p className='text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto'>
            Sign up effortlessly with custom, Google, or GitHub authentication.
            Create, view, and manage your personal profile with ease.
          </p>

          <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
            <Link href='/auth/register' passHref>
              <Button
                size='lg'
                className='px-8 py-3 text-lg font-semibold rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl'
              >
                Join for Free <ArrowRight className='ml-2 h-5 w-5' />
              </Button>
            </Link>
            <Link href='/auth/login' passHref>
              <Button
                size='lg'
                variant='outline'
                className='px-8 py-3 text-lg font-semibold rounded-full border-2 transition-all duration-300 hover:scale-105'
              >
                Account Exists
              </Button>
            </Link>
          </div>
        </div>
        <div className='md:mt-0 mt-16 md:min-w-[50%] shadow-md hover:scale-95 rounded-lg'>
          <Image
            src='/embersync.png'
            alt='App Illustration'
            className='w-full h-auto'
            width={100}
            height={100}
            sizes='100vw'
          />
        </div>
      </section>
    </main>
  );
}
