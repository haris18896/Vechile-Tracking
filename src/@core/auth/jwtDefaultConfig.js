/* eslint-disable lines-around-comment */
import { MAIN_URL } from 'src/configs/constants'

export default {
  // registerEndpoint: '/jwt/register',
  loginEndpoint: `${MAIN_URL}/login`, // Login

  // ** Dashboard
  alertEndpoint: `${MAIN_URL}/portal/alerts`,

  // ** Tracking
  assetListEndpoint: `${MAIN_URL}/portal/dashboard_asset_list`, // Tracking Asset List
  assetCountDashBoard: `${MAIN_URL}/portal/dashboard_asset_count`, // Asset Count
  historyTrackingEndpoint: `${MAIN_URL}/portal/tracking_history`, // Tracking History
  detailedTrackingEndpoint: `${MAIN_URL}/portal/tracking_details`, // Detailed Tracking

  // ** Geofence -->
  geofenceListEndpoint: `${MAIN_URL}/portal/geofence`, // Gefence Types
  geofenceTypesEndpoint: `${MAIN_URL}/portal/geofence_types`, // Gefence Types

  // ** Reports
  trackDataReportEndpoint: `${MAIN_URL}/portal/track_data_report`, // Tracking Data Report
  fleetSummaryReportEndpoint: `${MAIN_URL}/portal/fleet_summary_report`, // Tracking Data Report
  eventReportEndpoint: `${MAIN_URL}/portal/event_report`, // Event Report

  // ** Graphs
  speedGraphEndpoint: `${MAIN_URL}/portal/speed_graph`, // speed graph endpoint

  // ** Catalogs
  usersEndPoint: `${MAIN_URL}/portal/users`, // Users
  usersAdminEndPoint: `${MAIN_URL}/portal/admin/users`, // Users
  registerUserEndpoint: `${MAIN_URL}/register`,
  registerVerifyEndpoint: `${MAIN_URL}/register/verify`,
  forgotPasswordEndPoint: `${MAIN_URL}/forgot-password`,
  resetPasswordEndPoint: `${MAIN_URL}/reset-password`,
  versionEndPoint: `${MAIN_URL}/portal/version`,
  userProfileEndPoint: `${MAIN_URL}/portal/profile`, // User Profile
  assetsEndPoint: `${MAIN_URL}/portal/assets`, // Assets
  assetsWaslEndPoint: `${MAIN_URL}/portal/asset_wasls`, // Assets
  assetsInfoEndPoint: `${MAIN_URL}/portal/asset_info`, // Asset Info
  devicesEndPoint: `${MAIN_URL}/portal/devices`, // Devices
  devicesAdminEndPoint: `${MAIN_URL}/portal/admin/devices`, // Admin Devices
  approveDevicesEndPoint: `${MAIN_URL}/portal/admin/approve_device`, // Approve Devices
  devicesUnAllocatedEndPoint: `${MAIN_URL}/portal/unallocated_devices`, // Unallocated Devices
  devicesMakeEndPoint: `${MAIN_URL}/portal/device_makes`, // Devices Make
  devicesMakeAdminEndPoint: `${MAIN_URL}/portal/admin/device_makes`, // Admin Devices Make
  devicesModelEndPoint: `${MAIN_URL}/portal/device_models`, // Devices Models
  devicesModelAdminEndPoint: `${MAIN_URL}/portal/admin/device_models`, // Devices Models
  campusesEndPoint: `${MAIN_URL}/portal/campuses`, // Campuses
  profilesEndPoint: `${MAIN_URL}/profiles`, // Profiles
  vpsSwitchEndPoint: `${MAIN_URL}/portal/version`, // VPS Switch
  driversEndPoint: `${MAIN_URL}/portal/drivers`, // Drivers
  driversWaslEndPoint: `${MAIN_URL}/portal/driver_wasls`, // Drivers wasl
  officeLocationEndPoint: `${MAIN_URL}/office_locations`, // Office Location
  workingHoursEndPoint: `${MAIN_URL}/working_hours`, // Working Hours
  employeesEndPoint: `${MAIN_URL}/employees`, // Employees
  inventoryEndPoint: `${MAIN_URL}/inventory`, // inventory
  fuelCalibrationEndPoint: `${MAIN_URL}/fuel_calibration`, // fuel-calibration
  simListingEndPoint: `${MAIN_URL}/portal/sims`, // SimListing
  simListingAdminEndPoint: `${MAIN_URL}/portal/admin/sims`, // SimListing
  groupEndPoint: `${MAIN_URL}/portal/asset_groups`, // Vehicle Group
  warehouseEndPoint: `${MAIN_URL}/warehouse`, // warehouse
  liveLocationEndPoint: `${MAIN_URL}/live_location`, // liveLocation
  emailTemplateEndPoint: `${MAIN_URL}/email_template`, // email template
  manageSMSEndPoint: `${MAIN_URL}/manage_sms`, // manage SMS
  manageEmailEndPoint: `${MAIN_URL}/manage_email`, // manage email
  testBenchEndPoint: `${MAIN_URL}/test_bench`, // testBench
  zonesEndPoint: `${MAIN_URL}/portal/zones`, // ** Zones
  devicesGroupsEndpoint: `${MAIN_URL}/`,

  platTypesEndPoint: `${MAIN_URL}/portal/plate_types`, // platTypes
  // ** Services

  // ** Settings
  rolesEndPoint: `${MAIN_URL}/portal/roles`, // Roles
  rolesAdminEndPoint: `${MAIN_URL}/portal/admin/roles`, // Roles
  customersEndPoint: `${MAIN_URL}/portal/admin/customers`, // Customers
  customersWaslEndPoint: `${MAIN_URL}/portal/admin/customer_wasls`, // Customers wasl
  switchDB: `${MAIN_URL}/portal/admin/switch-vps`, // Switch Customers DB
  unsetDB: `${MAIN_URL}/portal/admin/unset-vps`, // Unset Customers DB
  assetTypesEndPoint: `${MAIN_URL}/portal/asset_types`, // Asset Types
  permissionsEndPoint: `${MAIN_URL}/portal/permissions`, // Permissions
  deviceTypesEndpoint: `${MAIN_URL}/portal/admin/device_types`, // Device Types
  profileTypesEndPoint: `${MAIN_URL}/portal/profile_types`, // Profile Types
  customerTypesEndpoint: `${MAIN_URL}/portal/admin/customer_types`, // Customer Types
  resellerEndPoint: `${MAIN_URL}/portal/admin/resellers`, // Resellers
  activityEndpoint: `${MAIN_URL}/portal/admin/activities`, // activities

  // ** Locations
  getAllCountriesEndPoint: `${MAIN_URL}/countries`, // All Countries
  getAllStatesEndPoint: `${MAIN_URL}/states`, // All States
  getAllCitiesEndPoint: `${MAIN_URL}/cities`, // All Cities

  // ** This will be prefixed in authorization header with token
  // ? e.g. Authorization: Bearer <token>
  typeBearer: 'Bearer',

  // ** Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
