import { ref } from 'vue'
import { isPageValid } from './validators'
import { PAGE_TIMELINE } from './constants'
export const currentPage = ref(getCurrentPageHash())
export const timelineRef = ref()

export const navigate = (page) => {
  if (currentPage.value === PAGE_TIMELINE && page === PAGE_TIMELINE) {
    timelineRef.value.scrollToHour()
  } else if (page !== PAGE_TIMELINE) {
    document.body.scrollIntoView()
  }
  currentPage.value = page
}

function getCurrentPageHash() {
  const page = window.location.hash.slice(1)
  if (isPageValid(page)) {
    return page
  }
  window.location.hash = PAGE_TIMELINE
  return PAGE_TIMELINE
}
