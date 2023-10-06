import React from 'react'
import { useRouter } from 'next/router'

// ** Imports
import BlankLayout from 'src/@core/layouts/BlankLayout'
import LoginPage from 'src/pages/login'

// export async function getServerSideProps(context) {
//   const slug = context.query.slug

//   return {
//     props: {
//       slug
//     }
//   }
// }

// export default function LoginCustomer({ slug }) {
//   return <LoginPage slug={slug} />
// }

export default function LoginCustomer() {
  const router = useRouter()
  const slug = router.query.slug

  if (slug) {
    return <LoginPage slug={slug} />
  }
}

LoginCustomer.getLayout = page => <BlankLayout>{page}</BlankLayout>
LoginCustomer.guestGuard = true
