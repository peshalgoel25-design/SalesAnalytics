import { PromptExample } from './types';

export const WEBHOOK_URL = 'https://wodit.app.n8n.cloud/webhook/371f7c5b-cf57-4339-9757-8213d369c2fd';

export const LEADER_PROMPTS: PromptExample[] = [
  { id: 'l1', category: 'leader', text: 'Which salesperson generated the highest total revenue in CY25?' },
  { id: 'l2', category: 'leader', text: 'Which territory has the highest average revenue per salesperson?' },
  { id: 'l3', category: 'leader', text: 'Which salesperson showed the most absolute growth from H1 to H2?' },
  { id: 'l4', category: 'leader', text: 'How many salespersons achieved at least 90% of their target revenue?' },
  { id: 'l5', category: 'leader', text: 'Which salespersons exceeded their annual revenue target?' },
  { id: 'l6', category: 'leader', text: 'Which salespersons had at least two zero-revenue months during the year?' },
];

export const SALES_PROMPTS: PromptExample[] = [
  { id: 's1', category: 'sales', text: 'I took 6 consecutive working days of approved Earned Leave in March. Can incentives be reduced?' },
  { id: 's2', category: 'sales', text: 'I took Sick Leave but uploaded medical documents a week late. Can this affect incentives?' },
  { id: 's3', category: 'sales', text: 'I was on approved leave during a launch week and another salesperson closed deals in my territory. Who gets credit?' },
  { id: 's4', category: 'sales', text: 'A deal was booked before territory reassignment but invoiced after. Who gets credit?' },
  { id: 's5', category: 'sales', text: 'I received a Level 2 warning but met targets. Can incentives be withheld?' },
  { id: 's6', category: 'sales', text: 'My rating was downgraded due to limited assessability from frequent approved leave. Is this allowed?' },
];

export const APP_NAME = 'iSales.Ai';
export const APP_SUBTITLE = 'Welcome! Ask policy or performance questions';
export const DISCLAIMER_TEXT = 'Responses are based on policy rules and available records. If details are missing, the assistant may ask follow-ups.';