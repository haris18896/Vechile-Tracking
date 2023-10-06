const navigation = () => {
  return [
    {
      title: 'Dashboard',
      path: '/dashboard',
      icon: 'bxs:dashboard',
    },
    {
      title: 'Tracking',
      path: '/tracking',
      icon: 'ic:baseline-remove-red-eye',
    },
    {
      title: 'Reports',
      path: '/reports',
      icon: 'bi:file-earmark-text-fill',

      // action: 'read',
      // subject: 'acl-page',
    },
    {
      title: 'Graph',
      path: '/graph',
      icon: 'ic:round-insert-chart',
    },
    {
      title: 'Catalogs',
      path: '/catalogs',
      icon: 'mingcute:briefcase-fill',
    },
    {
      title: 'Services',
      path: '/services',
      icon: 'vaadin:tools',
    },
    {
      title: 'Settings',
      path: '/settings',
      icon: 'majesticons:settings-cog',
    }
  ]
}

export default navigation
