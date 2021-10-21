export function getRouteByNotification(notification) {
    switch (notification.event_type) {
        case 'MESSAGE':
            return { name: 'Im', params: { id: notification.entity_id } }
        default:
            return { name: 'ProfileId', params: { id: notification.entity_id } }
    }
}

const types = {
  1: 'POST',
  2: 'POST_COMMENT',
  3: 'COMMENT_COMMENT',
  4: 'FRIEND_REQUEST',
  5: 'MESSAGE'
}

export function normalizeNotificationType(notificationID) {
  return types[notificationID];
}
