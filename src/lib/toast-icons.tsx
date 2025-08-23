import { ShoppingBag, Trash2, CheckCircle, AlertCircle, Info } from "lucide-react"

export const toastIcons = {
  success: (
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400">
      <CheckCircle className="h-5 w-5" />
    </div>
  ),
  error: (
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400">
      <AlertCircle className="h-5 w-5" />
    </div>
  ),
  info: (
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
      <Info className="h-5 w-5" />
    </div>
  ),
  cart: (
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400">
      <ShoppingBag className="h-5 w-5" />
    </div>
  ),
  remove: (
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400">
      <Trash2 className="h-5 w-5" />
    </div>
  ),
} as const
