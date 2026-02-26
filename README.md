# Free Games Notifier

Uses the [IsThereAnyDeal API](https://docs.isthereanydeal.com/) to send free games to a discord webhook

## Setup

1. Fork this repository
2. Adjust settings in index.js
3. [Set Workflow Permissions](#Set-Workflow-Permissions)
4. [Set API Key](#Set-API-Key)
5. [Set Webhook URL](#Set-Webhook-URL)
6. [Automate Running the Action](#Automate-Running-the-Action)

### Set Workflow Permissions
- Go to "Settings" -> "Actions" -> "General"
- Scroll to the bottom, set "Workflow permissions" to "Read and write permissions" and click "Save"
<img width="792" height="351" alt="image" src="https://github.com/user-attachments/assets/2ddd6294-b957-4ea2-9a04-3d479d80667a" />

### Set API Key
- [Register an app on IsThereAnyDeal](https://isthereanydeal.com/apps/) (You need to be logged-in) and copy the API key
<img width="469" height="184" alt="image" src="https://github.com/user-attachments/assets/0e0d505b-1875-4619-b0a0-a9aabfa92594" /><br/>
- Go to "Settings" -> "Secrets and variables" -> "Actions"
- Click "New repository secret", name it `API_KEY`, paste your key below and click "Add secret"

### Set Webhook URL
- In your discord server go to "Server Settings" -> "Integrations" -> "Webhooks"
- Click "New Webhook", select the newly created webhook and click "Copy Webhook URL"
<img width="611" height="359" alt="image" src="https://github.com/user-attachments/assets/fb83139e-d06d-41ac-95eb-bf96db826984" /><br/>
- Go to "Settings" -> "Secrets and variables" -> "Actions"
- Click "New repository secret", name it `WEBHOOK_URL`, paste your webhook url below and click "Add secret"

### Automate Running the Action
- Create a [Fine-grained personal access token](https://github.com/settings/personal-access-tokens)
  - Set expiration to "No expiration"
  - Set repository access to "Only select repositories" and only select the "Free-Games-Notifier" repo
  - Add "Actions" permission and set it to "Read and write"
  - Generate the token
- Go to https://cron-job.org and make an account
- Create a new Cronjob
- Set URL to `https://api.github.com/repos/<YOUR_USERNAME>/Free-Games-Notifier/actions/workflows/main.yml/dispatches` (replace <YOUR_USERNAME> with your GitHub username)
- Set your execution schedule however you want (mine is `15,45 * * * *`)
- In advanced set request method to "POST", request body to `{"ref":"main"}` and add the following headers:
  - Key `Content-Type`, Value `application/json`
  - Key `Accept`, Value `application/vnd.github+json`
  - Key `Authorization`, Value `Bearer <YOUR_ACCESS_TOKEN>` (replace <YOUR_ACCESS_TOKEN> with your previously generated token)
- Now you can click "TEST RUN" and save the cronjob if it works
