import type { QuestionAnswers } from '../types/birthday';

const QUESTION_IDS = ['q1', 'q2', 'q3', 'q4', 'q5'] as const;

let lastSent = '';

function asText(value: QuestionAnswers[string] | undefined): string {
  if (Array.isArray(value)) return value.join(', ');
  return typeof value === 'string' ? value.trim() : '';
}

/** Sends one filled form as a single new Google Sheet row. Same answers are not sent twice. */
export async function saveAnswersToSheet(answers: QuestionAnswers): Promise<void> {
  const url = import.meta.env.VITE_SHEET_URL;
  if (!url) return;

  const row = {
    q1: asText(answers.q1),
    q2: asText(answers.q2),
    q3: asText(answers.q3),
    q4: asText(answers.q4),
    q5: asText(answers.q5),
  };

  if (!QUESTION_IDS.some(id => row[id])) return;

  const signature = JSON.stringify(row);
  if (signature === lastSent) return;
  lastSent = signature;

  try {
    // text/plain + no-cors: Google Apps Script accepts the body without a browser CORS block.
    await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(row),
    });
  } catch {
    lastSent = '';
  }
}
