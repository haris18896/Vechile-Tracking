/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'

// ** Components
import GroupTable from 'src/views/catalogs/group/group-table'
import GroupHeader from 'src/views/catalogs/group/group-header'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'

// ** ACL
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { getAllGroupAction } from 'src/store/catalogs/group/groupAction'

function Group() {
  const ability = useContext(AbilityContext)

  const dispatch = useDispatch()
  const router = useRouter()
  const [account, setAccount] = useState('')
  const [slug, setSlug] = useState('')

  const onChangeHandler = (name, value) => {
    console.log('check value =>', value)
    setAccount(value)
  }

  const { loading, getAllGroupList } = useSelector(state => state.group)

  const rows = getAllGroupList?.data
  const total = getAllGroupList?.total
  const limit = getAllGroupList?.limit
  const page = getAllGroupList?.page

  // **  List
  // useEffect(() => {
  //   dispatch(getAllGroupAction({ page, limit, slug }))
  // }, [page, limit])

  const handleLimitChange = e => {
    dispatch(handleLimitAction({ newLimit: e.target.value, oldLimit: limit }))
  }

  const handlePageChange = pg => {
    dispatch(handlePageAction({ page: pg, limit }))
  }

  return (
    <>
      <GroupHeader router={router} ability={ability} account={account} onChangeHandler={onChangeHandler} />

      <GroupTable
        rows={rows}
        page={1}
        limit={10}
        total={10}
        router={router}
        ability={ability}
        handlePageChange={handlePageChange}
        handleLimitChange={handleLimitChange}
      />
    </>
  )
}

Group.acl = {
  action: 'manage',
  subject: 'manage-group'
}

Group.AuthGuard = true

export default Group
