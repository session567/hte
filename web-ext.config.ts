import { defineWebExtConfig } from 'wxt'

export default defineWebExtConfig({
  startUrls: ['https://stage.hattrick.org', 'https://www.hattrick.org'],
  firefoxPref: {
    'browser.warnOnQuitShortcut': false,
    'datareporting.policy.dataSubmissionPolicyBypassNotification': true,
    'trailhead.firstrun.didSeeAboutWelcome': true,
  },
})
