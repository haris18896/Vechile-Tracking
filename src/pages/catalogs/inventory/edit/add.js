/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

// ** Utils
import { isObjEmpty } from 'src/configs/utils'

// ** Third Party Imports
import * as Yup from 'yup'
import { useFormik } from 'formik'

// ** Components
import AddEditInventoryHeader from 'src/views/catalogs/inventory/edit/add-edit-inventory-header'
import AddEditInventoryForm from 'src/views/catalogs/inventory/edit/add-edit-inventory-form'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import AddEditInventoryTable from 'src/views/catalogs/inventory/edit/add-edit-inventory-table'
import Inventory from "../index";

function AddInventory() {
  const router = useRouter()
  const dispatch = useDispatch()

  const schema = Yup.object().shape({
    account: Yup.string()
      .max(100, 'The name must not be greater than 10 characters.')
      .required('Account name is required.'),
    inventoryName: Yup.string()
      .max(100, 'The name must not be greater than 10 characters.')
      .required('Inventory name is required.'),
    inventoryNumber: Yup.string()
      .max(100, 'The name must not be greater than 10 characters.')
      .required('Inventory number is required.'),
    warehouse: Yup.string()
      .max(100, 'The name must not be greater than 10 characters.')
      .required('Warehouse is required.'),
    storingCategory: Yup.string()
      .max(100, 'The name must not be greater than 10 characters.')
      .required('Storing category is required.'),
    storingType: Yup.string()
      .max(100, 'The name must not be greater than 10 characters.')
      .required('Storing type is required.')
  })

  const addInventoryFormik = useFormik({
    initialValues: {
      account: '',
      warehouse: '',
      storingType: '',
      inventoryName: '',
      inventoryNumber: '',
      storingCategory: ''
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      if (isObjEmpty(addInventoryFormik.errors)) {
        const data = new FormData()
        data.append('account', values.account)
        data.append('warehouse', values.warehouse)
        data.append('storingType', values.storingType)
        data.append('inventoryName', values.inventoryName)
        data.append('inventoryNumber', values.inventoryNumber)
        data.append('storingCategory', values.storingCategory)

        // dispatch(registerInventoryAction({ data, router }))
      }
    }
  })

  return (
    <>
      <AddEditInventoryHeader
        loading={false}
        router={router}
        formik={addInventoryFormik}
        submitHandler={addInventoryFormik.handleSubmit}
      />

      <AddEditInventoryForm router={router} formik={addInventoryFormik} />

      <AddEditInventoryTable />
    </>
  )
}

AddInventory.acl = {
  action: 'manage',
  subject: 'manage-inventory'
}

AddInventory.AuthGuard = true

export default AddInventory
