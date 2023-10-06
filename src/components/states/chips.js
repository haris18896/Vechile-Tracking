export const chipStatus = {
  active: { label: 'ACTIVE', color: 'success' },
  driving: { label: 'DRIVING', color: 'success' },
  Moving: { label: 'MOVING', color: 'success', iconColor: '#2FC17E' },
  completed: { label: 'COMPLETED', color: 'success' },
  Idling: { label: 'IDLE', color: 'warning', iconColor: '#FFC400' },
  pending: { label: 'PENDING', color: 'info' },
  'powered off': { label: 'STOPPED', color: 'error', iconColor: '#FC3B61' },
  'no data available': { label: 'No Data', color: 'lightGrey', iconColor: '#C0C5D0' },
  'ignition off': { label: 'Ignition off', color: 'secondary', iconColor: '#FF8B00' },
  moving: { label: 'MOVING', color: 'success', iconColor: '#2FC17E' },
  idling: { label: 'IDLE', color: 'warning', iconColor: '#FFC400' },
  rejected: { label: 'REJECTED', color: 'error' },
  inactive: { label: 'INACTIVE', color: 'error' },
  cancelled: { label: 'CANCELLED', color: 'error' },
  0: { label: 'OFF', color: 'error', icon: 'mdi:electricity' },
  1: { label: 'ON', color: 'success', icon: 'mdi:electricity' }
}
