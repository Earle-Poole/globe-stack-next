import { HomeProps } from '@/components/templates/home/Home'
import { GetServerSidePropsContext, NextPage } from 'next'
import { getProviders, getSession, useSession } from 'next-auth/react'
import Home from '../components/templates/home'

const Main: NextPage<HomeProps> = (props) => {
  return <Home {...props} />
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession({ req: context.req })

  return { props: { userSession: session } }
}

export default Main
