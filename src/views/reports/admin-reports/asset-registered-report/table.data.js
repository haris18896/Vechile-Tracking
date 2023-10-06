// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import { chipStatus } from 'src/components/states/chips'

// ** Icon import
import { Icon } from '@iconify/react'

export const columns = () => {
  return [
    {
      name: 'Account ID',
      sortable: true,
      selector: row => row.acc_id
    },

    {
      name: 'Company Name',
      sortable: true,
      selector: row => row.comp_name
    },

    {
      name: 'Device ID',
      sortable: true,
      selector: row => row.device_id
    },

    {
      name: 'Plates',
      sortable: true,
      selector: row => row.plates
    },

    {
      name: 'Serial Number',
      sortable: true,
      selector: row => row.serial_no
    },

    {
      name: 'Device',
      sortable: true,
      selector: row => row.device
    },

    {
      name: 'IMEI',
      sortable: true,
      selector: row => row.imei
    },

    {
      name: 'SO#',
      sortable: true,
      selector: row => row.so
    },

    {
      name: 'Installation Date',
      sortable: true,
      selector: row => row.install_date
    },

    {
      name: 'Expiry Date',
      sortable: true,
      selector: row => row.exp_date
    },

    {
      name: 'Installer',
      sortable: true,
      selector: row => row.installer
    },

    {
      name: 'Installation Type',
      sortable: true,
      selector: row => row.install_type
    },

    {
      name: 'Asset Type',
      sortable: true,
      selector: row => row.asset_type
    },

    {
      name: 'Activity',
      sortable: true,
      selector: row => row.activity
    },

    {
      name: 'Asset Status',
      sortable: true,
      selector: row => row.asset_status
    },

    {
      name: 'Register Date',
      sortable: true,
      selector: row => row.reg_date
    },

    {
      name: 'WASL Registration Date',
      sortable: true,
      selector: row => row.wasl_reg_date
    },

    {
      name: 'Vehicle Registered By',
      sortable: true,
      selector: row => row.vehicle_reg_by
    },

    {
      name: 'WASL Registered By',
      sortable: true,
      selector: row => row.wasl_reg_by
    },

    {
      name: 'Vehicle Edited By',
      sortable: true,
      selector: row => row.vehicle_edited_by
    },

    {
      name: 'Owner Name',
      sortable: true,
      selector: row => row.owner_name
    },

    {
      name: 'Owner Mobile Number',
      sortable: true,
      selector: row => row.owner_mob_no
    },

    {
      name: 'Driver Name',
      sortable: true,
      selector: row => row.driver_name
    },

    {
      name: 'Driver Mobile Number',
      sortable: true,
      selector: row => row.driver_mobile_no
    },

    {
      name: 'Reseller Name',
      sortable: true,
      selector: row => row.reseller_name
    },

    {
      name: 'Country',
      sortable: true,
      selector: row => row.country
    },

    {
      name: 'City',
      sortable: true,
      selector: row => row.city
    },

    {
      name: 'Termination/Attrition',
      sortable: true,
      selector: row => row.termination
    },

    {
      name: 'Reason',
      sortable: true,
      selector: row => row.reason
    }
  ]
}

