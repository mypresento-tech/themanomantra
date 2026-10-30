# THE MANOMANTRA — revised demo website

## Changes included
- Contact form sends JSON to `/api/contact`.
- Programme enquiry forms on the identified programme pages use the same endpoint.
- Cloudflare Pages Function is included at `functions/api/contact.js`.
- Demo notification recipients: amcoachsalini@gmail.com, confidencecoachsalini@gmail.com.
- Counselling route: https://wa.me/917204378573.
- Coaching-only free 15-minute Zoom Clarity Call: https://calendly.com/themanomantra-sreeja?lid=864gb6u6jal0&utm_medium=email&utm_source=braze&utm_campaign=EM_Trial_Schedule+A+Meeting&utm_content=text
- No programme payment link, price, intake date, or automatic paid registration has been invented.

## Cloudflare deployment
1. Keep the repository's Cloudflare Pages project connected to this folder/repository.
2. Add `RESEND_API_KEY` as a Cloudflare Pages secret (Production and Preview environments as needed). Never place the key in HTML or JavaScript.
3. Deploy the project and test `/api/contact` through the live contact form.
4. Check the Cloudflare function logs and Resend logs after a test submission.

## IMPORTANT — demo email sender
The function currently uses `onboarding@resend.dev` as a temporary demo sender. Resend may restrict test-mode sending to verified recipients. Before the demo can reliably send to both Gmail inboxes, confirm the account's Resend recipient permissions and verify an owned sending domain/address. Then change `FROM_EMAIL` in `functions/api/contact.js` to the verified sender. Do not expose the API key.

## Before public launch
- Confirm whether demo inboxes should be replaced with the official handover email `themanomtra.sreeja@gmail.com`.
- Confirm the official sending domain/address and test deliverability.
- Confirm the final privacy policy, consent language, terms, cancellation/refund details, and emergency notice.
- Add approved founder photos, social URLs, and genuine approved testimonials only.
- Keep unconfirmed prices, dates, open intakes and payment links unpublished.
- Check all pages, links, mobile layouts, keyboard access and screen-reader labels.
- Coaching Clarity Call is free, 15 minutes, Zoom, and is not counselling. Never add payment to that flow.
