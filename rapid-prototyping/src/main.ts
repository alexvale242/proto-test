import './app.scss'
import App from './App.svelte'
import '../node_modules/@enableinternational/eds-common/components/eds-common'

const app = new App({
  target: document.getElementById('app'),
})

export default app
