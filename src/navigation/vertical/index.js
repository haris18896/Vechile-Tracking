const navigation = () => {
  return [
    {
      title: 'Dashboard',
      pathItem: [
        {
          path: '/dashboard',
          subject: 'manage-dashboard'
        }
      ],
      icon: 'bxs:dashboard',
      action: 'manage',
      subject: ['manage-dashboard']
    },
    {
      title: 'Tracking',
      pathItem: [
        {
          path: '/tracking',
          subject: 'manage-live-tracking'
        },
        {
          path: '/tracking/live-travers',
          subject: 'manage-live-travers'
        },
        {
          path: '/tracking/detailed-tracking',
          subject: 'manage-detailed-tracking'
        },
        {
          path: '/tracking/history-tracking',
          subject: 'manage-history-tracking'
        },
        {
          path: '/tracking/multi-tracking',
          subject: 'manage-multi-tracking'
        },
        {
          path: '/tracking/heat-map',
          subject: 'manage-heat-map'
        },
        {
          path: '/tracking/kpa-dashboard',
          subject: 'manage-kpa-dashboard'
        },
        {
          path: '/tracking/oil-tracking',
          subject: 'manage-oil-tracking'
        },
        {
          path: '/tracking/warehouse-monitoring',
          subject: 'manage-warehouse-monitoring'
        }
      ],
      icon: 'ic:baseline-remove-red-eye',
      action: 'manage',
      subject: [
        'manage-heat-map',
        'manage-oil-tracking',
        'manage-live-travers',
        'manage-live-tracking',
        'manage-kpa-dashboard',
        'manage-multi-tracking',
        'manage-history-tracking',
        'manage-detailed-tracking',
        'manage-warehouse-monitoring'
      ]
    },
    {
      title: 'Reports',
      pathItem: [
        { path: '/reports', subject: 'read-tracking-report' },
        {
          path: '/reports/fleet-reports',
          subject: 'manage-fleet-reports'
        },
        {
          path: '/reports/event-reports',
          subject: 'manage-event-reports'
        },
        {
          subject: 'manage-geofence-reports',
          path: '/reports/geofence-reports'
        },
        {
          subject: 'manage-driver-reports',
          path: '/reports/driver-reports'
        },
        {
          subject: 'manage-wasl-sfda-reports',
          path: '/reports/wasl-sfda-reports'
        },
        {
          subject: 'manage-sensor-reports',
          path: '/reports/sensor-reports'
        },
        {
          subject: 'manage-employee-related-reports',
          path: '/reports/employee-reports'
        },
        {
          subject: 'manage-canbus-obd-reports',
          path: '/reports/canbus-obd-reports'
        },
        {
          subject: 'manage-admin-reports',
          path: '/reports/admin-reports'
        }
      ],
      icon: 'bi:file-earmark-text-fill',
      action: 'manage',
      subject: [
        'read-tracking-report',
        'manage-fleet-reports',
        'manage-event-reports',
        'manage-admin-reports',
        'manage-driver-reports',
        'manage-sensor-reports',
        'manage-geofence-reports',
        'manage-wasl-sfda-reports',
        'manage-canbus-obd-reports',
        'manage-employee-related-reports'
      ]
    },
    {
      title: 'Graph',
      pathItem: [
        { path: '/graph', subject: 'manage-speed-graph' },
        {
          path: '/graph',
          subject: 'manage-speed-graph'
        },
        {
          path: '/graph/distance',
          subject: 'manage-distance-graph'
        },
        {
          path: '/graph/usage',
          subject: 'manage-usage-graph'
        },
        {
          path: '/graph/idle',
          subject: 'manage-idle-graph'
        },
        {
          path: '/graph/fuel',
          subject: 'manage-fuel-graph'
        },
        {
          path: '/graph/temperature',
          subject: 'manage-temperature-graph'
        },
        {
          path: '/graph/multiscreen',
          subject: 'manage-multiscreen-graph'
        },
        {
          path: '/graph/oil-usage',
          subject: 'manage-oil-usage-graph'
        },
        {
          path: '/graph/max-speed',
          subject: 'manage-max-speed-graph'
        }
      ],
      icon: 'ic:round-insert-chart',
      action: 'manage',
      subject: [
        'manage-speed-graph',
        'manage-usage-graph',
        'manage-idle-graph',
        'manage-fuel-graph',
        'manage-distance-graph',
        'manage-temperature-graph',
        'manage-multiscreen-graph',
        'manage-oil-usage-graph',
        'manage-max-speed-graph'
      ]
    },
    {
      title: 'Catalogs',
      pathItem: [
        // { path: '/catalogs', subject: 'manage-customer' },
        {
          path: '/catalogs/users',
          subject: 'manage-user'
        },
        {
          path: '/catalogs/assets',
          subject: 'manage-asset'
        },
        {
          path: '/catalogs/devices',
          subject: 'manage-device'
        },
        {
          path: '/catalogs/teachers',
          subject: 'manage-teacher-profile'
        },
        {
          path: '/catalogs/students',
          subject: 'manage-student-profile'
        },
        {
          path: '/catalogs/parents',
          subject: 'manage-parent-profile'
        },
        {
          path: '/catalogs/driver',
          subject: 'manage-driver-profile'
        },
        {
          path: '/catalogs/group',
          subject: 'manage-group'
        },
        {
          path: '/catalogs/campus',
          subject: 'manage-campus'
        },
        {
          path: '/catalogs/office-location',
          subject: 'manage-office-location'
        },
        {
          path: '/catalogs/working-hours',
          subject: 'manage-working-hours'
        },
        {
          path: '/catalogs/employees',
          subject: 'manage-employee'
        },
        {
          path: '/catalogs/zone',
          subject: 'manage-zone'
        },
        {
          path: '/catalogs/warehouse',
          subject: 'manage-warehouse'
        },
        {
          path: '/catalogs/inventory',
          subject: 'manage-inventory'
        },
        {
          path: '/catalogs/live-location',
          subject: 'manage-live-location'
        },
        {
          path: '/catalogs/fuel-calibration',
          subject: 'manage-fuel-calibration'
        },
        {
          path: '/catalogs/sim-list',
          subject: 'manage-sim-list'
        },
        {
          path: '/catalogs/email-template',
          subject: 'manage-email-template'
        },
        {
          path: '/catalogs/manage-sms',
          subject: 'manage-manage-sms'
        },
        {
          path: '/catalogs/manage-email',
          subject: 'manage-manage-email'
        },
        {
          path: '/catalogs/test-bench-module',
          subject: 'manage-test-bench-module'
        }
      ],
      icon: 'mingcute:briefcase-fill',
      action: 'manage',
      subject: [
        'manage-user',
        'manage-zone',
        'manage-group',
        'manage-asset',
        'manage-device',
        'manage-campus',
        'manage-employee',
        'manage-warehouse',
        'manage-inventory',
        'manage-sim-list',
        'manage-manage-sms',
        'manage-manage-email',
        'manage-working-hours',
        'manage-parent-profile',
        'manage-driver-profile',
        'manage-email-template',
        'manage-live-location',
        'manage-student-profile',
        'manage-teacher-profile',
        'manage-office-location',
        'manage-fuel-calibration',
        'manage-test-bench-module'
      ]
    },
    {
      title: 'Services',
      pathItem: [
        {
          path: '/services',
          subject: 'manage-allocate-asset'
        },
        {
          path: '/services/return-asset',
          subject: 'manage-return-asset'
        },
        {
          path: '/services/rules-admin/',
          subject: 'manage-rules-admin'
        },
        {
          path: '/services/maintenance-module/',
          subject: 'manage-maintenance-module'
        },
        {
          path: '/services/fuel-details/',
          subject: 'manage-fuel-details'
        },
        {
          path: '/services/fuel-consumed/',
          subject: 'manage-fuel-consumed'
        },
        {
          path: '/services/gprs-command/',
          subject: 'manage-gprs-command'
        },
        {
          path: '/services/geofence-management/',
          subject: 'manage-geofence-management'
        },
        {
          path: 'services/route-management/',
          subject: 'manage-route-management'
        },
        {
          path: '/services/task-management/',
          subject: 'manage-task-management'
        },
        {
          path: '/services/poi-management/',
          subject: 'manage-poi-management'
        },
        {
          path: '/services/fine-management/',
          subject: 'manage-fine-management'
        },
        {
          path: '/services/part-management/',
          subject: 'manage-part-management'
        },
        {
          path: '/services/order-management/',
          subject: 'manage-order-management'
        }
      ],
      icon: 'vaadin:tools',
      action: 'manage',
      subject: [
        'manage-rules-admin',
        'manage-fuel-details',
        'manage-return-asset',
        'manage-gprs-command',
        'manage-fuel-consumed',
        'manage-poi-management',
        'manage-allocate-asset',
        'manage-task-management',
        'manage-part-management',
        'manage-fine-management',
        'manage-route-management',
        'manage-order-management',
        'manage-maintenance-module',
        'manage-geofence-management'
      ]
    },
    {
      sectionTitle: 'Settings'
    },
    {
      title: 'Customers Settings',
      pathItem: [
        {
          path: '/customer-settings',
          subject: 'manage-customer-roles'
        },
        {
          path: '/customer-settings/assets',
          subject: 'manage-customer-assets'
        }
      ],
      icon: 'majesticons:settings-cog',
      action: 'manage',
      subject: ['manage-customer-roles', 'manage-customer-assets']
    },
    {
      title: 'Reseller Settings',
      pathItem: [
        {
          path: '/reseller-settings',
          subject: 'manage-reseller-roles'
        },
        {
          path: '/reseller-settings/customers',
          subject: 'manage-reseller-customers'
        },
        {
          path: '/reseller-settings/assets',
          subject: 'manage-reseller-assets'
        },
        {
          path: '/reseller-settings/devices',
          subject: 'manage-reseller-devices'
        }
      ],
      icon: 'majesticons:settings-cog',
      action: 'manage',
      subject: [
        'manage-reseller-roles',
        'manage-reseller-assets',
        'manage-reseller-devices',
        'manage-reseller-customers'
      ]
    },
    {
      sectionTitle: 'Admin Settings'
    },
    {
      title: 'Admin Settings',
      pathItem: [
        { path: '/admin-settings', subject: 'manage-super-admin-permissions' },
        {
          path: '/admin-settings/roles',
          subject: 'manage-super-admin-roles'
        },
        {
          path: '/admin-settings/customers',
          subject: 'manage-admin-customers'
        },
        {
          path: '/admin-settings/asset-types',
          subject: 'manage-admin-asset-types'
        },
        {
          path: '/admin-settings/customer-types',
          subject: 'manage-admin-customer-types'
        },
        {
          path: '/admin-settings/device-types',
          subject: 'manage-admin-device-types'
        },
        {
          path: '/admin-settings/profile-types',
          subject: 'manage-super-admin-profile-types'
        },
        {
          path: '/admin-settings/reseller',
          subject: 'manage-super-admin-reseller'
        },
        {
          path: '/admin-settings/activity',
          subject: 'manage-super-admin-activity'
        }
      ],
      icon: 'majesticons:settings-cog',
      action: 'manage',
      subject: [
        'manage-admin-customers',
        'manage-super-admin-roles',
        'manage-admin-asset-types',
        'manage-admin-device-types',
        'manage-admin-customer-types',
        'manage-super-admin-reseller',
        'manage-super-admin-activity',
        'manage-super-admin-profile-types'
      ]
    }
  ]
}

export default navigation