export const rows = [
  {
    acc_id: '769IJA',
    comp_name: 'N/A',
    device_id: 'D123GF33',
    plates: 'Metallic',
    serial_no: '12345-2131-09HJ',
    device: 'Tangible',
    imei: '12332543534543',
    so: 'N/A',
    install_date: '2021-05-01T12:00:00',
    exp_date: '2023-05-01T12:00:00',
    installer: 'N/A',
    install_type: 'Modern',
    asset_type: 'N/A',
    activity: 'N/A',
    asset_status: 'Active',
    reg_date: '2021-05-01T12:00:00',
    wasl_reg_date: '2021-05-01T12:00:00',
    vehicle_reg_by: '2021-05-01T12:00:00',
    wasl_reg_by: '2021-05-01T12:00:00',
    vehicle_edited_by: '2021-05-01T12:00:00',
    owner_name: 'Amir',
    owner_mob_no: 'N/A',
    driver_name: 'Omar',
    driver_mobile_no: 'N/A',
    reseller_name: 'Shoaib',
    country: 'UAE',
    city: 'Jeddah',
    termination: 'Not Found',
    reason: 'Not Exist'
  },
  {
    acc_id: '769IJA',
    comp_name: 'N/A',
    device_id: 'D123GF33',
    plates: 'Metallic',
    serial_no: '12345-2131-09HJ',
    device: 'Tangible',
    imei: '12332543534543',
    so: 'N/A',
    install_date: '2021-05-01T12:00:00',
    exp_date: '2023-05-01T12:00:00',
    installer: 'N/A',
    install_type: 'Modern',
    asset_type: 'N/A',
    activity: 'N/A',
    asset_status: 'Active',
    reg_date: '2021-05-01T12:00:00',
    wasl_reg_date: '2021-05-01T12:00:00',
    vehicle_reg_by: '2021-05-01T12:00:00',
    wasl_reg_by: '2021-05-01T12:00:00',
    vehicle_edited_by: '2021-05-01T12:00:00',
    owner_name: 'Amir',
    owner_mob_no: 'N/A',
    driver_name: 'Omar',
    driver_mobile_no: 'N/A',
    reseller_name: 'Shoaib',
    country: 'UAE',
    city: 'Jeddah',
    termination: 'Not Found',
    reason: 'Not Exist'
  },
  {
    acc_id: '769IJA',
    comp_name: 'N/A',
    device_id: 'D123GF33',
    plates: 'Metallic',
    serial_no: '12345-2131-09HJ',
    device: 'Tangible',
    imei: '12332543534543',
    so: 'N/A',
    install_date: '2021-05-01T12:00:00',
    exp_date: '2023-05-01T12:00:00',
    installer: 'N/A',
    install_type: 'Modern',
    asset_type: 'N/A',
    activity: 'N/A',
    asset_status: 'Active',
    reg_date: '2021-05-01T12:00:00',
    wasl_reg_date: '2021-05-01T12:00:00',
    vehicle_reg_by: '2021-05-01T12:00:00',
    wasl_reg_by: '2021-05-01T12:00:00',
    vehicle_edited_by: '2021-05-01T12:00:00',
    owner_name: 'Amir',
    owner_mob_no: 'N/A',
    driver_name: 'Omar',
    driver_mobile_no: 'N/A',
    reseller_name: 'Shoaib',
    country: 'UAE',
    city: 'Jeddah',
    termination: 'Not Found',
    reason: 'Not Exist'
  },
  {
    acc_id: '769IJA',
    comp_name: 'N/A',
    device_id: 'D123GF33',
    plates: 'Metallic',
    serial_no: '12345-2131-09HJ',
    device: 'Tangible',
    imei: '12332543534543',
    so: 'N/A',
    install_date: '2021-05-01T12:00:00',
    exp_date: '2023-05-01T12:00:00',
    installer: 'N/A',
    install_type: 'Modern',
    asset_type: 'N/A',
    activity: 'N/A',
    asset_status: 'Active',
    reg_date: '2021-05-01T12:00:00',
    wasl_reg_date: '2021-05-01T12:00:00',
    vehicle_reg_by: '2021-05-01T12:00:00',
    wasl_reg_by: '2021-05-01T12:00:00',
    vehicle_edited_by: '2021-05-01T12:00:00',
    owner_name: 'Amir',
    owner_mob_no: 'N/A',
    driver_name: 'Omar',
    driver_mobile_no: 'N/A',
    reseller_name: 'Shoaib',
    country: 'UAE',
    city: 'Jeddah',
    termination: 'Not Found',
    reason: 'Not Exist'
  },
  {
    acc_id: '769IJA',
    comp_name: 'N/A',
    device_id: 'D123GF33',
    plates: 'Metallic',
    serial_no: '12345-2131-09HJ',
    device: 'Tangible',
    imei: '12332543534543',
    so: 'N/A',
    install_date: '2021-05-01T12:00:00',
    exp_date: '2023-05-01T12:00:00',
    installer: 'N/A',
    install_type: 'Modern',
    asset_type: 'N/A',
    activity: 'N/A',
    asset_status: 'Active',
    reg_date: '2021-05-01T12:00:00',
    wasl_reg_date: '2021-05-01T12:00:00',
    vehicle_reg_by: '2021-05-01T12:00:00',
    wasl_reg_by: '2021-05-01T12:00:00',
    vehicle_edited_by: '2021-05-01T12:00:00',
    owner_name: 'Amir',
    owner_mob_no: 'N/A',
    driver_name: 'Omar',
    driver_mobile_no: 'N/A',
    reseller_name: 'Shoaib',
    country: 'UAE',
    city: 'Jeddah',
    termination: 'Not Found',
    reason: 'Not Exist'
  },
  {
    acc_id: '769IJA',
    comp_name: 'N/A',
    device_id: 'D123GF33',
    plates: 'Metallic',
    serial_no: '12345-2131-09HJ',
    device: 'Tangible',
    imei: '12332543534543',
    so: 'N/A',
    install_date: '2021-05-01T12:00:00',
    exp_date: '2023-05-01T12:00:00',
    installer: 'N/A',
    install_type: 'Modern',
    asset_type: 'N/A',
    activity: 'N/A',
    asset_status: 'Active',
    reg_date: '2021-05-01T12:00:00',
    wasl_reg_date: '2021-05-01T12:00:00',
    vehicle_reg_by: '2021-05-01T12:00:00',
    wasl_reg_by: '2021-05-01T12:00:00',
    vehicle_edited_by: '2021-05-01T12:00:00',
    owner_name: 'Amir',
    owner_mob_no: 'N/A',
    driver_name: 'Omar',
    driver_mobile_no: 'N/A',
    reseller_name: 'Shoaib',
    country: 'UAE',
    city: 'Jeddah',
    termination: 'Not Found',
    reason: 'Not Exist'
  },
  {
    acc_id: '769IJA',
    comp_name: 'N/A',
    device_id: 'D123GF33',
    plates: 'Metallic',
    serial_no: '12345-2131-09HJ',
    device: 'Tangible',
    imei: '12332543534543',
    so: 'N/A',
    install_date: '2021-05-01T12:00:00',
    exp_date: '2023-05-01T12:00:00',
    installer: 'N/A',
    install_type: 'Modern',
    asset_type: 'N/A',
    activity: 'N/A',
    asset_status: 'Active',
    reg_date: '2021-05-01T12:00:00',
    wasl_reg_date: '2021-05-01T12:00:00',
    vehicle_reg_by: '2021-05-01T12:00:00',
    wasl_reg_by: '2021-05-01T12:00:00',
    vehicle_edited_by: '2021-05-01T12:00:00',
    owner_name: 'Amir',
    owner_mob_no: 'N/A',
    driver_name: 'Omar',
    driver_mobile_no: 'N/A',
    reseller_name: 'Shoaib',
    country: 'UAE',
    city: 'Jeddah',
    termination: 'Not Found',
    reason: 'Not Exist'
  },
  {
    acc_id: '769IJA',
    comp_name: 'N/A',
    device_id: 'D123GF33',
    plates: 'Metallic',
    serial_no: '12345-2131-09HJ',
    device: 'Tangible',
    imei: '12332543534543',
    so: 'N/A',
    install_date: '2021-05-01T12:00:00',
    exp_date: '2023-05-01T12:00:00',
    installer: 'N/A',
    install_type: 'Modern',
    asset_type: 'N/A',
    activity: 'N/A',
    asset_status: 'Active',
    reg_date: '2021-05-01T12:00:00',
    wasl_reg_date: '2021-05-01T12:00:00',
    vehicle_reg_by: '2021-05-01T12:00:00',
    wasl_reg_by: '2021-05-01T12:00:00',
    vehicle_edited_by: '2021-05-01T12:00:00',
    owner_name: 'Amir',
    owner_mob_no: 'N/A',
    driver_name: 'Omar',
    driver_mobile_no: 'N/A',
    reseller_name: 'Shoaib',
    country: 'UAE',
    city: 'Jeddah',
    termination: 'Not Found',
    reason: 'Not Exist'
  },
  {
    acc_id: '769IJA',
    comp_name: 'N/A',
    device_id: 'D123GF33',
    plates: 'Metallic',
    serial_no: '12345-2131-09HJ',
    device: 'Tangible',
    imei: '12332543534543',
    so: 'N/A',
    install_date: '2021-05-01T12:00:00',
    exp_date: '2023-05-01T12:00:00',
    installer: 'N/A',
    install_type: 'Modern',
    asset_type: 'N/A',
    activity: 'N/A',
    asset_status: 'Active',
    reg_date: '2021-05-01T12:00:00',
    wasl_reg_date: '2021-05-01T12:00:00',
    vehicle_reg_by: '2021-05-01T12:00:00',
    wasl_reg_by: '2021-05-01T12:00:00',
    vehicle_edited_by: '2021-05-01T12:00:00',
    owner_name: 'Amir',
    owner_mob_no: 'N/A',
    driver_name: 'Omar',
    driver_mobile_no: 'N/A',
    reseller_name: 'Shoaib',
    country: 'UAE',
    city: 'Jeddah',
    termination: 'Not Found',
    reason: 'Not Exist'
  },
  {
    acc_id: '769IJA',
    comp_name: 'N/A',
    device_id: 'D123GF33',
    plates: 'Metallic',
    serial_no: '12345-2131-09HJ',
    device: 'Tangible',
    imei: '12332543534543',
    so: 'N/A',
    install_date: '2021-05-01T12:00:00',
    exp_date: '2023-05-01T12:00:00',
    installer: 'N/A',
    install_type: 'Modern',
    asset_type: 'N/A',
    activity: 'N/A',
    asset_status: 'Active',
    reg_date: '2021-05-01T12:00:00',
    wasl_reg_date: '2021-05-01T12:00:00',
    vehicle_reg_by: '2021-05-01T12:00:00',
    wasl_reg_by: '2021-05-01T12:00:00',
    vehicle_edited_by: '2021-05-01T12:00:00',
    owner_name: 'Amir',
    owner_mob_no: 'N/A',
    driver_name: 'Omar',
    driver_mobile_no: 'N/A',
    reseller_name: 'Shoaib',
    country: 'UAE',
    city: 'Jeddah',
    termination: 'Not Found',
    reason: 'Not Exist'
  },
  {
    acc_id: '769IJA',
    comp_name: 'N/A',
    device_id: 'D123GF33',
    plates: 'Metallic',
    serial_no: '12345-2131-09HJ',
    device: 'Tangible',
    imei: '12332543534543',
    so: 'N/A',
    install_date: '2021-05-01T12:00:00',
    exp_date: '2023-05-01T12:00:00',
    installer: 'N/A',
    install_type: 'Modern',
    asset_type: 'N/A',
    activity: 'N/A',
    asset_status: 'Active',
    reg_date: '2021-05-01T12:00:00',
    wasl_reg_date: '2021-05-01T12:00:00',
    vehicle_reg_by: '2021-05-01T12:00:00',
    wasl_reg_by: '2021-05-01T12:00:00',
    vehicle_edited_by: '2021-05-01T12:00:00',
    owner_name: 'Amir',
    owner_mob_no: 'N/A',
    driver_name: 'Omar',
    driver_mobile_no: 'N/A',
    reseller_name: 'Shoaib',
    country: 'UAE',
    city: 'Jeddah',
    termination: 'Not Found',
    reason: 'Not Exist'
  },
  {
    acc_id: '769IJA',
    comp_name: 'N/A',
    device_id: 'D123GF33',
    plates: 'Metallic',
    serial_no: '12345-2131-09HJ',
    device: 'Tangible',
    imei: '12332543534543',
    so: 'N/A',
    install_date: '2021-05-01T12:00:00',
    exp_date: '2023-05-01T12:00:00',
    installer: 'N/A',
    install_type: 'Modern',
    asset_type: 'N/A',
    activity: 'N/A',
    asset_status: 'Active',
    reg_date: '2021-05-01T12:00:00',
    wasl_reg_date: '2021-05-01T12:00:00',
    vehicle_reg_by: '2021-05-01T12:00:00',
    wasl_reg_by: '2021-05-01T12:00:00',
    vehicle_edited_by: '2021-05-01T12:00:00',
    owner_name: 'Amir',
    owner_mob_no: 'N/A',
    driver_name: 'Omar',
    driver_mobile_no: 'N/A',
    reseller_name: 'Shoaib',
    country: 'UAE',
    city: 'Jeddah',
    termination: 'Not Found',
    reason: 'Not Exist'
  },
  {
    acc_id: '769IJA',
    comp_name: 'N/A',
    device_id: 'D123GF33',
    plates: 'Metallic',
    serial_no: '12345-2131-09HJ',
    device: 'Tangible',
    imei: '12332543534543',
    so: 'N/A',
    install_date: '2021-05-01T12:00:00',
    exp_date: '2023-05-01T12:00:00',
    installer: 'N/A',
    install_type: 'Modern',
    asset_type: 'N/A',
    activity: 'N/A',
    asset_status: 'Active',
    reg_date: '2021-05-01T12:00:00',
    wasl_reg_date: '2021-05-01T12:00:00',
    vehicle_reg_by: '2021-05-01T12:00:00',
    wasl_reg_by: '2021-05-01T12:00:00',
    vehicle_edited_by: '2021-05-01T12:00:00',
    owner_name: 'Amir',
    owner_mob_no: 'N/A',
    driver_name: 'Omar',
    driver_mobile_no: 'N/A',
    reseller_name: 'Shoaib',
    country: 'UAE',
    city: 'Jeddah',
    termination: 'Not Found',
    reason: 'Not Exist'
  },
  {
    acc_id: '769IJA',
    comp_name: 'N/A',
    device_id: 'D123GF33',
    plates: 'Metallic',
    serial_no: '12345-2131-09HJ',
    device: 'Tangible',
    imei: '12332543534543',
    so: 'N/A',
    install_date: '2021-05-01T12:00:00',
    exp_date: '2023-05-01T12:00:00',
    installer: 'N/A',
    install_type: 'Modern',
    asset_type: 'N/A',
    activity: 'N/A',
    asset_status: 'Active',
    reg_date: '2021-05-01T12:00:00',
    wasl_reg_date: '2021-05-01T12:00:00',
    vehicle_reg_by: '2021-05-01T12:00:00',
    wasl_reg_by: '2021-05-01T12:00:00',
    vehicle_edited_by: '2021-05-01T12:00:00',
    owner_name: 'Amir',
    owner_mob_no: 'N/A',
    driver_name: 'Omar',
    driver_mobile_no: 'N/A',
    reseller_name: 'Shoaib',
    country: 'UAE',
    city: 'Jeddah',
    termination: 'Not Found',
    reason: 'Not Exist'
  }
]
