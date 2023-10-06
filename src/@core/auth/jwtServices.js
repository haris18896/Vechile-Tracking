import axios from 'axios'
import jwtDefaultConfig from './jwtDefaultConfig'
import useJwt from 'src/auth/jwt/useJwt'
import { getNull } from 'src/utilities/utils'

export default class JwtService {
  jwtConfig = { ...jwtDefaultConfig }

  constructor(jwtOverrideConfig) {
    this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig }

    axios.interceptors.request.use(
      config => {
        const accessToken = this.getToken()
        if (accessToken) {
          config.headers.Authorization = `${this.jwtConfig.typeBearer} ${accessToken}`
        }
        config.headers['Access-Control-Allow-Origin'] = '*'

        return config
      },
      error => Promise.reject(error)
    )

    axios.interceptors.response.use(
      response => response,
      error => {
        const { response } = error
        if (response && response.status === 401) {
          // localStorage.clear()
          // window.location.href = '/login'
        }

        return Promise.reject(error)
      }
    )
  }

  // ** utils
  getToken() {
    return localStorage.getItem(this.jwtConfig.storageTokenKeyName)
  }

  setToken(value) {
    localStorage.setItem(this.jwtConfig.storageTokenKeyName, value)
  }

  getUserData() {
    return JSON.parse(localStorage.getItem('userData'))
  }

  getSuperAdmin() {
    const is_super_admin = this.getUserData()?.is_super_admin

    return is_super_admin
  }

  getVpsId() {
    return this.getUserData()?.vps_id == 1
  }

  setUserData(value) {
    localStorage.setItem('userData', JSON.stringify(value))
  }

  setSlug(value) {
    localStorage.setItem('slug', value)
  }

  getSlug() {
    return localStorage.getItem('slug')
  }

  setData(name, value) {
    localStorage.setItem(`${name}`, JSON.stringify(value))
  }

  getData(name) {
    return JSON.parse(localStorage.getItem(`${name}`))
  }

  // ** Authentication
  login(data) {
    return axios.post(this.jwtConfig.loginEndpoint, data)
  }

  versionPermission(data) {
    return axios.get(this.jwtConfig.versionEndPoint, data)
  }

  register(data) {
    const endpoint = `${this.jwtConfig.registerUserEndpoint}`

    return axios.post(endpoint, data)
  }

  forgotPassword(data) {
    return axios.post(this.jwtConfig.forgotPasswordEndPoint, data)
  }

  resetPassword(data) {
    return axios.post(this.jwtConfig.resetPasswordEndPoint, data)
  }

  verifyRegistration(data) {
    return axios.post(this.jwtConfig.registerVerifyEndpoint, data)
  }

  // ** User Profile
  updateUserProfile(data) {
    return axios.post(this.jwtConfig.userProfileEndPoint, data)
  }

  switchVPS() {
    return axios.get(this.jwtConfig.vpsSwitchEndPoint)
  }

  //**  Reseller

  getAllReseller(page, limit) {
    let endpoint = `${this.jwtConfig.resellerEndPoint}`

    return axios.get(endpoint)
  }

  registerReseller(data) {
    return axios.post(this.jwtConfig.resellerEndPoint, data)
  }

  getResellerById(id) {
    return axios.get(`${this.jwtConfig.resellerEndPoint}/${id}`)
  }

  updateReseller(id, data) {
    const endpoint = `${this.jwtConfig.resellerEndPoint}/${id}`

    return axios.put(endpoint, data)
  }

  deleteReseller(id) {
    return axios.delete(`${this.jwtConfig.resellerEndPoint}/${id}`)
  }

  // **  Permissions
  getAllPermissions(page, limit) {
    const vps_id = useJwt.getData('vps_id')

    if (vps_id) {
      // admin wala endpoint
    } else {
      // normal endpoint
    }
    let endpoint = `${this.jwtConfig.permissionsEndPoint}?page=${page}&limit=${limit}`

    return axios.get(endpoint)
  }

  registerPermission(data) {
    return axios.post(this.jwtConfig.permissionsEndPoint, data)
  }

  getPermissionById(id) {
    return axios.get(`${this.jwtConfig.permissionsEndPoint}/${id}`)
  }

  updatePermission(id, data) {
    return axios.put(`${this.jwtConfig.permissionsEndPoint}/${id}`, data)
  }

  deletePermission(id) {
    return axios.delete(`${this.jwtConfig.permissionsEndPoint}/${id}`)
  }

  // ** Roles
  getAllRoles(page, limit) {
    let endpoint = `${
      this.getSuperAdmin() ? this.jwtConfig.rolesAdminEndPoint : this.jwtConfig.rolesEndPoint
    }?page=${page}&limit=${limit}`

    return axios.get(endpoint)
  }

  registerRole(data) {
    let endPoint = `${this.getSuperAdmin() ? this.jwtConfig.rolesAdminEndPoint : this.jwtConfig.rolesEndPoint}`

    return axios.post(endPoint, data)
  }

  getRoleById(id) {
    return axios.get(`${this.jwtConfig.rolesEndPoint}/${id}`)
  }

  updateRole(id, data) {
    return axios.put(`${this.jwtConfig.rolesEndPoint}/${id}`, data)
  }

  deleteRole(id) {
    return axios.delete(`${this.jwtConfig.rolesEndPoint}/${id}`)
  }

  // ** Users
  getAllUsers(page, limit) {
    let endpoint = `${
      this.getVpsId() ? this.jwtConfig.usersAdminEndPoint : this.jwtConfig.usersEndPoint
    }?page=${page}&limit=${limit}`

    return axios.get(endpoint)
  }

  registerUser(data) {
    return axios.post(this.getVpsId() ? this.jwtConfig.usersAdminEndPoint : this.jwtConfig.usersEndPoint, data)
  }

  getUserById(id) {
    return axios.get(`${this.jwtConfig.usersEndPoint}/${id}`)
  }

  updateUser(id, data) {
    return axios.post(`${this.jwtConfig.usersEndPoint}/${id}?_method=PUT`, data)
  }

  // ** Customers
  getAllCustomers(page, limit) {
    const endpoint = `${this.jwtConfig.customersEndPoint}?page=${page}&limit=${limit}`

    return axios.get(endpoint)
  }

  getAllWASLCustomers(page, limit) {
    const endpoint = `${this.jwtConfig.customersWaslEndPoint}?page=${page}&limit=${limit}`

    return axios.get(endpoint)
  }

  registerCustomer(data) {
    return axios.post(this.jwtConfig.customersEndPoint, data)
  }
  registerWaslCustomer(data) {
    return axios.post(this.jwtConfig.customersWaslEndPoint, data)
  }

  getCustomerById(id) {
    return axios.get(`${this.jwtConfig.customersEndPoint}/${id}`)
  }

  updateCustomer(id, data) {
    return axios.put(`${this.jwtConfig.customersEndPoint}/${id}`, data)
  }

  updateWaslCustomer(id, data) {
    return axios.put(`${this.jwtConfig.customersWaslEndPoint}/${id}`, data)
  }

  deleteCustomer(id) {
    return axios.delete(`${this.jwtConfig.customersEndPoint}/${id}`)
  }
  deleteWaslCustomer(id) {
    return axios.delete(`${this.jwtConfig.customersWaslEndPoint}/${id}`)
  }

  SwitchCustomerDB(id) {
    return axios.get(`${this.jwtConfig.switchDB}?vps_id=${id}`)
  }

  UnsetCustomersDB() {
    return axios.get(`${this.jwtConfig.unsetDB}`)
  }

  getAllCustomerTypes(page, limit) {
    const endpoint = `${this.jwtConfig.customerTypesEndpoint}?page=${page}&limit=${limit}`

    return axios.get(endpoint)
  }

  registerCustomerType(data) {
    return axios.post(this.jwtConfig.customerTypesEndpoint, data)
  }

  getCustomerTypeById(id) {
    return axios.get(`${this.jwtConfig.customerTypesEndpoint}/${id}`)
  }

  updateCustomerType(id, data) {
    return axios.put(`${this.jwtConfig.customerTypesEndpoint}/${id}`, data)
  }

  deleteCustomerType(id) {
    return axios.delete(`${this.jwtConfig.customerTypesEndpoint}/${id}`)
  }

  // ** Devices
  getAllDevices(page, limit) {
    const endpoint = `${
      this.getVpsId() ? this.jwtConfig.devicesAdminEndPoint : this.jwtConfig.devicesEndPoint
    }?page=${page}&limit=${limit}`

    return axios.get(endpoint)
  }

  approveDevice(device_id) {
    const endpoint = `${this.jwtConfig.approveDevicesEndPoint}/${device_id}`

    return axios.put(endpoint)
  }

  getAllUnAllocatedDevices(page, limit) {
    const endpoint = `${this.jwtConfig.devicesUnAllocatedEndPoint}?pages=${page}&limit=${limit}`

    return axios.get(endpoint)
  }

  registerDevice(file) {
    return axios.post(this.getVpsId() ? this.jwtConfig.devicesAdminEndPoint : this.jwtConfig.devicesEndPoint, file)
  }
  deleteDevice(id) {
    return axios.delete(`${this.jwtConfig.devicesEndPoint}/${id}`)
  }

  getAllDevicesTypes(page, limit) {
    const endpoint = `${this.jwtConfig.deviceTypesEndpoint}?page=${page}&limit=${limit}`

    return axios.get(endpoint)
  }

  registerDeviceType(data) {
    return axios.post(this.jwtConfig.deviceTypesEndpoint, data)
  }

  getDeviceTypeById(id) {
    return axios.get(`${this.jwtConfig.deviceTypesEndpoint}/${id}`)
  }

  updateDeviceType(id, data) {
    return axios.put(`${this.jwtConfig.deviceTypesEndpoint}/${id}`, data)
  }

  deleteDeviceType(id) {
    return axios.delete(`${this.jwtConfig.deviceTypesEndpoint}/${id}`)
  }

  // ** Device Make
  getAllDevicesMake(page, limit) {
    const endpoint = `${
      this.getVpsId() ? this.jwtConfig.devicesMakeAdminEndPoint : this.jwtConfig.devicesMakeEndPoint
    }?page=${page}&limit=${limit}`

    return axios.get(endpoint)
  }

  // ** Device Model
  getAllDevicesModel(page, limit) {
    const endpoint = `${
      this.getVpsId() ? this.jwtConfig.devicesModelAdminEndPoint : this.jwtConfig.devicesModelAdminEndPoint
    }?page=${page}&limit=${limit}`

    return axios.get(endpoint)
  }

  // ** Profiles
  getAllProfiles(page, limit) {
    const endpoint = `${this.jwtConfig.profilesEndPoint}?page=${page}&limit=${limit}`

    return axios.get(endpoint)
  }

  registerProfile(data) {
    return axios.post(this.jwtConfig.profilesEndPoint, data)
  }

  getProfileById(id) {
    return axios.get(`${this.jwtConfig.profilesEndPoint}/${id}`)
  }

  updateProfile(id, data) {
    return axios.post(`${this.jwtConfig.profilesEndPoint}/${id}?_method=PUT`, data)
  }

  // ** profile Types
  getAllProfileTypes(page, limit) {
    let endpoint = `${this.jwtConfig.profileTypesEndPoint}?page=${page}&limit=${limit}`

    return axios.get(endpoint)
  }

  registerProfileType(data) {
    return axios.post(this.jwtConfig.profileTypesEndPoint, data)
  }

  getProfileTypeById(id) {
    return axios.get(`${this.jwtConfig.profileTypesEndPoint}/${id}`)
  }

  updateProfileType(id, data) {
    return axios.put(`${this.jwtConfig.profileTypesEndPoint}/${id}`, data)
  }

  deleteProfileType(id) {
    return axios.delete(`${this.jwtConfig.profileTypesEndPoint}/${id}`)
  }

  // Activity
  getAllActivityTypes(page, limit) {
    let endpoint = `${this.jwtConfig.activityEndpoint}?page=${page}&limit=${limit}`

    return axios.get(endpoint)
  }

  registerActivityType(data) {
    return axios.post(this.jwtConfig.activityEndpoint, data)
  }

  getActivityTypeById(id) {
    return axios.get(`${this.jwtConfig.activityEndpoint}/${id}`)
  }

  updateActivityType(id, data) {
    return axios.put(`${this.jwtConfig.activityEndpoint}/${id}`, data)
  }

  deleteActivityType(id) {
    return axios.delete(`${this.jwtConfig.activityEndpoint}/${id}`)
  }

  // ** Campuses
  getAllCampuses(page, limit) {
    let endpoint = `${this.jwtConfig.campusesEndPoint}?page=${page}&limit=${limit}`

    return axios.get(endpoint)
  }

  registerCampus(data) {
    return axios.post(this.jwtConfig.campusesEndPoint, data)
  }

  getCampusById(id) {
    return axios.get(`${this.jwtConfig.campusesEndPoint}/${id}`)
  }

  updateCampus(id, data) {
    return axios.post(`${this.jwtConfig.campusesEndPoint}/${id}?_method=PUT`, data)
  }

  // ** Locations
  getAllCountries(page, limit) {
    const endpoint = `${this.jwtConfig.getAllCountriesEndPoint}?page=${page}&limit=${limit}`

    return axios.get(endpoint)
  }

  getAllStates(page, limit, countryId) {
    const endpoint = `${this.jwtConfig.getAllStatesEndPoint}?page=${page}
    &limit=${limit}&country_id=${countryId}`

    return axios.get(endpoint)
  }

  getAllCities(page, limit, stateId) {
    const endpoint = `${this.jwtConfig.getAllCitiesEndPoint}?page=${page}&limit=${limit}&state_id=${stateId}`

    return axios.get(endpoint)
  }

  getAddress(lat, lng, apiKey) {
    const endpoint = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`

    return axios.get(endpoint, { withCredentials: true })
  }

  getAssetsInfo(page, limit, asset_ids) {
    const endpoint = `${this.jwtConfig.assetsInfoEndPoint}`

    const config = {
      method: 'get',
      url: endpoint,
      params: {
        page: page,
        limit: limit,
        asset_ids: asset_ids
      }
    }

    return axios(config)
  }

  getAllAlerts(page, limit) {
    const endpoint = `${this.jwtConfig.alertEndpoint}?page=${page}&limit=${limit}`

    return axios.get(endpoint)
  }

  postAlerts(id, data) {
    return axios.post(`${this.jwtConfig.alertEndpoint}/${id}?_method=PUT`, data)
  }

  // ** Assets and Asset Types
  getAllAssets(page, limit, slug, name) {
    // const endpoint = `${this.jwtConfig.assetsEndPoint}?page=${page}&limit=${limit}&name=${name}`
    let param = `?page=${page}&limit=${limit}`
    if (name) {
      param += `&name=${name}`
    }
    const endpoint = `${this.jwtConfig.assetsEndPoint}${param}`

    return axios.get(endpoint)
  }

  getAllWASLAssets(page, limit, slug, name) {
    // const endpoint = `${this.jwtConfig.assetsEndPoint}?page=${page}&limit=${limit}&name=${name}`
    let param = `?page=${page}&limit=${limit}`
    if (name) {
      param += `&name=${name}`
    }
    const endpoint = `${this.jwtConfig.assetsWaslEndPoint}${param}`

    return axios.get(endpoint)
  }

  registerAsset(data) {
    return axios.post(this.jwtConfig.assetsEndPoint, data)
  }
  registerWaslAsset(data) {
    return axios.post(this.jwtConfig.assetsWaslEndPoint, data)
  }

  getAssetById(id) {
    let endpoint = `${this.jwtConfig.assetsEndPoint}/${id}`

    return axios.get(endpoint)
  }

  updateAsset(id, data) {
    return axios.post(`${this.jwtConfig.assetsEndPoint}/${id}?_method=PUT`, data)
  }

  updateWaslAsset(id, data) {
    return axios.put(`${this.jwtConfig.assetsWaslEndPoint}/${id}`, data)
  }

  deleteWaslAsset(id) {
    return axios.delete(`${this.jwtConfig.assetsWaslEndPoint}/${id}`)
  }

  getAllAssetTypes(page, limit) {
    let endpoint = `${this.jwtConfig.assetTypesEndPoint}?page=${page}&limit=${limit}`

    return axios.get(endpoint)
  }

  registerAssetType(data) {
    return axios.post(this.jwtConfig.assetTypesEndPoint, data)
  }

  getAssetTypeById(id) {
    return axios.get(`${this.jwtConfig.assetTypesEndPoint}/${id}`)
  }

  updateAssetType(id, data) {
    return axios.put(`${this.jwtConfig.assetTypesEndPoint}/${id}`, data)
  }

  deleteAssetType(id) {
    return axios.delete(`${this.jwtConfig.assetTypesEndPoint}/${id}`)
  }

  // ** Drivers
  getAllDrivers(page, limit) {
    let endpoint = `${this.jwtConfig.driversEndPoint}?page=${page}&limit=${limit}`

    return axios.get(endpoint)
  }

  getAllWASLDrivers(page, limit) {
    let endpoint = `${this.jwtConfig.driversWaslEndPoint}?page=${page}&limit=${limit}`

    return axios.get(endpoint)
  }

  registerDriver(data) {
    return axios.post(this.jwtConfig.driversEndPoint, data)
  }

  registerWASLDriver(data) {
    return axios.post(this.jwtConfig.driversWaslEndPoint, data)
  }

  getDriverById(id) {
    return axios.get(`${this.jwtConfig.driversEndPoint}/${id}`)
  }

  updateDriver(id, data) {
    let endpoint = `${this.jwtConfig.driversEndPoint}/${id}?_method=PUT`

    return axios.post(endpoint, data)
  }

  updateWaslDriver(id, data) {
    let endpoint = `${this.jwtConfig.driversWaslEndPoint}/${id}`

    return axios.put(endpoint, data)
  }

  deletWaslDriver(id) {
    return axios.delete(`${this.jwtConfig.driversWaslEndPoint}/${id}`)
  }

  // ** Office Location
  getAllOfficeLocations(page, limit) {
    let endpoint = `${this.jwtConfig.officeLocationEndPoint}?page=${page}&limit=${limit}`

    return axios.get(endpoint)
  }

  registerOfficeLocation(data) {
    return axios.post(this.jwtConfig.officeLocationEndPoint, data)
  }

  getOfficeLocationById(id) {
    return axios.get(`${this.jwtConfig.officeLocationEndPoint}/${id}`)
  }

  updateOfficeLocation(id, data) {
    let endpoint = `${this.jwtConfig.officeLocationEndPoint}/${id}?_method=PUT`

    return axios.post(endpoint, data)
  }

  // ** Working Hours
  getAllWorkingHours(page, limit) {
    let endpoint = `${this.jwtConfig.workingHoursEndPoint}?page=${page}&limit=${limit}`

    return axios.get(endpoint)
  }

  registerWorkingHours(data) {
    return axios.post(this.jwtConfig.workingHoursEndPoint, data)
  }

  getWorkingHours(id) {
    return axios.get(`${this.jwtConfig.workingHoursEndPoint}/${id}`)
  }

  updateWorkingHours(id, data) {
    let endpoint = `${this.jwtConfig.workingHoursEndPoint}/${id}?_method=PUT`

    return axios.post(endpoint, data)
  }

  // ** Employees
  getAllEmployees(page, limit) {
    let endpoint = `${this.jwtConfig.employeesEndPoint}?page=${page}&limit=${limit}`

    return axios.get(endpoint)
  }

  registerEmployee(data) {
    return axios.post(this.jwtConfig.employeesEndPoint, data)
  }

  getEmployeeById(id) {
    return axios.get(`${this.jwtConfig.employeesEndPoint}/${id}`)
  }

  updateEmployee(id, data) {
    let endpoint = `${this.jwtConfig.employeesEndPoint}/${id}?_method=PUT`

    return axios.post(endpoint, data)
  }

  // ** Inventory
  getAllInventory(page, limit) {
    let endpoint = `${this.jwtConfig.inventoryEndPoint}?page=${page}&limit=${limit}`

    return axios.get(endpoint)
  }

  registerInventory(data) {
    return axios.post(this.jwtConfig.inventoryEndPoint, data)
  }

  getInventoryById(id) {
    return axios.get(`${this.jwtConfig.inventoryEndPoint}/${id}`)
  }

  deleteInventory(id) {
    return axios.delete(`${this.jwtConfig.inventoryEndPoint}/${id}`)
  }

  updateInventory(id, data) {
    let endpoint = `${this.jwtConfig.inventoryEndPoint}/${id}?_method=PUT`

    return axios.post(endpoint, data)
  }

  // ** FuelCalibration
  getAllFuelCalibration(page, limit) {
    let endpoint = `${this.jwtConfig.fuelCalibrationEndPoint}?page=${page}&limit=${limit}`

    return axios.get(endpoint)
  }

  registerFuelCalibration(data) {
    return axios.post(this.jwtConfig.fuelCalibrationEndPoint, data)
  }

  getFuelCalibrationById(id) {
    return axios.get(`${this.jwtConfig.fuelCalibrationEndPoint}/${id}`)
  }

  deleteFuelCalibration(id) {
    return axios.delete(`${this.jwtConfig.fuelCalibrationEndPoint}/${id}`)
  }

  updateFuelCalibration(id, data) {
    let endpoint = `${this.jwtConfig.fuelCalibrationEndPoint}/${id}?_method=PUT`

    return axios.post(endpoint, data)
  }

  // ** simListing
  getAllSimListing(page, limit) {
    let endpoint = `${
      this.getSuperAdmin ? this.jwtConfig.simListingAdminEndPoint : this.jwtConfig.simListingEndPoint
    }?page=${page}&limit=${limit}`

    return axios.get(endpoint)
  }

  registerSimListing(data) {
    let endpoint = `${this.getSuperAdmin ? this.jwtConfig.simListingAdminEndPoint : this.jwtConfig.simListingEndPoint}`

    return axios.post(endpoint, data)
  }

  getSimListingById(id) {
    return axios.get(`${this.jwtConfig.simListingEndPoint}/${id}`)
  }

  deleteSimListing(id) {
    return axios.delete(`${this.jwtConfig.simListingEndPoint}/${id}`)
  }

  updateSimListing(id, data) {
    let endpoint = `${this.jwtConfig.simListingEndPoint}/${id}?_method=PUT`

    return axios.post(endpoint, data)
  }

  // group
  getAllGroup(page, limit) {
    let endpoint = `${this.jwtConfig.groupEndPoint}?page=${page}&limit=${limit}`

    return axios.get(endpoint)
  }

  registerGroup(data) {
    return axios.post(this.jwtConfig.groupEndPoint, data)
  }

  getGroupById(id) {
    return axios.get(`${this.jwtConfig.groupEndPoint}/${id}`)
  }

  deleteGroup(id) {
    return axios.delete(`${this.jwtConfig.groupEndPoint}/${id}`)
  }

  updateGroup(id, data) {
    let endpoint = `${this.jwtConfig.groupEndPoint}/${id}?_method=PUT`

    return axios.post(endpoint, data)
  }

  // zone
  getAllZone(page, limit) {
    let endpoint = `${this.jwtConfig.zonesEndPoint}?page=${page}&limit=${limit}`

    return axios.get(endpoint)
  }

  registerZone(data) {
    return axios.post(this.jwtConfig.zonesEndPoint, data)
  }

  getZoneById(id) {
    return axios.get(`${this.jwtConfig.zonesEndPoint}/${id}`)
  }

  deleteZone(id) {
    return axios.delete(`${this.jwtConfig.zonesEndPoint}/${id}`)
  }

  updateZone(id, data) {
    let endpoint = `${this.jwtConfig.zonesEndPoint}/${id}?_method=PUT`

    return axios.post(endpoint, data)
  }

  // warehouse
  getAllWarehouse(page, limit) {
    let endpoint = `${this.jwtConfig.warehouseEndPoint}?page=${page}&limit=${limit}`

    return axios.get(endpoint)
  }

  registerWarehouse(data) {
    return axios.post(this.jwtConfig.warehouseEndPoint, data)
  }

  getWarehouseById(id) {
    return axios.get(`${this.jwtConfig.warehouseEndPoint}/${id}`)
  }

  deleteWarehouse(id) {
    return axios.delete(`${this.jwtConfig.warehouseEndPoint}/${id}`)
  }

  updateWarehouse(id, data) {
    let endpoint = `${this.jwtConfig.warehouseEndPoint}/${id}?_method=PUT`

    return axios.post(endpoint, data)
  }

  // live location
  getAllLiveLocation(page, limit) {
    let endpoint = `${this.jwtConfig.liveLocationEndPoint}?page=${page}&limit=${limit}`

    return axios.get(endpoint)
  }

  registerLiveLocation(data) {
    return axios.post(this.jwtConfig.liveLocationEndPoint, data)
  }

  getLiveLocationById(id) {
    return axios.get(`${this.jwtConfig.liveLocationEndPoint}/${id}`)
  }

  deleteLiveLocation(id) {
    return axios.delete(`${this.jwtConfig.liveLocationEndPoint}/${id}`)
  }

  updateLiveLocation(id, data) {
    let endpoint = `${this.jwtConfig.liveLocationEndPoint}/${id}?_method=PUT`

    return axios.post(endpoint, data)
  }

  // email template
  getAllEmailTemplate(page, limit) {
    let endpoint = `${this.jwtConfig.emailTemplateEndPoint}?page=${page}&limit=${limit}`

    return axios.get(endpoint)
  }

  registerEmailTemplate(data) {
    return axios.post(this.jwtConfig.emailTemplateEndPoint, data)
  }

  getEmailTemplateById(id) {
    return axios.get(`${this.jwtConfig.emailTemplateEndPoint}/${id}`)
  }

  deleteEmailTemplate(id) {
    return axios.delete(`${this.jwtConfig.emailTemplateEndPoint}/${id}`)
  }

  updateEmailTemplate(id, data) {
    let endpoint = `${this.jwtConfig.emailTemplateEndPoint}/${id}?_method=PUT`

    return axios.post(endpoint, data)
  }

  // manage sms form
  registerSmsForm(data) {
    return axios.post(this.jwtConfig.manageSMSEndPoint, data)
  }

  // manage email form
  registerEmailForm(data) {
    return axios.post(this.jwtConfig.manageEmailEndPoint, data)
  }

  // test bench module form
  registerTestBenchForm(data) {
    return axios.post(this.jwtConfig.testBenchEndPoint, data)
  }

  // ** Reports

  // ** Tracking -->
  getTrackDataReport(page, limit, asset_id, from_date_time, to_date_time) {
    const endpoint = `${this.jwtConfig.trackDataReportEndpoint}?limit=${limit}&page=${page}${
      getNull(asset_id) ? '' : `&asset_id=${asset_id}`
    }${getNull(from_date_time) ? '' : `&from_date_time=${from_date_time}`}${
      getNull(to_date_time) ? '' : `&to_date_time=${to_date_time}`
    }`

    console.log(endpoint)

    return axios.get(endpoint)
  }

  // ** Fleets -->
  getFleetSummaryReport(page, limit, asset_id, from_date_time, to_date_time) {
    const endpoint = `${this.jwtConfig.fleetSummaryReportEndpoint}?limit=${limit}&page=${page}${
      getNull(asset_id) ? '' : `&asset_id=${asset_id}`
    }${getNull(from_date_time) ? '' : `&from_date_time=${from_date_time}`}${
      getNull(to_date_time) ? '' : `&to_date_time=${to_date_time}`
    }`

    return axios.get(endpoint)
  }

  // Event -->
  getEventReport(page, limit, asset_id, from_date_time, to_date_time, event_id) {
    const endpoint = `${this.jwtConfig.eventReportEndpoint}?limit=${limit}&page=${page}${
      getNull(asset_id) ? '' : `&asset_id=${asset_id}`
    }${getNull(event_id) ? '' : `&event_id=${event_id}`}${
      getNull(from_date_time) ? '' : `&from_date_time=${from_date_time}`
    }${getNull(to_date_time) ? '' : `&to_date_time=${to_date_time}`}`

    return axios.get(endpoint)
  }

  // ** Tracking
  getAllDashboardAssetList(page, limit, name) {
    const endpoint = `${this.jwtConfig.assetListEndpoint}?page=${page}&limit=${limit}${
      getNull(name) ? '' : `&name=${name}`
    }`

    return axios.get(endpoint)
  }

  getAllDashboardAssetCount() {
    return axios.get(this.jwtConfig.assetCountDashBoard)
  }

  getHistoryTracking(params) {
    const endpoint =
      `${this.jwtConfig.historyTrackingEndpoint}?` +
      `asset_id=${params.asset_id}` +
      `&speed=${params.speed}` +
      `&from_date_time=${params.from_date_time}` +
      `&to_date_time=${params.to_date_time}` +
      `&limit=${params.limit}`

    return axios.get(endpoint)
  }

  getSpeedGraph(params) {
    const endpoint =
      `${this.jwtConfig.speedGraphEndpoint}?` +
      `asset_id=${params.asset_id}` +
      `&from_date_time=${params.from_date_time}` +
      `&to_date_time=${params.to_date_time}` +
      `&limit=${params.limit}` +
      `&page=${params.page}`

    return axios.get(endpoint)
  }

  getPlateTypes(params) {
    const endpoint = `${this.jwtConfig.platTypesEndPoint}?limit=all`

    return axios.get(endpoint)
  }

  getAllDetailedTracking(page, limit, asset_id, driver_id, imei) {
    const endpoint = `${this.jwtConfig.detailedTrackingEndpoint}?page=${page}&limit=${limit}&asset_id=${asset_id}${
      getNull(driver_id) ? '' : `&driver_id=${driver_id}`
    }${getNull(imei) ? '' : `&imei=${imei}`}`

    return axios.get(endpoint)
  }

  // ** Geofence -->
  getAllGeofenceList(page, limit, zone, name) {
    let endpoint = `${this.jwtConfig.geofenceListEndpoint}?page=${page}&limit=${limit}${
      getNull(zone) ? '' : `&zone=${zone}`
    }${getNull(name) ? '' : `&name=${name}`}`

    return axios.get(endpoint)
  }

  registerGeofenceList(data) {
    return axios.post(this.jwtConfig.geofenceListEndpoint, data)
  }

  getAllGeofenceTypesList(page, limit) {
    let endpoint = `${this.jwtConfig.geofenceTypesEndpoint}?page=${page}&limit=${limit}`

    return axios.get(endpoint)
  }
}
