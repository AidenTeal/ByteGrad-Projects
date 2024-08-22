import AccountButton from '@/components/account-button';
import ContentBlock from '@/components/content-block'
import H1 from '@/components/h1'
import { checkAuth } from '@/lib/server-utils';
import React from 'react'

export default async function Page() {
  // Authentication check
  const session = await checkAuth();

  return (
    <main>
      <H1 className="my-8 text-white">Your Account</H1>

      <ContentBlock className="h-[500px] flex flex-col gap-3 items-center justify-center">
        <p>Logged in as {session.user.email}</p>

        <AccountButton />
      </ContentBlock>
    </main>
  )
}
