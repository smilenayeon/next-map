import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import { disconnect } from 'process';

export default function Page({
  number,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <div>
    <h1>get Static props</h1>
    <h2>number: {number}</h2>
  </div>
}

export const getStaticProps:GetStaticProps<{
    number:number;
}> = async (context) => {
  const num = await fetch('https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain&rnd=new')
  const number = await num.json();
  return { props: { number } };
};
 
