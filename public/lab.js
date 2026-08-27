const dialog = document.querySelector('#checkout');
    const tier = document.querySelector('#chosen-tier');
    const amount = document.querySelector('#chosen-amount');
    document.querySelectorAll('.support').forEach((button) => {
      button.addEventListener('click', () => {
        tier.textContent = button.dataset.tier;
        amount.textContent = `$${button.dataset.amount} USD`;
        dialog.showModal();
      });
    });
    document.querySelector('.close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });
