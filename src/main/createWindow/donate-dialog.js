import { dialog, shell } from 'electron'
import { get, set } from '../../common/app-configs'
import { trackEvent } from '../../common/trackEvent'

const now = () => new Date().getTime()
const twoWeeksAgo = () => now() - 1000 * 3600 * 24 * 7

const messages = ['Developers try to make you happy with this free and open-source app. Make them happy too with your donation!']

const buttons = [['Close', 'Make them happy']]

const skipMessages = ["I don't want to see this message again"]

export const donate = () => {
  set('skipDonateDialog', true)
  shell.openExternal('https://cerebroapp.com/#donate')
}

export const shouldShow = () => {
  if (get('firstStart') || get('skipDonateDialog')) {
    // Do not show donate dialog on first start or when "dont show this message" were chosen
    return false
  }
  const lastShow = get('lastShownDonateDialog')
  // Show on second start and once per week after first start
  return !lastShow || twoWeeksAgo() >= lastShow
}

export const show = () => {
  set('lastShownDonateDialog', now())
  const AB = Math.floor(Math.random() * buttons.length)
  const track = (event) => {
    trackEvent({
      event,
      category: 'Donate Dialog',
      label: AB
    })
  }

  track('show-dialog')

  const options = {
    type: 'info',
    buttons: buttons[AB],
    defaultId: 1,
    cancelId: 0,
    title: 'Support Cerebro development',
    message: messages[AB],
    checkboxLabel: skipMessages[AB]
  }

  const callback = (id, checkboxChecked) => {
    if (checkboxChecked) {
      set('skipDonateDialog', true)
      track('skip-dialog')
    }
    if (id === 1) {
      track('choose-donate')
      donate()
    } else {
      track('cancel')
    }
  }

  setTimeout(() => {
    dialog.showMessageBox(options, callback)
  }, 1000)
}
