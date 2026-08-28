# Arca Open Hardware Lab

Independent hardware compatibility research based in Santiago, Chile and designed for reproducible use anywhere.

**Website:** https://ohl.arca.computer

The lab works with hardware it can obtain, chooses useful research questions, runs public methods and publishes provenance, custody, expenses, evidence, failures, workarounds, reports and upstream outcomes.

“Open” describes the lab process and research record. It does not claim that every tested computer is itself open hardware.

## Operating model

OHL is inventory-driven rather than campaign-driven:

1. **Unit:** a physical machine receives a stable OHL identifier and public provenance record.
2. **Run:** an operating system and bounded research question are applied to that unit.
3. **Report:** privacy-scrubbed evidence, observations, failures, expenses and upstream links are published.
4. **Retest:** the unit remains useful across later firmware, kernel and operating-system changes.

A unit can participate in several research tracks. A campaign may still be used for a bounded purchase or coordinated study, but campaigns do not control the general lab queue.

## Research queue

The initial open tracks are:

- Omarchy compatibility;
- retail Linux hardware and regional SKU differences;
- developer and agent workloads;
- long-term firmware, kernel and operating-system regressions.

Track inclusion does not guarantee that a particular unit, operating system, test or publication date will be selected.

## How hardware enters the lab

### Temporary loan

A time-bounded research loan must record ownership, arrival condition, public relationship, return date and prepaid return logistics.

### Permanent placement

Ownership transfers to Arca Computer, Inc. so the unit can remain in the public inventory for long-term regression testing.

### Retail delivery or lab-funded purchase

A partner may fund or supply an exact unit through an approved retailer or distributor. OHL may also allocate general lab support to a purchase after publishing the unit, source, expected cost and research purpose.

International units must not be shipped before written intake approval. A local distributor or DDP shipment is preferred. Customs, warranty, ownership and return responsibilities must be resolved before acceptance.

Email proposals to [ohl@arca.computer](mailto:ohl@arca.computer?subject=Open%20Hardware%20Lab%20intake).

## Intake gate

OHL accepts hardware only when:

- the exact configuration is known;
- the unit has meaningful public research value;
- shipping, customs and return logistics are workable;
- the relationship can be disclosed;
- no favorable-result or editorial-control condition exists;
- the lab has enough capacity to document the work properly.

Accepting hardware does not guarantee a particular operating system, schedule, report, amount of coverage or positive result.

## Money

The lab accepts one-time, customer-chosen voluntary support through a Stripe-hosted Payment Link. General support enters the unallocated OHL pool until a public allocation is made. It is not a preorder, reservation, purchased test, charitable contribution or tax-deductible donation.

The OHL ledger records support, fees, refunds, allocations, purchases, logistics and hardware custody without exposing unrelated company financial data.

## Independence

Partners may provide hardware or fund general lab capacity, not access, scheduled coverage or a verdict. They cannot purchase:

- a positive result;
- a guaranteed test or deadline;
- editorial approval;
- removal of legitimate failures;
- a promised upstream merge.

A provider may receive a short factual-correction window before publication. Corrections are limited to demonstrable factual errors and do not create editorial veto power. Read [the independence policy](governance/independence.md).

## Repository map

```text
governance/   independence, disclosure and intake rules
hardware/     unit records and a reusable intake template
ledger/       support, allocations, expenses and custody records
methodology/  public test and evidence definitions
probe/        planned privacy-scrubbed diagnostic tooling
reports/      published runs, reports and retests
src/          Astro website source
public/       static site assets and security headers
```

The privacy-scrubbed probe is planned, not yet implemented.

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

Third-party trademarks remain the property of their owners. OHL is independent from tested manufacturers, retailers and operating-system projects unless a report explicitly discloses a relationship.
