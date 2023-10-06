// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// ** Reducers
import TabsReducer from 'src/store/tabs'
import ProfileReducer from './profile/profileSlice'
import AuthReducer from './authentication/authSlice'

// ** Catalogs
import zoneSlice from './catalogs/zone/zoneSlice'
import groupSlice from './catalogs/group/groupSlice'
import UsersSlice from './catalogs/users/usersSlice'
import assetsSlice from './catalogs/assets/assetsSlice'
import CampusesSlice from './catalogs/campus/campusSlice'
import driversSlice from './catalogs/driver/driversSlice'
import devicesSlice from './catalogs/devices/devicesSlice'
import ProfilesSlice from './catalogs/profile/profileSlice'
import InventorySlice from './catalogs/inventory/inventorySlice'
import warehouseSlice from './catalogs/warehouse/warehouseSlice'
import employeesSlice from './catalogs/employees/employeesSlice'
import ManageSMSSlice from './catalogs/manage-sms/manageSMSSlice'
import SimListingSlice from './catalogs/sim-listing/simListingSlice'
import ManageEmailSlice from './catalogs/manage-email/manageEmailSlice'
import workingHoursSlice from './catalogs/working-hours/workingHoursSlice'
import LiveLocationSlice from './catalogs/live-location/liveLocationSlice'
import EmailTemplateSlice from './catalogs/email-template/emailTemplateSlice'
import OfficeLocationsSlice from './catalogs/office-location/officeLocationSlice'
import FuelCalibrationSlice from './catalogs/fuel-calibration/fuelCalibrationSlice'
import ManageTestBenchSlice from './catalogs/manage-test-bench/manageTestBenchSlice'
import PlateTypeSlice from './catalogs/plate-type/plateTypeSlice'

// ** Settings
import RolesSlice from './settings/roles/rolesSlice'
import ResellerSlice from './settings/reseller/resellerSlice'
import CustomerSlice from './settings/customers/customersSlice'
import ActivityReducer from './settings/activity/activitySlice'
import PermissionSlice from './settings/permissions/permissionSlice'
import AssetTypesSlice from './settings/asset-types/assetTypesSlice'
import DeviceTypesSlice from './settings/device-types/deviceTypesSlice'
import ProfileTypesSlice from './settings/profile-types/profileTypesSlice'
import CustomerTypesSlice from './settings/customer-types/customerTypesSlice'

//dashbaord
import AssetsInfoSlice from './dashboard/assets/assetsInfoSlice'

import AlertSlice from './dashboard/alerts/alertSlice'
// ** Locations
import LocationsSlice from './locations/locationsSlice'
import devicesMakeSlice from './catalogs/device-make/devicesMakeSlice'
import devicesModelSlice from './catalogs/device-model/devicesModelSlice'
import trackReportSlice from './reports/tracking/trackingReportSlice'
import trackingSlice from './tracking/index/trackingSlice'
import fleetReportSlice from './reports/fleet/fleetReportSlice'
import EventReportSlice from './reports/event/eventSlice'
import geofenceSlice from './tracking/geofence/geofenceSlice'

// ** Graphs
import SpeedSlice from './graphs/speed/speedSlice'

const authPersistConfig = {
  key: 'auth',
  storage: storage,
  whitelist: ['user']
}

// ** persistence configuration
const persistedAuthReducer = persistReducer(authPersistConfig, AuthReducer)

export const store = configureStore({
  reducer: {
    tabs: TabsReducer,
    auth: persistedAuthReducer,
    userProfile: ProfileReducer,

    tracking: trackingSlice,
    geofence: geofenceSlice,

    trackReport: trackReportSlice,
    fleetReport: fleetReportSlice,
    eventReport: EventReportSlice,

    users: UsersSlice,
    zone: zoneSlice,
    group: groupSlice,
    assets: assetsSlice,
    driver: driversSlice,
    devices: devicesSlice,
    campus: CampusesSlice,
    profile: ProfilesSlice,
    employees: employeesSlice,
    manageSMS: ManageSMSSlice,
    warehouse: warehouseSlice,
    inventory: InventorySlice,
    simListing: SimListingSlice,
    manageEmail: ManageEmailSlice,
    workingHours: workingHoursSlice,
    testBench: ManageTestBenchSlice,
    liveLocation: LiveLocationSlice,
    emailTemplate: EmailTemplateSlice,
    fuelCalibration: FuelCalibrationSlice,
    officeLocation: OfficeLocationsSlice,

    roles: RolesSlice,
    reseller: ResellerSlice,
    customers: CustomerSlice,
    activity: ActivityReducer,
    assetTypes: AssetTypesSlice,
    permissions: PermissionSlice,
    deviceTypes: DeviceTypesSlice,
    devicesMake: devicesMakeSlice,
    devicesModel: devicesModelSlice,
    profileTypes: ProfileTypesSlice,
    customerTypes: CustomerTypesSlice,

    locations: LocationsSlice,

    assetsInfo: AssetsInfoSlice,
    alerts: AlertSlice,

    speed: SpeedSlice,
    platType: PlateTypeSlice
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutabilityCheck: false
    })
})

// Create a persisted store
export const persistor = persistStore(store)
