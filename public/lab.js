const params = new URLSearchParams(window.location.search);
const supportThanks = document.querySelector('#support-thanks');

if (supportThanks && params.get('support') === 'thanks') {
  supportThanks.hidden = false;
}

const header = document.querySelector('.site-header');
const menuToggle = header?.querySelector('.menu-toggle');
const navigation = header?.querySelector('#primary-navigation');

if (header && menuToggle && navigation) {
  header.setAttribute('data-enhanced', '');
  menuToggle.hidden = false;
  const closeMenu = () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    navigation.removeAttribute('data-open');
  };
  menuToggle.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.setAttribute('aria-expanded', String(open));
    navigation.toggleAttribute('data-open', open);
  });
  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });
  header.addEventListener('keydown', (event) => {
    if (
      event.key === 'Escape' &&
      menuToggle.getAttribute('aria-expanded') === 'true'
    ) {
      closeMenu();
      menuToggle.focus();
    }
  });
  window.matchMedia('(max-width: 800px)').addEventListener('change', closeMenu);
}

const explorer = document.querySelector('[data-research-explorer]');
if (explorer) {
  const selector = explorer.querySelector('.track-selector');
  const tabs = [...explorer.querySelectorAll('[role="tab"]')];
  const panels = [...explorer.querySelectorAll('[data-track-panel]')];
  const select = (index) => {
    tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
      panels[i].hidden = i !== index;
    });
  };
  // Enhance the fully readable static sections only after all controls exist.
  if (selector && tabs.length === panels.length && tabs.length) {
    panels.forEach((panel, index) => {
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', tabs[index].id);
      panel.tabIndex = 0;
    });
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => select(index));
      tab.addEventListener('keydown', (event) => {
        let next;
        if (event.key === 'ArrowDown' || event.key === 'ArrowRight')
          next = (index + 1) % tabs.length;
        if (event.key === 'ArrowUp' || event.key === 'ArrowLeft')
          next = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = tabs.length - 1;
        if (next !== undefined) {
          event.preventDefault();
          select(next);
          tabs[next].focus();
        }
      });
    });
    const initial = panels.findIndex(
      (panel) => `#${panel.id}` === window.location.hash,
    );
    select(initial < 0 ? 0 : initial);
    explorer.setAttribute('data-enhanced', '');
    selector.hidden = false;
  }
}
