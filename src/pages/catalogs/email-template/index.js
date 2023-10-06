import React, { useState, useContext } from 'react'

// ** Components
import EmailTemplateTable from 'src/views/catalogs/email-template/email-template-table'
import EmailTemplateHeader from 'src/views/catalogs/email-template/email-template-header'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'

// ** ACL
import { AbilityContext } from 'src/layouts/components/acl/Can'

function EmailTemplate() {
  const ability = useContext(AbilityContext)

  const dispatch = useDispatch()

  // const { loading } = useSelector(state => state.)

  // // **  List
  // useEffect(() => {

  // }, [])

  const handleLimitChange = e => {
    // dispatch(handleLimitAction({ newLimit: e.target.value, oldLimit: limit }))
  }

  const handlePageChange = pg => {
    // dispatch(handlePageAction({ page: pg, limit }))
  }

  return (
    <>
      <EmailTemplateHeader ability={ability} />

      <EmailTemplateTable ability={ability} rows={[]} />
    </>
  )
}

EmailTemplate.acl = {
  action: 'manage',
  subject: 'manage-email-template'
}

EmailTemplate.AuthGuard = true

export default EmailTemplate
