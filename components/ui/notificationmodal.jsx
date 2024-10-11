'use client';
import { Bell, UserPlus, MessageSquare, Heart, Star, Settings } from "lucide-react"

const notifications = [
  { id: 1, type: 'friend_request', content: 'John Doe sent you a friend request', time: '2 min ago' },
  { id: 2, type: 'message', content: 'You have a new message from Jane Smith', time: '10 min ago' },
  { id: 3, type: 'like', content: 'Alex liked your post', time: '1 hour ago' },
  { id: 4, type: 'mention', content: 'You were mentioned in a comment', time: '2 hours ago' },
  { id: 5, type: 'system', content: 'Your account was successfully upgraded', time: '1 day ago' },
]

const iconMap = {
  friend_request: UserPlus,
  message: MessageSquare,
  like: Heart,
  mention: Star,
  system: Settings,
}

function NotificationItem({
  notification
}) {
  const Icon = iconMap[notification.type]

  return (
    (<div
      className="flex items-center space-x-4 p-4 hover:bg-gray-50 transition duration-150 ease-in-out">
      <div className="flex-shrink-0">
        <Icon className="h-6 w-6 text-gray-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {notification.content}
        </p>
        <p className="text-sm text-gray-500">
          {notification.time}
        </p>
      </div>
    </div>)
  );
}

export default function NotificationModal() {
  return (
    (<div
      className="max-w-2xl z-50 mt-16  mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-gray-50 px-4 py-5 border-b border-gray-200 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
          <Bell className="h-6 w-6 text-gray-400 mr-2" />
          Notifications
        </h3>
      </div>
      <div className="divide-y divide-gray-200">
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </div>
      <div className="bg-gray-50 px-4 py-4 sm:px-6">
        <div className="text-sm">
          <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
            View all notifications
          </a>
        </div>
      </div>
    </div>)
  );
}