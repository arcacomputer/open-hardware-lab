# Arca Open Hardware Lab

Independent, open hardware compatibility research from Santiago, Chile.

**Website:** https://ohl.arca.computer

**Campaign 001:** Omarchy on laptops available in Chile

The lab turns hardware into public research. We publish the machine's source and ownership, the test methodology, privacy-scrubbed evidence, failures, workarounds, expenses and upstream outcomes.

## How hardware enters the lab

### Community-funded, purchased in Chile

The exact Chilean retailer, configuration and price are published before fundraising. Buying locally keeps the final price legible, includes local IVA in the listed price, avoids international customs delay and preserves local warranty support.

### Hardware Partner Program

Companies may propose:

- a unit delivered through a Chilean retailer or distributor;
- a 30 to 60 day loaner with prepaid return logistics;
- a permanent lab placement for long-term regression testing.

International units must not be shipped before written intake approval. A local distributor or DDP shipment is preferred. The provider relationship and ownership status are disclosed beside every result.

Email proposals to [ohl@arca.computer](mailto:ohl@arca.computer?subject=Open%20Hardware%20Lab%20intake).

## Independence

Partners fund testing capacity, not a verdict. They cannot purchase:

- a positive result;
- editorial approval;
- removal of legitimate failures;
- a promised upstream merge.

A provider may receive a short factual-correction window before publication. Corrections are limited to demonstrable factual errors and do not create editorial veto power. Read [the independence policy](governance/independence.md).

## Repository map

```text
governance/   independence, disclosure and intake rules
hardware/     machine records and a reusable intake template
ledger/       funding, expenses and asset records
methodology/  public test definitions
probe/        planned privacy-scrubbed diagnostic tooling
reports/      published research reports
src/          Astro website source
public/       static site assets and security headers
```

The probe is planned, not yet implemented. The website's Stripe interface is also a non-payment preview. No money is currently accepted.

## Develop the website

```bash
npm ci
npm run check
npm run build
npm run validate
npm run preview
```

Cloudflare deployment uses Workers Static Assets. The site is fully static and does not require the Astro Cloudflare server adapter.

## Licenses

- Software source: [MIT](LICENSES/MIT.txt)
- Research, reports, documentation and data authored for this repository: [CC BY 4.0](LICENSES/CC-BY-4.0.txt)

Third-party trademarks remain the property of their owners. Campaign 001 is independent and is not affiliated with or endorsed by Omarchy or 37signals.
