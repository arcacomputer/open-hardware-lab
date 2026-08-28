# Methodology

The methodology is public and evolves through reviewed repository changes.

## Research objects

1. **Unit record**: one physical machine with a stable OHL ID, exact configuration, regional SKU, provenance, custody and relationship disclosure.
2. **Test run**: one operating system, methodology version, bounded question and evidence bundle applied to a unit.
3. **Report**: the public interpretation of one or more runs, with observations separated from conclusions.
4. **Retest**: a later run that records changes after firmware, kernel, operating-system or configuration updates.

A machine may participate in multiple research tracks and operating-system runs. Track inclusion does not create a publication promise.

## Baseline categories

1. **Identity and provenance**: exact model, firmware, kernel, operating system and ownership.
2. **Installation**: boot media, installation path, required workarounds and reproducibility.
3. **Input and display**: keyboard, function keys, trackpad, internal display and external displays.
4. **Connectivity**: Wi-Fi, Bluetooth, Ethernet and available radios.
5. **Media**: speakers, microphone, webcam and hardware controls.
6. **Power**: idle draw, representative workloads, charging and battery behavior.
7. **Suspend and resume**: repeated cycles with failure evidence and timing.
8. **Graphics and compute**: acceleration, GPU behavior, containers and virtualization where supported.
9. **Developer and agent workloads**: bounded, documented workloads with no fabricated benchmark precision.
10. **Update resilience**: firmware, kernel and operating-system retests over time.

## Evidence rules

- Record commands, versions and relevant configuration.
- Scrub serial numbers, MAC addresses, credentials, user paths and unrelated personal data.
- Separate observation from interpretation.
- Label planned, partial, blocked and completed tests honestly.
- Link upstream issues and pull requests without implying acceptance or merge.
- Preserve failures and rejected patches as useful evidence.

Specific executable test definitions will be added before the first public hardware run begins. Hardware intake may happen earlier only when custody, disclosure, logistics and the initial research scope are documented.
