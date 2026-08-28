const params = new URLSearchParams(window.location.search);
const supportThanks = document.querySelector('#support-thanks');

if (supportThanks && params.get('support') === 'thanks') {
  supportThanks.hidden = false;
}
