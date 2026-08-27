# Methodology

The methodology is public and evolves through reviewed repository changes.

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

Specific test definitions will be added before Campaign 001 hardware is accepted or purchased.
