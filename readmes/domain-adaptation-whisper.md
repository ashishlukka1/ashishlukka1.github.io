## overview

speech recognition models struggle when they meet a new domain. this project adapts whisper to new domains with LoRA, using only synthetic speech for training, and cuts word error rate by up to 29.3% without retraining the full model.

**accepted to ICAIA 2026.**

## results

**table ii: independently trained per-domain adapters**

| domain | base WER (%) | LoRA WER (%) | rel. gain (%) |
| --- | --- | --- | --- |
| weather | 18.30 | 12.94 | +29.3 |
| music | 14.63 | 11.72 | +19.9 |
| sports | 16.61 | 15.88 | +4.4 |

every adapter was evaluated on real held-out audio, not synthetic speech. weather gained the most, and sports gained the least.

## approach

- generated domain-specific synthetic speech with an LLM prompting pipeline and tacotron2-ddc.
- kept the whisper encoder and decoder frozen, so only the small LoRA adapters are trained.
- trained an independent adapter for each of music, sports and weather.
- evaluated each adapter on real audio from common voice and fixie AI.

## pipeline

![three-stage synthetic data generation, LoRA fine-tuning and inference pipeline](assets/lora/architecture.png)

## dataset

**table i: synthetic training and real evaluation dataset statistics**

| domain | synth. train | total duration | eval samples |
| --- | --- | --- | --- |
| music | 44,000 | 31h 42m 53s | 2,470 |
| sports | 46,000 | 37h 36m 06s | 1,500 |
| weather | 31,000 | 45h 14m 45s | 1,670 |
| **total** | **121,000** | **>114h 33m** | **5,640** |
