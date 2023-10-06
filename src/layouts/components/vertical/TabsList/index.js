export const TabsData = [
  {
    href: '/dashboard',
    list: []
  },
  {
    href: '/tracking',
    list: [
      {
        label: 'Live Tracking',
        path: '/tracking',
        tabs: [
          {
            label: 'Tab 1',
            path: '/tracking/live-tracking/search-poi',
            action: 'manage',
            subject: 'manage-live-tracking-search-poi'
          },
          {
            label: 'Tab 2',
            path: '/tracking/live-tracking/show-poi',
            action: 'manage',
            subject: 'manage-live-tracking-show-poi'
          },
          {
            label: 'Tab 3',
            path: '/tracking/live-tracking/create-poi',
            action: 'manage',
            subject: 'manage-live-tracking-create-poi'
          },
          {
            label: 'Tab 4',
            path: '/tracking/live-tracking/import-poi',
            action: 'manage',
            subject: 'manage-live-tracking-import-poi'
          },
          {
            label: 'Tab 5',
            path: '/tracking/live-tracking/draw-geofence',
            action: 'manage',
            subject: 'manage-live-tracking-draw-geofence'
          },
          {
            label: 'Tab 6',
            path: '/tracking/live-tracking/show-geofence',
            action: 'manage',
            subject: 'manage-live-tracking-show-geofence'
          },
          {
            label: 'Tab 7',
            path: '/tracking/live-tracking/import-geofence',
            action: 'manage',
            subject: 'manage-live-tracking-import-geofence'
          },
          {
            label: 'Tab 8',
            path: '/tracking/live-tracking/create-assign-trip',
            action: 'manage',
            subject: 'manage-live-tracking-create-assign-trip'
          },
          {
            label: 'Tab 9',
            path: '/tracking/live-tracking/create-assign-trip/add/',
            action: 'manage',
            subject: 'manage-live-tracking-create-assign-trip'
          },
          {
            label: 'Tab 10',
            path: '/tracking/live-tracking/navigation',
            action: 'manage',
            subject: 'manage-live-tracking-navigation'
          },
          {
            label: 'Tab 11',
            path: '/tracking/live-tracking/nearest-asset',
            action: 'manage',
            subject: 'manage-live-tracking-nearest-asset'
          },
          {
            label: 'Tab 12',
            path: '/tracking/live-tracking/search-driver',
            action: 'manage',
            subject: 'manage-live-tracking-search-driver'
          },
          {
            label: 'Tab 13',
            path: '/tracking/live-tracking/search-asset',
            action: 'manage',
            subject: 'manage-live-tracking-search-asset'
          },
          {
            label: 'Tab 13',
            path: '/tracking/live-tracking/search-address',
            action: 'manage',
            subject: 'manage-live-tracking-search-address'
          }
        ],
        action: 'manage',
        subject: 'manage-live-tracking'
      },

      {
        action: 'manage',
        label: 'Live Travelers',
        path: '/tracking/live-travers',
        subject: 'manage-live-travers'
      },
      {
        label: 'Detailed Tracking',
        path: '/tracking/detailed-tracking',
        action: 'manage',
        subject: 'manage-detailed-tracking'
      },
      {
        label: 'History Tracking',
        path: '/tracking/history-tracking',
        action: 'manage',
        subject: 'manage-history-tracking'
      },
      {
        label: 'Multi Tracking',
        path: '/tracking/multi-tracking',
        action: 'manage',
        subject: 'manage-multi-tracking'
      },
      {
        label: 'Heat Map',
        path: '/tracking/heat-map',
        action: 'manage',
        subject: 'manage-heat-map'
      },
      {
        label: 'KPA Dashboard',
        path: '/tracking/kpa-dashboard',
        action: 'manage',
        subject: 'manage-kpa-dashboard'
      },
      {
        label: 'Oil Tracking',
        path: '/tracking/oil-tracking',
        action: 'manage',
        subject: 'manage-oil-tracking'
      },
      {
        label: 'Warehouse Monitoring',
        path: '/tracking/warehouse-monitoring',
        action: 'manage',
        subject: 'manage-warehouse-monitoring'
      }
    ]
  },
  {
    href: '/reports',
    list: [
      {
        label: 'Tracking Report',
        path: '/reports',
        action: 'manage',
        subject: 'read-tracking-report',
        list: [
          {
            label: 'Track Data Report',
            path: '/track-data'
          }
        ]
      },

      {
        label: 'Fleet Report',
        path: '/reports/fleet-reports',
        action: 'manage',
        subject: 'manage-fleet-reports',
        list: [
          {
            label: 'Fleet Summary Report',
            path: '/summary-report'
          }
        ]
      },

      {
        label: 'Event Report',
        action: 'manage',
        path: '/reports/event-reports',
        subject: 'manage-event-reports',
        list: [
          {
            label: 'Fleet Summary Report',
            path: '/summary-report'
          }
        ]
      },

      {
        label: 'Geofence Report',
        action: 'manage',
        subject: 'manage-geofence-reports',
        path: '/reports/geofence-reports'
      },

      {
        label: 'Driver Related Report',
        action: 'manage',
        subject: 'manage-driver-reports',
        path: '/reports/driver-reports'
      },

      {
        label: 'WASL/SFDA Report',
        action: 'manage',
        subject: 'manage-wasl-sfda-reports',
        path: '/reports/wasl-sfda-reports'
      },

      {
        label: 'Sensor Report',
        action: 'manage',
        subject: 'manage-sensor-reports',
        path: '/reports/sensor-reports'
      },

      {
        label: 'Employee Related Report',
        action: 'manage',
        subject: 'manage-employee-related-reports',
        path: '/reports/employee-reports'
      },

      {
        label: 'Canbus/OBD Report',
        action: 'manage',
        subject: 'manage-canbus-obd-reports',
        path: '/reports/canbus-obd-reports'
      },

      {
        label: 'Admin Reports',
        action: 'manage',
        subject: 'manage-admin-reports',
        path: '/reports/admin-reports'
      }
    ]
  },
  {
    href: '/graph',
    list: [
      {
        label: 'Speed',
        path: '/graph',
        action: 'manage',
        subject: 'manage-speed-graph'
      },
      {
        label: 'Distance',
        path: '/graph/distance',
        action: 'manage',
        subject: 'manage-distance-graph'
      },
      {
        label: 'Usage',
        path: '/graph/usage',
        action: 'manage',
        subject: 'manage-usage-graph'
      },
      {
        label: 'Idle',
        path: '/graph/idle',
        action: 'manage',
        subject: 'manage-idle-graph'
      },

      {
        label: 'Fuel',
        path: '/graph/fuel',
        action: 'manage',
        subject: 'manage-fuel-graph'
      },

      {
        label: 'Temperature',
        path: '/graph/temperature',
        action: 'manage',
        subject: 'manage-temperature-graph'
      },

      {
        label: 'Multiscreen',
        path: '/graph/multiscreen',
        action: 'manage',
        subject: 'manage-multiscreen-graph'
      },

      {
        label: 'Oil Usage Graph',
        path: '/graph/oil-usage',
        action: 'manage',
        subject: 'manage-oil-usage-graph'
      },
      {
        label: 'Max Speed Graph',
        path: '/graph/max-speed',
        action: 'manage',
        subject: 'manage-max-speed-graph'
      }
    ]
  },
  {
    href: '/catalogs',
    list: [
      // {
      //   label: 'Customer',
      //   path: '/catalogs',
      //   action: 'manage',
      //   subject: 'manage-customer'
      // },
      {
        label: 'Users',
        path: '/catalogs/users',
        action: 'manage',
        subject: 'manage-user'
      },
      {
        label: 'Assets',
        path: '/catalogs/assets',
        tabs: [
          { label: 'Tab 1', path: '/catalogs/assets/add-edit/add' },
          { label: 'Tab 2', path: '/catalogs/assets/add-edit/edit/[id]' }
        ],
        action: 'manage',
        subject: 'manage-asset'
      },

      {
        label: 'Devices',
        path: '/catalogs/devices',
        tabs: [
          { label: 'Tab 1', path: '/catalogs/devices/add' },
          { label: 'Tab 2', path: '/catalogs/devices/[id]' },
          { label: 'Tab 3', path: '/catalogs/devices/assign-user/add' },
          { label: 'Tab 4', path: '/catalogs/devices/assign-user' }
        ],
        action: 'manage',
        subject: 'manage-device'
      },
      {
        label: 'Teachers',
        path: '/catalogs/teachers',
        tabs: [{ label: 'Tab 1', path: '/catalogs/teachers/profile/add-edit/add' }],
        action: 'manage',
        subject: 'manage-teacher-profile'
      },
      {
        label: 'Students',
        path: '/catalogs/students',
        tabs: [{ label: 'Tab 1', path: '/catalogs/students/profile/add-edit/add' }],
        action: 'manage',
        subject: 'manage-student-profile'
      },
      {
        label: 'Parents',
        path: '/catalogs/parents',
        tabs: [{ label: 'Tab 1', path: '/catalogs/parents/profile/add-edit/add' }],
        action: 'manage',
        subject: 'manage-parent-profile'
      },
      {
        label: 'Driver',
        path: '/catalogs/driver',
        tabs: [
          { label: 'Tab 1', path: '/catalogs/driver/add-edit/add' },
          { label: 'Tab 2', path: '/catalogs/driver/add-edit/edit/[id]' }
        ],
        action: 'manage',
        subject: 'manage-driver-profile'
      },
      {
        label: 'Group',
        path: '/catalogs/group',
        tabs: [
          { label: 'Tab 1', path: '/catalogs/group/edit/add' },
          { label: 'Tab 2', path: '/catalogs/group/add-edit/edit/[id]' }
        ],
        action: 'manage',
        subject: 'manage-group'
      },
      {
        label: 'Campus',
        path: '/catalogs/campus',
        tabs: [
          { label: 'Tab 1', path: '/catalogs/campus/add-edit/add' },
          { label: 'Tab 2', path: '/catalogs/campus/add-edit/[id]' }
        ],
        action: 'manage',
        subject: 'manage-campus'
      },
      {
        label: 'Office Location',
        path: '/catalogs/office-location',
        tabs: [
          { label: 'Tab 1', path: '/catalogs/office-location/edit/add' },
          { label: 'Tab 2', path: '/catalogs/office-location/edit/[id]' }
        ],
        action: 'manage',
        subject: 'manage-office-location'
      },
      {
        label: 'Working Hours',
        path: '/catalogs/working-hours',
        tabs: [
          { label: 'Tab 1', path: '/catalogs/working-hours/edit/add' },
          { label: 'Tab 2', path: '/catalogs/working-hours/edit/[id]' }
        ],
        action: 'manage',
        subject: 'manage-working-hours'
      },
      {
        label: 'Employee',
        path: '/catalogs/employees',
        tabs: [
          { label: 'Tab 1', path: '/catalogs/employees/edit/add' },
          { label: 'Tab 2', path: '/catalogs/employees/edit/[id]' }
        ],
        action: 'manage',
        subject: 'manage-employee'
      },

      {
        label: 'Zone',
        path: '/catalogs/zone',
        tabs: [
          { label: 'Tab 1', path: '/catalogs/zone/edit/add' },
          { label: 'Tab 2', path: '/catalogs/zone/edit/[id]' }
        ],
        action: 'manage',
        subject: 'manage-zone'
      },
      {
        label: 'Warehouse',
        path: '/catalogs/warehouse',
        tabs: [
          { label: 'Tab 1', path: '/catalogs/warehouse/edit/add' },
          { label: 'Tab 2', path: '/catalogs/warehouse/edit/[id]' }
        ],
        action: 'manage',
        subject: 'manage-warehouse'
      },
      {
        label: 'Inventory',
        path: '/catalogs/inventory',
        tabs: [
          { label: 'Tab 1', path: '/catalogs/inventory/edit/add' },
          { label: 'Tab 2', path: '/catalogs/inventory/edit/[id]' }
        ],
        action: 'manage',
        subject: 'manage-inventory'
      },
      {
        label: 'Live Location',
        path: '/catalogs/live-location',
        tabs: [
          { label: 'Tab 1', path: '/catalogs/live-location/edit/add' },
          { label: 'Tab 2', path: '/catalogs/live-location/edit/[edit]' }
        ],
        action: 'manage',
        subject: 'manage-live-location'
      },
      {
        label: 'Fuel Calibration',
        path: '/catalogs/fuel-calibration',
        tabs: [
          { label: 'Tab 1', path: '/catalogs/fuel-calibration/edit/add' },
          { label: 'Tab 2', path: '/catalogs/fuel-calibration/edit/[edit]' }
        ],
        action: 'manage',
        subject: 'manage-fuel-calibration'
      },
      {
        label: 'Sim List',
        path: '/catalogs/sim-list',
        tabs: [
          { label: 'Tab 1', path: '/catalogs/sim-list/add-or-edit/[id]' },
          { label: 'Tab 2', path: '/catalogs/sim-list/add-or-edit/add' }
        ],
        action: 'manage',
        subject: 'manage-sim-list'
      },
      {
        label: 'Email Template',
        path: '/catalogs/email-template',
        tabs: [{ label: 'Tab 1', path: '/catalogs/email-template/edit/[id]' }],
        action: 'manage',
        subject: 'manage-email-template'
      },
      {
        label: 'Manage SMS',
        path: '/catalogs/manage-sms',
        subPath: '/catalogs/manage-sms/edit/add',
        action: 'manage',
        subject: 'manage-manage-sms'
      },
      {
        label: 'Manage Email',
        path: '/catalogs/manage-email',
        subPath: '/catalogs/manage-email/edit/add',
        action: 'manage',
        subject: 'manage-manage-email'
      },
      {
        label: 'Test Bench Module',
        path: '/catalogs/test-bench-module',
        subPath: '/catalogs/test-bench-module/edit/add',
        action: 'manage',
        subject: 'manage-test-bench-module'
      }
    ]
  },
  {
    href: '/services',
    list: [
      {
        label: 'Allocate Assets',
        path: '/services',
        tabs: [
          { label: 'Tab 1', path: '/services/add' },
          { label: 'Tab 2', path: '/services/[id]' }
        ],
        action: 'manage',
        subject: 'manage-allocate-asset'
      },

      {
        label: 'Return Asset',
        path: '/services/return-asset',
        tabs: [
          { label: 'Tab 1', path: '/services/return-asset/add' },
          { label: 'Tab 2', path: '/services/return-asset/[id]' }
        ],
        action: 'manage',
        subject: 'manage-return-asset'
      },

      {
        label: 'Rules Admin',
        path: '/services/rules-admin',
        tabs: [
          { label: 'Tab 1', path: '/services/rules-admin/add' },
          { label: 'Tab 2', path: '/services/rules-admin/[id]' }
        ],
        action: 'manage',
        subject: 'manage-rules-admin'
      },

      {
        label: 'Maintenance Module',
        path: '/services/maintenance-module',
        tabs: [
          { label: 'Tab 1', path: '/services/maintenance-module/add' },
          { label: 'Tab 1', path: '/services/maintenance-module/edit' }
        ],
        action: 'manage',
        subject: 'manage-maintenance-module'
      },

      {
        label: 'Fuel Details',
        path: '/services/fuel-details',
        tabs: [
          { label: 'Tab 1', path: '/services/fuel-details/add' },
          { label: 'Tab 2', path: '/services/fuel-details/[id]' }
        ],
        action: 'manage',
        subject: 'manage-fuel-details'
      },

      {
        label: 'Fuel Consumed',
        path: '/services/fuel-consumed',
        tabs: [
          { label: 'Tab 1', path: '/services/fuel-consumed/add' },
          { label: 'Tab 2', path: '/services/fuel-consumed/[id]' }
        ],
        action: 'manage',
        subject: 'manage-fuel-consumed'
      },

      {
        label: 'GPRS Command',
        path: '/services/gprs-command',
        tabs: [
          { label: 'Tab 1', path: '/services/gprs-command/add' },
          { label: 'Tab 1', path: '/services/gprs-command/edit' }
        ],
        action: 'manage',
        subject: 'manage-gprs-command'
      },

      {
        label: 'Geofence Management',
        path: '/services/geofence-management',
        tabs: [
          { label: 'Tab 1', path: '/services/geofence-management/edit/add' },
          // { label: 'Tab 2', path: '/services/geofence-management/edit' },
          { label: 'Tab 3', path: '/services/geofence-management/edit/[id]' },
          { label: 'Tab 4', path: '/services/geofence-management/assign-vehicles' }
        ],
        action: 'manage',
        subject: 'manage-geofence-management'
      },

      {
        label: 'Route Management',
        path: '/services/route-management',
        tabs: [
          { label: 'Tab 1', path: '/services/route-management/add' },
          { label: 'Tab 1', path: '/services/route-management/edit' }
        ],
        action: 'manage',
        subject: 'manage-route-management'
      },

      {
        label: 'Task Management',
        path: '/services/task-management',
        tabs: [
          { label: 'Tab 1', path: '/services/task-management/add' },
          { label: 'Tab 1', path: '/services/task-management/edit' }
        ],
        action: 'manage',
        subject: 'manage-task-management'
      },

      // {
      //   label: 'Road Assistance',
      //   path: '/services/road-assistance',
      //   tabs:[
      //     { label: 'Tab 1', path: '/services/road-assistance/add' },
      //     { label: 'Tab 1', path: '/services/road-assistance/edit' },
      //   ],
      //   action: 'manage',
      //   subject: 'manage-road-assistance'
      // },

      {
        label: 'POI Management',
        path: '/services/poi-management',
        tabs: [
          { label: 'Tab 1', path: '/services/poi-management/add' },
          { label: 'Tab 2', path: '/services/poi-management/edit' }
        ],
        action: 'manage',
        subject: 'manage-poi-management'
      },

      {
        label: 'Fine Management',
        path: '/services/fine-management',
        tabs: [
          { label: 'Tab 1', path: '/services/fine-management/add' },
          { label: 'Tab 2', path: '/services/fine-management/[id]' }
        ],
        action: 'manage',
        subject: 'manage-fine-management'
      },

      {
        label: 'Part Management',
        path: '/services/part-management',
        action: 'manage',
        subject: 'manage-part-management'
      },

      {
        label: 'Orders Management',
        path: '/services/order-management',
        action: 'manage',
        subject: 'manage-order-management',
        tabs: [
          { label: 'Tab 1', path: '/services/order-management/add' },
          { label: 'Tab 2', path: '/services/order-management/[id]' }
        ]
      }

      // {
      //   label: 'Allocate Customer',
      //   path: '/services/customer-types'
      // },
      // {
      //   label: 'Allocate Device ',
      //   path: '/services/device-types'
      // },
      // {
      //   label: 'Tas Management',
      //   path: '/services/tas-management'
      // },
      // {
      //   label: 'Road Assistance',
      //   path: '/services/road-assistance'
      // },
      // {
      //   label: 'POI Management',
      //   path: '/services/poi-management'
      // },
      // {
      //   label: 'Fine Management',
      //   path: '/services/fine-management'
      // },
      // {
      //   label: 'Part Management',
      //   path: '/services/part-management'
      // },
      // {
      //   label: 'Orders Management',
      //   path: '/services/orders-management'
      // }
    ]
  },
  {
    href: '/customer-settings',
    list: [
      {
        label: 'Roles',
        path: '/customer-settings',
        action: 'manage',
        subject: 'manage-customer-roles',
        tabs: [{ label: 'Tab 2', path: '/customer-settings/roles/add-edit/[id]' }]
      },
      {
        label: 'Assets',
        path: '/customer-settings/assets',
        action: 'manage',
        subject: 'manage-customer-assets',
        tabs: [{ label: 'Tab 2', path: '/customer-settings/assets/add-edit/[id]' }]
      }
    ]
  },
  {
    href: '/reseller-settings',
    list: [
      {
        label: 'Roles',
        path: '/reseller-settings',
        action: 'manage',
        subject: 'manage-reseller-roles',
        tabs: [{ label: 'Tab 2', path: '/reseller-settings/roles/add-edit/[id]' }]
      },
      {
        label: 'Customers',
        path: '/reseller-settings/customers',
        action: 'manage',
        subject: 'manage-reseller-customers',
        tabs: [{ label: 'Tab 2', path: '/reseller-settings/customers/add-edit/[id]' }]
      },
      {
        label: 'Assets',
        path: '/reseller-settings/assets',
        action: 'manage',
        subject: 'manage-reseller-assets',
        tabs: [{ label: 'Tab 2', path: '/reseller-settings/assets/add-edit/[id]' }]
      },
      {
        label: 'Devices',
        path: '/reseller-settings/devices',
        action: 'manage',
        subject: 'manage-reseller-devices',
        tabs: [{ label: 'Tab 2', path: '/reseller-settings/devices/add-edit/[id]' }]
      }
    ]
  },
  {
    href: '/admin-settings',
    list: [
      {
        label: 'Permissions',
        path: '/admin-settings',
        action: 'manage',
        subject: 'manage-super-admin-permissions',
        tabs: [{ label: 'Tab 2', path: '/admin-settings/permissions/add-edit/[id]' }]
      },
      {
        label: 'Roles',
        path: '/admin-settings/roles',
        action: 'manage',
        subject: 'manage-super-admin-roles',
        tabs: [{ label: 'Tab 2', path: '/admin-settings/roles/add-edit/[id]' }]
      },
      {
        label: 'Customers',
        path: '/admin-settings/customers',
        action: 'manage',
        subject: 'manage-admin-customers',
        tabs: [{ label: 'Tab 2', path: '/admin-settings/customers/add-edit/[id]' }]
      },
      {
        label: 'Asset Types',
        path: '/admin-settings/asset-types',
        action: 'manage',
        subject: 'manage-admin-asset-types',
        tabs: [{ label: 'Tab 2', path: '/admin-settings/asset-types/add-edit/[id]' }]
      },
      {
        label: 'Customer types',
        path: '/admin-settings/customer-types',
        action: 'manage',
        subject: 'manage-admin-customer-types',
        tabs: [{ label: 'Tab 2', path: '/admin-settings/customer-types/add-edit/[id]' }]
      },
      {
        label: 'Device types',
        path: '/admin-settings/device-types',
        action: 'manage',
        subject: 'manage-admin-device-types',
        tabs: [{ label: 'Tab 2', path: '/admin-settings/device-types/add-edit/[id]' }]
      },
      {
        label: 'Profile Types',
        path: '/admin-settings/profile-types',
        action: 'manage',
        subject: 'manage-super-admin-profile-types',
        tabs: [{ label: 'Tab 2', path: '/admin-settings/profile-types/add-edit/[id]' }]
      },
      {
        label: 'Reseller',
        path: '/admin-settings/reseller',
        action: 'manage',
        subject: 'manage-super-admin-reseller',
        tabs: [{ label: 'Tab 1', path: '/admin-settings/reseller/add-edit/[id]' }]
      },
      {
        label: 'Activity',
        path: '/admin-settings/activity',
        action: 'manage',
        subject: 'manage-super-admin-activity',
        tabs: [{ label: 'Tab 1', path: '/admin-settings/activity/add-edit/[id]' }]
      }
    ]
  }
]
