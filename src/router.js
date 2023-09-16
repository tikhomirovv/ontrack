import { ref } from 'vue'
import { isPageValid } from './validators'
import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from './constants'
import Timeline from './pages/Timeline.vue'
import Activities from './pages/Activities.vue'
import Progress from './pages/Progress.vue'

export const routes = {
  [PAGE_TIMELINE]: Timeline,
  [PAGE_ACTIVITIES]: Activities,
  [PAGE_PROGRESS]: Progress,
}
export const currentPage = ref(getCurrentPageHash())
export const timelineRef = ref()

export const navigate = (page) => {
  document.body.scrollIntoView()
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
