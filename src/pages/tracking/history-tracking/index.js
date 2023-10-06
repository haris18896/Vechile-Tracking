import React from 'react'
import HistoryTrackingMap from 'src/views/tracking/history-tracking/history-tracking'

function HistoryTracking() {
  return (
    <>
      <HistoryTrackingMap />
    </>
  )
}

export default HistoryTracking

HistoryTracking.acl = {
  action: 'manage',
  subject: 'manage-history-tracking'
}

HistoryTracking.AuthGuard = true
