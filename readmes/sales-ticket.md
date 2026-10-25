## overview

an AI platform that turns zendesk support conversations into revenue intelligence. it combines deterministic classification and graph-based memory with a RAG copilot, so teams can ask questions of their entire support history.

## how it works

1. **ingest:** pulls in zendesk support conversations and extracts structured signals from each ticket.
2. **classify:** deterministic classification keeps outcomes consistent and explainable.
3. **remember:** graph-based memory stores the relationships between accounts, issues and conversations.
4. **ask:** a RAG copilot answers follow-up questions using context from past conversations.

## highlights

- **revenue and risk signals:** turns unstructured support history into signals a sales team can act on.
- **predictable by design:** classification stays deterministic, and the LLM is used for explanation and retrieval.
- **conversational layer:** teams can query their whole support knowledge base in plain language.

![All tickets dashboard with churn-risk signals and per-ticket summaries](assets/sales-ticket/All%20tickets.png)

![Sales Ticket Copilot answering a one-line summary request across tickets](assets/sales-ticket/AskIntelligence.png)

![Voice inbox with recorded voicemail clips streamed through the Zendesk audio proxy](assets/sales-ticket/VoiceView.png)

![AI playbook drafts with status filters, review actions and send-to-Zendesk controls](assets/sales-ticket/PlaybookView.png)

![Account health score with composite metrics, signal distribution and hot accounts](assets/sales-ticket/AccountHealthScore.png)

![Account memory timeline with AI summaries and signal filters](assets/sales-ticket/AccountMemoryView-1.png)

![Signal flow graph linking an account to its tickets and signal types](assets/sales-ticket/AccountMemoryView-2.png)

![Account journey view plotting the latest chronological touchpoints](assets/sales-ticket/AccountMemoryView-3.png)

![Distribution and trends view with signal counts, top accounts and momentum](assets/sales-ticket/AccountMemoryView-4.png)
