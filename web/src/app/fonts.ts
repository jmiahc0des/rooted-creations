import { Big_Shoulders, Lobster, Bowlby_One, JetBrains_Mono } from 'next/font/google';

export const bigShoulders = Big_Shoulders({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  display: 'swap',
  variable: '--font-big-shoulders',
});

export const lobster = Lobster({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-lobster',
});

export const bowlby = Bowlby_One({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-bowlby',
});

export const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-jetbrains',
});
