### Setup and Installation

Source: https://docs.langchain.com/oss/javascript/integrations/chat/anthropic

Instructions for setting up Anthropic API credentials and installing the necessary LangChain.js packages.

````APIDOC
## Setup

### Credentials

1. **Sign up and obtain an Anthropic API key** from [Anthropic's website](https://www.anthropic.com/).
2. **Set the `ANTHROPIC_API_KEY` environment variable**:

   ```bash
   export ANTHROPIC_API_KEY="your-api-key"
````

3. **Optional: Set LangSmith API keys** for automated tracing:

   ```bash
   # export LANGSMITH_TRACING="true"
   # export LANGSMITH_API_KEY="your-api-key"
   ```

### Installation

Install the `@langchain/anthropic` integration package along with `@langchain/core`.

**npm:**

```bash
npm install @langchain/anthropic @langchain/core
```

**yarn:**

```bash
yarn add @langchain/anthropic @langchain/core
```

**pnpm:**

```bash
pnpm add @langchain/anthropic @langchain/core
```

````

--------------------------------

### OpenAI Setup and Installation

Source: https://docs.langchain.com/oss/javascript/integrations/llms/openai

Instructions for setting up OpenAI credentials and installing the LangChain.js OpenAI integration package.

```APIDOC
## OpenAI Setup

### Credentials

1. Sign up for an OpenAI account at [platform.openai.com](https://platform.openai.com/).
2. Generate an API key.
3. Set the `OPENAI_API_KEY` environment variable:

```bash
export OPENAI_API_KEY="your-api-key"
````

Optional: Set LangSmith tracing variables:

```bash
# export LANGSMITH_TRACING="true"
# export LANGSMITH_API_KEY="your-api-key"
```

### Installation

Install the `@langchain/openai` and `@langchain/core` packages using npm, yarn, or pnpm:

<CodeGroup>
  ```bash npm
  npm install @langchain/openai @langchain/core
  ```

```bash yarn
yarn add @langchain/openai @langchain/core
```

```bash pnpm
pnpm add @langchain/openai @langchain/core
```

</CodeGroup>
```

---

### SupabaseVectorStore Setup and Usage

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/supabase

This section covers the installation of necessary packages and the SQL setup required for SupabaseVectorStore integration.

````APIDOC
## SupabaseVectorStore Integration

### Description
Integrate with the SupabaseVectorStore using LangChain JavaScript. Supabase is an open-source Firebase alternative built on PostgreSQL, supporting the `pgvector` extension for vector storage.

### Setup

To use Supabase vector stores, you need to set up a Supabase database and install the `@langchain/community` integration package. You'll also need to install the official `@supabase/supabase-js` SDK as a peer dependency. This guide also uses OpenAI embeddings, requiring the `@langchain/openai` package.

#### Installation

<CodeGroup>
  ```bash npm
  npm install @langchain/community @langchain/core @supabase/supabase-js @langchain/openai
````

```bash yarn
yarn add @langchain/community @langchain/core @supabase/supabase-js @langchain/openai
```

```bash pnpm
pnpm add @langchain/community @langchain/core @supabase/supabase-js @langchain/openai
```

</CodeGroup>

#### SQL Setup for pgvector

Run the following SQL commands in your Supabase database to enable `pgvector` and set up the necessary table and functions:

```sql
-- Enable the pgvector extension to work with embedding vectors
create extension vector;

-- Create a table to store your documents
create table documents (
  id bigserial primary key,
  content text, -- corresponds to Document.pageContent
  metadata jsonb, -- corresponds to Document.metadata
  embedding vector(1536) -- 1536 works for OpenAI embeddings, change if needed
);

-- Create a function to search for documents
create function match_documents (
  query_embedding vector(1536),
  match_count int DEFAULT null,
  filter jsonb DEFAULT '{}'
) returns table (
  id bigint,
  content text,
  metadata jsonb,
  embedding jsonb,
  similarity float
)
language plpgsql
as $$
#variable_conflict use_column
begin
  return query
  select
    id,
    content,
    metadata,
    (embedding::text)::jsonb as embedding,
    1 - (documents.embedding <=> query_embedding) as similarity
  from documents
  where metadata @> filter
  order by documents.embedding <=> query_embedding
  limit match_count;
end;
$$;
```

### Further Information

For detailed documentation of all `SupabaseVectorStore` features and configurations, refer to the [API reference](https://api.js.langchain.com/classes/langchain_community_vectorstores_supabase.SupabaseVectorStore.html).

````

--------------------------------

### Setup and Credentials

Source: https://docs.langchain.com/oss/javascript/integrations/chat/deepseek

Instructions on how to set up your environment with DeepSeek API keys and install the necessary packages.

```APIDOC
## Setup and Credentials

### 1. DeepSeek Account and API Key
- Sign up at [https://deepseek.com/](https://deepseek.com/) to get your API key.
- Set the `DEEPSEEK_API_KEY` environment variable:
  ```bash
  export DEEPSEEK_API_KEY="your-api-key"
````

### 2. Optional: LangSmith Tracing

- To enable automated tracing, set LangSmith environment variables:
  ```bash
  # export LANGSMITH_TRACING="true"
  # export LANGSMITH_API_KEY="your-api-key"
  ```

### 3. Installation

- Install the `@langchain/deepseek` and `@langchain/core` packages using your preferred package manager:

  **npm:**

  ```bash
  npm install @langchain/deepseek @langchain/core
  ```

  **yarn:**

  ```bash
  yarn add @langchain/deepseek @langchain/core
  ```

  **pnpm:**

  ```bash
  pnpm add @langchain/deepseek @langchain/core
  ```

````

--------------------------------

### ChatFireworks Initialization and Setup

Source: https://docs.langchain.com/oss/javascript/integrations/chat/fireworks

Details on how to configure environment variables and install the necessary packages to use ChatFireworks within a LangChain project.

```APIDOC
## SETUP ChatFireworks

### Description
Configures the environment and installs dependencies required to interact with Fireworks AI models via LangChain.

### Prerequisites
- Fireworks API Key from [fireworks.ai](https://fireworks.ai/login)
- Node.js environment

### Environment Variables
- **FIREWORKS_API_KEY** (string) - Required - Your Fireworks API authentication key.
- **LANGSMITH_TRACING** (boolean) - Optional - Enable LangSmith tracing.
- **LANGSMITH_API_KEY** (string) - Optional - Your LangSmith API key.

### Installation
Run the following command in your project root:

```bash
npm install @langchain/community @langchain/core
````

### Usage Example

```javascript
import { ChatFireworks } from "@langchain/community/chat_models/fireworks";

const chat = new ChatFireworks({
  model: "accounts/fireworks/models/llama-v3-70b-instruct",
  apiKey: process.env.FIREWORKS_API_KEY,
});
```

````

--------------------------------

### Complete Example

Source: https://docs.langchain.com/oss/javascript/integrations/embeddings/deepinfra

A comprehensive example demonstrating the setup and usage of the DeepInfraEmbeddings class, including generating embeddings for a query and multiple documents.

```APIDOC
## Complete Example

### Description
A comprehensive example demonstrating the setup and usage of the `DeepInfraEmbeddings` class, including generating embeddings for a query and multiple documents.

### Code
```typescript
import { DeepInfraEmbeddings } from "@langchain/community/embeddings/deepinfra";

const embeddings = new DeepInfraEmbeddings({
  apiToken: "YOUR_API_TOKEN",
  modelName: "sentence-transformers/clip-ViT-B-32",
  batchSize: 512,
});

async function runExample() {
  try {
    const queryEmbedding = await embeddings.embedQuery("Example query text.");
    console.log("Query Embedding:", queryEmbedding);

    const documents = ["Text 1", "Text 2", "Text 3"];
    const documentEmbeddings = await embeddings.embedDocuments(documents);
    console.log("Document Embeddings:", documentEmbeddings);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

runExample();
````

````

--------------------------------

### Deep Agent Todo List Setup

Source: https://docs.langchain.com/oss/javascript/deepagents/frontend/todo-list

Example of how to set up the `useStream` hook to display a todo list that updates in real time.

```APIDOC
## Setting up useStream

No special configuration is needed. Point `useStream` at your agent and read the `todos` from `stream.values`.

Import your agent and pass `typeof myAgent` as a type parameter to `useStream` for type-safe access to state values:

```ts
import type { myAgent } from "./agent";
````

### React Example

```tsx
import { useStream } from "@langchain/react";

const AGENT_URL = "http://localhost:2024";

export function TodoAgent() {
  const stream = useStream<typeof myAgent>({
    apiUrl: AGENT_URL,
    assistantId: "deep_agent_todo_list",
  });

  const todos = stream.values?.todos ?? [];

  return (
    <div>
      <TodoList todos={todos} />
      {stream.messages.map((msg) => (
        <Message key={msg.id} message={msg} />
      ))}
    </div>
  );
}
```

### Vue Example

```vue
<script setup lang="ts">
import { useStream } from "@langchain/vue";
import { computed } from "vue";

const AGENT_URL = "http://localhost:2024";

const stream = useStream<typeof myAgent>({
  apiUrl: AGENT_URL,
  assistantId: "deep_agent_todo_list",
});

const todos = computed(() => stream.values.value?.todos ?? []);
</script>

<template>
  <div>
    <TodoList :todos="todos" />
    <Message
      v-for="msg in stream.messages.value"
      :key="msg.id"
      :message="msg"
    />
  </div>
</template>
```

### Svelte Example

```svelte
<script lang="ts">
  import { useStream } from "@langchain/svelte";

  const AGENT_URL = "http://localhost:2024";

  const { messages, values, submit } = useStream<typeof myAgent>({
    apiUrl: AGENT_URL,
    assistantId: "deep_agent_todo_list",
  });

  $: todos = $values?.todos ?? [];
</script>

<div>
  <TodoList {todos} />
  {#each $messages as msg (msg.id)}
    <Message message={msg} />
  {/each}
</div>
```

### Angular Example

```ts
import { Component, computed } from "@angular/core";
import { useStream } from "@langchain/angular";

const AGENT_URL = "http://localhost:2024";

@Component({
  selector: "app-todo-agent",
  template: `
    <div>
      <app-todo-list [todos]="todos()" />
      @for (msg of stream.messages(); track msg.id) {
        <app-message [message]="msg" />
      }
    </div>
  `,
})
export class TodoAgentComponent {
  stream = useStream<typeof myAgent>({
    apiUrl: AGENT_URL,
    assistantId: "deep_agent_todo_list",
  });

  todos = computed(() => this.stream.values()?.todos ?? []);
}
```

````

--------------------------------

### Setup Development Environment with pnpm

Source: https://docs.langchain.com/oss/javascript/contributing/code

Commands to install project dependencies and run tests for a specific package within the LangChain repository. Ensure you have pnpm installed or enabled via corepack.

```bash
pnpm install
pnpm --filter {package-name} test
````

---

### Install LangChain Deno Package

Source: https://docs.langchain.com/oss/javascript/integrations/providers/deno

Installs the LangChain Deno package using npm, yarn, or pnpm. This is the initial setup step for using Deno sandboxes with LangChain.

```bash
npm install @langchain/deno
```

```bash
yarn add @langchain/deno
```

```bash
pnpm add @langchain/deno
```

---

### Installation

Source: https://docs.langchain.com/oss/javascript/integrations/chat/google

Installation instructions for the @langchain/google package.

```APIDOC
## Installation

Install the required packages using your preferred package manager:

- **npm**: `npm install @langchain/google @langchain/core`
- **yarn**: `yarn add @langchain/google @langchain/core`
- **pnpm**: `pnpm add @langchain/google @langchain/core`
```

---

### Create a Basic Agent with createAgent

Source: https://docs.langchain.com/oss/javascript/releases/langchain-v1

Example demonstrating how to use the `createAgent` function to initialize an agent. It specifies the language model, available tools, and a system prompt to guide the agent's behavior. The agent is then invoked with user messages.

```typescript
import { createAgent } from "langchain";

const agent = createAgent({
  model: "claude-sonnet-4-6",
  tools: [getWeather],
  systemPrompt: "You are a helpful assistant.",
});

const result = await agent.invoke({
  messages: [{ role: "user", content: "What is the weather in Tokyo?" }],
});

console.log(result.content);
```

---

### Install Deepagents CLI with Provider Extras

Source: https://docs.langchain.com/oss/javascript/deepagents/cli/providers

Example command to install the Deepagents CLI along with specific provider packages using pip install extras. This ensures that the provider's models are available in the switcher.

```bash
uv tool install 'deepagents-cli[anthropic]'
```

---

### Guide Model Behavior with Sample Messages

Source: https://docs.langchain.com/oss/javascript/integrations/chat/minimax

Shows how to provide few-shot examples using 'sampleMessages' to help the model understand the desired output format and response style for specific tasks.

```typescript
import { ChatMinimax } from "@langchain/community/chat_models/minimax";
import { AIMessage, HumanMessage } from "@langchain/core/messages";

const model = new ChatMinimax({ model: "abab5.5-chat" }).withConfig({
  sampleMessages: [
    new HumanMessage({
      content: "Turn A5 into red and modify the content to minimax.",
    }),
    new AIMessage({ content: "select A5 color red change minimax" }),
  ],
});

const result = await model.invoke([
  new HumanMessage({
    content: "Process B6 to gray and modify the content to question.",
  }),
]);
```

---

### PPTX Document Loader Setup

Source: https://docs.langchain.com/oss/javascript/integrations/document_loaders/file_loaders/pptx

Install the necessary package for PPTX file integration.

````APIDOC
## Setup

### Description
Install the `officeparser` package to enable PPTX file loading.

### Command
```bash
npm install officeparser
````

````

--------------------------------

### Gmail Tool Setup and Usage

Source: https://docs.langchain.com/oss/javascript/integrations/tools/google_gmail

This snippet demonstrates how to install the necessary packages, set up authentication, and use the Gmail tools within a LangChain.js agent.

```APIDOC
## Gmail Integration API

### Description
This API allows integration with Gmail to manage emails (create drafts, send, search, view messages and threads) using LangChain.js. It supports authentication via OAuth2 access tokens or API keys obtained from Google.

### Setup

**Authentication Methods:**
1.  **OAuth2 Access Token:** Provide an access token (string or function) to the `credentials` object. This is the most secure method, suitable for end-user applications.
2.  **API Key:** Obtain an API key from Google, enable the Gmail API, and set environment variables `GMAIL_CLIENT_EMAIL` and either `GMAIL_PRIVATE_KEY` or `GMAIL_KEYFILE`.

**Installation:**
```bash
npm install @langchain/openai @langchain/community @langchain/core googleapis
````

### Usage Example

This example shows how to initialize an agent with various Gmail tools and execute tasks like creating a draft and searching for emails.

```typescript
import { initializeAgentExecutorWithOptions } from "@langchain/classic/agents";
import { OpenAI } from "@langchain/openai";
import {
  GmailCreateDraft,
  GmailGetMessage,
  GmailGetThread,
  GmailSearch,
  GmailSendMessage,
} from "@langchain/community/tools/gmail";
import { StructuredTool } from "@langchain/core/tools";

export async function run() {
  const model = new OpenAI({
    temperature: 0,
    apiKey: process.env.OPENAI_API_KEY,
  });

  // Optional: Configure Gmail parameters if not using environment variables
  // const gmailParams = {
  //   credentials: {
  //     clientEmail: process.env.GMAIL_CLIENT_EMAIL,
  //     privateKey: process.env.GMAIL_PRIVATE_KEY,
  //     // Or accessToken: "your_access_token_or_function"
  //   },
  //   scopes: ["https://mail.google.com/"], // Not required if using access token
  // };

  const tools: StructuredTool[] = [
    new GmailCreateDraft(),
    new GmailGetMessage(),
    new GmailGetThread(),
    new GmailSearch(),
    new GmailSendMessage(),
  ];

  const gmailAgent = await initializeAgentExecutorWithOptions(tools, model, {
    agentType: "structured-chat-zero-shot-react-description",
    verbose: true,
  });

  // Example: Create a draft email
  const createInput = `Create a gmail draft for me to edit of a letter from the perspective of a sentient parrot who is looking to collaborate on some research with her estranged friend, a cat. Under no circumstances may you send the message, however.`;
  const createResult = await gmailAgent.invoke({ input: createInput });
  console.log("Create Result", createResult);

  // Example: Search for the latest draft email
  const viewInput = `Could you search in my drafts for the latest email?`;
  const viewResult = await gmailAgent.invoke({ input: viewInput });
  console.log("View Result", viewResult);
}
```

### Parameters

**Authentication:**

- **credentials** (object) - Required - Contains authentication details (`clientEmail`, `privateKey`, `accessToken`).
- **scopes** (array of strings) - Optional - Permissions for the Gmail API (e.g., `["https://mail.google.com/"]`).

**Tools:**

- **GmailCreateDraft**: Creates a draft email.
- **GmailGetMessage**: Retrieves a specific email message.
- **GmailGetThread**: Retrieves an entire email thread.
- **GmailSearch**: Searches for emails based on query parameters.
- **GmailSendMessage**: Sends an email message.

### Request Body Examples

**Creating a Draft:**

```json
{
  "input": "Create a gmail draft for me to edit of a letter from the perspective of a sentient parrot who is looking to collaborate on some research with her estranged friend, a cat. Under no circumstances may you send the message, however."
}
```

**Searching Drafts:**

```json
{
  "input": "Could you search in my drafts for the latest email?"
}
```

### Response Examples

**Success Response (Draft Creation):**

```json
{
  "output": "I have created a draft email for you to edit. The draft Id is r5681294731961864018."
}
```

**Success Response (Draft Search):**

```json
{
  "output": "The latest email in your drafts is from hopefulparrot@gmail.com with the subject 'Collaboration Opportunity'. The body of the email reads: 'Dear [Friend], I hope this letter finds you well. I am writing to you in the hopes of rekindling our friendship and to discuss the possibility of collaborating on some research together. I know that we have had our differences in the past, but I believe that we can put them aside and work together for the greater good. I look forward to hearing from you. Sincerely, [Parrot]'"
}
```

````

--------------------------------

### Advanced Sandbox Operations

Source: https://docs.langchain.com/oss/javascript/deepagents/cli

Examples of reusing existing sandboxes and executing custom setup scripts upon sandbox creation.

```bash
# Create a new Daytona sandbox
deepagents --sandbox daytona

# Reuse an existing sandbox (skips creation and cleanup)
deepagents --sandbox runloop --sandbox-id dbx_abc123

# Run a setup script after sandbox creation
deepagents --sandbox modal --sandbox-setup ./setup.sh
````

---

### Installation

Source: https://docs.langchain.com/oss/javascript/integrations/chat/mistral

Steps to install the `@langchain/mistralai` integration package using npm, yarn, or pnpm.

````APIDOC
## Installation

### Description
Install the necessary LangChain packages for Mistral AI integration.

### Package Installation

Install the `@langchain/mistralai` and `@langchain/core` packages using your preferred package manager:

<CodeGroup>
  ```bash npm
npm install @langchain/mistralai @langchain/core
````

```bash yarn
yarn add @langchain/mistralai @langchain/core
```

```bash pnpm
pnpm add @langchain/mistralai @langchain/core
```

</CodeGroup>
```

---

### Implement Production Persistence with PostgresSaver

Source: https://docs.langchain.com/oss/javascript/langgraph/add-memory

Shows how to use PostgresSaver for persistent storage in production environments. Includes setup instructions and a full example of streaming graph execution with state retrieval.

```bash
npm install @langchain/langgraph-checkpoint-postgres
```

```typescript
import { ChatAnthropic } from "@langchain/anthropic";
import {
  StateGraph,
  StateSchema,
  MessagesValue,
  GraphNode,
  START,
} from "@langchain/langgraph";
import { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

const State = new StateSchema({ messages: MessagesValue });
const model = new ChatAnthropic({ model: "claude-haiku-4-5-20251001" });
const DB_URI =
  "postgresql://postgres:postgres@localhost:5442/postgres?sslmode=disable";
const checkpointer = PostgresSaver.fromConnString(DB_URI);

const callModel: GraphNode<typeof State> = async (state) => {
  const response = await model.invoke(state.messages);
  return { messages: [response] };
};

const builder = new StateGraph(State)
  .addNode("call_model", callModel)
  .addEdge(START, "call_model");

const graph = builder.compile({ checkpointer });

const config = { configurable: { thread_id: "1" } };

for await (const chunk of await graph.stream(
  { messages: [{ role: "user", content: "hi! I'm bob" }] },
  { ...config, streamMode: "values" },
)) {
  console.log(chunk.messages.at(-1)?.content);
}
```

---

### Momento Vector Index Setup and Usage

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/momento_vector_index

This snippet demonstrates how to set up and use the Momento Vector Index with LangChain.js. It covers installing necessary packages, setting environment variables, and indexing documents using `fromTexts`, followed by a similarity search.

````APIDOC
## Momento Vector Index Integration

### Description
This section provides instructions and code examples for integrating LangChain.js with the Momento Vector Index (MVI). MVI is a serverless vector index that simplifies data management and scaling.

### Setup

1.  **Sign up for an API key**: Obtain an API key from the [Momento Console](https://console.gomomento.com/).
2.  **Install SDKs**:
    *   For Node.js:
        ```bash
        npm install @gomomento/sdk
        ```
    *   For browser or edge environments:
        ```bash
        npm install @gomomento/sdk-web
        ```
3.  **Set Environment Variables**:
    *   **OpenAI**: Required if using OpenAI embeddings.
        ```bash
        export OPENAI_API_KEY=YOUR_OPENAI_API_KEY_HERE
        ```
    *   **Momento**: Your Momento API key.
        ```bash
        export MOMENTO_API_KEY=YOUR_MOMENTO_API_KEY_HERE
        ```

### Usage

Install LangChain packages:
```bash
npm install @langchain/openai @langchain/community @langchain/core
````

#### Index documents using `fromTexts` and search

This example shows how to instantiate the vector store using `fromTexts`, index documents, and then perform a similarity search. If the index does not exist, it will be created. If it exists, documents will be added.

**Note**: IDs are optional; Momento generates UUIDs if omitted.

```typescript
import { MomentoVectorIndex } from "@langchain/community/vectorstores/momento_vector_index";
import {
  PreviewVectorIndexClient,
  VectorIndexConfigurations,
  CredentialProvider,
} from "@gomomento/sdk";
import { OpenAIEmbeddings } from "@langchain/openai";
import { sleep } from "@langchain/classic/util/time";

const vectorStore = await MomentoVectorIndex.fromTexts(
  ["hello world", "goodbye world", "salutations world", "farewell world"],
  {},
  new OpenAIEmbeddings(),
  {
    client: new PreviewVectorIndexClient({
      configuration: VectorIndexConfigurations.Laptop.latest(),
      credentialProvider: CredentialProvider.fromEnvironmentVariable({
        environmentVariableName: "MOMENTO_API_KEY",
      }),
    }),
    indexName: "langchain-example-index",
  },
  { ids: ["1", "2", "3", "4"] },
);

// Wait for indexing to complete before searching
await sleep();

const response = await vectorStore.similaritySearch("hello", 2);

console.log(response);

/*
Expected Output:
[
  Document { pageContent: 'hello world', metadata: {} },
  Document { pageContent: 'salutations world', metadata: {} }
]
*/
```

### Parameters

- **Path Parameters**: None for this integration.
- **Query Parameters**: None for this integration.
- **Request Body**: Not directly applicable for the `fromTexts` method, as it constructs the request internally.

### Response

- **Success Response (200)**: Returns an array of `Document` objects matching the similarity search criteria.
- **Response Example**: See the `console.log(response)` output in the code example.

````

--------------------------------

### Create and Run Agent Chat UI Project (Bash)

Source: https://docs.langchain.com/oss/javascript/langgraph/ui

Commands to create a new Agent Chat UI project using npx, install dependencies with pnpm, and start the development server.

```bash
npx create-agent-chat-app --project-name my-chat-ui
cd my-chat-ui
pnpm install
pnpm dev
````

---

### Setup and Credentials

Source: https://docs.langchain.com/oss/javascript/integrations/chat/togetherai

Instructions on how to set up ChatTogetherAI integration, including obtaining API keys and setting environment variables.

````APIDOC
## Setup ChatTogetherAI

### Credentials
1. Sign up for TogetherAI at [api.together.ai](https://api.together.ai/) to generate an API key.
2. Set the `TOGETHER_AI_API_KEY` environment variable:
   ```bash
   export TOGETHER_AI_API_KEY="your-api-key"
````

3. Optional: Set LangSmith API keys for tracing:
   ```bash
   # export LANGSMITH_TRACING="true"
   # export LANGSMITH_API_KEY="your-api-key"
   ```

### Installation

Install the necessary packages:

<CodeGroup>
  ```bash npm
  npm install @langchain/community @langchain/core
  ```

```bash yarn
yarn add @langchain/community @langchain/core
```

```bash pnpm
pnpm add @langchain/community @langchain/core
```

</CodeGroup>
```

---

### Install @modelcontextprotocol/sdk

Source: https://docs.langchain.com/oss/javascript/langchain/mcp

Install the @modelcontextprotocol/sdk library using various package managers like npm, pnpm, yarn, and bun.

```bash
npm install @modelcontextprotocol/sdk
```

```bash
pnpm add @modelcontextprotocol/sdk
```

```bash
yarn add @modelcontextprotocol/sdk
```

```bash
bun add @modelcontextprotocol/sdk
```

---

### Setup Credentials

Source: https://docs.langchain.com/oss/javascript/integrations/chat/mistral

Instructions on how to set up API keys for Mistral AI and optional LangSmith tracing.

````APIDOC
## Setup Credentials

### Description
To use Mistral AI models, you need an API key from the Mistral console. Set this key as an environment variable. Optionally, configure LangSmith for tracing.

### Credentials

1. Visit the [Mistral console](https://console.mistral.ai/) to sign up and generate an API key.
2. Set the `MISTRAL_API_KEY` environment variable:

```bash
export MISTRAL_API_KEY="your-api-key"
````

3. For automated tracing with LangSmith, set the following environment variables:

```bash
# export LANGSMITH_TRACING="true"
# export LANGSMITH_API_KEY="your-api-key"
```

````

--------------------------------

### Discord Integration Setup

Source: https://docs.langchain.com/oss/javascript/integrations/tools/discord_tool

To use the Discord Tool, you need to install the discord.js peer dependency.

```APIDOC
## Setup

To use the Discord Tool you need to install the following official peer dependency:

```bash
npm install discord.js
````

````

--------------------------------

### Example Skills for SQL Assistant

Source: https://docs.langchain.com/oss/javascript/langchain/multi-agent/skills-sql-assistant

Provides example 'Skill' objects for a SQL query assistant. These examples showcase the 'sales_analytics' and 'inventory_management' skills, each with a concise description for the agent and detailed content including database schemas, business logic, and example SQL queries. The 'context' tag is used for multi-line string content.

```typescript
import { context } from "langchain";

const SKILLS: Skill[] = [
  {
    name: "sales_analytics",
    description:
      "Database schema and business logic for sales data analysis including customers, orders, and revenue.",
    content: context`
      # Sales Analytics Schema

      ## Tables

      ### customers
      - customer_id (PRIMARY KEY)
      - name
      - email
      - signup_date
      - status (active/inactive)
      - customer_tier (bronze/silver/gold/platinum)

      ### orders
      - order_id (PRIMARY KEY)
      - customer_id (FOREIGN KEY -> customers)
      - order_date
      - status (pending/completed/cancelled/refunded)
      - total_amount
      - sales_region (north/south/east/west)

      ### order_items
      - item_id (PRIMARY KEY)
      - order_id (FOREIGN KEY -> orders)
      - product_id
      - quantity
      - unit_price
      - discount_percent

      ## Business Logic

      **Active customers**:
      status = 'active' AND signup_date <= CURRENT_DATE - INTERVAL '90 days'

      **Revenue calculation**:
      Only count orders with status = 'completed'.
      Use total_amount from orders table, which already accounts for discounts.

      **Customer lifetime value (CLV)**:
      Sum of all completed order amounts for a customer.

      **High-value orders**:
      Orders with total_amount > 1000

      ## Example Query

      -- Get top 10 customers by revenue in the last quarter
      SELECT
          c.customer_id,
          c.name,
          c.customer_tier,
          SUM(o.total_amount) as total_revenue
      FROM customers c
      JOIN orders o ON c.customer_id = o.customer_id
      WHERE o.status = 'completed'
      AND o.order_date >= CURRENT_DATE - INTERVAL '3 months'
      GROUP BY c.customer_id, c.name, c.customer_tier
      ORDER BY total_revenue DESC
      LIMIT 10;`,
  },
  {
    name: "inventory_management",
    description:
      "Database schema and business logic for inventory tracking including products, warehouses, and stock levels.",
    content: context`
      # Inventory Management Schema

      ## Tables

      ### products
      - product_id (PRIMARY KEY)
      - product_name
      - sku
      - category
      - unit_cost
      - reorder_point (minimum stock level before reordering)
      - discontinued (boolean)

      ### warehouses
      - warehouse_id (PRIMARY KEY)
      - warehouse_name
      - location
      - capacity

      ### inventory
      - inventory_id (PRIMARY KEY)
      - product_id (FOREIGN KEY -> products)
      - warehouse_id (FOREIGN KEY -> warehouses)
      - quantity_on_hand
      - last_updated

      ### stock_movements
      - movement_id (PRIMARY KEY)
      - product_id (FOREIGN KEY -> products)
      - warehouse_id (FOREIGN KEY -> warehouses)
      - movement_type (inbound/outbound/transfer/adjustment)
      - quantity (positive for inbound, negative for outbound)
      - movement_date
      - reference_number

      ## Business Logic

      **Available stock**:
      quantity_on_hand from inventory table where quantity_on_hand > 0

      **Products needing reorder**:
      Products where total quantity_on_hand across all warehouses is less
      than or equal to the product's reorder_point

      **Active products only**:
      Exclude products where discontinued = true unless specifically analyzing discontinued items

      **Stock valuation**:
      quantity_on_hand * unit_cost for each product

      ## Example Query

      -- Find products below reorder point across all warehouses
      SELECT
          p.product_id,
          p.product_name,
          p.reorder_point,
          SUM(i.quantity_on_hand) as total_stock,
          p.unit_cost,
          (p.reorder_point - SUM(i.quantity_on_hand)) as units_to_reorder
      FROM products p
      JOIN inventory i ON p.product_id = i.product_id
      WHERE p.discontinued = false
      GROUP BY p.product_id, p.product_name, p.reorder_point, p.unit_cost

````

---

### ArxivRetriever Setup and Instantiation

Source: https://docs.langchain.com/oss/javascript/integrations/retrievers/arxiv-retriever

Learn how to set up dependencies and instantiate the ArxivRetriever for querying arXiv.

````APIDOC
## ArxivRetriever Setup and Instantiation

### Description
This section details the necessary dependencies and provides an example of how to instantiate the `ArxivRetriever` class in LangChain.js.

### Dependencies
Ensure the following npm packages are installed:
- `pdf-parse` for parsing PDF documents.
- `fast-xml-parser` for parsing XML responses from the arXiv API.

```bash
npm install pdf-parse fast-xml-parser
````

### Instantiation

Instantiate the `ArxivRetriever` with desired configuration options.

```typescript
import { ArxivRetriever } from "@langchain/community/retrievers/arxiv";

const retriever = new ArxivRetriever({
  getFullDocuments: false, // Set to true to fetch and parse full PDF documents
  maxSearchResults: 5, // Maximum number of search results to retrieve
});
```

### Parameters

- `getFullDocuments` (boolean) - Optional: If true, fetches and parses the full PDF content of the articles. Defaults to `false`.
- `maxSearchResults` (number) - Optional: The maximum number of search results to return. Defaults to a reasonable number (e.g., 5).

````

--------------------------------

### Initialize Backend Providers

Source: https://docs.langchain.com/oss/javascript/deepagents/data-analysis

Python code examples to initialize specific sandbox backends like AgentCore, Daytona, Modal, and Runloop.

```python
from bedrock_agentcore.tools.code_interpreter_client import CodeInterpreter
from langchain_agentcore_codeinterpreter import AgentCoreSandbox

interpreter = CodeInterpreter(region="us-west-2")
interpreter.start()
backend = AgentCoreSandbox(interpreter=interpreter)
````

```python
from daytona import Daytona
from langchain_daytona import DaytonaSandbox

sandbox = Daytona().create()
backend = DaytonaSandbox(sandbox=sandbox)
```

```python
import modal
from langchain_modal import ModalSandbox

app = modal.App.lookup("your-app")
modal_sandbox = modal.Sandbox.create(app=app)
backend = ModalSandbox(sandbox=modal_sandbox)
```

```python
from runloop_api_client import RunloopSDK
from langchain_runloop import RunloopSandbox

api_key = "..."
client = RunloopSDK(bearer_token=api_key)
devbox = client.devbox.create()
backend = RunloopSandbox(devbox=devbox)
```

---

### Install assistant-ui dependencies

Source: https://docs.langchain.com/oss/javascript/langchain/frontend/integrations/assistant-ui

Install the necessary assistant-ui packages using the bun package manager.

```bash
bun add @assistant-ui/react @assistant-ui/react-markdown
```

---

### Full Chain Integration Example

Source: https://docs.langchain.com/oss/javascript/integrations/callbacks/upstash_ratelimit_callback

An example demonstrating the integration of UpstashRatelimitHandler within a LangChain.js RunnableSequence.

````APIDOC
## Full Chain Integration Example

### Description
This example shows how to set up Upstash rate limiting and use the handler within a LangChain.js chain.

### Method
`invoke` method of RunnableSequence

### Endpoint
N/A

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
None

### Request Example
```tsx
const UPSTASH_REDIS_REST_URL = "****";
const UPSTASH_REDIS_REST_TOKEN = "****";
const OPENAI_API_KEY = "****";

import {
  UpstashRatelimitHandler,
  UpstashRatelimitError,
} from "@langchain/community/callbacks/handlers/upstash_ratelimit";
import { RunnableLambda, RunnableSequence } from "@langchain/core/runnables";
import { OpenAI } from "@langchain/openai";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// create ratelimit
const ratelimit = new Ratelimit({
  redis: new Redis({
    url: UPSTASH_REDIS_REST_URL,
    token: UPSTASH_REDIS_REST_TOKEN,
  }),
  // 500 tokens per window, where window size is 60 seconds:
  limiter: Ratelimit.fixedWindow(500, "60 s"),
});

// create handler
const user_id = "user_id"; // should be a method which gets the user id
const handler = new UpstashRatelimitHandler(user_id, {
  tokenRatelimit: ratelimit,
});

// create mock chain
const asStr = new RunnableLambda({ func: (str: string): string => str });
const model = new OpenAI({ apiKey: OPENAI_API_KEY });
const chain = RunnableSequence.from([asStr, model]);

// invoke chain with handler:
try {
  const response = await chain.invoke("hello world", {
    callbacks: [handler],
  });
  console.log(response);
} catch (err) {
  if (err instanceof UpstashRatelimitError) {
    console.log("Handling ratelimit.");
  }
}
````

### Response

#### Success Response (200)

- **response** (any) - The response from the invoked chain.

#### Response Example

```json
{
  "example": "response body"
}
```

````

--------------------------------

### Initialize Vector Stores

Source: https://docs.langchain.com/oss/javascript/langchain/rag

TypeScript examples for setting up various vector store backends including Memory, Chroma, and FAISS.

```typescript
import { MemoryVectorStore } from "@langchain/classic/vectorstores/memory";
const vectorStore = new MemoryVectorStore(embeddings);
````

```typescript
import { Chroma } from "@langchain/community/vectorstores/chroma";
const vectorStore = new Chroma(embeddings, {
  collectionName: "a-test-collection",
});
```

```typescript
import { FaissStore } from "@langchain/community/vectorstores/faiss";
const vectorStore = new FaissStore(embeddings, {});
```

---

### Install Cheerio for Web Scraping

Source: https://docs.langchain.com/oss/javascript/integrations/document_transformers/mozilla_readability

Installs the cheerio npm package, which is useful for web scraping and is often required for the usage examples of the MozillaReadabilityTransformer, though not strictly for the transformer itself.

```bash
npm install cheerio
```

---

### ChatFriendli Integration

Source: https://docs.langchain.com/oss/javascript/integrations/chat/friendli

This section details how to integrate ChatFriendli, a chat model provider, into your LangChain.js applications. It covers installation, environment variable setup, and provides examples for invoking and streaming responses from the model.

````APIDOC
## ChatFriendli Integration

### Description
Integrate with the ChatFriendli chat model using LangChain JavaScript. Friendli enhances AI application performance and optimizes cost savings with scalable, efficient deployment options, tailored for high-demand AI workloads.

### Setup

Ensure the `@langchain/community` package is installed.

```bash
npm install @langchain/community @langchain/core
````

Sign in to [Friendli Suite](https://suite.friendli.ai/) to create a Personal Access Token, and set it as the `FRIENDLI_TOKEN` environment variable. You can set the team ID as the `FRIENDLI_TEAM` environment variable.

### Usage

You can initialize a Friendli chat model with selecting the model you want to use. The default model is `meta-llama-3-8b-instruct`. You can check the available models at [docs.friendli.ai](https://docs.friendli.ai/guides/serverless_endpoints/pricing#text-generation-models).

#### Invoke Example

```typescript
import { ChatFriendli } from "@langchain/community/chat_models/friendli";

const model = new ChatFriendli({
  model: "meta-llama-3-8b-instruct", // Default value
  friendliToken: process.env.FRIENDLI_TOKEN,
  friendliTeam: process.env.FRIENDLI_TEAM,
  maxTokens: 800,
  temperature: 0.9,
  topP: 0.9,
  frequencyPenalty: 0,
  stop: [],
});

const response = await model.invoke(
  "Draft a cover letter for a role in software engineering.",
);

console.log(response.content);

/*
Dear [Hiring Manager],

I am excited to apply for the role of Software Engineer at [Company Name]. With my passion for innovation, creativity, and problem-solving, I am confident that I would be a valuable asset to your team.

As a highly motivated and detail-oriented individual, ...
*/
```

#### Stream Example

```typescript
import { ChatFriendli } from "@langchain/community/chat_models/friendli";

const model = new ChatFriendli({
  model: "meta-llama-3-8b-instruct", // Default value
  friendliToken: process.env.FRIENDLI_TOKEN,
  friendliTeam: process.env.FRIENDLI_TEAM,
  maxTokens: 800,
  temperature: 0.9,
  topP: 0.9,
  frequencyPenalty: 0,
  stop: [],
});

const stream = await model.stream(
  "Draft a cover letter for a role in software engineering.",
);

for await (const chunk of stream) {
  console.log(chunk.content);
}

/*
D
ear
 [
Hiring
...
[
Your
 Name
]
*/
```

### Related

- Chat model [conceptual guide](/oss/javascript/langchain/models)
- Chat model [how-to guides](/oss/javascript/langchain/models)

````

--------------------------------

### Install Momento SDK for Node.js

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/momento_vector_index

Installs the Momento SDK for Node.js environments. This is a prerequisite for using MVI with LangChain in Node.js.

```bash
npm install @gomomento/sdk
````

---

### Full Code Example: Building an Agent

Source: https://docs.langchain.com/oss/javascript/langgraph/quickstart

A comprehensive example demonstrating the complete process of building an agent, including defining tools, state, model nodes, tool nodes, and the agent's execution flow.

````APIDOC
## Full Code Example: Building an Agent

### Description
A comprehensive example demonstrating the complete process of building an agent, including defining tools, state, model nodes, tool nodes, and the agent's execution flow.

### Method
N/A (Code Execution)

### Endpoint
N/A

### Parameters
N/A

### Request Example
```typescript
// Step 1: Define tools and model

import { ChatAnthropic } from "@langchain/anthropic";
import { tool } from "@langchain/core/tools";
import * as z from "zod";

const model = new ChatAnthropic({
  model: "claude-sonnet-4-6",
  temperature: 0,
});

// Define tools
const add = tool(({ a, b }) => a + b, {
  name: "add",
  description: "Add two numbers",
  schema: z.object({
    a: z.number().describe("First number"),
    b: z.number().describe("Second number"),
  }),
});

const multiply = tool(({ a, b }) => a * b, {
  name: "multiply",
  description: "Multiply two numbers",
  schema: z.object({
    a: z.number().describe("First number"),
    b: z.number().describe("Second number"),
  }),
});

const divide = tool(({ a, b }) => a / b, {
  name: "divide",
  description: "Divide two numbers",
  schema: z.object({
    a: z.number().describe("First number"),
    b: z.number().describe("Second number"),
  }),
});

// Augment the LLM with tools
const toolsByName = {
  [add.name]: add,
  [multiply.name]: multiply,
  [divide.name]: divide,
};
const tools = Object.values(toolsByName);
const modelWithTools = model.bindTools(tools);

// Step 2: Define state

import {
  StateGraph,
  StateSchema,
  MessagesValue,
  ReducedValue,
  GraphNode,
  ConditionalEdgeRouter,
  START,
  END,
} from "@langchain/langgraph";
import * as z from "zod";

const MessagesState = new StateSchema({
  messages: MessagesValue,
  llmCalls: new ReducedValue(
    z.number().default(0),
    { reducer: (x, y) => x + y }
  ),
});

// Step 3: Define model node

import { SystemMessage, AIMessage, ToolMessage } from "@langchain/core/messages";

const llmCall: GraphNode<typeof MessagesState> = async (state) => {
  return {
    messages: [await modelWithTools.invoke([
      new SystemMessage(
        "You are a helpful assistant tasked with performing arithmetic on a set of inputs."
      ),
      ...state.messages,
    ])],
    llmCalls: 1,
  };
};

// Step 4: Define tool node

const toolNode: GraphNode<typeof MessagesState> = async (state) => {
  const lastMessage = state.messages.at(-1);

  if (lastMessage == null || !AIMessage.isInstance(lastMessage)) {
    return { messages: [] };
  }

  const result: ToolMessage[] = [];
  // ... rest of the toolNode implementation
  return { messages: [] }; // Placeholder
};

// Step 5: Define conditional edge

const shouldContinue: ConditionalEdgeRouter<typeof MessagesState, "toolNode"> = (state) => {
  const lastMessage = state.messages.at(-1);

  // Check if it's an AIMessage before accessing tool_calls
  if (!lastMessage || !AIMessage.isInstance(lastMessage)) {
    return END;
  }

  // If the LLM makes a tool call, then perform an action
  if (lastMessage.tool_calls?.length) {
    return "toolNode";
  }

  // Otherwise, we stop (reply to the user)
  return END;
};

// Step 6: Build and compile the agent

const agent = new StateGraph(MessagesState)
  .addNode("llmCall", llmCall)
  .addNode("toolNode", toolNode)
  .addEdge(START, "llmCall")
  .addConditionalEdges("llmCall", shouldContinue, ["toolNode", END])
  .addEdge("toolNode", "llmCall")
  .compile();

// Invoke
import { HumanMessage } from "@langchain/core/messages";
const result = await agent.invoke({
  messages: [new HumanMessage("Add 3 and 4.")],
});

for (const message of result.messages) {
  console.log(`[${message.type}]: ${message.text}`);
}
````

````

--------------------------------

### Gradient AI Integration API

Source: https://docs.langchain.com/oss/javascript/integrations/llms/gradient_ai

This section covers the setup and usage of the Gradient AI LLM integration within LangChain.js. It includes installing the necessary SDK, setting environment variables, and providing code examples for model instantiation and invocation.

```APIDOC
## Gradient AI Integration

### Description
Integrate with the Gradient AI LLM using LangChain JavaScript.

### Setup

Install the official Gradient Node SDK as a peer dependency:

```bash
npm i @gradientai/nodejs-sdk
````

Set the following environment variables:

1. `GRADIENT_ACCESS_TOKEN`
2. `GRADIENT_WORKSPACE_ID`

Alternatively, set them during `GradientAI` Class instantiation as `gradientAccessKey` and `workspaceId`.

```typescript
const model = new GradientLLM({
  gradientAccessKey: "My secret Access Token",
  workspaceId: "My secret workspace id",
});
```

### Usage

Install LangChain packages:

```bash
npm install @langchain/community @langchain/core
```

Example of invoking the Gradient AI model:

```typescript
import { GradientLLM } from "@langchain/community/llms/gradient_ai";

const model = new GradientLLM({
  modelSlug: "llama2-7b-chat",
  inferenceParameters: {
    maxGeneratedTokenCount: 20,
    temperature: 0,
  },
});

const res = await model.invoke(
  "What would be a good company name for a company that makes colorful socks?",
);

console.log({ res });
```

### Using your own fine-tuned adapters

To use your own custom adapter, set `adapterId` during setup.

```typescript
// Example for using a custom adapter
const model = new GradientLLM({
  modelSlug: "your-custom-model-slug",
  adapterId: "your-adapter-id",
  // other parameters...
});
```

### Related

- [Models guide](/oss/javascript/langchain/models)

````

--------------------------------

### Full LangChain.js Agent Example with Tools and Memory

Source: https://docs.langchain.com/oss/javascript/langchain/quickstart

This comprehensive example sets up a LangChain.js agent, defining a system prompt for a pun-speaking weather forecaster, and implementing tools for getting weather by city and retrieving user location. It configures the chat model, specifies a structured response format, and initializes a MemorySaver for checkpointer functionality. The agent is then created and invoked twice to demonstrate a conversation flow.

```typescript
import { createAgent, tool, initChatModel, type ToolRuntime } from "langchain";
import { MemorySaver } from "@langchain/langgraph";
import * as z from "zod";

// Define system prompt
const systemPrompt = `You are an expert weather forecaster, who speaks in puns.

You have access to two tools:

- get_weather_for_location: use this to get the weather for a specific location
- get_user_location: use this to get the user's location

If a user asks you for the weather, make sure you know the location. If you can tell from the question that they mean wherever they are, use the get_user_location tool to find their location.`;

// Define tools
const getWeather = tool(
  ({ city }) => `It's always sunny in ${city}!`,
  {
    name: "get_weather_for_location",
    description: "Get the weather for a given city",
    schema: z.object({
      city: z.string(),
    }),
  }
);

type AgentRuntime = ToolRuntime<unknown, { user_id: string }>;

const getUserLocation = tool(
  (_, config: AgentRuntime) => {
    const { user_id } = config.context;
    return user_id === "1" ? "Florida" : "SF";
  },
  {
    name: "get_user_location",
    description: "Retrieve user information based on user ID",
    schema: z.object({}),
  }
);

// Configure model
const model = await initChatModel(
  "claude-sonnet-4-6",
  { temperature: 0 }
);

// Define response format
const responseFormat = z.object({
  punny_response: z.string(),
  weather_conditions: z.string().optional(),
});

// Set up memory
const checkpointer = new MemorySaver();

// Create agent
const agent = createAgent({
  model,
  systemPrompt,
  responseFormat,
  checkpointer,
  tools: [getUserLocation, getWeather],
});

// Run agent
// `thread_id` is a unique identifier for a given conversation.
const config = {
  configurable: { thread_id: "1" },
  context: { user_id: "1" },
};

const response = await agent.invoke(
  { messages: [{ role: "user", content: "what is the weather outside?" }] },
  config
);
console.log(response.structuredResponse);
// {
//   punny_response: "Florida is still having a 'sun-derful' day! The sunshine is playing 'ray-dio' hits all day long! I'd say it's the perfect weather for some 'solar-bration'! If you were hoping for rain, I'm afraid that idea is all 'washed up' - the forecast remains 'clear-ly' brilliant!",
//   weather_conditions: "It's always sunny in Florida!"
// }

// Note that we can continue the conversation using the same `thread_id`.
const thankYouResponse = await agent.invoke(
  { messages: [{ role: "user", content: "thank you!" }] },
  config
);
console.log(thankYouResponse.structuredResponse);
// {
//   punny_response: "You're 'thund-erfully' welcome! It's always a 'breeze' to help you stay 'current' with the weather. I'm just 'cloud'-ing around waiting to 'shower' you with more forecasts whenever you need them. Have a 'sun-sational' day in the Florida sunshine!",
//   weather_conditions: undefined
// }
````

---

### Clone and Run Agent Chat UI Repository (Bash)

Source: https://docs.langchain.com/oss/javascript/langgraph/ui

Commands to clone the Agent Chat UI repository, install dependencies using pnpm, and start the development server.

```bash
git clone https://github.com/langchain-ai/agent-chat-ui.git
cd agent-chat-ui
pnpm install
pnpm dev
```

---

### Partial Execution Example

Source: https://docs.langchain.com/oss/javascript/langgraph/test

This example demonstrates how to execute only the second and third nodes in a linear graph by using `updateState` to set the starting point and `interruptAfter` to define the stopping point.

````APIDOC
## Partial Execution with LangGraph

This example shows how to test a specific section of a LangGraph agent's execution flow.

### Method
`invoke` and `updateState`

### Endpoint
N/A (Local execution)

### Parameters

#### Request Body (for `updateState`)
- **thread_id** (string) - Required - The unique identifier for the thread.
- **state** (object) - Required - The state to update.
  - **my_key** (string) - The value to set for the state key.
- **node_name** (string) - Required - The name of the node to simulate execution up to.

#### Request Body (for `invoke`)
- **null** - Required - Indicates to resume execution from the last saved state.
- **configurable** (object) - Required - Configuration options.
  - **thread_id** (string) - Required - The unique identifier for the thread.
  - **interruptAfter** (array of strings) - Optional - A list of node names after which execution should pause.

### Request Example (Conceptual for `updateState`)
```json
{
  "thread_id": "1",
  "state": {
    "my_key": "initial_value"
  },
  "node_name": "node1"
}
````

### Request Example (for `invoke`)

```json
{
  "null": null,
  "configurable": {
    "thread_id": "1",
    "interruptAfter": ["node3"]
  }
}
```

### Response

#### Success Response (200)

- **my_key** (string) - The state value after executing up to the specified interrupt point.

#### Response Example

```json
{
  "my_key": "hello from node3"
}
```

````

--------------------------------

### Install and Use Redis Vector Store with Langchain.js

Source: https://docs.langchain.com/oss/javascript/langchain/rag

Provides installation instructions for the Redis vector store and demonstrates its initialization with a Redis client and index name. Assumes a Redis client instance is available.

```bash
npm i @langchain/redis
````

```bash
yarn add @langchain/redis
```

```bash
pnpm add @langchain/redis
```

```typescript
import { RedisVectorStore } from "@langchain/redis";

const vectorStore = new RedisVectorStore(embeddings, {
  redisClient: client,
  indexName: "langchainjs-testing",
});
```

---

### Milvus Integration Setup

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/milvus

Instructions for setting up Milvus and configuring environment variables for OpenAI or Azure OpenAI.

````APIDOC
## Milvus Integration Setup

### Description
This section details the prerequisites and environment variable configurations required to integrate LangChain.js with Milvus.

### Setup Steps

1.  **Run Milvus Instance:** Start a Milvus instance using Docker. Refer to the [Milvus Docker installation guide](https://milvus.io/docs/v2.1.x/install_standalone-docker.md) for detailed instructions.

2.  **Install Milvus Node.js SDK:**
    ```bash
    npm install -S @zilliz/milvus2-sdk-node
    ```

3.  **Configure Environment Variables:** Set the following environment variables based on your authentication method.

    #### OpenAI
    ```bash
    export OPENAI_API_KEY=YOUR_OPENAI_API_KEY_HERE
    export MILVUS_URL=YOUR_MILVUS_URL_HERE # e.g., http://localhost:19530
    ```

    #### Azure OpenAI
    ```bash
    export AZURE_OPENAI_API_KEY=YOUR_AZURE_OPENAI_API_KEY_HERE
    export AZURE_OPENAI_API_INSTANCE_NAME=YOUR_AZURE_OPENAI_INSTANCE_NAME_HERE
    export AZURE_OPENAI_API_DEPLOYMENT_NAME=YOUR_AZURE_OPENAI_DEPLOYMENT_NAME_HERE
    export AZURE_OPENAI_API_COMPLETIONS_DEPLOYMENT_NAME=YOUR_AZURE_OPENAI_COMPLETIONS_DEPLOYMENT_NAME_HERE
    export AZURE_OPENAI_API_EMBEDDINGS_DEPLOYMENT_NAME=YOUR_AZURE_OPENAI_EMBEDDINGS_DEPLOYMENT_NAME_HERE
    export AZURE_OPENAI_API_VERSION=YOUR_AZURE_OPENAI_API_VERSION_HERE
    export AZURE_OPENAI_BASE_PATH=YOUR_AZURE_OPENAI_BASE_PATH_HERE
    export MILVUS_URL=YOUR_MILVUS_URL_HERE # e.g., http://localhost:19530
    ```
````

---

### Installation

Source: https://docs.langchain.com/oss/javascript/integrations/chat/azure

Install the necessary LangChain packages for Azure OpenAI integration.

````APIDOC
## Installation

### Description
Install the `@langchain/openai` and `@langchain/core` packages using your preferred package manager.

### npm
```bash
npm install @langchain/openai @langchain/core
````

### yarn

```bash
yarn add @langchain/openai @langchain/core
```

### pnpm

```bash
pnpm add @langchain/openai @langchain/core
```

````

--------------------------------

### Get Metadata Keys with LangSmithLoader (TypeScript)

Source: https://docs.langchain.com/oss/javascript/integrations/document_loaders/web_loaders/langsmith

Provides an example of how to get all the available keys within the metadata of a loaded document. This helps in understanding the structure of the metadata.

```typescript
console.log(Object.keys(docs[0].metadata))
````

---

### TypeScript: Full LangGraph Example with Interrupt for Approval

Source: https://docs.langchain.com/oss/javascript/langgraph/interrupts

This comprehensive example illustrates a complete LangGraph setup that includes an interrupt node for user approval. It defines the state schema, adds nodes for approval, proceeding, and cancellation, and configures the graph with a checkpointer. The example shows invoking the graph initially, receiving the interrupt payload, and resuming with a decision.

```typescript
import {
  Command,
  MemorySaver,
  START,
  END,
  StateGraph,
  StateSchema,
  interrupt,
} from "@langchain/langgraph";
import * as z from "zod";

const State = new StateSchema({
  actionDetails: z.string(),
  status: z.enum(["pending", "approved", "rejected"]).nullable(),
});

const graphBuilder = new StateGraph(State)
  .addNode(
    "approval",
    async (state) => {
      // Expose details so the caller can render them in a UI
      const decision = interrupt({
        question: "Approve this action?",
        details: state.actionDetails,
      });
      return new Command({ goto: decision ? "proceed" : "cancel" });
    },
    { ends: ["proceed", "cancel"] },
  )
  .addNode("proceed", () => ({ status: "approved" }))
  .addNode("cancel", () => ({ status: "rejected" }))
  .addEdge(START, "approval")
  .addEdge("proceed", END)
  .addEdge("cancel", END);

// Use a more durable checkpointer in production
const checkpointer = new MemorySaver();
const graph = graphBuilder.compile({ checkpointer });

const config = { configurable: { thread_id: "approval-123" } };
const initial = await graph.invoke(
  { actionDetails: "Transfer $500", status: "pending" },
  config,
);
console.log(initial.__interrupt__);
// [{ value: { question: ..., details: ... } }]

// Resume with the decision; true routes to proceed, false to cancel
const resumed = await graph.invoke(new Command({ resume: true }), config);
console.log(resumed.status); // -> "approved"
```

---

### Install and Use Qdrant Vector Store with Langchain.js

Source: https://docs.langchain.com/oss/javascript/langchain/rag

Shows how to install the Qdrant package for Langchain.js and initialize a vector store from an existing Qdrant collection. Requires Qdrant URL and collection name.

```bash
npm i @langchain/qdrant
```

```bash
yarn add @langchain/qdrant
```

```bash
pnpm add @langchain/qdrant
```

```typescript
import { QdrantVectorStore } from "@langchain/qdrant";

const vectorStore = await QdrantVectorStore.fromExistingCollection(embeddings, {
  url: process.env.QDRANT_URL,
  collectionName: "langchainjs-testing",
});
```

---

### Install and Use AWS Bedrock Embeddings in JavaScript

Source: https://docs.langchain.com/oss/javascript/integrations/embeddings

This snippet guides through installing the @langchain/aws package, setting the BEDROCK_AWS_REGION environment variable, and instantiating BedrockEmbeddings for use with AWS services. It includes installation commands for npm, yarn, and pnpm.

```bash
npm i @langchain/aws

```

```bash
yarn add @langchain/aws

```

```bash
pnpm add @langchain/aws

```

```bash
BEDROCK_AWS_REGION=your-region

```

```typescript
import { BedrockEmbeddings } from "@langchain/aws";

const embeddings = new BedrockEmbeddings({
  model: "amazon.titan-embed-text-v1",
});
```

---

### Extended Example: Travel Planning Agent with Tool Progress

Source: https://docs.langchain.com/oss/javascript/langgraph/streaming

A comprehensive example demonstrating an agent with async-generator tools and how to display their streaming progress in a React UI using `useStream`.

````APIDOC
## Travel Planning Agent with Tool Progress

### Description
This example showcases a full travel planning agent built with LangChain. It includes custom async-generator tools (`searchFlights`, `checkHotels`) that yield progress updates. The accompanying React component uses `useStream` to capture and display these updates, providing a rich user experience.

### Agent Definition

#### Agent Tools

**`searchFlights` Tool:**

- **Description:** Searches for available flights.
- **Schema:** `z.object({ destination: z.string(), departure_date: z.string() })`
- **Yields:** Objects with `message`, `progress`, and `completed` fields.

**`checkHotels` Tool:**

- **Description:** Checks hotel availability.
- **Schema:** `z.object({ city: z.string(), check_in: z.string(), nights: z.number() })`
- **Yields:** Objects with `message`, `progress`, and `completed` fields.

#### Agent Creation
Uses `createAgent` with `ChatOpenAI`, the defined tools, and a `MemorySaver` for state management.

```typescript
import { tool } from "@langchain/core/tools";
import { ChatOpenAI } from "@langchain/openai";
import { createAgent } from "@langchain/langgraph";
import { MemorySaver } from "@langchain/langgraph-checkpoint-memory";
import { z } from "zod/v4";

const searchFlights = tool(
  async function* (input) {
    const airlines = ["United", "Delta", "American", "JetBlue"];
    const completed: string[] = [];

    for (let i = 0; i < airlines.length; i++) {
      await new Promise((r) => setTimeout(r, 600));
      completed.push(`${airlines[i]}: checked`);
      yield {
        message: `Searching ${airlines[i]}...`,
        progress: (i + 1) / airlines.length,
        completed,
      };
    }

    return JSON.stringify({
      flights: [
        { airline: "United", price: 450, duration: "5h 30m" },
        { airline: "Delta", price: 520, duration: "5h 15m" },
      ],
    });
  },
  {
    name: "search_flights",
    description: "Search for available flights.",
    schema: z.object({
      destination: z.string(),
      departure_date: z.string(),
    }),
  }
);

const checkHotels = tool(
  async function* (input) {
    const hotels = ["Grand Hyatt", "Marriott", "Hilton"];
    const completed: string[] = [];

    for (let i = 0; i < hotels.length; i++) {
      await new Promise((r) => setTimeout(r, 400));
      completed.push(`${hotels[i]}: available`);
      yield {
        message: `Checking ${hotels[i]}...`,
        progress: (i + 1) / hotels.length,
        completed,
      };
    }

    return JSON.stringify({
      hotels: [
        { name: "Grand Hyatt", price: 250, rating: 4.5 },
        { name: "Marriott", price: 180, rating: 4.2 },
      ],
    });
  },
  {
    name: "check_hotels",
    description: "Check hotel availability.",
    schema: z.object({
      city: z.string(),
      check_in: z.string(),
      nights: z.number(),
    }),
  }
);

export const agent = createAgent({
  model: new ChatOpenAI({ model: "gpt-4o-mini" }),
  tools: [searchFlights, checkHotels],
  checkpointer: new MemorySaver(),
});
````

### React Component with Progress Cards

#### Description

This React component, `TravelPlanner`, uses the `useStream` hook to connect to the `agent`. It filters `toolProgress` to display active tools and their current status, including progress and yielded data.

```typescript
import { useStream } from "@langchain/langgraph-sdk/react";

function TravelPlanner() {
  const stream = useStream<typeof agent>({
    assistantId: "travel-agent",
    streamMode: ["values", "tools"],
  });

  const activeTools = stream.toolProgress.filter(
    (t) => t.state === "starting" || t.state === "running"
  );

  return (
    <div>
      {/* Render messages */}
      {stream.messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}

      {/* Show progress cards for running tools */}
      {activeTools.map((tool) => (
        <ToolProgressCard
          key={tool.toolCallId ?? tool.name}
          name={tool.name}
          state={tool.state}
          data={tool.data}
        />
      ))}
    </div>
  );
}
```

### Tool Progress Data Structure

When `streamMode` includes `"tools"`, the `useStream` hook returns a `toolProgress` array. Each element in this array is a `ToolProgress` object:

- **`name`** (string): The name of the tool.
- **`state`** (string): The current lifecycle state of the tool. Possible values are `"starting"`, `"running"`, `"completed"`, or `"error"`.
- **`toolCallId`** (string): The unique identifier for the specific tool invocation, as assigned by the LLM.
- **`input`** (any): The arguments that were passed to the tool when it was called.
- **`data`** (any): The most recent data yielded by the tool during its execution. This is particularly useful for streaming tools that provide incremental updates.
- **`result`** (any): The final return value of the tool once it has successfully completed execution.
- **`error`** (any): If the tool execution fails, this field will contain the error object or message.

### Response Example (Partial `toolProgress`)

```json
{
  "toolProgress": [
    {
      "name": "search_flights",
      "state": "running",
      "toolCallId": "call_xyz789",
      "input": { "destination": "Tokyo", "departure_date": "2024-09-01" },
      "data": {
        "message": "Checking Marriott...",
        "progress": 0.5,
        "completed": ["Grand Hyatt: available"]
      },
      "result": null,
      "error": null
    },
    {
      "name": "check_hotels",
      "state": "starting",
      "toolCallId": "call_pqr456",
      "input": { "city": "Tokyo", "check_in": "2024-09-01", "nights": 3 },
      "data": null,
      "result": null,
      "error": null
    }
  ]
}
```

````

--------------------------------

### Instantiate GOAT toolkit with LangChain

Source: https://docs.langchain.com/oss/javascript/integrations/tools/goat

Demonstrates how to configure a Viem wallet client, initialize GOAT tools with plugins, and integrate them into a LangChain agent.

```typescript
import { http } from "viem";
import { createWalletClient } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { baseSepolia } from "viem/chains";
import { getOnChainTools } from "@goat-sdk/adapter-langchain";
import { PEPE, USDC, erc20 } from "@goat-sdk/plugin-erc20";
import { sendETH } from "@goat-sdk/wallet-evm";
import { viem } from "@goat-sdk/wallet-viem";
import { ChatOpenAI } from "@langchain/openai";
import { createAgent } from "@langchain/classic";

const account = privateKeyToAccount(process.env.WALLET_PRIVATE_KEY as `0x${string}`);
const walletClient = createWalletClient({
  account: account,
  transport: http(process.env.RPC_PROVIDER_URL),
  chain: baseSepolia,
});

const tools = await getOnChainTools({
  wallet: viem(walletClient),
  plugins: [sendETH(), erc20({ tokens: [USDC, PEPE] })],
});

const model = new ChatOpenAI({ model: "gpt-4.1-mini" });
const agent = createAgent({ llm: model, tools: tools });
````

---

### Install Groq LangChain Package

Source: https://docs.langchain.com/oss/javascript/integrations/chat

Provides the installation commands for the @langchain/groq package using common Node.js package managers.

```bash
npm i @langchain/groq
```

```bash
yarn add @langchain/groq
```

```bash
pnpm add @langchain/groq
```

---

### Installation

Source: https://docs.langchain.com/oss/javascript/integrations/document_loaders/web_loaders/web_cheerio

Install the necessary LangChain community packages and the cheerio peer dependency using npm, yarn, or pnpm.

````APIDOC
## GET /api/items/{id}

### Description
Retrieves details for a specific item using its unique identifier.

### Method
GET

### Endpoint
/api/items/{id}

### Parameters
#### Path Parameters
- **id** (string) - Required - The unique identifier of the item to retrieve.

#### Query Parameters
None

#### Request Body
None

### Request Example
None

### Response
#### Success Response (200)
- **id** (string) - The unique identifier of the item.
- **name** (string) - The name of the item.
- **description** (string) - A description of the item.
- **price** (number) - The price of the item.

#### Response Example
```json
{
  "id": "item-abcde",
  "name": "Example Widget",
  "description": "A high-quality widget for various applications.",
  "price": 29.99
}
````

### Error Handling

- **404 Not Found**: If an item with the specified ID does not exist.

````

--------------------------------

### Using Structured Output with Deep Agents

Source: https://docs.langchain.com/oss/javascript/deepagents/customization

This example demonstrates how to create a Deep Agent with a specified response format (Zod schema) and how to invoke it to get structured output.

```APIDOC
## POST /api/deepagents/invoke

### Description
Invokes a Deep Agent with a user query and retrieves structured output based on a predefined schema.

### Method
POST

### Endpoint
/api/deepagents/invoke

### Parameters
#### Request Body
- **messages** (array) - Required - An array of message objects representing the conversation history.
- **responseFormat** (object) - Optional - A Zod schema defining the desired structure for the agent's response.
- **tools** (array) - Optional - An array of available tools the agent can use.

### Request Example
```json
{
  "messages": [
    {
      "role": "user",
      "content": "What's the weather like in San Francisco?"
    }
  ],
  "responseFormat": {
    "location": "string",
    "temperature": "number",
    "condition": "string",
    "humidity": "number",
    "windSpeed": "number",
    "forecast": "string"
  },
  "tools": [
    {
      "name": "internet_search",
      "description": "Run a web search",
      "schema": {
        "query": "string",
        "maxResults": "number",
        "topic": "enum",
        "includeRawContent": "boolean"
      }
    }
  ]
}
````

### Response

#### Success Response (200)

- **structuredResponse** (object) - The structured data generated by the agent, conforming to the `responseFormat` schema.

#### Response Example

```json
{
  "structuredResponse": {
    "location": "San Francisco, California",
    "temperature": 18.3,
    "condition": "Sunny",
    "humidity": 48,
    "windSpeed": 7.6,
    "forecast": "Clear skies with temperatures remaining mild. High of 18°C (64°F) during the day, dropping to around 11°C (52°F) at night."
  }
}
```

````

--------------------------------

### Installation

Source: https://docs.langchain.com/oss/javascript/integrations/document_compressors/mixedbread_ai

Install the Mixedbread AI package for LangChain JavaScript.

```APIDOC
## Installation

To get started, install the `@langchain/mixedbread-ai` package:

```bash
npm install @langchain/mixedbread-ai
````

````

--------------------------------

### Configure Agent System Prompt

Source: https://docs.langchain.com/oss/javascript/langchain/agents

Demonstrates how to initialize an agent with a simple string-based system prompt to define assistant behavior.

```typescript
const agent = createAgent({
  model,
  tools,
  systemPrompt: "You are a helpful assistant. Be concise and accurate.",
});
````

---

### ChatOpenAI Integration Setup

Source: https://docs.langchain.com/oss/javascript/integrations/chat/openai

Instructions for configuring the environment to use the ChatOpenAI integration.

````APIDOC
## Setup Configuration

### Description
To use the ChatOpenAI integration, you must install the @langchain/openai package and configure your environment variables with your OpenAI API key.

### Method
N/A (Configuration)

### Endpoint
N/A

### Parameters
#### Environment Variables
- **OPENAI_API_KEY** (string) - Required - Your OpenAI API key generated from the OpenAI platform.
- **LANGSMITH_TRACING** (boolean) - Optional - Enable tracing for model calls.
- **LANGSMITH_API_KEY** (string) - Optional - Your LangSmith API key for tracing.

### Request Example
```bash
export OPENAI_API_KEY="your-api-key"
````

### Response

N/A

````

--------------------------------

### Install FaissStore Dependencies

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/faiss

Commands to install the necessary packages for using FaissStore with LangChain in Node.js environments.

```bash
npm install @langchain/community faiss-node @langchain/openai @langchain/core
````

```bash
yarn add @langchain/community faiss-node @langchain/openai @langchain/core
```

```bash
pnpm add @langchain/community faiss-node @langchain/openai @langchain/core
```

---

### Full Graph Implementation for Input Validation

Source: https://docs.langchain.com/oss/javascript/langgraph/interrupts

A complete example showing the setup of a StateGraph, the integration of a MemorySaver checkpointer, and the process of invoking the graph with Command objects to resume execution after interrupts.

```typescript
import {
  Command,
  MemorySaver,
  START,
  END,
  StateGraph,
  StateSchema,
  interrupt,
} from "@langchain/langgraph";
import * as z from "zod";

const State = new StateSchema({
  age: z.number().nullable(),
});

const builder = new StateGraph(State)
  .addNode("collectAge", (state) => {
    let prompt = "What is your age?";
    while (true) {
      const answer = interrupt(prompt);
      if (typeof answer === "number" && answer > 0) {
        return { age: answer };
      }
      prompt = `'${answer}' is not a valid age. Please enter a positive number.`;
    }
  })
  .addEdge(START, "collectAge")
  .addEdge("collectAge", END);

const checkpointer = new MemorySaver();
const graph = builder.compile({ checkpointer });

const config = { configurable: { thread_id: "form-1" } };
const first = await graph.invoke({ age: null }, config);
const retry = await graph.invoke(new Command({ resume: "thirty" }), config);
const final = await graph.invoke(new Command({ resume: 30 }), config);
```

---

### Complete DeepInfra Embeddings Example in TypeScript

Source: https://docs.langchain.com/oss/javascript/integrations/embeddings/deepinfra

A comprehensive example showcasing the setup and usage of the `DeepInfraEmbeddings` class, including initialization, generating embeddings for a single query, and generating embeddings for multiple documents.

```typescript
import { DeepInfraEmbeddings } from "@langchain/community/embeddings/deepinfra";

const embeddings = new DeepInfraEmbeddings({
  apiToken: "YOUR_API_TOKEN",
  modelName: "sentence-transformers/clip-ViT-B-32",
  batchSize: 512,
});

async function runExample() {
  const queryEmbedding = await embeddings.embedQuery("Example query text.");
  console.log("Query Embedding:", queryEmbedding);

  const documents = ["Text 1", "Text 2", "Text 3"];
  const documentEmbeddings = await embeddings.embedDocuments(documents);
  console.log("Document Embeddings:", documentEmbeddings);
}

runExample();
```

---

### Install Notion API dependencies

Source: https://docs.langchain.com/oss/javascript/integrations/document_loaders/web_loaders/notionapi

Install the required community packages and Notion client libraries to enable document loading from Notion.

```bash
npm install @langchain/community @langchain/core @notionhq/client notion-to-md
```

---

### Start Development Server for LangChain Studio

Source: https://docs.langchain.com/oss/javascript/langgraph/studio

This command starts a local development server that connects your agent to LangChain Studio. It allows for real-time updates and debugging. Use the `--tunnel` flag for Safari compatibility.

```shell
npx @langchain/langgraph-cli dev
npx @langchain/langgraph-cli dev --tunnel
```

---

### Instantiate Nia Toolkit and Tools

Source: https://docs.langchain.com/oss/javascript/integrations/tools/nia

Demonstrates how to initialize the full NiaToolkit with various feature sets or instantiate individual tools like NiaSearch.

```typescript
import { NiaToolkit, NiaSearch } from "@nozomioai/langchain-nia";

const toolkit = new NiaToolkit({
  includeSearch: true,
  includeSources: true,
  includeGithub: true,
  includeContexts: true,
  includeDependencies: true,
});
const tools = toolkit.getTools();

const tool = new NiaSearch();
```

---

### OpenAI Embeddings

Source: https://docs.langchain.com/oss/javascript/langchain/rag

Set up and use OpenAI embeddings with Langchain.js. Includes installation and code examples for the OpenAIEmbeddings class.

````APIDOC
## Install OpenAI Integration

### Description
Install the necessary Langchain.js package for OpenAI integration using your preferred package manager.

### Method
Package Installation

### Endpoint
N/A

### Parameters
None

### Request Example
```bash
npm i @langchain/openai
````

### Response

#### Success Response (200)

- Installation successful.

#### Response Example

```
+ @langchain/openai@x.x.x
```

## Initialize OpenAI Embeddings

### Description

Initialize the `OpenAIEmbeddings` class to generate embeddings using OpenAI models.

### Method

Class Instantiation

### Endpoint

N/A (Client-side SDK)

### Parameters

#### Environment Variables

- **OPENAI_API_KEY** (string) - Required - Your OpenAI API key.

#### `OpenAIEmbeddings` Constructor Parameters

- **model** (string) - Required - The OpenAI embeddings model to use (e.g., "text-embedding-3-large").
- **temperature** (number) - Optional - Controls randomness. Lower values make the output more deterministic.
- **configuration** (object) - Optional - Additional configuration options for the OpenAI API client.

### Request Example

```typescript
import { OpenAIEmbeddings } from "@langchain/openai";

const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-large",
});
```

### Response

#### Success Response (200)

- **embeddings** (OpenAIEmbeddings) - An instance of the `OpenAIEmbeddings` class.

#### Response Example

```json
{
  "_model": "OpenAIEmbeddings",
  "model": "text-embedding-3-large"
}
```

````

--------------------------------

### Installation

Source: https://docs.langchain.com/oss/javascript/integrations/chat/openai

Install the necessary LangChain packages for OpenAI integration using npm, yarn, or pnpm.

```APIDOC
## Installation

The LangChain [`ChatOpenAI`](https://reference.langchain.com/javascript/langchain-openai/ChatOpenAI) integration lives in the `@langchain/openai` package:

```bash
npm install @langchain/openai @langchain/core
````

```bash
yarn add @langchain/openai @langchain/core
```

```bash
pnpm add @langchain/openai @langchain/core
```

````

--------------------------------

### Create a simple workflow with entrypoint

Source: https://docs.langchain.com/oss/javascript/langgraph/use-functional-api

Demonstrates how to define a workflow using the entrypoint function and a MemorySaver checkpointer. It shows how to pass multiple inputs as a dictionary object.

```typescript
const checkpointer = new MemorySaver();

const myWorkflow = entrypoint(
  { checkpointer, name: "myWorkflow" },
  async (inputs: { value: number; anotherValue: number }) => {
    const value = inputs.value;
    const anotherValue = inputs.anotherValue;
    // ...
  }
);

await myWorkflow.invoke({ value: 1, anotherValue: 2 });
````

---

### Install LangChain Community and Dependencies

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/hnswlib

Installs the necessary LangChain community package, the HNSWLib node package, and the OpenAI integration package for embeddings. This setup is required for using HNSWLib vector stores with OpenAI embeddings in a Node.js environment.

```bash
npm install @langchain/community hnswlib-node @langchain/openai @langchain/core
```

```bash
yarn add @langchain/community hnswlib-node @langchain/openai @langchain/core
```

```bash
pnpm add @langchain/community hnswlib-node @langchain/openai @langchain/core
```

---

### Initialize and Use Friendli LLM in JavaScript

Source: https://docs.langchain.com/oss/javascript/integrations/llms/friendli

Demonstrates how to initialize the Friendli LLM with specific configurations such as model name, API tokens, and generation parameters (maxTokens, temperature, topP, frequencyPenalty, stop). It includes examples for invoking the model directly to get a response and for streaming the response chunk by chunk.

```typescript
import { Friendli } from "@langchain/community/llms/friendli";

const model = new Friendli({
  model: "mixtral-8x7b-instruct-v0-1", // Default value
  friendliToken: process.env.FRIENDLI_TOKEN,
  friendliTeam: process.env.FRIENDLI_TEAM,
  maxTokens: 18,
  temperature: 0.75,
  topP: 0.25,
  frequencyPenalty: 0,
  stop: [],
});

const response = await model.invoke(
  "Check the Grammar: She dont like to eat vegetables, but she loves fruits.",
);

console.log(response);

/*
Correct: She doesn't like to eat vegetables, but she loves fruits
*/

const stream = await model.stream(
  "Check the Grammar: She dont like to eat vegetables, but she loves fruits.",
);

for await (const chunk of stream) {
  console.log(chunk);
}

/*
Cor
rect
: She
 doesn
...she loves fruits
*/
```

---

### Install MCP Adapters Library

Source: https://docs.langchain.com/oss/javascript/langchain/mcp

Commands to install the @langchain/mcp-adapters package using various JavaScript package managers.

```bash
npm install @langchain/mcp-adapters
```

```bash
pnpm add @langchain/mcp-adapters
```

```bash
yarn add @langchain/mcp-adapters
```

```bash
bun add @langchain/mcp-adapters
```

---

### Initialize Computer Use Tool with LangChain

Source: https://docs.langchain.com/oss/javascript/integrations/tools/openai

Demonstrates how to configure the Computer Use tool using the ChatOpenAI model. It includes an execute callback to handle mouse, keyboard, and screenshot actions within a browser environment.

```typescript
import { ChatOpenAI, tools } from "@langchain/openai";

const model = new ChatOpenAI({ model: "computer-use-preview" });

const computer = tools.computerUse({
  displayWidth: 1024,
  displayHeight: 768,
  environment: "browser",
  execute: async (action) => {
    if (action.type === "screenshot") {
      return captureScreenshot();
    }
    if (action.type === "click") {
      await page.mouse.click(action.x, action.y, { button: action.button });
      return captureScreenshot();
    }
    if (action.type === "type") {
      await page.keyboard.type(action.text);
      return captureScreenshot();
    }
    if (action.type === "scroll") {
      await page.mouse.move(action.x, action.y);
      await page.evaluate(
        `window.scrollBy(${action.scroll_x}, ${action.scroll_y})`,
      );
      return captureScreenshot();
    }
    return captureScreenshot();
  },
});

const llmWithComputer = model.bindTools([computer]);
const response = await llmWithComputer.invoke(
  "Check the latest news on bing.com",
);
```

---

### Azure OpenAI Embeddings

Source: https://docs.langchain.com/oss/javascript/langchain/rag

Configure and use Azure OpenAI embeddings with Langchain.js. Includes installation and code examples for the AzureOpenAIEmbeddings class.

````APIDOC
## Install OpenAI Integration for Azure

### Description
Install the necessary Langchain.js package for OpenAI integration, which also covers Azure OpenAI, using your preferred package manager.

### Method
Package Installation

### Endpoint
N/A

### Parameters
None

### Request Example
```bash
npm i @langchain/openai
````

### Response

#### Success Response (200)

- Installation successful.

#### Response Example

```
+ @langchain/openai@x.x.x
```

## Configure Azure OpenAI Environment Variables

### Description

Set the required environment variables for connecting to Azure OpenAI services.

### Method

Environment Variable Configuration

### Endpoint

N/A

### Parameters

- **AZURE_OPENAI_API_INSTANCE_NAME** (string) - Required - The name of your Azure OpenAI instance.
- **AZURE_OPENAI_API_KEY** (string) - Required - Your Azure OpenAI API key.
- **AZURE_OPENAI_API_VERSION** (string) - Required - The API version to use (e.g., "2024-02-01").

### Request Example

```bash
AZURE_OPENAI_API_INSTANCE_NAME=<YOUR_INSTANCE_NAME>
AZURE_OPENAI_API_KEY=<YOUR_KEY>
AZURE_OPENAI_API_VERSION="2024-02-01"
```

### Response

#### Success Response (200)

- Environment variables set.

#### Response Example

```
Environment variables configured.
```

## Initialize Azure OpenAI Embeddings

### Description

Initialize the `AzureOpenAIEmbeddings` class to generate embeddings using Azure OpenAI models.

### Method

Class Instantiation

### Endpoint

N/A (Client-side SDK)

### Parameters

#### Environment Variables

- **AZURE_OPENAI_API_INSTANCE_NAME**, **AZURE_OPENAI_API_KEY**, **AZURE_OPENAI_API_VERSION** - Required - See configuration above.

#### `AzureOpenAIEmbeddings` Constructor Parameters

- **azureOpenAIApiEmbeddingsDeploymentName** (string) - Required - The deployment name for the embeddings model in Azure OpenAI.
- **model** (string) - Optional - The specific model name if not using deployment name directly (often redundant with deployment name).
- **temperature** (number) - Optional - Controls randomness. Lower values make the output more deterministic.
- **configuration** (object) - Optional - Additional configuration options for the Azure OpenAI API client.

### Request Example

```typescript
import { AzureOpenAIEmbeddings } from "@langchain/openai";

const embeddings = new AzureOpenAIEmbeddings({
  azureOpenAIApiEmbeddingsDeploymentName: "text-embedding-ada-002",
});
```

### Response

#### Success Response (200)

- **embeddings** (AzureOpenAIEmbeddings) - An instance of the `AzureOpenAIEmbeddings` class.

#### Response Example

```json
{
  "_model": "AzureOpenAIEmbeddings",
  "azureOpenAIApiEmbeddingsDeploymentName": "text-embedding-ada-002"
}
```

````

--------------------------------

### Clone and Initialize Repository

Source: https://docs.langchain.com/oss/javascript/contributing/code

Commands to clone a forked repository and install necessary dependencies using pnpm.

```bash
git clone https://github.com/your-username/name-of-forked-repo.git
pnpm install
pnpm build
````

---

### Complete JinaEmbeddings Example

Source: https://docs.langchain.com/oss/javascript/integrations/embeddings/jina

A comprehensive example showcasing the initialization of JinaEmbeddings with an API key and model, followed by generating embeddings for both a single query and multiple documents, including image handling.

```typescript
import { JinaEmbeddings } from "@langchain/community/embeddings/jina";
import { localImageToBase64 } from "@langchain/community/embeddings/jina/util";

const embeddings = new JinaEmbeddings({
  apiKey: "YOUR_API_TOKEN",
  model: "jina-embeddings-v2-base-en",
});

async function runExample() {
  const queryEmbedding = await embeddings.embedQuery("Example query text.");
  console.log("Query Embedding:", queryEmbedding);

  const documents = [
    "hello",
    {
      text: "hello",
    },
    {
      image: "https://i.ibb.co/nQNGqL0/beach1.jpg",
    },
    {
      image: await localImageToBase64("beach1.jpg"),
    },
  ];
  const documentEmbeddings = await embeddings.embedDocuments(documents);
  console.log("Document Embeddings:", documentEmbeddings);
}

runExample();
```

---

### Installation

Source: https://docs.langchain.com/oss/javascript/integrations/document_loaders/web_loaders/couchbase

Install the necessary packages for Couchbase integration.

````APIDOC
## Installation

```bash
npm install @langchain/community @langchain/core couchbase
````

````

--------------------------------

### Yielding Keys from LocalFileStore

Source: https://docs.langchain.com/oss/javascript/integrations/stores/file_system

This example shows how to add data to a `LocalFileStore` and then retrieve all keys matching a specific prefix using the `yieldKeys` method.

```APIDOC
## Yielding Values

If you want to get back all the keys you can call the `yieldKeys` method. Optionally, you can pass a key prefix to only get back keys which match that prefix.

### Method

`yieldKeys(keyPrefix?: string): AsyncIterableIterator<string>`

### Parameters

#### Query Parameters

- **keyPrefix** (string) - Optional - A prefix to filter the keys returned.

### Request Example

```typescript
import { LocalFileStore } from "@langchain/classic/storage/file_system"

const kvStoreForYield = await LocalFileStore.fromPath("./messages");

const encoderForYield = new TextEncoder();

// Add some data to the store
await kvStoreForYield.mset([
  ["message:id:key1", encoderForYield.encode("value1")],
  ["message:id:key2", encoderForYield.encode("value2")],
])

const yieldedKeys = [];
for await (const key of kvStoreForYield.yieldKeys("message:id:")) {
  yieldedKeys.push(key);
}

console.log(yieldedKeys);
````

### Response

#### Success Response (200)

Returns an `AsyncIterableIterator` yielding keys that match the provided prefix.

#### Response Example

```python
[ 'message:id:key1', 'message:id:key2' ]
```

````

--------------------------------

### HuggingFace Transformers Embeddings Setup and Usage

Source: https://docs.langchain.com/oss/javascript/integrations/embeddings/transformers

This snippet shows how to install the necessary packages and use the HuggingFaceTransformersEmbeddings class to embed queries and documents.

```APIDOC
## HuggingFace Transformers Embeddings

### Description
Integrate with the HuggingFace transformers embedding model using LangChain JavaScript. The `TransformerEmbeddings` class uses the [Transformers.js](https://huggingface.co/docs/transformers.js/index) package to generate embeddings for a given text. It runs locally and even works directly in the browser.

### Setup

You'll need to install the [@huggingface/transformers](https://www.npmjs.com/package/@huggingface/transformers) package as a peer dependency:

```bash
npm install @huggingface/transformers
````

Install LangChain packages:

```bash
npm install @langchain/community @langchain/core
```

### Example

Note that if you're using in a browser context, you'll likely want to put all inference-related code in a web worker to avoid blocking the main thread.

```typescript
import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/huggingface_transformers";

const model = new HuggingFaceTransformersEmbeddings({
  model: "Xenova/all-MiniLM-L6-v2",
});

/* Embed queries */
const res = await model.embedQuery(
  "What would be a good company name for a company that makes colorful socks?",
);
console.log({ res });

/* Embed documents */
const documentRes = await model.embedDocuments(["Hello world", "Bye bye"]);
console.log({ documentRes });
```

### Related

- Embedding model [conceptual guide](/oss/javascript/integrations/embeddings)
- Embedding model [how-to guides](/oss/javascript/integrations/embeddings)

````

--------------------------------

### Installation

Source: https://docs.langchain.com/oss/javascript/releases/langgraph-v1

Install LangGraph v1 and LangChain core using your preferred package manager.

```APIDOC
## Installation

Install LangGraph v1 and LangChain core using your preferred package manager.

### npm
```bash
npm install @langchain/langgraph @langchain/core
````

### pnpm

```bash
pnpm add @langchain/langgraph @langchain/core
```

### yarn

```bash
yarn add @langchain/langgraph @langchain/core
```

### bun

```bash
bun add @langchain/langgraph @langchain/core
```

````

--------------------------------

### Dynamic System Prompt Middleware

Source: https://docs.langchain.com/oss/javascript/langchain/short-term-memory

This example demonstrates how to use `dynamicSystemPromptMiddleware` to create a system prompt that dynamically includes the user's name from the context.

```APIDOC
## Dynamic System Prompt Middleware

### Description
Access short term memory (state) in middleware to create dynamic prompts based on conversation history or custom state fields. This example uses `dynamicSystemPromptMiddleware` to address the user by name.

### Method
N/A (Middleware configuration)

### Endpoint
N/A (Middleware configuration)

### Parameters
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
```typescript
import * as z from "zod";
import { createAgent, tool, dynamicSystemPromptMiddleware } from "langchain";

const contextSchema = z.object({
  userName: z.string(),
});
type ContextSchema = z.infer<typeof contextSchema>;

const getWeather = tool(
  async ({ city }) => {
    return `The weather in ${city} is always sunny!`;
  },
  {
    name: "get_weather",
    description: "Get user info",
    schema: z.object({
      city: z.string(),
    }),
  }
);

const agent = createAgent({
  model: "gpt-5-nano",
  tools: [getWeather],
  contextSchema,
  middleware: [
    dynamicSystemPromptMiddleware<ContextSchema>((_, config) => {
      return `You are a helpful assistant. Address the user as ${config.context?.userName}.`;
    }),
  ],
});

const result = await agent.invoke(
  {
    messages: [{ role: "user", content: "What is the weather in SF?" }],
  },
  {
    context: {
      userName: "John Smith",
    },
  }
);

for (const message of result.messages) {
  console.log(message);
}
````

### Response

#### Success Response (200)

N/A (This is a configuration example)

#### Response Example

```json
{
  "example": "AIMessage { \"content\": \"John Smith, here's the latest: The weather in San Francisco is always sunny!\n\nIf you'd like more details (temperature, wind, humidity) or a forecast for the next few days, I can pull that up. What would you like?\", // ... }"
}
```

````

--------------------------------

### Alibaba Tongyi Embeddings Setup and Usage

Source: https://docs.langchain.com/oss/javascript/integrations/embeddings/alibaba_tongyi

This snippet demonstrates how to install the necessary packages and use the AlibabaTongyiEmbeddings class to generate embeddings for a given text.

```APIDOC
## Alibaba Tongyi Embeddings Integration

### Description
Integrate with the Alibaba Tongyi embedding model using LangChain JavaScript. The `AlibabaTongyiEmbeddings` class uses the Alibaba Tongyi API to generate embeddings for a given text.

### Setup

1. **API Key**: Sign up for an Alibaba API key and set it as an environment variable named `ALIBABA_API_KEY`.
2. **Installation**: Install the `@langchain/community` and `@langchain/core` packages.

   ```bash
   npm install @langchain/community @langchain/core
````

### Usage

```typescript
import { AlibabaTongyiEmbeddings } from "@langchain/community/embeddings/alibaba_tongyi";

const model = new AlibabaTongyiEmbeddings({});
const res = await model.embedQuery(
  "What would be a good company name a company that makes colorful socks?",
);
console.log({ res });
```

### Related Resources

- Embedding model [conceptual guide](/oss/javascript/integrations/embeddings)
- Embedding model [how-to guides](/oss/javascript/integrations/embeddings)

````

--------------------------------

### Install LangChain and Google Auth Libraries

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/googlevertexai

Installs the necessary LangChain community and core packages along with the Google authentication library for Node.js.

```bash
npm install @langchain/community @langchain/core google-auth-library
````

---

### Install SingleStoreDB Dependencies

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/singlestore

Commands to install the required mysql2 driver and LangChain packages for SingleStoreDB integration.

```bash
npm install -S mysql2
npm install @langchain/openai @langchain/community @langchain/core
```

---

### Get Tools with Fine-Grained Permissions in TypeScript

Source: https://docs.langchain.com/oss/javascript/integrations/tools/composio

This example demonstrates how to retrieve tools from Composio with specific permission filters. It shows how to fetch tools, such as GitHub tools, and limit the results to operations with 'read' permissions.

```typescript
// Get tools with specific permissions
const tools = await composio.tools.get("default", "GITHUB", {
  // Limit to read-only operations
  permissions: ["read"],
});
```

---

### Update Imports for @langchain/classic

Source: https://docs.langchain.com/oss/javascript/migrate/langchain-v1

Example of how to update import statements after installing `@langchain/classic`. This shows the transition from older import paths in `langchain` to the new paths in `@langchain/classic`.

```typescript
// v1 (new)
import { ... } from "@langchain/classic";
import { ... } from "@langchain/classic/chains";

// v0 (old)
import { ... } from "langchain";
import { ... } from "langchain/chains";
```

---

### Install Supabase and LangChain Dependencies

Source: https://docs.langchain.com/oss/javascript/integrations/retrievers/supabase-hybrid

Commands to install the required Supabase client and LangChain packages for hybrid search functionality.

```bash
npm install -S @supabase/supabase-js
npm install @langchain/openai @langchain/community @langchain/core
```

---

### Invoke ChatFireworks Model in JavaScript

Source: https://docs.langchain.com/oss/javascript/integrations/chat/index

Shows how to invoke the instantiated ChatFireworks model in JavaScript to get a response. This is a basic example of sending a prompt and receiving a completion.

```javascript
await model.invoke("Hello, world!");
```

---

### Install Daytona SDK

Source: https://docs.langchain.com/oss/javascript/integrations/providers/daytona

Commands to install the @langchain/daytona package using common package managers.

```bash
npm install @langchain/daytona
```

```bash
yarn add @langchain/daytona
```

```bash
pnpm add @langchain/daytona
```

---

### Customer Support Workflow Example

Source: https://docs.langchain.com/oss/javascript/langchain/multi-agent/handoffs-customer-support

This code snippet showcases a full customer support workflow implemented in TypeScript using Langchain. It defines states, tools, and prompts to guide an AI agent through verifying warranty status, classifying issues, and providing appropriate solutions or escalations.

````APIDOC
## Complete Example: Customer Support Workflow

### Description
This example demonstrates a customer support agent workflow using Langchain. It includes tools for warranty verification, issue classification, and resolution, along with state management to track the conversation.

### Tools Defined
- `record_warranty_status`: Records the customer's warranty status.
- `record_issue_type`: Records the type of issue (hardware/software).
- `escalate_to_human`: Escalates the case to a human agent.
- `provide_solution`: Provides a solution or repair information.

### Workflow Steps
1. **warranty_collector**: Greets the customer and records warranty status.
2. **issue_classifier**: Asks for issue description and classifies it as hardware or software.
3. **resolution_specialist**: Provides solutions based on issue type and warranty status.

### Request Example
```typescript
import { createMiddleware, createAgent } from "langchain";

import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { tool, ToolMessage, type ToolRuntime, HumanMessage } from "langchain";
import { Command, MemorySaver, StateSchema } from "@langchain/langgraph";
import { ChatOpenAI } from "@langchain/openai";

// Define the possible workflow steps
const SupportStepSchema = z.enum([
  "warranty_collector",
  "issue_classifier",
  "resolution_specialist",
]);
const WarrantyStatusSchema = z.enum(["in_warranty", "out_of_warranty"]);
const IssueTypeSchema = z.enum(["hardware", "software"]);

// State for customer support workflow
const SupportState = new StateSchema({
  currentStep: SupportStepSchema.optional(),
  warrantyStatus: WarrantyStatusSchema.optional(),
  issueType: IssueTypeSchema.optional(),
});

const recordWarrantyStatus = tool(
  async (input, config: ToolRuntime<typeof SupportState.State>) => {
    return new Command({
      update: {
        messages: [
          new ToolMessage({
            content: `Warranty status recorded as: ${input.status}`,
            tool_call_id: config.toolCallId,
          }),
        ],
        warrantyStatus: input.status,
        currentStep: "issue_classifier",
      },
    });
  },
  {
    name: "record_warranty_status",
    description:
      "Record the customer's warranty status and transition to issue classification.",
    schema: z.object({
      status: WarrantyStatusSchema,
    }),
  }
);

const recordIssueType = tool(
  async (input, config: ToolRuntime<typeof SupportState.State>) => {
    return new Command({
      update: {
        messages: [
          new ToolMessage({
            content: `Issue type recorded as: ${input.issueType}`,
            tool_call_id: config.toolCallId,
          }),
        ],
        issueType: input.issueType,
        currentStep: "resolution_specialist",
      },
    });
  },
  {
    name: "record_issue_type",
    description:
      "Record the type of issue and transition to resolution specialist.",
    schema: z.object({
      issueType: IssueTypeSchema,
    }),
  }
);

const escalateToHuman = tool(
  async (input) => {
    // In a real system, this would create a ticket, notify staff, etc.
    return `Escalating to human support. Reason: ${input.reason}`;
  },
  {
    name: "escalate_to_human",
    description: "Escalate the case to a human support specialist.",
    schema: z.object({
      reason: z.string(),
    }),
  }
);

const provideSolution = tool(
  async (input) => {
    return `Solution provided: ${input.solution}`;
  },
  {
    name: "provide_solution",
    description: "Provide a solution to the customer's issue.",
    schema: z.object({
      solution: z.string(),
    }),
  }
);

// Define prompts as constants for easy reference
const WARRANTY_COLLECTOR_PROMPT = `You are a customer support agent helping with device issues.

CURRENT STAGE: Warranty verification

At this step, you need to:
1. Greet the customer warmly
2. Ask if their device is under warranty
3. Use record_warranty_status to record their response and move to the next step

Be conversational and friendly. Don't ask multiple questions at once.`;

const ISSUE_CLASSIFIER_PROMPT = `You are a customer support agent helping with device issues.

CURRENT STAGE: Issue classification
CUSTOMER INFO: Warranty status is {warranty_status}

At this step, you need to:
1. Ask the customer to describe their issue
2. Determine if it's a hardware issue (physical damage, broken parts) or software issue (app crashes, performance)
3. Use record_issue_type to record the classification and move to the next step

If unclear, ask clarifying questions before classifying.`;

const RESOLUTION_SPECIALIST_PROMPT = `You are a customer support agent helping with device issues.

CURRENT STAGE: Resolution
CUSTOMER INFO: Warranty status is {warranty_status}, issue type is {issue_type}

At this step, you need to:
1. For SOFTWARE issues: provide troubleshooting steps using provide_solution
2. For HARDWARE issues:
   - If IN WARRANTY: explain warranty repair process using provide_solution
   - If OUT OF WARRANTY: escalate_to_human for paid repair options

Be specific and helpful in your solutions.`;

// Step configuration: maps step name to (prompt, tools, required_state)
const STEP_CONFIG = {
  warranty_collector: {
    prompt: WARRANTY_COLLECTOR_PROMPT,
    tools: [recordWarrantyStatus],
    requires: [],
  },
  issue_classifier: {
    prompt: ISSUE_CLASSIFIER_PROMPT,
    tools: [recordIssueType],
    requires: ["warrantyStatus"],
  },
  resolution_specialist: {
    prompt: RESOLUTION_SPECIALIST_PROMPT,
    tools: [provideSolution, escalateToHuman],
    requires: ["warrantyStatus", "issueType"],
  },
};

// Define the agent's behavior using the defined steps and state
const agent = createAgent(STEP_CONFIG, SupportState);

// Example of how to run the agent (requires a message history and model)
// const model = new ChatOpenAI({});
// const result = await agent.invoke([
//   new HumanMessage("Hello, I have a problem with my device.")
// ], {
//   model,
//   state: SupportState.initial(),
// });

console.log("Example setup complete. Agent is ready to be invoked.");
````

### Response

This example does not define specific API endpoints with request/response bodies in the traditional sense. Instead, it sets up an agent that processes messages and uses tools to update its internal state. The output is determined by the agent's execution flow and the results of the tools it invokes.

````

--------------------------------

### Install Cassandra Dependencies with npm

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/cassandra

Installs the necessary LangChain JavaScript packages and the Cassandra driver for Node.js integration. Ensure you have Node.js installed.

```bash
npm install cassandra-driver @langchain/community @langchain/openai @langchain/core
````

---

### Install Momento SDK for Browser/Edge

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/momento_vector_index

Installs the Momento SDK specifically for browser or edge environments. Use this if you are not running in a Node.js environment.

```bash
npm install @gomomento/sdk-web
```

---

### AWS Bedrock Converse Chat Model

Source: https://docs.langchain.com/oss/javascript/langchain/rag

Integrate AWS Bedrock chat models using Langchain.js. This includes installation instructions and examples for both initChatModel and the ChatBedrockConverse class.

````APIDOC
## Install AWS Bedrock Integration

### Description
Install the necessary Langchain.js package for AWS Bedrock integration using your preferred package manager.

### Method
Package Installation

### Endpoint
N/A

### Parameters
None

### Request Example
```bash
npm install @langchain/aws
````

### Response

#### Success Response (200)

- Installation successful.

#### Response Example

```
+ @langchain/aws@x.x.x
```

## Initialize AWS Bedrock Converse Chat Model

### Description

Initialize a chat model using AWS Bedrock Converse with Langchain.js. This example uses the `initChatModel` utility.

### Method

`initChatModel`

### Endpoint

N/A (Client-side SDK)

### Parameters

#### Environment Variables

- **AWS Credentials**: Ensure your AWS credentials are configured (e.g., via environment variables, IAM roles, or shared credential files).

#### `initChatModel` Parameters

- **modelName** (string) - Required - The identifier for the AWS Bedrock model (e.g., "bedrock:gpt-5.2").
- **options** (object) - Optional - Configuration options for the model.

### Request Example

```typescript
import { initChatModel } from "langchain";

// Follow the steps here to configure your credentials:
// https://docs.aws.amazon.com/bedrock/latest/userguide/getting-started.html

const model = await initChatModel("bedrock:gpt-5.2");
```

### Response

#### Success Response (200)

- **model** (ChatModel) - An instance of the initialized chat model.

#### Response Example

```json
{
  "_model": "ChatBedrockConverse",
  "model": "gpt-5.2"
}
```

## Instantiate AWS Bedrock Converse Chat Model Class

### Description

Instantiate the `ChatBedrockConverse` class directly for AWS Bedrock chat models.

### Method

Class Instantiation

### Endpoint

N/A (Client-side SDK)

### Parameters

#### Environment Variables

- **AWS Credentials**: Ensure your AWS credentials are configured.

#### `ChatBedrockConverse` Constructor Parameters

- **model** (string) - Required - The identifier for the AWS Bedrock model (e.g., "gpt-5.2").
- **region** (string) - Required - The AWS region where Bedrock is available (e.g., "us-east-2").
- **credentials** (object) - Optional - AWS credentials object.

### Request Example

```typescript
import { ChatBedrockConverse } from "@langchain/aws";

// Follow the steps here to configure your credentials:
// https://docs.aws.amazon.com/bedrock/latest/userguide/getting-started.html

const model = new ChatBedrockConverse({
  model: "gpt-5.2",
  region: "us-east-2",
});
```

### Response

#### Success Response (200)

- **model** (ChatBedrockConverse) - An instance of the `ChatBedrockConverse` class.

#### Response Example

```json
{
  "_model": "ChatBedrockConverse",
  "model": "gpt-5.2",
  "region": "us-east-2"
}
```

````

--------------------------------

### Instantiation

Source: https://docs.langchain.com/oss/javascript/integrations/chat/openrouter

Demonstrates how to instantiate the ChatOpenRouter model with specified parameters.

```APIDOC
## Instantiation

Now we can instantiate our model object and generate chat completions:

```typescript
import { ChatOpenRouter } from "@langchain/openrouter";

const model = new ChatOpenRouter({
  model: "anthropic/claude-sonnet-4.5",
  temperature: 0,
  maxTokens: 1024,
  // other params...
});
````

````

--------------------------------

### Install LibSQL and LangChain dependencies

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/libsql

Install the necessary packages to enable libSQL vector store functionality and OpenAI embeddings integration.

```bash
npm install @libsql/client @langchain/openai @langchain/community
````

---

### Configure Hooks for LangChain CLI Events

Source: https://docs.langchain.com/oss/javascript/deepagents/cli/configuration

Set up hooks to react to LangChain CLI lifecycle events by defining commands and associated events in a JSON configuration file. This example logs session start and end events to a file.

```json
{
  "hooks": [
    {
      "command": ["bash", "-c", "cat >> ~/deepagents-events.log"],
      "events": ["session.start", "session.end"]
    }
  ]
}
```

---

### Create Agent with Model Instance - JavaScript

Source: https://docs.langchain.com/oss/javascript/langchain/agents

Shows how to initialize a Langchain agent with a pre-configured model instance. This provides granular control over model parameters like temperature, maxTokens, and timeouts.

```javascript
import { createAgent } from "langchain";
import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({
  model: "gpt-4.1",
  temperature: 0.1,
  maxTokens: 1000,
  timeout: 30,
});

const agent = createAgent({
  model,
  tools: [],
});
```

---

### AWS Bedrock Converse Integration

Source: https://docs.langchain.com/oss/javascript/langchain/multi-agent/router-knowledge-base

Setup and usage instructions for AWS Bedrock Converse chat models using Langchain in JavaScript. Includes package installation and model initialization.

````APIDOC
## Install Dependencies

### Description
Installs the necessary `@langchain/aws` package for AWS Bedrock integration using various package managers.

### Method
Package Manager Install Commands

### Endpoint
N/A

### Parameters
None

### Request Example
#### npm
```bash
npm install @langchain/aws
````

#### pnpm

```bash
pnpm install @langchain/aws
```

#### yarn

```bash
yarn add @langchain/aws
```

#### bun

```bash
bun add @langchain/aws
```

## Initialize Chat Model with initChatModel

### Description

Initializes a chat model using the `initChatModel` function for AWS Bedrock Converse.

### Method

`initChatModel`

### Endpoint

N/A (Function Call)

### Parameters

#### Path Parameters

None

#### Query Parameters

None

#### Request Body

None

### Request Example

```typescript
import { initChatModel } from "langchain";

// Follow the steps here to configure your credentials:
// https://docs.aws.amazon.com/bedrock/latest/userguide/getting-started.html

const model = await initChatModel("bedrock:gpt-5.2");
```

### Response

#### Success Response (200)

Represents the initialized chat model object.

#### Response Example

```json
{
  "model": "gpt-5.2",
  "provider": "bedrock"
}
```

## Instantiate Chat Model Class

### Description

Creates an instance of the `ChatBedrockConverse` class for direct use with AWS Bedrock.

### Method

`new ChatBedrockConverse()`

### Endpoint

N/A (Class Instantiation)

### Parameters

#### Path Parameters

None

#### Query Parameters

None

#### Request Body

None

### Request Example

```typescript
import { ChatBedrockConverse } from "@langchain/aws";

// Follow the steps here to configure your credentials:
// https://docs.aws.amazon.com/bedrock/latest/userguide/getting-started.html

const model = new ChatBedrockConverse({
  model: "gpt-5.2",
  region: "us-east-2",
});
```

### Response

#### Success Response (200)

Represents an instance of the `ChatBedrockConverse` class.

#### Response Example

```json
{
  "model": "gpt-5.2",
  "region": "us-east-2"
}
```

````

--------------------------------

### Implement Per-Invocation Subagents in LangGraph

Source: https://docs.langchain.com/oss/javascript/langgraph/use-subgraphs

This example demonstrates how to define subagents as tools for an outer agent without setting a persistent checkpointer for the subagents, ensuring they start fresh on each invocation.

```typescript
import { createAgent, tool } from "langchain";
import { MemorySaver, Command, interrupt } from "@langchain/langgraph";
import * as z from "zod";

const fruitInfo = tool(
  (input) => `Info about ${input.fruitName}`,
  {
    name: "fruit_info",
    description: "Look up fruit info.",
    schema: z.object({ fruitName: z.string() }),
  }
);

const veggieInfo = tool(
  (input) => `Info about ${input.veggieName}`,
  {
    name: "veggie_info",
    description: "Look up veggie info.",
    schema: z.object({ veggieName: z.string() }),
  }
);

const fruitAgent = createAgent({
  model: "gpt-4.1-mini",
  tools: [fruitInfo],
  prompt: "You are a fruit expert. Use the fruit_info tool. Respond in one sentence.",
});

const veggieAgent = createAgent({
  model: "gpt-4.1-mini",
  tools: [veggieInfo],
  prompt: "You are a veggie expert. Use the veggie_info tool. Respond in one sentence.",
});

const askFruitExpert = tool(
  async (input) => {
    const response = await fruitAgent.invoke({
      messages: [{ role: "user", content: input.question }],
    });
    return response.messages[response.messages.length - 1].content;
  },
  {
    name: "ask_fruit_expert",
    description: "Ask the fruit expert. Use for ALL fruit questions.",
    schema: z.object({ question: z.string() }),
  }
);

const askVeggieExpert = tool(
  async (input) => {
    const response = await veggieAgent.invoke({
      messages: [{ role: "user", content: input.question }],
    });
    return response.messages[response.messages.length - 1].content;
  },
  {
    name: "ask_veggie_expert",
    description: "Ask the veggie expert. Use for ALL veggie questions.",
    schema: z.object({ question: z.string() }),
  }
);

const agent = createAgent({
  model: "gpt-4.1-mini",
  tools: [askFruitExpert, askVeggieExpert],
  prompt:
    "You have two experts: ask_fruit_expert and ask_veggie_expert. " +
    "ALWAYS delegate questions to the appropriate expert.",
  checkpointer: new MemorySaver(),
});
````

---

### Agent Tool Call Output Example

Source: https://docs.langchain.com/oss/javascript/integrations/tools/exa_search

Example output showing the tool call made by the agent. This indicates the agent has identified the need to use the 'search' tool with a specific query.

```text
[
  {
    name: 'search',
    args: { query: 'fascinating article about cats' },
    type: 'tool_call',
    id: 'call_EcA0tmWsyNktO7HAsGQnqLVt'
  }
]
```

---

### AWS Bedrock Converse Chat Model

Source: https://docs.langchain.com/oss/javascript/langgraph/sql-agent

Integrate AWS Bedrock Converse chat models into your Langchain.js project. This includes installation instructions and examples for both `initChatModel` and direct class instantiation.

````APIDOC
## Install AWS Langchain Package

### Description
Installs the necessary `@langchain/aws` package for using AWS Bedrock models.

### Method
Package Manager Commands

### Endpoint
N/A

### Parameters
None

### Request Example
```bash
# npm
npm install @langchain/aws

# pnpm
pnpm install @langchain/aws

# yarn
yarn add @langchain/aws

# bun
bun add @langchain/aws
````

### Response

N/A

## Initialize AWS Bedrock Converse Chat Model

### Description

Initializes an AWS Bedrock Converse chat model using the `initChatModel` function. Ensure your AWS credentials are configured.

### Method

`initChatModel`

### Endpoint

N/A (Utility function)

### Parameters

None

### Request Example

```typescript
import { initChatModel } from "langchain";

// Follow the steps here to configure your credentials:
// https://docs.aws.amazon.com/bedrock/latest/userguide/getting-started.html

const model = await initChatModel("bedrock:gpt-5.2");
```

### Response

N/A (Returns a chat model instance)

## AWS Bedrock Converse Chat Model Class

### Description

Instantiates the `ChatBedrockConverse` class directly for more control over model configuration.

### Method

`new ChatBedrockConverse`

### Endpoint

N/A (Class instantiation)

### Parameters

- **model** (string) - Required - The name of the Bedrock model to use (e.g., "gpt-5.2").
- **region** (string) - Required - The AWS region where Bedrock is available (e.g., "us-east-2").

### Request Example

```typescript
import { ChatBedrockConverse } from "@langchain/aws";

// Follow the steps here to configure your credentials:
// https://docs.aws.amazon.com/bedrock/latest/userguide/getting-started.html

const model = new ChatBedrockConverse({
  model: "gpt-5.2",
  region: "us-east-2",
});
```

### Response

N/A (Returns a `ChatBedrockConverse` instance)

````

--------------------------------

### Install Project Dependencies

Source: https://docs.langchain.com/oss/javascript/langchain/studio

Installs necessary LangChain packages using either pip or uv package managers.

```shell
pip install langchain langchain-openai
````

```shell
uv add langchain langchain-openai
```

---

### Install LangChain Community Package

Source: https://docs.langchain.com/oss/javascript/integrations/tools/google_scholar

Install the required dependency to access the Google Scholar tool.

```bash
npm install @langchain/community
```

---

### Implement Dynamic System Prompt using Runtime Context

Source: https://docs.langchain.com/oss/javascript/langchain/context-engineering

Illustrates how to use runtime configuration, such as user roles and deployment environments, to modify system instructions.

```typescript
import * as z from "zod";
import { createAgent, dynamicSystemPromptMiddleware } from "langchain";

const contextSchema = z.object({
  userRole: z.string(),
  deploymentEnv: z.string(),
});

type Context = z.infer<typeof contextSchema>;

const agent = createAgent({
  model: "gpt-4.1",
  tools: [...],
  contextSchema,
  middleware: [
    dynamicSystemPromptMiddleware<Context>((state, runtime) => {
      const userRole = runtime.context.userRole;
      const env = runtime.context.deploymentEnv;
      let base = "You are a helpful assistant.";
      if (userRole === "admin") {
        base += "\nYou have admin access. You can perform all operations.";
      } else if (userRole === "viewer") {
        base += "\nYou have read-only access. Guide users to read operations only.";
      }
      if (env === "production") {
        base += "\nBe extra careful with any data modifications.";
      }
      return base;
    }),
  ],
});
```

---

### Install USearch Package

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/usearch

Install the necessary USearch package for Node.js.

````APIDOC
## Install USearch Package

### Description
Install the `usearch` package, which provides Node.js bindings for the USearch library.

### Method
```bash
npm install -S usearch
````

### Description

Install the core LangChain packages required for integration.

### Method

```bash
npm install @langchain/openai @langchain/community @langchain/core
```

````

--------------------------------

### Install Writer SDK and LangChain Packages

Source: https://docs.langchain.com/oss/javascript/integrations/llms/writer

Installs the official Writer SDK package as a peer dependency and also installs the necessary LangChain community and core packages. These are required for integrating the Writer LLM.

```bash
yarn add @writerai/writer-sdk
````

```bash
npm install @langchain/community @langchain/core
```

---

### AWS Step Functions Toolkit Integration

Source: https://docs.langchain.com/oss/javascript/integrations/tools/sfn_agent

This snippet demonstrates how to integrate the AWSSfnToolkit with an agent, allowing it to interact with AWS Step Functions. It includes setup, credential handling, and a usage example.

````APIDOC
## AWS Step Functions Toolkit Integration

### Description
Integrate with AWS Step Functions using LangChain JavaScript. This allows your LangChain Agent to invoke asynchronous workflows running in AWS Cloud by including an `AWSSfn` tool.

### Setup
Install the Node AWS Step Functions SDK:
```bash
npm install @aws-sdk/client-sfn
````

Install LangChain packages:

```bash
npm install @langchain/openai @langchain/community @langchain/core
```

### Credentials

- If `aws configure` has not been run via the AWS CLI, you must provide `region`, `accessKeyId`, and `secretAccessKey` to the `AWSSfn` constructor.
- The IAM role associated with these credentials must have permissions to invoke the Step Function.

### Usage Example

This example uses a deployed AWS Step Function state machine. You can provision one using the provided Amazon State Language (ASL) definition or use a tool like LocalStack for local mocking.

```typescript
import { OpenAI } from "@langchain/openai";
import {
  AWSSfnToolkit,
  createAWSSfnAgent,
} from "@langchain/community/agents/toolkits/aws_sfn";

const _EXAMPLE_STATE_MACHINE_ASL = `
{
  "Comment": "A simple example of the Amazon States Language to define a state machine for new client onboarding.",
  "StartAt": "OnboardNewClient",
  "States": {
    "OnboardNewClient": {
      "Type": "Pass",
      "Result": "Client onboarded!",
      "End": true
    }
  }
}`;

export const run = async () => {
  const model = new OpenAI({ temperature: 0 });
  const toolkit = new AWSSfnToolkit({
    name: "onboard-new-client-workflow",
    description:
      "Onboard new client workflow. Can also be used to get status of any executing workflow or state machine.",
    stateMachineArn:
      "arn:aws:states:us-east-1:1234567890:stateMachine:my-state-machine", // Update with your state machine ARN
    region: "<your Sfn's region>",
    accessKeyId: "<your access key id>",
    secretAccessKey: "<your secret access key>",
  });
  const executor = createAWSSfnAgent(model, toolkit);

  const input = `Onboard john doe (john@example.com) as a new client.`;

  console.log(`Executing with input "${input}"...`);

  const result = await executor.invoke({ input });

  console.log(`Got output ${result.output}`);

  console.log(
    `Got intermediate steps ${JSON.stringify(
      result.intermediateSteps,
      null,
      2,
    )}`,
  );
};
```

### Supported Actions

When an Agent uses the `AWSSfn` tool, it can invoke the following actions by passing a string argument:

- `StartExecution`
- `DescribeExecution`
- `SendTaskSuccess`

````

--------------------------------

### Install Soniox LangChain Package

Source: https://docs.langchain.com/oss/javascript/integrations/document_loaders/web_loaders/soniox

Install the necessary package to integrate Soniox with LangChain projects.

```bash
npm install @soniox/langchain
````

---

### Install LangChain Google Package

Source: https://docs.langchain.com/oss/javascript/integrations/chat/google

Instructions for installing the necessary LangChain packages for Google integration using npm, yarn, and pnpm. It includes installing '@langchain/google' and '@langchain/core'.

```bash
npm install @langchain/google @langchain/core
```

```bash
yarn add @langchain/google @langchain/core
```

```bash
pnpm add @langchain/google @langchain/core
```

---

### Install ChatZhipuAI Dependencies

Source: https://docs.langchain.com/oss/javascript/integrations/chat/zhipuai

Installs the necessary LangChain community packages and jsonwebtoken for ChatZhipuAI integration. Ensure you have Node.js and npm installed.

```bash
npm install @langchain/community @langchain/core jsonwebtoken
```

---

### React Component Setup and Themeing with AI Elements

Source: https://docs.langchain.com/oss/javascript/langchain/frontend/integrations/ai-elements

This snippet demonstrates setting up and theming React components using AI Elements. It includes logic for handling iframe communication, theme synchronization, and rendering a loading spinner while the component is not ready. Dependencies include React hooks like useEffect and state management for component readiness and theme.

```javascript
const cancelAnimationFrame = require("react").cancelAnimationFrame;
const useEffect = require("react").useEffect;
const useRef = require("react").useRef;
const useState = require("react").useState;

// ... other imports and component logic

const cached = iframeCache.get(example);
if (!cached?.iframe || !ready) return;
try {
  cached.iframe.contentWindow?.postMessage(
    {
      type: "CHAT_LC_SET_THEME",
      theme: effectiveTheme,
    },
    "*",
  );
} catch {}

// ... rest of the component
```

---

### Initialize Chroma Vector Store

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/chroma

Demonstrates how to instantiate a Chroma vector store connection, including local server configurations and Chroma Cloud authentication.

```typescript
import { Chroma } from "@langchain/community/vectorstores/chroma";

// Local connection
const vectorStore = new Chroma(embeddings, {
  collectionName: "a-test-collection",
});

// Custom host/port
const customStore = new Chroma(embeddings, {
  collectionName: "a-test-collection",
  host: "your-host-address",
  port: 8080,
});

// Chroma Cloud connection
const cloudStore = new Chroma(embeddings, {
  collectionName: "a-test-collection",
  chromaCloudAPIKey: process.env.CHROMA_API_KEY,
  clientParams: {
    host: "api.trychroma.com",
    port: 8000,
    ssl: true,
    tenant: process.env.CHROMA_TENANT,
    database: process.env.CHROMA_DATABASE,
  },
});
```

---

### Start DeepAgents ACP Server Programmatically (Class)

Source: https://docs.langchain.com/oss/javascript/deepagents/acp

Initializes and starts a DeepAgents ACP server using the `DeepAgentsServer` class for full control over server configuration. Allows detailed setup of multiple agents with specific models, skills, memory, and system prompts, along with server-level options like name, version, and debug mode.

```typescript
import { DeepAgentsServer } from "deepagents-acp";

const server = new DeepAgentsServer({
  agents: [
    {
      name: "code-agent",
      description: "Full-featured coding assistant",
      model: "claude-sonnet-4-5-20250929",
      skills: ["./skills/"],
      memory: ["./.deepagents/AGENTS.md"],
    },
    {
      name: "reviewer",
      description: "Code review specialist",
      systemPrompt: "You are a code review expert...",
    },
  ],
  serverName: "my-deepagents-acp",
  serverVersion: "1.0.0",
  workspaceRoot: process.cwd(),
  debug: true,
});

await server.start();
```

---

### Install Langchain Community

Source: https://docs.langchain.com/oss/javascript/integrations/document_loaders/web_loaders/sitemap

Install the necessary Langchain community packages for JavaScript.

````APIDOC
## Install Langchain Community

First, we need to install the `langchain` package:

```bash
npm install @langchain/community @langchain/core
````

````

--------------------------------

### Enable Streaming Responses from ChatBaiduQianfan

Source: https://docs.langchain.com/oss/javascript/integrations/chat/baidu_qianfan

Configure the ChatBaiduQianfan model to receive streaming token responses. This example shows how to set the 'streaming' option to true and invoke the model to get incremental results.

```typescript
import { ChatBaiduQianfan } from "@langchain/baidu-qianfan";
import { HumanMessage } from "@langchain/core/messages";

const chat = new ChatBaiduQianfan({
  qianfanAccessKey: process.env.QIANFAN_ACCESS_KEY,
  qianfanSecretKey: process.env.QIANFAN_SECRET_KEY,
  model: "ERNIE-Lite-8K",
  streaming: true,
});

const message = new HumanMessage("等额本金和等额本息有什么区别？");
const res = await chat.invoke([message]);
console.log({ res });

/**
 {
      res: AIMessage {
        lc_serializable: true,
        lc_kwargs: {
          content: 'undefined等额本金和等额本息是两种常见的贷款还款方式，它们之间的主要区别在于计息方式、每月还款额和利息支出等方面。\n' +
            '\n' +
            '1. 计息方式：等额本金是一种按月递减的计息方式，每月偿还相同数额的本金和剩余贷款在该月产生的利息。而等额本息则是每月偿还相同金额的利息，根据贷款金额和贷款期限计算月供，本金和利息在每月还款中占的比例逐月变化。\n' +
            '2. 每月还款额：由于等额本息每月偿还的利息占每月还款总额的比例逐渐减少，导致每月还款额逐渐增加，而等额本金每月偿还的本金相同，因此每月还款额逐渐减少。\n' +
            '3. 利息支出：在贷款期限相同的情况下，等额本金的利息支出相对较少，因为随着本金的减少，剩余贷款产生的利息也相应减少。而等额本息的利息支出则相对较高，因为每月偿还的利息逐渐减少，导致总利息支出相对较高。\n' +
            '\n' +
            '总之，等额本金和等额本息在贷款期限相同的情况下，等额本金由于利息支出相对较少，更适合于资金充裕、有提前还款打算的借款人；而等额本息每月还款额固定，更适合于每月收入较高的借款人。',
          tool_calls: [],
          invalid_tool_calls: [],
          additional_kwargs: {},
          response_metadata: {}
        },
        lc_namespace: [ 'langchain_core', 'messages' ],
        content: 'undefined等额本金和等额本息是两种常见的贷款还款方式，它们之间的主要区别在于计息方式、每月还款额和利息支出等方面。\n' +
            '\n' +
            '1. 计息方式：等额本金是一种按月递减的计息方式，每月偿还相同数额的本金和剩余贷款在该月产生的利息。而等额本息则是每月偿还相同金额的利息，根据贷款金额和贷款期限计算月供，本金和利息在每月还款中占的比例逐月变化。\n' +
            '2. 每月还款额：由于等额本息每月偿还的利息占每月还款总额的比例逐渐减少，导致每月还款额逐渐增加，而等额本金每月偿还的本金相同，因此每月还款额逐渐减少。\n' +
            '3. 利息支出：在贷款期限相同的情况下，等额本金的利息支出相对较少，因为随着本金的减少，剩余贷款产生的利息也相应减少。而等额本息的利息支出则相对较高，因为每月偿还的利息逐渐减少，导致总利息支出相对较高。\n' +
            '\n' +
            '总之，等额本金和等额本息在贷款期限相同的情况下，等额本金由于利息支出相对较少，更适合于资金充裕、有提前还款打算的借款人；而等额本息每月还款额固定，更适合于每月收入较高的借款人。',
        name: undefined,
        additional_kwargs: {},
        response_metadata: { tokenUsage: [Object] },
        tool_calls: [],
        invalid_tool_calls: []
      }
    }
 */
````

---

### Connect Studio to Local Server

Source: https://docs.langchain.com/oss/javascript/langgraph/local-server

Demonstrates how to update the Studio UI URL to connect to a locally running LangGraph Agent Server, especially when it's hosted on a custom host or port.

```text
https://smith.langchain.com/studio/?baseUrl=http://myhost:3000
```

---

### Audio Input Examples

Source: https://docs.langchain.com/oss/javascript/langchain/messages

Illustrates how to create messages with audio data using base64 encoding or file IDs.

````APIDOC
## Audio Input

### Description
Examples of creating `HumanMessage` objects with audio data from different sources.

### Method
N/A (Code examples for message construction)

### Endpoint
N/A

### Parameters
N/A

### Request Example
```typescript
// From base64 data
const messageBase64 = new HumanMessage({
  content: [
    { type: "text", text: "Describe the content of this audio." },
    {
      type: "audio",
      source_type: "base64",
      data: "AAAAIGZ0eXBtcDQyAAAAAGlzb21tcDQyAAACAGlzb2...",
    },
  ],
});

// From provider-managed File ID
const messageId = new HumanMessage({
  content: [
    { type: "text", text: "Describe the content of this audio." },
    { type: "audio", source_type: "id", id: "file-abc123" },
  ],
});
````

### Response

N/A

````

--------------------------------

### Instantiation

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/pinecone

Demonstrates how to instantiate the PineconeStore with OpenAI embeddings and an existing Pinecone index.

```APIDOC
## Instantiation

### Description
Instantiate the PineconeStore with OpenAI embeddings and an existing Pinecone index.

### Method
```typescript
import { PineconeStore } from "@langchain/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";

import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";

const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-small",
});

const pinecone = new PineconeClient();
// Will automatically read the PINECONE_API_KEY and PINECONE_ENVIRONMENT env vars
const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX!);

const vectorStore = await PineconeStore.fromExistingIndex(
  embeddings,
  {
    pineconeIndex,
    // Maximum number of batch requests to allow at once. Each batch is 1000 vectors.
    maxConcurrency: 5,
    // You can pass a namespace here too
    // namespace: "foo",
  }
);
````

````

--------------------------------

### Usage with Deepagents

Source: https://docs.langchain.com/oss/javascript/integrations/providers/modal

Integrates Modal sandboxes with deepagents for isolated code execution. This example shows how to create a deepagent with a Modal backend and invoke it to perform tasks like installing packages and calculating values.

```typescript
import { createDeepAgent } from "deepagents";
import { ChatAnthropic } from "@langchain/anthropic";
import { ModalSandbox } from "@langchain/modal";

const sandbox = await ModalSandbox.create({
  imageName: "python:3.12-slim",
  timeoutMs: 600_000, // 10 minutes
});

try {
  const agent = createDeepAgent({
    model: new ChatAnthropic({ model: "claude-sonnet-4-20250514" }),
    systemPrompt: "You are a coding assistant with sandbox access.",
    backend: sandbox,
  });

  const result = await agent.invoke({
    messages: [{ role: "user", content: "Install numpy and calculate pi" }],
  });
} finally {
  await sandbox.close();
}
````

---

### Standard Schema Example

Source: https://docs.langchain.com/oss/javascript/langchain/structured-output

Example of using the `toolStrategy` with a Standard Schema (Valibot) for defining the structured output.

````APIDOC
## Standard Schema Example

```ts
import * as v from "valibot";
import { toStandardJsonSchema } from "@valibot/to-json-schema";
import { createAgent, toolStrategy } from "langchain";

const ProductReview = toStandardJsonSchema(
    v.object({
        rating: v.optional(v.pipe(v.number(), v.minValue(1), v.maxValue(5))),
        sentiment: v.picklist(["positive", "negative"]),
        keyPoints: v.pipe(v.array(v.string()), v.description("The key points of the review. Lowercase, 1-3 words each.")),
    })
);

const agent = createAgent({
    model: "gpt-5",
    tools: [],
    responseFormat: toolStrategy(ProductReview)
});

const result = await agent.invoke({
    messages: [{"role": "user", "content": "Analyze this review: 'Great product: 5 out of 5 stars. Fast shipping, but expensive'"}]
});

console.log(result.structuredResponse);
// { "rating": 5, "sentiment": "positive", "keyPoints": ["fast shipping", "expensive"] }
````

````

--------------------------------

### Install PineconeStore Dependencies (npm, yarn, pnpm)

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/pinecone

Installs the necessary LangChain packages for Pinecone and OpenAI integration, along with the official Pinecone SDK. Ensure you have Node.js and a package manager installed.

```bash
npm install @langchain/pinecone @langchain/openai @langchain/core @pinecone-database/pinecone@5
````

```bash
yarn add @langchain/pinecone @langchain/openai @langchain/core @pinecone-database/pinecone@5
```

```bash
pnpm add @langchain/pinecone @langchain/openai @langchain/core @pinecone-database/pinecone@5
```

---

### Run Unstructured Locally with Docker

Source: https://docs.langchain.com/oss/javascript/integrations/document_loaders/file_loaders/unstructured

This command starts the Unstructured API service locally using Docker. It maps port 8000 and runs the latest Unstructured API image. Ensure Docker is installed.

```bash
docker run -p 8000:8000 -d --rm --name unstructured-api downloads.unstructured.io/unstructured-io/unstructured-api:latest --port 8000 --host 0.0.0.0
```

---

### Install and Use Pinecone Store with Langchain.js

Source: https://docs.langchain.com/oss/javascript/langchain/rag

Details the installation of the Pinecone client and Langchain integration. It demonstrates initializing a Pinecone vector store using an existing Pinecone index and embeddings.

```bash
npm i @langchain/pinecone
```

```bash
yarn add @langchain/pinecone
```

```bash
pnpm add @langchain/pinecone
```

```typescript
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";

const pinecone = new PineconeClient({
  apiKey: process.env.PINECONE_API_KEY,
});
const pineconeIndex = pinecone.Index("your-index-name");

const vectorStore = new PineconeStore(embeddings, {
  pineconeIndex,
  maxConcurrency: 5,
});
```

---

### Rapid Prototyping with Functional API

Source: https://docs.langchain.com/oss/javascript/langgraph/choosing-apis

Illustrates how to quickly chain asynchronous steps using 'entrypoint' without the overhead of defining explicit state schemas.

```typescript
import { entrypoint } from "@langchain/langgraph";

const quickPrototype = entrypoint(
  { checkpointer },
  async (data: Record<string, unknown>) => {
    const step1Result = await processStep1(data);
    const step2Result = await processStep2(step1Result);
    return { finalResult: step2Result };
  },
);
```

---

### Install Google GenAI Integration

Source: https://docs.langchain.com/oss/javascript/langchain/models

Installs the required LangChain Google GenAI package using the Bun package manager.

```bash
bun add @langchain/google-genai
```

---

### Install Bedrock for Web Environments (No Node SDK)

Source: https://docs.langchain.com/oss/javascript/integrations/llms/bedrock

Installs LangChain Bedrock integration for web environments, omitting the Node.js specific credential provider.

```bash
npm install @aws-crypto/sha256-js @smithy/protocol-http @smithy/signature-v4 @smithy/eventstream-codec @smithy/util-utf8 @aws-sdk/types
```

```bash
yarn add @aws-crypto/sha256-js @smithy/protocol-http @smithy/signature-v4 @smithy/eventstream-codec @smithy/util-utf8 @aws-sdk/types
```

```bash
pnpm add @aws-crypto/sha256-js @smithy/protocol-http @smithy/signature-v4 @smithy/eventstream-codec @smithy/util-utf8 @aws-sdk/types
```

---

### Install Replicate and LangChain dependencies

Source: https://docs.langchain.com/oss/javascript/integrations/llms/replicate

Install the required npm packages to enable Replicate integration within a LangChain project.

```bash
npm install replicate@1 @langchain/community @langchain/core
```

---

### Accessing Memories Across Threads in LangGraph

Source: https://docs.langchain.com/oss/javascript/langgraph/persistence

This example demonstrates invoking a LangGraph with a new `thread_id` but the same `userId`. This highlights how memories associated with a `userId` remain accessible even when starting a new conversation thread, provided the `userId` is consistent.

```typescript
// Invoke the graph
const config = { configurable: { thread_id: "2" }, context: { userId: "1" } };

// Let's say hi again
for await (const update of await graph.stream(
  { messages: [{ role: "user", content: "hi, tell me about my memories" }] },
  { ...config, streamMode: "updates" },
)) {
  console.log(update);
}
```

---

### Basic PII Detection Setup

Source: https://docs.langchain.com/oss/javascript/langchain/middleware/built-in

This snippet demonstrates how to set up PII detection for email and credit card information using predefined strategies.

````APIDOC
## Basic PII Detection Setup

### Description
This example shows how to initialize an agent with PII middleware to detect and redact emails and mask credit card numbers.

### Method
`createAgent` with `piiMiddleware`

### Endpoint
N/A (Client-side configuration)

### Parameters
N/A

### Request Example
```typescript
import { createAgent, piiMiddleware } from "langchain";

const agent = createAgent({
  model: "gpt-4.1",
  tools: [],
  middleware: [
    piiMiddleware("email", { strategy: "redact", applyToInput: true }),
    piiMiddleware("credit_card", { strategy: "mask", applyToInput: true }),
  ],
});
````

### Response

N/A

````

--------------------------------

### Azure Cosmos DB NoSQL Semantic Cache Usage Example

Source: https://docs.langchain.com/oss/javascript/integrations/llm_caching/azure_cosmosdb_nosql

Demonstrates how to initialize and use the Azure Cosmos DB NoSQL semantic cache with LangChain JavaScript. It shows the setup of embeddings, cache configuration with connection details, and how to integrate the cache with a LangChain model (ChatOpenAI) to enable semantic caching for LLM responses. The example highlights how repeated identical prompts result in cached responses.

```typescript
import {
  AzureCosmosDBNoSQLConfig,
  AzureCosmosDBNoSQLSemanticCache,
} from "@langchain/azure-cosmosdb";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";

const embeddings = new OpenAIEmbeddings();
const config: AzureCosmosDBNoSQLConfig = {
  databaseName: "<DATABASE_NAME>",
  containerName: "<CONTAINER_NAME>",
  // use endpoint to initiate client with managed identity
  connectionString: "<CONNECTION_STRING>",
};

/**
 * Sets the threshold similarity score for returning cached results based on vector distance.
 * Cached output is returned only if the similarity score meets or exceeds this threshold;
 * otherwise, a new result is generated. Default is 0.6, adjustable via the constructor
 * to suit various distance functions and use cases.
 * (see: https://aka.ms/CosmosVectorSearch).
 */

const similarityScoreThreshold = 0.5;
const cache = new AzureCosmosDBNoSQLSemanticCache(
  embeddings,
  config,
  similarityScoreThreshold
);

const model = new ChatOpenAI({ model: "gpt-4.1-mini", cache });

// Invoke the model to perform an action
const response1 = await model.invoke("Do something random!");
console.log(response1);
/*
  AIMessage {
    content: "Sure! I'll generate a random number for you: 37",
    additional_kwargs: {}
  }
*/

const response2 = await model.invoke("Do something random!");
console.log(response2);
/*
  AIMessage {
    content: "Sure! I'll generate a random number for you: 37",
    additional_kwargs: {}
  }
*/

````

---

### Instantiate WatsonxLLM

Source: https://docs.langchain.com/oss/javascript/integrations/llms/ibm

Shows how to initialize the WatsonxLLM class with required configuration parameters like service URL, project ID, and model ID.

```javascript
import { WatsonxLLM } from "@langchain/community/llms/ibm";

const props = {
  decoding_method: "sample",
  maxNewTokens: 100,
  minNewTokens: 1,
  temperature: 0.5,
  topK: 50,
  topP: 1,
};
const instance = new WatsonxLLM({
  version: "YYYY-MM-DD",
  serviceUrl: process.env.API_URL,
  projectId: "<PROJECT_ID>",
  model: "<MODEL_ID>",
  ...props,
});
```

---

### LangChain JavaScript AWS S3 Document Loader Setup

Source: https://docs.langchain.com/oss/javascript/integrations/providers/aws

Install the necessary AWS SDK package for S3 and import the S3Loader to load documents from AWS S3 directories and files. This facilitates data ingestion from S3 buckets into LangChain.

```bash
npm install @aws-sdk/client-s3
```

```typescript
import { S3Loader } from "@langchain/community/document_loaders/web/s3";
```

---

### Google AI (AI Studio) Setup

Source: https://docs.langchain.com/oss/javascript/integrations/chat/google

Initialize the ChatGoogle model for use with Google AI Studio. An API key is optional if GOOGLE_API_KEY environment variable is set.

````APIDOC
## Google AI (AI Studio)

### Description
Initialize the ChatGoogle model for use with Google AI Studio. An API key is optional if the `GOOGLE_API_KEY` environment variable is set.

### Method
Instantiation

### Endpoint
N/A (Client-side library)

### Parameters
#### Request Body
- **model** (string) - Required - The name of the Gemini model to use (e.g., "gemini-2.5-flash").
- **maxRetries** (number) - Optional - The maximum number of retries for API calls.
- **apiKey** (string) - Optional - Your Google API key. Can be omitted if `GOOGLE_API_KEY` environment variable is set.

### Request Example
```typescript
import { ChatGoogle } from "@langchain/google";

const llm = new ChatGoogle({
  model: "gemini-2.5-flash",
  maxRetries: 2,
  // apiKey: "...", // Optional if GOOGLE_API_KEY is set
});
````

````

--------------------------------

### Install OpenUI and LangChain React Packages

Source: https://docs.langchain.com/oss/javascript/langchain/frontend/integrations/openui

This command installs the necessary npm packages for integrating OpenUI with LangChain.js and React. It includes @langchain/react, @openuidev/react-ui, @openuidev/react-headless, and @openuidev/react-lang.

```bash
npm install @langchain/react @openuidev/react-ui @openuidev/react-headless @openuidev/react-lang
````

---

### Install LangChain and SAP HANA Client Packages

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/hanavector

Installs the required LangChain community package and either the @sap/hana-client or hdb package for SAP HANA Cloud integration. Ensure you have Node.js and npm installed.

```bash
npm install -S @langchain/community @langchain/core @sap/hana-client
# or
npm install -S @langchain/community @langchain/core hdb
```

---

### Install Deep Agents CLI

Source: https://docs.langchain.com/oss/javascript/deepagents/cli

Downloads and executes the installation script for the Deep Agents CLI.

```bash
curl -LsSf https://raw.githubusercontent.com/langchain-ai/deepagents/refs/heads/main/libs/cli/scripts/install.sh | bash
```

---

### Initialize PostgresStore for LangGraph

Source: https://docs.langchain.com/oss/javascript/langgraph/add-memory

Demonstrates initializing a PostgresStore for production use and compiling a LangGraph with it. Requires the `@langchain/langgraph-checkpoint-postgres` package.

```typescript
import { PostgresStore } from "@langchain/langgraph-checkpoint-postgres/store";

const DB_URI = "postgresql://postgres:postgres@localhost:5442/postgres?sslmode=disable";
const store = PostgresStore.fromConnString(DB_URI);

const builder = new StateGraph(...);
const graph = builder.compile({ store });
```

---

### PIIMatch Interface and Custom Detector Signature

Source: https://docs.langchain.com/oss/javascript/langchain/middleware/built-in

Defines the structure for PII matches returned by custom detector functions. The `PIIMatch` interface specifies the matched text and its start and end indices within the content. An example `detector` function illustrates how to return these matches.

```typescript
interface PIIMatch {
  text: string; // The matched text
  start: number; // Start index in content
  end: number; // End index in content
}

function detector(content: string): PIIMatch[] {
  return [
    { text: "matched_text", start: 0, end: 12 },
    // ... more matches
  ];
}
```

---

### Installation

Source: https://docs.langchain.com/oss/javascript/integrations/chat/bedrock

Install the necessary LangChain community package and AWS SDK dependencies for Node.js environments. For web environments, omit the credential provider.

````APIDOC
## Installation

The LangChain `BedrockChat` integration lives in the `@langchain/community` package. You'll also need to install several official AWS packages as peer dependencies:

### Node.js Environment

```bash
npm install @langchain/community @langchain/core @aws-crypto/sha256-js @aws-sdk/credential-provider-node @smithy/protocol-http @smithy/signature-v4 @smithy/eventstream-codec @smithy/util-utf8 @aws-sdk/types
````

```bash
yarn add @langchain/community @langchain/core @aws-crypto/sha256-js @aws-sdk/credential-provider-node @smithy/protocol-http @smithy/signature-v4 @smithy/eventstream-codec @smithy/util-utf8 @aws-sdk/types
```

```bash
pnpm add @langchain/community @langchain/core @aws-crypto/sha256-js @aws-sdk/credential-provider-node @smithy/protocol-http @smithy/signature-v4 @smithy/eventstream-codec @smithy/util-utf8 @aws-sdk/types
```

### Web Environments (Edge Functions, Cloudflare Workers)

Omit the `@aws-sdk/credential-provider-node` dependency and use the web entrypoint:

```bash
npm install @langchain/community @langchain/core @aws-crypto/sha256-js @smithy/protocol-http @smithy/signature-v4 @smithy/eventstream-codec @smithy/util-utf8 @aws-sdk/types
```

```bash
yarn add @langchain/community @langchain/core @aws-crypto/sha256-js @smithy/protocol-http @smithy/signature-v4 @smithy/eventstream-codec @smithy/util-utf8 @aws-sdk/types
```

```bash
pnpm add @langchain/community @langchain/core @aws-crypto/sha256-js @smithy/protocol-http @smithy/signature-v4 @smithy/eventstream-codec @smithy/util-utf8 @aws-sdk/types
```

````

--------------------------------

### Install Neon Postgres Driver (Bash)

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/neon

Installs the `@neondatabase/serverless` package, which is a JavaScript/TypeScript driver for connecting to the Neon database.

```bash
npm install @neondatabase/serverless
````

---

### Install Composio Packages

Source: https://docs.langchain.com/oss/javascript/integrations/tools/composio

Commands to install the required Composio core and LangChain integration packages using popular package managers.

```bash
npm install @composio/langchain @composio/core
```

```bash
yarn add @composio/langchain @composio/core
```

```bash
pnpm add @composio/langchain @composio/core
```

---

### Install Prisma and LangChain Dependencies

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/prisma

Commands to install the necessary Prisma and LangChain packages required for vector store integration.

```bash
npm install prisma
npm install @langchain/openai @langchain/community @langchain/core
```

---

### Configure Advanced OpenAI Moderation with Custom Violation Messages in TypeScript

Source: https://docs.langchain.com/oss/javascript/integrations/providers/openai

This example showcases advanced content moderation setup using `openAIModerationMiddleware`. It includes checking tool results, enforcing a strict 'error' exit behavior, and customizing the violation message with template variables for categories and original content.

```typescript
import { createAgent, openAIModerationMiddleware } from "langchain";

const agentStrict = createAgent({
  model: "openai:gpt-4.1",
  tools: [searchTool, customerDataTool],
  middleware: [
    openAIModerationMiddleware({
      model: "openai:gpt-4.1",
      moderationModel: "omni-moderation-latest",
      checkInput: true,
      checkOutput: true,
      checkToolResults: true,
      exitBehavior: "error",
      violationMessage:
        "Content policy violation detected: {categories}. " +
        "Please rephrase your request.",
    }),
  ],
});
```

---

### Create a Simple LangGraph Agent

Source: https://docs.langchain.com/oss/javascript/langgraph

Demonstrates how to create a basic 'hello world' agent using LangGraph. It defines a state schema, a mock LLM node, and a simple graph with start and end edges. The agent is then invoked with user input.

```typescript
import {
  StateSchema,
  MessagesValue,
  GraphNode,
  StateGraph,
  START,
  END,
} from "@langchain/langgraph";

const State = new StateSchema({
  messages: MessagesValue,
});

const mockLlm: GraphNode<typeof State> = (state) => {
  return { messages: [{ role: "ai", content: "hello world" }] };
};

const graph = new StateGraph(State)
  .addNode("mock_llm", mockLlm)
  .addEdge(START, "mock_llm")
  .addEdge("mock_llm", END)
  .compile();

await graph.invoke({ messages: [{ role: "user", content: "hi!" }] });
```

---

### Install Rockset Client for JavaScript

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/rockset

Installs the Rockset client package using yarn. This is a prerequisite for interacting with Rockset.

```bash
yarn add @rockset/client
```

---

### Create Deep Agent with System Prompt and Tools (TypeScript)

Source: https://docs.langchain.com/oss/javascript/deepagents/quickstart

Demonstrates how to initialize a deep agent with a system prompt that defines its role and capabilities, and includes the 'internet_search' tool for information gathering. This sets up the agent for research tasks.

```typescript
import { createDeepAgent } from "deepagents";

// System prompt to steer the agent to be an expert researcher
const researchInstructions = `You are an expert researcher. Your job is to conduct thorough research and then write a polished report.

You have access to an internet search tool as your primary means of gathering information.

## \`internet_search\`

Use this to run an internet search for a given query. You can specify the max number of results to return, the topic, and whether raw content should be included.
`;

const agent = createDeepAgent({
  model: "anthropic:claude-sonnet-4-6",
  tools: [internetSearch],
  systemPrompt: researchInstructions,
});
```

```typescript
const agent = createDeepAgent({
  model: "openai:gpt-5.4",
  tools: [internetSearch],
  systemPrompt: researchInstructions,
});
```

```typescript
const agent = createDeepAgent({
  model: "google-genai:gemini-3.1-pro-preview",
  tools: [internetSearch],
  systemPrompt: researchInstructions,
});
```

```typescript
const agent = createDeepAgent({
  model: "openrouter:anthropic/claude-sonnet-4-6",
  tools: [internetSearch],
  systemPrompt: researchInstructions,
});
```

```typescript
const agent = createDeepAgent({
  model: "fireworks:accounts/fireworks/models/qwen3p5-397b-a17b",
  tools: [internetSearch],
  systemPrompt: researchInstructions,
});
```

```typescript
const agent = createDeepAgent({
  model: "ollama:devstral-2",
  tools: [internetSearch],
  systemPrompt: researchInstructions,
});
```

---

### Install Langchain with pnpm

Source: https://docs.langchain.com/oss/javascript/langchain/multi-agent/skills-sql-assistant

Installs the langchain package using pnpm. This is another package manager option for installing Langchain.

```bash
pnpm add langchain
```

---

### Video Input Examples

Source: https://docs.langchain.com/oss/javascript/langchain/messages

Provides examples for constructing messages with video data from base64 encoding or file IDs.

````APIDOC
## Video Input

### Description
Examples of creating `HumanMessage` objects with video data from different sources.

### Method
N/A (Code examples for message construction)

### Endpoint
N/A

### Parameters
N/A

### Request Example
```typescript
// From base64 data
const messageBase64 = new HumanMessage({
  content: [
    { type: "text", text: "Describe the content of this video." },
    {
      type: "video",
      source_type: "base64",
      data: "AAAAIGZ0eXBtcDQyAAAAAGlzb21tcDQyAAACAGlzb2...",
    },
  ],
});

// From provider-managed File ID
const messageId = new HumanMessage({
  content: [
    { type: "text", text: "Describe the content of this video." },
    { type: "video", source_type: "id", id: "file-abc123" },
  ],
});
````

### Response

N/A

````

--------------------------------

### Streaming with Entrypoints

Source: https://docs.langchain.com/oss/javascript/langgraph/use-functional-api

Illustrates how to stream both updates and custom data from an entrypoint, providing real-time feedback during execution.

```APIDOC
## POST /entrypoints/stream

### Description
Streams output from an entrypoint, supporting both standard updates and custom messages.

### Method
POST

### Endpoint
/entrypoints/stream

### Parameters
#### Query Parameters
- **streamMode** (array) - Optional - Specifies which streaming modes to use (e.g., `["custom", "updates"]`).

#### Request Body
- **name** (string) - Required - The name of the entrypoint to stream.
- **inputs** (object) - Optional - The input values for the entrypoint.
- **config** (object) - Required - Configuration for the stream, including `thread_id`.

### Request Example
```json
{
  "name": "main",
  "inputs": {"x": 5},
  "config": {"streamMode": ["custom", "updates"], "configurable": {"thread_id": "abc"}}
}
````

### Response

#### Success Response (200)

- **mode** (string) - The type of streamed data ('custom' or 'updates').
- **chunk** (any) - The streamed data chunk.

#### Response Example

```json
{
  "mode": "updates",
  "chunk": { "addOne": 2 }
}
```

````

--------------------------------

### Install Langchain with yarn

Source: https://docs.langchain.com/oss/javascript/langchain/multi-agent/skills-sql-assistant

Installs the langchain package using yarn. This is an alternative package manager for installing Langchain dependencies.

```bash
yarn add langchain
````

---

### Extended Agentic RAG for LangGraph Documentation in TypeScript

Source: https://docs.langchain.com/oss/javascript/langchain/retrieval

This extended example shows a more complex Agentic RAG implementation for querying LangGraph documentation. It includes a custom `fetchDocumentation` tool with URL validation and a detailed system prompt guiding the agent's behavior. The agent uses the tool to fetch and process documentation from allowed URLs before answering user questions.

```typescript
import { tool, createAgent, HumanMessage } from "langchain";
import * as z from "zod";

const ALLOWED_DOMAINS = ["https://langchain-ai.github.io/"];
const LLMS_TXT = "https://langchain-ai.github.io/langgraph/llms.txt";

const fetchDocumentation = tool(
  async (input) => {
    if (!ALLOWED_DOMAINS.some((domain) => input.url.startsWith(domain))) {
      return `Error: URL not allowed. Must start with one of: ${ALLOWED_DOMAINS.join(", ")}`;
    }
    const response = await fetch(input.url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.text();
  },
  {
    name: "fetch_documentation",
    description: "Fetch and convert documentation from a URL",
    schema: z.object({
      url: z.string().describe("The URL of the documentation to fetch"),
    }),
  },
);

const llmsTxtResponse = await fetch(LLMS_TXT);
const llmsTxtContent = await llmsTxtResponse.text();

const systemPrompt = `
  You are an expert TypeScript developer and technical assistant.
  Your primary role is to help users with questions about LangGraph and related tools.

  Instructions:

  1. If a user asks a question you're unsure about—or one that likely involves API usage,
     behavior, or configuration—you MUST use the 
\`fetch_documentation\` tool to consult the relevant docs.
  2. When citing documentation, summarize clearly and include relevant context from the content.
  3. Do not use any URLs outside of the allowed domain.
  4. If a documentation fetch fails, tell the user and proceed with your best expert understanding.

  You can access official documentation from the following approved sources:

  ${llmsTxtContent}

  You MUST consult the documentation to get up to date documentation
  before answering a user's question about LangGraph.

  Your answers should be clear, concise, and technically accurate.
  `;

const tools = [fetchDocumentation];

const agent = createAgent({
  model: "claude-sonnet-4-0",
  tools,
  systemPrompt,
  name: "Agentic RAG",
});

const response = await agent.invoke({
  messages: [
    new HumanMessage(
      "Write a short example of a langgraph agent using the " +
        "prebuilt create react agent. the agent should be able " +
        "to look up stock pricing information.",
    ),
  ],
});

console.log(response.messages.at(-1)?.content);
```

---

### Install Couchbase dependencies

Source: https://docs.langchain.com/oss/javascript/integrations/document_loaders/web_loaders/couchbase

Install the required LangChain community and Couchbase packages to enable database connectivity.

```bash
npm install @langchain/community @langchain/core couchbase
```

---

### Instantiate LocalFileStore

Source: https://docs.langchain.com/oss/javascript/integrations/stores/file_system

Demonstrates how to instantiate the LocalFileStore by providing a directory path. This store is compatible only with Node.js.

```typescript
import { LocalFileStore } from "@langchain/classic/storage/file_system";

const kvStore = await LocalFileStore.fromPath("./messages");
```

---

### Install FalkorDB and LangChain Dependencies

Source: https://docs.langchain.com/oss/javascript/integrations/tools/falkordb

Commands to install the necessary packages for using FalkorDB with LangChain and OpenAI.

```bash
npm install @falkordb/langchain-ts falkordb
npm install langchain @langchain/openai
```

---

### AzionVectorStore Initialization

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/azion-edgesql

Methods for instantiating the AzionVectorStore, including optional database and table setup.

```APIDOC
## POST /AzionVectorStore/initialize

### Description
Initializes the AzionVectorStore instance. It supports direct instantiation if the database exists or automatic setup via the initialize static method.

### Method
POST

### Parameters
#### Request Body
- **embeddings** (Object) - Required - The embedding model instance (e.g., OpenAIEmbeddings).
- **config** (Object) - Required - Configuration object containing dbName and tableName.
- **setupOptions** (Object) - Optional - Options for database setup including columns and mode (e.g., "hybrid").

### Request Example
{
  "dbName": "langchain",
  "tableName": "documents",
  "mode": "hybrid"
}

### Response
#### Success Response (200)
- **instance** (AzionVectorStore) - Returns an initialized AzionVectorStore object.

#### Response Example
{
  "status": "success",
  "message": "AzionVectorStore initialized successfully"
}
```

---

### Building a Multi-Agent System with Sales and Support Handoffs

Source: https://docs.langchain.com/oss/javascript/langchain/multi-agent/handoffs

A complete example showing how to define a multi-agent state and configure agents with bidirectional handoff tools to transfer conversations between sales and support.

```typescript
import {
  StateGraph,
  START,
  END,
  StateSchema,
  MessagesValue,
  Command,
  ConditionalEdgeRouter,
  GraphNode,
} from "@langchain/langgraph";
import { createAgent, AIMessage, ToolMessage } from "langchain";
import { tool, ToolRuntime } from "@langchain/core/tools";
import { z } from "zod/v4";

const MultiAgentState = new StateSchema({
  messages: MessagesValue,
  activeAgent: z.string().optional(),
});

const transferToSales = tool(
  async (_, runtime: ToolRuntime<typeof MultiAgentState.State>) => {
    const lastAiMessage = [...runtime.state.messages]
      .reverse()
      .find(AIMessage.isInstance);
    const transferMessage = new ToolMessage({
      content: "Transferred to sales agent from support agent",
      tool_call_id: runtime.toolCallId,
    });
    return new Command({
      goto: "sales_agent",
      update: {
        activeAgent: "sales_agent",
        messages: [lastAiMessage, transferMessage].filter(Boolean),
      },
      graph: Command.PARENT,
    });
  },
  {
    name: "transfer_to_sales",
    description: "Transfer to the sales agent.",
    schema: z.object({}),
  },
);

const transferToSupport = tool(
  async (_, runtime: ToolRuntime<typeof MultiAgentState.State>) => {
    const lastAiMessage = [...runtime.state.messages]
      .reverse()
      .find(AIMessage.isInstance);
    const transferMessage = new ToolMessage({
      content: "Transferred to support agent from sales agent",
      tool_call_id: runtime.toolCallId,
    });
    return new Command({
      goto: "support_agent",
      update: {
        activeAgent: "support_agent",
        messages: [lastAiMessage, transferMessage].filter(Boolean),
      },
      graph: Command.PARENT,
    });
  },
  {
    name: "transfer_to_support",
    description: "Transfer to the support agent.",
    schema: z.object({}),
  },
);

const salesAgent = createAgent({
  model: "anthropic:claude-sonnet-4-20250514",
  tools: [transferToSupport],
  systemPrompt:
    "You are a sales agent. Help with sales inquiries. If asked about technical issues or support, transfer to the support agent.",
});

const supportAgent = createAgent({
  model: "anthropic:claude-sonnet-4-20250514",
  tools: [transferToSales],
  systemPrompt:
    "You are a support agent. Help with technical issues. If asked about sales, transfer to the sales agent.",
});
```

---

### Install Exa Retriever Package

Source: https://docs.langchain.com/oss/javascript/integrations/retrievers/exa

Installs the necessary @langchain/exa and @langchain/core packages using common package managers.

```bash
npm install @langchain/exa @langchain/core
```

```bash
yarn add @langchain/exa @langchain/core
```

```bash
pnpm add @langchain/exa @langchain/core
```

---

### Install and List Community Skills

Source: https://docs.langchain.com/oss/javascript/deepagents/cli

Commands to install community-provided skills using the Vercel Skills CLI and list available skills in the environment.

```bash
# Install a skill globally
npx skills add vercel-labs/agent-skills --skill web-design-guidelines -a deepagents -g -y

# List installed skills
npx skills ls -a deepagents -g
```

---

### Install ChatMistralAI Dependencies

Source: https://docs.langchain.com/oss/javascript/integrations/chat/mistral

Commands to install the @langchain/mistralai and @langchain/core packages using various package managers.

```npm
npm install @langchain/mistralai @langchain/core
```

```yarn
yarn add @langchain/mistralai @langchain/core
```

```pnpm
pnpm add @langchain/mistralai @langchain/core
```

---

### Install AnalyticDB Dependencies

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/analyticdb

Install the necessary PostgreSQL and LangChain packages required to use the AnalyticDB vector store.

```bash
npm install -S pg
npm install -S pg-copy-streams
npm install @langchain/openai @langchain/community @langchain/core
```

---

### JSON Schema Example

Source: https://docs.langchain.com/oss/javascript/langchain/structured-output

Example of using the `toolStrategy` with a JSON schema for defining the structured output.

````APIDOC
## JSON Schema Example

```ts
import { createAgent, toolStrategy } from "langchain";

const productReviewSchema = {
    "type": "object",
    "description": "Analysis of a product review.",
    "properties": {
        "rating": {
            "type": ["integer", "null"],
            "description": "The rating of the product (1-5)",
            "minimum": 1,
            "maximum": 5
        },
        "sentiment": {
            "type": "string",
            "enum": ["positive", "negative"],
            "description": "The sentiment of the review"
        },
        "key_points": {
            "type": "array",
            "items": {"type": "string"},
            "description": "The key points of the review"
        }
    },
    "required": ["sentiment", "key_points"]
};

const agent = createAgent({
    model: "gpt-5",
    tools: [],
    responseFormat: toolStrategy(productReviewSchema)
});

const result = await agent.invoke({
    messages: [{"role": "user", "content": "Analyze this review: 'Great product: 5 out of 5 stars. Fast shipping, but expensive'"}]
});

console.log(result.structuredResponse);
// { "rating": 5, "sentiment": "positive", "keyPoints": ["fast shipping", "expensive"] }
````

````

--------------------------------

### Customizing Metadata Tagger with Prompt and Zod Schema in TypeScript

Source: https://docs.langchain.com/oss/javascript/integrations/document_transformers/openai_metadata_tagger

This TypeScript code snippet shows how to create a custom metadata tagger using LangChain. It defines a Zod schema for the expected output, a custom prompt template to guide the LLM, and then uses `createMetadataTaggerFromZod` to initialize the tagger. The example demonstrates transforming a list of documents, extracting structured metadata based on the schema and prompt.

```typescript
import * as z from "zod";
import { createMetadataTaggerFromZod } from "@langchain/classic/document_transformers/openai_functions";
import { ChatOpenAI } from "@langchain/openai";
import { Document } from "@langchain/core/documents";
import { PromptTemplate } from "@langchain/core/prompts";

const taggingChainTemplate = `Extract the desired information from the following passage.
Anonymous critics are actually Roger Ebert.

Passage:
{input}
`;

const zodSchema = z.object({
  movie_title: z.string(),
  critic: z.string(),
  tone: z.enum(["positive", "negative"]),
  rating:
    z
      .optional(z.number())
      .describe("The number of stars the critic rated the movie"),
});

const metadataTagger = createMetadataTaggerFromZod(zodSchema, {
  llm: new ChatOpenAI({ model: "gpt-3.5-turbo" }),
  prompt: PromptTemplate.fromTemplate(taggingChainTemplate),
});

const documents = [
  new Document({
    pageContent:
      "Review of The Bee Movie\nBy Roger Ebert\nThis is the greatest movie ever made. 4 out of 5 stars.",
  }),
  new Document({
    pageContent:
      "Review of The Godfather\nBy Anonymous\n\nThis movie was super boring. 1 out of 5 stars.",
    metadata: { reliable: false },
  }),
];
const taggedDocuments = await metadataTagger.transformDocuments(documents);

console.log(taggedDocuments);

/*
  [
    Document {
      pageContent: 'Review of The Bee Movie\n' +
        'By Roger Ebert\n' +
        'This is the greatest movie ever made. 4 out of 5 stars.',
      metadata: {
        movie_title: 'The Bee Movie',
        critic: 'Roger Ebert',
        tone: 'positive',
        rating: 4
      }
    },
    Document {
      pageContent: 'Review of The Godfather\n' +
        'By Anonymous\n' +
        '\n' +
        'This movie was super boring. 1 out of 5 stars.',
      metadata: {
        movie_title: 'The Godfather',
        critic: 'Roger Ebert',
        tone: 'negative',
        rating: 1,
        reliable: false
      }
    }
  ]
*/

````

---

### Basic Agentic RAG Setup in TypeScript

Source: https://docs.langchain.com/oss/javascript/langchain/retrieval

This snippet demonstrates the fundamental setup for an agentic RAG system in TypeScript. It defines a tool for fetching URL content and initializes an agent with this tool and a specified model and system prompt. The agent can then decide to use the tool when external information is needed.

```typescript
import { tool, createAgent } from "langchain";

const fetchUrl = tool(
  (url: string) => {
    return `Fetched content from ${url}`;
  },
  { name: "fetch_url", description: "Fetch text content from a URL" },
);

const agent = createAgent({
  model: "claude-sonnet-4-0",
  tools: [fetchUrl],
  systemPrompt,
});
```

---

### Install and Import New Azure OpenAI Package

Source: https://docs.langchain.com/oss/javascript/integrations/chat/azure

Instructions for migrating from the deprecated `@langchain/azure-openai` package to the new `@langchain/openai` package. This involves uninstalling the old package and installing the new one using npm, yarn, or pnpm.

```bash
npm install @langchain/openai

```

```bash
yarn add @langchain/openai

```

```bash
pnpm add @langchain/openai

```

```bash
npm uninstall @langchain/azure-openai

```

---

### Instantiate FaissStore

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/faiss

Example of initializing a FaissStore instance with OpenAI embeddings.

```typescript
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { OpenAIEmbeddings } from "@langchain/openai";

const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-small",
});

const vectorStore = new FaissStore(embeddings, {});
```

---

### Install LangChain Community Package

Source: https://docs.langchain.com/oss/javascript/reference/integrations-javascript

Command to install the @langchain/community package using the pnpm package manager.

```shell
pnpm install @langchain/community
```

---

### Install and Use FireworksAI with LangChain.js

Source: https://docs.langchain.com/oss/javascript/integrations/chat

This snippet shows how to install the community package for FireworksAI integration with LangChain.js. It includes installation commands and a placeholder for environment variables.

```bash
npm i @langchain/community
```

```bash
yarn add @langchain/community
```

```bash
pnpm add @langchain/community
```

```bash
FIREWORKS_API_KEY=your-api-key
```

---

### Configure stdio MCP Servers (mcp-config.json)

Source: https://docs.langchain.com/oss/javascript/deepagents/cli/mcp-tools

Example configuration for stdio MCP servers. This JSON defines how to spawn and communicate with servers over stdin/stdout, including the command, arguments, and environment variables.

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/tmp"],
      "env": {}
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_TOKEN": "your-token" }
    }
  }
}
```

---

### Install VertexAI web dependencies

Source: https://docs.langchain.com/oss/javascript/integrations/llms/google_vertex_ai

Commands to install the necessary LangChain VertexAI packages specifically for web environments.

```bash
npm install @langchain/google-vertexai-web @langchain/core
```

```bash
yarn add @langchain/google-vertexai-web @langchain/core
```

```bash
pnpm add @langchain/google-vertexai-web @langchain/core
```

---

### IBM watsonx.ai Setup and Authentication

Source: https://docs.langchain.com/oss/javascript/integrations/chat/ibm

Instructions on how to set up authentication for IBM watsonx.ai using environment variables or direct parameter passing.

````APIDOC
## IBM watsonx.ai Setup

To access IBM watsonx.ai models you'll need to create an IBM watsonx.ai account, get an API key, and install the `@langchain/community` integration package.

### Credentials

Head to [IBM Cloud](https://cloud.ibm.com/login) to sign up to IBM watsonx.ai and generate an API key or provide any other authentication form as presented below.

#### IAM authentication

```bash
export WATSONX_AI_AUTH_TYPE=iam
export WATSONX_AI_APIKEY=<YOUR-APIKEY>
````

#### Bearer token authentication

```bash
export WATSONX_AI_AUTH_TYPE=bearertoken
export WATSONX_AI_BEARER_TOKEN=<YOUR-BEARER-TOKEN>
```

#### IBM watsonx.ai software authentication

```bash
export WATSONX_AI_AUTH_TYPE=cp4d
export WATSONX_AI_USERNAME=<YOUR_USERNAME>
export WATSONX_AI_PASSWORD=<YOUR_PASSWORD>
export WATSONX_AI_URL=<URL>
```

Once these are placed in your environmental variables and object is initialized authentication will proceed automatically.

Authentication can also be accomplished by passing these values as parameters to a new instance.

## IAM authentication

```typescript
import { WatsonxLLM } from "@langchain/community/llms/ibm";

const props = {
  version: "YYYY-MM-DD",
  serviceUrl: "<SERVICE_URL>",
  projectId: "<PROJECT_ID>",
  watsonxAIAuthType: "iam",
  watsonxAIApikey: "<YOUR-APIKEY>",
};
const instance = new WatsonxLLM(props);
```

````

--------------------------------

### Install LangChain Embedding Dependencies

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores

Common installation commands for embedding packages using npm, yarn, or pnpm.

```bash
npm i @langchain/openai
yarn add @langchain/openai
pnpm add @langchain/openai
````

---

### Basic Vector Search Example

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/couchbase_search

This example demonstrates how to load documents, split them into chunks, index them into Couchbase, and perform a basic similarity search to find relevant documents based on a query. It also shows how to retrieve similarity scores.

````APIDOC
## Basic vector search example

The following example showcases how to use couchbase vector search via the Search Service and perform similarity search. For this example, we are going to load the "state_of_the_union.txt" file via the TextLoader, chunk the text into 500 character chunks with no overlaps and index all these chunks into Couchbase.

After the data is indexed, we perform a simple query to find the top 4 chunks that are similar to the query "What did president say about Ketanji Brown Jackson". At the end, it also shows how to get similarity score.

### Method
POST

### Endpoint
/vector-search

### Parameters
#### Request Body
- **docs** (array) - Required - Array of documents to index.
- **embeddings** (object) - Required - Embeddings model to use.
- **couchbaseConfig** (object) - Required - Configuration for Couchbase Vector Store.

### Request Example
```typescript
import { OpenAIEmbeddings } from "@langchain/openai";
import { CouchbaseVectorStore } from "@langchain/community/vectorstores/couchbase";
import { Cluster } from "couchbase";
import { TextLoader } from "@langchain/classic/document_loaders/fs/text";
import { CharacterTextSplitter } from "@langchain/textsplitters";

const connectionString = process.env.COUCHBASE_DB_CONN_STR ?? "couchbase://localhost";
const databaseUsername = process.env.COUCHBASE_DB_USERNAME ?? "Administrator";
const databasePassword = process.env.COUCHBASE_DB_PASSWORD ?? "Password";

// Load documents from file
const loader = new TextLoader("./state_of_the_union.txt");
const rawDocuments = await loader.load();
const splitter = new CharacterTextSplitter({
  chunkSize: 500,
  chunkOverlap: 0,
});
const docs = await splitter.splitDocuments(rawDocuments);

const couchbaseClient = await Cluster.connect(connectionString, {
  username: databaseUsername,
  password: databasePassword,
  configProfile: "wanDevelopment",
});

// Open AI API Key is required to use OpenAIEmbeddings, some other embeddings may also be used
const embeddings = new OpenAIEmbeddings({
  apiKey: process.env.OPENAI_API_KEY,
});

const couchbaseConfig = {
  cluster: couchbaseClient,
  bucketName: "testing",
  scopeName: "_default",
  collectionName: "_default",
  indexName: "vector-index",
  textKey: "text",
  embeddingKey: "embedding",
};

const store = await CouchbaseVectorStore.fromDocuments(
  docs,
  embeddings,
  couchbaseConfig
);

const query = "What did president say about Ketanji Brown Jackson";

const resultsSimilaritySearch = await store.similaritySearch(query);
console.log("resulting documents: ", resultsSimilaritySearch[0]);

// Similarity Search With Score
const resultsSimilaritySearchWithScore = await store.similaritySearchWithScore(
  query,
  1
);
console.log("resulting documents: ", resultsSimilaritySearchWithScore[0][0]);
console.log("resulting scores: ", resultsSimilaritySearchWithScore[0][1]);

const result = await store.similaritySearch(query, 1, {
  fields: ["metadata.source"],
});
console.log(result[0]);
````

### Response

#### Success Response (200)

- **pageContent** (string) - The content of the document chunk.
- **metadata** (object) - Metadata associated with the document chunk.

#### Response Example

```json
{
  "pageContent": "...",
  "metadata": {
    "source": "state_of_the_union.txt"
  }
}
```

````

--------------------------------

### Install Google Cloud Storage Library

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/googlevertexai

Installs the Google Cloud Storage client library for Node.js, required for using Google Cloud Storage as a document store.

```bash
npm install @google-cloud/storage
````

---

### Install SQLToolkit Dependencies

Source: https://docs.langchain.com/oss/javascript/integrations/tools/sql

Installs the necessary LangChain packages and the TypeORM peer dependency required for SQLToolkit functionality.

```bash
npm install langchain @langchain/core typeorm
```

```bash
yarn add langchain @langchain/core typeorm
```

```bash
pnpm add langchain @langchain/core typeorm
```

---

### BedrockChat Setup and Credentials

Source: https://docs.langchain.com/oss/javascript/integrations/chat/bedrock

Instructions on setting up AWS credentials and LangSmith tracing for BedrockChat.

````APIDOC
## BedrockChat Setup

### Prerequisites
1. Create an AWS account.
2. Set up the Amazon Bedrock API service.
3. Obtain AWS access key ID and secret key.
4. Install the `@langchain/community` integration package.

### AWS Credentials
Refer to the [AWS Bedrock documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/getting-started.html) for detailed instructions on setting up your AWS account and credentials. Ensure model access is enabled for your account by following [these instructions](https://docs.aws.amazon.com/bedrock/latest/userguide/model-access.html).

### LangSmith Tracing (Optional)
To enable automated tracing of model calls with LangSmith, set the following environment variables:

```bash
# export LANGSMITH_TRACING="true"
# export LANGSMITH_API_KEY="your-api-key"
````

Uncomment and replace `"your-api-key"` with your actual LangSmith API key.

````

--------------------------------

### Initialize and Query SingleStoreVectorStore

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/singlestore

Demonstrates how to initialize the SingleStoreVectorStore with OpenAI embeddings, perform a similarity search, and properly close the connection pool.

```typescript
import { SingleStoreVectorStore } from "@langchain/community/vectorstores/singlestore";
import { OpenAIEmbeddings } from "@langchain/openai";

export const run = async () => {
  const vectorStore = await SingleStoreVectorStore.fromTexts(
    ["Hello world", "Bye bye", "hello nice world"],
    [{ id: 2 }, { id: 1 }, { id: 3 }],
    new OpenAIEmbeddings(),
    {
      connectionOptions: {
        host: process.env.SINGLESTORE_HOST,
        port: Number(process.env.SINGLESTORE_PORT),
        user: process.env.SINGLESTORE_USERNAME,
        password: process.env.SINGLESTORE_PASSWORD,
        database: process.env.SINGLESTORE_DATABASE,
      },
    }
  );

  const resultOne = await vectorStore.similaritySearch("hello world", 1);
  console.log(resultOne);
  await vectorStore.end();
};
````

---

### Install @langchain/cerebras Package

Source: https://docs.langchain.com/oss/javascript/integrations/chat/cerebras

Installs the ChatCerebras integration package and the core LangChain package using npm, yarn, or pnpm. Ensure you have Node.js and a package manager installed.

```bash
npm install @langchain/cerebras @langchain/core
```

```bash
yarn add @langchain/cerebras @langchain/core
```

```bash
pnpm add @langchain/cerebras @langchain/core
```

---

### Install WebPDFLoader Dependencies

Source: https://docs.langchain.com/oss/javascript/integrations/document_loaders/web_loaders/pdf

Installs the necessary packages including @langchain/community, @langchain/core, and pdf-parse using various package managers.

```npm
npm install @langchain/community @langchain/core pdf-parse
```

```yarn
yarn add @langchain/community @langchain/core pdf-parse
```

```pnpm
pnpm add @langchain/community @langchain/core pdf-parse
```

---

### Full Example: LangGraph with Postgres Store and Memory

Source: https://docs.langchain.com/oss/javascript/langgraph/add-memory

A comprehensive example demonstrating the use of PostgresStore and PostgresSaver for persistent memory in LangGraph. It includes setting up the store and checkpointer, defining a graph node that interacts with memory, and streaming responses.

```bash
npm install @langchain/langgraph-checkpoint-postgres
```

```typescript
import { ChatAnthropic } from "@langchain/anthropic";
import {
  StateGraph,
  StateSchema,
  MessagesValue,
  GraphNode,
  START,
} from "@langchain/langgraph";
import { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";
import { PostgresStore } from "@langchain/langgraph-checkpoint-postgres/store";
import { v4 as uuidv4 } from "uuid";

const State = new StateSchema({
  messages: MessagesValue,
});

const model = new ChatAnthropic({ model: "claude-haiku-5-20240307" });

const callModel: GraphNode<typeof State> = async (state, runtime) => {
  const userId = runtime.context?.userId;
  const namespace = ["memories", userId];
  const memories = await runtime.store?.search(namespace, {
    query: state.messages.at(-1)?.content,
  });
  const info = memories?.map((d) => d.value.data).join("\n") || "";
  const systemMsg = `You are a helpful assistant talking to the user. User info: ${info}`;

  // Store new memories if the user asks the model to remember
  const lastMessage = state.messages.at(-1);
  if (lastMessage?.content?.toLowerCase().includes("remember")) {
    const memory = "User name is Bob";
    await runtime.store?.put(namespace, uuidv4(), { data: memory });
  }

  const response = await model.invoke([
    { role: "system", content: systemMsg },
    ...state.messages,
  ]);
  return { messages: [response] };
};

const DB_URI =
  "postgresql://postgres:postgres@localhost:5442/postgres?sslmode=disable";

const store = PostgresStore.fromConnString(DB_URI);
const checkpointer = PostgresSaver.fromConnString(DB_URI);
// await store.setup();
// await checkpointer.setup();

const builder = new StateGraph(State)
  .addNode("call_model", callModel)
  .addEdge(START, "call_model");

const graph = builder.compile({
  checkpointer,
  store,
});

for await (const chunk of await graph.stream(
  { messages: [{ role: "user", content: "Hi! Remember: my name is Bob" }] },
  {
    configurable: { thread_id: "1" },
    context: { userId: "1" },
    streamMode: "values",
  },
)) {
  console.log(chunk.messages.at(-1)?.content);
}

for await (const chunk of await graph.stream(
  { messages: [{ role: "user", content: "what is my name?" }] },
  {
    configurable: { thread_id: "2" },
    context: { userId: "1" },
    streamMode: "values",
  },
)) {
  console.log(chunk.messages.at(-1)?.content);
}
```

---

### Install and Instantiate ChatGroq Model in TypeScript

Source: https://docs.langchain.com/oss/javascript/integrations/chat/index

Provides instructions for installing the Langchain Groq package using npm, yarn, or pnpm, and then instantiating the ChatGroq model in TypeScript. Requires setting the GROQ_API_KEY environment variable. The model is configured with a specific model name and temperature.

```bash
npm i @langchain/groq
```

```bash
yarn add @langchain/groq
```

```bash
pnpm add @langchain/groq
```

```typescript
import { ChatGroq } from "@langchain/groq";

const model = new ChatGroq({
  model: "llama-3.3-70b-versatile",
  temperature: 0,
});
```

---

### Teaching Project Conventions to Deep Agent

Source: https://docs.langchain.com/oss/javascript/deepagents/cli

Illustrates how to teach an agent specific project conventions, such as API naming standards and timestamp usage. The agent then applies these conventions automatically in future sessions.

```bash
uvx deepagents-cli --agent backend-dev
> Our API uses snake_case and includes created_at/updated_at timestamps
```

---

### Install and Use Google Vertex AI Embeddings in JavaScript

Source: https://docs.langchain.com/oss/javascript/integrations/embeddings

This snippet explains how to install the @langchain/google-vertexai package, configure GOOGLE_APPLICATION_CREDENTIALS, and instantiate VertexAIEmbeddings. It includes installation commands for npm, yarn, and pnpm.

```bash
npm i @langchain/google-vertexai

```

```bash
yarn add @langchain/google-vertexai

```

```bash
pnpm add @langchain/google-vertexai

```

```bash
GOOGLE_APPLICATION_CREDENTIALS=credentials.json

```

```typescript
import { VertexAIEmbeddings } from "@langchain/google-vertexai";

const embeddings = new VertexAIEmbeddings({
  model: "gemini-embedding-001",
});
```

---

### Install LangChain Dependencies

Source: https://docs.langchain.com/oss/javascript/integrations/document_loaders/file_loaders/directory

Commands to install the necessary langchain packages using various package managers.

```bash
npm install langchain @langchain/core
```

```bash
yarn add langchain @langchain/core
```

```bash
pnpm add langchain @langchain/core
```

---

### Workflow Streaming Example

Source: https://docs.langchain.com/oss/javascript/langgraph/workflows-agents

This example shows how to invoke a Langchain workflow and stream its output updates in real-time.

````APIDOC
## Workflow Streaming Example

### Description
This code demonstrates invoking a Langchain workflow with a specific input and then streaming the output updates as they become available. It iterates through the stream and logs each step.

### Method
N/A (Illustrative code)

### Endpoint
N/A

### Parameters
N/A

### Request Example
```javascript
// Assume 'workflow' is an initialized Langchain workflow object

// Invoke the workflow and get a stream of updates
const stream = await workflow.stream("Cats", {
  streamMode: "updates",
});

// Process the stream
for await (const step of stream) {
  console.log(step);
  console.log("\n");
}
````

### Response

#### Success Response (200)

- **step** (object) - Represents a step in the workflow's execution stream.

#### Response Example

```json
{
  "step": {
    "name": "llm_step_1",
    "output": "The cat sat on the mat."
  }
}
```

````

--------------------------------

### Install ChatXAI Integration Package

Source: https://docs.langchain.com/oss/javascript/integrations/chat/xai

Install the necessary LangChain packages for xAI integration using your preferred package manager.

```npm
npm install @langchain/xai @langchain/core
````

```yarn
yarn add @langchain/xai @langchain/core
```

```pnpm
pnpm add @langchain/xai @langchain/core
```

---

### ChatMinimax with Web Search Plugin

Source: https://docs.langchain.com/oss/javascript/integrations/chat/minimax

This example demonstrates how to initialize ChatMinimax and enable the web search plugin to answer questions that require external data.

````APIDOC
## ChatMinimax with Web Search Plugin

### Description
This example shows how to use the `ChatMinimax` model with the `web_search` plugin enabled. This allows the model to access external information, such as search engine results, to answer user queries more effectively.

### Method
N/A (This is a client-side SDK example)

### Endpoint
N/A

### Parameters
N/A

### Request Example
```typescript
import { ChatMinimax } from "@langchain/community/chat_models/minimax";
import { HumanMessage } from "@langchain/core/messages";

const model = new ChatMinimax({
  model: "abab5.5-chat",
  botSetting: [
    {
      bot_name: "MM Assistant",
      content: "MM Assistant is an AI Assistant developed by minimax.",
    },
  ],
}).withConfig({
  plugins: ["plugin_web_search"],
});

const result = await model.invoke([
  new HumanMessage({
    content: " What is the weather like in NewYork tomorrow?",
  }),
]);

console.log(result);
````

### Response

#### Success Response (200)

- **AIMessage** (object) - The response from the chat model, potentially including information retrieved via plugins.

#### Response Example

```json
{
  "content": "The weather in Shanghai tomorrow is expected to be hot. Please note that this is just a forecast and the actual weather conditions may vary.",
  "additional_kwargs": {},
  "name": undefined,
  "lc_serializable": true,
  "lc_kwargs": {
    "content": "The weather in Shanghai tomorrow is expected to be hot. Please note that this is just a forecast and the actual weather conditions may vary.",
    "additional_kwargs": {}
  },
  "lc_namespace": ["langchain", "schema"]
}
```

````

--------------------------------

### Install Deep Agents CLI

Source: https://docs.langchain.com/oss/javascript/deepagents/cli/overview

Provides various methods to install the Deep Agents CLI, including standard shell scripts, scripts with additional provider support, and installation via uv.

```bash
curl -LsSf https://raw.githubusercontent.com/langchain-ai/deepagents/refs/heads/main/libs/cli/scripts/install.sh | bash
````

```bash
DEEPAGENTS_EXTRAS="ollama,groq" curl -LsSf https://raw.githubusercontent.com/langchain-ai/deepagents/refs/heads/main/libs/cli/scripts/install.sh | bash
```

```bash
uv tool install 'deepagents-cli[ollama,groq]'
```

---

### Example .env File for API Keys

Source: https://docs.langchain.com/oss/javascript/langchain/test/integration-testing

An example of a .env file used to store sensitive API keys, ensuring they are not committed to version control.

```dotenv
OPENAI_API_KEY=sk-...
```

---

### Configure DeepAgents with StateBackend

Source: https://docs.langchain.com/oss/javascript/deepagents/skills

Demonstrates how to initialize a DeepAgent using the default StateBackend. It shows how to manually fetch skill content and pass it via the invoke method's files parameter.

```typescript
import { createDeepAgent, type FileData } from "deepagents";
import { MemorySaver } from "@langchain/langgraph";

const checkpointer = new MemorySaver();

function createFileData(content: string): FileData {
  const now = new Date().toISOString();
  return {
    content: content.split("\n"),
    created_at: now,
    modified_at: now,
  };
}

const skillsFiles: Record<string, FileData> = {};

const skillUrl =
  "https://raw.githubusercontent.com/langchain-ai/deepagentsjs/refs/heads/main/examples/skills/langgraph-docs/SKILL.md";
const response = await fetch(skillUrl);
const skillContent = await response.text();

skillsFiles["/skills/langgraph-docs/SKILL.md"] = createFileData(skillContent);

const agent = await createDeepAgent({
  checkpointer,
  skills: ["/skills/"],
});

const config = {
  configurable: {
    thread_id: `thread-${Date.now()}`,
  },
};

const result = await agent.invoke(
  {
    messages: [
      {
        role: "user",
        content: "what is langraph? Use the langgraph-docs skill if available.",
      },
    ],
    files: skillsFiles,
  },
  config,
);
```

---

### Implement TypeORM Vector Store

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/typeorm

TypeScript example demonstrating how to initialize the TypeORMVectorStore, create the database table, add documents, and perform a similarity search.

```typescript
import { DataSourceOptions } from "typeorm";
import { OpenAIEmbeddings } from "@langchain/openai";
import { TypeORMVectorStore } from "@langchain/community/vectorstores/typeorm";

export const run = async () => {
  const args = {
    postgresConnectionOptions: {
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "myuser",
      password: "ChangeMe",
      database: "api",
    } as DataSourceOptions,
  };

  const typeormVectorStore = await TypeORMVectorStore.fromDataSource(
    new OpenAIEmbeddings(),
    args,
  );

  await typeormVectorStore.ensureTableInDatabase();

  await typeormVectorStore.addDocuments([
    { pageContent: "what's this", metadata: { a: 2 } },
    { pageContent: "Cat drinks milk", metadata: { a: 1 } },
  ]);

  const results = await typeormVectorStore.similaritySearch("hello", 2);

  console.log(results);
};
```

---

### Install Core LangChain Package

Source: https://docs.langchain.com/oss/javascript/langchain/install

Installs the main LangChain package and core utilities. Requires Node.js 20+ for npm/yarn/pnpm, and Bun v1.0.0+ for bun.

```bash
npm install langchain @langchain/core
# Requires Node.js 20+
```

```bash
pnpm add langchain @langchain/core
# Requires Node.js 20+
```

```bash
yarn add langchain @langchain/core
# Requires Node.js 20+
```

```bash
bun add langchain @langchain/core
# Requires Bun v1.0.0+
```

---

### Start FalkorDB with Docker

Source: https://docs.langchain.com/oss/javascript/integrations/tools/falkordb

Command to run a local instance of FalkorDB using Docker.

```bash
docker run -p 6379:6379 -it --rm falkordb/falkordb:latest
```

---

### Install YouTube Loader dependencies

Source: https://docs.langchain.com/oss/javascript/integrations/document_loaders/web_loaders/youtube

Install the required LangChain community packages and the youtubei.js library to enable transcript extraction.

```bash
npm install @langchain/community @langchain/core youtubei.js
```

---

### VertexAI Embeddings Installation

Source: https://docs.langchain.com/oss/javascript/langchain/rag

Instructions for installing the Langchain.js package required for VertexAI embeddings.

````APIDOC
## Install VertexAI Integration

### Description
Install the necessary Langchain.js package for VertexAI integration using your preferred package manager.

### Method
Package Installation

### Endpoint
N/A

### Parameters
None

### Request Example
```bash
npm i @langchain/google-vertexai
````

### Response

#### Success Response (200)

- Installation successful.

#### Response Example

```
+ @langchain/google-vertexai@x.x.x
```

````

--------------------------------

### OpenUI-Lang Format Example

Source: https://docs.langchain.com/oss/javascript/langchain/frontend/integrations/openui

Illustrates the structure of the openui-lang format, which is a programmatic language for defining UI components. It uses assignments for statements, with `root` as the entry point. The example demonstrates defining a header, executive summary, KPI cards, tables, and charts, showcasing the concept of hoisting for immediate UI structure rendering.

```plaintext
root = Stack([header, execSummary, kpis, marketSection])

header    = CardHeader("State of AI in 2025", "Comprehensive Analysis")
execSummary = MarkDownRenderer("## Executive Summary\n\nThe AI market reached...")

kpi1 = Card([CardHeader("$826B", "Global Market"), TextContent("42% YoY", "small")], "sunk")
kpi2 = Card([CardHeader("78%",   "Adoption"),       TextContent("Fortune 500",  "small")], "sunk")
kpis = Stack([kpi1, kpi2], "row", "m", "stretch", "start", true)

col1 = Col("Segment", "string")
col2 = Col("Revenue ($B)", "number")
tbl  = Table([col1, col2], [["Generative AI", 286], ["ML Infra", 198]])
s1   = Series("Revenue", [286, 198, 147])
ch1  = BarChart(["Gen AI", "ML Infra", "Vision"], [s1])
marketSection = Card([CardHeader("Market Breakdown"), tbl, ch1])
````

---

### Install Gradient AI and LangChain dependencies

Source: https://docs.langchain.com/oss/javascript/integrations/llms/gradient_ai

Install the required Gradient AI Node SDK and the necessary LangChain community and core packages to enable LLM integration.

```bash
npm i @gradientai/nodejs-sdk
npm install @langchain/community @langchain/core
```

---

### Install LangGraph CLI

Source: https://docs.langchain.com/oss/javascript/langgraph/local-server

Installs the LangGraph CLI as a development dependency using npm.

```shell
npm install --save-dev @langchain/langgraph-cli
```

---

### Loading MCP Toolbox Tools

Source: https://docs.langchain.com/oss/javascript/integrations/tools/mcp_toolbox

This section explains how to initialize a ToolboxClient, load a toolset from a running MCP server, and wrap those tools for use within a LangChain agent.

```APIDOC
## GET /loadToolset

### Description
Fetches a collection of tools from a remote MCP Toolbox server instance to be used within a LangChain agent.

### Method
GET (via SDK client method)

### Endpoint
/loadToolset

### Parameters
#### Query Parameters
- **toolsetName** (string) - Required - The identifier of the toolset to load from the server.

### Request Example
client.loadToolset('my-database-tools')

### Response
#### Success Response (200)
- **tools** (Array) - A collection of tool objects compatible with LangChain.

#### Response Example
[
  {
    "name": "query_database",
    "description": "Executes a SQL query",
    "schema": { ... }
  }
]
```

---

### Daytona Sandbox Installation

Source: https://docs.langchain.com/oss/javascript/integrations/providers/daytona

Install the Daytona package using npm, yarn, or pnpm.

````APIDOC
## Daytona Sandbox Installation

Install the Daytona package using npm, yarn, or pnpm.

### npm
```bash
npm install @langchain/daytona
````

### yarn

```bash
yarn add @langchain/daytona
```

### pnpm

```bash
pnpm add @langchain/daytona
```

````

--------------------------------

### Set up User Authentication for Integrations (TypeScript)

Source: https://docs.langchain.com/oss/javascript/integrations/tools/composio

Guides on setting up authentication for users to connect their accounts with services like GitHub. It initializes Composio and then creates an authentication connection URL for a specified user and integration.

```typescript
import { Composio } from '@composio/core';

const composio = new Composio({
    apiKey: process.env.COMPOSIO_API_KEY
});

// Get authentication URL for a user
const authConnection = await composio.integrations.create({
    userId: 'user_123',
    integration: 'github'
});

console.log(`Authenticate at: ${authConnection.redirectUrl}`);

// After authentication, the user's connected account will be available
// and tools will work with their credentials
````

---

### Install Upstash and LangChain Packages

Source: https://docs.langchain.com/oss/javascript/integrations/callbacks/upstash_ratelimit_callback

Installs the necessary npm packages for Upstash rate limiting and LangChain integration.

```bash
npm install @upstash/ratelimit @langchain/community @langchain/core
```

---

### Install GOAT dependencies

Source: https://docs.langchain.com/oss/javascript/integrations/tools/goat

Commands to install the core GOAT packages, LangChain adapter, wallet providers, and specific financial plugins required for development.

```bash
npm i @goat-sdk/core @goat-sdk/adapter-langchain
npm i @goat-sdk/wallet-evm @goat-sdk/wallet-viem
npm i @goat-sdk/plugin-erc20
```

---

### Install DeepAgents with Anthropic

Source: https://docs.langchain.com/oss/javascript/deepagents/customization

Install the necessary packages for using DeepAgents with Anthropic models.

````APIDOC
## Install DeepAgents with Anthropic

### Description
Install the necessary packages for using DeepAgents with Anthropic models.

### Method
Package Manager Commands

### Parameters
None

### Request Example
```bash
npm install @langchain/anthropic deepagents
````

```bash
pnpm install @langchain/anthropic deepagents
```

```bash
yarn add @langchain/anthropic deepagents
```

```bash
bun add @langchain/anthropic deepagents
```

````

--------------------------------

### Install LangGraph SDK (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/deploy

Installs the LangGraph SDK for TypeScript. This is a prerequisite for interacting with the LangGraph API using TypeScript.

```shell
npm install @langchain/langgraph-sdk
````

---

### StateBackend Initialization for Deep Agent

Source: https://docs.langchain.com/oss/javascript/deepagents/customization

Demonstrates how to initialize a Deep Agent using the default StateBackend, which stores data ephemerally within a single thread. It also shows the explicit way to define the backend using a lambda function.

```python
from deepagents import create_deep_agent
from deepagents.backends import StateBackend

# By default we provide a StateBackend
agent = create_deep_agent()

# Under the hood, it looks like
agent = create_deep_agent(
    backend=(lambda rt: StateBackend(rt))   # Note that the tools access State through the runtime.state
)
```

---

### Install DeepAgents with OpenAI

Source: https://docs.langchain.com/oss/javascript/deepagents/customization

Install the necessary packages for using DeepAgents with OpenAI models.

````APIDOC
## Install DeepAgents with OpenAI

### Description
Install the necessary packages for using DeepAgents with OpenAI models.

### Method
Package Manager Commands

### Parameters
None

### Request Example
```bash
npm install @langchain/openai deepagents
````

```bash
pnpm install @langchain/openai deepagents
```

```bash
yarn add @langchain/openai deepagents
```

```bash
bun add @langchain/openai deepagents
```

````

--------------------------------

### Instantiate AzionVectorStore

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/azion-edgesql

Demonstrates how to import and initialize the AzionVectorStore using OpenAI embeddings, including options for database setup.

```typescript
import { AzionVectorStore } from "@langchain/community/vectorstores/azion_edgesql";
import { OpenAIEmbeddings } from "@langchain/openai";

const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-small",
});

const vectorStore = new AzionVectorStore(embeddings, { dbName: "langchain", tableName: "documents" });
````

---

### Initialize LibSQL database schema

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/libsql

SQL commands to create a table with a vector-compatible column and a corresponding index for similarity search.

```sql
CREATE TABLE IF NOT EXISTS TABLE_NAME (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT,
    metadata TEXT,
    EMBEDDING_COLUMN F32_BLOB(1536)
);
CREATE INDEX IF NOT EXISTS idx_TABLE_NAME_EMBEDDING_COLUMN ON TABLE_NAME(libsql_vector_idx(EMBEDDING_COLUMN));
```

---

### Install Redis and LangChain dependencies

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/redis

Commands to install the necessary packages for using Redis as a vector store with LangChain and OpenAI embeddings.

```bash
npm install @langchain/redis @langchain/core redis @langchain/openai
```

```bash
yarn add @langchain/redis @langchain/core redis @langchain/openai
```

```bash
pnpm add @langchain/redis @langchain/core redis @langchain/openai
```

---

### Example Output for Streaming Reasoning Tokens

Source: https://docs.langchain.com/oss/javascript/langchain/streaming

This is an example of the output produced when streaming reasoning tokens from an agent. It shows the intermediate thinking steps followed by the final answer.

```shell
[thinking] The user is asking about the weather in San Francisco. I have a tool
[thinking]  available to get this information. Let me call the get_weather tool
[thinking]  with "San Francisco" as the city parameter.
The weather in San Francisco is: It's always sunny in San Francisco!
```

---

### Install and Use Google Gemini Embeddings in JavaScript

Source: https://docs.langchain.com/oss/javascript/integrations/embeddings

This snippet covers the installation of the @langchain/google-genai package, setting the GOOGLE_API_KEY environment variable, and instantiating GoogleGenerativeAIEmbeddings. It provides installation commands for npm, yarn, and pnpm.

```bash
npm i @langchain/google-genai

```

```bash
yarn add @langchain/google-genai

```

```bash
pnpm add @langchain/google-genai

```

```bash
GOOGLE_API_KEY=your-api-key

```

```typescript
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

const embeddings = new GoogleGenerativeAIEmbeddings({
  model: "text-embedding-004",
});
```

---

### Install Qdrant and Core Dependencies (npm)

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/qdrant

Installs the QdrantVectorStore, LangChain core, and OpenAI embeddings packages using npm. This is a prerequisite for using Qdrant with LangChain JavaScript.

```bash
npm install @langchain/qdrant @langchain/core @langchain/openai
```

---

### Install OpenSearch Dependencies for LangChain.js

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/opensearch

Installs the necessary LangChain and OpenSearch packages for Node.js integration. Ensure you have an OpenSearch instance running.

```bash
npm install -S @langchain/openai @langchain/core @opensearch-project/opensearch
```

---

### Install Google Gemini Packages with npm, pnpm, yarn, bun

Source: https://docs.langchain.com/oss/javascript/deepagents/customization

Installs the necessary Langchain and deepagents packages for Google Gemini integration using various package managers.

```bash
npm install @langchain/google-genai deepagents
```

```bash
pnpm install @langchain/google-genai deepagents
```

```bash
yarn add @langchain/google-genai deepagents
```

```bash
bun add @langchain/google-genai deepagents
```

---

### Install LangChain dependencies

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/memory

Commands to install the necessary packages for using MemoryVectorStore and OpenAI embeddings via different package managers.

```bash
npm install langchain @langchain/openai @langchain/core
```

```bash
yarn add langchain @langchain/openai @langchain/core
```

```bash
pnpm add langchain @langchain/openai @langchain/core
```

---

### Install LangChain Community Integration Packages

Source: https://docs.langchain.com/oss/javascript/integrations/chat/fireworks

Installs the required @langchain/community and @langchain/core packages using npm, yarn, or pnpm.

```npm
npm install @langchain/community @langchain/core
```

```yarn
yarn add @langchain/community @langchain/core
```

```pnpm
pnpm add @langchain/community @langchain/core
```

---

### Configure Human-in-the-Loop with Python

Source: https://docs.langchain.com/oss/javascript/deepagents/human-in-the-loop

Demonstrates how to define tools, initialize a MemorySaver checkpointer, and configure interrupt_on settings for specific tools in a Deep Agent.

```python
from langchain.tools import tool
from deepagents import create_deep_agent
from langgraph.checkpoint.memory import MemorySaver

@tool
def delete_file(path: str) -> str:
    """Delete a file from the filesystem."""
    return f"Deleted {path}"

@tool
def read_file(path: str) -> str:
    """Read a file from the filesystem."""
    return f"Contents of {path}"

@tool
def send_email(to: str, subject: str, body: str) -> str:
    """Send an email."""
    return f"Sent email to {to}"

checkpointer = MemorySaver()

agent = create_deep_agent(
    model="claude-sonnet-4-6",
    tools=[delete_file, read_file, send_email],
    interrupt_on={
        "delete_file": True,
        "read_file": False,
        "send_email": {"allowed_decisions": ["approve", "reject"]},
    },
    checkpointer=checkpointer
)
```

---

### Install LangChain Google Vertex AI Packages

Source: https://docs.langchain.com/oss/javascript/integrations/chat/google_vertex_ai

Install the necessary LangChain packages for Google Vertex AI integration. Use npm, yarn, or pnpm. For web environments, install the -web variant.

```bash
npm install @langchain/google-vertexai @langchain/core
```

```bash
yarn add @langchain/google-vertexai @langchain/core
```

```bash
pnpm add @langchain/google-vertexai @langchain/core
```

```bash
npm install @langchain/google-vertexai-web @langchain/core
```

```bash
yarn add @langchain/google-vertexai-web @langchain/core
```

```bash
pnpm add @langchain/google-vertexai-web @langchain/core
```

---

### Install USearch and LangChain dependencies

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/usearch

Commands to install the necessary USearch package and required LangChain community and OpenAI packages for Node.js.

```bash
npm install -S usearch
npm install @langchain/openai @langchain/community @langchain/core
```

---

### Multi-Source Knowledge Router Example

Source: https://docs.langchain.com/oss/javascript/langchain/multi-agent/router-knowledge-base

This example demonstrates the router pattern for multi-agent systems. A router classifies queries, routes them to specialized agents in parallel, and synthesizes results into a combined response.

```APIDOC
## Complete Working Example

This example demonstrates the router pattern for multi-agent systems. A router classifies queries, routes them to specialized agents in parallel, and synthesizes results into a combined response.

### Tools

- **search_code**: Search code in GitHub repositories.
- **search_issues**: Search GitHub issues and pull requests.
- **search_prs**: Search pull requests for implementation details.
- **search_notion**: Search Notion workspace for documentation.
- **get_page**: Get a specific Notion page by ID.
- **search_slack**: Search Slack messages and threads.
- **get_thread**: Get a specific Slack thread.

### Agents

- **githubAgent**: A GitHub expert agent for searching code, issues, and pull requests.
- **notionAgent**: A Notion expert agent for searching documentation and internal processes.
- **slackAgent**: A Slack expert agent for searching discussions and threads.

### Router State Schema

- **query** (string): The user's query.
- **classifications** (array): List of agents to invoke with their targeted sub-questions.
  - **source** (enum: "github", "notion", "slack"): The source/agent to route to.
  - **query** (string): The sub-question for the targeted agent.
- **results** (array): Reduced value of agent outputs, concatenated.
  - **source** (string): The source of the result.
  - **result** (string): The result from the agent.
- **finalAnswer** (string): The final synthesized answer.

### Classifier Function (`classifyQuery`)

This asynchronous function takes the router state and classifies the user's query to determine which agents to invoke and with what sub-questions. It uses a language model to parse the query and map it to the `ClassificationResultSchema`.
```

---

### Install Neo4j and LangChain dependencies

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/neo4jvector

Commands to install the necessary Neo4j driver and LangChain community packages required for vector store integration.

```bash
npm install neo4j-driver
npm install @langchain/openai @langchain/community @langchain/core
```

---

### Inject User Writing Style from Store using Langchain Middleware

Source: https://docs.langchain.com/oss/javascript/langchain/context-engineering

This middleware injects a user's writing style, retrieved from a 'Store', to guide the LLM in drafting content. It defines a context schema for user identification and retrieves writing style examples (tone, greeting, sign-off) associated with the user ID. This helps personalize the LLM's output to match the user's preferred communication style.

```typescript
import * as z from "zod";
import { createMiddleware } from "langchain";

const contextSchema = z.object({
  userId: z.string(),
});

const injectWritingStyle = createMiddleware({
  name: "InjectWritingStyle",
  contextSchema,
  wrapModelCall: async (request, handler) => {
    const userId = request.runtime.context.userId;

    // Read from Store: get user's writing style examples
    const store = request.runtime.store;
    const writingStyle = await store.get(["writing_style"], userId);

    if (writingStyle) {
      const style = writingStyle.value;
      // Build style guide from stored examples
      const styleContext = `Your writing style:
    - Tone: ${style.tone || "professional"}
    - Typical greeting: "${style.greeting || "Hi"}"
    - Typical sign-off: "${style.signOff || "Best"}"
    - Example email you've written:
    ${style.exampleEmail || ""}`;

      // Append at end - models pay more attention to final messages
      const messages = [
        ...request.messages,
        { role: "user", content: styleContext },
      ];
      request = request.override({ messages });
    }

    return handler(request);
  },
});
```

---

### Create and Run LangChain.js Agent

Source: https://docs.langchain.com/oss/javascript/langchain/quickstart

This snippet shows the core process of creating an agent with a model, system prompt, tools, response format, and checkpointer. It then demonstrates invoking the agent with a user message and a configuration object containing a thread ID and user context. The example also illustrates continuing a conversation with the same thread ID.

```typescript
import { createAgent } from "langchain";

const agent = createAgent({
  model: "claude-sonnet-4-6",
  systemPrompt: systemPrompt,
  tools: [getUserLocation, getWeather],
  responseFormat,
  checkpointer,
});

// `thread_id` is a unique identifier for a given conversation.
const config = {
  configurable: { thread_id: "1" },
  context: { user_id: "1" },
};

const response = await agent.invoke(
  { messages: [{ role: "user", content: "what is the weather outside?" }] },
  config,
);
console.log(response.structuredResponse);
// {
//   punny_response: "Florida is still having a 'sun-derful' day ...",
//   weather_conditions: "It's always sunny in Florida!"
// }

// Note that we can continue the conversation using the same `thread_id`.
const thankYouResponse = await agent.invoke(
  { messages: [{ role: "user", content: "thank you!" }] },
  config,
);
console.log(thankYouResponse.structuredResponse);
// {
//   punny_response: "You're 'thund-erfully' welcome! ...",
//   weather_conditions: undefined
// }
```

---

### Install and Initialize Cohere Embeddings

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores

Install the Cohere package and initialize the embedding model. Requires COHERE_API_KEY to be set in the environment.

```bash
npm i @langchain/cohere
yarn add @langchain/cohere
pnpm add @langchain/cohere
```

```typescript
import { CohereEmbeddings } from "@langchain/cohere";

const embeddings = new CohereEmbeddings({
  model: "embed-english-v3.0",
});
```

---

### Install Required Dependencies

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/typeorm

Commands to install TypeORM, PostgreSQL driver, and LangChain community packages required for vector store integration.

```bash
npm install typeorm
npm install pg
npm install @langchain/openai @langchain/community @langchain/core
```

---

### Create a basic LangGraph stateful agent

Source: https://docs.langchain.com/oss/javascript/langgraph/overview

A minimal example demonstrating how to define a state schema, create a graph node, and compile a workflow that processes a simple message input.

```typescript
import {
  StateSchema,
  MessagesValue,
  GraphNode,
  StateGraph,
  START,
  END,
} from "@langchain/langgraph";

const State = new StateSchema({
  messages: MessagesValue,
});

const mockLlm: GraphNode<typeof State> = (state) => {
  return { messages: [{ role: "ai", content: "hello world" }] };
};

const graph = new StateGraph(State)
  .addNode("mock_llm", mockLlm)
  .addEdge(START, "mock_llm")
  .addEdge("mock_llm", END)
  .compile();

await graph.invoke({ messages: [{ role: "user", content: "hi!" }] });
```

---

### Install Mixedbread AI Package

Source: https://docs.langchain.com/oss/javascript/integrations/embeddings/mixedbread_ai

Installs the necessary LangChain JavaScript packages for Mixedbread AI integration, including the core package and the Mixedbread AI specific package. It also installs the core LangChain package.

```bash
npm install @langchain/mixedbread-ai @langchain/core
```

---

### Install deepagents Package

Source: https://docs.langchain.com/oss/javascript/reference/deepagents-javascript

Instructions for installing the deepagents package using npm, yarn, or pnpm.

```bash
# npm
npm install deepagents

# yarn
yarn add deepagents

# pnpm
pnpm add deepagents
```

---

### Install LlamaCpp and LangChain dependencies

Source: https://docs.langchain.com/oss/javascript/integrations/embeddings/llama_cpp

Commands to install the required node-llama-cpp bindings and LangChain community packages for local model execution.

```bash
npm install -S node-llama-cpp@3
npm install @langchain/community @langchain/core
```

---

### Install Weaviate Integration Packages (pnpm)

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/weaviate

Installs the necessary LangChain Weaviate integration package, core components, Weaviate client, UUID package, and OpenAI embeddings package using pnpm.

```bash
pnpm add @langchain/weaviate @langchain/core weaviate-client uuid @langchain/openai
```

---

### Install AWS SDK for Step Functions

Source: https://docs.langchain.com/oss/javascript/integrations/tools/sfn_agent

Installs the necessary Node.js AWS SDK for interacting with AWS Step Functions. This is a prerequisite for using the AWSSfnToolkit.

```bash
npm install @aws-sdk/client-sfn
```

---

### Install Vercel KV dependencies

Source: https://docs.langchain.com/oss/javascript/integrations/stores/vercel_kv_storage

Command to install the necessary LangChain community and Vercel KV packages via npm.

```bash
npm install @langchain/community @langchain/core @vercel/kv
```

---

### Install Weaviate Integration Packages (npm)

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/weaviate

Installs the necessary LangChain Weaviate integration package, core components, Weaviate client, UUID package, and OpenAI embeddings package using npm.

```bash
npm install @langchain/weaviate @langchain/core weaviate-client uuid @langchain/openai
```

---

### Install Vitest dependency

Source: https://docs.langchain.com/oss/javascript/langgraph/test

Installs the Vitest testing framework as a development dependency for your LangGraph project.

```bash
npm install -D vitest
```

---

### Install AzionRetriever Dependencies

Source: https://docs.langchain.com/oss/javascript/integrations/retrievers/azion-edgesql

Installs the necessary packages to use AzionRetriever with OpenAI embeddings via npm, yarn, or pnpm.

```bash
npm install azion @langchain/openai @langchain/community
```

```bash
yarn add azion @langchain/openai @langchain/community
```

```bash
pnpm add azion @langchain/openai @langchain/community
```

---

### Initialize Vector Store and Retriever Tool

Source: https://docs.langchain.com/oss/javascript/langgraph/agentic-rag

Demonstrates how to create an in-memory vector store from document splits using OpenAI embeddings and wrap it into a LangChain retriever tool.

```typescript
import { MemoryVectorStore } from "@langchain/classic/vectorstores/memory";
import { OpenAIEmbeddings } from "@langchain/openai";
import { createRetrieverTool } from "@langchain/classic/tools/retriever";

const vectorStore = await MemoryVectorStore.fromDocuments(
  docSplits,
  new OpenAIEmbeddings(),
);
const retriever = vectorStore.asRetriever();

const tool = createRetrieverTool(retriever, {
  name: "retrieve_blog_posts",
  description:
    "Search and return information about Lilian Weng blog posts on LLM agents, prompt engineering, and adversarial attacks on LLMs.",
});
const tools = [tool];
```

---

### Install OpenAI LangChain packages

Source: https://docs.langchain.com/oss/javascript/integrations/providers/openai

Installs the necessary OpenAI and core LangChain packages required for integration. This command should be run in your project terminal.

```bash
npm install @langchain/openai @langchain/core
```

---

### Install Deep Agent Backend Dependencies

Source: https://docs.langchain.com/oss/javascript/deepagents/data-analysis

Commands to install necessary Python packages for various sandbox providers using pip or uv.

```bash
pip install langchain-agentcore-codeinterpreter
pip install langchain-daytona
pip install langchain-runloop
```

```bash
uv add langchain-agentcore-codeinterpreter
uv add langchain-daytona
uv add langchain-runloop
```

---

### Install Nia Toolkit dependencies

Source: https://docs.langchain.com/oss/javascript/integrations/tools/nia

Commands to install the required Nia Toolkit and LangChain core packages using npm, yarn, or pnpm.

```bash
npm install @nozomioai/langchain-nia @langchain/core
```

```bash
yarn add @nozomioai/langchain-nia @langchain/core
```

```bash
pnpm add @nozomioai/langchain-nia @langchain/core
```

---

### Image Input Examples

Source: https://docs.langchain.com/oss/javascript/langchain/messages

Demonstrates how to create messages with image data from various sources (URL, base64, file ID).

````APIDOC
## Image Input

### Description
Examples of creating `HumanMessage` objects with image data from different sources.

### Method
N/A (Code examples for message construction)

### Endpoint
N/A

### Parameters
N/A

### Request Example
```typescript
// From URL
const messageUrl = new HumanMessage({
  content: [
    { type: "text", text: "Describe the content of this image." },
    {
      type: "image",
      source_type: "url",
      url: "https://example.com/path/to/image.jpg"
    },
  ],
});

// From base64 data
const messageBase64 = new HumanMessage({
  content: [
    { type: "text", text: "Describe the content of this image." },
    {
      type: "image",
      source_type: "base64",
      data: "AAAAIGZ0eXBtcDQyAAAAAGlzb21tcDQyAAACAGlzb2...",
    },
  ],
});

// From provider-managed File ID
const messageId = new HumanMessage({
  content: [
    { type: "text", text: "Describe the content of this image." },
    { type: "image", source_type: "id", id: "file-abc123" },
  ],
});
````

### Response

N/A

````

--------------------------------

### Install LangChain Community Package

Source: https://docs.langchain.com/oss/javascript/integrations/embeddings/bytedance_doubao

Install the @langchain/community package using various package managers to access the ByteDanceDoubaoEmbeddings class.

```bash
npm install @langchain/community
````

```bash
yarn add @langchain/community
```

```bash
pnpm add @langchain/community
```

---

### Implementing Memory Storage Backends

Source: https://docs.langchain.com/oss/javascript/deepagents/long-term-memory

Shows how to set up memory storage using either an in-memory store for development or a persistent Postgres store for production environments.

```typescript
import { InMemoryStore } from "@langchain/langgraph-checkpoint";
import { PostgresStore } from "@langchain/langgraph-checkpoint-postgres";

// Development
const store = new InMemoryStore();

// Production
const pgStore = new PostgresStore({
  connectionString: process.env.DATABASE_URL,
});
```

---

### Install Milvus Node.js SDK

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/milvus

Installs the necessary Milvus Node.js SDK for integration with LangChain. This is a prerequisite for using Milvus with your JavaScript project.

```bash
npm install -S @zilliz/milvus2-sdk-node
```

---

### Pre-populating Sandbox with Initial Files

Source: https://docs.langchain.com/oss/javascript/integrations/providers/modal

Shows how to create a ModalSandbox and pre-populate it with specific files and their content during creation. This is useful for providing necessary scripts or configuration files to the sandbox environment before execution.

```typescript
const sandbox = await ModalSandbox.create({
  imageName: "python:3.12-slim",
  initialFiles: {
    "/app/main.py": 'print("Hello from Python!")',
    "/app/config.json": JSON.stringify({ name: "my-app" }, null, 2),
  },
});

const result = await sandbox.execute("python /app/main.py");
```

---

### Install ChatBaiduQianfan Package

Source: https://docs.langchain.com/oss/javascript/integrations/chat/baidu_qianfan

Install the necessary LangChain packages for integrating with ChatBaiduQianfan. This includes the specific model package and the core LangChain package.

```bash
npm install @langchain/baidu-qianfan @langchain/core
```

---

### Subagent Outputs Example

Source: https://docs.langchain.com/oss/javascript/langchain/multi-agent/subagents

Example showing how to customize the subagent's response to provide specific information back to the main agent.

````APIDOC
## Subagent outputs

Customize what the main agent receives back so it can make good decisions. Two strategies:

1. **Prompt the sub-agent**: Specify exactly what should be returned. A common failure mode is that the sub-agent performs tool calls or reasoning but doesn't include results in its final message—remind it that the supervisor only sees the final output.
2. **Format in code**: Adjust or enrich the response before returning it. For example, pass specific state keys back in addition to the final text using a [`Command`](/oss/javascript/langchain/langgraph/graph-api#command).

### Request Example
```typescript
import { tool, ToolMessage } from "langchain";
import { Command } from "@langchain/langgraph";
import * as z from "zod";

const callSubagent1 = tool(
  async ({ query }, config) => {
    const result = await subagent1.invoke({
      messages: [{ role: "user", content: query }]
    });

    // Return a Command to update multiple state keys
    return new Command({
      update: {
        // Pass back additional state from the subagent
        exampleStateKey: result.exampleStateKey,
        messages: [
          new ToolMessage({
            content: result.messages.at(-1)?.text,
            tool_call_id: config.toolCall?.id!
          })
        ]
      }
    });
  },
  {
    name: "subagent1_name",
    description: "subagent1_description",
    schema: z.object({
      query: z.string().describe("The query to send to subagent1")
    })
  }
);
````

````

--------------------------------

### Install LangChain Community and PDF Parse

Source: https://docs.langchain.com/oss/javascript/langchain/knowledge-base

Installs the necessary LangChain community package and the pdf-parse library for handling PDF documents. This is a prerequisite for building the semantic search engine.

```bash
npm i @langchain/community pdf-parse
````

```bash
yarn add @langchain/community pdf-parse
```

```bash
pnpm add @langchain/community pdf-parse
```

---

### POST /sandbox/create

Source: https://docs.langchain.com/oss/javascript/deepagents/sandboxes

Initializes a new remote sandbox instance for code execution.

```APIDOC
## POST /sandbox/create

### Description
Creates a new isolated sandbox environment (e.g., Daytona, Deno) to be used by an agent for executing code tasks.

### Method
POST

### Endpoint
/sandbox/create

### Parameters
#### Request Body
- **memoryMb** (number) - Optional - Memory allocation for the sandbox in MB.
- **lifetime** (string) - Optional - Duration before the sandbox is automatically terminated (e.g., '10m').

### Request Example
{
  "memoryMb": 1024,
  "lifetime": "10m"
}

### Response
#### Success Response (200)
- **id** (string) - Unique identifier for the created sandbox instance.

#### Response Example
{
  "id": "sandbox_abc123"
}
```

---

### Instantiate VertexAI model

Source: https://docs.langchain.com/oss/javascript/integrations/llms/google_vertex_ai

Example of how to import and initialize the VertexAI class with specific model parameters like temperature and maxRetries.

```typescript
import { VertexAI } from "@langchain/google-vertexai-web";

const llm = new VertexAI({
  model: "gemini-pro",
  temperature: 0,
  maxRetries: 2,
});
```

---

### Install LangChain Standard Test Dependencies

Source: https://docs.langchain.com/oss/javascript/contributing/standard-tests-langchain

Commands to install the core and standard-tests packages required for running LangChain integration tests.

```npm
npm install @langchain/core
npm install @langchain/standard-tests
```

```pnpm
pnpm add @langchain/core
pnpm add @langchain/standard-tests
```

```yarn
yarn add @langchain/core
yarn add @langchain/standard-tests
```

```bun
bun add @langchain/core
bun add @langchain/standard-tests
```

---

### Install YandexGPT dependencies

Source: https://docs.langchain.com/oss/javascript/integrations/chat/yandex

Install the necessary LangChain packages to enable YandexGPT integration in your project.

```bash
npm install @langchain/yandex @langchain/core
```

---

### Instantiate PostgresVectorStore

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/google_cloudsql_pg

Demonstrates how to configure the PostgresEngine, initialize the vector store table, and instantiate the PostgresVectorStore using an embedding service.

```typescript
import {
  Column,
  PostgresEngine,
  PostgresEngineArgs,
  PostgresVectorStore,
  PostgresVectorStoreArgs,
  VectorStoreTableArgs,
} from "@langchain/google-cloud-sql-pg";
import { SyntheticEmbeddings } from "@langchain/core/utils/testing";
import * as dotenv from "dotenv";

dotenv.config();
const peArgs: PostgresEngineArgs = {
  user: process.env.DB_USER ?? "",
  password: process.env.PASSWORD ?? "",
};
const engine: PostgresEngine = await PostgresEngine.fromInstance(
  process.env.PROJECT_ID ?? "",
  process.env.REGION ?? "",
  process.env.INSTANCE_NAME ?? "",
  process.env.DB_NAME ?? "",
  peArgs,
);
const vectorStoreArgs: VectorStoreTableArgs = {
  metadataColumns: [new Column("page", "TEXT"), new Column("source", "TEXT")],
};
await engine.initVectorstoreTable(
  "my_vector_store_table",
  768,
  vectorStoreArgs,
);
const embeddingService = new SyntheticEmbeddings({ vectorSize: 768 });
const pvectorArgs: PostgresVectorStoreArgs = {
  metadataColumns: ["page", "source"],
};
const vectorStore = await PostgresVectorStore.initialize(
  engine,
  embeddingService,
  "my_vector_store_table",
  pvectorArgs,
);
```

---

### Install Qdrant and Core Dependencies (yarn)

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/qdrant

Installs the QdrantVectorStore, LangChain core, and OpenAI embeddings packages using yarn. This is a prerequisite for using Qdrant with LangChain JavaScript.

```bash
yarn add @langchain/qdrant @langchain/core @langchain/openai
```

---

### Install DeepAgents with Azure

Source: https://docs.langchain.com/oss/javascript/deepagents/customization

Install the necessary packages for using DeepAgents with Azure OpenAI models.

````APIDOC
## Install DeepAgents with Azure

### Description
Install the necessary packages for using DeepAgents with Azure OpenAI models.

### Method
Package Manager Commands

### Parameters
None

### Request Example
```bash
npm install @langchain/azure deepagents
````

````

--------------------------------

### Create and Manage Agent Skills via CLI

Source: https://docs.langchain.com/oss/javascript/deepagents/cli

Commands to initialize new skills at the user or project level and manually install skills by copying directories.

```bash
# User skill (stored in ~/.deepagents/<agent_name>/skills/)
deepagents skills create test-skill

# Project skill (stored in .deepagents/skills/)
deepagents skills create test-skill --project

# Copy existing skills
mkdir -p ~/.deepagents/<agent_name>/skills
cp -r examples/skills/web-research ~/.deepagents/<agent_name>/skills/
````

---

### Install GitHub Loader Dependencies

Source: https://docs.langchain.com/oss/javascript/integrations/document_loaders/web_loaders/github

Install the necessary LangChain community packages and the required peer dependency 'ignore' to enable GitHub repository loading.

```bash
npm install @langchain/community @langchain/core ignore
```

---

### Configure DeepAgents with FilesystemBackend

Source: https://docs.langchain.com/oss/javascript/deepagents/skills

Illustrates loading skills directly from the local filesystem using FilesystemBackend. This setup requires defining a root directory and optionally configuring interrupt behaviors for file operations.

```typescript
import { createDeepAgent, FilesystemBackend } from "deepagents";
import { MemorySaver } from "@langchain/langgraph";

const checkpointer = new MemorySaver();
const backend = new FilesystemBackend({ rootDir: process.cwd() });

const agent = await createDeepAgent({
  backend,
  skills: ["./examples/skills/"],
  interruptOn: {
    read_file: true,
    write_file: true,
    delete_file: true,
  },
  checkpointer,
});

const config = {
  configurable: {
    thread_id: `thread-${Date.now()}`,
  },
};

const result = await agent.invoke(
  {
    messages: [
      {
        role: "user",
        content: "what is langraph? Use the langgraph-docs skill if available.",
      },
    ],
  },
  config,
);
```

---

### Install LangChain and Dependencies (npm)

Source: https://docs.langchain.com/oss/javascript/langgraph/sql-agent

Installs the necessary LangChain packages and related dependencies for building a SQL agent using npm. Includes langchain, core, classic, langgraph, openai, typeorm, sqlite3, and zod.

```bash
npm i langchain @langchain/core @langchain/classic @langchain/langgraph @langchain/openai typeorm sqlite3 zod
```

---

### Install LangGraph CLI

Source: https://docs.langchain.com/oss/javascript/langgraph/studio

Installs the LangGraph CLI using npm, which provides a local development server for connecting agents to LangSmith Studio.

```shell
npx @langchain/langgraph-cli
```

---

### Bedrock Model Instantiation

Source: https://docs.langchain.com/oss/javascript/integrations/llms/bedrock

How to initialize the Bedrock model class with credentials and configuration parameters.

```APIDOC
## Bedrock Model Instantiation

### Description
Initializes the Bedrock LLM client with specific model identifiers, AWS region, and authentication credentials.

### Method
Constructor

### Parameters
#### Request Body
- **model** (string) - Required - The ID of the Bedrock model (e.g., "anthropic.claude-v2").
- **region** (string) - Required - The AWS region where the model is hosted.
- **credentials** (object) - Required - AWS accessKeyId and secretAccessKey.
- **temperature** (number) - Optional - Controls randomness.

### Request Example
const llm = new Bedrock({ model: "anthropic.claude-v2", region: "us-east-1" });
```

---

### Zod Schema Example

Source: https://docs.langchain.com/oss/javascript/langchain/structured-output

Example of using the `toolStrategy` with a Zod schema for defining the structured output.

````APIDOC
## Zod Schema Example

```ts
import * as z from "zod";
import { createAgent, toolStrategy } from "langchain";

const ProductReview = z.object({
    rating: z.number().min(1).max(5).optional(),
    sentiment: z.enum(["positive", "negative"]),
    keyPoints: z.array(z.string()).describe("The key points of the review. Lowercase, 1-3 words each."),
});

const agent = createAgent({
    model: "gpt-5",
    tools: [],
    responseFormat: toolStrategy(ProductReview)
});

const result = await agent.invoke({
    "messages": [{"role": "user", "content": "Analyze this review: 'Great product: 5 out of 5 stars. Fast shipping, but expensive'"}]
});

console.log(result.structuredResponse);
// { "rating": 5, "sentiment": "positive", "keyPoints": ["fast shipping", "expensive"] }
````

````

--------------------------------

### LangChain UI SDK Initialization and Event Handling (JavaScript)

Source: https://docs.langchain.com/oss/javascript/langchain/frontend/generative-ui

Initializes the LangChain UI SDK, sets up message handling for communication with the guest iframe, and provides methods to interact with the UI. It also includes functions to add and remove event listeners for various UI events like ready, resize, error, and more. Dependencies include the browser's window object for event listeners and postMessage API.

```javascript
function createLangChainUI(cb) {
      const listeners = new Map();
      const addListener = (type, callback) => {
        listeners.set(type, callback);
        return () => listeners.delete(type);
      };
      const postToGuest = (message) => {
        window.parent.postMessage(message, "*");
      };
      const handleMessage = (event) => {
        const { type, ...msg } = event.data;
        switch (type) {
          case "READY":
            {
              const callback = listeners.get("READY");
              if (callback) {
                callback(msg.version);
              }
            }
            break;
          case "RESIZE":
            {
              const callback = listeners.get("RESIZE");
              if (callback) {
                callback(msg.width, msg.height);
              }
            }
            break;
          case "ERROR":
            {
              const callback = listeners.get("ERROR");
              if (callback) {
                callback(msg.error);
              }
            }
            break;
          case "RUN_STARTED":
            {
              const callback = listeners.get("RUN_STARTED");
              if (callback) {
                callback(msg.runId);
              }
            }
            break;
          case "TRACE_URL":
            cb(msg.url, msg.runId);
            break;
          case "THREAD_CLEARED":
            cb();
            break;
        }
      };
      window.addEventListener("message", handleMessage);
      return {
        setTheme(theme) {
          postToGuest({
            type: "SET_THEME",
            theme
          });
        },
        setPattern(slug) {
          postToGuest({
            type: "SET_PATTERN",
            slug
          });
        },
        setView(view) {
          postToGuest({
            type: "SET_VIEW",
            view
          });
        },
        setLanguage(language) {
          postToGuest({
            type: "SET_LANGUAGE",
            language
          });
        },
        updateCode(files, entryFile) {
          postToGuest({
            type: "UPDATE_CODE",
            files,
            entryFile
          });
        },
        reset() {
          postToGuest({
            type: "RESET"
          });
        },
        trackEvent(name, properties) {
          postToGuest({
            type: "TRACK_EVENT",
            name,
            properties
          });
        },
        onReady(callback) {
          return addListener("READY", callback);
        },
        onResize(callback) {
          return addListener("RESIZE", callback);
        },
        onError(callback) {
          return addListener("ERROR", callback);
        },
        onRunStarted(callback) {
          return addListener("RUN_STARTED", callback);
        },
        onTraceUrl(callback) {
          return addListener("TRACE_URL", callback);
        },
        onThreadCleared(callback) {
          return addListener("THREAD_CLEARED", callback);
        },
        destroy() {
          window.removeEventListener("message", handleMessage);
          listeners.clear();
        }
      };
    }
````

---

### Couchbase Query Vector Search Example

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/couchbase_query

This example demonstrates the initialization and basic usage of the CouchbaseQueryVectorStore for adding documents and performing similarity searches.

````APIDOC
## Basic vector search example

The following example showcases how to use Couchbase Query vector search and perform similarity search.

```typescript
import { OpenAIEmbeddings } from "@langchain/openai";
import {
  CouchbaseQueryVectorStore,
  DistanceStrategy,
} from "@langchain/community/vectorstores/couchbase_query";
import { Cluster } from "couchbase";
import { Document } from "@langchain/core/documents";

const connectionString = process.env.COUCHBASE_DB_CONN_STR ?? "couchbase://localhost";
const databaseUsername = process.env.COUCHBASE_DB_USERNAME ?? "Administrator";
const databasePassword = process.env.COUCHBASE_DB_PASSWORD ?? "Password";

const couchbaseClient = await Cluster.connect(connectionString, {
  username: databaseUsername,
  password: databasePassword,
  configProfile: "wanDevelopment",
});

// OpenAI API Key is required to use OpenAIEmbeddings
const embeddings = new OpenAIEmbeddings({
  apiKey: process.env.OPENAI_API_KEY,
});

const vectorStore = await CouchbaseQueryVectorStore.initialize(embeddings, {
  cluster: couchbaseClient,
  bucketName: "testing",
  scopeName: "_default",
  collectionName: "_default",
  textKey: "text",
  embeddingKey: "embedding",
  distanceStrategy: DistanceStrategy.COSINE,
});

// Add documents
const documents = [
  new Document({
    pageContent: "Couchbase is a NoSQL database",
    metadata: { category: "database", type: "document" }
  }),
  new Document({
    pageContent: "Vector search enables semantic similarity",
    metadata: { category: "ai", type: "document" }
  })
];

await vectorStore.addDocuments(documents);

// Perform similarity search
const query = "What is a NoSQL database?";
const results = await vectorStore.similaritySearch(query, 4);
console.log("Search results:", results[0]);

// Search with scores
const resultsWithScores = await vectorStore.similaritySearchWithScore(query, 4);
console.log("Document:", resultsWithScores[0][0]);
console.log("Score:", resultsWithScores[0][1]);
````

````

--------------------------------

### Clear Subagent Description Example in TypeScript

Source: https://docs.langchain.com/oss/javascript/deepagents/async-subagents

This TypeScript code snippet illustrates writing effective subagent descriptions. The 'Good' example is specific and action-oriented, aiding the supervisor in selecting the appropriate agent. The 'Bad' example is vague.

```typescript
// Good
{
  name: "researcher",
  description: "Conducts in-depth research using web search. Use for questions requiring multiple searches and synthesis.",
  graphId: "researcher",
}

// Bad
{
  name: "helper",
  description: "helps with stuff",
  graphId: "helper",
}
````

---

### Creating Sandbox Setup Scripts

Source: https://docs.langchain.com/oss/javascript/deepagents/cli/overview

A shell script template for configuring sandbox environments, including cloning repositories and persisting environment variables.

```bash
#!/bin/bash
set -e

# Clone repository using GitHub token
git clone https://x-access-token:${GITHUB_TOKEN}@github.com/username/repo.git $HOME/workspace
cd $HOME/workspace

# Make environment variables persistent
cat >> ~/.bashrc <<'EOF'
export GITHUB_TOKEN="${GITHUB_TOKEN}"
export OPENAI_API_KEY="${OPENAI_API_KEY}"
cd $HOME/workspace
EOF
source ~/.bashrc
```

---

### Install LangGraph Dependency

Source: https://docs.langchain.com/oss/javascript/langgraph/use-graph-api

Command to install the @langchain/langgraph package required for building graph-based workflows in JavaScript.

```bash
npm install @langchain/langgraph
```

---

### Install Dria JS Client

Source: https://docs.langchain.com/oss/javascript/integrations/retrievers/dria

Install the Dria JS client package using npm. This is a prerequisite for integrating Dria with LangChain.

```bash
npm install dria
```

---

### Install Weaviate Integration Packages (yarn)

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/weaviate

Installs the necessary LangChain Weaviate integration package, core components, Weaviate client, UUID package, and OpenAI embeddings package using yarn.

```bash
yarn add @langchain/weaviate @langchain/core weaviate-client uuid @langchain/openai
```

---

### Install Ollama Integration Dependencies

Source: https://docs.langchain.com/oss/javascript/integrations/embeddings/ollama

Install the necessary LangChain Ollama integration and core packages using various package managers.

```bash
npm install @langchain/ollama @langchain/core
```

```bash
yarn add @langchain/ollama @langchain/core
```

```bash
pnpm add @langchain/ollama @langchain/core
```

---

### Install node-llama-cpp and LangChain packages

Source: https://docs.langchain.com/oss/javascript/integrations/chat/llama_cpp

Installs the necessary node-llama-cpp module (version 3) and LangChain community and core packages for integration with local LLMs. This is a prerequisite for using ChatLlamaCpp.

```bash
npm install -S node-llama-cpp@3 @langchain/community @langchain/core
```

---

### Configure DeepAgent with StateBackend

Source: https://docs.langchain.com/oss/javascript/deepagents/customization

Demonstrates how to initialize a DeepAgent using a StateBackend to manage memory files. It fetches external content and seeds the agent's virtual filesystem.

```typescript
import { createDeepAgent, type FileData } from "deepagents";
import { MemorySaver } from "@langchain/langgraph";

const AGENTS_MD_URL =
  "https://raw.githubusercontent.com/langchain-ai/deepagents/refs/heads/main/examples/text-to-sql-agent/AGENTS.md";

async function fetchText(url: string): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }
  return await res.text();
}

const agentsMd = await fetchText(AGENTS_MD_URL);
const checkpointer = new MemorySaver();

function createFileData(content: string): FileData {
  const now = new Date().toISOString();
  return {
    content: content.split("\n"),
    created_at: now,
    modified_at: now,
  };
}

const agent = await createDeepAgent({
  memory: ["/AGENTS.md"],
  checkpointer: checkpointer,
});

const result = await agent.invoke(
  {
    messages: [
      {
        role: "user",
        content: "Please tell me what's in your memory files.",
      },
    ],
    files: { "/AGENTS.md": createFileData(agentsMd) },
  },
  { configurable: { thread_id: "12345" } },
);
```

---

### Install LangChain Community and Core Packages

Source: https://docs.langchain.com/oss/javascript/integrations/chat/alibaba_tongyi

Installs the necessary LangChain packages for integrating with community models like Alibaba Tongyi. Requires Node.js and npm.

```bash
npm install @langchain/community @langchain/core
```

---

### Configure and Use Typesense Vector Store

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/typesense

Demonstrates how to initialize the Typesense client, configure the vector store, and perform operations like similarity search and document deletion.

```typescript
import {
  Typesense,
  TypesenseConfig,
} from "@lanchain/community/vectorstores/typesense";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Client } from "typesense";
import { Document } from "@langchain/core/documents";

const vectorTypesenseClient = new Client({
  nodes: [{ host: "...", port: 123, protocol: "https" }],
  apiKey: "...",
  numRetries: 3,
  connectionTimeoutSeconds: 60,
});

const typesenseVectorStoreConfig = {
  typesenseClient: vectorTypesenseClient,
  schemaName: "your_schema_name",
  columnNames: {
    vector: "vec",
    pageContent: "text",
    metadataColumnNames: ["foo", "bar", "baz"],
  },
  import: async (data, collectionName) => {
    await vectorTypesenseClient
      .collections(collectionName)
      .documents()
      .import(data, { action: "emplace", dirty_values: "drop" });
  },
} satisfies TypesenseConfig;

const getVectorStoreWithTypesense = async () =>
  new Typesense(new OpenAIEmbeddings(), typesenseVectorStoreConfig);

const vectorStore = await getVectorStoreWithTypesense();
const documents = await vectorStore.similaritySearch("hello world");
vectorStore.similaritySearch("Rowling", undefined, {
  filter_by: "author:!=JK Rowling",
});
vectorStore.deleteDocuments(["document_id_1", "document_id_2"]);
```

---

### Deep Agent Creation

Source: https://docs.langchain.com/oss/javascript/deepagents/frontend/overview

Example of how to create a Deep Agent with tools, system prompt, and subagents.

````APIDOC
## Deep Agent Creation

### Description
This example demonstrates how to initialize a Deep Agent using `createDeepAgent`, specifying tools, a system message, and defining specialized subagents.

### Method
`createDeepAgent`

### Parameters
#### Request Body
- **tools** (Array<Tool>) - Required - A list of tools the agent can use.
- **system** (string) - Required - The system prompt for the agent.
- **subagents** (Array<SubagentConfig>) - Optional - Configuration for subagents.
  - **name** (string) - Required - The name of the subagent.
  - **description** (string) - Required - A description of the subagent's purpose.

### Request Example
```ts
import { createDeepAgent } from "deepagents";

const agent = createDeepAgent({
  tools: [getWeather],
  system: "You are a helpful assistant",
  subagents: [
    {
      name: "researcher",
      description: "Research assistant",
    },
  ],
});
````

````

--------------------------------

### Install Alchemyst AI package

Source: https://docs.langchain.com/oss/javascript/integrations/retrievers/alchemystai-retriever

Commands to install the @alchemystai/langchain-js package using various package managers.

```sh
npm i @alchemystai/langchain-js
````

```sh
yarn add @alchemystai/langchain-js
```

```sh
pnpm add @alchemystai/langchain-js
```

```sh
bun add @alchemystai/langchain-js
```

---

### Install Qdrant and Core Dependencies (pnpm)

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/qdrant

Installs the QdrantVectorStore, LangChain core, and OpenAI embeddings packages using pnpm. This is a prerequisite for using Qdrant with LangChain JavaScript.

```bash
pnpm add @langchain/qdrant @langchain/core @langchain/openai
```

---

### Install Ollama Embeddings

Source: https://docs.langchain.com/oss/javascript/integrations/embeddings

Commands to install the Ollama integration package using various package managers.

```bash
npm i @langchain/ollama
```

```bash
yarn add @langchain/ollama
```

```bash
pnpm add @langchain/ollama
```

---

### Create Deep Agent with Local Shell Backend (Python)

Source: https://docs.langchain.com/oss/javascript/deepagents/backends

Shows how to set up a Deep Agent with a LocalShellBackend for direct filesystem and shell execution on the host machine. This backend offers no isolation and should only be used in controlled development environments due to security considerations. Environment variables like PATH can be configured.

```python
agent = create_deep_agent(backend=LocalShellBackend(root_dir=".", env={"PATH": "/usr/bin:/bin"}))
```

---

### Install Cohere Embeddings

Source: https://docs.langchain.com/oss/javascript/integrations/embeddings

Commands to install the Cohere integration package using various package managers.

```bash
npm i @langchain/cohere
```

```bash
yarn add @langchain/cohere
```

```bash
pnpm add @langchain/cohere
```

---

### Install LangChain Chat Model Packages

Source: https://docs.langchain.com/oss/javascript/langchain/multi-agent/handoffs-customer-support

Commands to install the necessary LangChain integration packages for various providers using common package managers.

```bash
npm install @langchain/openai @langchain/anthropic @langchain/azure @langchain/google-genai
```

```bash
pnpm install @langchain/openai @langchain/anthropic @langchain/azure @langchain/google-genai
```

```bash
yarn add @langchain/openai @langchain/anthropic @langchain/azure @langchain/google-genai
```

```bash
bun add @langchain/openai @langchain/anthropic @langchain/azure @langchain/google-genai
```

---

### Install MistralAI Embeddings

Source: https://docs.langchain.com/oss/javascript/integrations/embeddings

Commands to install the MistralAI integration package using various package managers.

```bash
npm i @langchain/mistralai
```

```bash
yarn add @langchain/mistralai
```

```bash
pnpm add @langchain/mistralai
```

---

### Install Jigsawstack LangChain Package

Source: https://docs.langchain.com/oss/javascript/integrations/llms/jigsawstack

Install the necessary LangChain integration package for Jigsawstack using npm.

```bash
npm install @langchain/jigsawstack
```

---

### Initialize and Query Zep Vector Store with OpenAI Embeddings

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/zep

This example shows how to initialize the Zep Vector Store using documents loaded from a text file and OpenAI embeddings. It demonstrates performing similarity searches and Maximum Marginal Relevance (MMR) searches.

```typescript
import { ZepVectorStore } from "@langchain/community/vectorstores/zep";
import { OpenAIEmbeddings } from "@langchain/openai";
import { TextLoader } from "@langchain/classic/document_loaders/fs/text";
import { randomUUID } from "crypto";

const loader = new TextLoader("src/document_loaders/example_data/example.txt");
const docs = await loader.load();
export const run = async () => {
  const collectionName = `collection${randomUUID().split("-")[0]}`;

  const zepConfig = {
    apiUrl: "http://localhost:8000", // this should be the URL of your Zep implementation
    collectionName,
    embeddingDimensions: 1536, // this much match the width of the embeddings you're using
    isAutoEmbedded: false, // set to false to disable auto-embedding
  };

  const embeddings = new OpenAIEmbeddings();

  const vectorStore = await ZepVectorStore.fromDocuments(
    docs,
    embeddings,
    zepConfig,
  );

  const results = await vectorStore.similaritySearchWithScore("bar", 3);

  console.log("Similarity Results:");
  console.log(JSON.stringify(results));

  const results2 = await vectorStore.maxMarginalRelevanceSearch("bar", {
    k: 3,
  });

  console.log("MMR Results:");
  console.log(JSON.stringify(results2));
};
```

---

### Install and Initialize MistralAI Embeddings

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores

Install the MistralAI package and initialize the embedding model with your API key. Requires MISTRAL_API_KEY to be set in the environment.

```bash
npm i @langchain/mistralai
yarn add @langchain/mistralai
pnpm add @langchain/mistralai
```

```typescript
import { MistralAIEmbeddings } from "@langchain/mistralai";

const embeddings = new MistralAIEmbeddings({
  model: "mistral-embed",
});
```

---

### Install PineconeEmbeddings Dependencies

Source: https://docs.langchain.com/oss/javascript/integrations/embeddings/pinecone

Installs the required packages for Pinecone integration using npm, yarn, or pnpm.

```bash
npm install @langchain/pinecone @langchain/core @pinecone-database/pinecone@5
```

```bash
yarn add @langchain/pinecone @langchain/core @pinecone-database/pinecone@5
```

```bash
pnpm add @langchain/pinecone @langchain/core @pinecone-database/pinecone@5
```

---

### Install DeepAgents and AWS Dependencies

Source: https://docs.langchain.com/oss/javascript/deepagents/customization

Use the Bun package manager to install the necessary DeepAgents and AWS LangChain packages for your project.

```bash
bun add @langchain/aws deepagents
```

---

### Install HuggingFace Transformers Dependencies

Source: https://docs.langchain.com/oss/javascript/integrations/embeddings/transformers

Commands to install the required packages for integrating HuggingFace transformers with LangChain.

```bash
npm install @huggingface/transformers
npm install @langchain/community @langchain/core
```

---

### Initialize and Run ReAct Agent

Source: https://docs.langchain.com/oss/javascript/langchain/sql-agent

Instantiates the agent with the model and tools, then executes a sample query using streaming to process the response.

```typescript
import { createAgent } from "langchain";

const agent = createAgent({
  model: "gpt-5",
  tools: [executeSql],
  systemPrompt: getSystemPrompt,
});

const question = "Which genre, on average, has the longest tracks?";
const stream = await agent.stream(
  { messages: [{ role: "user", content: question }] },
  { streamMode: "values" },
);
for await (const step of stream) {
  const message = step.messages.at(-1);
  console.log(`${message.role}: ${JSON.stringify(message.content, null, 2)}`);
}
```

---

### Install Browserbase SDK and LangChain Packages

Source: https://docs.langchain.com/oss/javascript/integrations/document_loaders/web_loaders/browserbase

Installs the necessary packages for integrating Browserbase with LangChain JavaScript, including the Browserbase SDK and LangChain community/core packages. Ensure you have set your Browserbase API key and Project ID as environment variables.

```bash
npm i @langchain/community @langchain/core @browserbasehq/sdk
```

---

### Install Dependencies for PGVectorStore (npm, yarn, pnpm)

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/pgvector

Installs the necessary LangChain community and OpenAI integration packages, along with core dependencies and pg for PostgreSQL interaction. Also includes uuid for ID generation. Compatible with Node.js.

```bash
npm install @langchain/community @langchain/openai @langchain/core pg uuid
```

```bash
yarn add @langchain/community @langchain/openai @langchain/core pg uuid
```

```bash
pnpm add @langchain/community @langchain/openai @langchain/core pg uuid
```

---

### Install and Use Google Gemini with LangChain.js

Source: https://docs.langchain.com/oss/javascript/integrations/chat

Install the Google Gemini integration for LangChain.js. Configure your GOOGLE_API_KEY and create a ChatGoogle model instance.

```bash
npm i @langchain/google
```

```bash
yarn add @langchain/google
```

```bash
pnpm add @langchain/google
```

```bash
GOOGLE_API_KEY=your-api-key
```

```typescript
import { ChatGoogle } from "@langchain/google";

const model = new ChatGoogle("gemini-2.5-flash");
```

```javascript
await model.invoke("Hello, world!");
```

---

### Install LangChain v1 Packages (npm, pnpm, yarn, bun)

Source: https://docs.langchain.com/oss/javascript/releases/langchain-v1

Commands to install the necessary LangChain packages for version 1.0 across different package managers. This ensures you have the core library and its associated core components.

```bash
npm install langchain @langchain/core
```

```bash
pnpm install langchain @langchain/core
```

```bash
yarn add langchain @langchain/core
```

```bash
bun add langchain @langchain/core
```

---

### Install Azure Blob Storage Dependencies

Source: https://docs.langchain.com/oss/javascript/integrations/document_loaders/web_loaders/azure_blob_storage_container

Installs the necessary LangChain community, core, and Azure Storage Blob client libraries for Node.js.

```bash
npm install @langchain/community @langchain/core @azure/storage-blob
```

---

### Decodo Google Search Tool Example

Source: https://docs.langchain.com/oss/javascript/integrations/tools/decodo

Example demonstrating how to use the Decodo Google Search Tool to perform Google searches and retrieve structured results within LangChain.

````APIDOC
## POST /api/decodo/google/search

### Description
Performs a Google search and returns structured results. This tool is useful for finding information on the web.

### Method
POST

### Endpoint
/api/decodo/google/search

### Parameters
#### Request Body
- **username** (string) - Required - Your Decodo Web Advanced product username
- **password** (string) - Required - Your Decodo Web Advanced product password
- **query** (string) - Required - The search query
- **country** (string) - Optional - The country to perform the search in (e.g., "DE" for Germany)

### Request Example
```json
{
  "username": "YOUR_USERNAME",
  "password": "YOUR_PASSWORD",
  "query": "which mobile service provider appears first on Google in Germany?",
  "country": "DE"
}
````

### Response

#### Success Response (200)

- **results** (array) - An array of search result objects, each containing title, link, and snippet.

#### Response Example

```json
{
  "results": [
    {
      "title": "Top Mobile Providers in Germany - [Provider Name]",
      "link": "https://www.example.com/provider-germany",
      "snippet": "Find the best mobile plans in Germany. Compare providers like [Provider A], [Provider B]..."
    }
    // ... more results
  ]
}
```

````

--------------------------------

### FilesystemBackend Usage

Source: https://docs.langchain.com/oss/javascript/deepagents/skills

Example of creating and invoking a deep agent using the FilesystemBackend.

```APIDOC
## Create and Invoke Deep Agent with FilesystemBackend

### Description
This example illustrates initializing a deep agent with a FilesystemBackend, specifying a root directory and interrupt handlers for file operations.

### Method
POST (implicitly via agent.invoke)

### Endpoint
N/A (Client-side SDK method)

### Parameters
#### Request Body (for agent.invoke)
- **messages** (list[object]) - Required - The list of messages for the agent.

### Request Example
```json
{
  "messages": [
    {
      "role": "user",
      "content": "what is langraph? Use the langgraph-docs skill if available."
    }
  ]
}
````

### Response

#### Success Response (200)

- **result** (object) - The agent's response.

#### Response Example

```json
{
  "output": "LangGraph is a library for..."
}
```

````

--------------------------------

### Install Zep Cloud and LangChain Packages (npm)

Source: https://docs.langchain.com/oss/javascript/integrations/retrievers/zep-cloud-retriever

Installs the necessary npm packages for Zep Cloud integration with LangChain JavaScript. This includes the Zep Cloud SDK, LangChain Community, and LangChain Core packages.

```bash
npm i @getzep/zep-cloud @langchain/community @langchain/core
````

---

### Initialize and query Neo4j Vector Store

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/neo4jvector

TypeScript example demonstrating how to connect to Neo4j, ingest documents with OpenAI embeddings, and perform a similarity search.

```typescript
import { OpenAIEmbeddings } from "@langchain/openai";
import { Neo4jVectorStore } from "@langchain/community/vectorstores/neo4j_vector";

const config = {
  url: "bolt://localhost:7687",
  username: "neo4j",
  password: "pleaseletmein",
  indexName: "vector",
  keywordIndexName: "keyword",
  searchType: "vector" as const,
  nodeLabel: "Chunk",
  textNodeProperty: "text",
  embeddingNodeProperty: "embedding",
};

const documents = [
  { pageContent: "what's this", metadata: { a: 2 } },
  { pageContent: "Cat drinks milk", metadata: { a: 1 } },
];

const neo4jVectorIndex = await Neo4jVectorStore.fromDocuments(
  documents,
  new OpenAIEmbeddings(),
  config,
);

const results = await neo4jVectorIndex.similaritySearch("water", 1);
console.log(results);
await neo4jVectorIndex.close();
```

---

### Install LangChain Text Splitter Packages

Source: https://docs.langchain.com/oss/javascript/integrations/splitters

Commands to install the necessary LangChain text splitter and core packages using common Node.js package managers.

```bash
npm install @langchain/textsplitters @langchain/core
```

```bash
pnpm add @langchain/textsplitters @langchain/core
```

```bash
yarn add @langchain/textsplitters @langchain/core
```

```bash
bun add @langchain/textsplitters @langchain/core
```

---

### Install Metal SDK and LangChain Packages

Source: https://docs.langchain.com/oss/javascript/integrations/retrievers/metal-retriever

Installs the necessary packages for integrating Metal with LangChain JavaScript. This includes the Metal SDK, and community and core LangChain packages.

```bash
npm i @getmetal/metal-sdk @langchain/community @langchain/core
```

---

### Use a virtual filesystem

Source: https://docs.langchain.com/oss/javascript/deepagents/backends

Guidelines for building a custom backend to project a remote or database filesystem into the tools namespace.

````APIDOC
## Use a virtual filesystem

### Description
Build a custom backend to project a remote or database filesystem (e.g., S3 or Postgres) into the tools namespace. Design guidelines focus on path handling, efficient listing, and error reporting.

### Method
Implementation of the `BackendProtocol` interface.

### Endpoint
N/A

### Parameters
#### Design Guidelines
- Paths are absolute (`/x/y.txt`). Map them to your storage keys/rows.
- Implement `ls_info` and `glob_info` efficiently (server-side listing where available).
- Return user-readable error strings for missing files or invalid regex patterns.
- For external persistence, set `files_update=None` in results.

### Request Example
**S3-style outline:**
```python
# Conceptual outline for S3 integration
class S3Backend(BackendProtocol):
    def __init__(self, bucket_name):
        self.bucket_name = bucket_name
        # Initialize S3 client

    def get_info(self, path):
        # ... implementation ...

    def ls_info(self, path):
        # ... implementation using S3 list_objects_v2 ...

    def glob_info(self, pattern):
        # ... implementation ...

    # ... other methods ...
````

**Postgres-style outline:**

```sql
-- Table `files(path text primary key, content text, created_at timestamptz, modified_at timestamptz)`

-- Map tool operations onto SQL:
-- ls_info uses `WHERE path LIKE $1 || '%'`
-- glob_info filter in SQL or fetch then apply glob in Python
-- grep_raw can fetch candidate rows by extension or last modified time, then scan lines
```

### Response

#### Success Response (200)

A custom backend implementing the `BackendProtocol`.

#### Response Example

N/A

````

--------------------------------

### Subagent Inputs Example

Source: https://docs.langchain.com/oss/javascript/langchain/multi-agent/subagents

Example demonstrating how to pass the full conversation history to a subagent via the state.

```APIDOC
## Subagent inputs

Customize what context the subagent receives to execute its task. Add input that isn't practical to capture in a static prompt—full message history, prior results, or task metadata—by pulling from the agent's state.

### Request Example
```typescript
import { createAgent, tool, AgentState, ToolMessage } from "langchain";
import { Command } from "@langchain/langgraph";
import * as z from "zod";

// Example of passing the full conversation history to the sub agent via the state.
const callSubagent1 = tool(
  async ({query}) => {
    const state = getCurrentTaskInput<AgentState>();
    // Apply any logic needed to transform the messages into a suitable input
    const subAgentInput = someLogic(query, state.messages);
    const result = await subagent1.invoke({
      messages: subAgentInput,
      // You could also pass other state keys here as needed.
      // Make sure to define these in both the main and subagent's
      // state schemas.
      exampleStateKey: state.exampleStateKey
    });
    return result.messages.at(-1)?.content;
  },
  {
    name: "subagent1_name",
    description: "subagent1_description",
  }
);
````

````

--------------------------------

### Install Langchain with npm

Source: https://docs.langchain.com/oss/javascript/langchain/multi-agent/skills-sql-assistant

Installs the langchain package using npm. This is a prerequisite for using Langchain in your JavaScript project.

```bash
npm install langchain
````

---

### OpenAPI Toolkit Available Tools Output

Source: https://docs.langchain.com/oss/javascript/integrations/tools/openapi

This is an example output showing the names and descriptions of the tools provided by the OpenAPI Toolkit, such as 'requests_get', 'requests_post', and 'json_explorer'.

```text
[
  {
    name: 'requests_get',
    description: 'A portal to the internet. Use this when you need to get specific content from a website.\n' +
      '  Input should be a url string (i.e. "https://www.google.com"). The output will be the text response of the GET request.'
  },
  {
    name: 'requests_post',
    description: 'Use this when you want to POST to a website.\n' +
      '  Input should be a json string with two keys: "url" and "data".\n' +
      '  The value of "url" should be a string, and the value of "data" should be a dictionary of\n' +
      '  key-value pairs you want to POST to the url as a JSON body.\n' +
      '  Be careful to always use double quotes for strings in the json string\n' +
      '  The output will be the text response of the POST request.'
  },
  {
    name: 'json_explorer',
    description: '\n' +
      'Can be used to answer questions about the openapi spec for the API. Always use this tool before trying to make a request. \n' +
      'Example inputs to this tool: \n' +
      "    'What are the required query parameters for a GET request to the /bar endpoint?'\n" +
      "    'What are the required parameters in the request body for a POST request to the /foo endpoint?'\n" +
      'Always give this tool a specific question.'
  }
]
```

---

### Initialize Composio and Fetch Tools

Source: https://docs.langchain.com/oss/javascript/integrations/tools/composio

Initializes the Composio client with the LangChain provider and retrieves tools from a specific service toolkit, such as GitHub.

```typescript
import { Composio } from "@composio/core";
import { LangchainProvider } from "@composio/langchain";

const composio = new Composio({
  apiKey: process.env.COMPOSIO_API_KEY,
  provider: new LangchainProvider(),
});

const tools = await composio.tools.get("default", "GITHUB");

console.log(`Loaded ${tools.length} tools from GitHub toolkit`);
```

---

### Seed Sandbox with Project Files

Source: https://docs.langchain.com/oss/javascript/deepagents/frontend/sandbox

This snippet shows how to populate a sandbox with project files before the agent starts. It defines a record of files and their content, then uses the `uploadFiles` method to transfer them into the sandbox at the specified paths. This is useful for setting up the initial project environment.

```typescript
const SEED_FILES: Record<string, string> = {
  "package.json": JSON.stringify({ name: "my-app", version: "1.0.0" }, null, 2),
  "src/index.js": 'console.log("Hello");',
};

const encoder = new TextEncoder();
await sandbox.uploadFiles(
  Object.entries(SEED_FILES).map(([path, content]) => [
    `/app/${path}`,
    encoder.encode(content),
  ]),
);
```

---

### Install Dependencies for College Confidential Loader

Source: https://docs.langchain.com/oss/javascript/integrations/document_loaders/web_loaders/college_confidential

Installs the necessary LangChain community packages, core LangChain, and Cheerio for web scraping. This is a prerequisite for using the CollegeConfidentialLoader.

```bash
npm install @langchain/community @langchain/core cheerio
```

---

### Initialize and Query FalkorDB with LangChain

Source: https://docs.langchain.com/oss/javascript/integrations/tools/falkordb

A complete example showing how to initialize the graph, populate it with data, refresh the schema, and execute a natural language query using the GraphCypherQAChain.

```typescript
import { FalkorDBGraph } from "@falkordb/langchain-ts";
import { ChatOpenAI } from "@langchain/openai";
import { GraphCypherQAChain } from "@langchain/community/chains/graph_qa/cypher";

const graph = await FalkorDBGraph.initialize({
  host: "localhost",
  port: 6379,
  graph: "movies",
});

const model = new ChatOpenAI({ temperature: 0 });

await graph.query(
  "CREATE (a:Actor {name:'Bruce Willis'})" +
    "-[:ACTED_IN]->(:Movie {title: 'Pulp Fiction'})",
);

await graph.refreshSchema();

const chain = GraphCypherQAChain.fromLLM({
  llm: model,
  graph: graph as any,
});

const response = await chain.run("Who played in Pulp Fiction?");
console.log(response);

await graph.close();
```

---

### Install and Uninstall Packages for Azure OpenAI Migration

Source: https://docs.langchain.com/oss/javascript/integrations/llms/azure

This command installs the new @langchain/openai package and removes the older @langchain/azure-openai package, preparing your project for the migration.

```bash
npm install @langchain/openai
npm uninstall @langchain/azure-openai
```

---

### Initialize Memory Vector Store

Source: https://docs.langchain.com/oss/javascript/langchain/knowledge-base

Install the classic LangChain package and initialize an in-memory vector store for lightweight, temporary storage.

```bash
npm i @langchain/classic
yarn add @langchain/classic
pnpm add @langchain/classic
```

```typescript
import { MemoryVectorStore } from "@langchain/classic/vectorstores/memory";

const vectorStore = new MemoryVectorStore(embeddings);
```

---

### Create Deep Agent with Local Filesystem Persistence (Python)

Source: https://docs.langchain.com/oss/javascript/deepagents/backends

Shows how to initialize a Deep Agent with a local filesystem backend, allowing it to access and store files on your machine. You can specify a root directory for the agent's operations, ensuring all file access is contained within that path. The root directory must be an absolute path.

```python
agent = create_deep_agent(backend=FilesystemBackend(root_dir="/Users/nh/Desktop/"))
```

---

### Install Couchbase and LangChain dependencies

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/couchbase_query

Install the necessary packages to enable Couchbase integration with LangChain and OpenAI embeddings.

```bash
npm install couchbase @langchain/openai @langchain/community @langchain/core
```

---

### Load and Use MCP Toolbox Tools in LangChain JavaScript

Source: https://docs.langchain.com/oss/javascript/integrations/tools/mcp_toolbox

Load tools from a configured Mcp toolbox server and integrate them into a LangChain agent. This example demonstrates initializing the ToolboxClient, loading a toolset, and creating an agent with the loaded tools.

```javascript
import { ChatGoogle } from "@langchain/google";
import { ToolboxClient } from "@toolbox-sdk/core";
import { tool } from "@langchain/core/tools";
import { createAgent } from "@langchain/classic";

const model = new ChatGoogle("gemini-2.5-flash-lite");

// Replace with your Toolbox Server URL
const URL = 'http://127.0.0.1:5000';

let client = ToolboxClient(URL);
toolboxTools = await client.loadToolset('toolsetName');

const getTool = (toolboxTool) => tool(toolboxTool, {
    name: toolboxTool.getName(),
    description: toolboxTool.getDescription(),
    schema: toolboxTool.getParamSchema()
});
const tools = toolboxTools.map(getTool);

const agent = createAgent({ llm: model, tools });
let inputs = { messages: [{ role: "user", content: Some query" }] };
let response = await agent.invoke(inputs);
console.log(response);
```

---

### Instantiate RedisVectorStore

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/redis

Example of initializing a Redis client and creating a RedisVectorStore instance with OpenAI embeddings.

```typescript
import { RedisVectorStore } from "@langchain/redis";
import { OpenAIEmbeddings } from "@langchain/openai";
import { createClient } from "redis";

const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-small",
});

const client = createClient({
  url: process.env.REDIS_URL ?? "redis://localhost:6379",
});
await client.connect();

const vectorStore = new RedisVectorStore(embeddings, {
  redisClient: client,
  indexName: "langchainjs-testing",
});
```

---

### Install Python Dependencies

Source: https://docs.langchain.com/oss/javascript/integrations/llms/llama_cpp

Installs the required Python packages listed in the 'requirements.txt' file within the activated virtual environment. Ensure you have the correct 'requirements.txt' file available.

```bash
python3 -m pip install -r requirements.txt
```

---

### Install Azure Cosmos DB Package

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/azure_cosmosdb_nosql

Install the necessary LangChain packages for Azure Cosmos DB integration.

````APIDOC
## Install Azure Cosmos DB Package

### Description
Install the `@langchain/azure-cosmosdb` and `@langchain/core` packages to integrate Azure Cosmos DB for NoSQL with LangChain JavaScript.

### Method
```bash
npm install @langchain/azure-cosmosdb @langchain/core
````

````

--------------------------------

### VectorStoreToolkit Tool Output

Source: https://docs.langchain.com/oss/javascript/integrations/tools/vectorstore

Example output showing the name and description of a tool created by the VectorStoreToolkit from a vector store.

```text
[
  {
    name: 'state_of_union_address',
    description: 'Useful for when you need to answer questions about state_of_union_address. Whenever you need information about the most recent state of the Union address you should ALWAYS use this. Input should be a fully formed question.'
  }
]
````

---

### Initialize and Query ZepVectorStore

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/zep

Demonstrates how to initialize a ZepVectorStore from documents, wait for server-side embedding completion, and perform similarity and MMR searches.

```typescript
import { ZepVectorStore } from "@langchain/community/vectorstores/zep";
import { FakeEmbeddings } from "@langchain/core/utils/testing";
import { TextLoader } from "@langchain/classic/document_loaders/fs/text";
import { randomUUID } from "crypto";

const loader = new TextLoader("src/document_loaders/example_data/example.txt");
const docs = await loader.load();
export const run = async () => {
  const collectionName = `collection${randomUUID().split("-")[0]}`;

  const zepConfig = {
    apiUrl: "http://localhost:8000",
    collectionName,
    embeddingDimensions: 1536,
    isAutoEmbedded: true,
  };

  const embeddings = new FakeEmbeddings();

  const vectorStore = await ZepVectorStore.fromDocuments(
    docs,
    embeddings,
    zepConfig,
  );

  while (true) {
    const c = await vectorStore.client.document.getCollection(collectionName);
    console.log(
      `Embedding status: ${c.document_embedded_count}/${c.document_count} documents embedded`,
    );
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (c.status === "ready") {
      break;
    }
  }

  const results = await vectorStore.similaritySearchWithScore("bar", 3);
  console.log("Similarity Results:");
  console.log(JSON.stringify(results));

  const results2 = await vectorStore.maxMarginalRelevanceSearch("bar", {
    k: 3,
  });

  console.log("MMR Results:");
  console.log(JSON.stringify(results2));
};
```

---

### Install LangChain and Dependencies (pnpm)

Source: https://docs.langchain.com/oss/javascript/langgraph/sql-agent

Installs the necessary LangChain packages and related dependencies for building a SQL agent using pnpm. Includes langchain, core, classic, langgraph, openai, typeorm, sqlite3, and zod.

```bash
pnpm add langchain @langchain/core @langchain/classic @langchain/langgraph @langchain/openai typeorm sqlite3 zod
```

---

### Implement Dynamic System Prompt using Store

Source: https://docs.langchain.com/oss/javascript/langchain/context-engineering

Shows how to retrieve user preferences from long-term storage to customize the system prompt dynamically.

```typescript
import * as z from "zod";
import { createAgent, dynamicSystemPromptMiddleware } from "langchain";

const contextSchema = z.object({
  userId: z.string(),
});

type Context = z.infer<typeof contextSchema>;

const agent = createAgent({
  model: "gpt-4.1",
  tools: [...],
  contextSchema,
  middleware: [
    dynamicSystemPromptMiddleware<Context>(async (state, runtime) => {
      const userId = runtime.context.userId;
      const store = runtime.store;
      const userPrefs = await store.get(["preferences"], userId);
      let base = "You are a helpful assistant.";
      if (userPrefs) {
        const style = userPrefs.value?.communicationStyle || "balanced";
        base += `\nUser prefers ${style} responses.`;
      }
      return base;
    }),
  ],
});
```

---

### Install LangChain Library

Source: https://docs.langchain.com/oss/javascript/langgraph/install

Installs the main LangChain library to facilitate LLM integration and tool management. This is a recommended dependency for users following the official documentation.

```bash
npm install langchain
```

```bash
pnpm add langchain
```

```bash
yarn add langchain
```

```bash
bun add langchain
```

---

### Install Cheerio Loader Dependencies

Source: https://docs.langchain.com/oss/javascript/integrations/document_loaders/web_loaders/web_cheerio

Commands to install the necessary LangChain community packages and the cheerio peer dependency using various package managers.

```bash
npm install @langchain/community @langchain/core cheerio
```

```bash
yarn add @langchain/community @langchain/core cheerio
```

```bash
pnpm add @langchain/community @langchain/core cheerio
```

---

### Install LangGraph Dependencies

Source: https://docs.langchain.com/oss/javascript/integrations/tools/ibm

Commands to install the @langchain/langgraph package using various popular Node.js package managers.

```bash
npm install @langchain/langgraph
```

```bash
yarn add @langchain/langgraph
```

```bash
pnpm add @langchain/langgraph
```

---

### Install DeepAgents and OpenAI Package (bun)

Source: https://docs.langchain.com/oss/javascript/deepagents/customization

Installs the deepagents package and the OpenAI integration for LangChain using bun. This is a prerequisite for using OpenAI models with DeepAgents.

```bash
bun add @langchain/openai deepagents
```

---

### Install WebLLM SDK and LangChain Packages

Source: https://docs.langchain.com/oss/javascript/integrations/chat/web_llm

Installs the necessary npm packages for WebLLM integration with LangChain JavaScript. This includes the WebLLM SDK, and LangChain community and core packages.

```bash
npm install -S @mlc-ai/web-llm @langchain/community @langchain/core
```

---

### Decodo Amazon Search Tool Example

Source: https://docs.langchain.com/oss/javascript/integrations/tools/decodo

Example demonstrating how to use the Decodo Amazon Search Tool to search for products on Amazon and retrieve structured product data.

````APIDOC
## POST /api/decodo/amazon/search

### Description
Searches for products on Amazon and returns structured product data. Useful for e-commerce related queries.

### Method
POST

### Endpoint
/api/decodo/amazon/search

### Parameters
#### Request Body
- **username** (string) - Required - Your Decodo Web Advanced product username
- **password** (string) - Required - Your Decodo Web Advanced product password
- **query** (string) - Required - The product search query
- **country** (string) - Required - The Amazon domain to search (e.g., "fr" for France)

### Request Example
```json
{
  "username": "YOUR_USERNAME",
  "password": "YOUR_PASSWORD",
  "query": "cheapest laptop with a GeForce RTX 5080",
  "country": "fr"
}
````

### Response

#### Success Response (200)

- **products** (array) - An array of product objects, each containing details like title, price, rating, and URL.

#### Response Example

```json
{
  "products": [
    {
      "title": "Laptop XYZ - RTX 5080 - [Price]",
      "price": "€1500.00",
      "rating": "4.5 stars",
      "url": "https://www.amazon.fr/dp/B0XXXXXXXX"
    }
    // ... more products
  ]
}
```

````

--------------------------------

### Install Postgres Vector Store Package

Source: https://docs.langchain.com/oss/javascript/integrations/providers/google

Installs the package required to use CloudSQL for PostgreSQL as a vector store.

```bash
npm install @langchain/google-cloud-sql-pg
````

---

### Full Example: Chain with Upstash Rate Limiting

Source: https://docs.langchain.com/oss/javascript/integrations/callbacks/upstash_ratelimit_callback

A comprehensive example showcasing the integration of the UpstashRatelimitHandler within a LangChain.js chain. It includes setting up Upstash Redis, defining a rate limiter, initializing the handler, creating a simple chain with an LLM, and invoking the chain while handling potential rate limit errors.

```tsx
const UPSTASH_REDIS_REST_URL = "****";
const UPSTASH_REDIS_REST_TOKEN = "****";
const OPENAI_API_KEY = "****";

import {
  UpstashRatelimitHandler,
  UpstashRatelimitError,
} from "@langchain/community/callbacks/handlers/upstash_ratelimit";
import { RunnableLambda, RunnableSequence } from "@langchain/core/runnables";
import { OpenAI } from "@langchain/openai";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// create ratelimit
const ratelimit = new Ratelimit({
  redis: new Redis({
    url: UPSTASH_REDIS_REST_URL,
    token: UPSTASH_REDIS_REST_TOKEN,
  }),
  // 500 tokens per window, where window size is 60 seconds:
  limiter: Ratelimit.fixedWindow(500, "60 s"),
});

// create handler
const user_id = "user_id"; // should be a method which gets the user id
const handler = new UpstashRatelimitHandler(user_id, {
  tokenRatelimit: ratelimit,
});

// create mock chain
const asStr = new RunnableLambda({ func: (str: string): string => str });
const model = new OpenAI({
  apiKey: OPENAI_API_KEY,
});
const chain = RunnableSequence.from([asStr, model]);

// invoke chain with handler:
try {
  const response = await chain.invoke("hello world", {
    callbacks: [handler],
  });
  console.log(response);
} catch (err) {
  if (err instanceof UpstashRatelimitError) {
    console.log("Handling ratelimit.");
  }
}
```

---

### Install LangChain and Dependencies (yarn)

Source: https://docs.langchain.com/oss/javascript/langgraph/sql-agent

Installs the necessary LangChain packages and related dependencies for building a SQL agent using yarn. Includes langchain, core, classic, langgraph, openai, typeorm, sqlite3, and zod.

```bash
yarn add langchain @langchain/core @langchain/classic @langchain/langgraph @langchain/openai typeorm sqlite3 zod
```

---

### Decodo Universal Tool Example

Source: https://docs.langchain.com/oss/javascript/integrations/tools/decodo

Example demonstrating how to use the Decodo Universal Tool to scrape a Wikipedia page and extract information using LangChain agents.

````APIDOC
## POST /api/decodo/scrape

### Description
Scrapes a given URL and returns the content in Markdown format. This tool can be used for general web scraping tasks.

### Method
POST

### Endpoint
/api/decodo/scrape

### Parameters
#### Request Body
- **username** (string) - Required - Your Decodo Web Advanced product username
- **password** (string) - Required - Your Decodo Web Advanced product password
- **url** (string) - Required - The URL to scrape
- **options** (object) - Optional - Additional scraping options (e.g., for JavaScript rendering, geolocation)

### Request Example
```json
{
  "username": "YOUR_USERNAME",
  "password": "YOUR_PASSWORD",
  "url": "https://en.wikipedia.org/wiki/NBA_2025_season",
  "options": {
    "render_js": true
  }
}
````

### Response

#### Success Response (200)

- **content** (string) - The scraped content in Markdown format

#### Response Example

```json
{
  "content": "# NBA 2025 season\n... (Markdown content of the page) ..."
}
```

````

--------------------------------

### Implement Dynamic Prompt and Logging Middleware

Source: https://docs.langchain.com/oss/javascript/langchain/runtime

This example demonstrates how to define middleware using the createMiddleware function. It shows how to access the runtime context to dynamically modify system messages and log request lifecycle events.

```typescript
import * as z from "zod";
import { createAgent, createMiddleware, SystemMessage } from "langchain";

const contextSchema = z.object({
  userName: z.string(),
});

// Dynamic prompt middleware
const dynamicPromptMiddleware = createMiddleware({
  name: "DynamicPrompt",
  contextSchema,
  beforeModel: (state, runtime) => {
    const userName = runtime.context?.userName;
    if (!userName) {
      throw new Error("userName is required");
    }

    const systemMsg = `You are a helpful assistant. Address the user as ${userName}.`;
    return {
      messages: [new SystemMessage(systemMsg), ...state.messages],
    };
  },
});

// Logging middleware
const loggingMiddleware = createMiddleware({
  name: "Logging",
  contextSchema,
  beforeModel: (state, runtime) => {
    console.log(`Processing request for user: ${runtime.context?.userName}`);
    return;
  },
  afterModel: (state, runtime) => {
    console.log(`Completed request for user: ${runtime.context?.userName}`);
    return;
  },
});

const agent = createAgent({
  model: "gpt-4.1",
  tools: [],
  middleware: [dynamicPromptMiddleware, loggingMiddleware],
  contextSchema,
});

const result = await agent.invoke(
  { messages: [{ role: "user", content: "What's my name?" }] },
  { context: { userName: "John Smith" } }
);
````

---

### Connect to Weaviate Client

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/weaviate

Demonstrates how to initialize a Weaviate client using connection helper functions. It requires environment variables for URL and API keys.

```typescript
import { WeaviateStore } from "@langchain/weaviate";
import { OpenAIEmbeddings } from "@langchain/openai";
import weaviate from "weaviate-client";

const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-small",
});

const weaviateClient = weaviate.connectToWeaviateCloud({
  clusterURL: process.env.WEAVIATE_URL!,
  options: {
    authCredentials: new weaviate.ApiKey(process.env.WEAVIATE_API_KEY || ""),
    headers: {
      "X-OpenAI-Api-Key": process.env.OPENAI_API_KEY || "",
      "X-Cohere-Api-Key": process.env.COHERE_API_KEY || "",
    },
  },
});
```

---

### Install LangChain package

Source: https://docs.langchain.com/oss/javascript/integrations/document_loaders/file_loaders/text

Commands to install the necessary langchain package using common Node.js package managers.

```bash
npm install langchain
```

```bash
yarn add langchain
```

```bash
pnpm add langchain
```

---

### Install Sandbox Provider Dependencies

Source: https://docs.langchain.com/oss/javascript/deepagents/cli

Installs the DeepAgents CLI with specific provider-side dependencies for remote sandbox support.

```bash
uv tool install deepagents-cli --with langchain-agentcore-codeinterpreter
uv tool install deepagents-cli --with langchain-daytona
uv tool install deepagents-cli --with langchain-runloop
uv tool install deepagents-cli --with langchain-modal
```

---

### Install Project Dependencies

Source: https://docs.langchain.com/oss/javascript/langgraph/studio

Installs all project dependencies using Yarn, ensuring all necessary packages are available for the LangChain agent and LangGraph CLI to function correctly.

```shell
yarn install
```

---

### Initialize Agent with PostgresSaver Checkpointer (JavaScript)

Source: https://docs.langchain.com/oss/javascript/langchain/short-term-memory

Shows how to configure a LangChain agent to use a PostgresSaver checkpointer for production environments, enabling persistent storage of conversation state in a PostgreSQL database.

```typescript
import { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

const DB_URI =
  "postgresql://postgres:postgres@localhost:5442/postgres?sslmode=disable";
const checkpointer = PostgresSaver.fromConnString(DB_URI);
```

---

### Install deepagents-acp Package

Source: https://docs.langchain.com/oss/javascript/deepagents/acp

Install the ACP integration package for Node.js environments using npm, yarn, or pnpm.

```bash
npm install deepagents-acp
```

```bash
yarn add deepagents-acp
```

```bash
pnpm add deepagents-acp
```

---

### Configure Multiple MCP Servers

Source: https://docs.langchain.com/oss/javascript/deepagents/cli/mcp-tools

This configuration demonstrates setting up multiple MCP servers, including stdio-based servers for local commands (like filesystem and GitHub) and a remote SSE server for database access. Tools from all configured servers are merged and made available to the agent.

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/home/user/projects"
      ]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_TOKEN": "ghp_..." }
    },
    "database": {
      "type": "sse",
      "url": "https://db-mcp.internal:8080/mcp",
      "headers": { "Authorization": "Bearer ..." }
    }
  }
}
```

---

### Install Langchain Modal Package

Source: https://docs.langchain.com/oss/javascript/integrations/providers/modal

Installs the Langchain Modal package using npm, yarn, or pnpm. This is the first step to using Modal sandboxes with Langchain.

```bash
npm install @langchain/modal
```

```bash
yarn add @langchain/modal
```

```bash
pnpm add @langchain/modal
```

---

### Quickstart LangChain Agent with Tracing (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langchain/observability

Demonstrates how to create and invoke a LangChain agent in TypeScript. When LangSmith tracing is enabled via environment variables, all agent invocations and tool calls are automatically logged to LangSmith.

```typescript
import { createAgent } from "@langchain/agents";

function sendEmail(to: string, subject: string, body: string): string {
  // ... email sending logic
  return `Email sent to ${to}`;
}

function searchWeb(query: string): string {
  // ... web search logic
  return `Search results for: ${query}`;
}

const agent = createAgent({
  model: "gpt-4.1",
  tools: [sendEmail, searchWeb],
  systemPrompt:
    "You are a helpful assistant that can send emails and search the web.",
});

// Run the agent - all steps will be traced automatically
const response = await agent.invoke({
  messages: [
    {
      role: "user",
      content:
        "Search for the latest AI news and email a summary to john@example.com",
    },
  ],
});
```

---

### Install Deep Agents CLI with Model Providers

Source: https://docs.langchain.com/oss/javascript/deepagents/cli/providers

Commands to install the Deep Agents CLI along with specific or all available LangChain model provider packages using shell scripts or uv.

```bash
DEEPAGENTS_EXTRAS="anthropic,groq" curl -LsSf https://raw.githubusercontent.com/langchain-ai/deepagents/refs/heads/main/libs/cli/scripts/install.sh | bash
uv tool install 'deepagents-cli[anthropic,groq]'
uv tool install deepagents-cli --with langchain-ollama
uv tool install 'deepagents-cli[anthropic,baseten,bedrock,cohere,deepseek,fireworks,google-genai,groq,huggingface,ibm,litellm,mistralai,nvidia,ollama,openai,openrouter,perplexity,vertexai,xai]'
```

---

### Langchain UI Patterns SDK Initialization and Event Handling (JavaScript)

Source: https://docs.langchain.com/oss/javascript/langchain/frontend/branching-chat

Initializes the Langchain UI Patterns SDK, sets up message listeners for communication with the guest iframe, and exposes methods for controlling the UI and subscribing to events. It handles messages from the guest and dispatches them to registered callbacks. Dependencies include the browser's window object.

```javascript
function createLangchainUiPatternsSdk(options) {
  const { guestIframe, targetOrigin } = options;
  const listeners = new Map();
  const messageQueue = [];

  function postToGuest(message) {
    const payload = JSON.stringify(message);
    if (guestIframe && guestIframe.contentWindow) {
      guestIframe.contentWindow.postMessage(payload, targetOrigin);
    } else {
      messageQueue.push(payload);
    }
  }

  function handleMessage(event) {
    if (event.origin !== targetOrigin) {
      return;
    }
    try {
      const message = JSON.parse(event.data);
      const { type } = message;
      if (listeners.has(type)) {
        listeners.get(type).forEach((callback) => callback(message));
      }
    } catch (e) {
      console.error("Failed to parse message or dispatch event:", e);
    }
  }

  function addListener(type, callback) {
    if (!listeners.has(type)) {
      listeners.set(type, new Set());
    }
    listeners.get(type).add(callback);
    return () => {
      listeners.get(type).delete(callback);
      if (listeners.get(type).size === 0) {
        listeners.delete(type);
      }
    };
  }

  if (guestIframe) {
    window.addEventListener("message", handleMessage);
    // Process any queued messages once the iframe is ready
    messageQueue.forEach((payload) => {
      if (guestIframe && guestIframe.contentWindow) {
        guestIframe.contentWindow.postMessage(payload, targetOrigin);
      }
    });
    messageQueue.length = 0; // Clear the queue
  } else {
    console.warn(
      "guestIframe not provided. SDK will not be able to communicate.",
    );
  }

  return {
    setTheme(theme) {
      postToGuest({
        type: "SET_THEME",
        theme,
      });
    },
    setPattern(slug) {
      postToGuest({
        type: "SET_PATTERN",
        slug,
      });
    },
    setView(view) {
      postToGuest({
        type: "SET_VIEW",
        view,
      });
    },
    setLanguage(language) {
      postToGuest({
        type: "SET_LANGUAGE",
        language,
      });
    },
    updateCode(files, entryFile) {
      postToGuest({
        type: "UPDATE_CODE",
        files,
        entryFile,
      });
    },
    reset() {
      postToGuest({
        type: "RESET",
      });
    },
    trackEvent(name, properties) {
      postToGuest({
        type: "TRACK_EVENT",
        name,
        properties,
      });
    },
    onReady(callback) {
      return addListener("READY", callback);
    },
    onResize(callback) {
      return addListener("RESIZE", callback);
    },
    onError(callback) {
      return addListener("ERROR", callback);
    },
    onRunStarted(callback) {
      return addListener("RUN_STARTED", callback);
    },
    onTraceUrl(callback) {
      return addListener("TRACE_URL", callback);
    },
    onThreadCleared(callback) {
      return addListener("THREAD_CLEARED", callback);
    },
    destroy() {
      window.removeEventListener("message", handleMessage);
      listeners.clear();
    },
  };
}
```

---

### Install Elasticsearch Vector Store Dependencies

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/elasticsearch

Commands to install the necessary LangChain community packages, the Elasticsearch client, and OpenAI embeddings for vector store functionality.

```bash
npm install @langchain/community @elastic/elasticsearch @langchain/openai @langchain/core
```

```bash
yarn add @langchain/community @elastic/elasticsearch @langchain/openai @langchain/core
```

```bash
pnpm add @langchain/community @elastic/elasticsearch @langchain/openai @langchain/core
```

---

### SearxngSearch Tool Initialization

Source: https://docs.langchain.com/oss/javascript/integrations/tools/searxng

Details on how to instantiate and configure the SearxngSearch tool for use within a LangChain agent.

```APIDOC
## SearxngSearch Tool Initialization

### Description
Initializes the SearxngSearch tool wrapper to enable internet search capabilities for LLM agents.

### Method
Constructor

### Endpoint
N/A (Tool Class)

### Parameters
#### Request Body
- **params** (object) - Required - Configuration for the search query, must include `format: "json"`.
- **headers** (object) - Optional - Custom HTTP headers for authentication or instance-specific requirements.

### Request Example
{
  "params": {
    "format": "json",
    "engines": "google"
  },
  "headers": {}
}

### Response
#### Success Response (200)
- **result** (object) - The search results returned by the Searxng API in JSON format.

#### Response Example
{
  "results": [
    {
      "title": "LangChain Documentation",
      "url": "https://docs.langchain.com",
      "content": "LangChain is a framework for developing applications powered by language models..."
    }
  ]
}
```

---

### Install AWS LangChain Dependencies

Source: https://docs.langchain.com/oss/javascript/langchain/multi-agent/handoffs-customer-support

Provides commands for installing the @langchain/aws package using various JavaScript package managers.

```bash
npm install @langchain/aws
```

```bash
pnpm install @langchain/aws
```

```bash
yarn add @langchain/aws
```

```bash
bun add @langchain/aws
```

---

### Langchain UI SDK Initialization and Methods

Source: https://docs.langchain.com/oss/javascript/langchain/frontend/structured-output

This section details how to initialize the Langchain UI SDK and provides an overview of the available methods for controlling themes, patterns, views, languages, code updates, and event tracking.

````APIDOC
## Langchain UI SDK

### Description

The Langchain UI SDK allows for programmatic interaction with Langchain's UI patterns. It provides methods to customize the appearance and behavior of the UI, as well as to receive events from it.

### Initialization

The SDK is initialized by calling the `createLangchainUI` function, which returns an object with various methods and event listeners.

```javascript
const langchainUI = createLangchainUI(options);
````

### Methods

- **`setTheme(theme: string)`**: Sets the theme of the UI.
- **`setPattern(slug: string)`**: Sets the active pattern by its slug.
- **`setView(view: string)`**: Sets the current view of the UI.
- **`setLanguage(language: string)`**: Sets the language for the UI.
- **`updateCode(files: object, entryFile: string)`**: Updates the code displayed in the UI.
- **`reset()`**: Resets the UI to its default state.
- **`trackEvent(name: string, properties: object)`**: Tracks a custom event with associated properties.

### Event Listeners

- **`onReady(callback: function)`**: Registers a callback to be executed when the UI is ready.
- **`onResize(callback: function)`**: Registers a callback to be executed when the UI is resized.
- **`onError(callback: function)`**: Registers a callback to be executed when an error occurs.
- **`onRunStarted(callback: function)`**: Registers a callback to be executed when a run is started.
- **`onTraceUrl(callback: function)`**: Registers a callback to be executed when a trace URL is available.
- **`onThreadCleared(callback: function)`**: Registers a callback to be executed when the thread is cleared.

### Cleanup

- **`destroy()`**: Removes event listeners and cleans up the SDK instance.

````

--------------------------------

### Install Azure OpenAI Packages with npm, pnpm, yarn, bun

Source: https://docs.langchain.com/oss/javascript/deepagents/customization

Installs the necessary Langchain and deepagents packages for Azure OpenAI integration using various package managers.

```bash
pnpm install @langchain/azure deepagents
````

```bash
yarn add @langchain/azure deepagents
```

```bash
bun add @langchain/azure deepagents
```

---

### Initialize Weaviate VectorStore

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/weaviate

Shows how to create a WeaviateStore instance. Includes both basic initialization and advanced configuration using schemas, vectorizers, and generative models.

```typescript
const vectorStore = new WeaviateStore(embeddings, {
  client: weaviateClient,
  indexName: "Langchainjs_test",
});

const vectorStoreAdvanced = new WeaviateStore(embeddings, {
  client: weaviateClient,
  schema: {
    name: "Langchainjs_test",
    description: "A simple dataset",
    properties: [
      { name: "title", dataType: dataType.TEXT },
      { name: "foo", dataType: dataType.TEXT },
    ],
    vectorizers: [
      vectorizer.text2VecOpenAI({
        name: "title",
        sourceProperties: ["title"],
      }),
    ],
    generative: weaviate.configure.generative.openAI(),
    reranker: weaviate.configure.reranker.cohere(),
  },
});
```

---

### Install VertexAIEmbeddings Dependencies

Source: https://docs.langchain.com/oss/javascript/integrations/embeddings/google_vertex_ai

Commands to install the required LangChain Google Vertex AI integration package and core dependencies using various package managers.

```npm
npm install @langchain/google-vertexai @langchain/core
```

```yarn
yarn add @langchain/google-vertexai @langchain/core
```

```pnpm
pnpm add @langchain/google-vertexai @langchain/core
```

---

### Initialize Local Shell Tool with LangChain

Source: https://docs.langchain.com/oss/javascript/integrations/tools/openai

Shows how to set up the Local Shell tool to execute system commands. It uses a child_process exec wrapper to safely run commands requested by the model in a specified working directory.

```typescript
import { ChatOpenAI, tools } from "@langchain/openai";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);
const model = new ChatOpenAI({ model: "codex-mini-latest" });

const shell = tools.localShell({
  execute: async (action) => {
    const { command, env, working_directory, timeout_ms } = action;
    const result = await execAsync(command.join(" "), {
      cwd: working_directory ?? process.cwd(),
      env: { ...process.env, ...env },
      timeout: timeout_ms ?? undefined,
    });
    return result.stdout + result.stderr;
  },
});

const llmWithShell = model.bindTools([shell]);
const response = await llmWithShell.invoke(
  "List files in the current directory",
);
```

---

### Complete Hybrid Search Implementation

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/elasticsearch

A comprehensive example showing the full lifecycle of setting up the Elasticsearch client, initializing the hybrid vector store, adding documents, and performing a hybrid search.

```typescript
import { Client, ClientOptions } from "@elastic/elasticsearch";
import { OpenAIEmbeddings } from "@langchain/openai";
import {
  ElasticClientArgs,
  ElasticVectorSearch,
  HybridRetrievalStrategy,
} from "@langchain/community/vectorstores/elasticsearch";
import { Document } from "@langchain/core/documents";

const config: ClientOptions = {
  node: process.env.ES_LOCAL_URL ?? "http://127.0.0.1:9200",
};
const embeddings = new OpenAIEmbeddings();

const vectorStore = new ElasticVectorSearch(embeddings, {
  client: new Client(config),
  indexName: "test_hybrid_search",
  strategy: new HybridRetrievalStrategy({
    rankWindowSize: 100,
    rankConstant: 60,
    textField: "text",
  }),
});

await vectorStore.addDocuments([
  new Document({
    pageContent: "Running improves cardiovascular health and endurance",
    metadata: { category: "fitness" },
  }),
  new Document({
    pageContent: "Proper hydration prevents muscle cramps during exercise",
    metadata: { category: "fitness" },
  }),
]);

const results = await vectorStore.similaritySearch(
  "how to prevent muscle soreness while running",
  3,
);
console.log(results);
```

---

### Instantiate CheerioWebBaseLoader

Source: https://docs.langchain.com/oss/javascript/integrations/document_loaders/web_loaders/web_cheerio

Demonstrates how to import and initialize the CheerioWebBaseLoader with a target URL to begin loading document content.

```typescript
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";

const loader = new CheerioWebBaseLoader(
  "https://news.ycombinator.com/item?id=34817881",
  {
    // optional params: ...
  },
);
```

---

### Install DuckDuckGoSearch dependencies

Source: https://docs.langchain.com/oss/javascript/integrations/tools/duckduckgo_search

Commands to install the required @langchain/community, @langchain/core, and duck-duck-scrape packages using various package managers.

```bash
npm install @langchain/community @langchain/core duck-duck-scrape
```

```bash
yarn add @langchain/community @langchain/core duck-duck-scrape
```

```bash
pnpm add @langchain/community @langchain/core duck-duck-scrape
```

---

### Configure LLM Tool Emulator Options (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langchain/middleware/built-in

This example illustrates various ways to configure the `toolEmulatorMiddleware`, including emulating specific tools by name or by passing tool instances, and using a custom LLM for generating emulated responses. It requires `langchain` and `zod` for schema definition.

```typescript
import { createAgent, toolEmulatorMiddleware, tool } from "langchain";
import * as z from "zod";

const getWeather = tool(async ({ location }) => `Weather in ${location}`, {
  name: "get_weather",
  description: "Get the current weather for a location",
  schema: z.object({ location: z.string() }),
});

const sendEmail = tool(async ({ to, subject, body }) => "Email sent", {
  name: "send_email",
  description: "Send an email",
  schema: z.object({
    to: z.string(),
    subject: z.string(),
    body: z.string(),
  }),
});

// Emulate all tools (default behavior)
const agent = createAgent({
  model: "gpt-4.1",
  tools: [getWeather, sendEmail],
  middleware: [toolEmulatorMiddleware()],
});

// Emulate specific tools by name
const agent2 = createAgent({
  model: "gpt-4.1",
  tools: [getWeather, sendEmail],
  middleware: [
    toolEmulatorMiddleware({
      tools: ["get_weather"],
    }),
  ],
});

// Emulate specific tools by passing tool instances
const agent3 = createAgent({
  model: "gpt-4.1",
  tools: [getWeather, sendEmail],
  middleware: [
    toolEmulatorMiddleware({
      tools: [getWeather],
    }),
  ],
});

// Use custom model for emulation
const agent5 = createAgent({
  model: "gpt-4.1",
  tools: [getWeather, sendEmail],
  middleware: [
    toolEmulatorMiddleware({
      model: "claude-sonnet-4-6",
    }),
  ],
});
```

---

### Install Gradient AI SDK and LangChain Dependencies

Source: https://docs.langchain.com/oss/javascript/integrations/embeddings/gradient_ai

Installs the necessary npm packages for Gradient AI integration with LangChain JavaScript, including `@langchain/community`, `@langchain/core`, and the official `@gradientai/nodejs-sdk`.

```bash
npm i @langchain/community @langchain/core @gradientai/nodejs-sdk
```

---

### Install LangChain OpenRouter Package

Source: https://docs.langchain.com/oss/javascript/integrations/chat/openrouter

Install the `@langchain/openrouter` package along with `@langchain/core` to enable the ChatOpenRouter integration. Supports npm, yarn, and pnpm package managers.

```bash
npm install @langchain/openrouter @langchain/core
```

```bash
yarn add @langchain/openrouter @langchain/core
```

```bash
pnpm add @langchain/openrouter @langchain/core
```

---

### Install Upstash Redis dependencies

Source: https://docs.langchain.com/oss/javascript/integrations/stores/upstash_redis_storage

Command to install the necessary LangChain community and Upstash Redis packages via npm.

```bash
npm install @langchain/community @langchain/core @upstash/redis
```

---

### Install Tigris and LangChain Dependencies

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/tigris

Commands to install the necessary Tigris SDK and LangChain OpenAI packages via npm. These are required to interact with the Tigris vector database and generate embeddings.

```bash
npm install -S @tigrisdata/vector
npm install -S @langchain/openai
```

---

### Install Chroma Dependencies (npm, yarn, pnpm)

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/chroma

Installs the required LangChain community and OpenAI packages, along with the chromadb peer dependency, using different package managers.

```bash
npm install @langchain/community @langchain/openai @langchain/core chromadb
```

```bash
yarn add @langchain/community @langchain/openai @langchain/core chromadb
```

```bash
pnpm add @langchain/community @langchain/openai @langchain/core chromadb
```

---

### Install LangChain and Azure SDKs

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/azure_aisearch

Installs the necessary LangChain community package and the Azure AI Search documents SDK using npm. This is a prerequisite for integrating Azure AI Search with LangChain JavaScript.

```bash
npm install -S @langchain/community @langchain/core @azure/search-documents
```

---

### Install Zep Cloud and LangChain Packages

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/zep_cloud

Installs the necessary npm packages for Zep Cloud integration with LangChain JavaScript, including the Zep Cloud VectorStore, OpenAI embeddings, and core LangChain utilities.

```bash
npm install @getzep/zep-cloud @langchain/openai @langchain/community @langchain/core
```

---

### Create and Query Zep Cloud VectorStore in JavaScript

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/zep_cloud

Demonstrates how to create a ZepCloudVectorStore from documents using LangChain JavaScript. It initializes the store with fake embeddings (as Zep handles embedding), loads documents, configures Zep Cloud connection, and performs both similarity and MMR searches. The example includes a loop to wait for document embedding completion.

```typescript
import { ZepCloudVectorStore } from "@langchain/community/vectorstores/zep_cloud";
import { FakeEmbeddings } from "@langchain/core/utils/testing";
import { TextLoader } from "@langchain/classic/document_loaders/fs/text";
import { randomUUID } from "crypto";

const loader = new TextLoader("src/document_loaders/example_data/example.txt");
const docs = await loader.load();
const collectionName = `collection${randomUUID().split("-")[0]}`;

const zepConfig = {
  // Your Zep Cloud Project API key https://help.getzep.com/projects
  apiKey: "<Zep Api Key>",
  collectionName,
};

// We're using fake embeddings here, because Zep Cloud handles embedding for you
const embeddings = new FakeEmbeddings();

const vectorStore = await ZepCloudVectorStore.fromDocuments(
  docs,
  embeddings,
  zepConfig,
);

// Wait for the documents to be embedded
// eslint-disable-next-line no-constant-condition
while (true) {
  const c = await vectorStore.client.document.getCollection(collectionName);
  console.log(
    `Embedding status: ${c.documentEmbeddedCount}/${c.documentCount} documents embedded`,
  );
  // eslint-disable-next-line no-promise-executor-return
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (c.documentEmbeddedCount === c.documentCount) {
    break;
  }
}

const results = await vectorStore.similaritySearchWithScore("bar", 3);

console.log("Similarity Results:");
console.log(JSON.stringify(results));

const results2 = await vectorStore.maxMarginalRelevanceSearch("bar", {
  k: 3,
});

console.log("MMR Results:");
console.log(JSON.stringify(results2));
```

---

### Install Anthropic LangChain Packages

Source: https://docs.langchain.com/oss/javascript/integrations/providers/anthropic

Installs the required npm packages for Anthropic integration within a LangChain JavaScript project.

```bash
npm install @langchain/anthropic @langchain/core
```

---

### Langchain UI SDK Initialization and Event Handling (JavaScript)

Source: https://docs.langchain.com/oss/javascript/langchain/frontend/structured-output

Initializes the Langchain UI SDK, sets up message listeners for communication with the guest iframe, and exposes methods to control UI components and listen for events. It handles message passing for various actions like setting themes, patterns, views, languages, updating code, resetting, and tracking events.

```javascript
function createLangchainUiSdk(guestWindow) {
  const listeners = new Map();
  const addListener = (type, callback) => {
    listeners.set(type, callback);
    return () => listeners.delete(type);
  };
  const postToGuest = (msg) => {
    guestWindow.postMessage(msg, "*");
  };
  const handleMessage = (event) => {
    const msg = event.data;
    if (msg.type === "READY") {
      const cb = listeners.get("READY");
      if (cb) cb();
    } else if (msg.type === "RESIZE") {
      const cb = listeners.get("RESIZE");
      if (cb) cb(msg.width, msg.height);
    } else if (msg.type === "ERROR") {
      const cb = listeners.get("ERROR");
      if (cb) cb(msg.error);
    } else if (msg.type === "RUN_STARTED") {
      const cb = listeners.get("RUN_STARTED");
      if (cb) cb(msg.runId);
    } else if (msg.type === "TRACE_URL") {
      const cb = listeners.get("TRACE_URL");
      if (cb) cb(msg.url, msg.runId);
    } else if (msg.type === "THREAD_CLEARED") {
      const cb = listeners.get("THREAD_CLEARED");
      if (cb) cb();
    }
  };
  window.addEventListener("message", handleMessage);
  return {
    setTheme(theme) {
      postToGuest({
        type: "SET_THEME",
        theme,
      });
    },
    setPattern(slug) {
      postToGuest({
        type: "SET_PATTERN",
        slug,
      });
    },
    setView(view) {
      postToGuest({
        type: "SET_VIEW",
        view,
      });
    },
    setLanguage(language) {
      postToGuest({
        type: "SET_LANGUAGE",
        language,
      });
    },
    updateCode(files, entryFile) {
      postToGuest({
        type: "UPDATE_CODE",
        files,
        entryFile,
      });
    },
    reset() {
      postToGuest({
        type: "RESET",
      });
    },
    trackEvent(name, properties) {
      postToGuest({
        type: "TRACK_EVENT",
        name,
        properties,
      });
    },
    onReady(callback) {
      return addListener("READY", callback);
    },
    onResize(callback) {
      return addListener("RESIZE", callback);
    },
    onError(callback) {
      return addListener("ERROR", callback);
    },
    onRunStarted(callback) {
      return addListener("RUN_STARTED", callback);
    },
    onTraceUrl(callback) {
      return addListener("TRACE_URL", callback);
    },
    onThreadCleared(callback) {
      return addListener("THREAD_CLEARED", callback);
    },
    destroy() {
      window.removeEventListener("message", handleMessage);
      listeners.clear();
    },
  };
}
```

---

### Install MariaDB and LangChain dependencies

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/mariadb

Commands to install the required packages for MariaDB vector store integration, including the community package, OpenAI embeddings, and peer dependencies.

```bash
npm install @langchain/community @langchain/openai @langchain/core mariadb uuid
```

```bash
yarn add @langchain/community @langchain/openai @langchain/core mariadb uuid
```

```bash
pnpm add @langchain/community @langchain/openai @langchain/core mariadb uuid
```

---

### RAG with SAP HANA VectorStore

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/hanavector

This example demonstrates setting up a LangChain retrieval chain using SAP HANA as the vector store. It includes connecting to HANA, initializing the vector store with embeddings, creating a question-answering prompt, and invoking the chain with user queries.

````APIDOC
## Using a VectorStore as a retriever in chains for retrieval augmented generation (RAG)

### Description
This example demonstrates how to use a VectorStore, specifically SAP HANA, as a retriever within LangChain chains for Retrieval Augmented Generation (RAG). It covers connecting to SAP HANA, initializing the vector store, setting up a retrieval chain with a language model and prompt, and invoking the chain to answer questions based on the retrieved documents.

### Method
This is a conceptual example demonstrating the integration of a vector store within a LangChain RAG pipeline. It does not represent a specific HTTP API endpoint but rather a code-based workflow.

### Endpoint
N/A (Code-based workflow)

### Parameters
N/A

### Request Example
N/A

### Response
#### Success Response
- **answer** (string) - The generated answer to the user's question based on the retrieved context.
- **context** (Array<Document>) - An array of document chunks retrieved from the vector store that were used to generate the answer.

#### Response Example
```json
{
  "answer": "The United States has set up joint patrols with Mexico and Guatemala to catch more human traffickers.",
  "context": [
    { "pageContent": "...", "metadata": {...} },
    { "pageContent": "...", "metadata": {...} },
    { "pageContent": "...", "metadata": {...} },
    { "pageContent": "...", "metadata": {...} }
  ]
}
````

### Error Handling

- Connection errors to SAP HANA will be rejected.
- Errors during chain invocation will propagate.

````

--------------------------------

### Install Crypto-JS for Browser Environment

Source: https://docs.langchain.com/oss/javascript/integrations/embeddings/tencent_hunyuan

Installs the crypto-js package, which is required when using LangChain.js in a browser environment for specific functionalities.

```bash
npm install crypto-js
````

---

### Production Checkpointer with PostgreSQL

Source: https://docs.langchain.com/oss/javascript/langchain/short-term-memory

Example of configuring a checkpointer for production environments using a PostgreSQL database.

````APIDOC
## Production Checkpointer with PostgreSQL

### Description
In production, it's recommended to use a checkpointer backed by a persistent database. This example shows how to configure a checkpointer using PostgreSQL.

### Method
N/A (Configuration)

### Endpoint
N/A (Configuration)

### Parameters
#### Request Body
N/A

### Request Example
N/A

### Response
N/A

### Code Example (TypeScript)
```ts
import { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

const DB_URI = "postgresql://postgres:postgres@localhost:5442/postgres?sslmode=disable";
const checkpointer = PostgresSaver.fromConnString(DB_URI);
````

````

--------------------------------

### Install LangGraph and Core Packages

Source: https://docs.langchain.com/oss/javascript/langgraph

Installs the necessary LangGraph and LangChain core packages using npm. These packages provide the core functionalities for building and running stateful agents.

```bash
npm install @langchain/langgraph @langchain/core
````

---

### Install LangChain Core Package

Source: https://docs.langchain.com/oss/javascript/integrations/document_loaders/web_loaders/langsmith

Installs the @langchain/core package required for using the LangSmithLoader using various package managers.

```bash
npm install @langchain/core
```

```bash
yarn add @langchain/core
```

```bash
pnpm add @langchain/core
```

---

### Create a Deep Agent with Tools

Source: https://docs.langchain.com/oss/javascript/deepagents/overview

Demonstrates how to create a deep agent using the `deepagents` library. It defines a weather tool using `langchain`'s `tool` decorator and then initializes the agent with this tool and a system prompt. The agent is then invoked with a user query.

```typescript
import * as z from "zod";
// npm install deepagents langchain @langchain/core
import { createDeepAgent } from "deepagents";
import { tool } from "langchain";

const getWeather = tool(({ city }) => `It's always sunny in ${city}!`, {
  name: "get_weather",
  description: "Get the weather for a given city",
  schema: z.object({
    city: z.string(),
  }),
});

const agent = createDeepAgent({
  tools: [getWeather],
  system: "You are a helpful assistant",
});

console.log(
  await agent.invoke({
    messages: [{ role: "user", content: "What's the weather in Tokyo?" }],
  }),
);
```

---

### Install Playwright Dependencies

Source: https://docs.langchain.com/oss/javascript/integrations/document_loaders/web_loaders/web_playwright

Installs the necessary LangChain JavaScript packages and Playwright for web scraping. This is a prerequisite for using the PlaywrightWebBaseLoader.

```bash
npm install @langchain/community @langchain/core playwright
```

---

### Instantiate Bedrock Model

Source: https://docs.langchain.com/oss/javascript/integrations/llms/bedrock

Initialize the Bedrock model using LangChain. This example demonstrates configuration for credentials, region, and model parameters.

```typescript
import { Bedrock } from "@langchain/community/llms/bedrock";
import { getEnvironmentVariable } from "@langchain/core/utils/env";

const llm = new Bedrock({
  model: "anthropic.claude-v2",
  region: "us-east-1",
  credentials: {
    accessKeyId: getEnvironmentVariable("BEDROCK_AWS_ACCESS_KEY_ID"),
    secretAccessKey: getEnvironmentVariable("BEDROCK_AWS_SECRET_ACCESS_KEY"),
  },
  temperature: 0,
  maxTokens: undefined,
  maxRetries: 2,
});
```

```typescript
import { Bedrock } from "@langchain/community/llms/bedrock";

const llm = new Bedrock({
  model: "anthropic.claude-v2",
  region: process.env.BEDROCK_AWS_REGION ?? "us-east-1",
  credentials: {
    accessKeyId: process.env.BEDROCK_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.BEDROCK_AWS_SECRET_ACCESS_KEY,
  },
  temperature: 0,
  maxTokens: undefined,
  maxRetries: 2,
});
```

---

### BrowserbaseLoader Initialization

Source: https://docs.langchain.com/oss/javascript/integrations/document_loaders/web_loaders/browserbase

How to initialize and use the BrowserbaseLoader to fetch web content into LangChain documents.

````APIDOC
## BrowserbaseLoader Initialization

### Description
Initializes the BrowserbaseLoader to fetch content from specified URLs using the Browserbase headless browser platform.

### Method
Constructor

### Endpoint
@langchain/community/document_loaders/web/browserbase

### Parameters
#### Path Parameters
- **urls** (Array<string>) - Required - A list of URLs to load.

#### Options
- **textContent** (boolean) - Optional - If true, retrieves only the text content. Defaults to false.
- **sessionId** (string) - Optional - Provide an existing Browserbase Session ID.
- **proxy** (boolean) - Optional - Enable or disable proxies.

### Request Example
```typescript
import { BrowserbaseLoader } from "@langchain/community/document_loaders/web/browserbase";

const loader = new BrowserbaseLoader(["https://example.com"], {
  textContent: true,
});
const docs = await loader.load();
````

### Response

#### Success Response (200)

- **docs** (Array<Document>) - An array of LangChain Document objects containing the loaded content.

````

--------------------------------

### Install FirecrawlLoader Dependencies

Source: https://docs.langchain.com/oss/javascript/integrations/document_loaders/web_loaders/firecrawl

Installs the required LangChain community packages and the Firecrawl SDK using various package managers.

```npm
npm install @langchain/community @langchain/core @mendable/firecrawl-js@0.0.36
````

```yarn
yarn add @langchain/community @langchain/core @mendable/firecrawl-js@0.0.36
```

```pnpm
pnpm add @langchain/community @langchain/core @mendable/firecrawl-js@0.0.36
```

---

### Install LangChain Model Packages

Source: https://docs.langchain.com/oss/javascript/integrations/chat/index

Commands to install specific LangChain integration packages using npm, yarn, or pnpm. Choose the package corresponding to your desired AI provider.

```bash
npm i @langchain/openai @langchain/anthropic @langchain/google @langchain/mistralai @langchain/community
```

```bash
yarn add @langchain/openai @langchain/anthropic @langchain/google @langchain/mistralai @langchain/community
```

```bash
pnpm add @langchain/openai @langchain/anthropic @langchain/google @langchain/mistralai @langchain/community
```

---

### Install CSVLoader dependencies

Source: https://docs.langchain.com/oss/javascript/integrations/document_loaders/file_loaders/csv

Install the required @langchain/community package and d3-dsv peer dependency using your preferred package manager.

```bash
npm install @langchain/community @langchain/core d3-dsv@2
```

```bash
yarn add @langchain/community @langchain/core d3-dsv@2
```

```bash
pnpm add @langchain/community @langchain/core d3-dsv@2
```

---

### Install Subtitle Parser Dependency

Source: https://docs.langchain.com/oss/javascript/integrations/document_loaders/file_loaders/subtitles

Install the required srt-parser-2 package to enable subtitle file parsing functionality in your project.

```bash
npm install srt-parser-2
```

---

### Configure Sandbox Provider Credentials

Source: https://docs.langchain.com/oss/javascript/deepagents/cli

Sets environment variables or runs setup commands required to authenticate with remote sandbox providers.

```bash
export LANGSMITH_API_KEY="your-key"
export AWS_ACCESS_KEY_ID="your-key"
export AWS_SECRET_ACCESS_KEY="your-secret"
export AWS_SESSION_TOKEN="session-token"
export AWS_REGION="us-west-2"
export DAYTONA_API_KEY="your-key"
export RUNLOOP_API_KEY="your-key"
modal setup
```

---

### Initialize and Use Google Trends Tool

Source: https://docs.langchain.com/oss/javascript/integrations/tools/google_trends

Demonstrates how to import the SERPGoogleTrendsTool, initialize it, and invoke it with a search term to retrieve trend data.

```typescript
import { SERPGoogleTrendsTool } from "@langchain/community/tools/google_trends";

export async function run() {
  const tool = new SERPGoogleTrendsTool();

  const res = await tool.invoke("Monster");

  console.log(res);
}
```

---

### StateBackend Usage

Source: https://docs.langchain.com/oss/javascript/deepagents/skills

Example of creating and invoking a deep agent using the StateBackend.

````APIDOC
## Create and Invoke Deep Agent with StateBackend

### Description
This example demonstrates how to initialize a deep agent with a StateBackend and invoke it with user messages and skill files.

### Method
POST (implicitly via agent.invoke)

### Endpoint
N/A (Client-side SDK method)

### Parameters
#### Request Body (for agent.invoke)
- **messages** (list[object]) - Required - The list of messages for the agent.
- **files** (Record<string, FileData>) - Required - A mapping of virtual file paths to FileData objects.

### Request Example
```json
{
  "messages": [
    {
      "role": "user",
      "content": "what is langraph? Use the langgraph-docs skill if available."
    }
  ],
  "files": {
    "/skills/langgraph-docs/SKILL.md": {
      "content": ["...skill content..."],
      "created_at": "2023-10-27T10:00:00.000Z",
      "modified_at": "2023-10-27T10:00:00.000Z"
    }
  }
}
````

### Response

#### Success Response (200)

- **result** (object) - The agent's response.

#### Response Example

```json
{
  "output": "LangGraph is a library for..."
}
```

````

--------------------------------

### Install ChatAnthropic Integration Package

Source: https://docs.langchain.com/oss/javascript/integrations/chat/anthropic

Installs the necessary @langchain/anthropic and @langchain/core packages using common JavaScript package managers.

```bash
npm install @langchain/anthropic @langchain/core
````

```bash
yarn add @langchain/anthropic @langchain/core
```

```bash
pnpm add @langchain/anthropic @langchain/core
```

---

### Basic Short-Term Memory Implementation

Source: https://docs.langchain.com/oss/javascript/langchain/short-term-memory

This example demonstrates how to add basic short-term memory to an agent using the MemorySaver checkpointer.

````APIDOC
## Basic Short-Term Memory Implementation

### Description
This example demonstrates how to add basic short-term memory to an agent using the MemorySaver checkpointer. The agent's state, including conversation history, is managed and persisted for the duration of a thread.

### Method
POST

### Endpoint
`/agent/invoke` (Conceptual)

### Parameters
#### Request Body
- **messages** (array) - Required - An array of message objects representing the conversation history.
- **configurable** (object) - Required - Configuration object for the agent.
  - **thread_id** (string) - Required - A unique identifier for the conversation thread.

### Request Example
```json
{
  "messages": [
    {
      "role": "user",
      "content": "hi! i am Bob"
    }
  ],
  "configurable": {
    "thread_id": "1"
  }
}
````

### Response

(Response structure depends on agent's output)

### Code Example (TypeScript)

```ts
import { createAgent } from "langchain";
import { MemorySaver } from "@langchain/langgraph";

const checkpointer = new MemorySaver();

const agent = createAgent({
  model: "claude-sonnet-4-6",
  tools: [],
  checkpointer,
});

await agent.invoke(
  { messages: [{ role: "user", content: "hi! i am Bob" }] },
  { configurable: { thread_id: "1" } },
);
```

````

--------------------------------

### Instantiate and load documents with TextLoader

Source: https://docs.langchain.com/oss/javascript/integrations/document_loaders/file_loaders/text

Demonstrates how to import the TextLoader class, initialize it with a file path, and execute the load method to retrieve document content and metadata.

```typescript
import { TextLoader } from "@langchain/classic/document_loaders/fs/text";

const loader = new TextLoader("../../../../../../examples/src/document_loaders/example_data/example.txt");
const docs = await loader.load();
````

---

### Maximal Marginal Relevance Search Example

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/google_cloudsql_pg

This example shows how to use the `maxMarginalRelevanceSearch` method with custom options to retrieve documents.

````APIDOC
## POST /vectorstore/max_marginal_relevance_search

### Description
Performs a Maximal Marginal Relevance search to retrieve documents that are both similar to the query and diverse among themselves.

### Method
POST

### Endpoint
/vectorstore/max_marginal_relevance_search

### Parameters
#### Query Parameters
- **query** (string) - Required - The search query string.
- **options** (object) - Optional - Configuration options for the search.
  - **k** (integer) - Optional - The number of documents to return.
  - **filter** (string) - Optional - A filter string to apply to the search.

### Request Body
```json
{
  "query": "biology",
  "options": {
    "k": 4,
    "filter": "\"source\" = 'https://example.com'"
  }
}
````

### Response

#### Success Response (200)

- **results** (array) - An array of document objects, each containing `pageContent` and `metadata`.

#### Response Example

```json
[
  {
    "pageContent": "Document 1 content...",
    "metadata": { "source": "https://example.com" }
  },
  {
    "pageContent": "Document 2 content...",
    "metadata": { "source": "https://example.com" }
  }
]
```

````

--------------------------------

### Computer Use Tool Setup in TypeScript

Source: https://docs.langchain.com/oss/javascript/integrations/tools/anthropic

Sets up the computer use tool for interacting with desktop environments, including screenshot capture, mouse control, and keyboard input. It requires display dimensions and can be configured with an X11 display number. The execute function handles various actions like 'screenshot', 'left_click', etc.

```typescript
import { ChatAnthropic, tools } from "@langchain/anthropic";

const llm = new ChatAnthropic({
  model: "claude-sonnet-4-6",
});

const computer = tools.computer_20250124({
  // Required: specify display dimensions
  displayWidthPx: 1024,
  displayHeightPx: 768,
  // Optional: X11 display number
  displayNumber: 1,
  execute: async (action) => {
    switch (action.action) {
      case "screenshot":
      // Capture and return base64-encoded screenshot
      // ...
      case "left_click":
      // Click at the specified coordinates
      // ...
      // ...
    }
  },
});

const llmWithComputer = llm.bindTools([computer]);

const response = await llmWithComputer.invoke(
  "Save a picture of a cat to my desktop."
);
````

---

### Install LangGraph CLI

Source: https://docs.langchain.com/oss/javascript/langchain/sql-agent

Installs the latest version of the LangGraph CLI globally via npm to enable local agent execution.

```shell
npm i -g @langchain/langgraph-cli@latest
```

---

### Implement BackendProtocol for Custom Backends in Langchain JavaScript

Source: https://docs.langchain.com/oss/javascript/deepagents/backends

This example demonstrates how to implement the BackendProtocol by subclassing a generic backend or creating a custom wrapper. It outlines the required methods for interacting with storage, including listing information, reading files, searching content, globbing, writing, and editing.

```typescript
import {
  BackendProtocol,
  FileInfo,
  WriteResult,
  EditResult,
  GrepMatch,
} from "@langchain/community/deepagents/backends";

class CustomBackend implements BackendProtocol {
  async ls_info(path: string): Promise<FileInfo[]> {
    // Implementation for listing directory info
    return [];
  }

  async read(
    file_path: string,
    offset: number = 0,
    limit: number = 2000,
  ): Promise<string> {
    // Implementation for reading file content
    return "";
  }

  async grep_raw(
    pattern: string,
    path?: string,
    glob?: string,
  ): Promise<GrepMatch[] | string> {
    // Implementation for searching content with regex
    return [];
  }

  async glob_info(pattern: string, path: string = "/"): Promise<FileInfo[]> {
    // Implementation for globbing files
    return [];
  }

  async write(file_path: string, content: string): Promise<WriteResult> {
    // Implementation for writing a new file
    return { path: file_path };
  }

  async edit(
    file_path: string,
    old_string: string,
    new_string: string,
    replace_all: boolean = false,
  ): Promise<EditResult> {
    // Implementation for editing file content
    return { path: file_path, occurrences: 0 };
  }
}
```

---

### Install and Initialize Ollama Embeddings

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores

Install the Ollama package and configure the local embedding model. The base URL defaults to localhost:11434.

```bash
npm i @langchain/ollama
yarn add @langchain/ollama
pnpm add @langchain/ollama
```

```typescript
import { OllamaEmbeddings } from "@langchain/ollama";

const embeddings = new OllamaEmbeddings({
  model: "llama2",
  baseUrl: "http://localhost:11434",
});
```

---

### Implement SupabaseHybridSearch in TypeScript

Source: https://docs.langchain.com/oss/javascript/integrations/retrievers/supabase-hybrid

Example showing how to initialize the Supabase client and use the SupabaseHybridSearch retriever to perform hybrid queries.

```typescript
import { OpenAIEmbeddings } from "@langchain/openai";
import { createClient } from "@supabase/supabase-js";
import { SupabaseHybridSearch } from "@langchain/community/retrievers/supabase";

export const run = async () => {
  const client = createClient(
    process.env.SUPABASE_URL || "",
    process.env.SUPABASE_PRIVATE_KEY || "",
  );

  const embeddings = new OpenAIEmbeddings();

  const retriever = new SupabaseHybridSearch(embeddings, {
    client,
    similarityK: 2,
    keywordK: 2,
    tableName: "documents",
    similarityQueryName: "match_documents",
    keywordQueryName: "kw_match_documents",
  });

  const results = await retriever.invoke("hello bye");
  console.log(results);
};
```

---

### StoreBackend Usage

Source: https://docs.langchain.com/oss/javascript/deepagents/skills

Example of creating and invoking a deep agent using the StoreBackend.

````APIDOC
## Create and Invoke Deep Agent with StoreBackend

### Description
This example shows how to set up a deep agent with a StoreBackend, including initializing an InMemoryStore and populating it with skill data before invocation.

### Method
POST (implicitly via agent.invoke)

### Endpoint
N/A (Client-side SDK method)

### Parameters
#### Request Body (for agent.invoke)
- **messages** (list[object]) - Required - The list of messages for the agent.

### Request Example
```json
{
  "messages": [
    {
      "role": "user",
      "content": "what is langraph? Use the langgraph-docs skill if available."
    }
  ]
}
````

### Response

#### Success Response (200)

- **result** (object) - The agent's response.

#### Response Example

```json
{
  "output": "LangGraph is a library for..."
}
```

````

--------------------------------

### Install LangChain Provider Integrations

Source: https://docs.langchain.com/oss/javascript/langchain/install

Installs specific LangChain integrations for LLM providers like OpenAI and Anthropic. These are separate packages.

```bash
# Installing the OpenAI integration
npm install @langchain/openai
# Installing the Anthropic integration
npm install @langchain/anthropic
````

```bash
# Installing the OpenAI integration
pnpm install @langchain/openai
# Installing the Anthropic integration
pnpm install @langchain/anthropic
```

```bash
# Installing the OpenAI integration
yarn add @langchain/openai
# Installing the Anthropic integration
yarn add @langchain/anthropic
```

```bash
# Installing the OpenAI integration
bun add @langchain/openai
# Installing the Anthropic integration
bun add @langchain/anthropic
```

---

### Install AgentEvals and LangChain Core (Bash)

Source: https://docs.langchain.com/oss/javascript/langchain/test/evals

This command installs the necessary packages for agent evaluation: 'agentevals' for evaluation functionalities and '@langchain/core' for core LangChain utilities. It uses npm, the Node Package Manager.

```bash
npm install agentevals @langchain/core
```

---

### Full Conversation Caching Example

Source: https://docs.langchain.com/oss/javascript/integrations/middleware/anthropic

A comprehensive example showing how to use prompt caching across multiple agent invocations. It illustrates how system prompts and previous messages are reused from the cache to minimize processing requirements.

```typescript
import {
  createAgent,
  HumanMessage,
  anthropicPromptCachingMiddleware,
} from "langchain";

const LONG_PROMPT = `
Please be a helpful assistant.

<Lots more context ...>
`;

const agent = createAgent({
  model: "claude-sonnet-4-6",
  prompt: LONG_PROMPT,
  middleware: [anthropicPromptCachingMiddleware({ ttl: "5m" })],
});

await agent.invoke({
  messages: [new HumanMessage("Hi, my name is Bob")],
});

const result = await agent.invoke({
  messages: [new HumanMessage("What's my name?")],
});
```

---

### Install Vercel Postgres and LangChain dependencies

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/vercel_postgres

Installs the required npm packages for Vercel Postgres integration and core LangChain functionality.

```bash
npm install @vercel/postgres
npm install @langchain/community @langchain/core
```

---

### Yielding keys from LocalFileStore

Source: https://docs.langchain.com/oss/javascript/integrations/stores/file_system

Demonstrates how to initialize a LocalFileStore, populate it with data, and iterate over keys using the yieldKeys method with a prefix filter. This is useful for managing large key-value stores in a local file system.

```typescript
import { LocalFileStore } from "@langchain/classic/storage/file_system";

const kvStoreForYield = await LocalFileStore.fromPath("./messages");

const encoderForYield = new TextEncoder();

// Add some data to the store
await kvStoreForYield.mset([
  ["message:id:key1", encoderForYield.encode("value1")],
  ["message:id:key2", encoderForYield.encode("value2")],
]);

const yieldedKeys = [];
for await (const key of kvStoreForYield.yieldKeys("message:id:")) {
  yieldedKeys.push(key);
}

console.log(yieldedKeys);
```

---

### Full Example: Calling Subgraph with Different State Schemas (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/use-subgraphs

A complete example illustrating the invocation of a subgraph with distinct state schemas from a parent graph. It includes defining both the parent and subgraph states, nodes, and edges, along with the necessary state transformations for seamless integration. The example also shows how to stream the execution and log the output chunks.

```typescript
import { StateGraph, StateSchema, START } from "@langchain/langgraph";
import * as z from "zod";

// Define subgraph
const SubgraphState = new StateSchema({
  // note that none of these keys are shared with the parent graph state
  bar: z.string(),
  baz: z.string(),
});

const subgraphBuilder = new StateGraph(SubgraphState)
  .addNode("subgraphNode1", (state) => {
    return { baz: "baz" };
  })
  .addNode("subgraphNode2", (state) => {
    return { bar: state.bar + state.baz };
  })
  .addEdge(START, "subgraphNode1")
  .addEdge("subgraphNode1", "subgraphNode2");

const subgraph = subgraphBuilder.compile();

// Define parent graph
const ParentState = new StateSchema({
  foo: z.string(),
});

const builder = new StateGraph(ParentState)
  .addNode("node1", (state) => {
    return { foo: "hi! " + state.foo };
  })
  .addNode("node2", async (state) => {
    const response = await subgraph.invoke({ bar: state.foo }); // [!code highlight]
    return { foo: response.bar }; // [!code highlight]
  }) // [!code highlight]
  .addEdge(START, "node1")
  .addEdge("node1", "node2");

const graph = builder.compile();

for await (const chunk of await graph.stream(
  { foo: "foo" },
  { subgraphs: true },
)) {
  console.log(chunk);
}
```

---

### Modal Authentication

Source: https://docs.langchain.com/oss/javascript/integrations/providers/modal

Demonstrates how to authenticate with Modal, either by setting environment variables or by passing credentials directly in the code.

```bash
export MODAL_TOKEN_ID=your_token_id
export MODAL_TOKEN_SECRET=your_token_secret
```

```typescript
const sandbox = await ModalSandbox.create({
  auth: {
    tokenId: "your-token-id",
    tokenSecret: "your-token-secret",
  },
});
```

---

### Install LangChain Community and Supabase Dependencies (pnpm)

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/supabase

Installs the necessary LangChain community package, core utilities, Supabase SDK, and OpenAI embeddings package using pnpm. These are required for SupabaseVectorStore integration and OpenAI embeddings.

```bash
pnpm add @langchain/community @langchain/core @supabase/supabase-js @langchain/openai
```

---

### Create Agent with Middleware (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langchain/middleware/overview

Demonstrates how to create an agent and apply middleware like summarization and human-in-the-loop by passing them to the `createAgent` function. Middleware allows for fine-grained control over agent execution steps.

```typescript
import {
  createAgent,
  summarizationMiddleware,
  humanInTheLoopMiddleware,
} from "langchain";

const agent = createAgent({
  model: "gpt-4.1",
  tools: [...],
  middleware: [summarizationMiddleware, humanInTheLoopMiddleware],
});
```

---

### Initialize and Use Couchbase Vector Store

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/couchbase_query

Demonstrates how to connect to a Couchbase cluster, initialize the vector store with OpenAI embeddings, add documents, and perform basic similarity searches.

```typescript
import { OpenAIEmbeddings } from "@langchain/openai";
import {
  CouchbaseQueryVectorStore,
  DistanceStrategy,
} from "@langchain/community/vectorstores/couchbase_query";
import { Cluster } from "couchbase";
import { Document } from "@langchain/core/documents";

const couchbaseClient = await Cluster.connect(
  process.env.COUCHBASE_DB_CONN_STR,
  { username: "Administrator", password: "Password" },
);
const embeddings = new OpenAIEmbeddings({ apiKey: process.env.OPENAI_API_KEY });

const vectorStore = await CouchbaseQueryVectorStore.initialize(embeddings, {
  cluster: couchbaseClient,
  bucketName: "testing",
  scopeName: "_default",
  collectionName: "_default",
  textKey: "text",
  embeddingKey: "embedding",
  distanceStrategy: DistanceStrategy.COSINE,
});

await vectorStore.addDocuments([
  new Document({ pageContent: "Couchbase is a NoSQL database" }),
]);
const results = await vectorStore.similaritySearch(
  "What is a NoSQL database?",
  4,
);
```

---

### PPTX Document Loader Usage

Source: https://docs.langchain.com/oss/javascript/integrations/document_loaders/file_loaders/pptx

Example demonstrating how to load documents from a PPTX file, creating one document per page.

````APIDOC
## Usage, one document per page

### Description
Load data from a PPTX file using `PPTXLoader`. By default, this creates one document for all pages in the PPTX file. The example shows how to load documents, with each document representing a page.

### Method
```typescript
import { PPTXLoader } from "@langchain/community/document_loaders/fs/pptx";

const loader = new PPTXLoader("src/document_loaders/example_data/example.pptx");

const docs = await loader.load();
````

````

--------------------------------

### Install Astra DB and LangChain Dependencies

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/astradb

Install the required packages to enable Astra DB integration within a Node.js environment.

```bash
npm install @langchain/openai @datastax/astra-db-ts @langchain/community @langchain/core
````

---

### Index Documents with Momento Vector Index using fromDocuments

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/momento_vector_index

Demonstrates how to instantiate a Momento Vector Index and index documents using the `fromDocuments` method. It handles both index creation and adding to existing indexes. This method simplifies chaining document loaders with indexing. Dependencies include `@langchain/community/vectorstores/momento_vector_index`, `@gomomento/sdk`, `@langchain/openai`, and `@langchain/classic/document_loaders/fs/text`. It takes document content, embeddings, and client configuration as input, and outputs a similarity search result.

```typescript
import { MomentoVectorIndex } from "@langchain/community/vectorstores/momento_vector_index";
// For browser/edge, adjust this to import from "@gomomento/sdk-web";
import {
  PreviewVectorIndexClient,
  VectorIndexConfigurations,
  CredentialProvider,
} from "@gomomento/sdk";
import { OpenAIEmbeddings } from "@langchain/openai";
import { TextLoader } from "@langchain/classic/document_loaders/fs/text";
import { sleep } from "@langchain/classic/util/time";

// Create docs with a loader
const loader = new TextLoader("src/document_loaders/example_data/example.txt");
const docs = await loader.load();

const vectorStore = await MomentoVectorIndex.fromDocuments(
  docs,
  new OpenAIEmbeddings(),
  {
    client: new PreviewVectorIndexClient({
      configuration: VectorIndexConfigurations.Laptop.latest(),
      credentialProvider: CredentialProvider.fromEnvironmentVariable({
        environmentVariableName: "MOMENTO_API_KEY",
      }),
    }),
    indexName: "langchain-example-index",
  },
);

// because indexing is async, wait for it to finish to search directly after
await sleep();

// Search for the most similar document
const response = await vectorStore.similaritySearch("hello", 1);

console.log(response);
/*
[
  Document {
    pageContent: 'Foo\nBar\nBaz\n\n',
    metadata: { source: 'src/document_loaders/example_data/example.txt' }
  }
]
*/
```

---

### Index Documents using ClickHouseStore in LangChain JS

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/clickhouse

Demonstrates how to initialize and use the `ClickHouseStore` to index text documents with OpenAI embeddings. It covers setting up connection details, performing similarity searches with and without filtering, and handling potential asynchronous operations.

```typescript
import { ClickHouseStore } from "@langchain/community/vectorstores/clickhouse";
import { OpenAIEmbeddings } from "@langchain/openai";

// Initialize ClickHouse store from texts
const vectorStore = await ClickHouseStore.fromTexts(
  ["Hello world", "Bye bye", "hello nice world"],
  [
    { id: 2, name: "2" },
    { id: 1, name: "1" },
    { id: 3, name: "3" },
  ],
  new OpenAIEmbeddings(),
  {
    host: process.env.CLICKHOUSE_HOST || "localhost",
    port: process.env.CLICKHOUSE_PORT || 8443,
    username: process.env.CLICKHOUSE_USER || "username",
    password: process.env.CLICKHOUSE_PASSWORD || "password",
    database: process.env.CLICKHOUSE_DATABASE || "default",
    table: process.env.CLICKHOUSE_TABLE || "vector_table",
  },
);

// Sleep 1 second to ensure that the search occurs after the successful insertion of data.
// eslint-disable-next-line no-promise-executor-return
await new Promise((resolve) => setTimeout(resolve, 1000));

// Perform similarity search without filtering
const results = await vectorStore.similaritySearch("hello world", 1);
console.log(results);

// Perform similarity search with filtering
const filteredResults = await vectorStore.similaritySearch("hello world", 1, {
  whereStr: "metadata.name = '1'",
});
console.log(filteredResults);
```

---

### Install Google Calendar Dependencies

Source: https://docs.langchain.com/oss/javascript/integrations/tools/google_calendar

Install the necessary googleapis package required for the Google Calendar tools to function within your project.

```bash
npm install googleapis
```

---

### Install Cassandra Dependencies for LangChain JS

Source: https://docs.langchain.com/oss/javascript/integrations/stores/cassandra_storage

Installs the necessary LangChain community and core packages along with the Cassandra driver for integration.

```bash
npm install @langchain/community @langchain/core cassandra-driver
```

---

### Initialize and Invoke Nibittensor LLM

Source: https://docs.langchain.com/oss/javascript/integrations/llms/ni_bittensor

Demonstrates how to import the NIBittensorLLM class, instantiate the model, and invoke it with a prompt to receive a response. This implementation relies on the @langchain/classic package.

```typescript
import { NIBittensorLLM } from "@langchain/classic/experimental/llms/bittensor";

const model = new NIBittensorLLM();

const res = await model.invoke(`What is Bittensor?`);

console.log({ res });
```

---

### Initialize MultiServerMCPClient and Integrate with Agent

Source: https://docs.langchain.com/oss/javascript/langchain/mcp

Demonstrates how to initialize a MultiServerMCPClient with multiple transport types (stdio and HTTP) and pass the retrieved tools to a LangChain agent for execution.

```typescript
import { MultiServerMCPClient } from "@langchain/mcp-adapters";
import { ChatAnthropic } from "@langchain/anthropic";
import { createAgent } from "langchain";

const client = new MultiServerMCPClient({
  math: {
    transport: "stdio",
    command: "node",
    args: ["/path/to/math_server.js"],
  },
  weather: {
    transport: "http",
    url: "http://localhost:8000/mcp",
  },
});

const tools = await client.getTools();
const agent = createAgent({
  model: "claude-sonnet-4-6",
  tools,
});

const mathResponse = await agent.invoke({
  messages: [{ role: "user", content: "what's (3 + 5) x 12?" }],
});

const weatherResponse = await agent.invoke({
  messages: [{ role: "user", content: "what is the weather in nyc?" }],
});
```

---

### Install Mozilla Readability and jsdom

Source: https://docs.langchain.com/oss/javascript/integrations/document_transformers/mozilla_readability

Installs the necessary npm packages, @mozilla/readability and jsdom, which are required for using the MozillaReadabilityTransformer in LangChain JavaScript.

```bash
npm install @mozilla/readability jsdom
```

---

### Implement Long-Term Memory with LangChain Stores

Source: https://docs.langchain.com/oss/javascript/langchain/long-term-memory

Demonstrates how to initialize a store, write data using the put method, and retrieve data within an agent tool using the runtime context. This pattern is shown for both transient in-memory storage and persistent PostgreSQL databases.

```typescript
import * as z from "zod";
import { createAgent, tool, type ToolRuntime } from "langchain";
import { InMemoryStore } from "@langchain/langgraph";

const store = new InMemoryStore();
const contextSchema = z.object({
  userId: z.string(),
});

await store.put(["users"], "user_123", {
  name: "John Smith",
  language: "English",
});

const getUserInfo = tool(
  async (_, runtime: ToolRuntime<unknown, z.infer<typeof contextSchema>>) => {
    const userId = runtime.context.userId;
    if (!userId) throw new Error("userId is required");
    const userInfo = await runtime.store.get(["users"], userId);
    return userInfo?.value ? JSON.stringify(userInfo.value) : "Unknown user";
  },
  {
    name: "getUserInfo",
    description: "Look up user info by userId from the store.",
    schema: z.object({}),
  },
);

const agent = createAgent({
  model: "claude-sonnet-4-6",
  tools: [getUserInfo],
  contextSchema,
  store,
});
const result = await agent.invoke(
  { messages: [{ role: "user", content: "look up user information" }] },
  { context: { userId: "user_123" } },
);
```

```typescript
import * as z from "zod";
import { createAgent, tool, type ToolRuntime } from "langchain";
import { PostgresStore } from "@langchain/langgraph-checkpoint-postgres/store";

const DB_URI =
  process.env.POSTGRES_URI ??
  "postgresql://postgres:postgres@localhost:5442/postgres?sslmode=disable";
const store = PostgresStore.fromConnString(DB_URI);
await store.setup();

const contextSchema = z.object({ userId: z.string() });

await store.put(["users"], "user_123", {
  name: "John Smith",
  language: "English",
});

const getUserInfo = tool(
  async (_, runtime: ToolRuntime<unknown, z.infer<typeof contextSchema>>) => {
    const userId = runtime.context.userId;
    if (!userId) throw new Error("userId is required");
    const userInfo = await runtime.store.get(["users"], userId);
    return userInfo?.value ? JSON.stringify(userInfo.value) : "Unknown user";
  },
  {
    name: "getUserInfo",
    description: "Look up user info by userId from the store.",
    schema: z.object({}),
  },
);

const agent = createAgent({
  model: "claude-sonnet-4-6",
  tools: [getUserInfo],
  contextSchema,
  store,
});
await agent.invoke(
  { messages: [{ role: "user", content: "look up user information" }] },
  { context: { userId: "user_123" } },
);
```

---

### Initialize and Invoke ChatWebLLM Model

Source: https://docs.langchain.com/oss/javascript/integrations/chat/web_llm

Demonstrates how to initialize and use the ChatWebLLM model in a web environment. It includes importing necessary classes, configuring the model with specific records and chat options, initializing the model, and invoking it with a HumanMessage. Note that model weights are downloaded on the first call.

```typescript
// Must be run in a web environment, e.g. a web worker

import { ChatWebLLM } from "@langchain/community/chat_models/webllm";
import { HumanMessage } from "@langchain/core/messages";

// Initialize the ChatWebLLM model with the model record and chat options.
// Note that if the appConfig field is set, the list of model records
// must include the selected model record for the engine.

// You can import a list of models available by default here:
// https://github.com/mlc-ai/web-llm/blob/main/src/config.ts
//
// Or by importing it via:
// import { prebuiltAppConfig } from "@mlc-ai/web-llm";
const model = new ChatWebLLM({
  model: "Phi-3-mini-4k-instruct-q4f16_1-MLC",
  chatOptions: {
    temperature: 0.5,
  },
});

await model.initialize((progress: Record<string, unknown>) => {
  console.log(progress);
});

// Call the model with a message and await the response.
const response = await model.invoke([
  new HumanMessage({ content: "What is 1 + 1?" }),
]);

console.log(response);

/*
AIMessage {
  content: ' 2\n',
}
*/
```

---

### Index and Query Documents with MyScaleStore

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/myscale

Demonstrates how to create a MyScale vector store from text, index documents with associated metadata, and perform similarity searches. It also shows how to filter search results using a WHERE clause. Requires MyScale connection details and an OpenAI API key.

```typescript
import { MyScaleStore } from "@langchain/community/vectorstores/myscale";
import { OpenAIEmbeddings } from "@langchain/openai";

const vectorStore = await MyScaleStore.fromTexts(
  ["Hello world", "Bye bye", "hello nice world"],
  [
    { id: 2, name: "2" },
    { id: 1, name: "1" },
    { id: 3, name: "3" },
  ],
  new OpenAIEmbeddings(),
  {
    host: process.env.MYSCALE_HOST || "localhost",
    port: process.env.MYSCALE_PORT || "8443",
    username: process.env.MYSCALE_USERNAME || "username",
    password: process.env.MYSCALE_PASSWORD || "password",
    database: "default", // defaults to "default"
    table: "your_table", // defaults to "vector_table"
  },
);

const results = await vectorStore.similaritySearch("hello world", 1);
console.log(results);

const filteredResults = await vectorStore.similaritySearch("hello world", 1, {
  whereStr: "metadata.name = '1'",
});
console.log(filteredResults);
```

---

### Install Sonix Audio Integration Dependencies

Source: https://docs.langchain.com/oss/javascript/integrations/document_loaders/web_loaders/sonix_audio_transcription

Installs the necessary LangChain community and core packages along with the sonix-speech-recognition library for Node.js.

```bash
npm install @langchain/community @langchain/core sonix-speech-recognition
```

---

### Install Cohere LangChain Packages

Source: https://docs.langchain.com/oss/javascript/integrations/document_compressors/cohere_rerank

Install the necessary Cohere and core LangChain packages using npm to enable reranking functionality.

```bash
npm install @langchain/cohere @langchain/core
```

---

### Initialize PromptLayer OpenAI Model

Source: https://docs.langchain.com/oss/javascript/integrations/llms/prompt_layer_openai

Demonstrates how to instantiate the PromptLayerOpenAI class to enable prompt logging. It requires a valid PromptLayer API key and standard OpenAI credentials.

```typescript
import { PromptLayerOpenAI } from "@langchain/classic/llms/openai";

const model = new PromptLayerOpenAI({
  temperature: 0.9,
  apiKey: "YOUR-API-KEY",
  promptLayerApiKey: "YOUR-API-KEY",
});
const res = await model.invoke(
  "What would be a good company name a company that makes colorful socks?",
);
```

---

### PDF Document Input Examples

Source: https://docs.langchain.com/oss/javascript/langchain/messages

Shows how to construct messages containing PDF documents from URLs, base64 data, or file IDs.

````APIDOC
## PDF Document Input

### Description
Examples of creating `HumanMessage` objects with PDF document data from different sources.

### Method
N/A (Code examples for message construction)

### Endpoint
N/A

### Parameters
N/A

### Request Example
```typescript
// From URL
const messageUrl = new HumanMessage({
  content: [
    { type: "text", text: "Describe the content of this document." },
    { type: "file", source_type: "url", url: "https://example.com/path/to/document.pdf", mime_type: "application/pdf" },
  ],
});

// From base64 data
const messageBase64 = new HumanMessage({
  content: [
    { type: "text", text: "Describe the content of this document." },
    {
      type: "file",
      source_type: "base64",
      data: "AAAAIGZ0eXBtcDQyAAAAAGlzb21tcDQyAAACAGlzb2...",
      mime_type: "application/pdf",
    },
  ],
});

// From provider-managed File ID
const messageId = new HumanMessage({
  content: [
    { type: "text", text: "Describe the content of this document." },
    { type: "file", source_type: "id", id: "file-abc123" },
  ],
});
````

### Response

N/A

````

--------------------------------

### Install BedrockChat Dependencies

Source: https://docs.langchain.com/oss/javascript/integrations/chat/bedrock

Commands to install the necessary LangChain community packages and AWS SDK peer dependencies for Node.js environments.

```bash
npm install @langchain/community @langchain/core @aws-crypto/sha256-js @aws-sdk/credential-provider-node @smithy/protocol-http @smithy/signature-v4 @smithy/eventstream-codec @smithy/util-utf8 @aws-sdk/types
````

```bash
yarn add @langchain/community @langchain/core @aws-crypto/sha256-js @aws-sdk/credential-provider-node @smithy/protocol-http @smithy/signature-v4 @smithy/eventstream-codec @smithy/util-utf8 @aws-sdk/types
```

```bash
pnpm add @langchain/community @langchain/core @aws-crypto/sha256-js @aws-sdk/credential-provider-node @smithy/protocol-http @smithy/signature-v4 @smithy/eventstream-codec @smithy/util-utf8 @aws-sdk/types
```

---

### Log All Events to File

Source: https://docs.langchain.com/oss/javascript/deepagents/cli/configuration

A hook configuration example that uses jq to append all incoming event payloads to a JSONL file.

```json
{
  "hooks": [
    {
      "command": ["bash", "-c", "jq -c . >> ~/.deepagents/hook-events.jsonl"],
      "events": []
    }
  ]
}
```

---

### Install Arcjet Redaction Dependencies

Source: https://docs.langchain.com/oss/javascript/integrations/chat/arcjet

Commands to install the necessary Arcjet and LangChain community packages using various package managers.

```bash
npm install @arcjet/redact
npm install @langchain/community @langchain/core
```

```bash
yarn add @arcjet/redact
yarn add @langchain/community @langchain/core
```

```bash
pnpm add @arcjet/redact
pnpm add @langchain/community @langchain/core
```

---

### Initialize LangChain Agent with JigsawStack Tools

Source: https://docs.langchain.com/oss/javascript/integrations/tools/jigsawstack

This snippet shows how to configure a ChatOpenAI model and register multiple JigsawStack tools within a LangChain agent executor. It demonstrates the setup process and how to invoke the agent with a natural language query.

```javascript
import { ChatOpenAI } from "@langchain/openai";
import { initializeAgentExecutorWithOptions } from "@langchain/classic/agents";
import {
  JigsawStackAIScrape,
  JigsawStackAISearch,
  JigsawStackVOCR,
  JigsawStackSpeechToText,
  JigsawStackTextToSQL,
} from "@langchain/jigsawstack";

const model = new ChatOpenAI({
  model: "gpt-4.1-mini",
  temperature: 0,
});

const tools = [
  new JigsawStackAIScrape(),
  new JigsawStackAISearch(),
  new JigsawStackVOCR(),
  new JigsawStackSpeechToText(),
  new JigsawStackTextToSQL(),
];

const executor = await initializeAgentExecutorWithOptions(tools, model, {
  agentType: "zero-shot-react-description",
  verbose: true,
});

const res = await executor.invoke({
  input: `Kokkalo Restaurant Santorini`,
});

console.log(res.output);
```

---

### Initialize and use ChatGPTPluginRetriever in TypeScript

Source: https://docs.langchain.com/oss/javascript/integrations/retrievers/chatgpt-retriever-plugin

Demonstrates how to instantiate the ChatGPTPluginRetriever with a base URL and bearer token authentication. It then shows how to invoke the retriever with a query string to fetch relevant documents.

```typescript
import { ChatGPTPluginRetriever } from "@langchain/classic/retrievers/remote";

const retriever = new ChatGPTPluginRetriever({
  url: "http://0.0.0.0:8000",
  auth: {
    bearer: "super-secret-jwt-token-with-at-least-32-characters-long",
  },
});

const docs = await retriever.invoke("hello world");

console.log(docs);
```

---

### Load Notion pages and databases

Source: https://docs.langchain.com/oss/javascript/integrations/document_loaders/web_loaders/notionapi

Demonstrates how to initialize the NotionAPILoader for both pages and databases. It includes examples of loading content and using text splitters for processing.

```typescript
import { NotionAPILoader } from "@langchain/community/document_loaders/web/notionapi";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

// Loading a page (including child pages all as separate documents)
const pageLoader = new NotionAPILoader({
  clientOptions: {
    auth: "<NOTION_INTEGRATION_TOKEN>",
  },
  id: "<PAGE_ID>",
  type: "page",
});

const splitter = new RecursiveCharacterTextSplitter();

// Load the documents
const pageDocs = await pageLoader.load();
// Split the documents using the text splitter
const splitDocs = await splitter.splitDocuments(pageDocs);

console.log({ splitDocs });

// Loading a database (each row is a separate document with all properties as metadata)
const dbLoader = new NotionAPILoader({
  clientOptions: {
    auth: "<NOTION_INTEGRATION_TOKEN>",
  },
  id: "<DATABASE_ID>",
  type: "database",
  onDocumentLoaded: (current, total, currentTitle) => {
    console.log(`Loaded Page: ${currentTitle} (${current}/${total})`);
  },
  callerOptions: {
    maxConcurrency: 64,
  },
  propertiesAsHeader: true,
});

const dbDocs = await dbLoader.load();
console.log({ dbDocs });
```

---

### Install LangGraph Packages

Source: https://docs.langchain.com/oss/javascript/langgraph/agentic-rag

Installs the necessary LangChain and LangGraph packages for building RAG applications using npm, pnpm, yarn, or bun.

```bash
npm install @langchain/langgraph @langchain/openai @langchain/community @langchain/textsplitters
```

```bash
pnpm install @langchain/langgraph @langchain/openai @langchain/community @langchain/textsplitters
```

```bash
yarn add @langchain/langgraph @langchain/openai @langchain/community @langchain/textsplitters
```

```bash
bun add @langchain/langgraph @langchain/openai @langchain/community @langchain/textsplitters
```

---

### Install LangChain Embedding Packages

Source: https://docs.langchain.com/oss/javascript/langchain/rag

Commands to install necessary LangChain packages for specific embedding providers using npm, yarn, or pnpm.

```bash
npm i @langchain/google-vertexai @langchain/mistralai @langchain/cohere
```

```bash
yarn add @langchain/google-vertexai @langchain/mistralai @langchain/cohere
```

```bash
pnpm add @langchain/google-vertexai @langchain/mistralai @langchain/cohere
```

---

### Initialize LangChain UI SDK

Source: https://docs.langchain.com/oss/javascript/langchain/frontend/human-in-the-loop

Initializes the LangChain UI SDK by setting up an event listener for messages from the guest window. It returns an object with methods to control the UI and register callbacks for UI events.

```javascript
function initLangChainUI(cb) {
  const listeners = new Map();
  const addListener = (type, callback) => {
    listeners.set(type, callback);
    return () => listeners.delete(type);
  };
  const postToGuest = (msg) => {
    window.parent.postMessage(msg, "*");
  };
  const handleMessage = (event) => {
    const { type, ...data } = event.data;
    switch (type) {
      case "TRACE_URL":
        cb(msg.url, msg.runId);
        break;
      case "THREAD_CLEARED":
        cb();
        break;
    }
  };
  window.addEventListener("message", handleMessage);
  return {
    setTheme(theme) {
      postToGuest({
        type: "SET_THEME",
        theme,
      });
    },
    setPattern(slug) {
      postToGuest({
        type: "SET_PATTERN",
        slug,
      });
    },
    setView(view) {
      postToGuest({
        type: "SET_VIEW",
        view,
      });
    },
    setLanguage(language) {
      postToGuest({
        type: "SET_LANGUAGE",
        language,
      });
    },
    updateCode(files, entryFile) {
      postToGuest({
        type: "UPDATE_CODE",
        files,
        entryFile,
      });
    },
    reset() {
      postToGuest({
        type: "RESET",
      });
    },
    trackEvent(name, properties) {
      postToGuest({
        type: "TRACK_EVENT",
        name,
        properties,
      });
    },
    onReady(callback) {
      return addListener("READY", callback);
    },
    onResize(callback) {
      return addListener("RESIZE", callback);
    },
    onError(callback) {
      return addListener("ERROR", callback);
    },
    onRunStarted(callback) {
      return addListener("RUN_STARTED", callback);
    },
    onTraceUrl(callback) {
      return addListener("TRACE_URL", callback);
    },
    onThreadCleared(callback) {
      return addListener("THREAD_CLEARED", callback);
    },
    destroy() {
      window.removeEventListener("message", handleMessage);
      listeners.clear();
    },
  };
}
```

---

### Install Anthropic Chat Model with npm

Source: https://docs.langchain.com/oss/javascript/langchain/rag

Installs the Anthropic chat model package using npm. This is necessary for integrating Anthropic models.

```bash
npm install @langchain/anthropic
```

---

### Install LangGraph CLI

Source: https://docs.langchain.com/oss/javascript/langchain/studio

Installs the LangGraph CLI tool required to run a local agent server. Requires Python 3.11 or higher.

```shell
pip install --upgrade "langgraph-cli[inmem]"
```

---

### Star GitHub Repository using Composio and Langchain (TypeScript)

Source: https://docs.langchain.com/oss/javascript/integrations/tools/composio

Shows how to use Composio tools with a Langchain agent to perform actions on GitHub, specifically starring a repository. It initializes Composio, fetches GitHub tools, creates a Langchain model, and then constructs and invokes the agent.

```typescript
import { ChatOpenAI } from "@langchain/openai";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { Composio } from "@composio/core";
import { LangchainProvider } from "@composio/langchain";

// Initialize Composio
const composio = new Composio({
  apiKey: process.env.COMPOSIO_API_KEY,
  provider: new LangchainProvider(),
});

// Get GitHub tools
const tools = await composio.tools.get("default", "GITHUB");

// Create model
const model = new ChatOpenAI({
  model: "gpt-5",
});

// Create agent
const agent = createReactAgent({
  llm: model,
  tools: tools,
});

// Execute task
const result = await agent.invoke({
  messages: [
    {
      role: "user",
      content: "Star the repository composiohq/composio on GitHub",
    },
  ],
});

console.log(result.messages[result.messages.length - 1].content);
```

---

### Initialize Pinecone Vector Store

Source: https://docs.langchain.com/oss/javascript/langchain/knowledge-base

Demonstrates how to instantiate a Pinecone vector store using the Pinecone client.

```typescript
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";

const pinecone = new PineconeClient({
  apiKey: process.env.PINECONE_API_KEY,
});
const pineconeIndex = pinecone.Index("your-index-name");

const vectorStore = new PineconeStore(embeddings, {
  pineconeIndex,
  maxConcurrency: 5,
});
```

---

### Install Xata CLI

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/xata

Installs the Xata command-line interface globally using npm. This tool is used for managing Xata databases and projects.

```bash
npm install @xata.io/cli -g
```

---

### Initialize and Invoke YandexGPT

Source: https://docs.langchain.com/oss/javascript/integrations/llms/yandex

Demonstrates how to import the YandexGPT class, instantiate the model, and invoke it with a prompt. This example assumes authentication is handled via environment variables.

```typescript
import { YandexGPT } from "@langchain/yandex/llms";

const model = new YandexGPT();
const res = await model.invoke(['Translate "I love programming" into French.']);
console.log({ res });
```

---

### Initialize and Invoke a Deep Agent

Source: https://docs.langchain.com/oss/javascript/reference/deepagents-javascript

Demonstrates how to instantiate a Deep Agent with specific tools and a system prompt, then invoke it to process a user query.

```typescript
const agent = createDeepAgent({
  tools: [internetSearch],
  systemPrompt: researchInstructions,
});

const result = await agent.invoke({
  messages: [{ role: "user", content: "What is langgraph?" }],
});
```

---

### Install CloseVector and LangChain dependencies

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/closevector

Commands to install the necessary CloseVector packages for browser or Node.js environments, along with core LangChain dependencies.

```bash
npm install -S closevector-web
npm install -S closevector-node
npm install @langchain/openai @langchain/community @langchain/core
```

---

### Index Documents and Build QA Chain with Azure Cosmos DB

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/azure_cosmosdb_nosql

This example shows how to load documents from a text file, split them, index them into Azure Cosmos DB NoSQL using OpenAI embeddings, perform a similarity search, and then use the retrieved documents to answer a question with a LangChain combine documents chain and retrieval chain.

```typescript
import { AzureCosmosDBNoSQLVectorStore } from "@langchain/azure-cosmosdb";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { createStuffDocumentsChain } from "@langchain/classic/chains/combine_documents";
import { createRetrievalChain } from "@langchain/classic/chains/retrieval";
import { TextLoader } from "@langchain/classic/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

// Load documents from file
const loader = new TextLoader("./state_of_the_union.txt");
const rawDocuments = await loader.load();
const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 0,
});
const documents = await splitter.splitDocuments(rawDocuments);

// Create Azure Cosmos DB vector store
const store = await AzureCosmosDBNoSQLVectorStore.fromDocuments(
  documents,
  new OpenAIEmbeddings(),
  {
    databaseName: "langchain",
    containerName: "documents",
  },
);

// Performs a similarity search
const resultDocuments = await store.similaritySearch(
  "What did the president say about Ketanji Brown Jackson?",
);

console.log("Similarity search results:");
console.log(resultDocuments[0].pageContent);
/*
  Tonight. I call on the Senate to: Pass the Freedom to Vote Act. Pass the John Lewis Voting Rights Act. And while you’re at it, pass the Disclose Act so Americans can know who is funding our elections.

  Tonight, I’d like to honor someone who has dedicated his life to serve this country: Justice Stephen Breyer—an Army veteran, Constitutional scholar, and retiring Justice of the United States Supreme Court. Justice Breyer, thank you for your service.

  One of the most serious constitutional responsibilities a President has is nominating someone to serve on the United States Supreme Court.

  And I did that 4 days ago, when I nominated Circuit Court of Appeals Judge Ketanji Brown Jackson. One of our nation's top legal minds, who will continue Justice Breyer’s legacy of excellence.
*/

// Use the store as part of a chain
const model = new ChatOpenAI({ model: "gpt-3.5-turbo-1106" });
const questionAnsweringPrompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    "Answer the user's questions based on the below context:\n\n{context}",
  ],
  ["human", "{input}"],
]);

const combineDocsChain = await createStuffDocumentsChain({
  llm: model,
  prompt: questionAnsweringPrompt,
});

const chain = await createRetrievalChain({
  retriever: store.asRetriever(),
  combineDocsChain,
});

const res = await chain.invoke({
  input: "What is the president's top priority regarding prices?",
});

console.log("Chain response:");
console.log(res.answer);
/*
  The president's top priority is getting prices under control.
*/

// Clean up
await store.delete();
```

---

### Install Discord.js Dependency

Source: https://docs.langchain.com/oss/javascript/integrations/tools/discord_tool

Install the official peer dependency 'discord.js' required for the Discord Tool integration. This is a prerequisite for using the tool effectively.

```bash
npm install discord.js
```

---

### Install PDF.js dependency

Source: https://docs.langchain.com/oss/javascript/integrations/document_loaders/web_loaders/pdf

Commands to install the pdfjs-dist package using various package managers to enable custom PDF parsing builds.

```bash
npm install pdfjs-dist
```

```bash
yarn add pdfjs-dist
```

```bash
pnpm add pdfjs-dist
```

---

### Loading Documents from a Directory

Source: https://docs.langchain.com/oss/javascript/integrations/document_loaders/file_loaders/pdf

This example demonstrates how to use the DirectoryLoader to load all PDF files from a given directory. It also shows how to initialize a text splitter to process the loaded documents.

````APIDOC
## Loading Documents from a Directory

### Description
This code snippet shows how to load documents from a directory using `DirectoryLoader` and process them with `PDFLoader`. It also includes an example of splitting the loaded documents into smaller chunks using `RecursiveCharacterTextSplitter`.

### Method
```typescript
// Import necessary classes
import { DirectoryLoader } from "@langchain/classic/document_loaders/fs/directory";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

// Define the path to the example data directory
const exampleDataPath = "../../../../../../examples/src/document_loaders/example_data/";

/* Load all PDFs within the specified directory */
const directoryLoader = new DirectoryLoader(
  exampleDataPath,
  {
    ".pdf": (path: string) => new PDFLoader(path),
  }
);

const directoryDocs = await directoryLoader.load();

console.log(directoryDocs[0]);

/* Additional steps : Split text into chunks with any TextSplitter. You can then use it as context or save it to memory afterwards. */
const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
});

const splitDocs = await textSplitter.splitDocuments(directoryDocs);

console.log(splitDocs[0]);
````

### Parameters

#### Path Parameters

None

#### Query Parameters

None

#### Request Body

None

### Request Example

```json
{
  "example": "No request body for this operation."
}
```

### Response

#### Success Response (200)

- **Document** (object) - The first loaded document object.
- **Document** (object) - The first split document object.

#### Response Example

```json
{
  "example": "Output will vary based on the content of the PDF files in the directory."
}
```

### Error Handling

- The loader might output messages for unknown file types if the directory contains files other than PDFs.

````

--------------------------------

### Initialize Embedding Models

Source: https://docs.langchain.com/oss/javascript/langchain/rag

TypeScript examples for initializing different embedding models from Google VertexAI, MistralAI, and Cohere.

```typescript
import { VertexAIEmbeddings } from "@langchain/google-vertexai";
const embeddings = new VertexAIEmbeddings({ model: "gemini-embedding-001" });
````

```typescript
import { MistralAIEmbeddings } from "@langchain/mistralai";
const embeddings = new MistralAIEmbeddings({ model: "mistral-embed" });
```

```typescript
import { CohereEmbeddings } from "@langchain/cohere";
const embeddings = new CohereEmbeddings({ model: "embed-english-v3.0" });
```

---

### Initialize LangGraph Agent with Middleware and Checkpointer

Source: https://docs.langchain.com/oss/javascript/langchain/multi-agent/handoffs-customer-support

Demonstrates how to instantiate a LangGraph agent using a specific state schema, middleware for step management, and a MemorySaver checkpointer for persistence.

```typescript
import { createAgent } from "langchain";
import { MemorySaver } from "@langchain/langgraph";
import { ChatOpenAI } from "@langchain/openai";

const allTools = [
  recordWarrantyStatus,
  recordIssueType,
  provideSolution,
  escalateToHuman,
];

const model = new ChatOpenAI({
  model: "gpt-4.1-mini",
  temperature: 0.7,
});

const agent = createAgent({
  model,
  tools: allTools,
  stateSchema: SupportState,
  middleware: [applyStepMiddleware],
  checkpointer: new MemorySaver(),
});
```

---

### Install and Use Anthropic with LangChain.js

Source: https://docs.langchain.com/oss/javascript/integrations/chat

Install the Anthropic integration for LangChain.js. Set your ANTHROPIC_API_KEY environment variable and instantiate the ChatAnthropic model for use.

```bash
npm i @langchain/anthropic
```

```bash
yarn add @langchain/anthropic
```

```bash
pnpm add @langchain/anthropic
```

```bash
ANTHROPIC_API_KEY=your-api-key
```

```typescript
import { ChatAnthropic } from "@langchain/anthropic";

const model = new ChatAnthropic({
  model: "claude-3-sonnet-20240620",
  temperature: 0,
});
```

```javascript
await model.invoke("Hello, world!");
```

---

### Initialize and use ChatLlamaCpp with a prompt

Source: https://docs.langchain.com/oss/javascript/integrations/chat/llama_cpp

Demonstrates basic usage of the ChatLlamaCpp model. It initializes the model with a specified local model path and then invokes it with a simple human message, printing the AI's response. Requires a local GGUF model file.

```typescript
import { ChatLlamaCpp } from "@langchain/community/chat_models/llama_cpp";
import { HumanMessage } from "@langchain/core/messages";

const llamaPath = "/Replace/with/path/to/your/model/gguf-llama3-Q4_0.bin";

const model = await ChatLlamaCpp.initialize({ modelPath: llamaPath });

const response = await model.invoke([
  new HumanMessage({ content: "My name is John." }),
]);
console.log({ response });

/*
  AIMessage {
    lc_serializable: true,
    lc_kwargs: {
      content: 'Hello John.',
      additional_kwargs: {}
    },
    lc_namespace: [ 'langchain', 'schema' ],
    content: 'Hello John.',
    name: undefined,
    additional_kwargs: {}
  }
*/
```

---

### Configure Local Shell Backend

Source: https://docs.langchain.com/oss/javascript/deepagents/data-analysis

Initializes a local shell backend for development and testing. Note that this provides unrestricted filesystem access.

```python
from deepagents.backends import LocalShellBackend

backend = LocalShellBackend(root_dir=".", env={"PATH": "/usr/bin:/bin"})
```

---

### Install Confluence Loader Dependencies

Source: https://docs.langchain.com/oss/javascript/integrations/document_loaders/web_loaders/confluence

Install the required LangChain community packages and the html-to-text parser necessary for processing Confluence page content.

```bash
npm install @langchain/community @langchain/core html-to-text
```

---

### Configuring Multiple Servers

Source: https://docs.langchain.com/oss/javascript/deepagents/cli/mcp-tools

Demonstrates how to configure multiple MCP servers, including stdio, SSE, and HTTP types. Tools from all configured servers are merged and made available to the agent.

````APIDOC
## Multiple servers

You can configure as many servers as you need. Tools from all servers are merged and available to the agent:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/home/user/projects"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_TOKEN": "ghp_..." }
    },
    "database": {
      "type": "sse",
      "url": "https://db-mcp.internal:8080/mcp",
      "headers": { "Authorization": "Bearer ..." }
    }
  }
}
````

````

--------------------------------

### Emulating CLI Source Order in SDK

Source: https://docs.langchain.com/oss/javascript/deepagents/skills

Demonstrates how to explicitly pass ordered skill sources to the SDK to mimic CLI-style layering.

```APIDOC
## Emulating CLI Source Order in SDK

### Description
To achieve CLI-style layering in your SDK code, you must explicitly pass all desired skill sources in the order of lowest to highest precedence.

### Method
N/A (Configuration Example)

### Endpoint
N/A

### Parameters
N/A

### Request Example
```text
[
  "<user-home>/.deepagents/{agent}/skills/",
  "<user-home>/.agents/skills/",
  "<project-root>/.deepagents/skills/",
  "<project-root>/.agents/skills/"
]
````

### Response

N/A

### Notes

Pass this ordered list as the `skills` argument when creating your agent.

````

--------------------------------

### Install LangChain Azure OpenAI Package

Source: https://docs.langchain.com/oss/javascript/integrations/chat/azure

Install the required dependencies for using Azure OpenAI with LangChain using various package managers.

```npm
npm install @langchain/openai @langchain/core
````

```yarn
yarn add @langchain/openai @langchain/core
```

```pnpm
pnpm add @langchain/openai @langchain/core
```

---

### Create and Manage Preview Host (JavaScript)

Source: https://docs.langchain.com/oss/javascript/langchain/frontend/structured-output

Implements a function to create a preview host that manages communication with an iframe guest. It includes methods for posting messages to the guest and handling incoming messages from the guest, ensuring origin validation.

```javascript
function isOriginAllowed(origin, allowedOrigins) {
  return allowedOrigins.includes("*") || allowedOrigins.includes(origin);
}
function createPreviewHost(iframe, options) {
  const { allowedOrigins } = options;
  const targetOrigins = options.targetOrigins ?? allowedOrigins;
  const listeners = new Map();
  function postToGuest(message) {
    if (!iframe.contentWindow) return;
    for (const origin of targetOrigins) {
      iframe.contentWindow.postMessage(message, origin);
    }
  }
  function addListener(type, callback) {
    if (!listeners.has(type)) {
      listeners.set(type, new Set());
    }
    listeners.get(type).add(callback);
    return () => {
      listeners.get(type)?.delete(callback);
    };
  }
  function handleMessage(event) {
    if (!isOriginAllowed(event.origin, allowedOrigins)) return;
    const result = GuestToHostMessageSchema.safeParse(event.data);
    if (!result.success) return;
    const msg = result.data;
    const cbs = listeners.get(msg.type);
    if (!cbs) return;
    for (const cb of cbs) {
      switch (msg.type) {
        case "READY":
          cb(msg.framework);
          break;
        case "RESIZE":
          cb(msg.height);
          break;
        case "ERROR":
          cb(msg.message, msg.stack);
          break;
        case "RUN_STARTED":
          cb(msg.runId);
      }
    }
  }
  window.addEventListener("message", handleMessage);
  return {
    postToGuest,
    addListener,
    destroy() {
      window.removeEventListener("message", handleMessage);
      listeners.clear();
    },
  };
}
```

---

### Install Additional Model Providers

Source: https://docs.langchain.com/oss/javascript/deepagents/cli

Adds extra model provider dependencies to an existing Deep Agents CLI installation using uv.

```bash
uv tool install deepagents-cli --with langchain-xai
```

---

### useStream Hook Setup

Source: https://docs.langchain.com/oss/javascript/langchain/frontend/structured-output

Demonstrates how to set up and use the `useStream` hook for type-safe streaming with Langchain agents in React, Vue, Svelte, and Angular.

````APIDOC
## Setup `useStream`

Import your agent and pass `typeof myAgent` as a type parameter to `useStream` for type-safe access to state values.

### React Example

```tsx
import { useStream } from "@langchain/react";
import { AIMessage } from "@langchain/core/messages";

function RecipeChat() {
  const stream = useStream<typeof myAgent>({
    apiUrl: "http://localhost:2024",
    assistantId: "recipe_assistant",
  });

  const recipe = extractStructuredOutput<Recipe>(stream.messages);

  return (
    <div>
      {!recipe && !stream.isLoading && (
        <PromptInput onSubmit={(text) =>
          stream.submit({ messages: [{ type: "human", content: text }] })
        } />
      )}
      {stream.isLoading && <LoadingIndicator />}
      {recipe && <RecipeCard recipe={recipe} />}
    </div>
  );
}
````

### Vue Example

```vue
<script setup lang="ts">
import { useStream } from "@langchain/vue";
import { AIMessage } from "@langchain/core/messages";
import { computed } from "vue";

const stream = useStream<typeof myAgent>({
  apiUrl: "http://localhost:2024",
  assistantId: "recipe_assistant",
});

const recipe = computed(() =>
  extractStructuredOutput<Recipe>(stream.messages.value),
);

function handleSubmit(text: string) {
  stream.submit({ messages: [{ type: "human", content: text }] });
}
</script>

<template>
  <div>
    <PromptInput v-if="!recipe && !stream.isLoading" @submit="handleSubmit" />
    <LoadingIndicator v-if="stream.isLoading" />
    <RecipeCard v-if="recipe" :recipe="recipe" />
  </div>
</template>
```

### Svelte Example

```svelte
<script lang="ts">
  import { useStream } from "@langchain/svelte";
  import { AIMessage } from "@langchain/core/messages";

  const { messages, isLoading, submit } = useStream<typeof myAgent>({
    apiUrl: "http://localhost:2024",
    assistantId: "recipe_assistant",
  });

  $: recipe = extractStructuredOutput<Recipe>($messages);

  function handleSubmit(text: string) {
    submit({ messages: [{ type: "human", content: text }] });
  }
</script>

<div>
  {#if !recipe && !$isLoading}
    <PromptInput on:submit={(e) => handleSubmit(e.detail)} />
  {/if}
  {#if $isLoading}
    <LoadingIndicator />
  {/if}
  {#if recipe}
    <RecipeCard {recipe} />
  {/if}
</div>
```

### Angular Example

```ts
import { Component, computed } from "@angular/core";
import { useStream } from "@langchain/angular";

@Component({
  selector: "app-recipe-chat",
  template: `
    @if (!recipe() && !stream.isLoading()) {
      <prompt-input (onSubmit)="handleSubmit($event)" />
    }
    @if (stream.isLoading()) {
      <loading-indicator />
    }
    @if (recipe()) {
      <recipe-card [recipe]="recipe()" />
    }
  `,
})
export class RecipeChatComponent {
  stream = useStream<typeof myAgent>({
    apiUrl: "http://localhost:2024",
    assistantId: "recipe_assistant",
  });

  recipe = computed(() =>
    extractStructuredOutput<Recipe>(this.stream.messages()),
  );

  handleSubmit(text: string) {
    this.stream.submit({
      messages: [{ type: "human", content: text }],
    });
  }
}
```

````

--------------------------------

### Create LangSmith Dataset and Examples

Source: https://docs.langchain.com/oss/javascript/integrations/document_loaders/web_loaders/langsmith

Uses the LangSmith client to create a new dataset and populate it with generated example inputs, outputs, and metadata.

```typescript
import { Client as LangSmithClient } from 'langsmith';
import { faker } from "@faker-js/faker";

const lsClient = new LangSmithClient();
const datasetName = "LangSmith Few Shot Datasets Notebook";

const exampleInputs = Array.from({ length: 10 }, (_, i) => ({ input: faker.lorem.paragraph() }));
const exampleOutputs = Array.from({ length: 10 }, (_, i) => ({ output: faker.lorem.sentence() }));
const exampleMetadata = Array.from({ length: 10 }, (_, i) => ({ companyCatchPhrase: faker.company.catchPhrase() }));

await lsClient.deleteDataset({ datasetName });
const dataset = await lsClient.createDataset(datasetName);
const examples = await lsClient.createExamples({
  inputs: exampleInputs,
  outputs: exampleOutputs,
  metadata: exampleMetadata,
  datasetId: dataset.id
});
````

---

### Initialize ChatGoogle for AI Studio and Vertex AI

Source: https://docs.langchain.com/oss/javascript/integrations/chat/google

Demonstrates how to instantiate the ChatGoogle model for different Google platforms. It covers standard AI Studio usage, Vertex AI, and Express Mode using an API key.

```typescript
const llm = new ChatGoogle({
  model: "gemini-2.5-flash",
  maxRetries: 2,
});

const llmVertex = new ChatGoogle({
  model: "gemini-2.5-flash",
});

const llmExpress = new ChatGoogle({
  model: "gemini-2.5-flash",
  platformType: "gcp",
});
```

---

### Defining START and END Edges

Source: https://docs.langchain.com/oss/javascript/langgraph/graph-api

Demonstrates how to use the special START and END nodes to define the entry and terminal points of a graph workflow.

```typescript
import { START, END } from "@langchain/langgraph";

graph.addEdge(START, "nodeA");
graph.addEdge("nodeA", END);
```

---

### Install VertexAI Embeddings Integration (JavaScript)

Source: https://docs.langchain.com/oss/javascript/langchain/rag

Installs the necessary Langchain Google VertexAI package for using VertexAI embeddings models via npm.

```bash
npm i @langchain/google-vertexai
```

---

### Install Azure Chat Model with npm

Source: https://docs.langchain.com/oss/javascript/langchain/rag

Installs the Azure chat model package using npm. This enables integration with Azure OpenAI services.

```bash
npm install @langchain/azure
```

---

### Google Search Retrieval with Data Store using ChatVertexAI

Source: https://docs.langchain.com/oss/javascript/integrations/chat/google_vertex_ai

Shows how to ground LLM responses using a specific data store with Google Vertex AI Search. This example configures retrieval from a specified datastore and invokes a model to answer questions based on that data. Requires project and datastore IDs.

```typescript
import { ChatVertexAI } from "@langchain/google-vertexai";

const projectId = "YOUR_PROJECT_ID";
const datastoreId = "YOUR_DATASTORE_ID";

const searchRetrievalToolWithDataset = {
  retrieval: {
    vertexAiSearch: {
      datastore: `projects/${projectId}/locations/global/collections/default_collection/dataStores/${datastoreId}`,
    },
    disableAttribution: false,
  },
};

const searchRetrievalModelWithDataset = new ChatVertexAI({
  model: "gemini-2.5-pro",
  temperature: 0,
  maxRetries: 0,
}).bindTools([searchRetrievalToolWithDataset]);

const searchRetrievalModelResult = await searchRetrievalModelWithDataset.invoke(
  "What is the score of Argentina vs Bolivia football game?",
);

console.log(searchRetrievalModelResult.content);
```

---

### Install Weaviate for Langchain JS

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores

Installs the necessary package for Weaviate integration with Langchain JavaScript. Supports npm, yarn, and pnpm package managers.

```bash
npm i @langchain/weaviate
```

```bash
yarn add @langchain/weaviate
```

```bash
pnpm add @langchain/weaviate
```

---

### Install Qdrant for Langchain JS

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores

Installs the necessary package for Qdrant integration with Langchain JavaScript. Supports npm, yarn, and pnpm package managers.

```bash
npm i @langchain/qdrant
```

```bash
yarn add @langchain/qdrant
```

```bash
pnpm add @langchain/qdrant
```

---

### Initialize and Query AnalyticDB Vector Store

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/analyticdb

Demonstrates how to initialize the AnalyticDBVectorStore with connection options, add documents, and perform similarity searches with metadata filtering.

```typescript
import { AnalyticDBVectorStore } from "@langchain/community/vectorstores/analyticdb";
import { OpenAIEmbeddings } from "@langchain/openai";

const connectionOptions = {
  host: process.env.ANALYTICDB_HOST || "localhost",
  port: Number(process.env.ANALYTICDB_PORT) || 5432,
  database: process.env.ANALYTICDB_DATABASE || "your_database",
  user: process.env.ANALYTICDB_USERNAME || "username",
  password: process.env.ANALYTICDB_PASSWORD || "password",
};

const vectorStore = await AnalyticDBVectorStore.fromTexts(
  ["foo", "bar", "baz"],
  [{ page: 1 }, { page: 2 }, { page: 3 }],
  new OpenAIEmbeddings(),
  { connectionOptions },
);

const result = await vectorStore.similaritySearch("foo", 1);
console.log(JSON.stringify(result));

await vectorStore.addDocuments([{ pageContent: "foo", metadata: { page: 4 } }]);

const filterResult = await vectorStore.similaritySearch("foo", 1, {
  page: 4,
});
console.log(JSON.stringify(filterResult));

const filterWithScoreResult = await vectorStore.similaritySearchWithScore(
  "foo",
  1,
  { page: 3 },
);
console.log(JSON.stringify(filterWithScoreResult));

await vectorStore.end();
```

---

### Install Redis for Langchain JS

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores

Installs the necessary package for Redis integration with Langchain JavaScript. Supports npm, yarn, and pnpm package managers.

```bash
npm i @langchain/redis
```

```bash
yarn add @langchain/redis
```

```bash
pnpm add @langchain/redis
```

---

### Initialize PGVectorStore and Create HNSW Index

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/pgvector

Demonstrates how to configure a PGVectorStore instance, initialize it with OpenAI embeddings, and create an HNSW index to optimize vector similarity search performance.

```typescript
import { OpenAIEmbeddings } from "@langchain/openai";
import {
  DistanceStrategy,
  PGVectorStore,
} from "@langchain/community/vectorstores/pgvector";
import { PoolConfig } from "pg";

const hnswConfig = {
  postgresConnectionOptions: {
    type: "postgres",
    host: "127.0.0.1",
    port: 5433,
    user: "myuser",
    password: "ChangeMe",
    database: "api",
  } as PoolConfig,
  tableName: "testlangchainjs",
  columns: {
    idColumnName: "id",
    vectorColumnName: "vector",
    contentColumnName: "content",
    metadataColumnName: "metadata",
  },
  distanceStrategy: "cosine" as DistanceStrategy,
};

const hnswPgVectorStore = await PGVectorStore.initialize(
  new OpenAIEmbeddings(),
  hnswConfig,
);

await hnswPgVectorStore.createHnswIndex({
  dimensions: 1536,
  efConstruction: 64,
  m: 16,
});

await hnswPgVectorStore.addDocuments([
  { pageContent: "what's this", metadata: { a: 2, b: ["tag1", "tag2"] } },
  { pageContent: "Cat drinks milk", metadata: { a: 1, b: ["tag2"] } },
]);

const model = new OpenAIEmbeddings();
const query = await model.embedQuery("water");
const hnswResults = await hnswPgVectorStore.similaritySearchVectorWithScore(
  query,
  1,
);

console.log(hnswResults);
await hnswPgVectorStore.end();
```

---

### Graph Entrypoint and Execution

Source: https://docs.langchain.com/oss/javascript/langgraph/use-functional-api

Composes the defined tasks into a graph entrypoint and demonstrates how to stream execution, including pausing and resuming with human input.

````APIDOC
## Graph Entrypoint and Execution

### Description
Composes the defined tasks into a graph entrypoint and demonstrates how to stream execution, including pausing and resuming with human input.

### Initial Execution

This section shows how to initialize the graph and start the execution stream with an initial query.

```typescript
import { MemorySaver } from "@langchain/langgraph";

const checkpointer = new MemorySaver();

const graph = entrypoint(
  { checkpointer, name: "graph" },
  async (inputQuery: string) => {
    const result1 = await step1(inputQuery);
    const result2 = await humanFeedback(result1);
    const result3 = await step3(result2);

    return result3;
  }
);

const config = { configurable: { thread_id: "1" } };

for await (const event of await graph.stream("foo", config)) {
  console.log(event);
  console.log("\n");
}
````

### Resuming Execution After Interrupt

After the workflow pauses at the `humanFeedback` task due to `interrupt()`, this demonstrates how to resume the execution by providing the expected input.

```typescript
// Continue execution
for await (const event of await graph.stream(
  new Command({ resume: "baz" }),
  config,
)) {
  console.log(event);
  console.log("\n");
}
```

````

--------------------------------

### Install Pinecone for Langchain JS

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores

Installs the necessary package for Pinecone integration with Langchain JavaScript. Supports npm, yarn, and pnpm package managers.

```bash
npm i @langchain/pinecone
````

```bash
yarn add @langchain/pinecone
```

```bash
pnpm add @langchain/pinecone
```

---

### Configure Agent Tools

Source: https://docs.langchain.com/oss/javascript/migrate/langchain-v1

Illustrates the recommended way to configure tools in v1 by passing a plain model and a separate tools list, avoiding pre-bound models.

```typescript
const agent = createAgent({ model: "gpt-4.1-mini", tools: [someTool] });
```

---

### Install PGVector for Langchain JS

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores

Installs the community package for PGVector integration with Langchain JavaScript. Supports npm, yarn, and pnpm package managers.

```bash
npm i @langchain/community
```

```bash
yarn add @langchain/community
```

```bash
pnpm add @langchain/community
```

---

### Vertex AI Setup

Source: https://docs.langchain.com/oss/javascript/integrations/chat/google

Initialize the ChatGoogle model for use with Google Cloud Vertex AI. Credentials can be managed via Application Default Credentials (ADC) or a service account key file.

````APIDOC
## Vertex AI

### Description
Initialize the ChatGoogle model for use with Google Cloud Vertex AI. Credentials can be managed via Application Default Credentials (ADC) or a service account key file.

### Method
Instantiation

### Endpoint
N/A (Client-side library)

### Parameters
#### Request Body
- **model** (string) - Required - The name of the Gemini model to use (e.g., "gemini-2.5-flash").
- **credentials** (object) - Optional - Vertex AI credentials. Can be omitted if using ADC or `GOOGLE_CLOUD_CREDENTIALS` environment variable.

### Request Example
```typescript
import { ChatGoogle } from "@langchain/google";

const llm = new ChatGoogle({
  model: "gemini-2.5-flash",
  // credentials: { ... }, // Optional if using ADC or GOOGLE_CLOUD_CREDENTIALS
});
````

````

--------------------------------

### Install LanceDB and LangChain dependencies

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/lancedb

Commands to install the necessary npm packages for using LanceDB with LangChain, including the core bindings and OpenAI integration.

```bash
npm install -S @lancedb/lancedb
npm install @langchain/openai @langchain/community @langchain/core
````

---

### Install LangChain Cloudflare Packages

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/cloudflare_vectorize

npm command to install the necessary LangChain packages for Cloudflare integration, including the core package and the Cloudflare-specific integration.

```npm
npm install @langchain/cloudflare @langchain/core
```

---

### LangChain UI SDK Initialization and Event Handling (JavaScript)

Source: https://docs.langchain.com/oss/javascript/langchain/frontend/join-rejoin

Initializes the LangChain UI SDK by setting up a message listener for communication with the guest iframe. It exposes methods to control UI elements and register callbacks for various events.

```javascript
function createLangChainUI(cb) {
  const listeners = new Map();
  function addListener(event, callback) {
    listeners.set(event, callback);
    return () => listeners.delete(event);
  }
  function postToGuest(msg) {
    window.parent.postMessage(msg, "*");
  }
  function handleMessage(msg) {
    const listener = listeners.get(msg.type);
    if (listener) {
      switch (msg.type) {
        case "TRACE_URL":
          cb(msg.url, msg.runId);
          break;
        case "THREAD_CLEARED":
          cb();
          break;
      }
    }
  }
  window.addEventListener("message", handleMessage);
  return {
    setTheme(theme) {
      postToGuest({
        type: "SET_THEME",
        theme,
      });
    },
    setPattern(slug) {
      postToGuest({
        type: "SET_PATTERN",
        slug,
      });
    },
    setView(view) {
      postToGuest({
        type: "SET_VIEW",
        view,
      });
    },
    setLanguage(language) {
      postToGuest({
        type: "SET_LANGUAGE",
        language,
      });
    },
    updateCode(files, entryFile) {
      postToGuest({
        type: "UPDATE_CODE",
        files,
        entryFile,
      });
    },
    reset() {
      postToGuest({
        type: "RESET",
      });
    },
    trackEvent(name, properties) {
      postToGuest({
        type: "TRACK_EVENT",
        name,
        properties,
      });
    },
    onReady(callback) {
      return addListener("READY", callback);
    },
    onResize(callback) {
      return addListener("RESIZE", callback);
    },
    onError(callback) {
      return addListener("ERROR", callback);
    },
    onRunStarted(callback) {
      return addListener("RUN_STARTED", callback);
    },
    onTraceUrl(callback) {
      return addListener("TRACE_URL", callback);
    },
    onThreadCleared(callback) {
      return addListener("THREAD_CLEARED", callback);
    },
    destroy() {
      window.removeEventListener("message", handleMessage);
      listeners.clear();
    },
  };
}
```

---

### Install Azure Dynamic Sessions Dependencies

Source: https://docs.langchain.com/oss/javascript/integrations/providers/microsoft

Install the required packages to utilize Azure Container Apps dynamic sessions for sandboxed code execution.

```bash
npm install @langchain/azure-dynamic-sessions @langchain/core
```

---

### Initialize and Invoke WebBrowser Tool

Source: https://docs.langchain.com/oss/javascript/integrations/tools/webbrowser

Demonstrates how to instantiate the WebBrowser tool with OpenAI models and embeddings, then invoke it to query specific information from a URL.

```typescript
import { WebBrowser } from "@langchain/classic/tools/webbrowser";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";

export async function run() {
  const model = new ChatOpenAI({ model: "gpt-4.1-mini", temperature: 0 });
  const embeddings = new OpenAIEmbeddings();

  const browser = new WebBrowser({ model, embeddings });

  const result = await browser.invoke(
    `"https://www.themarginalian.org/2015/04/09/find-your-bliss-joseph-campbell-power-of-myth","who is joseph campbell"`,
  );

  console.log(result);
}
```

---

### Install and Import Azure DocumentDB Vector Store

Source: https://docs.langchain.com/oss/javascript/integrations/providers/microsoft

Provides the installation command for Azure DocumentDB dependencies and the import statement for the vector store class.

```bash
npm install @langchain/azure-cosmosdb @langchain/core
```

```typescript
import { AzureDocumentDBVectorStore } from "@langchain/azure-cosmosdb";
```

---

### Install Supadata LangChain.js Integration

Source: https://docs.langchain.com/oss/javascript/integrations/providers/supadata

Installs the necessary Supadata integration package for LangChain.js using npm. This is the first step to using Supadata features.

```bash
npm install @supadata/langchain-js
```

---

### Install Bedrock Peer Dependencies (Node.js)

Source: https://docs.langchain.com/oss/javascript/integrations/llms/bedrock

Installs the necessary AWS SDK peer dependencies required for the LangChain Bedrock integration in Node.js environments.

```bash
npm install @aws-crypto/sha256-js @aws-sdk/credential-provider-node @smithy/protocol-http @smithy/signature-v4 @smithy/eventstream-codec @smithy/util-utf8 @aws-sdk/types
```

```bash
yarn add @aws-crypto/sha256-js @aws-sdk/credential-provider-node @smithy/protocol-http @smithy/signature-v4 @smithy/eventstream-codec @smithy/util-utf8 @aws-sdk/types
```

```bash
pnpm add @aws-crypto/sha256-js @aws-sdk/credential-provider-node @smithy/protocol-http @smithy/signature-v4 @smithy/eventstream-codec @smithy/util-utf8 @aws-sdk/types
```

---

### Setting up useStream for Markdown Rendering

Source: https://docs.langchain.com/oss/javascript/langchain/frontend/markdown-messages

Demonstrates how to set up the `useStream` hook with a chat agent and provides code examples for integrating markdown rendering in React, Vue, Svelte, and Angular applications.

````APIDOC
## Setting up useStream for Markdown Rendering

### Description
This section details the setup process for the `useStream` hook to enable real-time markdown rendering. It includes examples for integrating with a chat agent and displaying messages across different frontend frameworks.

### Prerequisites
-   A running chat agent.
-   `@langchain/react`, `@langchain/vue`, `@langchain/svelte`, or `@langchain/angular` installed.

### Setup Steps

1.  **Import necessary modules:** Import `useStream` and message types from the appropriate Langchain library.
2.  **Define Agent URL and Assistant ID:** Specify the endpoint for your chat agent and its unique ID.
3.  **Initialize `useStream`:** Call the `useStream` hook with the agent URL, assistant ID, and optionally, a type parameter for the agent.
4.  **Map and Render Messages:** Iterate through the messages provided by `useStream` and render them. Use a markdown component (e.g., `<Markdown>`) for AI messages containing markdown content.

### Code Examples

#### React Example

```tsx
import type { myAgent } from "./agent"; // Assuming agent type is defined here
import { useStream } from "@langchain/react";
import { AIMessage, HumanMessage } from "@langchain/core/messages";

const AGENT_URL = "http://localhost:2024";

export function Chat() {
  const stream = useStream<typeof myAgent>({
    apiUrl: AGENT_URL,
    assistantId: "simple_agent",
  });

  return (
    <div>
      {stream.messages.map((msg) => {
        if (AIMessage.isInstance(msg)) {
          // Assuming Markdown component handles rendering markdown
          return <Markdown key={msg.id}>{msg.text}</Markdown>;
        }
        if (HumanMessage.isInstance(msg)) {
          return <p key={msg.id}>{msg.text}</p>;
        }
      })}
    </div>
  );
}
````

#### Vue Example

```vue
<script setup lang="ts">
import { useStream } from "@langchain/vue";
import { AIMessage, HumanMessage } from "@langchain/core/messages";

const AGENT_URL = "http://localhost:2024";

const stream = useStream<typeof myAgent>({
  apiUrl: AGENT_URL,
  assistantId: "simple_agent",
});
</script>

<template>
  <div>
    <template v-for="msg in stream.messages.value" :key="msg.id">
      <Markdown v-if="AIMessage.isInstance(msg)">{{ msg.text }}</Markdown>
      <p v-else-if="HumanMessage.isInstance(msg)">{{ msg.text }}</p>
    </template>
  </div>
</template>
```

#### Svelte Example

```svelte
<script lang="ts">
  import { useStream } from "@langchain/svelte";
  import { AIMessage, HumanMessage } from "@langchain/core/messages";

  const AGENT_URL = "http://localhost:2024";

  const { messages, submit } = useStream<typeof myAgent>({
    apiUrl: AGENT_URL,
    assistantId: "simple_agent",
  });
</script>

<div>
  {#each $messages as msg (msg.id)}
    {#if AIMessage.isInstance(msg)}
      <Markdown content={msg.text} />
    {:else if HumanMessage.isInstance(msg)}
      <p>{msg.text}</p>
    {/if}
  {/each}
</div>
```

#### Angular Example

```ts
import { Component } from "@angular/core";
import { useStream } from "@langchain/angular";

const AGENT_URL = "http://localhost:2024";

@Component({
  selector: "app-chat",
  template: `
    @for (msg of stream.messages(); track msg.id) {
      <app-markdown [content]="msg.text" />
    }
  `,
})
export class ChatComponent {
  stream = useStream<typeof myAgent>({
    apiUrl: AGENT_URL,
    assistantId: "simple_agent",
  });
}
```

````

--------------------------------

### Install LangChain Cohere Embeddings

Source: https://docs.langchain.com/oss/javascript/integrations/embeddings/cohere

Install the necessary LangChain packages for Cohere integration using npm, yarn, or pnpm. This includes `@langchain/cohere` and `@langchain/core`.

```bash
npm install @langchain/cohere @langchain/core
````

```bash
yarn add @langchain/cohere @langchain/core
```

```bash
pnpm add @langchain/cohere @langchain/core
```

---

### Initialize and Invoke WolframAlpha Tool

Source: https://docs.langchain.com/oss/javascript/integrations/tools/wolframalpha

This snippet demonstrates how to import the WolframAlphaTool, initialize it with a valid app ID, and invoke it to perform a mathematical calculation. It requires the @langchain/community package and a valid WolframAlpha API key.

```typescript
import { WolframAlphaTool } from "@langchain/community/tools/wolframalpha";

const tool = new WolframAlphaTool({
  appid: "YOUR_APP_ID",
});

const res = await tool.invoke("What is 2 * 2?");

console.log(res);
```

---

### Emulate Tools with LLM Middleware (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langchain/middleware/built-in

This snippet demonstrates how to set up an agent with `toolEmulatorMiddleware` to replace actual tool calls with LLM-generated responses. It shows the basic setup for emulating all tools by default. Dependencies include `langchain`.

```typescript
import { createAgent, toolEmulatorMiddleware } from "langchain";

const agent = createAgent({
  model: "gpt-4.1",
  tools: [getWeather, searchDatabase, sendEmail],
  middleware: [
    toolEmulatorMiddleware(), // Emulate all tools
  ],
});
```

---

### Install and Use MistralAI with LangChain.js

Source: https://docs.langchain.com/oss/javascript/integrations/chat

Integrate MistralAI models into your LangChain.js project by installing the necessary package. Set the MISTRAL_API_KEY and instantiate the ChatMistralAI model.

```bash
npm i @langchain/mistralai
```

```bash
yarn add @langchain/mistralai
```

```bash
pnpm add @langchain/mistralai
```

```bash
MISTRAL_API_KEY=your-api-key
```

```typescript
import { ChatMistralAI } from "@langchain/mistralai";

const model = new ChatMistralAI({
  model: "mistral-large-latest",
  temperature: 0,
});
```

```javascript
await model.invoke("Hello, world!");
```

---

### Instantiate ExaSearchResults Tool

Source: https://docs.langchain.com/oss/javascript/integrations/tools/exa_search

How to initialize the Exa client and create an instance of the ExaSearchResults tool with custom search arguments.

```typescript
import { ExaSearchResults } from "@langchain/exa";
import Exa from "exa-js";

const client = new Exa(process.env.EXASEARCH_API_KEY);

const tool = new ExaSearchResults({
  client,
  searchArgs: {
    numResults: 2,
  },
});
```

---

### Initialize Agent with PostgreSQL Store

Source: https://docs.langchain.com/oss/javascript/langchain/long-term-memory

Shows the installation of the PostgreSQL checkpoint package and the initialization of a persistent agent using PostgresStore. This is suitable for production environments requiring data persistence across restarts.

```shell
npm install @langchain/langgraph-checkpoint-postgres
```

```typescript
import { createAgent } from "langchain";
import { PostgresStore } from "@langchain/langgraph-checkpoint-postgres/store";

const DB_URI =
  process.env.POSTGRES_URI ??
  "postgresql://postgres:postgres@localhost:5442/postgres?sslmode=disable";
const store = PostgresStore.fromConnString(DB_URI);
await store.setup();

const agent = createAgent({
  model: "claude-sonnet-4-6",
  tools: [],
  store,
});
```

---

### Retrieved Documents Example

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/mongodb_atlas

An example output format for documents retrieved using a LangChain retriever, showing the document content, metadata, and an optional ID.

```javascript
[
  Document {
    pageContent: 'The powerhouse of the cell is the mitochondria',
    metadata: { _id: '1', source: 'https://example.com' },
    id: undefined
  },
  Document {
    pageContent: 'Mitochondria are made out of lipids',
    metadata: { _id: '3', source: 'https://example.com' },
    id: undefined
  }
]
```

---

### Initialize Local Elasticsearch Environment

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/elasticsearch

Uses the elastic start-local script to download and run Elasticsearch and Kibana in Docker containers. This is the recommended approach for local development.

```bash
curl -fsSL https://elastic.co/start-local | sh
```

---

### Agent Text Response Example

Source: https://docs.langchain.com/oss/javascript/integrations/tools/vectorstore

An example of a text response generated by the agent after processing a query. This demonstrates the final output the user might see.

```text
In the State of the Union address, Biden mentioned that he nominated Circuit Court of Appeals Judge Ketanji Brown Jackson, describing her as one of the nation’s top legal minds who will continue Justice Breyer’s legacy of excellence. He highlighted her background as a former top litigator in private practice, a former federal public defender, and noted that she comes from a family of public school educators and police officers. He also pointed out that she has received a broad range of support since her nomination.
In the State of the Union address, President Biden spoke about Ketanji Brown Jackson, stating that he nominated her as one of the nation’s top legal minds who will continue Justice Breyer’s legacy of excellence. He highlighted her experience as a former top litigator in private practice and a federal public defender, as well as her background coming from a family of public school educators and police officers. Biden also noted that she has received a broad range of support since her nomination.
```

---

### Defining Follow-up Buttons and Cards with OpenUI

Source: https://docs.langchain.com/oss/javascript/langchain/frontend/integrations/openui

This example shows how to define follow-up query buttons and an 'Explore Further' card using OpenUI components. It utilizes `Button`, `Buttons`, `Card`, and `Stack` to structure interactive elements that enhance user engagement by suggesting further exploration topics.

```javascript
followUp1 = Button("Compare AI leaders 2024 vs 2025", { type: "continue_conversation" }, "secondary")
followUp2 = Button("Global AI investment breakdown",  { type: "continue_conversation" }, "secondary")
followUpBtns = Buttons([followUp1, followUp2], "row")
followUpCard  = Card([CardHeader("Explore Further"), followUpBtns], "sunk")
root = Stack([..., followUpCard])
```

---

### Initialize and Stream Agent Execution

Source: https://docs.langchain.com/oss/javascript/integrations/tools/sql

Shows how to create an agent executor with tools and stream the response to handle tool calls and text output.

```typescript
import { createAgent } from "@langchain/classic";

const agentExecutor = createAgent({ llm, tools });

const exampleQuery = "Can you list 10 artists from my database?";

const events = await agentExecutor.stream(
  { messages: [["user", exampleQuery]] },
  { streamMode: "values" },
);

for await (const event of events) {
  const lastMsg = event.messages[event.messages.length - 1];
  if (lastMsg.tool_calls?.length) {
    console.dir(lastMsg.tool_calls, { depth: null });
  } else if (lastMsg.content) {
    console.log(lastMsg.content);
  }
}
```

---

### Full Example: Trimming Messages in a LangChain.js Graph

Source: https://docs.langchain.com/oss/javascript/langgraph/add-memory

A comprehensive example showcasing `trimMessages` within a LangChain.js graph. It initializes a model, defines a state schema, and creates a graph node that trims messages before invoking the model. The example demonstrates invoking the graph multiple times and logging the final response.

```typescript
import { trimMessages } from "@langchain/core/messages";
import { ChatAnthropic } from "@langchain/anthropic";
import {
  StateGraph,
  StateSchema,
  MessagesValue,
  GraphNode,
  START,
  MemorySaver,
} from "@langchain/langgraph";

const State = new StateSchema({
  messages: MessagesValue,
});

const model = new ChatAnthropic({ model: "claude-3-5-sonnet-20241022" });

const callModel: GraphNode<typeof State> = async (state) => {
  const messages = trimMessages(state.messages, {
    strategy: "last",
    maxTokens: 128,
    startOn: "human",
    endOn: ["human", "tool"],
    tokenCounter: model,
  });
  const response = await model.invoke(messages);
  return { messages: [response] };
};

const checkpointer = new MemorySaver();
const builder = new StateGraph(State)
  .addNode("call_model", callModel)
  .addEdge(START, "call_model");
const graph = builder.compile({ checkpointer });

const config = { configurable: { thread_id: "1" } };
await graph.invoke(
  { messages: [{ role: "user", content: "hi, my name is bob" }] },
  config,
);
await graph.invoke(
  { messages: [{ role: "user", content: "write a short poem about cats" }] },
  config,
);
await graph.invoke(
  { messages: [{ role: "user", content: "now do the same but for dogs" }] },
  config,
);
const finalResponse = await graph.invoke(
  { messages: [{ role: "user", content: "what's my name?" }] },
  config,
);

console.log(finalResponse.messages.at(-1)?.content);
```

---

### Initialize Zapier NLA Agent

Source: https://docs.langchain.com/oss/javascript/integrations/tools/zapier_agent

Example demonstrating how to configure an OpenAI model with a Zapier toolkit to execute natural language tasks via an agent executor.

```typescript
import { OpenAI } from "@langchain/openai";
import { ZapierNLAWrapper } from "@langchain/classic/tools";
import {
  initializeAgentExecutorWithOptions,
  ZapierToolKit,
} from "@langchain/classic/agents";

const model = new OpenAI({ temperature: 0 });
const zapier = new ZapierNLAWrapper();
const toolkit = await ZapierToolKit.fromZapierNLAWrapper(zapier);

const executor = await initializeAgentExecutorWithOptions(
  toolkit.tools,
  model,
  {
    agentType: "zero-shot-react-description",
    verbose: true,
  },
);
console.log("Loaded agent.");

const input = `Summarize the last email I received regarding Silicon Valley Bank. Send the summary to the #test-zapier Slack channel.`;

console.log(`Executing with input "${input}"...`);

const result = await executor.invoke({ input });

console.log(`Got output ${result.output}`);
```

---

### Install LangChain dependencies

Source: https://docs.langchain.com/oss/javascript/langchain/rag

Installs the core LangChain library along with community and text splitter packages. Supports npm, yarn, and pnpm package managers.

```bash
npm i langchain @langchain/community @langchain/textsplitters
```

```bash
yarn add langchain @langchain/community @langchain/textsplitters
```

```bash
pnpm add langchain @langchain/community @langchain/textsplitters
```

---

### Initialize Deep Agent with System Prompt

Source: https://docs.langchain.com/oss/javascript/deepagents/context-engineering

Demonstrates how to instantiate a deep agent using the createDeepAgent function, providing a custom system prompt to define the agent's role and behavior.

```typescript
import { createDeepAgent } from "deepagents";

const agent = await createDeepAgent({
  model: "claude-sonnet-4-6",
  systemPrompt: `You are a research assistant specializing in scientific literature.
  Always cite sources. Use subagents for parallel research on different topics.`,
});
```

---

### Install LangChain JavaScript Packages for Voy

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/voy

Installs the necessary LangChain JavaScript packages, including those for OpenAI embeddings and the Voy vector store, using npm.

```bash
npm install @langchain/openai voy-search @langchain/community @langchain/core
```

---

### Implement Prisma Vector Store in TypeScript

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/prisma

Demonstrates how to initialize the PrismaVectorStore, add models to the database, and perform similarity searches using LangChain.

```typescript
import { PrismaVectorStore } from "@langchain/community/vectorstores/prisma";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PrismaClient, Prisma, Document } from "@prisma/client";

export const run = async () => {
  const db = new PrismaClient();
  const vectorStore = PrismaVectorStore.withModel<Document>(db).create(
    new OpenAIEmbeddings(),
    {
      prisma: Prisma,
      tableName: "Document",
      vectorColumnName: "vector",
      columns: {
        id: PrismaVectorStore.IdColumn,
        content: PrismaVectorStore.ContentColumn,
      },
    },
  );

  const texts = ["Hello world", "Bye bye", "What's this?"];
  await vectorStore.addModels(
    await db.$transaction(
      texts.map((content) => db.document.create({ data: { content } })),
    ),
  );

  const resultOne = await vectorStore.similaritySearch("Hello world", 1);
  console.log(resultOne);
};
```

---

### String PromptTemplate Usage

Source: https://docs.langchain.com/oss/javascript/integrations/chat/anthropic

Demonstrates how to create and invoke a simple string-based prompt template.

```APIDOC
## POST /prompts/string

### Description
Creates a prompt template from a string and formats it with provided variables.

### Method
POST

### Request Body
- **topic** (string) - Required - The variable to fill in the template.

### Request Example
{
  "topic": "cats"
}

### Response
#### Success Response (200)
- **output** (string) - The formatted prompt string.
```

---

### Install LangChain Packages for Rockset Integration

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/rockset

Installs the required LangChain JavaScript packages, including core, OpenAI, and community modules, needed for the Rockset integration.

```bash
npm install @langchain/openai @langchain/core @langchain/community
```

---

### Install LangChain OpenAI Package (npm)

Source: https://docs.langchain.com/oss/javascript/integrations/tools/jigsawstack

Installs the necessary LangChain package for OpenAI integration using npm. This is a common dependency for many LangChain applications.

```bash
npm install @langchain/openai
```

---

### Build Agent Workflow with Functional API (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/workflows-agents

This example illustrates building an agent using LangChain's Functional API. It defines tasks for calling the LLM and executing tools, then orchestrates these tasks within an entrypoint function that handles the agent's decision loop, tool execution, and response generation.

```typescript
import { task, entrypoint, addMessages } from "@langchain/langgraph";
import { BaseMessageLike, ToolCall } from "@langchain/core/messages";

const callLlm = task("llmCall", async (messages: BaseMessageLike[]) => {
  // LLM decides whether to call a tool or not
  return llmWithTools.invoke([
    {
      role: "system",
      content: "You are a helpful assistant tasked with performing arithmetic on a set of inputs."
    },
    ...messages
  ]);
});

const callTool = task("toolCall", async (toolCall: ToolCall) => {
  // Performs the tool call
  const tool = toolsByName[toolCall.name];
  return tool.invoke(toolCall.args);
});

const agent = entrypoint(
  "agent",
  async (messages) => {
    let llmResponse = await callLlm(messages);

    while (true) {
      if (!llmResponse.tool_calls?.length) {
        break;
      }

      // Execute tools
      const toolResults = await Promise.all(

```

---

### Install Ioredis Dependencies for LangChain JS

Source: https://docs.langchain.com/oss/javascript/integrations/stores/ioredis_storage

Installs the necessary packages for integrating ioredis with LangChain JavaScript, including community and core packages, and the ioredis client itself.

```bash
npm install @langchain/community @langchain/core ioredis
```

---

### Initialize and use CohereRerank with CohereClient

Source: https://docs.langchain.com/oss/javascript/integrations/document_compressors/cohere_rerank

Demonstrates how to instantiate a CohereClient and use it to configure a CohereRerank compressor. It shows the process of passing a list of documents and a query to receive reranked results with relevance scores.

```typescript
import { CohereRerank } from "@langchain/cohere";
import { CohereClient } from "cohere-ai";
import { Document } from "@langchain/core/documents";

const query = "What is the capital of the United States?";
const docs = [
  new Document({
    pageContent:
      "Carson City is the capital city of the American state of Nevada.",
  }),
  new Document({
    pageContent:
      "The Commonwealth of the Northern Mariana Islands... Its capital is Saipan.",
  }),
  new Document({
    pageContent:
      "Charlotte Amalie is the capital... of the United States Virgin Islands.",
  }),
  new Document({
    pageContent: "Washington, D.C. ... is the capital of the United States.",
  }),
  new Document({
    pageContent: "Capital punishment ... has existed in the United States...",
  }),
];

const client = new CohereClient({
  token: process.env.COHERE_API_KEY,
  environment: "<your-cohere-deployment-url>",
});

const cohereRerank = new CohereRerank({
  client,
  model: "rerank-english-v2.0",
});

const rerankedDocuments = await cohereRerank.rerank(docs, query, {
  topN: 5,
});

console.log(rerankedDocuments);
```

---

### Querying StackExchange with LangChain JavaScript

Source: https://docs.langchain.com/oss/javascript/integrations/tools/stackexchange

Demonstrates how to initialize the StackExchangeAPI tool and perform searches. It includes examples for standard queries, title-based filtering, and handling queries that return no results.

```typescript
import { StackExchangeAPI } from "@langchain/community/tools/stackexchange";

// Get results from StackExchange API
const stackExchangeTool = new StackExchangeAPI();
const result = await stackExchangeTool.invoke("zsh: command not found: python");
console.log(result);

// Get results from StackExchange API with title query
const stackExchangeTitleTool = new StackExchangeAPI({
  queryType: "title",
});
const titleResult = await stackExchangeTitleTool.invoke(
  "zsh: command not found: python",
);
console.log(titleResult);

// Get results from StackExchange API with bad query
const stackExchangeBadTool = new StackExchangeAPI();
const badResult = await stackExchangeBadTool.invoke(
  "sjefbsmnazdkhbazkbdoaencopebfoubaef",
);
console.log(badResult);
```

---

### Upload Data to Sandbox

Source: https://docs.langchain.com/oss/javascript/deepagents/data-analysis

Demonstrates how to create CSV data in memory and upload it to the initialized backend environment.

```python
import csv
import io

data = [["Date", "Product", "Units Sold", "Revenue"], ["2025-08-01", "Widget A", 10, 250]]
text_buf = io.StringIO()
writer = csv.writer(text_buf)
writer.writerows(data)
csv_bytes = text_buf.getvalue().encode("utf-8")
text_buf.close()

backend.upload_files([("/home/daytona/data/sales_data.csv", csv_bytes)])
```

---

### Install LangChain Text Splitters package

Source: https://docs.langchain.com/oss/javascript/integrations/splitters/recursive_text_splitter

Install the necessary dependency for using text splitting utilities in your JavaScript project using various package managers.

```bash
npm install @langchain/textsplitters
```

```bash
pnpm install @langchain/textsplitters
```

```bash
yarn add @langchain/textsplitters
```

```bash
bun add @langchain/textsplitters
```

---

### Configure Cassandra Connection for LangChain JS

Source: https://docs.langchain.com/oss/javascript/integrations/stores/cassandra_storage

Provides configuration examples for connecting to Cassandra, including settings for Apache Cassandra with contact points and credentials, and for Astra DB using a token and endpoint.

```typescript
const configConnection = {
  contactPoints: ['h1', 'h2'],
  localDataCenter: 'datacenter1',
  credentials: {
    username: <...> as string,
    password: <...> as string,
  },
};
```

```typescript
const configConnection = {
  serviceProviderArgs: {
    astra: {
      token: <...> as string,
      endpoint: <...> as string,
    },
  },
};
```

---

### Install LangChain Packages for Dria

Source: https://docs.langchain.com/oss/javascript/integrations/retrievers/dria

Install the necessary LangChain packages, including `@langchain/community` and `@langchain/core`, along with the Dria package, to enable Dria retriever functionality.

```bash
npm install dria @langchain/community @langchain/core
```

---

### Install Node VFS Package

Source: https://docs.langchain.com/oss/javascript/integrations/providers/node-vfs

Installs the @langchain/node-vfs package using npm, yarn, or pnpm. This package provides the VFS sandbox functionality for Node.js environments.

```bash
npm install @langchain/node-vfs
```

```bash
yarn add @langchain/node-vfs
```

```bash
pnpm add @langchain/node-vfs
```

---

### Initialize and Query SAP HANA Vectorstore

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/hanavector

This snippet demonstrates connecting to an SAP HANA instance, initializing the HanaDB vectorstore, adding documents with metadata, and performing filtered similarity searches.

```typescript
import { OpenAIEmbeddings } from "@langchain/openai";
import hanaClient from "hdb";
import { Document } from "@langchain/core/documents";
import {
  HanaDB,
  HanaDBArgs,
} from "@langchain/community/vectorstores/hanavector";

const connectionParams = {
  host: process.env.HANA_HOST,
  port: process.env.HANA_PORT,
  user: process.env.HANA_UID,
  password: process.env.HANA_PWD,
};
const client = hanaClient.createClient(connectionParams);

await new Promise<void>((resolve, reject) => {
  client.connect((err: Error) => {
    if (err) reject(err);
    else resolve();
  });
});

const embeddings = new OpenAIEmbeddings();
const args: HanaDBArgs = { connection: client, tableName: "testBasics" };
const docs: Document[] = [
  {
    pageContent: "foo",
    metadata: { start: 100, end: 150, docName: "foo.txt", quality: "bad" },
  },
  {
    pageContent: "bar",
    metadata: { start: 200, end: 250, docName: "bar.txt", quality: "good" },
  },
];

const vectorStore = new HanaDB(embeddings, args);
await vectorStore.initialize();
await vectorStore.delete({ filter: {} });
await vectorStore.addDocuments(docs);

const filterMeta = { quality: "bad" };
const results = await vectorStore.similaritySearch("foobar", 1, filterMeta);
console.log(results);

await vectorStore.delete({ filter: filterMeta });
client.disconnect();
```

---

### Initialize UI Pattern SDK Communication

Source: https://docs.langchain.com/oss/javascript/deepagents/frontend/subagent-streaming

Sets up the message listener and returns an interface for controlling the guest UI pattern. It includes methods for updating themes, views, code content, and registering lifecycle callbacks.

```javascript
window.addEventListener("message", handleMessage);
return {
  setTheme(theme) {
    postToGuest({ type: "SET_THEME", theme });
  },
  updateCode(files, entryFile) {
    postToGuest({ type: "UPDATE_CODE", files, entryFile });
  },
  onReady(callback) {
    return addListener("READY", callback);
  },
  destroy() {
    window.removeEventListener("message", handleMessage);
    listeners.clear();
  },
};
```

---

### Install HuggingFace Inference dependencies

Source: https://docs.langchain.com/oss/javascript/integrations/embeddings/hugging_face_inference

Install the necessary packages to use HuggingFace inference embeddings with LangChain, including the community package and the HuggingFace inference client.

```bash
npm install @langchain/community @langchain/core @huggingface/inference@4
```

---

### Install PDFLoader Dependencies (pnpm)

Source: https://docs.langchain.com/oss/javascript/integrations/document_loaders/file_loaders/pdf

Installs the necessary LangChain community package, core package, and the pdf-parse dependency using pnpm. This is required for using the PDFLoader.

```bash
pnpm add @langchain/community @langchain/core pdf-parse
```

---

### Install PDFLoader Dependencies (yarn)

Source: https://docs.langchain.com/oss/javascript/integrations/document_loaders/file_loaders/pdf

Installs the necessary LangChain community package, core package, and the pdf-parse dependency using yarn. This is required for using the PDFLoader.

```bash
yarn add @langchain/community @langchain/core pdf-parse
```

---

### Configure Elasticsearch Client Connection

Source: https://docs.langchain.com/oss/javascript/integrations/vectorstores/elasticsearch

Demonstrates how to initialize the Elasticsearch client using environment variables for the node URL and API key authentication.

```typescript
const config: ClientOptions = {
  node: process.env.ES_LOCAL_URL ?? "http://localhost:9200",
  auth: {
    apiKey: process.env.ES_LOCAL_API_KEY,
  },
};
```

---

### Install PDFLoader Dependencies (npm)

Source: https://docs.langchain.com/oss/javascript/integrations/document_loaders/file_loaders/pdf

Installs the necessary LangChain community package, core package, and the pdf-parse dependency using npm. This is required for using the PDFLoader.

```bash
npm install @langchain/community @langchain/core pdf-parse
```

---

### Basic Image Generation with Langchain.js

Source: https://docs.langchain.com/oss/javascript/integrations/tools/openai

Demonstrates the fundamental usage of the Image Generation tool to create an image from a text prompt. It shows how to invoke the model with the image generation tool and access the base64-encoded image output, saving it to a file.

```typescript
import { ChatOpenAI, tools } from "@langchain/openai";

const model = new ChatOpenAI({ model: "gpt-4.1" });

// Basic usage - generate an image
const response = await model.invoke(
  "Generate an image of a gray tabby cat hugging an otter with an orange scarf",
  { tools: [tools.imageGeneration()] },
);

// Access the generated image (base64-encoded)
const imageOutput = response.additional_kwargs.tool_outputs?.find(
  (output) => output.type === "image_generation_call",
);
if (imageOutput?.result) {
  const fs = await import("fs");
  fs.writeFileSync("output.png", Buffer.from(imageOutput.result, "base64"));
}
```

---

### Install LangChain Google Generative AI Package

Source: https://docs.langchain.com/oss/javascript/integrations/chat/google_generative_ai

Install the necessary dependencies using npm, yarn, or pnpm to integrate Google Generative AI with LangChain.

```npm
npm install @langchain/google-genai @langchain/core
```

```yarn
yarn add @langchain/google-genai @langchain/core
```

```pnpm
pnpm add @langchain/google-genai @langchain/core
```

---

### Install LangChain Tencent Hunyuan Dependencies

Source: https://docs.langchain.com/oss/javascript/integrations/chat/tencent_hunyuan

Commands to install the required LangChain community and core packages. For browser environments, additional cryptographic dependencies are required.

```bash
npm install @langchain/community @langchain/core
```

```bash
npm install crypto-js
```

---

### Integrate Tool Review into LangGraph Entrypoint

Source: https://docs.langchain.com/oss/javascript/langgraph/use-functional-api

Demonstrates how to incorporate the review logic within a LangGraph agent entrypoint. It processes tool calls, handles human reviews, and executes remaining tool calls while maintaining state.

```typescript
import {
  MemorySaver,
  entrypoint,
  interrupt,
  Command,
  addMessages,
} from "@langchain/langgraph";
import { ToolMessage, AIMessage, BaseMessage } from "@langchain/core/messages";

const checkpointer = new MemorySaver();

const agent = entrypoint(
  { checkpointer, name: "agent" },
  async (
    messages: BaseMessage[],
    previous?: BaseMessage[],
  ): Promise<BaseMessage> => {
    if (previous !== undefined) {
      messages = addMessages(previous, messages);
    }

    let modelResponse = await callModel(messages);
    while (true) {
      if (!modelResponse.tool_calls?.length) {
        break;
      }

      const toolResults: ToolMessage[] = [];
      const toolCalls: ToolCall[] = [];

      for (let i = 0; i < modelResponse.tool_calls.length; i++) {
        const review = reviewToolCall(modelResponse.tool_calls[i]);
        if (review instanceof ToolMessage) {
          toolResults.push(review);
        } else {
          toolCalls.push(review);
          if (review !== modelResponse.tool_calls[i]) {
            modelResponse.tool_calls[i] = review;
          }
        }
      }

      const remainingToolResults = await Promise.all(
        toolCalls.map((toolCall) => callTool(toolCall)),
      );

      messages = addMessages(messages, [
        modelResponse,
        ...toolResults,
        ...remainingToolResults,
      ]);

      modelResponse = await callModel(messages);
    }

    messages = addMessages(messages, modelResponse);
    return entrypoint.final({ value: modelResponse, save: messages });
  },
);
```

---

### Install DeepAgents and Anthropic Package (bun)

Source: https://docs.langchain.com/oss/javascript/deepagents/customization

Installs the deepagents package and the Anthropic integration for LangChain using bun. This is a prerequisite for using Anthropic models with DeepAgents.

```bash
bun add @langchain/anthropic deepagents
```

---

### Instantiate GradientLLM with credentials

Source: https://docs.langchain.com/oss/javascript/integrations/llms/gradient_ai

Configure the GradientLLM instance by providing your access token and workspace ID directly during initialization.

```typescript
const model = new GradientLLM({
  gradientAccessKey: "My secret Access Token",
  workspaceId: "My secret workspace id",
});
```
