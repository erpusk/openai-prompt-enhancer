# OpenAI Prompt Enhancer

This is a tool built for an internship assignment to demonstrate the ability to work with external APIs (OpenAI).
The tool takes an initial prompt and enhances it step-by-step using the OpenAI Chat Completions API, based on a improvement instruction, number of iterations, and selected model.

---

## How to Use

### 1. Clone the repository

```bash
git clone https://github.com/erpusk/openai-prompt-enhancer.git
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set your OpenAI API key

Create a `.env` file in the root directory and add:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

> Make sure your API key has enough credits to make requests. In my case, I couldn’t fully test the tool because my key had no credits left — but the implementation follows OpenAI’s documentation and should work as expected.

### 4. Run the tool from the CLI or call it via API

- #### Run from the CLI

```bash
npx ts-node src/index.ts "<initial_prompt>" "<improvement_prompt>" <iterations> "<model>"
```

Example:

```bash
npx ts-node src/index.ts "Create a summary from the given text" "Make it more specific for news summaries" 4 "gpt-3.5-turbo"
```

- #### Call via API

1. Start the server
   
```bash
npm start
```

2. Send a POST request to 

POST http://localhost:3000/enhance-prompt

With a JSON request body:

{
  "initialPrompt": "Summarize the news article",
  "improvementPrompt": "Make it more specific for news summaries",
  "iterations": 3,
  "model": "gpt-3.5-turbo"
}

---

## Technologies Used

- **TypeScript**
- **Node.js**
- **Express**
- **OpenAI API**

---

## Project Structure & Architecture

- `src/index.ts`: Contains the logic for calling the OpenAI API and iterating over prompt improvements. Also handles command-line usage.
- `src/server.ts`: Express server that exposes an API endpoint to enhance prompts via HTTP.
- `.env`: Used to store your OpenAI API Key securely (excluded from version control).

---

If you have any issues or questions, feel free to reach out!
