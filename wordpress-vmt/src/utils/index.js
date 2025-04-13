/**
 * Combines multiple class names into a single string
 * @param {string[]} classes - Class names to combine
 * @returns {string} Combined class names
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ")
}

/**
 * Checks if the current device is mobile based on screen width
 * @returns {boolean} True if the device is mobile
 */
export function isMobile() {
  if (typeof window === "undefined") return false
  return window.innerWidth < 768
}

/**
 * Shows a toast notification
 * @param {Object} options - Toast options
 * @param {string} options.message - Toast message
 * @param {string} options.type - Toast type (success, error, warning, info)
 * @param {number} options.duration - Toast duration in milliseconds
 */
export function showToast({ message, type = "info", duration = 3000 }) {
  // Simple implementation - in a real app, you might want to use a library or create a more sophisticated solution
  if (typeof window === "undefined") return

  // Create toast element
  const toast = document.createElement("div")
  toast.className = `fixed bottom-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
    type === "success"
      ? "bg-green-500"
      : type === "error"
        ? "bg-red-500"
        : type === "warning"
          ? "bg-yellow-500"
          : "bg-blue-500"
  } text-white`
  toast.textContent = message

  // Add to DOM
  document.body.appendChild(toast)

  // Remove after duration
  setTimeout(() => {
    toast.classList.add("opacity-0", "transition-opacity", "duration-300")
    setTimeout(() => {
      document.body.removeChild(toast)
    }, 300)
  }, duration)
}

