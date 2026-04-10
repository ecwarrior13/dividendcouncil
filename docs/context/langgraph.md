### Define and Orchestrate Agent with Tools

Source: https://docs.langchain.com/oss/javascript/langgraph/quickstart

A comprehensive example showing how to define arithmetic tools, bind them to an Anthropic model, and create a multi-step agent using the task and entrypoint functional API.

```typescript
import { ChatAnthropic } from "@langchain/anthropic";
import { tool } from "@langchain/core/tools";
import { task, entrypoint, addMessages } from "@langchain/langgraph";
import {
  SystemMessage,
  HumanMessage,
  type BaseMessage,
} from "@langchain/core/messages";
import type { ToolCall } from "@langchain/core/messages/tool";
import * as z from "zod";

const model = new ChatAnthropic({ model: "claude-sonnet-4-6", temperature: 0 });

const add = tool(({ a, b }) => a + b, {
  name: "add",
  description: "Add two numbers",
  schema: z.object({
    a: z.number().describe("First number"),
    b: z.number().describe("Second number"),
  }),
});

const toolsByName = { [add.name]: add };
const modelWithTools = model.bindTools(Object.values(toolsByName));

const callLlm = task({ name: "callLlm" }, async (messages: BaseMessage[]) => {
  return modelWithTools.invoke([
    new SystemMessage("You are a helpful assistant."),
    ...messages,
  ]);
});

const callTool = task({ name: "callTool" }, async (toolCall: ToolCall) => {
  return toolsByName[toolCall.name].invoke(toolCall);
});

const agent = entrypoint({ name: "agent" }, async (messages: BaseMessage[]) => {
  let modelResponse = await callLlm(messages);
  while (modelResponse.tool_calls?.length) {
    const toolResults = await Promise.all(
      modelResponse.tool_calls.map((tc) => callTool(tc)),
    );
    messages = addMessages(messages, [modelResponse, ...toolResults]);
    modelResponse = await callLlm(messages);
  }
  return messages;
});
```

---

### Install and Test LangGraph API with TypeScript

Source: https://docs.langchain.com/oss/javascript/langgraph/deploy

This snippet demonstrates how to install the LangGraph SDK and then use it to send a message to an agent. It includes setting up the client with API credentials and streaming the response, logging each received chunk.

```shell
npm install @langchain/langgraph-sdk
```

```typescript
import { Client } from "@langchain/langgraph-sdk";

const client = new Client({
  apiUrl: "your-deployment-url",
  apiKey: "your-langsmith-api-key",
});

const streamResponse = client.runs.stream(
  null, // Threadless run
  "agent", // Name of agent. Defined in langgraph.json.
  {
    input: {
      messages: [{ role: "user", content: "What is LangGraph?" }],
    },
    streamMode: "messages",
  },
);

for await (const chunk of streamResponse) {
  console.log(`Receiving new event of type: ${chunk.event}...`);
  console.log(JSON.stringify(chunk.data));
  console.log("\n\n");
}
```

---

### Install Project Dependencies

Source: https://docs.langchain.com/oss/javascript/langgraph/studio

Installs the necessary project dependencies using the Yarn package manager.

```shell
yarn install
```

---

### Install LangGraph CLI

Source: https://docs.langchain.com/oss/javascript/langgraph/local-server

Installs the LangGraph CLI globally as a development dependency using npm.

```shell
npm install --save-dev @langchain/langgraph-cli
```

---

### Install LangGraph CLI

Source: https://docs.langchain.com/oss/javascript/langgraph/studio

Installs the LangGraph command-line interface tool required to run the local agent server for LangSmith Studio connectivity.

```shell
npx @langchain/langgraph-cli
```

---

### Full Integration Example with Postgres Store and Checkpointer

Source: https://docs.langchain.com/oss/javascript/langgraph/add-memory

A comprehensive example showing how to combine a PostgreSQL store and checkpointer with an LLM to maintain conversation state and long-term user memories.

```typescript
const store = PostgresStore.fromConnString(DB_URI);
const checkpointer = PostgresSaver.fromConnString(DB_URI);

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
```

---

### Install LangGraph JavaScript SDK

Source: https://docs.langchain.com/oss/javascript/langgraph/local-server

Installs the necessary LangGraph SDK package via npm to enable programmatic interaction with the LangGraph server.

```shell
npm install @langchain/langgraph-sdk
```

---

### Create a basic LangGraph agent

Source: https://docs.langchain.com/oss/javascript/langgraph/overview

A simple implementation of a stateful graph that defines a node, connects it to the start and end points, and invokes the graph with an initial message.

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

### Invoke LangGraph Agent

Source: https://docs.langchain.com/oss/javascript/langgraph/quickstart

Demonstrates how to invoke a LangGraph agent with a HumanMessage and iterate through the resulting message history to display output.

```typescript
import { HumanMessage } from "@langchain/core/messages";

const result = await agent.invoke([new HumanMessage("Add 3 and 4.")]);

for (const message of result) {
  console.log(`[${message.getType()}]: ${message.text}`);
}
```

---

### LangGraph Pregel Topic Channel Example (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/pregel

Shows how to use a Topic channel in Pregel, which accumulates all values written to it. This example demonstrates a node writing to multiple channels, including a Topic channel, and another node subscribing to one of the outputs.

```typescript
import { EphemeralValue, Topic } from "@langchain/langgraph/channels";
import { Pregel, NodeBuilder } from "@langchain/langgraph/pregel";

const node1 = new NodeBuilder()
  .subscribeOnly("a")
  .do((x: string) => x + x)
  .writeTo("b", "c");

const node2 = new NodeBuilder()
  .subscribeTo("b")
  .do((x: { b: string }) => x.b + x.b)
  .writeTo("c");

const app = new Pregel({
  nodes: { node1, node2 },
  channels: {
    a: new EphemeralValue<string>(),
    b: new EphemeralValue<string>(),
    c: new Topic<string>({ accumulate: true }),
  },
  inputChannels: ["a"],
  outputChannels: ["c"],
});

await app.invoke({ a: "foo" });
```

---

### Install LangGraph dependencies

Source: https://docs.langchain.com/oss/javascript/langgraph/overview

Commands to install the required LangGraph and LangChain core packages using various JavaScript package managers.

```npm
npm install @langchain/langgraph @langchain/core
```

```pnpm
pnpm add @langchain/langgraph @langchain/core
```

```yarn
yarn add @langchain/langgraph @langchain/core
```

```bun
bun add @langchain/langgraph @langchain/core
```

---

### Using the START Node in LangGraph

Source: https://docs.langchain.com/oss/javascript/langgraph/graph-api

Demonstrates the usage of the special START node in LangGraph. This node represents the entry point for user input into the graph and is used to define which nodes should be executed first.

```typescript
import { START, StateGraph } from "@langchain/langgraph";

// Assuming 'graph' is an instance of StateGraph
const graph = new StateGraph(/* State Schema */);

graph.addEdge(START, "nodeA"); // Defines an edge from START to nodeA
```

---

### Define Tool Node

Source: https://docs.langchain.com/oss/javascript/langgraph/quickstart

Implements a node that checks for tool calls in the last AI message, executes the corresponding tools, and returns the results as ToolMessages.

```typescript
import { AIMessage, ToolMessage } from "@langchain/core/messages";

const toolNode: GraphNode<typeof MessagesState> = async (state) => {
  const lastMessage = state.messages.at(-1);

  if (lastMessage == null || !AIMessage.isInstance(lastMessage)) {
    return { messages: [] };
  }

  const result: ToolMessage[] = [];
  for (const toolCall of lastMessage.tool_calls ?? []) {
    const tool = toolsByName[toolCall.name];
    const observation = await tool.invoke(toolCall);
    result.push(observation);
  }

  return { messages: result };
};
```

---

### Install project dependencies

Source: https://docs.langchain.com/oss/javascript/langgraph/local-server

Installs project dependencies in edit mode, allowing local changes to be used by the development server. This command should be run in the root of the LangGraph app directory.

```shell
cd path/to/your/app
npm install
```

---

### LangGraph Configuration Example (langgraph.json)

Source: https://docs.langchain.com/oss/javascript/langgraph/application-structure

A sample `langgraph.json` file demonstrating how to configure dependencies, define graphs, and set environment variables for a LangGraph application. This file is crucial for deployment.

```json
{
  "dependencies": ["."],
  "graphs": {
    "my_agent": "./your_package/your_file.js:agent"
  },
  "env": {
    "OPENAI_API_KEY": "secret-key"
  }
}
```

---

### Define Agent Logic with StateGraph in TypeScript

Source: https://docs.langchain.com/oss/javascript/langgraph/quickstart

This snippet defines the core logic for an agent using LangGraph's StateGraph. It sets up nodes for LLM calls and tool execution, and defines conditional edges to control the flow based on the LLM's response. It requires the `StateGraph`, `START`, and `END` components from `@langchain/langgraph`.

```typescript
const agent = new StateGraph(MessagesState)
  .addNode("llmCall", llmCall)
  .addNode("toolNode", toolNode)
  .addEdge(START, "llmCall")
  .addConditionalEdges("llmCall", shouldContinue, ["toolNode", END])
  .addEdge("toolNode", "llmCall")
  .compile();
```

---

### Install LangGraph and LangChain dependencies

Source: https://docs.langchain.com/oss/javascript/langgraph/agentic-rag

Installs the necessary packages for building RAG agents, including LangGraph, OpenAI integrations, community loaders, and text splitters.

```npm
npm install @langchain/langgraph @langchain/openai @langchain/community @langchain/textsplitters
```

```pnpm
pnpm install @langchain/langgraph @langchain/openai @langchain/community @langchain/textsplitters
```

```yarn
yarn add @langchain/langgraph @langchain/openai @langchain/community @langchain/textsplitters
```

```bun
bun add @langchain/langgraph @langchain/openai @langchain/community @langchain/textsplitters
```

---

### Create .env file

Source: https://docs.langchain.com/oss/javascript/langgraph/local-server

Example of creating a `.env` file and adding the LangSmith API key. This file is essential for authenticating with LangSmith services.

```bash
LANGSMITH_API_KEY=lsv2...
```

---

### Example: Using Postgres Checkpointer in LangGraph

Source: https://docs.langchain.com/oss/javascript/langgraph/add-memory

This comprehensive example shows how to use the PostgresSaver checkpointer within a LangGraph. It sets up the state schema, initializes a model, configures the PostgresSaver, defines a graph node to call the model, and demonstrates invoking the graph for multi-turn conversations, logging the responses.

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

const State = new StateSchema({
  messages: MessagesValue,
});

const model = new ChatAnthropic({ model: "claude-haiku-4-5-20251001" });

const DB_URI =
  "postgresql://postgres:postgres@localhost:5442/postgres?sslmode=disable";
const checkpointer = PostgresSaver.fromConnString(DB_URI);
// await checkpointer.setup();

const callModel: GraphNode<typeof State> = async (state) => {
  const response = await model.invoke(state.messages);
  return { messages: [response] };
};

const builder = new StateGraph(State)
  .addNode("call_model", callModel)
  .addEdge(START, "call_model");

const graph = builder.compile({ checkpointer });

const config = {
  configurable: {
    thread_id: "1",
  },
};

for await (const chunk of await graph.stream(
  { messages: [{ role: "user", content: "hi! I'm bob" }] },
  { ...config, streamMode: "values" },
)) {
  console.log(chunk.messages.at(-1)?.content);
}

for await (const chunk of await graph.stream(
  { messages: [{ role: "user", content: "what's my name?" }] },
  { ...config, streamMode: "values" },
)) {
  console.log(chunk.messages.at(-1)?.content);
}
```

---

### Install Vitest for Testing LangGraph Agents

Source: https://docs.langchain.com/oss/javascript/langgraph/test

Installs Vitest as a development dependency, which is a prerequisite for writing unit tests for LangGraph agents. This command is run in the terminal.

```bash
npm install -D vitest
```

---

### Full LangGraph Approval Workflow Example in TypeScript

Source: https://docs.langchain.com/oss/javascript/langgraph/interrupts

This comprehensive example sets up a LangGraph with an approval node that pauses execution. It uses Zod for state schema definition and a MemorySaver for checkpoiniting. The example demonstrates invoking the graph, receiving the interrupt payload, and resuming with a decision to approve or cancel.

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

### LangGraph Extended Example: SQL Database and LLM Interaction

Source: https://docs.langchain.com/oss/javascript/langgraph/use-graph-api

Presents a comprehensive example of a LangGraph workflow involving both querying a SQL database and calling an LLM. It showcases defining multiple nodes with different retry policies and chaining them together in a stateful graph.

```typescript
import Database from "better-sqlite3";
import { ChatAnthropic } from "@langchain/anthropic";
import {
  StateGraph,
  StateSchema,
  MessagesValue,
  GraphNode,
  START,
  END,
} from "@langchain/langgraph";
import { AIMessage } from "@langchain/core/messages";

const State = new StateSchema({
  messages: MessagesValue,
});

// Create an in-memory database
const db: typeof Database.prototype = new Database(":memory:");

const model = new ChatAnthropic({ model: "claude-3-5-sonnet-20240620" });

const callModel: GraphNode<typeof State> = async (state) => {
  const response = await model.invoke(state.messages);
  return { messages: [response] };
};

const queryDatabase: GraphNode<typeof State> = async (state) => {
  const queryResult: string = JSON.stringify(
    db.prepare("SELECT * FROM Artist LIMIT 10;").all(),
  );

  return { messages: [new AIMessage({ content: "queryResult" })] };
};

const workflow = new StateGraph(State)
  // Define the two nodes we will cycle between
  .addNode("call_model", callModel, { retryPolicy: { maxAttempts: 5 } })
  .addNode("query_database", queryDatabase, {
    retryPolicy: {
      retryOn: (e: any): boolean => {
        if (e instanceof Database.SqliteError) {
          // Retry on "SQLITE_BUSY" error
          return e.code === "SQLITE_BUSY";
        }
        return false; // Don't retry on other errors
      },
    },
  })
  .addEdge(START, "call_model")
  .addEdge("call_model", "query_database")
  .addEdge("query_database", END);

const graph = workflow.compile();
```

---

### Define Tools and Model with LangChain

Source: https://docs.langchain.com/oss/javascript/langgraph/quickstart

Initializes the Anthropic model and defines arithmetic tools (add, multiply, divide) using Zod schemas for input validation. The tools are bound to the model to enable tool-calling capabilities.

```typescript
import { ChatAnthropic } from "@langchain/anthropic";
import { tool } from "@langchain/core/tools";
import * as z from "zod";

const model = new ChatAnthropic({
  model: "claude-sonnet-4-6",
  temperature: 0,
});

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

const toolsByName = {
  [add.name]: add,
  [multiply.name]: multiply,
  [divide.name]: divide,
};
const tools = Object.values(toolsByName);
const modelWithTools = model.bindTools(tools);
```

---

### LangGraph Pregel Cycle Example (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/pregel

Illustrates how to create a cycle in a Pregel graph by having a node write to a channel it subscribes to. Execution continues until a null value is written to the channel, breaking the cycle.

```typescript
import { EphemeralValue } from "@langchain/langgraph/channels";
import {
  Pregel,
  NodeBuilder,
  ChannelWriteEntry,
} from "@langchain/langgraph/pregel";

const exampleNode = new NodeBuilder().subscribeOnly("value");
```

---

### Install LangGraph and Core Dependencies (bun)

Source: https://docs.langchain.com/oss/javascript/langgraph/workflows-agents

Installs the necessary LangGraph and core LangChain JavaScript libraries using bun. This is a prerequisite for building workflows and agents.

```bash
bun add @langchain/langgraph @langchain/core
```

---

### Correct Deterministic Workflow in TypeScript

Source: https://docs.langchain.com/oss/javascript/langgraph/functional-api

This example shows a deterministic workflow in TypeScript that relies on input values rather than the current time for decision-making. By using a task to get the current time and passing it as input, the workflow ensures consistent behavior across interruptions and resumptions.

```typescript
import { entrypoint, task, interrupt } from "@langchain/langgraph";

const getTime = task("getTime", () => Date.now());

const myWorkflow = entrypoint(
  { checkpointer, name: "workflow" },
  async (inputs: { t0: number }): Promise<any> => {
    const t1 = await getTime();

    const deltaT = t1 - inputs.t0;

    if (deltaT > 1000) {
      const result = await slowTask(1);
      const value = interrupt("question");
      return { result, value };
    } else {
      const result = await slowTask(2);
      const value = interrupt("question");
      return { result, value };
    }
  },
);
```

---

### Define LangChain Agent

Source: https://docs.langchain.com/oss/javascript/langgraph/studio

Demonstrates how to define a basic LangChain agent using the createAgent function, including a sample tool for email functionality.

```typescript
import { createAgent } from "@langchain/langgraph";

function sendEmail(to: string, subject: string, body: string): string {
  const email = {
    to: to,
    subject: subject,
    body: body,
  };
  return `Email sent to ${to}`;
}

const agent = createAgent({
  model: "gpt-4.1",
  tools: [sendEmail],
  systemPrompt: "You are an email assistant. Always use the sendEmail tool.",
});

export { agent };
```

---

### Define Model Node

Source: https://docs.langchain.com/oss/javascript/langgraph/quickstart

Creates a graph node that invokes the LLM with the current message history and system instructions, returning the updated messages and incrementing the LLM call counter.

```typescript
import { SystemMessage } from "@langchain/core/messages";

const llmCall: GraphNode<typeof MessagesState> = async (state) => {
  const response = await modelWithTools.invoke([
    new SystemMessage(
      "You are a helpful assistant tasked with performing arithmetic on a set of inputs.",
    ),
    ...state.messages,
  ]);
  return {
    messages: [response],
    llmCalls: 1,
  };
};
```

---

### Create and Invoke Graph with START Node (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/use-graph-api

This TypeScript code defines a StateGraph, adds a node, and sets the edge from the START constant to the node. It then compiles the graph and invokes it with an initial state, demonstrating a basic graph execution flow with a reducer.

```typescript
import { START } from "@langchain/langgraph";

const graph = new StateGraph(State)
  .addNode("node", node)
  .addEdge(START, "node")
  .compile();

const result = await graph.invoke({ messages: [new HumanMessage("Hi")] });

for (const message of result.messages) {
  console.log(`${message.getType()}: ${message.content}`);
}
```

---

### Install LangGraph dependency

Source: https://docs.langchain.com/oss/javascript/langgraph/use-subgraphs

The command to install the necessary LangGraph package for JavaScript/TypeScript projects. This is a prerequisite for building graphs and subgraphs.

```bash
npm install @langchain/langgraph
```

---

### Define Agent using Functional API (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/quickstart

Defines the main agent using LangGraph's `entrypoint` utility. This agent orchestrates the interaction between the model and tool nodes. It repeatedly calls the LLM, executes any requested tools, and updates the message history until the LLM no longer requests tool calls.

```typescript
import { addMessages } from "@langchain/langgraph";
import { type BaseMessage } from "@langchain/core/messages";

const agent = entrypoint({ name: "agent" }, async (messages: BaseMessage[]) => {
  let modelResponse = await callLlm(messages);

  while (true) {
    if (!modelResponse.tool_calls?.length) {
      break;
    }

    // Execute tools
    const toolResults = await Promise.all(
      modelResponse.tool_calls.map((toolCall) => callTool(toolCall))
    );
    messages = addMessages(messages, [modelResponse, ...toolResults]);
    modelResponse = await callLlm(messages);
  }

```

---

### LangGraph Subgraph Navigation with State Reducers in TypeScript

Source: https://docs.langchain.com/oss/javascript/langgraph/use-graph-api

This comprehensive example illustrates navigating between subgraphs and parent graphs in LangGraph JavaScript. It showcases how to define a parent graph with a subgraph, including a `StateSchema` with a `ReducedValue` for the 'foo' key. The example demonstrates how `Command.PARENT` facilitates navigation and how reducers handle state updates for shared keys between parent and subgraph.

```typescript
import {
  StateGraph,
  StateSchema,
  ReducedValue,
  GraphNode,
  Command,
  START,
} from "@langchain/langgraph";
import * as z from "zod";

const State = new StateSchema({
  // NOTE: we define a reducer here
  foo: new ReducedValue(z.string().default(""), { reducer: (x, y) => x + y }),
});

const nodeA: GraphNode<typeof State, "nodeB" | "nodeC"> = (state) => {
  console.log("Called A");
  const value = Math.random() > 0.5 ? "nodeB" : "nodeC";

  // note how Command allows you to BOTH update the graph state AND route to the next node
  return new Command({
    update: { foo: "a" }, // [!code highlight]
    goto: value,
    // this tells LangGraph to navigate to nodeB or nodeC in the parent graph
    // NOTE: this will navigate to the closest parent graph relative to the subgraph
    graph: Command.PARENT,
  });
};

const subgraph = new StateGraph(State)
  .addNode("nodeA", nodeA, { ends: ["nodeB", "nodeC"] })
  .addEdge(START, "nodeA")
  .compile();

const nodeB: GraphNode<typeof State> = (state) => {
  console.log("Called B"); // [!code highlight]
  // NOTE: since we've defined a reducer, we don't need to manually append
  // new characters to existing 'foo' value. instead, reducer will append these
  // automatically
  return { foo: "b" };
}; // [!code highlight]

const nodeC: GraphNode<typeof State> = (state) => {
  console.log("Called C");
  return { foo: "c" };
};

const graph = new StateGraph(State)
  .addNode("subgraph", subgraph, { ends: ["nodeB", "nodeC"] })
  .addNode("nodeB", nodeB)
  .addNode("nodeC", nodeC)
  .addEdge(START, "subgraph")
  .compile();
```

---

### Build and Compile LangGraph Agent (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/quickstart

Builds and compiles a LangGraph agent using a StateGraph. It defines nodes for LLM calls and tool execution, and sets up conditional edges to control the flow between these nodes. Finally, it invokes the agent with an initial human message and logs the response.

```typescript
import { HumanMessage } from "@langchain/core/messages";
import { StateGraph, START, END } from "@langchain/langgraph";

const agent = new StateGraph(MessagesState)
  .addNode("llmCall", llmCall)
  .addNode("toolNode", toolNode)
  .addEdge(START, "llmCall")
  .addConditionalEdges("llmCall", shouldContinue, ["toolNode", END])
  .addEdge("toolNode", "llmCall")
  .compile();

// Invoke
const result = await agent.invoke({
  messages: [new HumanMessage("Add 3 and 4.")],
});

for (const message of result.messages) {
  console.log(`[${message.type}]: ${message.text}`);
}
```

---

### Launch LangGraph development server

Source: https://docs.langchain.com/oss/javascript/langgraph/local-server

Starts the LangGraph API server locally in development mode. This server is suitable for local testing and debugging.

```shell
npx @langchain/langgraph-cli dev
```

---

### Full Example: Nested Subgraph Calls with Different State Schemas (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/use-subgraphs

Provides a complete example of calling a subgraph within a parent graph node, where both have distinct state schemas. This example includes transforming the parent's state to match the subgraph's expected input and then mapping the subgraph's output back to the parent's state. It also demonstrates a two-level nesting (parent -> child -> grandchild).

```typescript
import { StateGraph, StateSchema, START, END } from "@langchain/langgraph";
import * as z from "zod";

// Grandchild graph
const GrandChildState = new StateSchema({
  myGrandchildKey: z.string(),
});

const grandchild = new StateGraph(GrandChildState)
  .addNode("grandchild1", (state) => {
    // NOTE: child or parent keys will not be accessible here
    return { myGrandchildKey: state.myGrandchildKey + ", how are you" };
  })
  .addEdge(START, "grandchild1")
  .addEdge("grandchild1", END);

const grandchildGraph = grandchild.compile();

// Child graph
const ChildState = new StateSchema({
  myChildKey: z.string(),
});

const child = new StateGraph(ChildState)
  .addNode("child1", async (state) => {
    // NOTE: parent or grandchild keys won't be accessible here
    const grandchildGraphInput = { myGrandchildKey: state.myChildKey };   // [!code highlight]
    const grandchildGraphOutput = await grandchildGraph.invoke(grandchildGraphInput);
    return { myChildKey: grandchildGraphOutput.myGrandchildKey + " today?" };   // [!code highlight]
  })   // [!code highlight]
  .addEdge(START, "child1")
  .addEdge("child1", END);

const childGraph = child.compile();

// Parent graph
const ParentState = new StateSchema({
  myKey: z.string(),
});

const parent = new StateGraph(ParentState)
  .addNode("parent1", (state) => {
    // NOTE: child or grandchild keys won't be accessible here
    return { myKey: "hi " + state.myKey };
  })
  .addNode("child", async (state) => {

```

---

### Full Human-in-the-loop Workflow Example

Source: https://docs.langchain.com/oss/javascript/langgraph/interrupts

A complete implementation of a StateGraph that includes a review node, memory checkpointer, and the full lifecycle of invoking and resuming the graph.

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
  generatedText: z.string(),
});

const builder = new StateGraph(State)
  .addNode("review", async (state) => {
    const updated = interrupt({
      instruction: "Review and edit this content",
      content: state.generatedText,
    });
    return { generatedText: updated };
  })
  .addEdge(START, "review")
  .addEdge("review", END);

const checkpointer = new MemorySaver();
const graph = builder.compile({ checkpointer });

const config = { configurable: { thread_id: "review-42" } };
const initial = await graph.invoke({ generatedText: "Initial draft" }, config);

const finalState = await graph.invoke(
  new Command({ resume: "Improved draft after review" }),
  config,
);
console.log(finalState.generatedText);
```

---

### Install LangGraph and Core Dependencies (npm)

Source: https://docs.langchain.com/oss/javascript/langgraph/workflows-agents

Installs the necessary LangGraph and core LangChain JavaScript libraries using npm. This is a prerequisite for building workflows and agents.

```bash
npm install @langchain/langgraph @langchain/core
```

---

### Configure LangGraph Project

Source: https://docs.langchain.com/oss/javascript/langgraph/studio

Defines the langgraph.json configuration file to map the agent source file and environment variables for the CLI.

```json
{
  "dependencies": ["."],
  "graphs": {
    "agent": "./src/agent.ts:agent"
  },
  "env": ".env"
}
```

---

### Install LangGraph and Core Dependencies (pnpm)

Source: https://docs.langchain.com/oss/javascript/langgraph/workflows-agents

Installs the necessary LangGraph and core LangChain JavaScript libraries using pnpm. This is a prerequisite for building workflows and agents.

```bash
pnpm add @langchain/langgraph @langchain/core
```

---

### Define Graph State

Source: https://docs.langchain.com/oss/javascript/langgraph/quickstart

Sets up the state schema for the LangGraph agent, including message history and an accumulated count of LLM calls using a reducer function.

```typescript
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
import { z } from "zod/v4";

const MessagesState = new StateSchema({
  messages: MessagesValue,
  llmCalls: new ReducedValue(z.number().default(0), {
    reducer: (x, y) => x + y,
  }),
});
```

---

### LangGraph configuration JSON

Source: https://docs.langchain.com/oss/javascript/langgraph/local-server

Example output of the `npm create langgraph config` command, showing the structure of the generated `langgraph.json` file. It lists node version, exported graphs with their paths, and environment file.

```json
{
  "node_version": "24",
  "graphs": {
    "agent": "./src/agent.ts:agent",
    "searchAgent": "./src/search.ts:searchAgent"
  },
  "env": ".env"
}
```

---

### Install LangGraph and Core Dependencies (yarn)

Source: https://docs.langchain.com/oss/javascript/langgraph/workflows-agents

Installs the necessary LangGraph and core LangChain JavaScript libraries using yarn. This is a prerequisite for building workflows and agents.

```bash
yarn add @langchain/langgraph @langchain/core
```

---

### LangGraph Pregel Single Node Example (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/pregel

Demonstrates a basic Pregel graph with a single node that subscribes to an input channel, processes the data, and writes to an output channel. It utilizes EphemeralValue channels for input and output.

```typescript
import { EphemeralValue } from "@langchain/langgraph/channels";
import { Pregel, NodeBuilder } from "@langchain/langgraph/pregel";

const node1 = new NodeBuilder()
  .subscribeOnly("a")
  .do((x: string) => x + x)
  .writeTo("b");

const app = new Pregel({
  nodes: { node1 },
  channels: {
    a: new EphemeralValue<string>(),
    b: new EphemeralValue<string>(),
  },
  inputChannels: ["a"],
  outputChannels: ["b"],
});

await app.invoke({ a: "foo" });
```

---

### LangGraph Pregel Multiple Nodes Example (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/pregel

Illustrates a Pregel graph with two sequential nodes. The output of the first node is fed as input to the second node, demonstrating data flow through multiple stages. It uses EphemeralValue and LastValue channels.

```typescript
import { LastValue, EphemeralValue } from "@langchain/langgraph/channels";
import { Pregel, NodeBuilder } from "@langchain/langgraph/pregel";

const node1 = new NodeBuilder()
  .subscribeOnly("a")
  .do((x: string) => x + x)
  .writeTo("b");

const node2 = new NodeBuilder()
  .subscribeOnly("b")
  .do((x: string) => x + x)
  .writeTo("c");

const app = new Pregel({
  nodes: { node1, node2 },
  channels: {
    a: new EphemeralValue<string>(),
    b: new LastValue<string>(),
    c: new EphemeralValue<string>(),
  },
  inputChannels: ["a"],
  outputChannels: ["b", "c"],
});

await app.invoke({ a: "foo" });
```

---

### Define Tools and Model for Functional API (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/quickstart

Sets up a Claude Sonnet 4.5 model and defines tools for addition, multiplication, and division using Zod schemas. It then augments the model with these tools, making them available for the LLM to use.

```typescript
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
```

---

### Implement a dynamic routing graph with Command

Source: https://docs.langchain.com/oss/javascript/langgraph/use-graph-api

A complete example of defining a StateGraph where nodeA uses Command to dynamically route to either nodeB or nodeC based on logic, while updating the state.

```typescript
import {
  StateGraph,
  StateSchema,
  GraphNode,
  Command,
  START,
} from "@langchain/langgraph";
import * as z from "zod";

const State = new StateSchema({ foo: z.string() });

const nodeA: GraphNode<typeof State, "nodeB" | "nodeC"> = (state) => {
  const value = Math.random() > 0.5 ? "b" : "c";
  const goto = value === "b" ? "nodeB" : "nodeC";
  return new Command({ update: { foo: value }, goto });
};

const nodeB: GraphNode<typeof State> = (state) => ({ foo: state.foo + "b" });
const nodeC: GraphNode<typeof State> = (state) => ({ foo: state.foo + "c" });

const graph = new StateGraph(State)
  .addNode("nodeA", nodeA, { ends: ["nodeB", "nodeC"] })
  .addNode("nodeB", nodeB)
  .addNode("nodeC", nodeC)
  .addEdge(START, "nodeA")
  .compile();
```

---

### Implement Subgraphs with StateGraph

Source: https://docs.langchain.com/oss/javascript/langgraph/streaming

A complete example showing the definition of a subgraph and a parent graph, and how to stream updates from both using the subgraphs flag.

```typescript
import { StateGraph, StateSchema, START } from "@langchain/langgraph";
import { z } from "zod/v4";

const SubgraphState = new StateSchema({ foo: z.string(), bar: z.string() });
const subgraph = new StateGraph(SubgraphState)
  .addNode("subgraphNode1", (state) => ({ bar: "bar" }))
  .addNode("subgraphNode2", (state) => ({ foo: state.foo + state.bar }))
  .addEdge(START, "subgraphNode1")
  .addEdge("subgraphNode1", "subgraphNode2")
  .compile();

const ParentState = new StateSchema({ foo: z.string() });
const graph = new StateGraph(ParentState)
  .addNode("node1", (state) => ({ foo: "hi! " + state.foo }))
  .addNode("node2", subgraph)
  .addEdge(START, "node1")
  .addEdge("node1", "node2")
  .compile();

for await (const chunk of await graph.stream(
  { foo: "foo" },
  { streamMode: "updates", subgraphs: true },
)) {
  console.log(chunk);
}
```

---

### Launch LangGraph development server with tunnel

Source: https://docs.langchain.com/oss/javascript/langgraph/local-server

Starts the LangGraph API server locally with a secure tunnel. This is useful for compatibility with Safari, which has limitations connecting to localhost servers.

```shell
langgraph dev --tunnel
```

---

### Configure Graph Edges and Routing

Source: https://docs.langchain.com/oss/javascript/langgraph/graph-api

Provides examples for defining normal edges, conditional routing functions, and setting the entry point for a LangGraph state machine.

```typescript
// Normal edge
graph.addEdge("nodeA", "nodeB");

// Conditional edge with routing function
graph.addConditionalEdges("nodeA", routingFunction);

// Conditional edge with mapping
graph.addConditionalEdges("nodeA", routingFunction, {
  true: "nodeB",
  false: "nodeC",
});

// Entry point
import { START } from "@langchain/langgraph";
graph.addEdge(START, "nodeA");
```

---

### Define Tools for Agent in TypeScript

Source: https://docs.langchain.com/oss/javascript/langgraph/quickstart

This snippet defines a set of tools (add, multiply, divide) using LangChain's `tool` utility and Zod for schema definition. It then augments a chat model with these tools, making them available for the agent to use. It requires `ChatAnthropic`, `tool`, and `z` from their respective libraries.

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
```

---

### Example LangGraph Application File Structure (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/application-structure

Illustrates a typical directory layout for a LangGraph application using TypeScript. It includes directories for source code, utilities, and the main agent file, alongside configuration and environment files.

```plaintext
my-app/
├── src # all project code lies within here
│   ├── utils # optional utilities for your graph
│   │   ├── tools.ts # tools for your graph
│   │   ├── nodes.ts # node functions for your graph
│   │   └── state.ts # state definition of your graph
│   └── agent.ts # code for constructing your graph
├── package.json # package dependencies
├── .env # environment variables
└── langgraph.json # configuration file for LangGraph
```

---

### Implement a Complete Cyclic StateGraph

Source: https://docs.langchain.com/oss/javascript/langgraph/use-graph-api

A full example defining a StateSchema, nodes, conditional routing logic, and graph compilation to create a loop that terminates based on state length.

```typescript
import {
  StateGraph,
  StateSchema,
  ReducedValue,
  GraphNode,
  ConditionalEdgeRouter,
  START,
  END,
} from "@langchain/langgraph";
import * as z from "zod";

const State = new StateSchema({
  aggregate: new ReducedValue(
    z.array(z.string()).default(() => []),
    { reducer: (x, y) => x.concat(y) },
  ),
});

const nodeA: GraphNode<typeof State> = (state) => {
  console.log(`Node A sees ${state.aggregate}`);
  return { aggregate: ["A"] };
};

const nodeB: GraphNode<typeof State> = (state) => {
  console.log(`Node B sees ${state.aggregate}`);
  return { aggregate: ["B"] };
};

const route: ConditionalEdgeRouter<typeof State, "b"> = (state) => {
  if (state.aggregate.length < 7) {
    return "b";
  } else {
    return END;
  }
};

const graph = new StateGraph(State)
  .addNode("a", nodeA)
  .addNode("b", nodeB)
  .addEdge(START, "a")
  .addConditionalEdges("a", route)
  .addEdge("b", "a")
  .compile();
```

---

### Execute Parallel Operations with Synchronization

Source: https://docs.langchain.com/oss/javascript/langgraph/choosing-apis

Illustrates how to trigger multiple nodes simultaneously from the START node and synchronize them using a downstream node. This pattern is ideal for aggregating data from multiple independent sources.

```typescript
import { START } from "@langchain/langgraph";

workflow
  .addNode("fetchNews", fetchNews)
  .addNode("fetchWeather", fetchWeather)
  .addNode("fetchStocks", fetchStocks)
  .addNode("combineData", combineAllData)
  .addEdge(START, "fetchNews")
  .addEdge(START, "fetchWeather")
  .addEdge(START, "fetchStocks")
  .addEdge("fetchNews", "combineData")
  .addEdge("fetchWeather", "combineData")
  .addEdge("fetchStocks", "combineData");
```

---

### LangGraph Pregel BinaryOperatorAggregate Example (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/pregel

Demonstrates the use of BinaryOperatorAggregate channel to implement a reducer pattern in Pregel. A custom reducer function is defined to combine values written to the channel.

```typescript
import {
  EphemeralValue,
  BinaryOperatorAggregate,
} from "@langchain/langgraph/channels";
import { Pregel, NodeBuilder } from "@langchain/langgraph/pregel";

const node1 = new NodeBuilder()
  .subscribeOnly("a")
  .do((x: string) => x + x)
  .writeTo("b", "c");

const node2 = new NodeBuilder()
  .subscribeOnly("b")
  .do((x: string) => x + x)
  .writeTo("c");

const reducer = (current: string, update: string) => {
  if (current) {
    return current + " | " + update;
  } else {
    return update;
  }
};

const app = new Pregel({
  nodes: { node1, node2 },
  channels: {
    a: new EphemeralValue<string>(),
    b: new EphemeralValue<string>(),
    c: new BinaryOperatorAggregate<string>({ operator: reducer }),
  },
  inputChannels: ["a"],
  outputChannels: ["c"],
});

await app.invoke({ a: "foo" });
```

---

### Full Example: Trimming Messages in LangGraph with ChatAnthropic (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/add-memory

A comprehensive example showcasing the `trimMessages` utility within a LangGraph application using ChatAnthropic. It includes setting up the state, defining a node to call the model with trimmed messages, compiling the graph, and invoking it multiple times to demonstrate message history management.

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

### Extended Simple Workflow Example in TypeScript

Source: https://docs.langchain.com/oss/javascript/langgraph/use-functional-api

An extended example showcasing a simple workflow that classifies a number as even or odd using separate tasks. It utilizes `entrypoint` and `task` decorators, along with `MemorySaver` for persistence. The workflow is invoked with a unique thread ID.

```typescript
import { v4 as uuidv4 } from "uuid";
import { entrypoint, task, MemorySaver } from "@langchain/langgraph";

// Task that checks if a number is even
const isEven = task("isEven", async (number: number) => {
  return number % 2 === 0;
});

// Task that formats a message
const formatMessage = task("formatMessage", async (isEven: boolean) => {
  return isEven ? "The number is even." : "The number is odd.";
});

// Create a checkpointer for persistence
const checkpointer = new MemorySaver();

const workflow = entrypoint(
  { checkpointer, name: "workflow" },
  async (inputs: { number: number }) => {
    // Simple workflow to classify a number
    const even = await isEven(inputs.number);
    return await formatMessage(even);
  },
);

// Run the workflow with a unique thread ID
const config = { configurable: { thread_id: uuidv4() } };
const result = await workflow.invoke({ number: 7 }, config);
console.log(result);
```

---

### Implement Short-term Memory with Entrypoints

Source: https://docs.langchain.com/oss/javascript/langgraph/functional-api

Demonstrates how to use entrypoint and getPreviousState to maintain state across successive invocations using a checkpointer.

```typescript
import { entrypoint, getPreviousState } from "@langchain/langgraph";

const myWorkflow = entrypoint(
  { checkpointer, name: "workflow" },
  async (number: number) => {
    const previous = getPreviousState<number>() ?? 0;
    return number + previous;
  },
);

const config = {
  configurable: {
    thread_id: "some_thread_id",
  },
};

await myWorkflow.invoke(1, config); // 1 (previous was undefined)
await myWorkflow.invoke(2, config); // 3 (previous was 1 from the previous invocation)
```

---

### Invoke Agent and Log Results in TypeScript

Source: https://docs.langchain.com/oss/javascript/langgraph/quickstart

This snippet demonstrates how to invoke a compiled LangGraph agent with an initial human message and then iterate through the resulting messages, logging their type and content. It requires the `HumanMessage` class from `@langchain/core/messages` and the compiled agent object.

```typescript
import { HumanMessage } from "@langchain/core/messages";
const result = await agent.invoke({
  messages: [new HumanMessage("Add 3 and 4.")],
});

for (const message of result.messages) {
  console.log(`[${message.type}]: ${message.text}`);
}
```

---

### Handle Interrupt Exceptions Correctly in TypeScript

Source: https://docs.langchain.com/oss/javascript/langgraph/interrupts

Demonstrates how to correctly handle exceptions thrown by the `interrupt` function. The first example shows separating the `interrupt` call from potentially error-prone code. The second example illustrates how to conditionally catch specific errors while ensuring the `interrupt` exception is re-thrown to be processed by the graph.

```typescript
const nodeA: GraphNode<typeof State> = async (state) => {
  // ✅ Good: interrupting first, then handling error conditions separately
  const name = interrupt("What's your name?");
  try {
    await fetchData(); // This can fail
  } catch (err) {
    console.error(error);
  }
  return state;
};
```

```typescript
const nodeA: GraphNode<typeof State> = async (state) => {
  // ✅ Good: re-throwing the exception will
  // allow the interrupt to be passed back to
  // the graph
  try {
    const name = interrupt("What's your name?");
    await fetchData(); // This can fail
  } catch (err) {
    if (error instanceof NetworkError) {
      console.error(error);
    }
    throw error;
  }
  return state;
};
```

---

### Rapid Prototyping with Functional API

Source: https://docs.langchain.com/oss/javascript/langgraph/choosing-apis

Illustrates how to quickly iterate on workflows without defining complex state schemas by using the entrypoint decorator.

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

### Implement full interruptible graph workflow

Source: https://docs.langchain.com/oss/javascript/langgraph/interrupts

A complete example showing a StateGraph that uses an interruptible tool, compiles with a checkpointer, and resumes execution using a Command object.

```typescript
import { tool } from "@langchain/core/tools";
import { ChatAnthropic } from "@langchain/anthropic";
import {
  Command,
  MemorySaver,
  START,
  END,
  StateGraph,
  StateSchema,
  MessagesValue,
  GraphNode,
  interrupt,
} from "@langchain/langgraph";
import * as z from "zod";

const sendEmailTool = tool(
  async ({ to, subject, body }) => {
    const response = interrupt({
      action: "send_email",
      to,
      subject,
      body,
      message: "Approve sending this email?",
    });

    if (response?.action === "approve") {
      const finalTo = response.to ?? to;
      const finalSubject = response.subject ?? subject;
      const finalBody = response.body ?? body;
      console.log("[sendEmailTool]", finalTo, finalSubject, finalBody);
      return `Email sent to ${finalTo}`;
    }
    return "Email cancelled by user";
  },
  {
    name: "send_email",
    description: "Send an email to a recipient",
    schema: z.object({
      to: z.string(),
      subject: z.string(),
      body: z.string(),
    }),
  },
);

const model = new ChatAnthropic({ model: "claude-sonnet-4-6" }).bindTools([
  sendEmailTool,
]);

const State = new StateSchema({
  messages: MessagesValue,
});

const agent: typeof State.Node = async (state) => {
  const response = await model.invoke(state.messages);
  return { messages: [response] };
};

const graphBuilder = new StateGraph(State)
  .addNode("agent", agent)
  .addEdge(START, "agent")
  .addEdge("agent", END);

const checkpointer = new MemorySaver();
const graph = graphBuilder.compile({ checkpointer });

const config = { configurable: { thread_id: "email-workflow" } };
const initial = await graph.invoke(
  {
    messages: [
      {
        role: "user",
        content: "Send an email to alice@example.com about the meeting",
      },
    ],
  },
  config,
);

const resumed = await graph.invoke(
  new Command({
    resume: { action: "approve", subject: "Updated subject" },
  }),
  config,
);
```

---

### Initialize and Run Agent Chat UI

Source: https://docs.langchain.com/oss/javascript/langgraph/ui

Commands to set up the Agent Chat UI project locally. Users can either initialize a new project using the CLI tool or clone the repository directly from GitHub.

```bash
# Create a new Agent Chat UI project
npx create-agent-chat-app --project-name my-chat-ui
cd my-chat-ui

# Install dependencies and start
pnpm install
pnpm dev
```

```bash
# Clone the repository
git clone https://github.com/langchain-ai/agent-chat-ui.git
cd agent-chat-ui

# Install dependencies and start
pnpm install
pnpm dev
```

---

### Stream LangGraph Execution and Log Output in TypeScript

Source: https://docs.langchain.com/oss/javascript/langgraph/use-graph-api

This example shows how to execute the LangGraph and stream its execution steps. The output of each step, including state changes, is logged to the console. This is useful for debugging and understanding the graph's flow.

```typescript
// Call the graph: here we call it to generate a list of jokes
for await (const step of await graph.stream({ topic: "animals" })) {
  console.log(step);
}
```

---

### Define and Execute Tasks

Source: https://docs.langchain.com/oss/javascript/langgraph/functional-api

Shows how to define a task using the task function and execute it within an entrypoint context.

```typescript
import { task } from "@langchain/langgraph";

const slowComputation = task("slowComputation", async (inputValue: any) => {
  return result;
});

const myWorkflow = entrypoint(
  { checkpointer, name: "workflow" },
  async (someInput: number): Promise<number> => {
    return await slowComputation(someInput);
  },
);
```

---

### Implement PostgreSQL Store for Production

Source: https://docs.langchain.com/oss/javascript/langgraph/add-memory

Provides the implementation for using a persistent PostgreSQL database store instead of the in-memory version, including setup and configuration.

```typescript
import { PostgresStore } from "@langchain/langgraph-checkpoint-postgres/store";

const DB_URI = "postgresql://postgres:postgres@localhost:5442/postgres?sslmode=disable";
const store = PostgresStore.fromConnString(DB_URI);

const builder = new StateGraph(...);
const graph = builder.compile({ store });
```

---

### Create and Compile a LangGraph StateGraph (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/use-graph-api

This TypeScript code demonstrates how to initialize a StateGraph with a defined state schema, add a node to it, define the transition from a start state to the node, and then compile the graph. This sets up the basic structure for graph execution.

```typescript
import { StateGraph } from "@langchain/langgraph";

const graph = new StateGraph(State)
  .addNode("node", node)
  .addEdge("__start__", "node")
  .compile();
```

---

### Implement node-specific token streaming

Source: https://docs.langchain.com/oss/javascript/langgraph/streaming

A complete example showing the definition of a StateGraph with multiple nodes and the subsequent filtering of streamed tokens to capture output only from the 'writePoem' node.

```typescript
import { ChatOpenAI } from "@langchain/openai";
import {
  StateGraph,
  StateSchema,
  GraphNode,
  START,
} from "@langchain/langgraph";
import * as z from "zod";

const model = new ChatOpenAI({ model: "gpt-4.1-mini" });

const State = new StateSchema({
  topic: z.string(),
  joke: z.string(),
  poem: z.string(),
});

const writeJoke: GraphNode<typeof State> = async (state) => {
  const topic = state.topic;
  const jokeResponse = await model.invoke([
    { role: "user", content: `Write a joke about ${topic}` },
  ]);
  return { joke: jokeResponse.content };
};

const writePoem: GraphNode<typeof State> = async (state) => {
  const topic = state.topic;
  const poemResponse = await model.invoke([
    { role: "user", content: `Write a short poem about ${topic}` },
  ]);
  return { poem: poemResponse.content };
};

const graph = new StateGraph(State)
  .addNode("writeJoke", writeJoke)
  .addNode("writePoem", writePoem)
  .addEdge(START, "writeJoke")
  .addEdge(START, "writePoem")
  .compile();

for await (const [msg, metadata] of await graph.stream(
  { topic: "cats" },
  { streamMode: "messages" },
)) {
  if (msg.content && metadata.langgraph_node === "writePoem") {
    console.log(msg.content + "|");
  }
}
```

---

### Define Tool Node for Functional API (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/quickstart

Defines a tool node using LangGraph's `task` utility. This node takes a tool call object, looks up the corresponding tool by name, and invokes it with the provided arguments, returning the tool's result.

```typescript
import type { ToolCall } from "@langchain/core/messages/tool";

const callTool = task({ name: "callTool" }, async (toolCall: ToolCall) => {
  const tool = toolsByName[toolCall.name];
  return tool.invoke(toolCall);
});
```

---

### Full Example: Deleting Messages in LangGraph (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/add-memory

A comprehensive example showcasing the integration of message deletion within a LangGraph application. It defines the state schema, includes nodes for calling a model and deleting messages, and sets up the graph execution with a MemorySaver checkpointer.

```typescript
import { RemoveMessage } from "@langchain/core/messages";
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

const deleteMessages: GraphNode<typeof State> = (state) => {
  const messages = state.messages;
  if (messages.length > 2) {
    // remove the earliest two messages
    return {
      messages: messages
        .slice(0, 2)
        .map((m) => new RemoveMessage({ id: m.id })),
    };
  }
  return {};
};

const callModel: GraphNode<typeof State> = async (state) => {
  const response = await model.invoke(state.messages);
  return { messages: [response] };
};

const builder = new StateGraph(State)
  .addNode("call_model", callModel)
  .addNode("delete_messages", deleteMessages)
  .addEdge(START, "call_model")
  .addEdge("call_model", "delete_messages");

const checkpointer = new MemorySaver();
const app = builder.compile({ checkpointer });

const config = { configurable: { thread_id: "1" } };

for await (const event of await app.stream(
  { messages: [{ role: "user", content: "hi! I'm bob" }] },
  { ...config, streamMode: "values" },
)) {
  console.log(
    event.messages.map((message) => [message.getType(), message.content]),
  );
}

for await (const event of await app.stream(
  { messages: [{ role: "user", content: "what's my name?" }] },
  { ...config, streamMode: "values" },
)) {
  console.log(
    event.messages.map((message) => [message.getType(), message.content]),
  );
}
```

---

### Build a Sequential StateGraph in LangGraph

Source: https://docs.langchain.com/oss/javascript/langgraph/use-graph-api

Constructs a sequential graph using LangGraph's StateGraph. It adds nodes, defines the edges for control flow, and compiles the graph for execution. The START node is used to specify the entry point.

```typescript
import { START, StateGraph } from "@langchain/langgraph";

const graph = new StateGraph(State)
  .addNode("step1", step1)
  .addNode("step2", step2)
  .addNode("step3", step3)
  .addEdge(START, "step1")
  .addEdge("step1", "step2")
  .addEdge("step2", "step3")
  .compile();
```

---

### Perform partial graph execution using updateState and interruptAfter

Source: https://docs.langchain.com/oss/javascript/langgraph/test

This example demonstrates how to test a specific segment of a linear graph by injecting state into a node using updateState and halting execution after a target node using the interruptAfter configuration. It requires a compiled graph with a checkpointer to maintain thread state.

```typescript
import { test, expect } from "vitest";
import {
  StateGraph,
  StateSchema,
  START,
  END,
  MemorySaver,
} from "@langchain/langgraph";
import * as z from "zod";

const State = new StateSchema({
  my_key: z.string(),
});

const createGraph = () => {
  return new StateGraph(State)
    .addNode("node1", (state) => ({ my_key: "hello from node1" }))
    .addNode("node2", (state) => ({ my_key: "hello from node2" }))
    .addNode("node3", (state) => ({ my_key: "hello from node3" }))
    .addNode("node4", (state) => ({ my_key: "hello from node4" }))
    .addEdge(START, "node1")
    .addEdge("node1", "node2")
    .addEdge("node2", "node3")
    .addEdge("node3", "node4")
    .addEdge("node4", END);
};

test("partial execution from node2 to node3", async () => {
  const uncompiledGraph = createGraph();
  const checkpointer = new MemorySaver();
  const compiledGraph = uncompiledGraph.compile({ checkpointer });
  await compiledGraph.updateState(
    { configurable: { thread_id: "1" } },
    { my_key: "initial_value" },
    "node1",
  );
  const result = await compiledGraph.invoke(null, {
    configurable: { thread_id: "1" },
    interruptAfter: ["node3"],
  });
  expect(result.my_key).toBe("hello from node3");
});
```

---

### Configure Conditional Edges in LangGraph.js

Source: https://docs.langchain.com/oss/javascript/langgraph/graph-api

Demonstrates how to route execution from the START node or existing nodes using conditional logic. It includes both simple routing and mapping outputs to specific node names.

```typescript
import { START } from "@langchain/langgraph";

graph.addConditionalEdges(START, routingFunction);

graph.addConditionalEdges(START, routingFunction, {
  true: "nodeB",
  false: "nodeC",
});
```

---

### Create a Pregel Application with Functional API

Source: https://docs.langchain.com/oss/javascript/langgraph/pregel

Shows how to use the entrypoint decorator to define a functional Pregel application. This approach simplifies the graph creation process by wrapping logic in an entrypoint with optional checkpointer support.

```typescript
import { MemorySaver } from "@langchain/langgraph";
import { entrypoint } from "@langchain/langgraph/func";

interface Essay {
  topic: string;
  content?: string;
  score?: number;
}

const checkpointer = new MemorySaver();

const writeEssay = entrypoint(
  { checkpointer, name: "writeEssay" },
  async (essay: Essay) => {
    return {
      content: `Essay about ${essay.topic}`,
    };
  },
);
```

---

### Initialize and Invoke Pregel Graph in TypeScript

Source: https://docs.langchain.com/oss/javascript/langgraph/pregel

Demonstrates the creation of a Pregel instance with defined nodes and channels. It shows how to use the .do() and .writeTo() methods for data transformation and channel updates, followed by an asynchronous invocation.

```typescript
.do((x: string) => x.length < 10 ? x + x : null)
.writeTo(new ChannelWriteEntry("value", { skipNone: true }));

const app = new Pregel({
  nodes: { exampleNode },
  channels: {
    value: new EphemeralValue<string>(),
  },
  inputChannels: ["value"],
  outputChannels: ["value"],
});

await app.invoke({ value: "a" });
```

---

### Define Conditional Logic for Agent Flow (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/quickstart

Defines a conditional edge router to determine the next step in an agent's execution based on the last message. It checks if the last message is an AIMessage and if it contains tool calls to decide whether to proceed to a tool node or end the execution.

```typescript
import { ConditionalEdgeRouter, END } from "@langchain/langgraph";

const shouldContinue: ConditionalEdgeRouter<
  typeof MessagesState,
  "toolNode"
> = (state) => {
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
```

---

### Extending StateSchema with MessagesValue and Zod

Source: https://docs.langchain.com/oss/javascript/langgraph/graph-api

Shows how to extend the graph's state to include more than just messages. This example uses MessagesValue for messages and Zod for an array of strings representing documents.

```typescript
import { StateSchema, MessagesValue } from "@langchain/langgraph";
import * as z from "zod";

const State = new StateSchema({
  messages: MessagesValue,
  documents: z.array(z.string()),
});
```

---

### Setup useStream Hook for LangGraph Agents

Source: https://docs.langchain.com/oss/javascript/langgraph/frontend/graph-execution

Demonstrates how to initialize and use the `useStream` hook with a LangGraph agent across different frontend frameworks. It shows how to pass the agent type for type safety and configure the API endpoint and assistant ID. This hook is essential for managing real-time data streams from the agent.

```typescript
import type { myAgent } from "./agent";
```

```tsx
import { useStream } from "@langchain/react";

const AGENT_URL = "http://localhost:2024";

export function PipelineChat() {
  const stream = useStream<typeof myAgent>({
    apiUrl: AGENT_URL,
    assistantId: "graph_execution_cards",
  });

  return (
    <div>
      <PipelineProgress nodes={PIPELINE_NODES} values={stream.values} />
      <NodeCardList
        nodes={PIPELINE_NODES}
        messages={stream.messages}
        values={stream.values}
        getMetadata={stream.getMessagesMetadata}
      />
    </div>
  );
}
```

```vue
<script setup lang="ts">
import { useStream } from "@langchain/vue";

const AGENT_URL = "http://localhost:2024";

const stream = useStream<typeof myAgent>({
  apiUrl: AGENT_URL,
  assistantId: "graph_execution_cards",
});
</script>

<template>
  <div>
    <PipelineProgress :nodes="PIPELINE_NODES" :values="stream.values.value" />
    <NodeCardList
      :nodes="PIPELINE_NODES"
      :messages="stream.messages.value"
      :values="stream.values.value"
      :get-metadata="stream.getMessagesMetadata"
    />
  </div>
</template>
```

```svelte
<script lang="ts">
  import { useStream } from "@langchain/svelte";

  const AGENT_URL = "http://localhost:2024";

  const { messages, values, getMessagesMetadata, submit } = useStream<typeof myAgent>({
    apiUrl: AGENT_URL,
    assistantId: "graph_execution_cards",
  });
</script>

<div>
  <PipelineProgress nodes={PIPELINE_NODES} values={$values} />
  <NodeCardList
    nodes={PIPELINE_NODES}
    messages={$messages}
    values={$values}
    getMetadata={getMessagesMetadata}
  />
</div>
```

```typescript
import { Component } from "@angular/core";
import { useStream } from "@langchain/angular";

const AGENT_URL = "http://localhost:2024";

@Component({
  selector: "app-pipeline-chat",
  template: `
    <div>
      <app-pipeline-progress
        [nodes]="PIPELINE_NODES"
        [values]="stream.values()"
      />
      <app-node-card-list
        [nodes]="PIPELINE_NODES"
        [messages]="stream.messages()"
        [values]="stream.values()"
        [getMetadata]="stream.getMessagesMetadata"
      />
    </div>
  `,
})
export class PipelineChatComponent {
  PIPELINE_NODES = PIPELINE_NODES;

  stream = useStream<typeof myAgent>({
    apiUrl: AGENT_URL,
    assistantId: "graph_execution_cards",
  });
}
```

---

### Propagate Checkpointer to Subgraphs

Source: https://docs.langchain.com/oss/javascript/langgraph/add-memory

This example shows how a checkpointer, when provided during the compilation of a parent graph, is automatically propagated to its subgraphs. This simplifies memory management in complex graphs with nested structures.

```typescript
import {
  StateGraph,
  StateSchema,
  START,
  MemorySaver,
} from "@langchain/langgraph";
import { z } from "zod/v4";

const State = new StateSchema({ foo: z.string() });

const subgraphBuilder = new StateGraph(State)
  .addNode("subgraph_node_1", (state) => {
    return { foo: state.foo + "bar" };
  })
  .addEdge(START, "subgraph_node_1");
const subgraph = subgraphBuilder.compile();

const builder = new StateGraph(State)
  .addNode("node_1", subgraph)
  .addEdge(START, "node_1");

const checkpointer = new MemorySaver();
const graph = builder.compile({ checkpointer });
```

---

### Initialize Vector Store and Retriever Tool

Source: https://docs.langchain.com/oss/javascript/langgraph/agentic-rag

Demonstrates how to index documents into an in-memory vector store using OpenAI embeddings and wrap the retriever as a LangChain tool for agent use.

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

### Define Model Node for Functional API (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/quickstart

Defines a model node using LangGraph's `task` utility. This node is responsible for invoking the LLM, providing it with a system message and the current conversation history, and returning the LLM's response.

```typescript
import { task } from "@langchain/langgraph";
import { SystemMessage } from "@langchain/core/messages";

const callLlm = task({ name: "callLlm" }, async (messages: BaseMessage[]) => {
  return modelWithTools.invoke([
    new SystemMessage(
      "You are a helpful assistant tasked with performing arithmetic on a set of inputs.",
    ),
    ...messages,
  ]);
});
```

---

### Get Latest Graph State Snapshot (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/persistence

Demonstrates how to retrieve the latest state snapshot of a LangGraph using `graph.getState()`. This requires a configuration object specifying the `thread_id`.

```typescript
// get the latest state snapshot
const config = { configurable: { thread_id: "1" } };
await graph.getState(config);
```

---

### Create a new LangGraph app

Source: https://docs.langchain.com/oss/javascript/langgraph/local-server

Creates a new LangGraph project using the official JavaScript template.

```shell
npm create langgraph
```

---

### Accessing Checkpoint Namespace within a Node (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/persistence

This example shows how to access the checkpoint namespace within a LangGraph node function. The `checkpoint_ns` is available in the `RunnableConfig` and indicates whether the node is running in the root graph or a subgraph.

```typescript
import { RunnableConfig } from "@langchain/core/runnables";

function myNode(state: typeof State.Type, config: RunnableConfig) {
  const checkpointNs = config.configurable?.checkpoint_ns;
  // "" for the parent graph, "node_name:uuid" for a subgraph
}
```

---

### Implement retry policies for tasks

Source: https://docs.langchain.com/oss/javascript/langgraph/use-functional-api

Configures a RetryPolicy for tasks to handle transient errors. This example demonstrates a task that retries upon encountering an Error until successful.

```typescript
import {
  MemorySaver,
  entrypoint,
  task,
  RetryPolicy,
} from "@langchain/langgraph";

let attempts = 0;
const retryPolicy: RetryPolicy = { retryOn: (error) => error instanceof Error };

const getInfo = task({ name: "getInfo", retry: retryPolicy }, () => {
  attempts += 1;
  if (attempts < 2) {
    throw new Error("Failure");
  }
  return "OK";
});

const checkpointer = new MemorySaver();
const main = entrypoint(
  { checkpointer, name: "main" },
  async () => await getInfo(),
);

await main.invoke(
  { any_input: "foobar" },
  { configurable: { thread_id: "1" } },
);
```

---

### Handle GraphRecursionError in LangGraph

Source: https://docs.langchain.com/oss/javascript/langgraph/graph-api

Illustrates how to design a LangGraph with explicit termination conditions and catch `GraphRecursionError` as a safety net. This example shows building a graph, compiling it, invoking it, and gracefully handling the error if the recursion limit is exceeded.

```typescript
import {
  StateGraph,
  StateSchema,
  ReducedValue,
  GraphNode,
  ConditionalEdgeRouter,
  END,
  GraphRecursionError,
} from "@langchain/langgraph";
import { z } from "zod/v4";

const State = new StateSchema({
  messages: new ReducedValue(
    z.array(z.string()).default(() => []),
    { reducer: (x, y) => x.concat(y) },
  ),
});

// Build graph with explicit termination logic
const graph = new StateGraph(State)
  .addNode("reasoning", async (state) => {
    // Normal processing - design your graph with explicit termination conditions
    return {
      messages: ["thinking..."],
    };
  })
  .addConditionalEdges("reasoning", (state) => {
    // Add your termination condition here
    if (state.messages.length >= 5) {
      return END;
    }
    return "reasoning";
  });

const app = graph.compile();

// Catch GraphRecursionError as a safety net
try {
  const result = await app.invoke({ messages: [] }, { recursionLimit: 10 });
} catch (error) {
  if (error instanceof GraphRecursionError) {
    console.log("Recursion limit reached, handling gracefully");
    // Handle the error - return partial results, notify user, etc.
  }
}
```

---

### Define and Compile a StateGraph in TypeScript

Source: https://docs.langchain.com/oss/javascript/langgraph/frontend/overview

Defines a state schema using Zod and constructs a StateGraph with nodes and edges. This setup allows for structured data flow between processing steps like classification, research, and analysis.

```typescript
import {
  StateGraph,
  StateSchema,
  MessagesValue,
  START,
  END,
} from "@langchain/langgraph";
import * as z from "zod";

const State = new StateSchema({
  messages: MessagesValue,
  classification: z.string(),
  research: z.string(),
  analysis: z.string(),
});

const graph = new StateGraph(State)
  .addNode("classify", classifyNode)
  .addNode("research", researchNode)
  .addNode("analyze", analyzeNode)
  .addEdge(START, "classify")
  .addEdge("classify", "research")
  .addEdge("research", "analyze")
  .addEdge("analyze", END)
  .compile();
```

---

### Get Specific Graph State Snapshot by Checkpoint ID (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/persistence

Shows how to fetch a specific state snapshot from a LangGraph using `graph.getState()` by providing both `thread_id` and `checkpoint_id` in the configuration.

```typescript
// get a state snapshot for a specific checkpoint_id
const config = {
  configurable: {
    thread_id: "1",
    checkpoint_id: "1ef663ba-28fe-6528-8002-5a559208592c",
  },
};
await graph.getState(config);
```

---

### Conditional Edge Routing to Multiple Nodes

Source: https://docs.langchain.com/oss/javascript/langgraph/use-graph-api

This example demonstrates an advanced use case for conditional edges where a single condition can route the graph execution to multiple destination nodes simultaneously. The `routeBcOrCd` function illustrates this by returning an array of node names based on the state's 'which' property.

```typescript
const routeBcOrCd: ConditionalEdgeRouter<typeof State, "b" | "c" | "d"> = (
  state,
) => {
  if (state.which === "cd") {
    return ["c", "d"];
  }
  return ["b", "c"];
};
```

---

### Initialize MemoryStore in TypeScript

Source: https://docs.langchain.com/oss/javascript/langgraph/persistence

Demonstrates the basic initialization of a MemoryStore in TypeScript. This is the first step to managing memories within the LangGraph framework.

```typescript
import { MemoryStore } from "@langchain/langgraph";

const memoryStore = new MemoryStore();
```

---

### Incorrect Non-deterministic Workflow in TypeScript

Source: https://docs.langchain.com/oss/javascript/langgraph/functional-api

This example demonstrates a non-deterministic workflow in TypeScript where the execution path depends on the current time. This can lead to inconsistent results if the workflow is interrupted and resumed, as the time-based condition might evaluate differently.

```typescript
import { entrypoint, interrupt } from "@langchain/langgraph";

const myWorkflow = entrypoint(
  { checkpointer, name: "workflow" },
  async (inputs: { t0: number }) => {
    const t1 = Date.now();

    const deltaT = t1 - inputs.t0;

    if (deltaT > 1000) {
      const result = await slowTask(1);
      const value = interrupt("question");
      return { result, value };
    } else {
      const result = await slowTask(2);
      const value = interrupt("question");
      return { result, value };
    }
  },
);
```

---

### Define LLM Call Node in TypeScript

Source: https://docs.langchain.com/oss/javascript/langgraph/quickstart

This snippet defines an asynchronous function `llmCall` that serves as a node in a LangGraph. It invokes a tool-augmented language model with a system message and the current state's messages, returning the model's response and incrementing the LLM call count. It requires `SystemMessage`, `AIMessage`, `ToolMessage` from `@langchain/core/messages` and `GraphNode` from `@langchain/langgraph`.

```typescript
// Step 3: Define model node

import {
  SystemMessage,
  AIMessage,
  ToolMessage,
} from "@langchain/core/messages";

const llmCall: GraphNode<typeof MessagesState> = async (state) => {
  return {
    messages: [
      await modelWithTools.invoke([
        new SystemMessage(
          "You are a helpful assistant tasked with performing arithmetic on a set of inputs.",
        ),
        ...state.messages,
      ]),
    ],
    llmCalls: 1,
  };
};
```

---

### Define Tool Execution Node in TypeScript

Source: https://docs.langchain.com/oss/javascript/langgraph/quickstart

This snippet defines an asynchronous function `toolNode` for LangGraph. It processes the last message from the state, identifies any tool calls made by the AI, invokes the corresponding tools, and returns the tool outputs as messages. It handles cases where the last message is not an AIMessage or has no tool calls. It requires `AIMessage` and `ToolMessage` from `@langchain/core/messages` and `GraphNode` from `@langchain/langgraph`.

```typescript
// Step 4: Define tool node

const toolNode: GraphNode<typeof MessagesState> = async (state) => {
  const lastMessage = state.messages.at(-1);

  if (lastMessage == null || !AIMessage.isInstance(lastMessage)) {
    return { messages: [] };
  }

  const result: ToolMessage[] = [];
  for (const toolCall of lastMessage.tool_calls ?? []) {
    const tool = toolsByName[toolCall.name];
    const observation = await tool.invoke(toolCall);
    result.push(observation);
  }

  return { messages: result };
};
```

---

### Configure LLM Provider at Runtime

Source: https://docs.langchain.com/oss/javascript/langgraph/use-graph-api

Demonstrates how to switch between different LLM providers (OpenAI and Anthropic) dynamically by passing a configuration object at runtime.

```typescript
import { ChatOpenAI } from "@langchain/openai";
import { ChatAnthropic } from "@langchain/anthropic";
import {
  StateGraph,
  StateSchema,
  MessagesValue,
  GraphNode,
  START,
  END,
} from "@langchain/langgraph";
import * as z from "zod";

const ConfigSchema = z.object({
  modelProvider: z.string().default("anthropic"),
});

const State = new StateSchema({
  messages: MessagesValue,
});

const MODELS = {
  anthropic: new ChatAnthropic({ model: "claude-haiku-4-5-20251001" }),
  openai: new ChatOpenAI({ model: "gpt-4.1-mini" }),
};

const callModel: GraphNode<typeof State> = async (state, config) => {
  const modelProvider = config?.configurable?.modelProvider || "anthropic";
  const model = MODELS[modelProvider as keyof typeof MODELS];
  const response = await model.invoke(state.messages);
  return { messages: [response] };
};

const graph = new StateGraph(State, ConfigSchema)
  .addNode("model", callModel)
  .addEdge(START, "model")
  .addEdge("model", END)
  .compile();

const inputMessage = { role: "user", content: "hi" };
const response1 = await graph.invoke({ messages: [inputMessage] });
const response2 = await graph.invoke(
  { messages: [inputMessage] },
  { configurable: { modelProvider: "openai" } },
);
```

---

### Implement shared and private state schemas in subgraphs

Source: https://docs.langchain.com/oss/javascript/langgraph/use-subgraphs

Shows a complex implementation where a subgraph utilizes both shared state keys (visible to the parent) and private state keys (local to the subgraph). This example demonstrates how to manage state flow across nested graph boundaries.

```typescript
import { StateGraph, StateSchema, START } from "@langchain/langgraph";
import * as z from "zod";

// Define subgraph
const SubgraphState = new StateSchema({
  foo: z.string(),
  bar: z.string(),
});

const subgraphBuilder = new StateGraph(SubgraphState)
  .addNode("subgraphNode1", (state) => {
    return { bar: "bar" };
  })
  .addNode("subgraphNode2", (state) => {
    return { foo: state.foo + state.bar };
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
  .addNode("node2", subgraph)
  .addEdge(START, "node1")
  .addEdge("node1", "node2");

const graph = builder.compile();

for await (const chunk of await graph.stream({ foo: "foo" })) {
  console.log(chunk);
}
```

---

### Execute Workflow via Invoke and Stream

Source: https://docs.langchain.com/oss/javascript/langgraph/functional-api

Demonstrates how to run a defined workflow using invoke for a single result or stream for iterative output chunks. Both methods accept a configuration object for thread identification.

```typescript
const config = { configurable: { thread_id: "some_thread_id" } };
await myWorkflow.invoke(someInput, config);

for await (const chunk of myWorkflow.stream(someInput, config)) {
  console.log(chunk);
}
```

---

### Iterate Through Thread State History with LangGraph

Source: https://docs.langchain.com/oss/javascript/langgraph/add-memory

This example demonstrates how to retrieve the complete history of states for a given thread in LangGraph. It uses an async iterator with `getStateHistory` to collect all previous states, allowing for detailed analysis of the conversation flow.

```typescript
const config = {
  configurable: {
    thread_id: "1",
  },
};

const history = [];
for await (const state of graph.getStateHistory(config)) {
  history.push(state);
}
```

---

### Compose Essay Workflow with LLM in TypeScript

Source: https://docs.langchain.com/oss/javascript/langgraph/use-functional-api

Demonstrates composing a workflow that uses an LLM to generate an essay. This example utilizes the `@task` and `@entrypoint` decorators, integrates with `ChatOpenAI`, and uses `MemorySaver` for persistence. The workflow is executed with a specific topic and a unique thread ID.

```typescript
import { v4 as uuidv4 } from "uuid";
import { ChatOpenAI } from "@langchain/openai";
import { entrypoint, task, MemorySaver } from "@langchain/langgraph";

const model = new ChatOpenAI({ model: "gpt-3.5-turbo" });

// Task: generate essay using an LLM
const composeEssay = task("composeEssay", async (topic: string) => {
  // Generate an essay about the given topic
  const response = await model.invoke([
    {
      role: "system",
      content: "You are a helpful assistant that writes essays.",
    },
    { role: "user", content: `Write an essay about ${topic}.` },
  ]);
  return response.content as string;
});

// Create a checkpointer for persistence
const checkpointer = new MemorySaver();

const workflow = entrypoint(
  { checkpointer, name: "workflow" },
  async (topic: string) => {
    // Simple workflow that generates an essay with an LLM
    return await composeEssay(topic);
  },
);

// Execute the workflow
const config = { configurable: { thread_id: uuidv4() } };
const result = await workflow.invoke("the history of flight", config);
console.log(result);
```

---

### Define State Schema for LangGraph in TypeScript

Source: https://docs.langchain.com/oss/javascript/langgraph/quickstart

This snippet defines the state schema for a LangGraph agent, specifying that the state should contain a list of messages and a count of LLM calls, which is reduced by summing. It uses `StateSchema`, `MessagesValue`, `ReducedValue`, `z` from Zod, and `StateGraph` from `@langchain/langgraph`.

```typescript
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
  llmCalls: new ReducedValue(z.number().default(0), {
    reducer: (x, y) => x + y,
  }),
});
```

---

### Implement Caching for Tasks in TypeScript

Source: https://docs.langchain.com/oss/javascript/langgraph/use-functional-api

Demonstrates how to use the `task` and `entrypoint` functions with caching enabled. The `ttl` option in the `task` configuration specifies the cache invalidation time in seconds. This example shows how a slow task is executed once and subsequent calls within the TTL are served from the cache.

```typescript
import {
  InMemoryCache,
  entrypoint,
  task,
  CachePolicy,
} from "@langchain/langgraph";

const slowAdd = task(
  {
    name: "slowAdd",
    cache: { ttl: 120 },
  },
  async (x: number) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return x * 2;
  },
);

const main = entrypoint(
  { cache: new InMemoryCache(), name: "main" },
  async (inputs: { x: number }) => {
    const result1 = await slowAdd(inputs.x);
    const result2 = await slowAdd(inputs.x);
    return { result1, result2 };
  },
);

for await (const chunk of await main.stream(
  { x: 5 },
  { streamMode: "updates" },
)) {
  console.log(chunk);
}
```

---

### Handling Interrupts and Time Travel in LangGraph JS

Source: https://docs.langchain.com/oss/javascript/langgraph/use-time-travel

Illustrates how interrupts, used for human-in-the-loop workflows, are re-triggered during time travel. The node with the interrupt re-executes, pausing for a new `Command(resume=...)`. This example shows initial run, resuming, replaying, and forking from an interrupt.

```typescript
import { interrupt, Command } from "@langchain/langgraph";

function askHuman(state: { value: string[] }) {
  const answer = interrupt("What is your name?");
  return { value: [`Hello, ${answer}!`] };
}

function finalStep(state: { value: string[] }) {
  return { value: ["Done"] };
}

// ... build graph with checkpointer ...

// First run: hits interrupt
await graph.invoke({ value: [] }, config);
// Resume with answer
await graph.invoke(new Command({ resume: "Alice" }), config);

// Replay from before askHuman
const states = [];
for await (const state of graph.getStateHistory(config)) {
  states.push(state);
}
const beforeAsk = states.filter((s) => s.next.includes("askHuman")).pop();

const replayResult = await graph.invoke(null, beforeAsk.config);
// Pauses at interrupt — waiting for new Command({ resume: ... })

// Fork from before askHuman
const forkConfig = await graph.updateState(beforeAsk.config, {
  value: ["forked"],
});
const forkResult = await graph.invoke(null, forkConfig);
// Pauses at interrupt — waiting for new Command({ resume: ... })

// Resume the forked interrupt with a different answer
await graph.invoke(new Command({ resume: "Bob" }), forkConfig);
// Result: { value: ["forked", "Hello, Bob!", "Done"] }
```

---

### Create Workers with Send API in LangGraph (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/workflows-agents

This TypeScript code demonstrates how to create dynamic worker nodes and send them specific inputs using LangGraph's Send API. It defines graph and worker states, orchestrator, LLM call, and synthesizer nodes, and sets up conditional edges for parallel processing. The example iterates over report sections, assigning each to an 'llmCall' worker and then synthesizing the results.

```typescript
import {
  StateGraph,
  StateSchema,
  ReducedValue,
  GraphNode,
  Send,
} from "@langchain/langgraph";
import * as z from "zod";

// Graph state
const State = new StateSchema({
  topic: z.string(),
  sections: z.array(z.custom<SectionsSchema>()),
  completedSections: new ReducedValue(
    z.array(z.string()).default(() => []),
    { reducer: (a, b) => a.concat(b) },
  ),
  finalReport: z.string(),
});

// Worker state
const WorkerState = new StateSchema({
  section: z.custom<SectionsSchema>(),
  completedSections: new ReducedValue(
    z.array(z.string()).default(() => []),
    { reducer: (a, b) => a.concat(b) },
  ),
});

// Nodes
const orchestrator: GraphNode<typeof State> = async (state) => {
  // Generate queries
  const reportSections = await planner.invoke([
    { role: "system", content: "Generate a plan for the report." },
    { role: "user", content: `Here is the report topic: ${state.topic}` },
  ]);

  return { sections: reportSections.sections };
};

const llmCall: GraphNode<typeof WorkerState> = async (state) => {
  // Generate section
  const section = await llm.invoke([
    {
      role: "system",
      content:
        "Write a report section following the provided name and description. Include no preamble for each section. Use markdown formatting.",
    },
    {
      role: "user",
      content: `Here is the section name: ${state.section.name} and description: ${state.section.description}`,
    },
  ]);

  // Write the updated section to completed sections
  return { completedSections: [section.content] };
};

const synthesizer: GraphNode<typeof State> = async (state) => {
  // List of completed sections
  const completedSections = state.completedSections;

  // Format completed section to str to use as context for final sections
  const completedReportSections = completedSections.join("\n\n---\n\n");

  return { finalReport: completedReportSections };
};

// Conditional edge function to create llm_call workers that each write a section of the report
const assignWorkers: ConditionalEdgeRouter<typeof State, "llmCall"> = (
  state,
) => {
  // Kick off section writing in parallel via Send() API
  return state.sections.map((section) => new Send("llmCall", { section }));
};

// Build workflow
const orchestratorWorker = new StateGraph(State)
  .addNode("orchestrator", orchestrator)
  .addNode("llmCall", llmCall)
  .addNode("synthesizer", synthesizer)
  .addEdge("__start__", "orchestrator")
  .addConditionalEdges("orchestrator", assignWorkers, ["llmCall"])
  .addEdge("llmCall", "synthesizer")
  .addEdge("synthesizer", "__end__")
  .compile();

// Invoke
const state = await orchestratorWorker.invoke({
  topic: "Create a report on LLM scaling laws",
});
console.log(state.finalReport);
```

---

### Implement a Stateful Chatbot with LangGraph Functional API

Source: https://docs.langchain.com/oss/javascript/langgraph/use-functional-api

This example demonstrates a chatbot that maintains conversation history using the MemorySaver checkpointer. It utilizes the functional API to define tasks and workflows, allowing the model to recall user information across multiple inputs.

```typescript
import { BaseMessage } from "@langchain/core/messages";
import {
  addMessages,
  entrypoint,
  task,
  MemorySaver,
} from "@langchain/langgraph";
import { ChatAnthropic } from "@langchain/anthropic";

const model = new ChatAnthropic({ model: "claude-sonnet-4-6" });

const callModel = task(
  "callModel",
  async (messages: BaseMessage[]): Promise<BaseMessage> => {
    const response = await model.invoke(messages);
    return response;
  },
);

const checkpointer = new MemorySaver();

const workflow = entrypoint(
  { checkpointer, name: "workflow" },
  async (
    inputs: BaseMessage[],
    previous?: BaseMessage[],
  ): Promise<BaseMessage> => {
    let messages = inputs;
    if (previous) {
      messages = addMessages(previous, inputs);
    }

    const response = await callModel(messages);
    return entrypoint.final({
      value: response,
      save: addMessages(messages, response),
    });
  },
);

const config = { configurable: { thread_id: "1" } };
const inputMessage = { role: "user", content: "hi! I'm bob" };

for await (const chunk of await workflow.stream([inputMessage], {
  ...config,
  streamMode: "values",
})) {
  console.log(chunk.content);
}

const inputMessage2 = { role: "user", content: "what's my name?" };
for await (const chunk of await workflow.stream([inputMessage2], {
  ...config,
  streamMode: "values",
})) {
  console.log(chunk.content);
}
```

---

### Emit Custom Data from LangGraph Tool (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/streaming

This example shows how to emit custom data from a tool used within LangGraph. Similar to nodes, the `writer` parameter in `LangGraphRunnableConfig` is used to send custom progress updates or other relevant information. The stream must be configured with `streamMode: "custom"` to capture this data.

```typescript
import { tool } from "@langchain/core/tools";
import { LangGraphRunnableConfig } from "@langchain/langgraph";
import * as z from "zod";

const queryDatabase = tool(
  async (input, config: LangGraphRunnableConfig) => {
    // Use the writer to emit a custom key-value pair (e.g., progress update)
    config.writer({ data: "Retrieved 0/100 records", type: "progress" });
    // perform query
    // Emit another custom key-value pair
    config.writer({ data: "Retrieved 100/100 records", type: "progress" });
    return "some-answer";
  },
  {
    name: "query_database",
    description: "Query the database.",
    schema: z.object({
      query: z.string().describe("The query to execute."),
    }),
  }
);

const graph = // ... define a graph that uses this tool

// Set streamMode: "custom" to receive the custom data in the stream
for await (const chunk of await graph.stream(inputs, { streamMode: "custom" })) {
  console.log(chunk);
}
```

---

### Implement Functional API for Procedural Code

Source: https://docs.langchain.com/oss/javascript/langgraph/choosing-apis

Demonstrates how to wrap existing procedural logic using the task and entrypoint decorators to integrate LangGraph features with minimal refactoring.

```typescript
import { task, entrypoint } from "@langchain/langgraph";

const processUserInput = task("processUserInput", async (userInput: string) => {
  return { processed: userInput.toLowerCase().trim() };
});

const workflow = entrypoint({ checkpointer }, async (userInput: string) => {
  const processed = await processUserInput(userInput);

  let response: string;
  if (processed.processed.includes("urgent")) {
    response = await handleUrgentRequest(processed);
  } else {
    response = await handleNormalRequest(processed);
  }

  return response;
});
```

---

### Get Full Graph State History in TypeScript

Source: https://docs.langchain.com/oss/javascript/langgraph/persistence

Retrieves the complete chronological history of a graph's execution for a specified thread. It returns a list of `StateSnapshot` objects, ordered from most recent to oldest. This method is asynchronous and can be iterated over using a for-await-of loop.

```typescript
const config = { configurable: { thread_id: "1" } };
for await (const state of graph.getStateHistory(config)) {
  console.log(state);
}
```

---

### Determine Agent Continuation Logic in TypeScript

Source: https://docs.langchain.com/oss/javascript/langgraph/quickstart

This snippet defines a conditional function `shouldContinue` that determines the next step in a LangGraph agent's execution. It checks if the last message is an AIMessage and if it contains any tool calls. If tool calls are present, it returns 'toolNode'; otherwise, it returns `END` to stop the agent. It requires `AIMessage` and `END` from `@langchain/langgraph`.

```typescript
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
```

---

### Define a LangGraph Entrypoint

Source: https://docs.langchain.com/oss/javascript/langgraph/functional-api

Creates a workflow instance using the entrypoint function. It requires a configuration object and an asynchronous function that accepts a single input argument.

```typescript
import { entrypoint } from "@langchain/langgraph";

const myWorkflow = entrypoint(
  { checkpointer, name: "workflow" },
  async (someInput: Record<string, any>): Promise<number> => {
    return result;
  },
);
```

---

### Create Linear Workflows with Interrupts

Source: https://docs.langchain.com/oss/javascript/langgraph/choosing-apis

Shows how to manage sequential logic and human-in-the-loop checkpoints using the interrupt function within an entrypoint.

```typescript
import { entrypoint, interrupt } from "@langchain/langgraph";

const essayWorkflow = entrypoint({ checkpointer }, async (topic: string) => {
  let outline = await createOutline(topic);

  if (outline.points.length < 3) {
    outline = await expandOutline(outline);
  }

  const draft = await writeDraft(outline);

  const feedback = interrupt({ draft, action: "Please review" });

  let finalEssay: string;
  if (feedback === "approve") {
    finalEssay = draft;
  } else {
    finalEssay = await reviseEssay(draft, feedback);
  }

  return { essay: finalEssay };
});
```

---

### Define State using Annotation.Root

Source: https://docs.langchain.com/oss/javascript/langgraph/use-graph-api

Shows how to use the declarative Annotation.Root API to define state schemas with built-in or custom reducers.

```typescript
import { BaseMessage } from "@langchain/core/messages";
import {
  Annotation,
  StateGraph,
  messagesStateReducer,
} from "@langchain/langgraph";

const State = Annotation.Root({
  messages: Annotation<BaseMessage[]>({
    reducer: messagesStateReducer,
    default: () => [],
  }),
  question: Annotation<string>(),
  count: Annotation<number>({
    reducer: (current, update) => current + update,
    default: () => 0,
  }),
});

const graph = new StateGraph(State);
```

---

### Test Email Agent with Urgent Issue (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/thinking-in-langgraph

This snippet demonstrates how to initialize and invoke a LangGraph email agent with an urgent billing issue. It sets up the initial state including the email content, sender, and ID, then runs the agent using a thread ID for persistence. The output shows the initial response before human review.

```typescript
const initialState: EmailAgentStateType = {
  emailContent: "I was charged twice for my subscription! This is urgent!",
  senderEmail: "customer@example.com",
  emailId: "email_123",
};

// Run with a thread_id for persistence
const config = { configurable: { thread_id: "customer_123" } };
const result = await app.invoke(initialState, config);
// The graph will pause at human_review
console.log(
  `Draft ready for review: ${result.responseText?.substring(0, 100)}...`,
);
```

---

### Stream Assistant Responses via API

Source: https://docs.langchain.com/oss/javascript/langgraph/local-server

Demonstrates how to initiate a threadless run and stream responses from a LangGraph assistant. This functionality is provided via the JavaScript SDK and a cURL-based REST API request.

```javascript
import { Client } from "@langchain/langgraph-sdk";

// only set the apiUrl if you changed the default port when calling langgraph dev
const client = new Client({ apiUrl: "http://localhost:2024" });

const streamResponse = client.runs.stream(
  null, // Threadless run
  "agent", // Assistant ID
  {
    input: {
      messages: [{ role: "user", content: "What is LangGraph?" }],
    },
    streamMode: "messages-tuple",
  },
);

for await (const chunk of streamResponse) {
  console.log(`Receiving new event of type: ${chunk.event}...`);
  console.log(JSON.stringify(chunk.data));
  console.log("\n\n");
}
```

```bash
curl -s --request POST \
    --url "http://localhost:2024/runs/stream" \
    --header 'Content-Type: application/json' \
    --data "{\n        \"assistant_id\": \"agent\",\n        \"input\": {\n            \"messages\": [\n                {\n                    \"role\": \"human\",\n                    \"content\": \"What is LangGraph?\"\n                }\n            ]\n        },\n        \"stream_mode\": \"messages-tuple\"\n    }"
```

---

### Generate LangGraph config for existing project

Source: https://docs.langchain.com/oss/javascript/langgraph/local-server

Scans an existing project for LangGraph agents and generates a `langgraph.json` configuration file. This command identifies exported agents like `createAgent()`, `StateGraph.compile()`, or `workflow.compile()`.

```shell
npm create langgraph config
```

---

### Implement Runtime Configuration in LangGraph

Source: https://docs.langchain.com/oss/javascript/langgraph/use-graph-api

A basic implementation showing how to define a configuration schema using Zod, access it within a graph node, and pass the configuration during the graph invocation.

```typescript
import {
  StateGraph,
  StateSchema,
  GraphNode,
  END,
  START,
} from "@langchain/langgraph";
import * as z from "zod";

const ContextSchema = z.object({
  myRuntimeValue: z.string(),
});

const State = new StateSchema({
  myStateValue: z.number(),
});

const node: GraphNode<typeof State> = (state, runtime) => {
  if (runtime?.context?.myRuntimeValue === "a") {
    return { myStateValue: 1 };
  } else if (runtime?.context?.myRuntimeValue === "b") {
    return { myStateValue: 2 };
  } else {
    throw new Error("Unknown values.");
  }
};

const graph = new StateGraph(State, ContextSchema)
  .addNode("node", node)
  .addEdge(START, "node")
  .addEdge("node", END)
  .compile();

console.log(await graph.invoke({}, { context: { myRuntimeValue: "a" } }));
console.log(await graph.invoke({}, { context: { myRuntimeValue: "b" } }));
```

---

### Basic Streaming with LangGraph

Source: https://docs.langchain.com/oss/javascript/langgraph/streaming

Demonstrates the basic usage of the `stream` method in LangGraph to yield streamed outputs as iterators. This is essential for real-time updates in LLM applications.

```typescript
for await (const chunk of await graph.stream(inputs, {
  streamMode: "updates",
})) {
  console.log(chunk);
}
```

---

### Implement Production Memory with PostgresSaver

Source: https://docs.langchain.com/oss/javascript/langgraph/add-memory

This code illustrates setting up a production-ready checkpointer using PostgresSaver for persistent memory. It initializes the PostgresSaver with a database connection string and compiles the graph with this checkpointer, enabling data persistence across sessions.

```typescript
import { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

const DB_URI = "postgresql://postgres:postgres@localhost:5442/postgres?sslmode=disable";
const checkpointer = PostgresSaver.fromConnString(DB_URI);

const builder = new StateGraph(...);
const graph = builder.compile({ checkpointer });
```

---

### Basic LangGraph StateGraph Construction and Invocation

Source: https://docs.langchain.com/oss/javascript/langgraph/use-graph-api

Demonstrates how to construct a simple LangGraph StateGraph with a single node, define its state and configuration, and invoke it with input messages and configurable parameters. It shows how to add nodes, define edges, and compile the graph.

```typescript
const graph = new StateGraph(State, ConfigSchema)
  .addNode("model", callModel)
  .addEdge(START, "model")
  .addEdge("model", END)
  .compile();

// Usage
const inputMessage = { role: "user", content: "hi" };
const response = await graph.invoke(
  { messages: [inputMessage] },
  {
    configurable: {
      modelProvider: "openai",
      systemMessage: "Respond in Italian.",
    },
  },
);

for (const message of response.messages) {
  console.log(`${message.getType()}: ${message.content}`);
}
```

---

### Invoke Graph and Configure Concurrency

Source: https://docs.langchain.com/oss/javascript/langgraph/use-graph-api

Executes the graph with an initial state and demonstrates how to set the maximum concurrency limit via the configuration object.

```typescript
const result = await graph.invoke({
  aggregate: [],
});
console.log(result);

// Setting max concurrency
const resultWithLimit = await graph.invoke(
  { value1: "c" },
  { configurable: { max_concurrency: 10 } },
);
```

---

### Update state and route with Command

Source: https://docs.langchain.com/oss/javascript/langgraph/graph-api

Demonstrates how to return a Command object from a node function to update state and transition to a specific node in one step. This includes both static and conditional routing logic.

```typescript
import { Command } from "@langchain/langgraph";

graph.addNode("myNode", (state) => {
  return new Command({
    update: { foo: "bar" },
    goto: "myOtherNode",
  });
});

graph.addNode("myNode", (state) => {
  if (state.foo === "bar") {
    return new Command({
      update: { foo: "baz" },
      goto: "myOtherNode",
    });
  }
});
```

---

### Execute the Agentic RAG Graph

Source: https://docs.langchain.com/oss/javascript/langgraph/agentic-rag

Demonstrates how to stream inputs through the compiled LangGraph instance and inspect the output from each node in the graph execution pipeline.

```typescript
import { HumanMessage } from "@langchain/core/messages";

const inputs = {
  messages: [
    new HumanMessage(
      "What does Lilian Weng say about types of reward hacking?",
    ),
  ],
};

for await (const output of await graph.stream(inputs)) {
  for (const [key, value] of Object.entries(output)) {
    const lastMsg = output[key].messages[output[key].messages.length - 1];
    console.log(`Output from node: '${key}'`);
    console.log({
      type: lastMsg._getType(),
      content: lastMsg.content,
      tool_calls: lastMsg.tool_calls,
    });
    console.log("---\n");
  }
}
```

---

### Define Async-Generator Tools for Progress Streaming

Source: https://docs.langchain.com/oss/javascript/langgraph/streaming

Shows how to create tools using async generators that yield progress updates during execution. These tools are then integrated into a LangGraph agent.

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
  },
);

export const agent = createAgent({
  model: new ChatOpenAI({ model: "gpt-4o-mini" }),
  tools: [searchFlights],
  checkpointer: new MemorySaver(),
});
```

---

### Invoke Subgraph with Checkpoint Configuration

Source: https://docs.langchain.com/oss/javascript/langgraph/use-subgraphs

Demonstrates how to invoke a subgraph using a specific configuration object. This ensures that the state is managed correctly within the defined thread context.

```typescript
const config = { configurable: { thread_id: "1" } };

const response = await agent.invoke(
  { messages: [{ role: "user", content: "Tell me about apples and bananas" }] },
  config,
);
```

---

### Define and use runtime context in graphs

Source: https://docs.langchain.com/oss/javascript/langgraph/graph-api

Shows how to define a context schema for a graph and pass configuration during invocation. This allows nodes to access external dependencies or settings like model types at runtime.

```typescript
import { StateGraph, StateSchema } from "@langchain/langgraph";
import * as z from "zod";

const State = new StateSchema({
  input: z.string(),
  output: z.string(),
});

const ContextSchema = z.object({
  llm: z.union([z.literal("openai"), z.literal("anthropic")]),
});

const graph = new StateGraph(State, ContextSchema);

const config = { context: { llm: "anthropic" } };

await graph.invoke(inputs, config);

graph.addNode("myNode", (state, config) => {
  const llmType = config.context?.llm || "openai";
  const llm = getLLM(llmType);
  return { results: `Hello, ${state.input}!` };
});
```

---

### Fetch web documents with CheerioWebBaseLoader

Source: https://docs.langchain.com/oss/javascript/langgraph/agentic-rag

Uses the CheerioWebBaseLoader to scrape content from specified URLs. This is the first step in preparing data for a RAG pipeline.

```typescript
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";

const urls = [
  "https://lilianweng.github.io/posts/2023-06-23-agent/",
  "https://lilianweng.github.io/posts/2023-03-15-prompt-engineering/",
  "https://lilianweng.github.io/posts/2023-10-25-adv-attack-llm/",
];

const docs = await Promise.all(
  urls.map((url) => new CheerioWebBaseLoader(url).load()),
);
```

---

### Visualize and execute the graph

Source: https://docs.langchain.com/oss/javascript/langgraph/use-graph-api

Provides snippets for generating a PNG visualization of the graph structure using Mermaid and executing the compiled graph.

```typescript
import * as fs from "node:fs/promises";

const drawableGraph = await graph.getGraphAsync();
const image = await drawableGraph.drawMermaidPng();
const imageBuffer = new Uint8Array(await image.arrayBuffer());
await fs.writeFile("graph.png", imageBuffer);

const result = await graph.invoke({ foo: "" });
console.log(result);
```

---

### Define and Compile a StateGraph in TypeScript

Source: https://docs.langchain.com/oss/javascript/langgraph/pregel

Demonstrates how to use the StateGraph API to define nodes and edges for a stateful graph. The graph is compiled into a Pregel instance, allowing for inspection of internal nodes and channels.

```typescript
import { START, StateGraph } from "@langchain/langgraph";

interface Essay {
  topic: string;
  content?: string;
  score?: number;
}

const writeEssay = (essay: Essay) => {
  return {
    content: `Essay about ${essay.topic}`,
  };
};

const scoreEssay = (essay: Essay) => {
  return {
    score: 10,
  };
};

const builder = new StateGraph<Essay>({
  channels: {
    topic: null,
    content: null,
    score: null,
  },
})
  .addNode("writeEssay", writeEssay)
  .addNode("scoreEssay", scoreEssay)
  .addEdge(START, "writeEssay")
  .addEdge("writeEssay", "scoreEssay");

const graph = builder.compile();
```

---

### Initialize MemoryStore for Semantic Search in TypeScript

Source: https://docs.langchain.com/oss/javascript/langgraph/persistence

Configures the MemoryStore for semantic search by integrating an embedding model, such as OpenAIEmbeddings. This allows for searching memories based on their meaning rather than exact keyword matches.

```typescript
import { OpenAIEmbeddings } from "@langchain/openai";
import { InMemoryStore } from "@langchain/core/stores";

const store = new InMemoryStore({
  index: {
    embeddings: new OpenAIEmbeddings({ model: "text-embedding-3-small" }),
    dims: 1536,
    fields: ["food_preference", "$"], // Fields to embed
  },
});
```

---

### Create a Simple Workflow with Functional API in TypeScript

Source: https://docs.langchain.com/oss/javascript/langgraph/use-functional-api

Demonstrates the basic structure of creating a workflow using the `entrypoint` function. It shows how to define inputs, process them, and invoke the workflow. Input is restricted to the first argument, requiring a dictionary for multiple values.

```typescript
import { entrypoint, MemorySaver } from "@langchain/langgraph";

const checkpointer = new MemorySaver();

const myWorkflow = entrypoint(
  { checkpointer, name: "myWorkflow" },
  async (inputs: { value: number; anotherValue: number }) => {
    const value = inputs.value;
    const anotherValue = inputs.anotherValue;
    // ...
  },
);

await myWorkflow.invoke({ value: 1, anotherValue: 2 });
```

---

### Basic LangGraph Agent Execution Test with Vitest

Source: https://docs.langchain.com/oss/javascript/langgraph/test

Demonstrates a basic unit test for a LangGraph agent. It creates a simple linear graph, compiles it with a MemorySaver checkpointer, and invokes it to test the final state. This pattern is useful for testing the overall flow of an agent.

```typescript
import { test, expect } from "vitest";
import {
  StateGraph,
  StateSchema,
  START,
  END,
  MemorySaver,
} from "@langchain/langgraph";
import * as z from "zod";

const State = new StateSchema({
  my_key: z.string(),
});

const createGraph = () => {
  return new StateGraph(State)
    .addNode("node1", (state) => ({ my_key: "hello from node1" }))
    .addNode("node2", (state) => ({ my_key: "hello from node2" }))
    .addEdge(START, "node1")
    .addEdge("node1", "node2")
    .addEdge("node2", END);
};

test("basic agent execution", async () => {
  const uncompiledGraph = createGraph();
  const checkpointer = new MemorySaver();
  const compiledGraph = uncompiledGraph.compile({ checkpointer });
  const result = await compiledGraph.invoke(
    { my_key: "initial_value" },
    { configurable: { thread_id: "1" } },
  );
  expect(result.my_key).toBe("hello from node2");
});
```

---

### Test Rewrite Node Functionality

Source: https://docs.langchain.com/oss/javascript/langgraph/agentic-rag

Demonstrates how to invoke the rewrite node with a mock state containing a user message and tool interaction history.

```typescript
import { HumanMessage, AIMessage, ToolMessage } from "@langchain/core/messages";

const input = {
  messages: [
    new HumanMessage(
      "What does Lilian Weng say about types of reward hacking?",
    ),
    new AIMessage({
      content: "",
      tool_calls: [
        {
          id: "1",
          name: "retrieve_blog_posts",
          args: { query: "types of reward hacking" },
          type: "tool_call",
        },
      ],
    }),
    new ToolMessage({ content: "meow", tool_call_id: "1" }),
  ],
};

const response = await rewrite(input);
console.log(response.messages[0].content);
```

---

### Compile LangGraph with Memory Store and Checkpointer

Source: https://docs.langchain.com/oss/javascript/langgraph/persistence

This snippet demonstrates how to compile a LangGraph workflow, integrating both a checkpointer for saving state to threads and a Memory Store for persisting arbitrary information across threads. It requires the `@langchain/langgraph` library.

```typescript
import { MemorySaver } from "@langchain/langgraph";

// We need this because we want to enable threads (conversations)
const checkpointer = new MemorySaver();

// ... Define the graph ...

// Compile the graph with the checkpointer and store
const graph = workflow.compile({ checkpointer, store: memoryStore });
```

---

### Define State using Channels API

Source: https://docs.langchain.com/oss/javascript/langgraph/use-graph-api

Demonstrates how to define graph state using both object shorthand and explicit channel classes like LastValue, BinaryOperatorAggregate, and Topic.

```typescript
import { BaseMessage } from "@langchain/core/messages";
import { StateGraph } from "@langchain/langgraph";

interface WorkflowState {
  messages: BaseMessage[];
  question: string;
  answer: string;
}

const workflow = new StateGraph<WorkflowState>({
  channels: {
    messages: {
      reducer: (current, update) => current.concat(update),
      default: () => [],
    },
    question: null,
    answer: null,
  },
});
```

```typescript
import { BaseMessage } from "@langchain/core/messages";
import {
  StateGraph,
  LastValue,
  BinaryOperatorAggregate,
  Topic,
} from "@langchain/langgraph";

interface WorkflowState {
  messages: BaseMessage[];
  question: string;
  events: string[];
}

const workflow = new StateGraph<WorkflowState>({
  channels: {
    messages: new BinaryOperatorAggregate<BaseMessage[]>(
      (current, update) => current.concat(update),
      () => [],
    ),
    question: new LastValue<string>(),
    events: new Topic<string>(),
  },
});
```

---

### Resume graph execution with Command

Source: https://docs.langchain.com/oss/javascript/langgraph/graph-api

Demonstrates how to use the Command object to provide a resume value to an interrupted graph node. The value passed to the resume property becomes the return value of the interrupt function.

```typescript
import { Command, interrupt } from "@langchain/langgraph";

const humanReview = async (state: typeof StateAnnotation.State) => {
  // Pauses the graph and waits for a value
  const answer = interrupt("Do you approve?");
  return { messages: [{ role: "user", content: answer }] };
};

// First invocation - hits the interrupt and pauses
const result = await graph.invoke({ messages: [...] }, config);

// Resume with a value - the interrupt() call returns "yes"
const resumed = await graph.invoke(new Command({ resume: "yes" }), config);
```

---

### Correctly invoke graph with input

Source: https://docs.langchain.com/oss/javascript/langgraph/graph-api

Illustrates the correct way to pass input to a graph to continue a conversation, avoiding the use of Command objects which would cause the graph to resume from a checkpoint.

```typescript
// CORRECT - plain object restarts from __start__
await graph.invoke(
  { messages: [{ role: "user", content: "follow up" }] },
  config,
);
```

---

### Combine Functional and Graph APIs

Source: https://docs.langchain.com/oss/javascript/langgraph/choosing-apis

Shows how to use the Functional API for specific tasks within a larger StateGraph, enabling hybrid architectural patterns.

```typescript
import * as z from "zod";
import {
  StateGraph,
  StateSchema,
  entrypoint,
  type GraphNode,
} from "@langchain/langgraph";

const CoordinationState = new StateSchema({
  rawData: z.record(z.string(), z.unknown()),
  processedData: z.record(z.string(), z.unknown()).optional(),
});

const dataProcessor = entrypoint(
  {},
  async (rawData: Record<string, unknown>) => {
    const cleaned = await cleanData(rawData);
    const transformed = await transformData(cleaned);
    return transformed;
  },
);

const orchestratorNode: GraphNode<typeof CoordinationState> = async (state) => {
  const processedData = await dataProcessor.invoke(state.rawData);
  return { processedData };
};

const coordinationGraph = new StateGraph(CoordinationState)
  .addNode("orchestrator", orchestratorNode)
  .addNode("agentA", agentANode)
  .addNode("agentB", agentBNode);
```

---

### Initialize and Compile a StateGraph in TypeScript

Source: https://docs.langchain.com/oss/javascript/langgraph/graph-api

Demonstrates the process of instantiating a StateGraph with a defined schema, adding nodes and edges, and compiling the graph for execution. Compilation is a mandatory step that validates the graph structure and allows for the configuration of runtime arguments like checkpointers.

```typescript
const graph = new StateGraph(StateAnnotation)
  .addNode("nodeA", nodeA)
  .addEdge(START, "nodeA")
  .addEdge("nodeA", END)
  .compile();
```

---

### Test Generate Node Functionality

Source: https://docs.langchain.com/oss/javascript/langgraph/agentic-rag

Demonstrates how to invoke the generate node with a mock state containing retrieved context to produce a final answer.

```typescript
import { HumanMessage, AIMessage, ToolMessage } from "@langchain/core/messages";

const input = {
  messages: [
    new HumanMessage(
      "What does Lilian Weng say about types of reward hacking?",
    ),
    new AIMessage({
      content: "",
      tool_calls: [
        {
          id: "1",
          name: "retrieve_blog_posts",
          args: { query: "types of reward hacking" },
          type: "tool_call",
        },
      ],
    }),
    new ToolMessage({
      content:
        "reward hacking can be categorized into two types: environment or goal misspecification, and reward tampering",
      tool_call_id: "1",
    }),
  ],
};

const response = await generate(input);
console.log(response.messages[0].content);
```

---

### Combine state updates and control flow with Command

Source: https://docs.langchain.com/oss/javascript/langgraph/use-graph-api

Shows how to use the Command object within a node function to simultaneously update the graph state and determine the next node to execute, replacing traditional conditional edges.

```typescript
import { Command } from "@langchain/langgraph";

const myNode = (state: State): Command => {
  return new Command({
    update: { foo: "bar" },
    goto: "myOtherNode",
  });
};
```

---

### Pregel Execution Output

Source: https://docs.langchain.com/oss/javascript/langgraph/pregel

The resulting output object returned after invoking the Pregel graph with the input 'a'.

```console
{ value: 'aaaaaaaaaaaaaaaa' }
```

---

### Define State using Zod Schemas

Source: https://docs.langchain.com/oss/javascript/langgraph/use-graph-api

Demonstrates defining state using Zod objects, utilizing the LangGraph Zod plugin to attach reducers to schema fields.

```typescript
import { z } from "zod/v3";
import { BaseMessage } from "@langchain/core/messages";
import { StateGraph, messagesStateReducer } from "@langchain/langgraph";

const State = z.object({
  messages: z
    .array(z.custom<BaseMessage>())
    .default([])
    .langgraph.reducer(messagesStateReducer),
  question: z.string().optional(),
  answer: z.string().optional(),
  count: z
    .number()
    .default(0)
    .langgraph.reducer((current, update) => current + update),
});

const graph = new StateGraph(State);
```

---

### Update graph state from inside a tool using Command

Source: https://docs.langchain.com/oss/javascript/langgraph/use-graph-api

Demonstrates how to use the Command class within a LangChain tool to update specific state keys, such as user information and message history. It includes a warning regarding the necessity of including ToolMessage in the message history for valid state transitions.

```typescript
import { tool } from "@langchain/core/tools";
import { Command } from "@langchain/langgraph";
import * as z from "zod";

const lookupUserInfo = tool(
  async (input, config) => {
    const userId = config.configurable?.userId;
    const userInfo = getUserInfo(userId);
    return new Command({
      update: {
        userInfo: userInfo,
        messages: [
          {
            role: "tool",
            content: "Successfully looked up user information",
            tool_call_id: config.toolCall.id,
          },
        ],
      },
    });
  },
  {
    name: "lookupUserInfo",
    description:
      "Use this to look up user information to better assist them with their questions.",
    schema: z.object({}),
  },
);
```

---

### Define and visualize a StateGraph

Source: https://docs.langchain.com/oss/javascript/langgraph/use-graph-api

Shows the creation of a StateGraph with nodes and conditional edges, followed by the generation of a Mermaid diagram string for visualization purposes.

```typescript
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

const State = new StateSchema({
  messages: MessagesValue,
  value: new ReducedValue(z.number().default(0), { reducer: (x, y) => x + y }),
});

const node1: GraphNode<typeof State> = (state) => {
  return { value: state.value + 1 };
};

const node2: GraphNode<typeof State> = (state) => {
  return { value: state.value * 2 };
};

const router: ConditionalEdgeRouter<typeof State, "node2"> = (state) => {
  if (state.value < 10) {
    return "node2";
  }
  return END;
};

const app = new StateGraph(State)
  .addNode("node1", node1)
  .addNode("node2", node2)
  .addEdge(START, "node1")
  .addConditionalEdges("node1", router)
  .addEdge("node2", "node1")
  .compile();

const drawableGraph = await app.getGraphAsync();
console.log(drawableGraph.drawMermaid());
```

---

### Define Distinct Input and Output Schemas

Source: https://docs.langchain.com/oss/javascript/langgraph/use-graph-api

Shows how to configure a StateGraph with separate input and output schemas. This ensures that the graph validates incoming data against the input schema and filters the final result to return only the fields defined in the output schema.

```typescript
import {
  StateGraph,
  StateSchema,
  GraphNode,
  START,
  END,
} from "@langchain/langgraph";
import * as z from "zod";

const InputState = new StateSchema({
  question: z.string(),
});

const OutputState = new StateSchema({
  answer: z.string(),
});

const OverallState = new StateSchema({
  question: z.string(),
  answer: z.string(),
});

const answerNode: GraphNode<typeof OverallState> = (state) => {
  return { answer: "bye", question: state.question };
};

const graph = new StateGraph({
  input: InputState,
  output: OutputState,
  state: OverallState,
})
  .addNode("answerNode", answerNode)
  .addEdge(START, "answerNode")
  .addEdge("answerNode", END)
  .compile();

console.log(await graph.invoke({ question: "hi" }));
```

---

### Visualize and Invoke the Graph

Source: https://docs.langchain.com/oss/javascript/langgraph/use-graph-api

Utilities for exporting the graph structure as a PNG image and executing the graph to observe the loop behavior.

```typescript
import * as fs from "node:fs/promises";

const drawableGraph = await graph.getGraphAsync();
const image = await drawableGraph.drawMermaidPng();
const imageBuffer = new Uint8Array(await image.arrayBuffer());

await fs.writeFile("graph.png", imageBuffer);

const result = await graph.invoke({ aggregate: [] });
console.log(result);
```

---

### Typing Node Functions with GraphNode in LangGraph

Source: https://docs.langchain.com/oss/javascript/langgraph/graph-api

Demonstrates how to use the `GraphNode` utility type to provide strong TypeScript typing for node functions. This includes basic nodes, asynchronous nodes, and nodes that use `Command` for routing.

```typescript
import { GraphNode, StateSchema, Command } from "@langchain/langgraph";
import { z } from "zod/v4";

const State = new StateSchema({
  count: z.number().default(0),
  result: z.string(),
});

// Basic node - receives state, returns partial update
const incrementNode: GraphNode<typeof State> = (state) => {
  return { count: state.count + 1 };
};

// Async node
const fetchNode: GraphNode<typeof State> = async (state, config) => {
  const response = await fetch(`/api/data/${state.count}`);
  return { result: await response.text() };
};

// Node with Command routing - specify valid destinations
const routerNode: GraphNode<typeof State, "process" | "done"> = (state) => {
  if (state.count >= 10) {
    return new Command({ goto: "done" });
  }
  return new Command({
    update: { count: state.count + 1 },
    goto: "process",
  });
};
```

---

### Console Output During Workflow Execution and Interrupt

Source: https://docs.langchain.com/oss/javascript/langgraph/functional-api

This console output illustrates the intermediate steps of the LangGraph workflow. It first shows the result of the `writeEssay` task. Subsequently, it displays the interrupt event, including the essay content, the action prompt, and metadata indicating that the workflow is paused and resumable.

```console
{ writeEssay: 'An essay about topic: cat' }
{
  __interrupt__: [{
    value: { essay: 'An essay about topic: cat', action: 'Please approve/reject the essay' },
    resumable: true,
    ns: ['workflow:f7b8508b-21c0-8b4c-5958-4e8de74d2684'],
    when: 'during'
  }]
}
```

---

### Enable LangSmith Tracing via Environment Variables

Source: https://docs.langchain.com/oss/javascript/langgraph/observability

Configures global tracing for an application by setting the required environment variables for the LangSmith API key and tracing status.

```bash
export LANGSMITH_TRACING=true
export LANGSMITH_API_KEY=<your-api-key>
```

---

### Initialize LangGraph SDK and Handle Messages (JavaScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/frontend/graph-execution

Initializes the LangGraph SDK by setting up event listeners for messages from the guest iframe and providing functions to interact with the guest, such as setting themes, patterns, views, languages, updating code, resetting, and tracking events. It also includes methods for subscribing to various events from the guest.

```javascript
function LangGraph(guestWindow, guestOrigin) {
  const listeners = new Map();
  const addListener = (type, callback) => {
    listeners.set(type, callback);
    return () => listeners.delete(type);
  };
  const postToGuest = (msg) => {
    guestWindow.postMessage(msg, guestOrigin);
  };
  const handleMessage = (event) => {
    const { data } = event;
    if (!data || !data.type) {
      return;
    }
    const cb = listeners.get(data.type);
    if (!cb) {
      return;
    }
    switch (data.type) {
      case "READY":
      case "RESIZE":
      case "ERROR":
      case "RUN_STARTED":
        cb();
        break;
      case "TRACE_URL":
        cb(data.url, data.runId);
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

### Implement Per-Invocation Subagents with LangGraph

Source: https://docs.langchain.com/oss/javascript/langgraph/use-subgraphs

Demonstrates creating subagents as tools for an outer agent. Subagents inherit the parent's checkpointer but maintain independent state across separate invocations.

```typescript
import { createAgent, tool } from "langchain";
import { MemorySaver, Command, interrupt } from "@langchain/langgraph";
import * as z from "zod";

const fruitInfo = tool((input) => `Info about ${input.fruitName}`, {
  name: "fruit_info",
  description: "Look up fruit info.",
  schema: z.object({ fruitName: z.string() }),
});

const veggieInfo = tool((input) => `Info about ${input.veggieName}`, {
  name: "veggie_info",
  description: "Look up veggie info.",
  schema: z.object({ veggieName: z.string() }),
});

const fruitAgent = createAgent({
  model: "gpt-4.1-mini",
  tools: [fruitInfo],
  prompt:
    "You are a fruit expert. Use the fruit_info tool. Respond in one sentence.",
});

const veggieAgent = createAgent({
  model: "gpt-4.1-mini",
  tools: [veggieInfo],
  prompt:
    "You are a veggie expert. Use the veggie_info tool. Respond in one sentence.",
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
  },
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
  },
);

const agent = createAgent({
  model: "gpt-4.1-mini",
  tools: [askFruitExpert, askVeggieExpert],
  prompt:
    "You have two experts: ask_fruit_expert and ask_veggie_expert. " +
    "ALWAYS delegate questions to the appropriate expert.",
  checkpointer: new MemorySaver(),
});
```

---

### Resume Essay Writing Workflow After Human Review

Source: https://docs.langchain.com/oss/javascript/langgraph/functional-api

This TypeScript code demonstrates how to resume a paused LangGraph workflow after human review. It uses the `Command` object with the `resume` option, passing the human's decision (e.g., `true` for approval) to continue the workflow execution. The output shows the final state of the workflow.

```typescript
import { Command } from "@langchain/langgraph";

// Assume 'workflow' and 'config' are defined as in the previous example
// const workflow = ...;
// const config = { configurable: { thread_id: "some-thread-id" } };

// Get review from a user (e.g., via a UI)
// In this case, we're using a bool, but this can be any json-serializable value.
const humanReview = true;

const stream = await workflow.stream(
  new Command({ resume: humanReview }),
  config,
);
for await (const item of stream) {
  console.log(item);
}
```

---

### Migrate Functional to Graph API in TypeScript

Source: https://docs.langchain.com/oss/javascript/langgraph/choosing-apis

Demonstrates converting a complex functional workflow into LangGraph's Graph API. This allows for explicit control over workflow structure, branching, and parallel processing. It involves defining a state schema and adding nodes and conditional edges.

```typescript
import * as z from "zod";
import { entrypoint } from "@langchain/langgraph";

// Before: Functional API
const complexWorkflow = entrypoint(
  { checkpointer },
  async (inputData: Record<string, unknown>) => {
    const step1 = await processStep1(inputData);

    let result: unknown;
    if (step1.needsAnalysis) {
      const analysis = await analyzeData(step1);
      if (analysis.confidence > 0.8) {
        result = await highConfidencePath(analysis);
      } else {
        result = await lowConfidencePath(analysis);
      }
    } else {
      result = await simplePath(step1);
    }

    return result;
  },
);

// After: Graph API
import {
  StateGraph,
  StateSchema,
  type GraphNode,
  type ConditionalEdgeRouter,
} from "@langchain/langgraph";

const WorkflowState = new StateSchema({
  inputData: z.record(z.string(), z.unknown()),
  step1Result: z.record(z.string(), z.unknown()).optional(),
  analysis: z.record(z.string(), z.unknown()).optional(),
  finalResult: z.unknown().optional(),
});

const shouldAnalyze: ConditionalEdgeRouter<typeof WorkflowState> = (state) => {
  return state.step1Result?.needsAnalysis ? "analyze" : "simplePath";
};

const confidenceCheck: ConditionalEdgeRouter<typeof WorkflowState> = (
  state,
) => {
  return (state.analysis?.confidence as number) > 0.8
    ? "highConfidence"
    : "lowConfidence";
};

const workflow = new StateGraph(WorkflowState)
  .addNode("step1", processStep1Node)
  .addConditionalEdges("step1", shouldAnalyze)
  .addNode("analyze", analyzeDataNode)
  .addConditionalEdges("analyze", confidenceCheck);
// ... add remaining nodes and edges
```

---

### Implement Rewrite Node for Query Refinement

Source: https://docs.langchain.com/oss/javascript/langgraph/agentic-rag

Creates a LangGraph node that uses an LLM to analyze and improve user queries. This helps address potentially irrelevant retrieval results by clarifying the semantic intent of the original question.

```typescript
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { GraphNode } from "@langchain/langgraph";

const rewritePrompt = ChatPromptTemplate.fromTemplate(
  `Look at the input and try to reason about the underlying semantic intent / meaning. \n
  Here is the initial question:
  \n ------- \n
  {question}
  \n ------- \n
  Formulate an improved question:`,
);

const rewrite: GraphNode<typeof State> = async (state) => {
  const question = state.messages.at(0)?.content;

  const model = new ChatOpenAI({
    model: "gpt-4.1",
    temperature: 0,
  });

  const response = await rewritePrompt.pipe(model).invoke({ question });
  return {
    messages: [response],
  };
};
```

---

### Consume Graph Streams with useStream Hook

Source: https://docs.langchain.com/oss/javascript/langgraph/frontend/overview

Demonstrates how to use the useStream hook from @langchain/react to connect to a backend graph API. It retrieves reactive values for specific state keys to update the UI in real-time.

```typescript
import { useStream } from "@langchain/react";

function Pipeline() {
  const stream = useStream<typeof graph>({
    apiUrl: "http://localhost:2024",
    assistantId: "pipeline",
  });

  const classification = stream.values?.classification;
  const research = stream.values?.research;
  const analysis = stream.values?.analysis;
}
```

---

### Retrieve Memories by Namespace in TypeScript

Source: https://docs.langchain.com/oss/javascript/langgraph/persistence

Demonstrates how to retrieve all memories associated with a specific namespace using the `search` method. The returned list contains memories, with the most recent one being the last element.

```typescript
const memories = await memoryStore.search(namespaceForMemory);
memories[memories.length - 1];

// {
//   value: { food_preference: 'I like pizza' },
//   key: '07e0caf4-1631-47b7-b15f-65515d4c1843',
//   namespace: ['1', 'memories'],
//   createdAt: '2024-10-02T17:22:31.590602+00:00',
//   updatedAt: '2024-10-02T17:22:31.590605+00:00'
// }
```

---

### Navigate to parent graph from subgraph

Source: https://docs.langchain.com/oss/javascript/langgraph/graph-api

Shows how to route from a node within a subgraph to a node in the parent graph by setting the graph property to Command.PARENT.

```typescript
import { Command } from "@langchain/langgraph";

graph.addNode("myNode", (state) => {
  return new Command({
    update: { foo: "bar" },
    goto: "otherSubgraph",
    graph: Command.PARENT,
  });
});
```

---

### Visualize LangGraph and Save as PNG (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/use-graph-api

This TypeScript code snippet shows how to obtain a drawable representation of the compiled LangGraph, generate a Mermaid diagram in PNG format, and save it to a file named 'graph.png'. This is useful for understanding the graph's structure.

```typescript
import * as fs from "node:fs/promises";

const drawableGraph = await graph.getGraphAsync();
const image = await drawableGraph.drawMermaidPng();
const imageBuffer = new Uint8Array(await image.arrayBuffer());

await fs.writeFile("graph.png", imageBuffer);
```

---

### Create and Manage SDK Dropdown

Source: https://docs.langchain.com/oss/javascript/langgraph/frontend/graph-execution

This useEffect hook dynamically creates and manages an SDK selection dropdown. It handles styling, event listeners for mouse enter/leave/click, and document click to close the dropdown. It also tracks the 'sdk_switched' event.

```javascript
useEffect(() => {
  if (!sdkDropdownOpen || !sdkButtonRef.current) return;
  const isDark = effectiveTheme === "dark";
  const rect = sdkButtonRef.current.getBoundingClientRect();
  const dropdown = document.createElement("div");
  Object.assign(dropdown.style, {
    position: "fixed",
    top: `${rect.bottom + 4}px`,
    right: `${window.innerWidth - rect.right}px`,
    zIndex: "10",
    minWidth: "120px",
    borderRadius: "8px",
    border: `1px solid ${isDark ? "#1A2740" : "#B8DFFF"}`,
    backgroundColor: isDark ? "#0B1120" : "white",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    padding: "4px 0",
  });
  for (const [value, label] of SDK_OPTIONS) {
    const isSelected = value === sdk;
    const btn = document.createElement("button");
    btn.type = "button";
    Object.assign(btn.style, {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      width: "100%",
      textAlign: "left",
      padding: "6px 12px",
      fontSize: "13px",
      cursor: "pointer",
      border: "none",
      fontWeight: isSelected ? "500" : "normal",
      backgroundColor: isSelected
        ? isDark
          ? "#1A2740"
          : "#E5F4FF"
        : "transparent",
      color: isSelected ? (isDark ? "#C8DDF0" : "#030710") : "#6B8299",
    });
    btn.innerHTML = `<span>${SDK_LOGOS[value]}</span>${label}`;
    btn.addEventListener("mouseenter", () => {
      if (!isSelected) {
        btn.style.backgroundColor = isDark ? "#1A2740" : "#F2FAFF";
        btn.style.color = isDark ? "#C8DDF0" : "#030710";
      }
    });
    btn.addEventListener("mouseleave", () => {
      if (!isSelected) {
        btn.style.backgroundColor = "transparent";
        btn.style.color = "#6B8299";
      }
    });
    btn.addEventListener("click", () => {
      setSdk(value);
      setSdkDropdownOpen(false);
      cachedRef.current?.host.trackEvent("sdk_switched", {
        sdk: value,
        pattern,
      });
    });
    dropdown.appendChild(btn);
  }
  document.body.appendChild(dropdown);
  const handleClose = (e) => {
    if (
      !dropdown.contains(e.target) &&
      !sdkButtonRef.current?.contains(e.target)
    ) {
      setSdkDropdownOpen(false);
    }
  };
  const timer = setTimeout(
    () => document.addEventListener("mousedown", handleClose),
    0,
  );
  return () => {
    clearTimeout(timer);
    document.removeEventListener("mousedown", handleClose);
    dropdown.remove();
  };
}, [sdkDropdownOpen, sdk, effectiveTheme, setSdk, pattern]);
```

---

### Implement Agentic Query Node

Source: https://docs.langchain.com/oss/javascript/langgraph/agentic-rag

Creates a graph node that utilizes an LLM bound with tools to determine whether to perform a semantic search or respond directly to user input.

```typescript
import { ChatOpenAI } from "@langchain/openai";
import { GraphNode } from "@langchain/langgraph";
import { HumanMessage } from "@langchain/core/messages";

const generateQueryOrRespond: GraphNode<typeof State> = async (state) => {
  const model = new ChatOpenAI({
    model: "gpt-4.1",
    temperature: 0,
  }).bindTools(tools);

  const response = await model.invoke(state.messages);
  return {
    messages: [response],
  };
};

// Example usage for direct response
const inputDirect = { messages: [new HumanMessage("hello!")] };
const resultDirect = await generateQueryOrRespond(inputDirect);

// Example usage for retrieval trigger
const inputSearch = {
  messages: [
    new HumanMessage(
      "What does Lilian Weng say about types of reward hacking?",
    ),
  ],
};
const resultSearch = await generateQueryOrRespond(inputSearch);
```

---

### Navigate to Parent Graph Node using Command.PARENT in TypeScript

Source: https://docs.langchain.com/oss/javascript/langgraph/use-graph-api

This snippet demonstrates how to navigate from a node within a subgraph to a node in the parent graph using `Command.PARENT`. It shows how to define a `Command` object with `goto` and `graph: Command.PARENT` to achieve this navigation. This is useful when working with nested graph structures.

```typescript
const myNode = (state: State): Command => {
  return new Command({
    update: { foo: "bar" },
    goto: "otherSubgraph", // where `otherSubgraph` is a node in the parent graph
    graph: Command.PARENT,
  });
};
```

---

### Implement Persistent Subagent with Concurrency Control

Source: https://docs.langchain.com/oss/javascript/langgraph/use-subgraphs

Demonstrates creating a subagent with a checkpointer enabled and wrapping it as a tool for an outer agent. It uses toolCallLimitMiddleware to prevent parallel execution conflicts.

```typescript
import { createAgent, tool, toolCallLimitMiddleware } from "langchain";
import { MemorySaver, Command, interrupt } from "@langchain/langgraph";
import * as z from "zod";

const fruitInfo = tool((input) => `Info about ${input.fruitName}`, {
  name: "fruit_info",
  description: "Look up fruit info.",
  schema: z.object({ fruitName: z.string() }),
});

const fruitAgent = createAgent({
  model: "gpt-4.1-mini",
  tools: [fruitInfo],
  prompt:
    "You are a fruit expert. Use the fruit_info tool. Respond in one sentence.",
  checkpointer: true,
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
  },
);

const agent = createAgent({
  model: "gpt-4.1-mini",
  tools: [askFruitExpert],
  prompt:
    "You have a fruit expert. ALWAYS delegate fruit questions to ask_fruit_expert.",
  middleware: [
    toolCallLimitMiddleware({ toolName: "ask_fruit_expert", runLimit: 1 }),
  ],
  checkpointer: new MemorySaver(),
});
```

---

### Render Tool Progress in React

Source: https://docs.langchain.com/oss/javascript/langgraph/streaming

A React component snippet that maps through active tools to display progress bars and completed steps based on tool data.

```tsx
{
  activeTools.map((tool) => {
    const data = tool.data as
      | { message?: string; progress?: number; completed?: string[] }
      | undefined;
    return (
      <div key={tool.toolCallId ?? tool.name}>
        <strong>{tool.name}</strong>
        {data?.message && <p>{data.message}</p>}
        {data?.progress != null && (
          <div style={{ width: "100%", background: "#eee" }}>
            <div
              style={{
                width: `${data.progress * 100}%`,
                background: "#4CAF50",
                height: 8,
                transition: "width 0.3s ease",
              }}
            />
          </div>
        )}
        {data?.completed?.map((step, i) => (
          <div key={i}>&#10003; {step}</div>
        ))}
      </div>
    );
  });
}
```

---

### Monitor Tool Progress with useStream in React

Source: https://docs.langchain.com/oss/javascript/langgraph/streaming

Demonstrates how to use the useStream hook to access the toolProgress array. It filters for active tools and maps them to UI components based on their lifecycle state.

```typescript
import { useStream } from "@langchain/langgraph-sdk/react";

function Chat() {
  const stream = useStream({
    assistantId: "my-agent",
    streamMode: ["values", "tools"],
  });

  // Filter for actively running tools
  const activeTools = stream.toolProgress.filter(
    (t) => t.state === "starting" || t.state === "running"
  );

  return (
    <div>
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

---

### Migrate Graph to Functional API in TypeScript

Source: https://docs.langchain.com/oss/javascript/langgraph/choosing-apis

Illustrates simplifying an overly complex graph into a more straightforward functional workflow using LangGraph. This is useful for linear processes where the explicit structure of the Graph API is not necessary. It converts a state-based graph definition back into a sequential function.

```typescript
import { z } from "zod/v4";
import { StateGraph, StateSchema, entrypoint } from "@langchain/langgraph";

// Before: Over-engineered Graph API
const SimpleState = new StateSchema({
  input: z.string(),
  step1: z.string().optional(),
  step2: z.string().optional(),
  result: z.string().optional(),
});

// After: Simplified Functional API
const simpleWorkflow = entrypoint(
  { checkpointer },
  async (inputData: string) => {
    const step1 = await processStep1(inputData);
    const step2 = await processStep2(step1);
    return await finalizeResult(step2);
  },
);
```

---

### Refactoring Node Operations with Tasks in LangGraph.js

Source: https://docs.langchain.com/oss/javascript/langgraph/durable-execution

Demonstrates how to convert multiple operations within a node into individual tasks. This approach simplifies node logic and enables concurrent execution of operations like API requests.

```typescript
import {
  StateGraph,
  StateSchema,
  GraphNode,
  START,
  END,
  MemorySaver,
} from "@langchain/langgraph";
import { v4 as uuidv4 } from "uuid";
import * as z from "zod";

const State = new StateSchema({
  url: z.string(),
  result: z.string().optional(),
});

const callApi: GraphNode<typeof State> = async (state) => {
  const response = await fetch(state.url);
  const text = await response.text();
  const result = text.slice(0, 100);
  return { result };
};

const builder = new StateGraph(State)
  .addNode("callApi", callApi)
  .addEdge(START, "callApi")
  .addEdge("callApi", END);

const checkpointer = new MemorySaver();
const graph = builder.compile({ checkpointer });
const threadId = uuidv4();
const config = { configurable: { thread_id: threadId } };
await graph.invoke({ url: "https://www.example.com" }, config);
```

```typescript
import {
  StateGraph,
  StateSchema,
  GraphNode,
  START,
  END,
  MemorySaver,
  task,
} from "@langchain/langgraph";
import { v4 as uuidv4 } from "uuid";
import * as z from "zod";

const State = new StateSchema({
  urls: z.array(z.string()),
  results: z.array(z.string()).optional(),
});

const makeRequest = task("makeRequest", async (url: string) => {
  const response = await fetch(url);
  const text = await response.text();
  return text.slice(0, 100);
});

const callApi: GraphNode<typeof State> = async (state) => {
  const requests = state.urls.map((url) => makeRequest(url));
  const results = await Promise.all(requests);
  return { results };
};

const builder = new StateGraph(State)
  .addNode("callApi", callApi)
  .addEdge(START, "callApi")
  .addEdge("callApi", END);

const checkpointer = new MemorySaver();
const graph = builder.compile({ checkpointer });
const threadId = uuidv4();
const config = { configurable: { thread_id: threadId } };
await graph.invoke({ urls: ["https://www.example.com"] }, config);
```

---

### Test Document Grading with Relevant Documents (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/agentic-rag

Illustrates testing the 'gradeDocuments' node with relevant document content. The input state includes a user question and a tool message with specific information about reward hacking, designed to be classified as relevant by the grading node.

```typescript
const input = {
  messages: [
    new HumanMessage(
      "What does Lilian Weng say about types of reward hacking?",
    ),
    new AIMessage({
      tool_calls: [
        {
          type: "tool_call",
          name: "retrieve_blog_posts",
          args: { query: "types of reward hacking" },
          id: "1",
        },
      ],
    }),
    new ToolMessage({
      content:
        "reward hacking can be categorized into two types: environment or goal misspecification, and reward tampering",
      tool_call_id: "1",
    }),
  ],
};
const result = await gradeDocuments(input);
```

---

### Define and Compile a Parallel State Graph

Source: https://docs.langchain.com/oss/javascript/langgraph/use-graph-api

Constructs a StateGraph with a reducer to handle state accumulation. Nodes A, B, C, and D are linked to demonstrate parallel execution from A to B and C, followed by a fan-in to D.

```typescript
import {
  StateGraph,
  StateSchema,
  ReducedValue,
  GraphNode,
  START,
  END,
} from "@langchain/langgraph";
import * as z from "zod";

const State = new StateSchema({
  aggregate: new ReducedValue(
    z.array(z.string()).default(() => []),
    { reducer: (x, y) => x.concat(y) },
  ),
});

const nodeA: GraphNode<typeof State> = (state) => {
  console.log(`Adding "A" to ${state.aggregate}`);
  return { aggregate: ["A"] };
};

const nodeB: GraphNode<typeof State> = (state) => {
  console.log(`Adding "B" to ${state.aggregate}`);
  return { aggregate: ["B"] };
};

const nodeC: GraphNode<typeof State> = (state) => {
  console.log(`Adding "C" to ${state.aggregate}`);
  return { aggregate: ["C"] };
};

const nodeD: GraphNode<typeof State> = (state) => {
  console.log(`Adding "D" to ${state.aggregate}`);
  return { aggregate: ["D"] };
};

const graph = new StateGraph(State)
  .addNode("a", nodeA)
  .addNode("b", nodeB)
  .addNode("c", nodeC)
  .addNode("d", nodeD)
  .addEdge(START, "a")
  .addEdge("a", "b")
  .addEdge("a", "c")
  .addEdge("b", "d")
  .addEdge("c", "d")
  .addEdge("d", END)
  .compile();
```

---

### Implement Email Reading and Intent Classification Nodes

Source: https://docs.langchain.com/oss/javascript/langgraph/thinking-in-langgraph

Defines nodes for reading email content and using an LLM to classify intent and urgency. The classification node uses structured output to determine the next workflow step via Command routing.

```typescript
import {
  StateGraph,
  START,
  END,
  GraphNode,
  Command,
} from "@langchain/langgraph";
import { HumanMessage } from "@langchain/core/messages";
import { ChatAnthropic } from "@langchain/anthropic";

const llm = new ChatAnthropic({ model: "claude-sonnet-4-6" });

const readEmail: GraphNode<typeof EmailAgentState> = async (state, config) => {
  console.log(`Processing email: ${state.emailContent}`);
  return {};
};

const classifyIntent: GraphNode<typeof EmailAgentState> = async (
  state,
  config,
) => {
  const structuredLlm = llm.withStructuredOutput(EmailClassificationSchema);
  const classificationPrompt = `
  Analyze this customer email and classify it:

  Email: ${state.emailContent}
  From: ${state.senderEmail}

  Provide classification including intent, urgency, topic, and summary.
  `;

  const classification = await structuredLlm.invoke(classificationPrompt);

  let nextNode:
    | "searchDocumentation"
    | "humanReview"
    | "draftResponse"
    | "bugTracking";

  if (
    classification.intent === "billing" ||
    classification.urgency === "critical"
  ) {
    nextNode = "humanReview";
  } else if (
    classification.intent === "question" ||
    classification.intent === "feature"
  ) {
    nextNode = "searchDocumentation";
  } else if (classification.intent === "bug") {
    nextNode = "bugTracking";
  } else {
    nextNode = "draftResponse";
  }

  return new Command({
    update: { classification },
    goto: nextNode,
  });
};
```

---

### Setting Durability Mode in LangGraph Stream

Source: https://docs.langchain.com/oss/javascript/langgraph/durable-execution

Demonstrates how to specify the 'sync' durability mode when streaming data through a LangGraph. This ensures that changes are persisted synchronously before the next step begins, providing high durability.

```typescript
await graph.stream({ input: "test" }, { durability: "sync" });
```

---

### Test Document Grading with Irrelevant Documents (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/agentic-rag

Demonstrates how to test the 'gradeDocuments' node with irrelevant document content. It constructs an input state with a user question and a tool message containing 'meow' as the context, simulating a scenario where retrieved documents are not relevant.

```typescript
import { ToolMessage } from "@langchain/core/messages";

const input = {
  messages: [
    new HumanMessage(
      "What does Lilian Weng say about types of reward hacking?",
    ),
    new AIMessage({
      tool_calls: [
        {
          type: "tool_call",
          name: "retrieve_blog_posts",
          args: { query: "types of reward hacking" },
          id: "1",
        },
      ],
    }),
    new ToolMessage({
      content: "meow",
      tool_call_id: "1",
    }),
  ],
};
const result = await gradeDocuments(input);
```

---

### Integrate Tool Review into LangGraph Entrypoint

Source: https://docs.langchain.com/oss/javascript/langgraph/use-functional-api

Demonstrates how to incorporate the tool review logic within an agent's main loop. The implementation handles tool call validation, execution of approved calls, and persistence of state.

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

### Resume Email Agent after Human Input (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/thinking-in-langgraph

This snippet shows how to provide human input to resume a paused LangGraph agent. It defines a `Command` object with the human's response, including approval and edited text, and then invokes the agent again with this command to continue the execution and send the email.

```typescript
import { Command } from "@langchain/langgraph";

// When ready, provide human input to resume
const humanResponse = new Command({
  resume: {
    approved: true,
    editedResponse:
      "We sincerely apologize for the double charge. I've initiated an immediate refund...",
  },
});

// Resume execution
const finalResult = await app.invoke(humanResponse, config);
console.log("Email sent successfully!");
```

---

### Executing LangGraph with Subgraph Navigation in TypeScript

Source: https://docs.langchain.com/oss/javascript/langgraph/use-graph-api

This snippet shows how to invoke the compiled LangGraph that includes subgraph navigation. It demonstrates calling the `graph.invoke` method with an initial state and logs the final result, illustrating the state updates and navigation flow.

```typescript
const result = await graph.invoke({ foo: "" });
console.log(result);
```

---

### Configure Project Name for Traces

Source: https://docs.langchain.com/oss/javascript/langgraph/observability

Shows how to set a custom project name for traces either globally via environment variables or dynamically per-invocation in TypeScript.

```bash
export LANGSMITH_PROJECT=my-agent-project
```

```typescript
import { LangChainTracer } from "@langchain/core/tracers/tracer_langchain";

const tracer = new LangChainTracer({ projectName: "email-agent-test" });
await agent.invoke(
  {
    messages: [
      { role: "user", content: "Send a test email to alice@example.com" },
    ],
  },
  { callbacks: [tracer] },
);
```

---

### Render LangGraph to PNG using TypeScript

Source: https://docs.langchain.com/oss/javascript/langgraph/use-graph-api

This code snippet demonstrates how to obtain a drawable graph object, render it as a PNG using the Mermaid.ink API, and save the resulting image buffer to a file named 'graph.png'. It requires Node.js and the 'node:fs/promises' module for file system operations.

```typescript
import * as fs from "node:fs/promises";

const drawableGraph = await app.getGraphAsync();
const image = await drawableGraph.drawMermaidPng();
const imageBuffer = new Uint8Array(await image.arrayBuffer());

await fs.writeFile("graph.png", imageBuffer);
```

---

### Implement Node Caching in LangGraph

Source: https://docs.langchain.com/oss/javascript/langgraph/graph-api

Demonstrates how to configure a cache policy with a TTL for specific nodes and use an InMemoryCache during graph compilation to avoid redundant computations.

```typescript
import {
  StateGraph,
  StateSchema,
  GraphNode,
  START,
} from "@langchain/langgraph";
import { InMemoryCache } from "@langchain/langgraph-checkpoint";
import { z } from "zod/v4";

const State = new StateSchema({
  x: z.number(),
  result: z.number(),
});

const expensiveNode: GraphNode<typeof State> = async (state) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return { result: state.x * 2 };
};

const graph = new StateGraph(State)
  .addNode("expensive_node", expensiveNode, { cachePolicy: { ttl: 3 } })
  .addEdge(START, "expensive_node")
  .compile({ cache: new InMemoryCache() });

await graph.invoke({ x: 5 }, { streamMode: "updates" });
await graph.invoke({ x: 5 }, { streamMode: "updates" });
```

---

### Define Memory Namespace in TypeScript

Source: https://docs.langchain.com/oss/javascript/langgraph/persistence

Shows how to define a namespaced key for storing memories. Namespaces, represented as tuples, allow for organized storage and retrieval of different memory types, often user-specific.

```typescript
const userId = "1";
const namespaceForMemory = [userId, "memories"];
```

---

### SDK Configuration Objects (JavaScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/frontend/graph-execution

Defines configuration objects for SDK labels, local development hosts, and production hosts across different frontend frameworks like React, Vue, Svelte, and Angular. These objects map framework names to their respective display labels, local development URLs, and production URLs.

```javascript
var SDK_LABELS = {
  react: "React",
  vue: "Vue",
  svelte: "Svelte",
  angular: "Angular",
};
var SDK_LOCAL_HOSTS = {
  react: "http://localhost:4100",
  vue: "http://localhost:4200",
  svelte: "http://localhost:4300",
  angular: "http://localhost:4400",
};
var SDK_PROD_HOSTS = {
  react: "https://playground-git-main-langchain.vercel.app/react",
  vue: "https://playground-git-main-langchain.vercel.app/vue",
  svelte: "https://playground-git-main-langchain.vercel.app/svelte",
  angular: "https://playground-git-main-langchain.vercel.app/angular",
};
```

---

### Defining Nodes in LangGraph with StateSchema

Source: https://docs.langchain.com/oss/javascript/langgraph/graph-api

Illustrates how to define nodes for a LangGraph. Nodes are functions that accept the graph's state and a RunnableConfig. Two methods for typing node functions are shown: using the GraphNode utility and the State.Node shorthand.

```typescript
import { StateGraph, StateSchema, GraphNode } from "@langchain/langgraph";
import * as z from "zod";

const State = new StateSchema({
  input: z.string(),
  results: z.string(),
});

// Option 1: Use GraphNode type utility
const myNode: GraphNode<typeof State> = (state, config) => {
  console.log("In node: ", config?.configurable?.user_id);
  return { results: `Hello, ${state.input}!` };
};

// Option 2: Use State.Node shorthand
const otherNode: typeof State.Node = (state) => {
  return state;
};

const builder = new StateGraph(State)
  .addNode("myNode", myNode)
  .addNode("otherNode", otherNode);
// ... rest of the graph builder
```

---

### Graph Compilation and Orchestration

Source: https://docs.langchain.com/oss/javascript/langgraph/thinking-in-langgraph

Configures the StateGraph by adding nodes and defining edges. It integrates a MemorySaver checkpointer to enable persistence and support for human-in-the-loop interrupts.

```typescript
import { MemorySaver } from "@langchain/langgraph";

const workflow = new StateGraph(EmailAgentState)
  .addNode("readEmail", readEmail)
  .addNode("classifyIntent", classifyIntent)
  .addNode("draftResponse", draftResponse)
  .addNode("humanReview", humanReview)
  .addNode("sendReply", sendReply)
  .addEdge(START, "readEmail")
  .addEdge("readEmail", "classifyIntent")
  .addEdge("sendReply", END);

const memory = new MemorySaver();
const app = workflow.compile({ checkpointer: memory });
```

---

### Default Reducer State Updates in LangGraph

Source: https://docs.langchain.com/oss/javascript/langgraph/graph-api

Demonstrates how LangGraph handles state updates when no explicit reducer functions are defined for state keys. It shows how partial state updates are merged into the existing state.

```typescript
import { StateSchema } from "@langchain/langgraph";
import * as z from "zod";

const State = new StateSchema({
  foo: z.number(),
  bar: z.array(z.string()),
});
```

---

### Define and Invoke a Simple LangGraph with Checkpoints (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/persistence

This snippet demonstrates how to define a simple stateful graph using LangGraph in TypeScript. It includes adding nodes, defining edges, and compiling the graph with a memory saver for checkpoints. The invocation shows how to pass configuration for thread identification.

```typescript
import {
  StateGraph,
  StateSchema,
  ReducedValue,
  START,
  END,
  MemorySaver,
} from "@langchain/langgraph";
import { z } from "zod/v4";

const State = new StateSchema({
  foo: z.string(),
  bar: new ReducedValue(
    z.array(z.string()).default(() => []),
    {
      inputSchema: z.array(z.string()),
      reducer: (x, y) => x.concat(y),
    },
  ),
});

const workflow = new StateGraph(State)
  .addNode("nodeA", (state) => {
    return { foo: "a", bar: ["a"] };
  })
  .addNode("nodeB", (state) => {
    return { foo: "b", bar: ["b"] };
  })
  .addEdge(START, "nodeA")
  .addEdge("nodeA", "nodeB")
  .addEdge("nodeB", END);

const checkpointer = new MemorySaver();
const graph = workflow.compile({ checkpointer });

const config = { configurable: { thread_id: "1" } };
await graph.invoke({ foo: "", bar: [] }, config);
```

---

### LangGraph Memory Store Indexing Configuration

Source: https://docs.langchain.com/oss/javascript/langgraph/persistence

This JSON configuration snippet shows how to enable semantic search for the LangGraph Memory Store by defining indexing settings. It specifies the embedding model ('openai:text-embeddings-3-small') and the fields to index.

```json
{
  "store": {
    "index": {
      "embed": "openai:text-embeddings-3-small",
      "dims": 1536,
      "fields": ["$"]
    }
  }
}
```

---

### Stream Subgraph Outputs

Source: https://docs.langchain.com/oss/javascript/langgraph/streaming

Demonstrates how to enable subgraph streaming by setting the subgraphs flag to true within the stream configuration.

```typescript
for await (const chunk of await graph.stream(
  { foo: "foo" },
  {
    subgraphs: true,
    streamMode: "updates",
  },
)) {
  console.log(chunk);
}
```

---

### Individual LangGraph Node Execution Test with Vitest

Source: https://docs.langchain.com/oss/javascript/langgraph/test

Shows how to test an individual node within a compiled LangGraph agent. This allows for focused testing of specific node logic without executing the entire graph. Note that checkpointers are ignored when invoking nodes directly.

```typescript
import { test, expect } from "vitest";
import {
  StateGraph,
  START,
  END,
  MemorySaver,
  StateSchema,
} from "@langchain/langgraph";
import * as z from "zod";

const State = new StateSchema({
  my_key: z.string(),
});

const createGraph = () => {
  return new StateGraph(State)
    .addNode("node1", (state) => ({ my_key: "hello from node1" }))
    .addNode("node2", (state) => ({ my_key: "hello from node2" }))
    .addEdge(START, "node1")
    .addEdge("node1", "node2")
    .addEdge("node2", END);
};

test("individual node execution", async () => {
  const uncompiledGraph = createGraph();
  // Will be ignored in this example
  const checkpointer = new MemorySaver();
  const compiledGraph = uncompiledGraph.compile({ checkpointer });
  // Only invoke node 1
  const result = await compiledGraph.nodes["node1"].invoke({
    my_key: "initial_value",
  });
  expect(result.my_key).toBe("hello from node1");
});
```

---

### Create Preview Host Communication (JavaScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/frontend/graph-execution

Implements a function to create a communication channel between a host and a guest (iframe) for LangGraph visualizations. It handles posting messages to the guest and managing event listeners for messages received from the guest, ensuring origin validation.

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
    destroy: () => {
      window.removeEventListener("message", handleMessage);
      listeners.clear();
    },
  };
}
```

---

### Implement Dynamic Map-Reduce with Send

Source: https://docs.langchain.com/oss/javascript/langgraph/graph-api

Shows how to use the Send object to trigger multiple downstream nodes dynamically based on state data. This is useful for scenarios where the number of edges is unknown at definition time.

```typescript
import { Send } from "@langchain/langgraph";

graph.addConditionalEdges("nodeA", (state) => {
  return state.subjects.map((subject) => new Send("generateJoke", { subject }));
});
```

---

### Manage Function-Scoped State

Source: https://docs.langchain.com/oss/javascript/langgraph/choosing-apis

Demonstrates encapsulating logic and state within tasks, allowing for clean data flow between functions without broad state definitions.

```typescript
import { task, entrypoint } from "@langchain/langgraph";

const analyzeDocument = task("analyzeDocument", async (document: string) => {
  const sections = extractSections(document);
  const summaries = await Promise.all(sections.map(summarize));
  const keyPoints = extractKeyPoints(summaries);

  return {
    sections: sections.length,
    summaries,
    keyPoints,
  };
});

const documentProcessor = entrypoint(
  { checkpointer },
  async (document: string) => {
    const analysis = await analyzeDocument(document);
    return await generateReport(analysis);
  },
);
```

---

### Decouple Return Values with entrypoint.final

Source: https://docs.langchain.com/oss/javascript/langgraph/functional-api

Uses entrypoint.final to return a value to the caller while saving a different value to the checkpoint for future invocations.

```typescript
import { entrypoint, getPreviousState } from "@langchain/langgraph";

const myWorkflow = entrypoint(
  { checkpointer, name: "workflow" },
  async (number: number) => {
    const previous = getPreviousState<number>() ?? 0;
    return entrypoint.final({
      value: previous,
      save: 2 * number,
    });
  },
);

const config = {
  configurable: {
    thread_id: "1",
  },
};

await myWorkflow.invoke(3, config); // 0 (previous was undefined)
await myWorkflow.invoke(1, config); // 6 (previous was 3 * 2 from the previous invocation)
```

---

### Replay Graph Execution from Checkpoint in TypeScript

Source: https://docs.langchain.com/oss/javascript/langgraph/use-time-travel

This snippet demonstrates how to replay a LangGraph execution from a specific checkpoint. It first runs the graph to generate checkpoints, then retrieves the state history to find the desired checkpoint. Finally, it invokes the graph again using the configuration of the chosen checkpoint to replay from that point. Nodes before the checkpoint are not re-executed.

```typescript
import { v4 as uuidv4 } from "uuid";
import { StateGraph, MemorySaver, START } from "@langchain/langgraph";

// Assuming Annotation and other necessary imports are available
// For demonstration, let's define a placeholder for Annotation
const Annotation = { Root: (schema) => ({ State: schema }) };

const StateAnnotation = Annotation.Root({
  topic: String,
  joke: String,
});

function generateTopic(state) {
  return { topic: "socks in the dryer" };
}

function writeJoke(state) {
  return { joke: `Why do ${state.topic} disappear? They elope!` };
}

const checkpointer = new MemorySaver();
const graph = new StateGraph(StateAnnotation)
  .addNode("generateTopic", generateTopic)
  .addNode("writeJoke", writeJoke)
  .addEdge(START, "generateTopic")
  .addEdge("generateTopic", "writeJoke")
  .compile({ checkpointer });

// Step 1: Run the graph
const config = { configurable: { thread_id: uuidv4() } };
const result = await graph.invoke({}, config);

// Step 2: Find a checkpoint to replay from
const states = [];
for await (const state of graph.getStateHistory(config)) {
  states.push(state);
}

// Step 3: Replay from a specific checkpoint
const beforeJoke = states.find((s) => s.next.includes("writeJoke"));
const replayResult = await graph.invoke(null, beforeJoke.config);
// writeJoke re-executes (runs again), generateTopic does not
console.log("Replay Result:", replayResult);
```

---

### Test LangGraph API with REST API

Source: https://docs.langchain.com/oss/javascript/langgraph/deploy

This snippet shows how to test the LangGraph API using a cURL command. It details the POST request to the runs/stream endpoint, including necessary headers for authentication and content type, and provides a JSON payload for the agent input and stream mode.

```bash
curl -s --request POST \
    --url <DEPLOYMENT_URL>/runs/stream \
    --header 'Content-Type: application/json' \
    --header "X-Api-Key: <LANGSMITH API KEY> \
    --data "{
        \"assistant_id\": \"agent\", `# Name of agent. Defined in langgraph.json.`
        \"input\": {
            \"messages\": [
                {
                    \"role\": \"human\",
                    \"content\": \"What is LangGraph?\"
                }
            ]
        },
        \"stream_mode\": \"updates\"
    }"
```

---

### Store Memories with Specific Fields for Embedding in TypeScript

Source: https://docs.langchain.com/oss/javascript/langgraph/persistence

Demonstrates how to store memories while specifying which fields should be embedded for semantic search. This allows for fine-grained control over what aspects of the memory contribute to its semantic representation.

```typescript
// Store with specific fields to embed
await store.put(
  namespaceForMemory,
  uuidv4(),
  {
    food_preference: "I love Italian cuisine",
    context: "Discussing dinner plans",
  },
  { index: ["food_preference"] }, // Only embed "food_preferences" field
);

// Store without embedding (still retrievable, but not searchable)
await store.put(
  namespaceForMemory,
  uuidv4(),
  { system_info: "Last updated: 2024-01-01" },
  { index: false },
);
```

---

### Define Conditional Edges for Loop Termination

Source: https://docs.langchain.com/oss/javascript/langgraph/use-graph-api

Demonstrates how to use a ConditionalEdgeRouter to route graph execution to the END node based on state conditions, effectively breaking loops.

```typescript
const route: ConditionalEdgeRouter<typeof State, "b"> = (state) => {
  if (terminationCondition(state)) {
    return END;
  } else {
    return "b";
  }
};

const graph = new StateGraph(State)
  .addNode("a", nodeA)
  .addNode("b", nodeB)
  .addEdge(START, "a")
  .addConditionalEdges("a", route)
  .addEdge("b", "a")
  .compile();
```

---

### Manage Recursion Limits in LangGraph

Source: https://docs.langchain.com/oss/javascript/langgraph/graph-api

Demonstrates both proactive termination logic within a StateGraph and reactive error handling using try-catch blocks to catch GraphRecursionError. This ensures robust execution control for recursive graph workflows.

```typescript
import {
  StateGraph,
  StateSchema,
  ReducedValue,
  GraphNode,
  ConditionalEdgeRouter,
  END,
  GraphRecursionError,
} from "@langchain/langgraph";
import { z } from "zod/v4";

const State = new StateSchema({
  messages: new ReducedValue(
    z.array(z.string()).default(() => []),
    { reducer: (x, y) => x.concat(y) },
  ),
});

// Build graph with explicit termination logic
const builder = new StateGraph(State)
  .addNode("agent", async (state) => {
    return {
      messages: ["Processing..."],
    };
  })
  .addConditionalEdges("agent", (state) => {
    // Design termination conditions into your graph
    if (state.messages.length >= 5) {
      return END;
    }
    return "agent";
  });

const graph = builder.compile();

// Reactive Approach - catch GraphRecursionError as safety net
try {
  const result = await graph.invoke({ messages: [] }, { recursionLimit: 10 });
} catch (error) {
  if (error instanceof GraphRecursionError) {
    // Handle externally after graph execution fails
    console.log("Recursion limit exceeded, handling gracefully");
  }
}
```

---

### Implement Generate Node for Answer Synthesis

Source: https://docs.langchain.com/oss/javascript/langgraph/agentic-rag

Defines a LangGraph node that synthesizes an answer using retrieved context and the original question. It enforces constraints on response length and conciseness.

```typescript
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { GraphNode } from "@langchain/langgraph";

const generate: GraphNode<typeof State> = async (state) => {
  const question = state.messages.at(0)?.content;
  const context = state.messages.at(-1)?.content;

  const prompt = ChatPromptTemplate.fromTemplate(
    `You are an assistant for question-answering tasks.
      Use the following pieces of retrieved context to answer the question.
      If you don't know the answer, just say that you don't know.
      Use three sentences maximum and keep the answer concise.
      Question: {question}
      Context: {context}`,
  );

  const llm = new ChatOpenAI({
    model: "gpt-4.1",
    temperature: 0,
  });

  const ragChain = prompt.pipe(llm);

  const response = await ragChain.invoke({
    context,
    question,
  });

  return {
    messages: [response],
  };
};
```

---

### Configure Subgraph Persistence with Checkpointer

Source: https://docs.langchain.com/oss/javascript/langgraph/use-subgraphs

Configures the persistence behavior of a LangGraph subgraph by passing the checkpointer parameter to the compile method. Setting this parameter determines whether the subgraph operates in per-invocation, per-thread, or stateless mode.

```typescript
const subgraph = builder.compile({ checkpointer: false }); // or true, or null
```

---

### Manage Graph Recursion Limits

Source: https://docs.langchain.com/oss/javascript/langgraph/use-graph-api

Shows how to configure a recursion limit during graph invocation and handle the resulting GraphRecursionError when the limit is exceeded.

```typescript
import { GraphRecursionError } from "@langchain/langgraph";

try {
  await graph.invoke(inputs, { recursionLimit: 3 });
} catch (error) {
  if (error instanceof GraphRecursionError) {
    console.log("Recursion Error");
  }
}
```

---

### Implement Response Drafting Node

Source: https://docs.langchain.com/oss/javascript/langgraph/thinking-in-langgraph

A node that aggregates state data, such as search results and customer history, to prepare context for generating a final email response.

```typescript
import { Command, interrupt } from "@langchain/langgraph";

const draftResponse: GraphNode<typeof EmailAgentState> = async (
  state,
  config,
) => {
  const classification = state.classification!;
  const contextSections: string[] = [];

  if (state.searchResults) {
    const formattedDocs = state.searchResults
      .map((doc) => `- ${doc}`)
      .join("\n");
    contextSections.push(`Relevant documentation:\n${formattedDocs}`);
  }

  if (state.customerHistory) {
    contextSections.push(
      `Customer tier: ${state.customerHistory.tier ?? "standard"}`,
    );
  }
};
```

---

### Stream subgraph outputs in LangGraph

Source: https://docs.langchain.com/oss/javascript/langgraph/use-subgraphs

Demonstrates how to enable subgraph output streaming by setting the 'subgraphs' configuration option to true. This allows the parent graph to emit updates from nested subgraphs during execution.

```typescript
for await (const chunk of await graph.stream(
  { foo: "foo" },
  {
    subgraphs: true,
    streamMode: "updates",
  },
)) {
  console.log(chunk);
}
```

```typescript
import { StateGraph, StateSchema, START } from "@langchain/langgraph";
import * as z from "zod";

// Define subgraph
const SubgraphState = new StateSchema({
  foo: z.string(),
  bar: z.string(),
});

const subgraphBuilder = new StateGraph(SubgraphState)
  .addNode("subgraphNode1", (state) => {
    return { bar: "bar" };
  })
  .addNode("subgraphNode2", (state) => {
    return { foo: state.foo + state.bar };
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
  .addNode("node2", subgraph)
  .addEdge(START, "node1")
  .addEdge("node1", "node2");

const graph = builder.compile();

for await (const chunk of await graph.stream(
  { foo: "foo" },
  {
    streamMode: "updates",
    subgraphs: true,
  },
)) {
  console.log(chunk);
}
```

---

### Define Multiple Schemas in LangGraph (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/graph-api

This snippet demonstrates how to define distinct input, output, overall, and private state schemas using Zod and StateSchema in LangGraph. It illustrates how nodes can read from and write to different state channels, including private ones, and how the graph's input and output can be constrained.

```typescript
import { StateSchema, GraphNode } from "@langchain/langgraph";
import * as z from "zod";

const InputState = new StateSchema({
  userInput: z.string(),
});

const OutputState = new StateSchema({
  graphOutput: z.string(),
});

const OverallState = new StateSchema({
  foo: z.string(),
  userInput: z.string(),
  graphOutput: z.string(),
});

const PrivateState = new StateSchema({
  bar: z.string(),
});

const graph = new StateGraph({
  state: OverallState,
  input: InputState,
  output: OutputState,
})
  .addNode("node1", (state) => {
    // Write to OverallState
    return { foo: state.userInput + " name" };
  })
  .addNode("node2", (state) => {
    // Read from OverallState, write to PrivateState
    return { bar: state.foo + " is" };
  })
  .addNode(
    "node3",
    (state) => {
      // Read from PrivateState, write to OutputState
      return { graphOutput: state.bar + " Lance" };
    },
    { input: PrivateState },
  )
  .addEdge(START, "node1")
  .addEdge("node1", "node2")
  .addEdge("node2", "node3")
  .addEdge("node3", END)
  .compile();

await graph.invoke({ userInput: "My" });
// { graphOutput: 'My name is Lance' }
```

---

### Initialize In-Memory Store for LangGraph

Source: https://docs.langchain.com/oss/javascript/langgraph/add-memory

Demonstrates how to instantiate an InMemoryStore and compile a StateGraph with it to enable basic persistent data storage.

```typescript
import { InMemoryStore, StateGraph } from "@langchain/langgraph";

const store = new InMemoryStore();

const builder = new StateGraph(...);
const graph = builder.compile({ store });
```

---

### Subgraph Time Travel with Inherited Checkpointer (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/use-time-travel

Demonstrates time travel for a subgraph that inherits its parent's checkpointer. In this default configuration, the entire subgraph is treated as a single step, allowing time travel only from the parent level. This means re-executing the whole subgraph from scratch upon rollback.

```typescript
// Subgraph without its own checkpointer (default)
const subgraph = new StateGraph(StateAnnotation)
  .addNode("stepA", stepA) // Has interrupt()
  .addNode("stepB", stepB) // Has interrupt()
  .addEdge(START, "stepA")
  .addEdge("stepA", "stepB")
  .compile(); // No checkpointer — inherits from parent

const graph = new StateGraph(StateAnnotation)
  .addNode("subgraphNode", subgraph)
  .addEdge(START, "subgraphNode")
  .compile({ checkpointer });

// Complete both interrupts
await graph.invoke({ value: [] }, config);
await graph.invoke(new Command({ resume: "Alice" }), config);
await graph.invoke(new Command({ resume: "30" }), config);

// Time travel from before the subgraph
const states = [];
for await (const state of graph.getStateHistory(config)) {
  states.push(state);
}
const beforeSub = states.filter((s) => s.next.includes("subgraphNode")).pop();

const forkConfig = await graph.updateState(beforeSub.config, {
  value: ["forked"],
});
const result = await graph.invoke(null, forkConfig);
// The entire subgraph re-executes from scratch
// You cannot time travel to a point between stepA and stepB
```

---

### Invoke LangGraph with User and Thread IDs

Source: https://docs.langchain.com/oss/javascript/langgraph/persistence

This code illustrates how to invoke a compiled LangGraph, providing essential configuration including a `thread_id` for conversation context and a `userId` for namespacing memories. It uses a streaming mode to receive updates.

```typescript
// Invoke the graph
const userId = "1";
const config = { configurable: { thread_id: "1" }, context: { userId } };

// First let's just say hi to the AI
for await (const update of await graph.stream(
  { messages: [{ role: "user", content: "hi" }] },
  { ...config, streamMode: "updates" },
)) {
  console.log(update);
}
```

---

### Assemble the Agentic RAG StateGraph

Source: https://docs.langchain.com/oss/javascript/langgraph/agentic-rag

Defines the workflow for an Agentic RAG system by configuring nodes for query generation, retrieval, document grading, and rewriting. It uses conditional edges to route the flow based on tool calls and grading results.

```typescript
import {
  StateGraph,
  START,
  END,
  ConditionalEdgeRouter,
} from "@langchain/langgraph";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { AIMessage } from "langchain";

const toolNode = new ToolNode(tools);

const shouldRetrieve: ConditionalEdgeRouter<typeof State, "retrieve"> = (
  state,
) => {
  const lastMessage = state.messages.at(-1);
  if (AIMessage.isInstance(lastMessage) && lastMessage.tool_calls.length) {
    return "retrieve";
  }
  return END;
};

const builder = new StateGraph(GraphState)
  .addNode("generateQueryOrRespond", generateQueryOrRespond)
  .addNode("retrieve", toolNode)
  .addNode("gradeDocuments", gradeDocuments)
  .addNode("rewrite", rewrite)
  .addNode("generate", generate)
  .addEdge(START, "generateQueryOrRespond")
  .addConditionalEdges("generateQueryOrRespond", shouldRetrieve)
  .addEdge("retrieve", "gradeDocuments")
  .addConditionalEdges("gradeDocuments", (state) => {
    const lastMessage = state.messages.at(-1);
    return lastMessage.content === "generate" ? "generate" : "rewrite";
  })
  .addEdge("generate", END)
  .addEdge("rewrite", "generateQueryOrRespond");

const graph = builder.compile();
```

---

### LangGraph StateSchema Node Shorthand (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/graph-api

Demonstrates the use of the `Node` property on a StateSchema instance as a shorthand for typing graph nodes. This simplifies type definitions when working with graph states.

```typescript
import { StateSchema, GraphNode } from "@langchain/langgraph";
import { z } from "zod";

// Assuming MessagesValue is defined elsewhere, e.g.:
// const MessagesValue = z.array(z.any()); // Replace z.any() with actual message types

const State = new StateSchema({
  messages: z.array(z.any()), // Placeholder for actual message type
  step: z.string(),
});

// These are equivalent:
const myNode1: GraphNode<typeof State> = (state) => ({ step: "done" });
const myNode2: typeof State.Node = (state) => ({ step: "done" });
```

---

### Demonstrate Multi-turn State Accumulation

Source: https://docs.langchain.com/oss/javascript/langgraph/use-subgraphs

Illustrates how a subagent maintains state across multiple invocations when using a consistent thread ID.

```typescript
const config = { configurable: { thread_id: "1" } };

let response = await agent.invoke(
  { messages: [{ role: "user", content: "Tell me about apples" }] },
  config,
);

response = await agent.invoke(
  { messages: [{ role: "user", content: "Now tell me about bananas" }] },
  config,
);
```

---

### Define Zod State with LangGraph Registry (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/use-graph-api

Demonstrates how to define a Zod object for LangGraph state using Zod v4's registry. It shows how to register custom metadata for array fields (like messages) and simple fields, as well as how to implement custom reducers for numeric fields.

```typescript
import * as z from "zod";
import { BaseMessage } from "@langchain/core/messages";
import {
  StateGraph,
  MessagesZodMeta,
  messagesStateReducer,
} from "@langchain/langgraph";
import { registry } from "@langchain/langgraph/zod";

const State = z.object({
  // Use .register() with the LangGraph registry and MessagesZodMeta
  messages: z
    .array(z.custom<BaseMessage>())
    .default([])
    .register(registry, MessagesZodMeta),
  // Simple fields work directly (last-write-wins)
  question: z.string().optional(),
  answer: z.string().optional(),
  // Custom reducer via registry metadata
  count: z
    .number()
    .default(0)
    .register(registry, {
      reducer: (current: number, update: number) => current + update,
    }),
});

const graph = new StateGraph(State);
```

---

### Execute and Stream LangGraph Agent

Source: https://docs.langchain.com/oss/javascript/langgraph/workflows-agents

Demonstrates how to process tool calls within an agent loop and stream the resulting updates. It uses an asynchronous iterator to handle the stream of steps generated by the agent.

```javascript
llmResponse.tool_calls.map((toolCall) => callTool(toolCall));

messages = addMessages(messages, [llmResponse, ...toolResults]);
llmResponse = await callLlm(messages);
}

messages = addMessages(messages, [llmResponse]);
return messages;
});

const messages = [{
  role: "user",
  content: "Add 3 and 4."
}];

const stream = await agent.stream([messages], {
  streamMode: "updates",
});

for await (const step of stream) {
  console.log(step);
}
```

---

### Annotate Traces with Metadata and Tags

Source: https://docs.langchain.com/oss/javascript/langgraph/observability

Attaches custom metadata and tags to an agent invocation to improve searchability and context within the LangSmith platform.

```typescript
import { LangChainTracer } from "@langchain/core/tracers/tracer_langchain";

const tracer = new LangChainTracer({ projectName: "email-agent-test" });
await agent.invoke(
  {
    messages: [{role: "user", content: "Send a test email to alice@example.com"}]
  },
  config: {
    tags: ["production", "email-assistant", "v1.0"],
    metadata: {
      userId: "user123",
      sessionId: "session456",
      environment: "production"
    }
  },
);
```

---

### Manage Shared State Across Workflow Nodes

Source: https://docs.langchain.com/oss/javascript/langgraph/choosing-apis

Shows how to define a centralized StateSchema that multiple nodes can read from and modify. This ensures consistent data flow between disparate components in a workflow.

```typescript
import * as z from "zod";
import { StateSchema, type GraphNode } from "@langchain/langgraph";

const WorkflowState = new StateSchema({
  userInput: z.string(),
  searchResults: z.array(z.string()).default([]),
  generatedResponse: z.string().optional(),
  validationStatus: z.string().optional(),
});

const searchNode: GraphNode<typeof WorkflowState> = async (state) => {
  const results = await search(state.userInput);
  return { searchResults: results };
};

const validationNode: GraphNode<typeof WorkflowState> = async (state) => {
  const isValid = await validate(state.generatedResponse);
  return { validationStatus: isValid ? "valid" : "invalid" };
};
```

---

### Perform Selective Tracing in TypeScript

Source: https://docs.langchain.com/oss/javascript/langgraph/observability

Demonstrates how to trace specific agent invocations using the LangChainTracer callback, allowing for granular control over which operations are recorded in LangSmith.

```typescript
import { LangChainTracer } from "@langchain/core/tracers/tracer_langchain";

// This WILL be traced
const tracer = new LangChainTracer();
await agent.invoke(
  {
    messages: [
      { role: "user", content: "Send a test email to alice@example.com" },
    ],
  },
  { callbacks: [tracer] },
);

// This will NOT be traced (if LANGSMITH_TRACING is not set)
await agent.invoke({
  messages: [{ role: "user", content: "Send another email" }],
});
```

---

### Stream Tool Progress with Async Generator (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/streaming

This TypeScript snippet defines a tool as an async generator to emit intermediate progress events during its execution. Each `yield` statement sends an `on_tool_event` to the stream, providing real-time updates on the tool's progress. The final `return` value serves as the tool's output.

```typescript
import { tool } from "@langchain/core/tools";
import { z } from "zod/v4";

const searchFlights = tool(
  async function* (input) {
    const airlines = ["United", "Delta", "American", "JetBlue"];
    const completed: string[] = [];

    for (let i = 0; i < airlines.length; i++) {
      await new Promise((r) => setTimeout(r, 500));
      completed.push(airlines[i]);

      // Each yield emits an on_tool_event to the stream
      yield {
        message: `Searching ${airlines[i]}...`,
        progress: (i + 1) / airlines.length,
        completed,
      };
    }

    // The return value becomes the tool result (ToolMessage.content)
    return JSON.stringify({
      flights: [
        { airline: "United", price: 450, duration: "5h 30m" },
        { airline: "Delta", price: 520, duration: "5h 15m" },
      ],
    });
  },
  {
    name: "search_flights",
    description: "Search for available flights to a destination.",
    schema: z.object({
      destination: z.string(),
      date: z.string(),
    }),
  },
);

// Note: Tools that return a Promise will emit on_tool_start and on_tool_end, but not on_tool_event.
```

---

### Implement Search and Bug Tracking Nodes

Source: https://docs.langchain.com/oss/javascript/langgraph/thinking-in-langgraph

Nodes for interacting with external systems like knowledge bases or bug trackers. These nodes update the state with results and route the workflow to the response drafting stage.

```typescript
import { Command, GraphNode } from "@langchain/langgraph";

const searchDocumentation: GraphNode<typeof EmailAgentState> = async (
  state,
  config,
) => {
  const classification = state.classification!;
  const query = `${classification.intent} ${classification.topic}`;
  let searchResults: string[];

  try {
    searchResults = [
      "Reset password via Settings > Security > Change Password",
      "Password must be at least 12 characters",
      "Include uppercase, lowercase, numbers, and symbols",
    ];
  } catch (error) {
    searchResults = [`Search temporarily unavailable: ${error}`];
  }

  return new Command({
    update: { searchResults },
    goto: "draftResponse",
  });
};

const bugTracking: GraphNode<typeof EmailAgentState> = async (
  state,
  config,
) => {
  const ticketId = "BUG-12345";
  return new Command({
    update: { searchResults: [`Bug ticket ${ticketId} created`] },
    goto: "draftResponse",
  });
};
```

---

### Implement Conditional Routing with LangGraph

Source: https://docs.langchain.com/oss/javascript/langgraph/workflows-agents

Demonstrates how to route user input to specific LLM tasks based on a decision-making router node. It uses an entrypoint to manage the workflow logic and streams the final output.

```typescript
const llmCallRouter = task("router", async (input: string) => {
  const decision = await router.invoke([
    {
      role: "system",
      content:
        "Route the input to story, joke, or poem based on the user's request.",
    },
    {
      role: "user",
      content: input,
    },
  ]);
  return decision.step;
});

const workflow = entrypoint("routerWorkflow", async (input: string) => {
  const nextStep = await llmCallRouter(input);
  let llmCall;
  if (nextStep === "story") {
    llmCall = llmCall1;
  } else if (nextStep === "joke") {
    llmCall = llmCall2;
  } else if (nextStep === "poem") {
    llmCall = llmCall3;
  }
  const finalResult = await llmCall(input);
  return finalResult;
});

const stream = await workflow.stream("Write me a joke about cats", {
  streamMode: "updates",
});

for await (const step of stream) {
  console.log(step);
}
```

---

### Define Graph State with StateSchema in LangGraph

Source: https://docs.langchain.com/oss/javascript/langgraph/changelog-js

Demonstrates how to define a type-safe graph state using StateSchema, which supports Standard JSON Schema libraries like Zod. It includes the usage of ReducedValue for state accumulation and integration into a StateGraph.

```typescript
import { z } from "zod";
import {
  StateSchema,
  ReducedValue,
  MessagesValue,
  StateGraph,
  START,
  END,
} from "@langchain/langgraph";

const AgentState = new StateSchema({
  messages: MessagesValue,
  currentStep: z.string(),
  count: z.number().default(0),
  history: new ReducedValue(
    z.array(z.string()).default(() => []),
    {
      inputSchema: z.string(),
      reducer: (current, next) => [...current, next],
    },
  ),
});

type State = typeof AgentState.State;
type Update = typeof AgentState.Update;

const graph = new StateGraph(AgentState)
  .addNode("agent", (state) => ({ count: state.count + 1 }))
  .addEdge(START, "agent")
  .addEdge("agent", END)
  .compile();
```

---

### Handle Reset Action

Source: https://docs.langchain.com/oss/javascript/langgraph/frontend/graph-execution

The handleReset useCallback function triggers a reset action on the host object and sets the pattern if the host is ready. It depends on the 'pattern' state.

```javascript
const handleReset = useCallback(() => {
  cachedRef.current?.host.reset();
  if (cachedRef.current?.ready) {
    cachedRef.current.host.setPattern(pattern);
  }
}, [pattern]);
```

---

### Access Execution Metadata in LangGraph Nodes

Source: https://docs.langchain.com/oss/javascript/langgraph/graph-api

Shows how to retrieve and log internal execution metadata such as step, node name, triggers, and checkpoint namespaces from the config object within a GraphNode.

```typescript
const inspectMetadata: GraphNode<typeof State> = async (state, config) => {
  const metadata = config.metadata;

  console.log(`Step: ${metadata?.langgraph_step}`);
  console.log(`Node: ${metadata?.langgraph_node}`);
  console.log(`Triggers: ${metadata?.langgraph_triggers}`);
  console.log(`Path: ${metadata?.langgraph_path}`);
  console.log(`Checkpoint NS: ${metadata?.langgraph_checkpoint_ns}`);

  return state;
};
```

---

### Store Memory with Key-Value in TypeScript

Source: https://docs.langchain.com/oss/javascript/langgraph/persistence

Illustrates saving a memory to the MemoryStore using the `put` method. This involves specifying the namespace, a unique memory ID, and the memory content as a key-value pair.

```typescript
import { v4 as uuidv4 } from "uuid";

const memoryId = uuidv4();
const memory = { food_preference: "I like pizza" };
await memoryStore.put(namespaceForMemory, memoryId, memory);
```

---

### Invoke LangGraph with Initial State

Source: https://docs.langchain.com/oss/javascript/langgraph/use-graph-api

This snippet shows how to execute the compiled LangGraph by invoking it with an initial state. The `invoke` method processes the graph based on the provided state and returns the final state after execution. The output of the invocation, including the updated aggregate and 'which' key, is then logged to the console.

```typescript
const result = await graph.invoke({ aggregate: [] });
console.log(result);
```

---

### Modularize Workflows for Team Development

Source: https://docs.langchain.com/oss/javascript/langgraph/choosing-apis

Demonstrates the separation of concerns by assigning distinct functional nodes to different team members. This modular approach improves maintainability and documentation for complex systems.

```typescript
workflow
  .addNode("dataIngestion", dataTeamFunction)
  .addNode("mlProcessing", mlTeamFunction)
  .addNode("businessLogic", productTeamFunction)
  .addNode("outputFormatting", frontendTeamFunction);
```

---

### Type Standalone Node Functions and State Helpers

Source: https://docs.langchain.com/oss/javascript/langgraph/changelog-js

Shows how to use exported type utilities like GraphNode to provide full type inference for node functions and state objects outside of the graph builder.

```typescript
import { GraphNode } from "@langchain/langgraph";

// Type standalone node functions
const myNode: GraphNode<typeof AgentState> = (state, config) => {
  return { count: state.count + 1 };
};

// Use schema type helpers directly
const processState = (state: typeof AgentState.State) => {
  console.log(state.count);
};
```

---

### Implement MessagesValue for Chat State Management

Source: https://docs.langchain.com/oss/javascript/langgraph/use-graph-api

Demonstrates how to use MessagesValue within a StateSchema to handle message updates and shorthand formats. It includes initializing the state, defining a node to process messages, and invoking the graph with input messages.

```typescript
import {
  StateSchema,
  StateGraph,
  MessagesValue,
  GraphNode,
  START,
} from "@langchain/langgraph";
import * as z from "zod";

const State = new StateSchema({
  messages: MessagesValue,
  extraField: z.number(),
});

const node: GraphNode<typeof State> = (state) => {
  const newMessage = new AIMessage("Hello!");
  return { messages: [newMessage], extraField: 10 };
};

const graph = new StateGraph(State)
  .addNode("node", node)
  .addEdge(START, "node")
  .compile();

const inputMessage = { role: "user", content: "Hi" };
const result = await graph.invoke({ messages: [inputMessage] });

for (const message of result.messages) {
  console.log(`${message.getType()}: ${message.content}`);
}
```

---

### Implement Conditional Branching with Graph API

Source: https://docs.langchain.com/oss/javascript/langgraph/choosing-apis

Demonstrates using ConditionalEdgeRouter to manage complex decision trees within a StateGraph. It defines a state schema and routes execution based on state values like retry counts or tool selection.

```typescript
import * as z from "zod";
import {
  StateGraph,
  StateSchema,
  MessagesValue,
  START,
  END,
  type GraphNode,
  type ConditionalEdgeRouter,
} from "@langchain/langgraph";

const AgentState = new StateSchema({
  messages: MessagesValue,
  currentTool: z.string(),
  retryCount: z.number().default(0),
});

const shouldContinue: ConditionalEdgeRouter<typeof AgentState> = (state) => {
  if (state.retryCount > 3) {
    return END;
  } else if (state.currentTool === "search") {
    return "processSearch";
  } else {
    return "callLlm";
  }
};

const workflow = new StateGraph(AgentState)
  .addNode("callLlm", callLlmNode)
  .addNode("processSearch", searchNode)
  .addConditionalEdges("callLlm", shouldContinue);
```

---

### Handle LLM-Recoverable Errors via State Updates

Source: https://docs.langchain.com/oss/javascript/langgraph/thinking-in-langgraph

Captures tool execution errors and updates the graph state with the error message, allowing the LLM to analyze the failure and attempt a correction in the next iteration.

```typescript
import { Command, GraphNode } from "@langchain/langgraph";

const executeTool: GraphNode<typeof State> = async (state, config) => {
  try {
    const result = await runTool(state.toolCall);
    return new Command({
      update: { toolResult: result },
      goto: "agent",
    });
  } catch (error) {
    // Let the LLM see what went wrong and try again
    return new Command({
      update: { toolResult: `Tool error: ${error}` },
      goto: "agent",
    });
  }
};
```

---

### Resume Workflow Execution

Source: https://docs.langchain.com/oss/javascript/langgraph/functional-api

Resumes a workflow after an interrupt by passing a Command object with a resume value, or after an error by passing null to the invoke or stream methods.

```typescript
import { Command } from "@langchain/langgraph";

const config = { configurable: { thread_id: "some_thread_id" } };

// Resume after interrupt
await myWorkflow.invoke(new Command({ resume: someResumeValue }), config);

// Resume after error
await myWorkflow.invoke(null, config);
```

---

### CSS Styling for Preview Environment

Source: https://docs.langchain.com/oss/javascript/langgraph/frontend/graph-execution

Defines the visual styles for the preview environment, including tab states, buttons, dropdowns, and error indicators. It supports both light and dark modes via the [data-lc-pe].dark selector.

```css
[data-lc-pe] .lc-tab-active {
  background-color: #7fc8ff;
  color: #030710;
}
[data-lc-pe] .lc-tab-inactive {
  background-color: transparent;
  color: #6b8299;
}
[data-lc-pe] .lc-sdk-btn {
  border-color: #b8dfff;
  background-color: white;
  font-size: 13px;
  color: #030710;
}
[data-lc-pe].dark .lc-sdk-btn {
  border-color: #1a2740;
  background-color: #0b1120;
  color: #c8ddf0;
}
```

---

### Configuring Static Interrupts for Debugging

Source: https://docs.langchain.com/oss/javascript/langgraph/interrupts

Shows how to set breakpoints using interruptBefore and interruptAfter to pause graph execution. This can be done at compile-time via the graph builder or at run-time during the invoke call.

```typescript
// Compile-time configuration
const graph = builder.compile({
  interruptBefore: ["node_a"],
  interruptAfter: ["node_b", "node_c"],
  checkpointer,
});

const config = { configurable: { thread_id: "some_thread" } };
await graph.invoke(inputs, config);
await graph.invoke(null, config); // Resume execution

// Run-time configuration
graph.invoke(inputs, {
  interruptBefore: ["node_a"],
  interruptAfter: ["node_b", "node_c"],
  configurable: { thread_id: "some_thread" },
});
await graph.invoke(null, config); // Resume execution
```

---

### Build Prompt Chain with LangGraph Graph API (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/workflows-agents

This snippet demonstrates building a prompt chain using the Graph API in TypeScript. It defines a state, nodes for joke generation and improvement, and conditional edges to control the workflow. The output is a compiled graph that can be invoked.

```typescript
import {
  StateGraph,
  StateSchema,
  GraphNode,
  ConditionalEdgeRouter,
} from "@langchain/langgraph";
import { z } from "zod/v4";

// Graph state
const State = new StateSchema({
  topic: z.string(),
  joke: z.string(),
  improvedJoke: z.string(),
  finalJoke: z.string(),
});

// Define node functions

// First LLM call to generate initial joke
const generateJoke: GraphNode<typeof State> = async (state) => {
  const msg = await llm.invoke(`Write a short joke about ${state.topic}`);
  return { joke: msg.content };
};

// Gate function to check if the joke has a punchline
const checkPunchline: ConditionalEdgeRouter<typeof State, "improveJoke"> = (
  state,
) => {
  // Simple check - does the joke contain "?" or "!"
  if (state.joke?.includes("?") || state.joke?.includes("!")) {
    return "Pass";
  }
  return "Fail";
};

// Second LLM call to improve the joke
const improveJoke: GraphNode<typeof State> = async (state) => {
  const msg = await llm.invoke(
    `Make this joke funnier by adding wordplay: ${state.joke}`,
  );
  return { improvedJoke: msg.content };
};

// Third LLM call for final polish
const polishJoke: GraphNode<typeof State> = async (state) => {
  const msg = await llm.invoke(
    `Add a surprising twist to this joke: ${state.improvedJoke}`,
  );
  return { finalJoke: msg.content };
};

// Build workflow
const chain = new StateGraph(State)
  .addNode("generateJoke", generateJoke)
  .addNode("improveJoke", improveJoke)
  .addNode("polishJoke", polishJoke)
  .addEdge("__start__", "generateJoke")
  .addConditionalEdges("generateJoke", checkPunchline, {
    Pass: "improveJoke",
    Fail: "__end__",
  })
  .addEdge("improveJoke", "polishJoke")
  .addEdge("polishJoke", "__end__")
  .compile();

// Invoke
const state = await chain.invoke({ topic: "cats" });
console.log("Initial joke:");
console.log(state.joke);
console.log("\n--- --- ---\\n");
if (state.improvedJoke !== undefined) {
  console.log("Improved joke:");
  console.log(state.improvedJoke);
  console.log("\n--- --- ---\\n");

  console.log("Final joke:");
  console.log(state.finalJoke);
} else {
  console.log("Joke failed quality gate - no punchline detected!");
}
```

---

### Manage Iframe Lifecycle and Synchronization in React

Source: https://docs.langchain.com/oss/javascript/langgraph/frontend/graph-execution

This snippet manages the creation, caching, and synchronization of an iframe element. It uses ResizeObserver and event listeners to ensure the iframe remains aligned with a target DOM element while handling communication events from the preview host.

```javascript
useEffect(() => {
  let cached = iframeCache.get(cacheKey);
  if (!cached) {
    const iframe2 = document.createElement("iframe");
    iframe2.src = `${previewUrl}/${agentQuery}#/${patternRef.current}`;
    iframe2.setAttribute(
      "sandbox",
      "allow-scripts allow-same-origin allow-forms",
    );
    document.body.appendChild(iframe2);
    const host2 = createPreviewHost(iframe2, {
      allowedOrigins: [iframeOrigin],
    });
    cached = { iframe: iframe2, host: host2, ready: false };
    iframeCache.set(cacheKey, cached);
  }

  function syncPosition() {
    const slot = slotRef.current;
    if (!slot) return;
    const rect = slot.getBoundingClientRect();
    const { style } = iframe;
    style.top = `${rect.top}px`;
    style.left = `${rect.left}px`;
    style.width = `${rect.width}px`;
  }

  const ro = new ResizeObserver(syncPosition);
  if (slotRef.current) ro.observe(slotRef.current);
  return () => {
    ro.disconnect();
    // Cleanup logic
  };
}, [cacheKey, previewUrl]);
```

---

### Build Prompt Chain with LangGraph Functional API (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/workflows-agents

This snippet demonstrates building a prompt chain using the Functional API in TypeScript. It defines tasks for joke generation and improvement, a gate function, and an entrypoint to orchestrate the workflow. This approach offers a more declarative way to define the sequence of operations.

```typescript
import { task, entrypoint } from "@langchain/langgraph";

// Tasks

// First LLM call to generate initial joke
const generateJoke = task("generateJoke", async (topic: string) => {
  const msg = await llm.invoke(`Write a short joke about ${topic}`);
  return msg.content;
});

// Gate function to check if the joke has a punchline
function checkPunchline(joke: string) {
  // Simple check - does the joke contain "?" or "!"
  if (joke.includes("?") || joke.includes("!")) {
    return "Pass";
  }
  return "Fail";
}

// Second LLM call to improve the joke
const improveJoke = task("improveJoke", async (joke: string) => {
  const msg = await llm.invoke(
    `Make this joke funnier by adding wordplay: ${joke}`,
  );
  return msg.content;
});

// Third LLM call for final polish
const polishJoke = task("polishJoke", async (joke: string) => {
  const msg = await llm.invoke(`Add a surprising twist to this joke: ${joke}`);
  return msg.content;
});

const workflow = entrypoint("jokeMaker", async (topic: string) => {
  const originalJoke = await generateJoke(topic);
  if (checkPunchline(originalJoke) === "Pass") {
    return originalJoke;
  }
  const improvedJoke = await improveJoke(originalJoke);
  const polishedJoke = await polishJoke(improvedJoke);
  return polishedJoke;
});

const stream = await workflow.stream("cats", {
  streamMode: "updates",
});

for await (const step of stream) {
  console.log(step);
}
```

---

### Global Cache Initialization

Source: https://docs.langchain.com/oss/javascript/langgraph/frontend/graph-execution

Initializes global Map objects for caching iframes, SDKs, and language configurations using persistent keys on the global object. This prevents redundant data fetching across the application lifecycle.

```javascript
var CACHE_KEY = "__lcPlaygroundIframeCache";
var iframeCache =
  globalThis[CACHE_KEY] ??
  (() => {
    const m = new Map();
    globalThis[CACHE_KEY] = m;
    return m;
  })();

var SDK_CACHE_KEY = "__lcPlaygroundSdkCache";
var sdkCache =
  globalThis[SDK_CACHE_KEY] ??
  (() => {
    const m = new Map();
    globalThis[SDK_CACHE_KEY] = m;
    return m;
  })();

var LANG_CACHE_KEY = "__lcPlaygroundLangCache";
var langCache =
  globalThis[LANG_CACHE_KEY] ??
  (() => {
    const m = new Map();
    globalThis[LANG_CACHE_KEY] = m;
    return m;
  })();
```

---

### Find Specific Checkpoints in Graph State History (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/persistence

Demonstrates how to filter the retrieved state history to locate specific checkpoints. This includes finding states before a node executed, by step number, by source, or by the presence of interrupts in tasks. These filtering operations are performed on an array of `StateSnapshot` objects after fetching the history.

```typescript
const history: StateSnapshot[] = [];
for await (const state of graph.getStateHistory(config)) {
  history.push(state);
}

// Find the checkpoint before a specific node executed
const beforeNodeB = history.find((s) => s.next.includes("nodeB"));

// Find a checkpoint by step number
const step2 = history.find((s) => s.metadata.step === 2);

// Find checkpoints created by updateState
const forks = history.filter((s) => s.metadata.source === "update");

// Find the checkpoint where an interrupt occurred
const interrupted = history.find(
  (s) => s.tasks.length > 0 && s.tasks.some((t) => t.interrupts.length > 0),
);
```

---

### Define and Execute Essay Writing Workflow with Interrupt

Source: https://docs.langchain.com/oss/javascript/langgraph/functional-api

This TypeScript code defines a LangGraph workflow that simulates writing an essay using a `task`. It then uses `interrupt` to pause execution and request human review, providing the essay content and an action prompt. The workflow is executed, streaming output until an interrupt occurs.

```typescript
import { MemorySaver, entrypoint, task, interrupt } from "@langchain/langgraph";

const writeEssay = task("writeEssay", async (topic: string) => {
  // A placeholder for a long-running task.
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return `An essay about topic: ${topic}`;
});

const workflow = entrypoint(
  { checkpointer: new MemorySaver(), name: "workflow" },
  async (topic: string) => {
    const essay = await writeEssay(topic);
    const isApproved = interrupt({
      // Any json-serializable payload provided to interrupt as argument.
      // It will be surfaced on the client side as an Interrupt when streaming data
      // from the workflow.
      essay, // The essay we want reviewed.
      // We can add any additional information that we need.
      // For example, introduce a key called "action" with some instructions.
      action: "Please approve/reject the essay",
    });

    return {
      essay, // The essay that was generated
      isApproved, // Response from HIL
    };
  },
);

// Example execution (within an async context or IIFE)
// import { v4 as uuidv4 } from "uuid";
// const threadId = uuidv4();
// const config = {
//   configurable: {
//     thread_id: threadId
//   }
// };
// for await (const item of workflow.stream("cat", config)) {
//   console.log(item);
// }
```

---

### Stream tool output with custom streaming

Source: https://docs.langchain.com/oss/javascript/langgraph/streaming

Shows how to integrate custom streaming logic within a LangGraph tool. It uses a generator function to stream tokens from an OpenAI client and propagates them to the graph stream via the config writer.

```typescript
import {
  StateGraph,
  StateSchema,
  MessagesValue,
  GraphNode,
  START,
  LangGraphRunnableConfig,
} from "@langchain/langgraph";
import { tool } from "@langchain/core/tools";
import * as z from "zod";
import OpenAI from "openai";

const openaiClient = new OpenAI();
const modelName = "gpt-4.1-mini";

async function* streamTokens(modelName: string, messages: any[]) {
  const response = await openaiClient.chat.completions.create({
    messages,
    model: modelName,
    stream: true,
  });
  let role: string | null = null;
  for await (const chunk of response) {
    const delta = chunk.choices[0]?.delta;
    if (delta?.role) role = delta.role;
    if (delta?.content) yield { role, content: delta.content };
  }
}

const getItems = tool(
  async (input, config: LangGraphRunnableConfig) => {
    let response = "";
    for await (const msgChunk of streamTokens(modelName, [
      { role: "user", content: `List items in ${input.place}` },
    ])) {
      response += msgChunk.content;
      config.writer?.(msgChunk);
    }
    return response;
  },
  { name: "get_items", schema: z.object({ place: z.string() }) },
);

const State = new StateSchema({ messages: MessagesValue });

const callTool: GraphNode<typeof State> = async (state) => {
  const aiMessage = state.messages.at(-1);
  const toolCall = aiMessage.tool_calls?.at(-1);
  const functionArguments = JSON.parse(toolCall?.function?.arguments);
  const functionResponse = await getItems.invoke(functionArguments);
  return {
    messages: [
      {
        tool_call_id: toolCall.id,
        role: "tool",
        name: "get_items",
        content: functionResponse,
      },
    ],
  };
};

const graph = new StateGraph(State)
  .addNode("callTool", callTool)
  .addEdge(START, "callTool")
  .compile();

const inputs = {
  messages: [
    {
      content: null,
      role: "assistant",
      tool_calls: [
        {
          id: "1",
          function: { arguments: '{"place":"bedroom"}', name: "get_items" },
          type: "function",
        },
      ],
    },
  ],
};

for await (const chunk of await graph.stream(inputs, {
  streamMode: "custom",
})) {
  console.log(chunk.content + "|");
}
```

---

### Subgraph Time Travel with Own Checkpointer (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/use-time-travel

Illustrates time travel for a subgraph configured with its own checkpointer. This allows for granular checkpoints within the subgraph, enabling rollback to specific points between nodes, such as after an interrupt in 'stepA' but before 'stepB'.

```typescript
// Subgraph with its own checkpointer
const subgraph = new StateGraph(StateAnnotation)
  .addNode("stepA", stepA) // Has interrupt()
  .addNode("stepB", stepB) // Has interrupt()
  .addEdge(START, "stepA")
  .addEdge("stepA", "stepB")
  .compile({ checkpointer: true }); // Own checkpoint history

const graph = new StateGraph(StateAnnotation)
  .addNode("subgraphNode", subgraph)
  .addEdge(START, "subgraphNode")
  .compile({ checkpointer });

// Run until stepA interrupt, then resume -> hits stepB interrupt
await graph.invoke({ value: [] }, config);
await graph.invoke(new Command({ resume: "Alice" }), config);

// Get the subgraph's own checkpoint (between stepA and stepB)
const parentState = await graph.getState(config, { subgraphs: true });
const subConfig = parentState.tasks[0].state.config;

// Fork from the subgraph checkpoint
const forkConfig = await graph.updateState(subConfig, { value: ["forked"] });
const result = await graph.invoke(null, forkConfig);
// stepB re-executes, stepA's result is preserved
```

---

### Perform Semantic Search in TypeScript

Source: https://docs.langchain.com/oss/javascript/langgraph/persistence

Executes a semantic search query against the MemoryStore using natural language. The `search` method, when configured with embeddings, returns memories that are semantically relevant to the query.

```typescript
// Find memories about food preferences
// (This can be done after putting memories into the store)
const memories = await store.search(namespaceForMemory, {
  query: "What does the user like to eat?",
  limit: 3, // Return top 3 matches
});
```

---

### Split documents into chunks

Source: https://docs.langchain.com/oss/javascript/langgraph/agentic-rag

Uses RecursiveCharacterTextSplitter to break down large documents into smaller, manageable chunks for efficient indexing in a vector store.

```typescript
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

const docsList = docs.flat();

const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 500,
  chunkOverlap: 50,
});
const docSplits = await textSplitter.splitDocuments(docsList);
```

---

### Configure node ends for Command routing

Source: https://docs.langchain.com/oss/javascript/langgraph/graph-api

When using Command for routing, you must explicitly define the allowed destination nodes in the node configuration using the ends parameter.

```typescript
builder.addNode("myNode", myNode, {
  ends: ["myOtherNode", END],
});
```

---

### Search for Memories in a LangGraph Node

Source: https://docs.langchain.com/oss/javascript/langgraph/persistence

This code demonstrates how to retrieve memories stored in the Memory Store within a LangGraph node. It uses the `runtime.store.search()` method, namespaced by `userId`, to find relevant memories based on the latest user message.

```typescript
const callModel: GraphNode<typeof MessagesState> = async (state, runtime) => {
  // Get the user id from the config
  const userId = runtime.context?.user_id;

  // Namespace the memory
  const namespace = [userId, "memories"];

  // Search based on the most recent message
  const memories = await runtime.store?.search(namespace, {
    query: state.messages[state.messages.length - 1].content,
    limit: 3,
  });
  const info = memories.map((d) => d.value.memory).join("\n");

  // ... Use memories in the model call
};
```

---

### Handle Interrupts and Resumption in LangGraph

Source: https://docs.langchain.com/oss/javascript/langgraph/use-subgraphs

Shows how to insert an interrupt into a tool function to pause execution and how to resume the process using a Command object.

```typescript
const fruitInfo = tool(
  (input) => {
    interrupt("continue?");
    return `Info about ${input.fruitName}`;
  },
  {
    name: "fruit_info",
    description: "Look up fruit info.",
    schema: z.object({ fruitName: z.string() }),
  },
);

const config = { configurable: { thread_id: "1" } };

let response = await agent.invoke(
  { messages: [{ role: "user", content: "Tell me about apples" }] },
  config,
);

response = await agent.invoke(new Command({ resume: true }), config);
```

---

### Initialize ChatAnthropic LLM

Source: https://docs.langchain.com/oss/javascript/langgraph/workflows-agents

Initializes the ChatAnthropic language model, specifying the model name and API key. This LLM can be used for various natural language processing tasks within LangGraph.

```typescript
import { ChatAnthropic } from "@langchain/anthropic";

const llm = new ChatAnthropic({
  model: "claude-sonnet-4-6",
  apiKey: "<your_anthropic_key>",
});
```

---

### Compose nested entrypoints in LangGraph

Source: https://docs.langchain.com/oss/javascript/langgraph/use-functional-api

Demonstrates how to invoke sub-workflows or tasks from within a parent entrypoint. The sub-workflow automatically inherits the checkpointer configuration from the parent.

```typescript
import { v4 as uuidv4 } from "uuid";
import { entrypoint, MemorySaver } from "@langchain/langgraph";

const checkpointer = new MemorySaver();

const multiply = entrypoint(
  { name: "multiply" },
  async (inputs: { a: number; b: number }) => {
    return inputs.a * inputs.b;
  },
);

const main = entrypoint(
  { checkpointer, name: "main" },
  async (inputs: { x: number; y: number }) => {
    const result = await multiply.invoke({ a: inputs.x, b: inputs.y });
    return { product: result };
  },
);

const config = { configurable: { thread_id: uuidv4() } };
console.log(await main.invoke({ x: 6, y: 7 }, config));
```

---

### Switch UI View and Track Events

Source: https://docs.langchain.com/oss/javascript/langgraph/frontend/graph-execution

The switchView useCallback function handles changing the active UI view and tracks specific events like 'code_tab_clicked' when the code view is selected. It updates the component's state and interacts with the host object.

```javascript
const switchView = useCallback(
  (view) => {
    setActiveView(view);
    if (cachedRef.current) {
      cachedRef.current.lastView = view;
      if (cachedRef.current.ready) {
        cachedRef.current.host.setView(view);
        if (view === "code") {
          cachedRef.current.host.trackEvent("code_tab_clicked", {
            pattern,
          });
        }
      }
    }
  },
  [pattern],
);
```

---

### Set Recursion Limit at Runtime in LangGraph

Source: https://docs.langchain.com/oss/javascript/langgraph/graph-api

Demonstrates how to set a custom recursion limit for a LangGraph execution using the `recursionLimit` configuration option during `invoke` or `stream` calls. This limit prevents infinite loops by capping the number of super-steps.

```typescript
await graph.invoke(inputs, {
  recursionLimit: 5,
  context: { llm: "anthropic" },
});
```

---

### Console Output After Resuming Workflow

Source: https://docs.langchain.com/oss/javascript/langgraph/functional-api

This console output shows the final result of the LangGraph workflow after it has been resumed. It indicates the completion of the 'workflow' node and includes the final output, which contains the generated essay and the result of the human review (`isApproved: true`).

```console
{ workflow: { essay: 'An essay about topic: cat', isApproved: true } }
```

---

### Forking Between Multiple Interrupts in LangGraph JS

Source: https://docs.langchain.com/oss/javascript/langgraph/use-time-travel

Shows how to fork execution from a point between two interrupts in a LangGraph. This allows modifying a later answer without re-prompting for earlier questions, useful for multi-step forms or complex human-in-the-loop processes.

```typescript
// Fork from BETWEEN the two interrupts (after askName, before askAge)
const states = [];
for await (const state of graph.getStateHistory(config)) {
  states.push(state);
}
const between = states.filter((s) => s.next.includes("askAge")).pop();

const forkConfig = await graph.updateState(between.config, {
  value: ["modified"],
});
const result = await graph.invoke(null, forkConfig);
// askName result preserved ("name:Alice")
// askAge pauses at interrupt — waiting for new answer
```

---

### Implement Parallel Task Execution with LangGraph

Source: https://docs.langchain.com/oss/javascript/langgraph/workflows-agents

Demonstrates how to execute multiple LLM tasks in parallel using LangGraph. The Graph API approach uses a StateGraph to manage dependencies, while the Functional API utilizes Promise.all for concurrent task execution.

```typescript
import { StateGraph, StateSchema, GraphNode } from "@langchain/langgraph";
import * as z from "zod";

// Graph state
const State = new StateSchema({
  topic: z.string(),
  joke: z.string(),
  story: z.string(),
  poem: z.string(),
  combinedOutput: z.string(),
});

// Nodes
const callLlm1: GraphNode<typeof State> = async (state) => {
  const msg = await llm.invoke(`Write a joke about ${state.topic}`);
  return { joke: msg.content };
};

const callLlm2: GraphNode<typeof State> = async (state) => {
  const msg = await llm.invoke(`Write a story about ${state.topic}`);
  return { story: msg.content };
};

const callLlm3: GraphNode<typeof State> = async (state) => {
  const msg = await llm.invoke(`Write a poem about ${state.topic}`);
  return { poem: msg.content };
};

const aggregator: GraphNode<typeof State> = async (state) => {
  const combined =
    `Here's a story, joke, and poem about ${state.topic}!\n\n` +
    `STORY:\n${state.story}\n\n` +
    `JOKE:\n${state.joke}\n\n` +
    `POEM:\n${state.poem}`;
  return { combinedOutput: combined };
};

// Build workflow
const parallelWorkflow = new StateGraph(State)
  .addNode("callLlm1", callLlm1)
  .addNode("callLlm2", callLlm2)
  .addNode("callLlm3", callLlm3)
  .addNode("aggregator", aggregator)
  .addEdge("__start__", "callLlm1")
  .addEdge("__start__", "callLlm2")
  .addEdge("__start__", "callLlm3")
  .addEdge("callLlm1", "aggregator")
  .addEdge("callLlm2", "aggregator")
  .addEdge("callLlm3", "aggregator")
  .addEdge("aggregator", "__end__")
  .compile();

const result = await parallelWorkflow.invoke({ topic: "cats" });
console.log(result.combinedOutput);
```

```typescript
import { task, entrypoint } from "@langchain/langgraph";

const callLlm1 = task("generateJoke", async (topic: string) => {
  const msg = await llm.invoke(`Write a joke about ${topic}`);
  return msg.content;
});

const callLlm2 = task("generateStory", async (topic: string) => {
  const msg = await llm.invoke(`Write a story about ${topic}`);
  return msg.content;
});

const callLlm3 = task("generatePoem", async (topic: string) => {
  const msg = await llm.invoke(`Write a poem about ${topic}`);
  return msg.content;
});

const aggregator = task(
  "aggregator",
  async (params: {
    topic: string;
    joke: string;
    story: string;
    poem: string;
  }) => {
    const { topic, joke, story, poem } = params;
    return (
      `Here's a story, joke, and poem about ${topic}!\n\n` +
      `STORY:\n${story}\n\n` +
      `JOKE:\n${joke}\n\n` +
      `POEM:\n${poem}`
    );
  },
);

const workflow = entrypoint("parallelWorkflow", async (topic: string) => {
  const [joke, story, poem] = await Promise.all([
    callLlm1(topic),
    callLlm2(topic),
    callLlm3(topic),
  ]);

  return aggregator({ topic, joke, story, poem });
});

const stream = await workflow.stream("cats", {
  streamMode: "updates",
});

for await (const step of stream) {
  console.log(step);
}
```

---

### Define Guest-to-Host Message Schema (JavaScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/frontend/graph-execution

Defines the structure for messages sent from the guest (e.g., an iframe) back to the host environment in a LangGraph visualization. This schema includes types for ready status, resize events, errors, run status, trace URLs, and thread clearing.

```javascript
var ReadyMessageSchema = z.object({
  type: z.literal("READY"),
  framework: z.enum(["react", "vue", "angular", "svelte"]),
});
var ResizeMessageSchema = z.object({
  type: z.literal("RESIZE"),
  height: z.number(),
});
var ErrorMessageSchema = z.object({
  type: z.literal("ERROR"),
  message: z.string(),
  stack: z.string().optional(),
});
var RunStartedMessageSchema = z.object({
  type: z.literal("RUN_STARTED"),
  runId: z.string(),
});
var TraceUrlMessageSchema = z.object({
  type: z.literal("TRACE_URL"),
  url: z.string().url(),
  runId: z.string(),
});
var ThreadClearedMessageSchema = z.object({
  type: z.literal("THREAD_CLEARED"),
});
var GuestToHostMessageSchema = z.discriminatedUnion("type", [
  ReadyMessageSchema,
  ResizeMessageSchema,
  ErrorMessageSchema,
  RunStartedMessageSchema,
  TraceUrlMessageSchema,
  ThreadClearedMessageSchema,
]);
```

---

### Define Graph Nodes for Sequential Execution

Source: https://docs.langchain.com/oss/javascript/langgraph/use-graph-api

Defines individual nodes (functions) for a LangGraph that operate on the defined state. Each node takes the current state as input and returns updates to be applied.

```typescript
const step1: GraphNode<typeof State> = (state) => {
  return { value1: "a" };
};

const step2: GraphNode<typeof State> = (state) => {
  const currentValue1 = state.value1;
  return { value1: `${currentValue1} b` };
};

const step3: GraphNode<typeof State> = (state) => {
  return { value2: 10 };
};
```

---

### Retrieve subgraph state per-invocation in LangGraph.js

Source: https://docs.langchain.com/oss/javascript/langgraph/use-subgraphs

Demonstrates how to access the state of a subgraph for the current invocation only. This requires the subgraph to be statically discoverable and the parent graph to be compiled with a checkpointer.

```typescript
import {
  StateGraph,
  StateSchema,
  START,
  MemorySaver,
  interrupt,
  Command,
} from "@langchain/langgraph";
import * as z from "zod";

const State = new StateSchema({
  foo: z.string(),
});

// Subgraph
const subgraphBuilder = new StateGraph(State)
  .addNode("subgraphNode1", (state) => {
    const value = interrupt("Provide value:");
    return { foo: state.foo + value };
  })
  .addEdge(START, "subgraphNode1");

const subgraph = subgraphBuilder.compile(); // inherits parent checkpointer

// Parent graph
const builder = new StateGraph(State)
  .addNode("node1", subgraph)
  .addEdge(START, "node1");

const checkpointer = new MemorySaver();
const graph = builder.compile({ checkpointer });

const config = { configurable: { thread_id: "1" } };

await graph.invoke({ foo: "" }, config);

// View subgraph state for the current invocation
const subgraphState = (await graph.getState(config, { subgraphs: true }))
  .tasks[0].state;

// Resume the subgraph
await graph.invoke(new Command({ resume: "bar" }), config);
```

---

### Define tools for LLM interaction

Source: https://docs.langchain.com/oss/javascript/langgraph/workflows-agents

Demonstrates how to define reusable tools using the @langchain/core/tools library and Zod for schema validation. These tools are then bound to an LLM to enable function calling capabilities.

```typescript
import { tool } from "@langchain/core/tools";
import * as z from "zod";

const multiply = tool(
  ({ a, b }) => {
    return a * b;
  },
  {
    name: "multiply",
    description: "Multiply two numbers together",
    schema: z.object({
      a: z.number().describe("first number"),
      b: z.number().describe("second number"),
    }),
  },
);

const tools = [multiply];
const llmWithTools = llm.bindTools(tools);
```

---

### Define State and Nodes for Conditional Branching in LangGraph

Source: https://docs.langchain.com/oss/javascript/langgraph/use-graph-api

This snippet defines the state schema, including an aggregate array and a 'which' key for branching logic. It then defines nodes 'a', 'b', and 'c' with their respective state updates and side effects. Node 'a' sets the 'which' key to determine the next step.

```typescript
import {
  StateGraph,
  StateSchema,
  ReducedValue,
  GraphNode,
  ConditionalEdgeRouter,
  START,
  END,
} from "@langchain/langgraph";
import * as z from "zod";

const State = new StateSchema({
  aggregate: new ReducedValue(
    z.array(z.string()).default(() => []),
    { reducer: (x, y) => x.concat(y) },
  ),
  // Add a key to the state. We will set this key to determine
  // how we branch.
  which: z.string(), // [!code highlight]
});

const nodeA: GraphNode<typeof State> = (state) => {
  console.log(`Adding "A" to ${state.aggregate}`);
  return { aggregate: ["A"], which: "c" };
};

const nodeB: GraphNode<typeof State> = (state) => {
  console.log(`Adding "B" to ${state.aggregate}`);
  return { aggregate: ["B"] };
};

const nodeC: GraphNode<typeof State> = (state) => {
  console.log(`Adding "C" to ${state.aggregate}`);
  return { aggregate: ["C"] }; // [!code highlight]
};

const conditionalEdge: ConditionalEdgeRouter<typeof State, "b" | "c"> = (
  state,
) => {
  // Fill in arbitrary logic here that uses the state
  // to determine the next node
  return state.which as "b" | "c";
};

const graph = new StateGraph(State)
  .addNode("a", nodeA)
  .addNode("b", nodeB)
  .addNode("c", nodeC)
  .addEdge(START, "a")
  .addEdge("b", END)
  .addEdge("c", END)
  .addConditionalEdges("a", conditionalEdge)
  .compile();
```

---

### Define and Invoke Child Graph within Parent Graph (JavaScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/use-subgraphs

This snippet defines a child graph and then integrates it as a node within a parent graph. It shows how to prepare input for the child graph, invoke it, and transform its output back into the parent's state. The `addNode` method is used to define nodes, and `invoke` is used to execute the child graph.

```javascript
const childGraphInput = { myChildKey: state.myKey };
const childGraphOutput = await childGraph.invoke(childGraphInput);
return { myKey: childGraphOutput.myChildKey };
```

---

### Bubble Up Unexpected Errors

Source: https://docs.langchain.com/oss/javascript/langgraph/thinking-in-langgraph

Demonstrates the practice of allowing unexpected errors to propagate up the call stack for debugging purposes, rather than catching and suppressing them.

```typescript
import { Command, GraphNode } from "@langchain/langgraph";

const sendReply: GraphNode<typeof EmailAgentState> = async (state, config) => {
  try {
    await emailService.send(state.responseText);
  } catch (error) {
    throw error; // Surface unexpected errors
  }
};
```

---

### Environment and Theme Detection

Source: https://docs.langchain.com/oss/javascript/langgraph/frontend/graph-execution

Utility functions to determine if the code is running on a local host and to detect the current document theme (light or dark mode). These are useful for conditional rendering in the playground.

```javascript
function isLocalhost() {
  if (typeof window === "undefined") return false;
  const { hostname } = window.location;
  return (
    hostname === "localhost" || hostname === "127.0.0.1" || hostname === "[::]"
  );
}

function detectPageTheme() {
  if (typeof document === "undefined") return "light";
  const el = document.documentElement;
  if (el.classList.contains("dark")) return "dark";
  if (el.getAttribute("data-theme") === "dark") return "dark";
  if (el.style.colorScheme === "dark") return "dark";
  return "light";
}
```

---

### Define Host-to-Guest Message Schema (JavaScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/frontend/graph-execution

Defines the structure for messages sent from the host environment to the guest (e.g., an iframe) in a LangGraph visualization. This schema includes types for setting theme, pattern, resetting, updating code, changing view, setting language, and tracking events.

```javascript
var SetThemeMessageSchema = z.object({
  type: z.literal("SET_THEME"),
  theme: z.enum(["light", "dark"]),
});
var SetPatternMessageSchema = z.object({
  type: z.literal("SET_PATTERN"),
  slug: z.string(),
});
var ResetMessageSchema = z.object({
  type: z.literal("RESET"),
});
var SetViewMessageSchema = z.object({
  type: z.literal("SET_VIEW"),
  view: z.enum(["preview", "code"]),
});
var SetLanguageMessageSchema = z.object({
  type: z.literal("SET_LANGUAGE"),
  language: z.enum(["js", "python"]),
});
var CodeFileSchema = z.object({
  filename: z.string(),
  content: z.string(),
});
var UpdateCodeMessageSchema = z.object({
  type: z.literal("UPDATE_CODE"),
  files: z.array(CodeFileSchema).min(1),
  entryFile: z.string(),
});
var TrackEventMessageSchema = z.object({
  type: z.literal("TRACK_EVENT"),
  name: z.string(),
  properties: z
    .record(z.string(), z.union([z.string(), z.number(), z.boolean()]))
    .optional(),
});
var HostToGuestMessageSchema = z.discriminatedUnion("type", [
  SetThemeMessageSchema,
  SetPatternMessageSchema,
  ResetMessageSchema,
  UpdateCodeMessageSchema,
  SetViewMessageSchema,
  SetLanguageMessageSchema,
  TrackEventMessageSchema,
]);
```

---

### Implement Orchestrator-Worker Pattern

Source: https://docs.langchain.com/oss/javascript/langgraph/workflows-agents

Demonstrates the orchestrator-worker pattern where an orchestrator generates a plan (structured output) and workers execute subtasks in parallel. It uses Zod schemas to enforce structured output for the planning phase.

```typescript
import * as z from "zod";
import { task, entrypoint } from "@langchain/langgraph";

const sectionSchema = z.object({
  name: z.string().describe("Name for this section of the report."),
  description: z
    .string()
    .describe(
      "Brief overview of the main topics and concepts to be covered in this section.",
    ),
});

const sectionsSchema = z.object({
  sections: z.array(sectionSchema).describe("Sections of the report."),
});

const planner = llm.withStructuredOutput(sectionsSchema);

const orchestrator = task("orchestrator", async (topic: string) => {
  const reportSections = await planner.invoke([
    { role: "system", content: "Generate a plan for the report." },
    { role: "user", content: `Here is the report topic: ${topic}` },
  ]);
  return reportSections.sections;
});

const llmCall = task(
  "sectionWriter",
  async (section: z.infer<typeof sectionSchema>) => {
    const result = await llm.invoke([
      { role: "system", content: "Write a report section." },
      {
        role: "user",
        content: `Here is the section name: ${section.name} and description: ${section.description}`,
      },
    ]);
    return result.content;
  },
);

const workflow = entrypoint("orchestratorWorker", async (topic: string) => {
  const sections = await orchestrator(topic);
  const completedSections = await Promise.all(
    sections.map((section) => llmCall(section)),
  );
  return completedSections.join("\n\n---\n\n");
});
```

---

### Add a compiled subgraph as a node in LangGraph

Source: https://docs.langchain.com/oss/javascript/langgraph/use-subgraphs

Demonstrates how to define a subgraph using a StateSchema, compile it, and pass it directly into the addNode method of a parent StateGraph. This pattern allows the subgraph to automatically read and write to shared state channels.

```typescript
import { StateGraph, StateSchema, START } from "@langchain/langgraph";
import * as z from "zod";

const State = new StateSchema({
  foo: z.string(),
});

// Subgraph
const subgraphBuilder = new StateGraph(State)
  .addNode("subgraphNode1", (state) => {
    return { foo: "hi! " + state.foo };
  })
  .addEdge(START, "subgraphNode1");

const subgraph = subgraphBuilder.compile();

// Parent graph
const builder = new StateGraph(State)
  .addNode("node1", subgraph)
  .addEdge(START, "node1");

const graph = builder.compile();
```

---

### Define Document Grading Node with Zod Schema (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/agentic-rag

Defines a LangChain.js LangGraph node named 'gradeDocuments' that uses a ChatOpenAI model with Zod for structured output to determine document relevance. It takes a state containing messages, invokes a prompt with context and question, and returns a binary score ('yes' or 'no'). The output is then used to decide the next node in the graph.

```typescript
import * as z from "zod";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { GraphNode } from "@langchain/langgraph";
import { AIMessage } from "@langchain/core/messages";

const prompt = ChatPromptTemplate.fromTemplate(
  `You are a grader assessing relevance of retrieved docs to a user question.
  Here are the retrieved docs:
  \n ------- \n
  {context}
  \n ------- \n
  Here is the user question: {question}
  If the content of the docs are relevant to the users question, score them as relevant.
  Give a binary score 'yes' or 'no' score to indicate whether the docs are relevant to the question.
  Yes: The docs are relevant to the question.
  No: The docs are not relevant to the question.`,
);

const gradeDocumentsSchema = z.object({
  binaryScore: z.string().describe("Relevance score 'yes' or 'no'"),
});

const gradeDocuments: GraphNode<typeof State> = async (state) => {
  const model = new ChatOpenAI({
    model: "gpt-4.1",
    temperature: 0,
  }).withStructuredOutput(gradeDocumentsSchema);

  const score = await prompt.pipe(model).invoke({
    question: state.messages.at(0)?.content,
    context: state.messages.at(-1)?.content,
  });

  if (score.binaryScore === "yes") {
    return "generate";
  }
  return "rewrite";
};
```

---

### LangGraph Node with Custom Retry Policy (Max Attempts)

Source: https://docs.langchain.com/oss/javascript/langgraph/use-graph-api

Shows how to configure a custom retry policy for a LangGraph node, specifically setting the maximum number of attempts to 5. This is useful for operations that might temporarily fail, like API calls.

```typescript
const workflow = new StateGraph(State)
  .addNode("call_model", callModel, { retryPolicy: { maxAttempts: 5 } })
  .compile();
```

---

### Disable streaming for ChatOpenAI models

Source: https://docs.langchain.com/oss/javascript/langgraph/streaming

Demonstrates how to explicitly disable streaming for a ChatOpenAI model instance. This is useful when working with models like o1-preview that do not support streaming.

```typescript
import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({
  model: "o1-preview",
  // Set streaming: false to disable streaming for the chat model
  streaming: false,
});
```

---

### Implement Retry Policy for Transient Errors in LangGraph

Source: https://docs.langchain.com/oss/javascript/langgraph/thinking-in-langgraph

Configures a retry policy on a workflow node to automatically handle transient issues like network failures or rate limits. It specifies the maximum number of attempts and the initial interval between retries.

```typescript
import type { RetryPolicy } from "@langchain/langgraph";

workflow.addNode("searchDocumentation", searchDocumentation, {
  retryPolicy: { maxAttempts: 3, initialInterval: 1.0 },
});
```

---

### LangGraph StateSchema State and Update Types (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/graph-api

Shows how to extract the full state type (`State`) and the update type (`Update`) from a `StateSchema` instance. These extracted types are useful for custom type definitions and ensuring type safety.

```typescript
import { StateSchema } from "@langchain/langgraph";
import { z } from "zod";

// Assuming MessagesValue is defined elsewhere, e.g.:
// const MessagesValue = z.array(z.any()); // Replace z.any() with actual message types

const MyStateSchema = new StateSchema({
  messages: z.array(z.any()), // Placeholder for actual message type
  count: z.number().default(0),
});

// Extract the full state type
type MyState = typeof MyStateSchema.State;
// Expected type: { messages: any[], count: number }

// Extract the update type (partial, with reducer input types)
type MyUpdate = typeof MyStateSchema.Update;
// Expected type: { messages?: any[], count?: number }
```

---

### Define Graph State Schema with LangGraph StateSchema (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/graph-api

This snippet demonstrates how to define a graph's state schema using LangGraph's StateSchema class in TypeScript. It showcases various field types including MessagesValue, standard Zod schemas, ReducedValue for custom accumulation, and UntrackedValue for transient data. It also shows how to extract the state and update types and how to initialize a StateGraph with the defined schema.

```typescript
import {
  StateSchema,
  ReducedValue,
  MessagesValue,
  UntrackedValue
} from "@langchain/langgraph";
import { z } from "zod/v4";

const AgentState = new StateSchema({
  // Prebuilt messages value with built-in reducer
  messages: MessagesValue,

  // Simple fields use Zod schemas directly
  currentStep: z.string(),

  // Fields with defaults
  retryCount: z.number().default(0),

  // Custom reducer for accumulating values
  allSteps: new ReducedValue(
    z.array(z.string()).default(() => []),
    {
      inputSchema: z.string(),
      reducer: (current, newStep) => [...current, newStep],
    }
  ),

  // Transient state not saved to checkpoints
  tempCache: new UntrackedValue(z.record(z.string(), z.unknown())),
});

// Type extraction
type State = typeof AgentState.State;   // Full state type
type Update = typeof AgentState.Update; // Partial update type

// Use in graph
const graph = new StateGraph(AgentState)
  .addNode("myNode", ...) // Replace '...' with your node implementation
  .compile();
```

---

### Enable semantic search in LangGraph memory store

Source: https://docs.langchain.com/oss/javascript/langgraph/add-memory

Demonstrates how to configure an InMemoryStore with OpenAI embeddings to perform semantic similarity searches. This allows agents to retrieve relevant memories based on query content.

```typescript
import { OpenAIEmbeddings } from "@langchain/openai";
import { InMemoryStore } from "@langchain/langgraph";

// Create store with semantic search enabled
const embeddings = new OpenAIEmbeddings({ model: "text-embedding-3-small" });
const store = new InMemoryStore({
  index: {
    embeddings,
    dims: 1536,
  },
});

await store.put(["user_123", "memories"], "1", { text: "I love pizza" });
await store.put(["user_123", "memories"], "2", { text: "I am a plumber" });

const items = await store.search(["user_123", "memories"], {
  query: "I'm hungry",
  limit: 1,
});
```

---

### Fork LangGraph Execution from Checkpoint in TypeScript

Source: https://docs.langchain.com/oss/javascript/langgraph/use-time-travel

This snippet demonstrates how to fork a LangGraph execution from a past checkpoint with a modified state. It first retrieves the state history to locate a checkpoint. Then, it uses `updateState` on that checkpoint's configuration, providing new state values to create a branched execution path. Finally, it invokes the graph with the new fork configuration to continue execution from the branched point.

```typescript
// Assuming 'graph' and 'config' are defined from the replay example
// and 'states' and 'beforeJoke' are populated.

// Find checkpoint before writeJoke (assuming this is already done)
// const states = [];
// for await (const state of graph.getStateHistory(config)) {
//   states.push(state);
// }
// const beforeJoke = states.find((s) => s.next.includes("writeJoke"));

// Fork: update state to change the topic
const forkConfig = await graph.updateState(beforeJoke.config, {
  topic: "chickens",
});

// Resume from the fork — writeJoke re-executes with the new topic
const forkResult = await graph.invoke(null, forkConfig);
console.log(forkResult.joke); // A joke about chickens, not socks
```

---

### Access and Manage Store within Graph Nodes

Source: https://docs.langchain.com/oss/javascript/langgraph/add-memory

Shows how to access the store via the runtime object inside a node function to search for existing memories and store new information using namespaces.

```typescript
const callModel: GraphNode<typeof State> = async (state, runtime) => {
  const userId = runtime.context?.userId;
  const namespace = [userId, "memories"];

  const memories = await runtime.store?.search(namespace, {
    query: state.messages.at(-1)?.content,
    limit: 3,
  });

  await runtime.store?.put(namespace, uuidv4(), {
    data: "User prefers dark mode",
  });
};

await graph.invoke(
  { messages: [{ role: "user", content: "hi" }] },
  { configurable: { thread_id: "1" }, context: { userId: "1" } },
);
```

---

### Invoke LangGraph Workflow in TypeScript

Source: https://docs.langchain.com/oss/javascript/langgraph/use-graph-api

This snippet shows how to execute a compiled graph by providing an initial state object. The invoke method processes the input and returns the final state after all nodes have completed execution.

```typescript
const result = await graph.invoke({ value1: "c" });
console.log(result);
```

---

### Resume Workflow Execution After Errors in TypeScript

Source: https://docs.langchain.com/oss/javascript/langgraph/use-functional-api

Illustrates how to handle task failures and resume workflow execution using a `MemorySaver` checkpointer. The `getInfo` task is designed to fail on the first attempt and succeed on subsequent ones. When an error occurs, the workflow state is saved, allowing subsequent invocations to resume from the last successful checkpoint, avoiding re-computation of prior tasks like `slowTask`.

```typescript
import { entrypoint, task, MemorySaver } from "@langchain/langgraph";

let attempts = 0;

const getInfo = task("getInfo", async () => {
  attempts += 1;

  if (attempts < 2) {
    throw new Error("Failure");
  }
  return "OK";
});

const checkpointer = new MemorySaver();

const slowTask = task("slowTask", async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return "Ran slow task.";
});

const main = entrypoint(
  { checkpointer, name: "main" },
  async (inputs: Record<string, any>) => {
    const slowTaskResult = await slowTask();
    await getInfo();
    return slowTaskResult;
  },
);

const config = {
  configurable: {
    thread_id: "1",
  },
};

try {
  await main.invoke({ any_input: "foobar" }, config);
} catch (err) {
  // Handle the failure gracefully
}

await main.invoke(null, config);
```

---

### State Management for SDK and Language

Source: https://docs.langchain.com/oss/javascript/langgraph/frontend/graph-execution

React logic to manage SDK selection and language preferences using local caching. It determines the appropriate host based on environment settings and persists user choices.

```javascript
const [sdk, setSdkRaw] = useState(() => {
  const fromCache = sdkCache.get(sdkCacheKey);
  if (fromCache) return fromCache;
  const hosts = useLocalPreview ? SDK_LOCAL_HOSTS : SDK_PROD_HOSTS;
  // ... logic to determine best SDK
  return defaultSdk;
});

const setSdk = useCallback(
  (s) => {
    sdkCache.set(sdkCacheKey, s);
    setSdkRaw(s);
  },
  [sdkCacheKey],
);
```

---

### Stream custom data from arbitrary LLM clients

Source: https://docs.langchain.com/oss/javascript/langgraph/streaming

Demonstrates how to use the 'streamMode: "custom"' configuration to emit custom chunks from a node during graph execution. This allows developers to bypass standard LangChain chat model interfaces when using external streaming APIs.

```typescript
import { StateGraph, GraphNode, StateSchema } from "@langchain/langgraph";
import * as z from "zod";

const State = new StateSchema({ result: z.string() });

const callArbitraryModel: GraphNode<typeof State> = async (state, config) => {
  for await (const chunk of yourCustomStreamingClient(state.topic)) {
    config.writer({ custom_llm_chunk: chunk });
  }
  return { result: "completed" };
};

const graph = new StateGraph(State)
  .addNode("callArbitraryModel", callArbitraryModel)
  .compile();

for await (const chunk of await graph.stream(
  { topic: "cats" },
  { streamMode: "custom" },
)) {
  console.log(chunk);
}
```

---

### Forking Execution from a Specific Node in LangGraph JS

Source: https://docs.langchain.com/oss/javascript/langgraph/use-time-travel

Demonstrates how to use `updateState` to fork execution from a specific node in a LangGraph. This is useful for parallel branches, testing, or skipping nodes. It specifies the node from which the update should be considered as originating.

```typescript
const forkConfig = await graph.updateState(
  beforeJoke.config,
  { topic: "chickens" },
  { asNode: "generateTopic" },
);
```

---

### Build agent workflows with LangGraph

Source: https://docs.langchain.com/oss/javascript/langgraph/workflows-agents

Shows how to implement an agentic loop using LangGraph. The Graph API approach uses nodes and conditional edges to route between LLM calls and tool execution, while the Functional API provides a more imperative task-based structure.

```typescript
import { StateGraph, StateSchema, MessagesValue } from "@langchain/langgraph";
import { ToolNode } from "@langchain/langgraph/prebuilt";

const State = new StateSchema({ messages: MessagesValue });

const agentBuilder = new StateGraph(State)
  .addNode("llmCall", llmCall)
  .addNode("toolNode", new ToolNode(tools))
  .addEdge("__start__", "llmCall")
  .addConditionalEdges("llmCall", shouldContinue, ["toolNode", "__end__"])
  .addEdge("toolNode", "llmCall")
  .compile();
```

```typescript
import { task, entrypoint } from "@langchain/langgraph";

const callLlm = task("llmCall", async (messages) => {
  return llmWithTools.invoke(messages);
});

const agent = entrypoint("agent", async (messages) => {
  let llmResponse = await callLlm(messages);
  while (llmResponse.tool_calls?.length) {
    // Execute tools logic here
  }
  return llmResponse;
});
```

---

### Define an interruptible tool in TypeScript

Source: https://docs.langchain.com/oss/javascript/langgraph/interrupts

Demonstrates how to wrap a tool function with the 'interrupt' utility. This pauses execution and surfaces the tool call payload to the graph state for external approval.

```typescript
import { tool } from "@langchain/core/tools";
import { interrupt } from "@langchain/langgraph";
import * as z from "zod";

const sendEmailTool = tool(
  async ({ to, subject, body }) => {
    // Pause before sending; payload surfaces in result.__interrupt__
    const response = interrupt({
      action: "send_email",
      to,
      subject,
      body,
      message: "Approve sending this email?",
    });

    if (response?.action === "approve") {
      // Resume value can override inputs before executing
      const finalTo = response.to ?? to;
      const finalSubject = response.subject ?? subject;
      const finalBody = response.body ?? body;
      return `Email sent to ${finalTo} with subject '${finalSubject}'`;
    }
    return "Email cancelled by user";
  },
  {
    name: "send_email",
    description: "Send an email to a recipient",
    schema: z.object({
      to: z.string(),
      subject: z.string(),
      body: z.string(),
    }),
  },
);
```

---

### Email Agent Node Logic

Source: https://docs.langchain.com/oss/javascript/langgraph/thinking-in-langgraph

Implements the core logic for drafting email responses, routing based on urgency, and handling human-in-the-loop reviews using the interrupt function. These nodes utilize the Command object to update state and transition between graph stages.

```typescript
const draftResponse: GraphNode<typeof EmailAgentState> = async (state) => {
  const draftPrompt = `Draft a response to this customer email: ${state.emailContent}`;
  const response = await llm.invoke([new HumanMessage(draftPrompt)]);
  const needsReview = (classification.urgency === "high" || classification.intent === "complex");
  const nextNode = needsReview ? "humanReview" : "sendReply";

  return new Command({
    update: { responseText: response.content.toString() },
    goto: nextNode,
  });
};

const humanReview: GraphNode<typeof EmailAgentState> = async (state) => {
  const humanDecision = interrupt({ ... });
  if (humanDecision.approved) {
    return new Command({
      update: { responseText: humanDecision.editedResponse || state.responseText },
      goto: "sendReply",
    });
  } else {
    return new Command({ update: {}, goto: END });
  }
};
```

---

### LangGraph ConditionalEdgeRouter for Routing (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/graph-api

Illustrates how to use `ConditionalEdgeRouter` for routing functions in conditional edges without state updates. The router determines the next node(s) or signals the end of the graph.

```typescript
import { ConditionalEdgeRouter, END, StateSchema } from "@langchain/langgraph";
import { z } from "zod";

const State = new StateSchema({
  shouldContinue: z.boolean(),
  step: z.string(),
});

// Router returns node name(s) or END
const router: ConditionalEdgeRouter<typeof State, "process" | "summarize"> = (
  state,
) => {
  if (!state.shouldContinue) {
    return END;
  }
  return state.step === "initial" ? "process" : "summarize";
};

// Example of how it might be used in a graph (graph object assumed to be defined elsewhere)
// graph.addConditionalEdges("check", router);
```

---

### Adding Nodes with Default Naming in LangGraph

Source: https://docs.langchain.com/oss/javascript/langgraph/graph-api

Explains how to add a node to a LangGraph without explicitly providing a name. In such cases, the node will be assigned a default name equivalent to its function name.

```typescript
import { StateGraph, StateSchema, GraphNode } from "@langchain/langgraph";
import * as z from "zod";

const State = new StateSchema({
  input: z.string(),
  results: z.string(),
});

const myNode: GraphNode<typeof State> = (state, config) => {
  console.log("In node: ", config?.configurable?.user_id);
  return { results: `Hello, ${state.input}!` };
};

const builder = new StateGraph(State).addNode(myNode); // Node will be named "myNode"
// Edges can then reference this node by its default name: "myNode"
```

---

### Render Main Application Container

Source: https://docs.langchain.com/oss/javascript/langgraph/frontend/graph-execution

This JSX code renders the main container for the application, applying theme and custom class names. It includes a nested structure for toolbars and tabs, conditionally rendering the code tab.

```jsx
return <div data-lc-pe className={`${effectiveTheme === "dark" ? "dark" : ""} ${className ?? ""}`}>
      <div className="rounded-2xl border lc-border overflow-hidden lc-bg-surface">
        {}
        {showCodeTab && <div className="lc-toolbar flex items-stretch justify-between px-3 py-2 border-b lc-border lc-bg-wash">
            <div className="inline-flex items-stretch gap-0.5 rounded-lg border lc-border lc-bg-surface" style={{
    padding: 3
  }}>
              <button type="button" aria-label="Preview" onClick={() => switchView("preview")} className={activeView === "preview" ? tabActiveClass : tabInactiveClass}>
                <span dangerouslySetInnerHTML={{ __html: VIEW_EYE_SVG }} />
                <span className="lc-tab-label">Preview</span>
              </button>
              <button type="button" aria-label="Code" onClick={() => switchView("code")} className={activeView === "code" ? tabActiveClass : tabInactiveClass}>

```

---

### Define and Compile LangGraph with Memory

Source: https://docs.langchain.com/oss/javascript/langgraph/add-memory

This snippet demonstrates defining a LangGraph state, adding nodes for conversation and summarization, setting entry points and conditional edges, and compiling the graph with a memory checkpointer. It includes logic for message management and error handling for model responses.

```typescript
const messages: Message[] = [
      new HumanMessage({ id: uuidv4(), content: summaryMessage }),
    ];

    const response = await model.invoke(allMessages);

    const deleteMessages = messages
      .slice(0, -2)
      .map((m) => new RemoveMessage({ id: m.id! }));

    if (typeof response.content !== "string") {
      throw new Error("Expected a string response from the model");
    }

    return { summary: response.content, messages: deleteMessages };
  };

  const workflow = new StateGraph(GraphState)
    .addNode("conversation", callModel)
    .addNode("summarize_conversation", summarizeConversation)
    .addEdge(START, "conversation")
    .addConditionalEdges(
      "conversation",
      shouldContinue,
    )
    .addEdge("summarize_conversation", END);

  const app = workflow.compile({ checkpointer: memory });
```

---

### Parallel Task Execution in LangGraph

Source: https://docs.langchain.com/oss/javascript/langgraph/use-functional-api

Demonstrates executing multiple tasks concurrently using `Promise.all` and the `@task` decorator for improved performance, especially in I/O-bound operations. This pattern is useful for parallel API calls or LLM completions.

```typescript
const addOne = task("addOne", async (number: number) => {
  return number + 1;
});

const graph = entrypoint(
  { checkpointer, name: "graph" },
  async (numbers: number[]) => {
    return await Promise.all(numbers.map(addOne));
  },
);
```

```typescript
import { v4 as uuidv4 } from "uuid";
import { ChatOpenAI } from "@langchain/openai";
import { entrypoint, task, MemorySaver } from "@langchain/langgraph";

// Initialize the LLM model
const model = new ChatOpenAI({ model: "gpt-3.5-turbo" });

// Task that generates a paragraph about a given topic
const generateParagraph = task("generateParagraph", async (topic: string) => {
  const response = await model.invoke([
    {
      role: "system",
      content:
        "You are a helpful assistant that writes educational paragraphs.",
    },
    { role: "user", content: `Write a paragraph about ${topic}.` },
  ]);
  return response.content as string;
});

// Create a checkpointer for persistence
const checkpointer = new MemorySaver();

const workflow = entrypoint(
  { checkpointer, name: "workflow" },
  async (topics: string[]) => {
    // Generates multiple paragraphs in parallel and combines them
    const paragraphs = await Promise.all(topics.map(generateParagraph));
    return paragraphs.join("\n\n");
  },
);

// Run the workflow
const config = { configurable: { thread_id: uuidv4() } };
const result = await workflow.invoke(
  ["quantum computing", "climate change", "history of aviation"],
  config,
);
console.log(result);
```

---

### Construct and Stream Parent Graph with Child Subgraph (JavaScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/use-subgraphs

This code constructs a parent graph that includes a child graph as a node. It defines the graph structure using `addNode` and `addEdge`, compiles the graph, and then streams its execution. The `stream` method with `subgraphs: true` allows for the execution and observation of state changes within both the parent and child graphs.

```javascript
const parentGraph = parent.compile();

for await (const chunk of await parentGraph.stream(
  { myKey: "Bob" },
  { subgraphs: true },
)) {
  console.log(chunk);
}
```

---

### Implement long-term memory with semantic search in a graph

Source: https://docs.langchain.com/oss/javascript/langgraph/add-memory

Shows how to integrate semantic search within a LangGraph node to retrieve user memories dynamically. The retrieved context is injected into the LLM system prompt to provide personalized responses.

```typescript
import { OpenAIEmbeddings, ChatOpenAI } from "@langchain/openai";
import {
  StateGraph,
  StateSchema,
  MessagesValue,
  GraphNode,
  START,
  InMemoryStore,
} from "@langchain/langgraph";

const State = new StateSchema({
  messages: MessagesValue,
});

const model = new ChatOpenAI({ model: "gpt-4.1-mini" });

// Create store with semantic search enabled
const embeddings = new OpenAIEmbeddings({ model: "text-embedding-3-small" });
const store = new InMemoryStore({
  index: {
    embeddings,
    dims: 1536,
  },
});

await store.put(["user_123", "memories"], "1", { text: "I love pizza" });
await store.put(["user_123", "memories"], "2", { text: "I am a plumber" });

const chat: GraphNode<typeof State> = async (state, runtime) => {
  // Search based on user's last message
  const items = await runtime.store.search(["user_123", "memories"], {
    query: state.messages.at(-1)?.content,
    limit: 2,
  });
  const memories = items.map((item) => item.value.text).join("\n");
  const memoriesText = memories ? `## Memories of user\n${memories}` : "";

  const response = await model.invoke([
    {
      role: "system",
      content: `You are a helpful assistant.\n${memoriesText}`,
    },
    ...state.messages,
  ]);

  return { messages: [response] };
};

const builder = new StateGraph(State)
  .addNode("chat", chat)
  .addEdge(START, "chat");
const graph = builder.compile({ store });

for await (const [message, metadata] of await graph.stream(
  { messages: [{ role: "user", content: "I'm hungry" }] },
  { streamMode: "messages" },
)) {
  if (message.content) {
    console.log(message.content);
  }
}
```

---

### Consume Tool Events Server-Side with LangGraph (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/streaming

This snippet demonstrates how to capture and process tool-related events during a LangGraph stream. It requires the `streamMode` option to be set to include 'tools'. The code iterates through the stream, checks if the mode is 'tools', and then uses a switch statement to handle specific tool events such as 'on_tool_start', 'on_tool_event', 'on_tool_end', and 'on_tool_error', logging relevant information for each.

```typescript
for await (const [mode, chunk] of await graph.stream(
  { messages: [{ role: "user", content: "Find flights to Tokyo" }] },
  { streamMode: ["updates", "tools"] },
)) {
  if (mode === "tools") {
    switch (chunk.event) {
      case "on_tool_start":
        console.log(`Tool started: ${chunk.name}`, chunk.input);
        break;
      case "on_tool_event":
        console.log(`Tool progress: ${chunk.name}`, chunk.data);
        break;
      case "on_tool_end":
        console.log(`Tool finished: ${chunk.name}`, chunk.output);
        break;
      case "on_tool_error":
        console.error(`Tool failed: ${chunk.name}`, chunk.error);
        break;
    }
  }
}
```

---

### Define LangGraph with Send API for Map-Reduce in TypeScript

Source: https://docs.langchain.com/oss/javascript/langgraph/use-graph-api

This snippet defines a LangGraph state schema and nodes to implement a map-reduce pattern using the Send API. It sets up a graph to generate topics, then jokes for each topic in parallel, and finally selects the best joke. Dependencies include '@langchain/langgraph' and 'zod'.

```typescript
import {
  StateGraph,
  StateSchema,
  ReducedValue,
  GraphNode,
  START,
  END,
  Send,
} from "@langchain/langgraph";
import * as z from "zod";

const OverallState = new StateSchema({
  topic: z.string(),
  subjects: z.array(z.string()),
  jokes: new ReducedValue(
    z.array(z.string()).default(() => []),
    { reducer: (x, y) => x.concat(y) },
  ),
  bestSelectedJoke: z.string(),
});

const generateTopics: GraphNode<typeof OverallState> = (state) => {
  return { subjects: ["lions", "elephants", "penguins"] };
};

const generateJoke: GraphNode<typeof OverallState> = (state) => {
  const jokeMap: Record<string, string> = {
    lions: "Why don't lions like fast food? Because they can't catch it!",
    elephants:
      "Why don't elephants use computers? They're afraid of the mouse!",
    penguins:
      "Why don't penguins like talking to strangers at parties? Because they find it hard to break the ice.",
  };
  return { jokes: [jokeMap[state.subject]] };
};

const continueToJokes: ConditionalEdgeRouter<
  typeof OverallState,
  "generateJoke"
> = (state) => {
  return state.subjects.map((subject) => new Send("generateJoke", { subject }));
};

const bestJoke: GraphNode<typeof OverallState> = (state) => {
  return { bestSelectedJoke: "penguins" };
};

const graph = new StateGraph(OverallState)
  .addNode("generateTopics", generateTopics)
  .addNode("generateJoke", generateJoke)
  .addNode("bestJoke", bestJoke)
  .addEdge(START, "generateTopics")
  .addConditionalEdges("generateTopics", continueToJokes)
  .addEdge("generateJoke", "bestJoke")
  .addEdge("bestJoke", END)
  .compile();
```

---

### Custom Reducer for State Updates in LangGraph

Source: https://docs.langchain.com/oss/javascript/langgraph/graph-api

Illustrates using `ReducedValue` to define custom reducer functions for specific state keys, enabling complex state manipulations like array concatenation. This allows for more controlled state evolution.

```typescript
import { StateSchema, ReducedValue } from "@langchain/langgraph";
import { z } from "zod/v4";

const State = new StateSchema({
  foo: z.number(),
  bar: new ReducedValue(
    z.array(z.string()).default(() => []),
    { reducer: (x, y) => x.concat(y) },
  ),
});
```

---

### LLM with Structured Output using Zod

Source: https://docs.langchain.com/oss/javascript/langgraph/workflows-agents

Augments a language model to produce structured output validated by a Zod schema. This allows for predictable data formats from LLM responses, useful for tool usage and data processing.

```typescript
import * as z from "zod";
import { tool } from "langchain";

// Schema for structured output
const SearchQuery = z.object({
  search_query: z.string().describe("Query that is optimized web search."),
  justification: z
    .string()
    .describe("Why this query is relevant to the user's request."),
});

// Augment the LLM with schema for structured output
const structuredLlm = llm.withStructuredOutput(SearchQuery);

// Invoke the augmented LLM
const output = await structuredLlm.invoke(
  "How does Calcium CT score relate to high cholesterol?",
);
```

---

### Compose Tasks into an Entrypoint Graph (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/use-functional-api

Composes the previously defined tasks (`step1`, `humanFeedback`, `step3`) into a single entrypoint graph using LangGraph's `entrypoint` function. A `MemorySaver` is used for check-pointing.

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
  },
);
```

---

### Handling Side Effects Correctly in LangGraph JavaScript

Source: https://docs.langchain.com/oss/javascript/langgraph/functional-api

Demonstrates the incorrect and correct ways to handle side effects in LangGraph JavaScript workflows. The incorrect approach executes side effects directly, leading to re-execution on resumption. The correct approach encapsulates side effects within tasks, ensuring they are executed only once per intended operation.

```typescript
import { entrypoint, interrupt } from "@langchain/langgraph";
import fs from "fs";

const myWorkflow = entrypoint(
  { checkpointer, name: "workflow" },
  async (inputs: Record<string, any>) => {
    // This code will be executed a second time when resuming the workflow.
    // Which is likely not what you want.
    fs.writeFileSync("output.txt", "Side effect executed");
    const value = interrupt("question");
    return value;
  },
);
```

```typescript
import { entrypoint, task, interrupt } from "@langchain/langgraph";
import * as fs from "fs";

const writeToFile = task("writeToFile", async () => {
  fs.writeFileSync("output.txt", "Side effect executed");
});

const myWorkflow = entrypoint(
  { checkpointer, name: "workflow" },
  async (inputs: Record<string, any>) => {
    // The side effect is now encapsulated in a task.
    await writeToFile();
    const value = interrupt("question");
    return value;
  },
);
```

---

### Theme Detection and CSS Injection

Source: https://docs.langchain.com/oss/javascript/langgraph/frontend/graph-execution

Effect hooks that monitor the document for theme changes and dynamically inject the required CSS into the document head to ensure consistent styling.

```javascript
useEffect(() => {
  if (document.getElementById("lc-pe-css")) return;
  const style = document.createElement("style");
  style.id = "lc-pe-css";
  style.textContent = EMBED_CSS;
  document.head.appendChild(style);
}, []);
```

---

### Configure Data Anonymization for LangGraph Traces

Source: https://docs.langchain.com/oss/javascript/langgraph/observability

This snippet demonstrates how to create a regex-based anonymizer using the LangSmith client and apply it to a LangGraph tracer. It ensures that sensitive patterns, such as SSNs, are redacted before data is sent to LangSmith.

```typescript
import { StateGraph } from "@langchain/langgraph";
import { LangChainTracer } from "@langchain/core/tracers/tracer_langchain";
import { StateAnnotation } from "./state.js";
import { createAnonymizer } from "langsmith/anonymizer";
import { Client } from "langsmith";

const anonymizer = createAnonymizer([
  // Matches SSNs
  { pattern: /\b\d{3}-?\d{2}-?\d{4}\b/, replace: "<ssn>" },
]);

const langsmithClient = new Client({ anonymizer });
const tracer = new LangChainTracer({
  client: langsmithClient,
});

export const graph = new StateGraph(StateAnnotation)
  .compile()
  .withConfig({ callbacks: [tracer] });
```

---

### Stream Graph Execution with Initial Input (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/use-functional-api

Initiates the streaming execution of the defined graph with an initial input query 'foo'. This will run until the `humanFeedback` task is encountered, pausing execution.

```typescript
const config = { configurable: { thread_id: "1" } };

for await (const event of await graph.stream("foo", config)) {
  console.log(event);
  console.log("\n");
}
```

---

### Configure Subgraph-Specific Checkpointing

Source: https://docs.langchain.com/oss/javascript/langgraph/add-memory

This snippet demonstrates how to configure checkpointing behavior specifically for a subgraph. By setting `checkpointer: true` when compiling the subgraph, you can enable or disable its independent checkpointing, overriding the parent graph's configuration if needed.

```typescript
const subgraphBuilder = new StateGraph(...);
const subgraph = subgraphBuilder.compile({ checkpointer: true });  // [!code highlight]
```

---

### Define a Node to Update Graph State (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/use-graph-api

This TypeScript code defines a graph node that reads the current state, creates a new AIMessage, and returns updates for the 'messages' and 'extraField' keys in the state. It demonstrates how nodes interact with and modify the graph's state.

```typescript
import { AIMessage } from "@langchain/core/messages";
import { GraphNode } from "@langchain/langgraph";

const node: GraphNode<typeof State> = (state) => {
  const messages = state.messages;
  const newMessage = new AIMessage("Hello!");
  return { messages: [newMessage], extraField: 10 };
};
```

---

### LangGraph Node with Custom Retry Policy (Specific Errors)

Source: https://docs.langchain.com/oss/javascript/langgraph/use-graph-api

Demonstrates configuring a LangGraph node's retry policy to retry only on specific errors, such as 'SQLITE_BUSY' errors from a SQLite database. The `retryOn` function allows for granular control over which exceptions trigger a retry.

```typescript
import Database from "better-sqlite3";
import {
  StateGraph,
  StateSchema,
  MessagesValue,
  GraphNode,
  START,
  END,
} from "@langchain/langgraph";
import { AIMessage } from "@langchain/core/messages";

const State = new StateSchema({
  messages: MessagesValue,
});

// Create an in-memory database
const db: typeof Database.prototype = new Database(":memory:");

const queryDatabase: GraphNode<typeof State> = async (state) => {
  const queryResult: string = JSON.stringify(
    db.prepare("SELECT * FROM Artist LIMIT 10;").all(),
  );

  return { messages: [new AIMessage({ content: "queryResult" })] };
};

const workflow = new StateGraph(State)
  .addNode("query_database", queryDatabase, {
    retryPolicy: {
      retryOn: (e: any): boolean => {
        if (e instanceof Database.SqliteError) {
          // Retry on "SQLITE_BUSY" error
          return e.code === "SQLITE_BUSY";
        }
        return false; // Don't retry on other errors
      },
    },
  })
  .compile();
```

---

### Define Tab Styling Classes

Source: https://docs.langchain.com/oss/javascript/langgraph/frontend/graph-execution

These constants define CSS class names for different tab states (base, active, inactive, trace, trace loading) used in the UI. They include styling for borders, backgrounds, fonts, and transitions.

```javascript
const tabBase =
  "lc-tab inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border-none font-medium cursor-pointer transition-all duration-150";
const tabActiveClass = `${tabBase} lc-tab-active shadow-sm`;
const tabInactiveClass = `${tabBase} lc-tab-inactive`;
const tabTraceActiveClass = `${tabBase} lc-tab-trace`;
const tabTraceLoadingClass = `${tabBase} lc-tab-trace-loading`;
```

---

### Pass Simple, Serializable Values to `interrupt` (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/interrupts

Demonstrates passing simple, JSON-serializable types like strings, numbers, and booleans to the `interrupt` function. This is the recommended approach for ensuring values can be serialized across different checkpointers.

```typescript
const nodeA: GraphNode<typeof State> = async (state) => {
  // ✅ Good: passing simple types that are serializable
  const name = interrupt("What's your name?");
  const count = interrupt(42);
  const approved = interrupt(true);

  return { name, count, approved };
};
```

```typescript
const nodeA: GraphNode<typeof State> = async (state) => {
  // ✅ Good: passing objects with simple values
  const response = interrupt({
    question: "Enter user details",
    fields: ["name", "email", "age"],
    currentValues: state.user || {},
  });

  return { user: response };
};
```

---

### Implement Workflow Routing with LangGraph

Source: https://docs.langchain.com/oss/javascript/langgraph/workflows-agents

Demonstrates routing logic using both the Graph API and Functional API. It utilizes Zod schemas to define routing decisions and conditional edges to direct the workflow execution flow.

```typescript
import {
  StateGraph,
  StateSchema,
  GraphNode,
  ConditionalEdgeRouter,
} from "@langchain/langgraph";
import * as z from "zod";

const routeSchema = z.object({
  step: z
    .enum(["poem", "story", "joke"])
    .describe("The next step in the routing process"),
});

const router = llm.withStructuredOutput(routeSchema);

const State = new StateSchema({
  input: z.string(),
  decision: z.string(),
  output: z.string(),
});

const llmCall1: GraphNode<typeof State> = async (state) => {
  const result = await llm.invoke([
    { role: "system", content: "You are an expert storyteller." },
    { role: "user", content: state.input },
  ]);
  return { output: result.content };
};

const llmCall2: GraphNode<typeof State> = async (state) => {
  const result = await llm.invoke([
    { role: "system", content: "You are an expert comedian." },
    { role: "user", content: state.input },
  ]);
  return { output: result.content };
};

const llmCall3: GraphNode<typeof State> = async (state) => {
  const result = await llm.invoke([
    { role: "system", content: "You are an expert poet." },
    { role: "user", content: state.input },
  ]);
  return { output: result.content };
};

const llmCallRouter: GraphNode<typeof State> = async (state) => {
  const decision = await router.invoke([
    {
      role: "system",
      content:
        "Route the input to story, joke, or poem based on the user's request.",
    },
    { role: "user", content: state.input },
  ]);
  return { decision: decision.step };
};

const routeDecision: ConditionalEdgeRouter<
  typeof State,
  "llmCall1" | "llmCall2" | "llmCall3"
> = (state) => {
  if (state.decision === "story") return "llmCall1";
  else if (state.decision === "joke") return "llmCall2";
  else return "llmCall3";
};

const routerWorkflow = new StateGraph(State)
  .addNode("llmCall1", llmCall1)
  .addNode("llmCall2", llmCall2)
  .addNode("llmCall3", llmCall3)
  .addNode("llmCallRouter", llmCallRouter)
  .addEdge("__start__", "llmCallRouter")
  .addConditionalEdges("llmCallRouter", routeDecision, [
    "llmCall1",
    "llmCall2",
    "llmCall3",
  ])
  .addEdge("llmCall1", "__end__")
  .addEdge("llmCall2", "__end__")
  .addEdge("llmCall3", "__end__")
  .compile();
```

```typescript
import * as z from "zod";
import { task, entrypoint } from "@langchain/langgraph";

const routeSchema = z.object({
  step: z
    .enum(["poem", "story", "joke"])
    .describe("The next step in the routing process"),
});

const router = llm.withStructuredOutput(routeSchema);

const llmCall1 = task("generateStory", async (input: string) => {
  const result = await llm.invoke([
    { role: "system", content: "You are an expert storyteller." },
    { role: "user", content: input },
  ]);
  return result.content;
});

const llmCall2 = task("generateJoke", async (input: string) => {
  const result = await llm.invoke([
    { role: "system", content: "You are an expert comedian." },
    { role: "user", content: input },
  ]);
  return result.content;
});

const llmCall3 = task("generatePoem", async (input: string) => {
  const result = await llm.invoke([
    { role: "system", content: "You are an expert poet." },
    { role: "user", content: input },
  ]);
  return result.content;
});
```

---

### Configure Stateless Subgraphs in TypeScript

Source: https://docs.langchain.com/oss/javascript/langgraph/use-subgraphs

Compiles a subgraph without a checkpointer to run it as a stateless function. Note that this disables durable execution, meaning the subgraph cannot recover from crashes.

```typescript
const subgraphBuilder = new StateGraph(...);
const subgraph = subgraphBuilder.compile({ checkpointer: false });
```

---

### Configure thread_id for LangGraph execution

Source: https://docs.langchain.com/oss/javascript/langgraph/persistence

To enable persistence in LangGraph, you must provide a thread_id within the configurable object during graph invocation. This identifier acts as the primary key for storing and retrieving the graph's state history.

```typescript
{
  configurable: {
    thread_id: "1";
  }
}
```

---

### LangGraph Node with Default Retry Policy

Source: https://docs.langchain.com/oss/javascript/langgraph/use-graph-api

Illustrates how to add a node to a LangGraph StateGraph and configure a default retry policy for it. The `retryPolicy` parameter is passed to the `addNode` method with an empty object, utilizing the default retry behavior.

```typescript
import { RetryPolicy } from "@langchain/langgraph";

const graph = new StateGraph(State)
  .addNode("nodeName", nodeFunction, { retryPolicy: {} })
  .compile();
```

---

### Impose a recursion limit on LangGraph execution

Source: https://docs.langchain.com/oss/javascript/langgraph/use-graph-api

Demonstrates how to set a recursion limit on a graph invocation to prevent infinite loops. It catches the GraphRecursionError when the limit is exceeded.

```typescript
import { GraphRecursionError } from "@langchain/langgraph";

try {
  await graph.invoke({ aggregate: [] }, { recursionLimit: 4 });
} catch (error) {
  if (error instanceof GraphRecursionError) {
    console.log("Recursion Error");
  }
}
```

---

### Resume multiple parallel interrupts in LangGraph TypeScript

Source: https://docs.langchain.com/oss/javascript/langgraph/interrupts

This snippet shows how to define a StateGraph with parallel nodes that trigger interrupts, and how to use a Command object to resume multiple pending interrupts simultaneously by mapping their IDs to specific values.

```typescript
import {
  Annotation,
  Command,
  END,
  INTERRUPT,
  MemorySaver,
  START,
  StateGraph,
  interrupt,
  isInterrupted,
} from "@langchain/langgraph";

const State = Annotation.Root({
  vals: Annotation<string[]>({
    reducer: (left, right) =>
      left.concat(Array.isArray(right) ? right : [right]),
    default: () => [],
  }),
});

function nodeA(_state: typeof State.State) {
  const answer = interrupt("question_a") as string;
  return { vals: [`a:${answer}`] };
}

function nodeB(_state: typeof State.State) {
  const answer = interrupt("question_b") as string;
  return { vals: [`b:${answer}`] };
}

const graph = new StateGraph(State)
  .addNode("a", nodeA)
  .addNode("b", nodeB)
  .addEdge(START, "a")
  .addEdge(START, "b")
  .addEdge("a", END)
  .addEdge("b", END)
  .compile({ checkpointer: new MemorySaver() });

const config = { configurable: { thread_id: "1" } };

async function main() {
  const interruptedResult = await graph.invoke({ vals: [] }, config);

  const resumeMap: Record<string, string> = {};
  if (isInterrupted(interruptedResult)) {
    for (const i of interruptedResult[INTERRUPT]) {
      if (i.id != null) {
        resumeMap[i.id] = `answer for ${i.value}`;
      }
    }
  }
  const result = await graph.invoke(new Command({ resume: resumeMap }), config);

  console.log("Final state:", result);
}

main().catch(console.error);
```

---

### Stream LLM tokens using messages mode in LangGraph

Source: https://docs.langchain.com/oss/javascript/langgraph/streaming

Demonstrates how to configure a LangGraph state graph to stream LLM responses token-by-token using the 'messages' stream mode. The output is returned as a tuple containing the message chunk and associated metadata.

```typescript
import { ChatOpenAI } from "@langchain/openai";
import {
  StateGraph,
  StateSchema,
  GraphNode,
  START,
} from "@langchain/langgraph";
import * as z from "zod";

const MyState = new StateSchema({
  topic: z.string(),
  joke: z.string().default(""),
});

const model = new ChatOpenAI({ model: "gpt-4.1-mini" });

const callModel: GraphNode<typeof MyState> = async (state) => {
  const modelResponse = await model.invoke([
    { role: "user", content: `Generate a joke about ${state.topic}` },
  ]);
  return { joke: modelResponse.content };
};

const graph = new StateGraph(MyState)
  .addNode("callModel", callModel)
  .addEdge(START, "callModel")
  .compile();

for await (const [messageChunk, metadata] of await graph.stream(
  { topic: "ice cream" },
  { streamMode: "messages" },
)) {
  if (messageChunk.content) {
    console.log(messageChunk.content + "|");
  }
}
```

---

### Add Node with Custom Name in LangGraph

Source: https://docs.langchain.com/oss/javascript/langgraph/use-graph-api

Demonstrates how to assign a custom name to a node when adding it to a LangGraph. This allows for more descriptive node identification within the graph structure.

```typescript
const graph = new StateGraph(State).addNode("myNode", step1).compile();
```

---

### Define Email Agent State Schema

Source: https://docs.langchain.com/oss/javascript/langgraph/thinking-in-langgraph

Defines the structure of the agent's shared memory using Zod schemas. This implementation ensures type safety for raw email data, classification results, and API responses while maintaining a clean separation between data and prompt formatting.

```typescript
import { StateSchema } from "@langchain/langgraph";
import * as z from "zod";

// Define the structure for email classification
const EmailClassificationSchema = z.object({
  intent: z.enum(["question", "bug", "billing", "feature", "complex"]),
  urgency: z.enum(["low", "medium", "high", "critical"]),
  topic: z.string(),
  summary: z.string(),
});

const EmailAgentState = new StateSchema({
  // Raw email data
  emailContent: z.string(),
  senderEmail: z.string(),
  emailId: z.string(),

  // Classification result
  classification: EmailClassificationSchema.optional(),

  // Raw search/API results
  searchResults: z.array(z.string()).optional(), // List of raw document chunks
  customerHistory: z.record(z.string(), z.any()).optional(), // Raw customer data from CRM

  // Generated content
  responseText: z.string().optional(),
});

type EmailClassificationType = z.infer<typeof EmailClassificationSchema>;
```

---

### Access Recursion Step Counter in LangGraph Node

Source: https://docs.langchain.com/oss/javascript/langgraph/graph-api

Shows how to access the current execution step count within a LangGraph node using `config.metadata.langgraph_step`. This allows for proactive logic to handle recursion before the limit is reached.

```typescript
import { RunnableConfig } from "@langchain/core/runnables";
import { StateGraph } from "@langchain/langgraph";

const myNode: GraphNode<typeof State> = async (state, config) => {
  const currentStep = config.metadata?.langgraph_step;
  console.log(`Currently on step: ${currentStep}`);
  return state;
};
```

---

### Implement Approval Node with Interrupt in TypeScript

Source: https://docs.langchain.com/oss/javascript/langgraph/interrupts

This snippet demonstrates how to create a node that pauses execution and waits for user approval using the `interrupt` function. It routes the graph flow to 'proceed' or 'cancel' based on the user's response.

```typescript
import { interrupt, Command } from "@langchain/langgraph";

const approvalNode: typeof State.Node = (state) => {
  // Pause execution; payload surfaces in result.__interrupt__
  const isApproved = interrupt({
    question: "Do you want to proceed?",
    details: state.actionDetails,
  });

  // Route based on the response
  if (isApproved) {
    return new Command({ goto: "proceed" }); // Runs after the resume payload is provided
  } else {
    return new Command({ goto: "cancel" });
  }
};
```

---

### Resuming an Interrupted Graph Execution in TypeScript

Source: https://docs.langchain.com/oss/javascript/langgraph/interrupts

Demonstrates how to resume a paused LangGraph execution. First, invoke the graph with initial data and a thread ID to trigger an interrupt. Then, inspect the interrupt payload. Finally, resume execution by invoking the graph again with a `Command` object containing the resume value.

```typescript
import { Command } from "@langchain/langgraph";

// Initial run - hits the interrupt and pauses
// thread_id is the durable pointer back to the saved checkpoint
const config = { configurable: { thread_id: "thread-1" } };
const result = await graph.invoke({ input: "data" }, config);

// Check what was interrupted
// __interrupt__ mirrors every payload you passed to interrupt()
console.log(result.__interrupt__);
// [{ value: 'Do you approve this action?', ... }]

// Resume with the human's response
// Command({ resume }) returns that value from interrupt() in the node
await graph.invoke(new Command({ resume: true }), config);
```

---

### Separating Interrupt and Side Effects into Different Nodes in TypeScript

Source: https://docs.langchain.com/oss/javascript/langgraph/interrupts

Illustrates separating the handling of an interrupt into one node (`approvalNode`) and the subsequent side effect (sending a notification) into another node (`notificationNode`). This promotes cleaner code and ensures side effects run only after the interrupt is handled.

```typescript
const approvalNode: GraphNode<typeof State> = async (state) => {
  // ✅ Good: only handling the interrupt in this node
  const approved = interrupt("Approve this change?");

  return { approved };
};

const notificationNode: GraphNode<typeof State> = async (state) => {
  // ✅ Good: side effect happens in a separate node
  // This runs after approval, so it only executes once
  if (state.approved) {
    await sendNotification({
      userId: state.userId,
      status: "approved",
    });
  }

  return state;
};
```

---

### Manage Agent Language and Ready State

Source: https://docs.langchain.com/oss/javascript/langgraph/frontend/graph-execution

This useEffect hook updates the agent's language setting when the agentLang or ready state changes. It relies on a cached reference to the host object.

```javascript
useEffect(() => {
  if (!ready || !cachedRef.current) return;
  cachedRef.current.host.setLanguage(agentLang);
}, [agentLang, ready]);
```

---

### Maintain Consistent Interrupt Order in TypeScript

Source: https://docs.langchain.com/oss/javascript/langgraph/interrupts

Shows the correct approach for using multiple `interrupt` calls within a single node. It emphasizes that the order of these calls must remain consistent across all executions to ensure LangGraph can correctly match resume values with the corresponding interrupts.

```typescript
async function nodeA(state: State) {
  // ✅ Good: interrupt calls happen in the same order every time
  const name = interrupt("What's your name?");
  const age = interrupt("What's your age?");
  const city = interrupt("What's your city?");

  return {
    name,
    age,
    city,
  };
}
```

---

### Add Short-Term Memory with MemorySaver

Source: https://docs.langchain.com/oss/javascript/langgraph/add-memory

This snippet demonstrates how to add short-term memory to an agent's state using MemorySaver for multi-turn conversations. It initializes a StateGraph, compiles it with a MemorySaver checkpointer, and invokes it with initial messages and a thread ID.

```typescript
import { MemorySaver, StateGraph } from "@langchain/langgraph";

const checkpointer = new MemorySaver();

const builder = new StateGraph(...);
const graph = builder.compile({ checkpointer });

await graph.invoke(
  { messages: [{ role: "user", content: "hi! i am Bob" }] },
  { configurable: { thread_id: "1" } }
);
```

---

### Invoke a LangGraph and Log Results (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/use-graph-api

This TypeScript code invokes a compiled LangGraph with an initial state containing a HumanMessage and an extraField value. It then logs the complete result returned by the graph execution, showing the updated state.

```typescript
import { HumanMessage } from "@langchain/core/messages";

const result = await graph.invoke({
  messages: [new HumanMessage("Hi")],
  extraField: 0,
});
console.log(result);
```

---

### Define State Schema for LangGraph

Source: https://docs.langchain.com/oss/javascript/langgraph/use-graph-api

Defines the state schema for a LangGraph using Zod for validation. This schema specifies the types and structure of the data that the graph will manage.

```typescript
import { StateSchema, GraphNode } from "@langchain/langgraph";
import * as z from "zod";

const State = new StateSchema({
  value1: z.string(),
  value2: z.number(),
});
```

---

### Calling LangGraph Graphs from Functional API

Source: https://docs.langchain.com/oss/javascript/langgraph/use-functional-api

Illustrates how to integrate graphs built with the Graph API within workflows defined using the Functional API. This allows for modularity and reuse of graph components.

```typescript
import { entrypoint } from "@langchain/langgraph";
import { StateGraph } from "@langchain/langgraph";

const builder = new StateGraph(/* ... */);
// ...
const someGraph = builder.compile();

const someWorkflow = entrypoint(
  { name: "someWorkflow" },
  async (someInput: Record<string, any>) => {
    // Call a graph defined using the graph API
    const result1 = await someGraph.invoke(/* ... */);
    // Call another graph defined using the graph API
    const result2 = await anotherGraph.invoke(/* ... */);
    return {
      result1,
      result2,
    };
  },
);
```

```typescript
import { v4 as uuidv4 } from "uuid";
import {
  entrypoint,
  MemorySaver,
  StateGraph,
  StateSchema,
} from "@langchain/langgraph";
import * as z from "zod";

// Define the shared state type
const State = new StateSchema({
  foo: z.number(),
});

// Build the graph using the Graph API
const builder = new StateGraph(State)
  .addNode("double", (state) => {
    return { foo: state.foo * 2 };
  })
  .addEdge("__start__", "double");
const graph = builder.compile();

// Define the functional API workflow
const checkpointer = new MemorySaver();

const workflow = entrypoint(
  { checkpointer, name: "workflow" },
  async (x: number) => {
    const result = await graph.invoke({ foo: x });
    return { bar: result.foo };
  },
);

// Execute the workflow
const config = { configurable: { thread_id: uuidv4() } };
console.log(await workflow.invoke(5, config)); // Output: { bar: 10 }
```

---

### Using the END Node in LangGraph

Source: https://docs.langchain.com/oss/javascript/langgraph/graph-api

Illustrates how to use the special END node in LangGraph. This node signifies a terminal point in the graph, indicating that no further actions should be taken after reaching it.

```typescript
import { END, StateGraph } from "@langchain/langgraph";

// Assuming 'graph' is an instance of StateGraph
const graph = new StateGraph(/* State Schema */);

graph.addEdge("nodeA", END); // Defines an edge from nodeA to the END node
```

---

### Avoid Bare Try/Catch with Interrupt in TypeScript

Source: https://docs.langchain.com/oss/javascript/langgraph/interrupts

Illustrates the incorrect way to use the `interrupt` function by wrapping it in a bare try/catch block. This prevents the `interrupt` exception from being propagated back to the LangGraph, leading to unexpected behavior.

```typescript
async function nodeA(state: State) {
  // ❌ Bad: wrapping interrupt in bare try/catch will catch the interrupt exception
  try {
    const name = interrupt("What's your name?");
  } catch (err) {
    console.error(error);
  }
  return state;
}
```

---

### Invoke Subgraph with Different State Schemas in Node (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/use-subgraphs

Demonstrates calling a compiled subgraph from within a node of a parent graph when their state schemas do not share keys. The node function handles the state transformation before invoking the subgraph and transforms the output back to the parent's state schema.

```typescript
import { StateGraph, StateSchema, START } from "@langchain/langgraph";
import * as z from "zod";

const SubgraphState = new StateSchema({
  bar: z.string(),
});

// Subgraph
const subgraphBuilder = new StateGraph(SubgraphState)
  .addNode("subgraphNode1", (state) => {
    return { bar: "hi! " + state.bar };
  })
  .addEdge(START, "subgraphNode1");

const subgraph = subgraphBuilder.compile();

// Parent graph
const State = new StateSchema({
  foo: z.string(),
});

// Transform the state to the subgraph state and back
const builder = new StateGraph(State)
  .addNode("node1", async (state) => {
    const subgraphOutput = await subgraph.invoke({ bar: state.foo });
    return { foo: subgraphOutput.bar };
  })
  .addEdge(START, "node1");

const graph = builder.compile();
```

---

### Pause Workflow for User Input using Interrupts

Source: https://docs.langchain.com/oss/javascript/langgraph/thinking-in-langgraph

Uses the interrupt function to pause the graph execution and request missing information from the user. Once provided, the workflow resumes with the updated state.

```typescript
import { Command, GraphNode, interrupt } from "@langchain/langgraph";

const lookupCustomerHistory: GraphNode<typeof State> = async (
  state,
  config,
) => {
  if (!state.customerId) {
    const userInput = interrupt({
      message: "Customer ID needed",
      request:
        "Please provide the customer's account ID to look up their subscription history",
    });
    return new Command({
      update: { customerId: userInput.customerId },
      goto: "lookupCustomerHistory",
    });
  }
  // Now proceed with the lookup
  const customerData = await fetchCustomerHistory(state.customerId);
  return new Command({
    update: { customerHistory: customerData },
    goto: "draftResponse",
  });
};
```

---

### Create Collapsible NodeCard Component

Source: https://docs.langchain.com/oss/javascript/langgraph/frontend/graph-execution

A React component for displaying individual node outputs in a collapsible card format. It includes a status badge and handles both streaming and final content rendering.

```tsx
function NodeCard({
  node,
  status,
  streamingContent,
  completedContent,
}: {
  node: { name: string; stateKey: string; label: string };
  status: NodeStatus;
  streamingContent: string | undefined;
  completedContent: unknown;
}) {
  const [collapsed, setCollapsed] = useState(false);

  const displayContent =
    status === "complete"
      ? formatContent(completedContent)
      : (streamingContent ?? "");

  const statusBadge = {
    idle: { text: "Waiting", className: "bg-gray-100 text-gray-600" },
    streaming: {
      text: "Running",
      className: "bg-blue-100 text-blue-700 animate-pulse",
    },
    complete: { text: "Done", className: "bg-green-100 text-green-700" },
  };

  const badge = statusBadge[status];

  return (
    <div className="rounded-lg border bg-white shadow-sm">
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex w-full items-center justify-between p-4"
      >
        <div className="flex items-center gap-3">
          <h3 className="font-semibold">{node.label}</h3>
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${badge.className}`}
          >
            {badge.text}
          </span>
        </div>
        <ChevronIcon direction={collapsed ? "down" : "up"} />
      </button>

      {!collapsed && displayContent && (
        <div className="border-t px-4 py-3">
          <div className="prose prose-sm max-w-none">
            {displayContent}
            {status === "streaming" && (
              <span className="inline-block h-4 w-1 animate-pulse bg-blue-500" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function formatContent(value: unknown): string {
  if (typeof value === "string") return value;
  if (value == null) return "";
  return JSON.stringify(value, null, 2);
}
```

---

### Use Debug Stream Mode

Source: https://docs.langchain.com/oss/javascript/langgraph/streaming

Configures the graph to stream detailed execution information, including node names and full state updates.

```typescript
for await (const chunk of await graph.stream(
  { topic: "ice cream" },
  { streamMode: "debug" },
)) {
  console.log(chunk);
}
```

---

### Filter streamed tokens by LLM invocation tags

Source: https://docs.langchain.com/oss/javascript/langgraph/streaming

Shows how to assign tags to specific LLM models and filter the streamed token output in the graph based on the metadata tags. This is useful for distinguishing between multiple LLM calls within the same graph execution.

```typescript
import { ChatOpenAI } from "@langchain/openai";

const model1 = new ChatOpenAI({ model: "gpt-4.1-mini", tags: ['joke'] });
const model2 = new ChatOpenAI({ model: "gpt-4.1-mini", tags: ['poem'] });

const graph = // ... define a graph that uses these LLMs

for await (const [msg, metadata] of await graph.stream(
  { topic: "cats" },
  { streamMode: "messages" }
)) {
  if (metadata.tags?.includes("joke")) {
    console.log(msg.content + "|");
  }
}
```

---

### Resume Graph Execution with Edited State

Source: https://docs.langchain.com/oss/javascript/langgraph/interrupts

Demonstrates how to resume a paused graph by passing a Command object containing the edited content. This value is returned by the original interrupt call.

```typescript
await graph.invoke(
  new Command({ resume: "The edited and improved text" }),
  config,
);
```

---

### LLM with Tool Calling

Source: https://docs.langchain.com/oss/javascript/langgraph/workflows-agents

Augments a language model to enable tool calling. This allows the LLM to invoke predefined functions with specific schemas, expanding its capabilities to perform actions.

```typescript
import * as z from "zod";
import { tool } from "langchain";

// Define a tool
const multiply = tool(
  ({ a, b }) => {
    return a * b;
  },
  {
    name: "multiply",
    description: "Multiply two numbers",
    schema: z.object({
      a: z.number(),
      b: z.number(),
    }),
  },
);

// Augment the LLM with tools
const llmWithTools = llm.bindTools([multiply]);

// Invoke the LLM with input that triggers the tool call
const msg = await llmWithTools.invoke("What is 2 times 3?");

// Get the tool call
console.log(msg.tool_calls);
```

---

### Invoking Subgraphs with Interrupts in LangGraph

Source: https://docs.langchain.com/oss/javascript/langgraph/interrupts

Demonstrates how to invoke a subgraph within a parent graph node. When an interrupt occurs, both the parent node and the subgraph node re-execute from their respective beginnings upon resumption.

```typescript
async function nodeInParentGraph(state: State) {
  someCode(); // <-- This will re-execute when resumed
  // Invoke a subgraph as a function.
  // The subgraph contains an `interrupt` call.
  const subgraphResult = await subgraph.invoke(someInput);
  // ...
}

async function nodeInSubgraph(state: State) {
  someOtherCode(); // <-- This will also re-execute when resumed
  const result = interrupt("What's your name?");
  // ...
}
```

---

### Execute Iterative LLM Workflow with LangGraph

Source: https://docs.langchain.com/oss/javascript/langgraph/workflows-agents

This code implements a loop that generates a joke using an LLM and evaluates it until a 'funny' grade is achieved. It then invokes the LangGraph workflow and streams the updates to the console.

```javascript
while (true) {
  joke = await llmCallGenerator({ topic, feedback });
  feedback = await llmCallEvaluator(joke);

  if (feedback.grade === "funny") {
    break;
  }
}

return joke;

// Invoke
const stream = await workflow.stream("Cats", {
  streamMode: "updates",
});

for await (const step of stream) {
  console.log(step);
  console.log("\n");
}
```

---

### Handling Untracked State Values in LangGraph

Source: https://docs.langchain.com/oss/javascript/langgraph/graph-api

Shows how to use `UntrackedValue` for state fields that should not be checkpointed or persisted. This is useful for transient data like database connections or temporary caches that reset on graph resumption.

```typescript
import {
  StateSchema,
  UntrackedValue,
  MessagesValue,
} from "@langchain/langgraph";
import { z } from "zod/v4";

const State = new StateSchema({
  messages: MessagesValue,

  // Untracked: throws if multiple nodes write in same step (guard: true is default)
  dbConnection: new UntrackedValue<DatabaseConnection>(),

  // Untracked with guard: false allows multiple writes, keeps last value
  tempCache: new UntrackedValue(z.record(z.string(), z.unknown()), {
    guard: false,
  }),

  // Untracked without a schema (for maximum flexibility)
  runtimeConfig: new UntrackedValue(),
});
```

---

### Node Returning Updates for State with MessagesValue (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/use-graph-api

This TypeScript code shows a graph node that returns updates for the state. Specifically, it creates a new AIMessage and returns it within an object targeting the 'messages' and 'extraField' keys. The MessagesValue reducer will automatically append this message to the existing messages array.

```typescript
import { GraphNode } from "@langchain/langgraph";

const node: GraphNode<typeof State> = (state) => {
  const newMessage = new AIMessage("Hello!");
  return { messages: [newMessage], extraField: 10 }; // [!code highlight]
};
```

---

### Retrieve accumulated subgraph state per-thread in LangGraph.js

Source: https://docs.langchain.com/oss/javascript/langgraph/use-subgraphs

Shows how to retrieve the accumulated state of a subgraph across multiple invocations within the same thread. This requires the subgraph to be compiled with its own checkpointer.

```typescript
import {
  StateGraph,
  StateSchema,
  MessagesValue,
  START,
  MemorySaver,
} from "@langchain/langgraph";

// Subgraph with its own persistent state
const SubgraphState = new StateSchema({
  messages: MessagesValue,
});

const subgraphBuilder = new StateGraph(SubgraphState);
// ... add nodes and edges
const subgraph = subgraphBuilder.compile({ checkpointer: true });

// Parent graph
const builder = new StateGraph(SubgraphState)
  .addNode("agent", subgraph)
  .addEdge(START, "agent");

const checkpointer = new MemorySaver();
const graph = builder.compile({ checkpointer });

const config = { configurable: { thread_id: "1" } };

await graph.invoke({ messages: [{ role: "user", content: "hi" }] }, config);
await graph.invoke(
  { messages: [{ role: "user", content: "what did I say?" }] },
  config,
);

// View accumulated subgraph state (includes messages from both invocations)
const subgraphState = (await graph.getState(config, { subgraphs: true }))
  .tasks[0].state;
```

---

### Sequential Graph with Private State in LangGraph (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/use-graph-api

Defines a sequential graph where node1 produces private data consumed by node2. Node3 only accesses the overall graph state. Uses Zod for state schema definition and LangGraph for graph construction.

```typescript
import {
  StateGraph,
  StateSchema,
  GraphNode,
  START,
  END,
} from "@langchain/langgraph";
import * as z from "zod";

// The overall state of the graph (this is the public state shared across nodes)
const OverallState = new StateSchema({
  a: z.string(),
});

// Output from node1 contains private data that is not part of the overall state
const Node1Output = new StateSchema({
  privateData: z.string(),
});

// Node 2 input only requests the private data available after node1
const Node2Input = new StateSchema({
  privateData: z.string(),
});

// The private data is only shared between node1 and node2
const node1: GraphNode<typeof OverallState> = (state) => {
  const output = { privateData: "set by node1" };
  console.log(
    `Entered node 'node1':\n\tInput: ${JSON.stringify(state)}.\n\tReturned: ${JSON.stringify(output)}`,
  );
  return output;
};

const node2: GraphNode<typeof Node2Input> = (state) => {
  const output = { a: "set by node2" };
  console.log(
    `Entered node 'node2':\n\tInput: ${JSON.stringify(state)}.\n\tReturned: ${JSON.stringify(output)}`,
  );
  return output;
};

// Node 3 only has access to the overall state (no access to private data from node1)
const node3: GraphNode<typeof OverallState> = (state) => {
  const output = { a: "set by node3" };
  console.log(
    `Entered node 'node3':\n\tInput: ${JSON.stringify(state)}.\n\tReturned: ${JSON.stringify(output)}`,
  );
  return output;
};

// Connect nodes in a sequence
// node2 accepts private data from node1, whereas
// node3 does not see the private data.
const graph = new StateGraph(OverallState)
  .addNode("node1", node1)
  .addNode("node2", node2, { input: Node2Input })
  .addNode("node3", node3)
  .addEdge(START, "node1")
  .addEdge("node1", "node2")
  .addEdge("node2", "node3")
  .addEdge("node3", END)
  .compile();

// Invoke the graph with the initial state
const response = await graph.invoke({ a: "set at start" });

console.log(`\nOutput of graph invocation: ${JSON.stringify(response)}`);
```

---

### Build Evaluator-Optimizer Workflow with LangGraph Graph API

Source: https://docs.langchain.com/oss/javascript/langgraph/workflows-agents

This snippet demonstrates building an evaluator-optimizer workflow using the LangGraph Graph API in TypeScript. It defines a state schema, LLM nodes for generation and evaluation, and a conditional edge router to control the iteration loop. The workflow takes a topic as input and outputs the final generated joke.

```typescript
import {
  StateGraph,
  StateSchema,
  GraphNode,
  ConditionalEdgeRouter,
} from "@langchain/langgraph";
import * as z from "zod";

// Graph state
const State = new StateSchema({
  joke: z.string(),
  topic: z.string(),
  feedback: z.string(),
  funnyOrNot: z.string(),
});

// Schema for structured output to use in evaluation
const feedbackSchema = z.object({
  grade: z
    .enum(["funny", "not funny"])
    .describe("Decide if the joke is funny or not."),
  feedback: z
    .string()
    .describe(
      "If the joke is not funny, provide feedback on how to improve it.",
    ),
});

// Augment the LLM with schema for structured output
const evaluator = llm.withStructuredOutput(feedbackSchema);

// Nodes
const llmCallGenerator: GraphNode<typeof State> = async (state) => {
  // LLM generates a joke
  let msg;
  if (state.feedback) {
    msg = await llm.invoke(
      `Write a joke about ${state.topic} but take into account the feedback: ${state.feedback}`,
    );
  } else {
    msg = await llm.invoke(`Write a joke about ${state.topic}`);
  }
  return { joke: msg.content };
};

const llmCallEvaluator: GraphNode<typeof State> = async (state) => {
  // LLM evaluates the joke
  const grade = await evaluator.invoke(`Grade the joke ${state.joke}`);
  return { funnyOrNot: grade.grade, feedback: grade.feedback };
};

// Conditional edge function to route back to joke generator or end based upon feedback from the evaluator
const routeJoke: ConditionalEdgeRouter<typeof State, "llmCallGenerator"> = (
  state,
) => {
  // Route back to joke generator or end based upon feedback from the evaluator
  if (state.funnyOrNot === "funny") {
    return "Accepted";
  } else {
    return "Rejected + Feedback";
  }
};

// Build workflow
const optimizerWorkflow = new StateGraph(State)
  .addNode("llmCallGenerator", llmCallGenerator)
  .addNode("llmCallEvaluator", llmCallEvaluator)
  .addEdge("__start__", "llmCallGenerator")
  .addEdge("llmCallGenerator", "llmCallEvaluator")
  .addConditionalEdges("llmCallEvaluator", routeJoke, {
    // Name returned by routeJoke : Name of next node to visit
    Accepted: "__end__",
    "Rejected + Feedback": "llmCallGenerator",
  })
  .compile();

// Invoke
const state = await optimizerWorkflow.invoke({ topic: "Cats" });
console.log(state.joke);
```

---

### Implement Namespace Isolation for Subgraphs in TypeScript

Source: https://docs.langchain.com/oss/javascript/langgraph/use-subgraphs

Wraps subagents in a StateGraph with a unique node name to create stable, isolated namespaces. This prevents checkpoint collisions when multiple subgraphs share the same thread ID.

```typescript
import {
  StateGraph,
  StateSchema,
  MessagesValue,
  START,
} from "@langchain/langgraph";

function createSubAgent(
  model: string,
  { name, ...kwargs }: { name: string; [key: string]: any },
) {
  const agent = createAgent({ model, name, ...kwargs });
  return new StateGraph(new StateSchema({ messages: MessagesValue }))
    .addNode(name, agent) // unique name → stable namespace
    .addEdge(START, name)
    .compile();
}

const fruitAgent = createSubAgent("gpt-4.1-mini", {
  name: "fruit_agent",
  tools: [fruitInfo],
  prompt: "...",
  checkpointer: true,
});
const veggieAgent = createSubAgent("gpt-4.1-mini", {
  name: "veggie_agent",
  tools: [veggieInfo],
  prompt: "...",
  checkpointer: true,
});
const config = { configurable: { thread_id: "1" } };

let response = await agent.invoke(
  {
    messages: [
      { role: "user", content: "Tell me about cherries and broccoli" },
    ],
  },
  config,
);
```

---

### Render Pipeline Progress Bar

Source: https://docs.langchain.com/oss/javascript/langgraph/frontend/graph-execution

A React component that displays a horizontal progress bar representing the pipeline steps. It uses the node status to dynamically style segments as idle, streaming, or complete.

```tsx
function PipelineProgress({
  nodes,
  values,
  streamingContent,
}: {
  nodes: typeof PIPELINE_NODES;
  values: Record<string, unknown>;
  streamingContent: Record<string, string>;
}) {
  return (
    <div className="flex items-center gap-1">
      {nodes.map((node, i) => {
        const status = getNodeStatus(node, streamingContent, values);
        const colors = {
          idle: "bg-gray-200 text-gray-500",
          streaming: "bg-blue-400 text-white animate-pulse",
          complete: "bg-green-500 text-white",
        };

        return (
          <div key={node.name} className="flex items-center">
            <div
              className={`rounded-full px-3 py-1 text-xs font-medium ${colors[status]}`}
            >
              {node.label}
            </div>
            {i < nodes.length - 1 && (
              <div
                className={`mx-1 h-0.5 w-6 ${
                  status === "complete" ? "bg-green-500" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
```

---

### Invoke LangGraph with a New Thread ID

Source: https://docs.langchain.com/oss/javascript/langgraph/persistence

This snippet shows invoking the LangGraph with a different `thread_id` but the same `userId`. This demonstrates that memories associated with the `userId` are accessible across different threads.

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

### Idempotent Operations Before Interrupt in TypeScript

Source: https://docs.langchain.com/oss/javascript/langgraph/interrupts

Demonstrates using an idempotent `upsertUser` operation before calling `interrupt`. This ensures that even if the node is re-run after an interrupt, the user record will only be updated once to the 'pending_approval' status.

```typescript
const nodeA: GraphNode<typeof State> = async (state) => {
  // ✅ Good: using upsert operation which is idempotent
  // Running this multiple times will have the same result
  await db.upsertUser({
    userId: state.userId,
    status: "pending_approval",
  });

  const approved = interrupt("Approve this change?");

  return { approved };
};
```

---

### Pause graph execution with interrupt in TypeScript

Source: https://docs.langchain.com/oss/javascript/langgraph/interrupts

Demonstrates how to use the interrupt function within a LangGraph node to pause execution and request external input. The function requires a JSON-serializable payload and relies on a configured checkpointer to persist state.

```typescript
import { interrupt } from "@langchain/langgraph";

async function approvalNode(state: State) {
  // Pause and ask for approval
  const approved = interrupt("Do you approve this action?");

  // Command({ resume: ... }) provides the value returned into this variable
  return { approved };
}
```

---

### Render Node Card List

Source: https://docs.langchain.com/oss/javascript/langgraph/frontend/graph-execution

A React component implementation that maps over pipeline nodes to render individual status cards. It utilizes streaming content and committed values to provide real-time feedback for each step in the graph.

```tsx
function NodeCardList({
  nodes,
  messages,
  values,
  getMetadata,
}: {
  nodes: typeof PIPELINE_NODES;
  messages: BaseMessage[];
  values: Record<string, unknown>;
  getMetadata: (msg: BaseMessage) => MessageMetadata | undefined;
}) {
  const streamingContent = getStreamingContent(messages, getMetadata);

  return (
    <div className="space-y-3">
      {nodes.map((node) => {
        const status = getNodeStatus(node, streamingContent, values);
        return (
          <NodeCard
            key={node.name}
            node={node}
            status={status}
            streamingContent={streamingContent[node.name]}
            completedContent={values?.[node.stateKey]}
          />
        );
      })}
    </div>
  );
}
```

---

### Define State Schema with MessagesValue Reducer (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/use-graph-api

This TypeScript code defines a state schema for a LangGraph using StateSchema. It specifies a 'messages' field using MessagesValue, which has a built-in reducer for handling message concatenation, and an 'extraField' as a number.

```typescript
import { StateSchema, MessagesValue, ReducedValue } from "@langchain/langgraph";
import * as z from "zod";

// MessagesValue already has a built-in reducer
const State = new StateSchema({
  messages: MessagesValue, // [!code highlight]
  extraField: z.number(),
});
```

---

### Non-Idempotent Record Creation Before Interrupt in TypeScript

Source: https://docs.langchain.com/oss/javascript/langgraph/interrupts

Highlights a bad practice of creating new records (e.g., audit logs) before an `interrupt`. This code will lead to duplicate records being created each time the node is resumed after an interrupt, as `createAuditLog` is not idempotent.

```typescript
const nodeA: GraphNode<typeof State> = async (state) => {
  // ❌ Bad: creating a new record before interrupt
  // This will create duplicate records on each resume
  const auditId = await db.createAuditLog({
    userId: state.userId,
    action: "pending_approval",
    timestamp: new Date(),
  });

  const approved = interrupt("Approve this change?");

  return { approved, auditId };
};
```

---

### Implement Tool Call Review Function in TypeScript

Source: https://docs.langchain.com/oss/javascript/langgraph/use-functional-api

Defines a review function that uses the interrupt mechanism to pause execution. It allows the human to accept, update, or provide feedback on tool calls before they are executed by the agent.

```typescript
import { ToolCall } from "@langchain/core/messages/tool";
import { ToolMessage } from "@langchain/core/messages";

function reviewToolCall(toolCall: ToolCall): ToolCall | ToolMessage {
  // Review a tool call, returning a validated version
  const humanReview = interrupt({
    question: "Is this correct?",
    tool_call: toolCall,
  });

  const reviewAction = humanReview.action;
  const reviewData = humanReview.data;

  if (reviewAction === "continue") {
    return toolCall;
  } else if (reviewAction === "update") {
    const updatedToolCall = { ...toolCall, args: reviewData };
    return updatedToolCall;
  } else if (reviewAction === "feedback") {
    return new ToolMessage({
      content: reviewData,
      name: toolCall.name,
      tool_call_id: toolCall.id,
    });
  }

  throw new Error(`Unknown review action: ${reviewAction}`);
}
```

---

### Implement Summarization Node

Source: https://docs.langchain.com/oss/javascript/langgraph/add-memory

A graph node function that generates a summary of the current conversation history using a chat model. It updates the state with the new summary and prunes older messages to optimize memory usage.

```typescript
import { RemoveMessage, HumanMessage } from "@langchain/core/messages";

const summarizeConversation: GraphNode<typeof State> = async (state) => {
  const summary = state.summary || "";
  let summaryMessage: string;
  if (summary) {
    summaryMessage =
      `This is a summary of the conversation to date: ${summary}\n\n` +
      "Extend the summary by taking into account the new messages above:";
  } else {
    summaryMessage = "Create a summary of the conversation above:";
  }

  const messages = [
    ...state.messages,
    new HumanMessage({ content: summaryMessage }),
  ];
  const response = await model.invoke(messages);

  const deleteMessages = state.messages
    .slice(0, -2)
    .map((m) => new RemoveMessage({ id: m.id }));

  return {
    summary: response.content,
    messages: deleteMessages,
  };
};
```

---

### Resume LangGraph Execution with Approval Decision in TypeScript

Source: https://docs.langchain.com/oss/javascript/langgraph/interrupts

This code shows how to resume a paused LangGraph execution after an interrupt. Passing `true` to `graph.invoke` approves the action, routing to the 'proceed' path, while `false` rejects it, routing to 'cancel'.

```typescript
// To approve
await graph.invoke(new Command({ resume: true }), config);

// To reject
await graph.invoke(new Command({ resume: false }), config);
```

---

### Stream Multiple Modes Simultaneously in LangGraph (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/streaming

This code snippet shows how to stream outputs from multiple modes at once by passing an array of mode names to the `streamMode` parameter. The loop iterates through the streamed outputs, which are tuples of `[mode, chunk]`, allowing for differentiated handling of data from each mode. This is useful for complex applications requiring concurrent data streams.

```typescript
for await (const [mode, chunk] of await graph.stream(inputs, {
  streamMode: ["updates", "custom"],
})) {
  console.log(chunk);
}
```

---

### Define Pipeline Nodes for LangGraph UI - TypeScript

Source: https://docs.langchain.com/oss/javascript/langgraph/frontend/graph-execution

This TypeScript code defines an array of objects, each representing a node in a LangGraph pipeline. Each object includes a 'name' for the node, a 'stateKey' for its output in the graph's state, and a 'label' for UI display. It also creates a Set of node names for efficient lookups. This structure is used to map graph nodes to visual UI cards.

```typescript
const PIPELINE_NODES = [
  { name: "classify", stateKey: "classification", label: "Classify" },
  { name: "do_research", stateKey: "research", label: "Research" },
  { name: "analyze", stateKey: "analysis", label: "Analyze" },
  { name: "synthesize", stateKey: "synthesis", label: "Synthesize" },
];

const PIPELINE_NODE_NAMES = new Set(PIPELINE_NODES.map((n) => n.name));
```

---

### Define Graph State with MessagesValue and Zod

Source: https://docs.langchain.com/oss/javascript/langgraph/use-graph-api

Defines a graph's state schema using LangGraph's `StateSchema` and Zod for validation. It includes a 'messages' field of type `MessagesValue` and an 'extraField' of type number.

```typescript
import { StateSchema, MessagesValue } from "@langchain/langgraph";
import * as z from "zod";

const State = new StateSchema({
  messages: MessagesValue,
  extraField: z.number(),
});
```

---

### Apply Height Style to Slot Element

Source: https://docs.langchain.com/oss/javascript/langgraph/frontend/graph-execution

This useEffect hook applies a calculated height to a slot element using CSS 'important' priority. It reacts to changes in the resolved height.

```javascript
useEffect(() => {
  slotRef.current?.style.setProperty("height", heightStyle, "important");
}, [heightStyle]);
```

---

### View Latest Thread State with LangGraph

Source: https://docs.langchain.com/oss/javascript/langgraph/add-memory

This code snippet shows how to retrieve the latest state of a specific thread from a LangGraph. It configures the thread ID and uses the `getState` method to fetch the current state, including messages, configuration, metadata, and timestamps.

```typescript
const config = {
  configurable: {
    thread_id: "1",
  },
};
await graph.getState(config);
```

---

### Build Evaluator-Optimizer Workflow with LangGraph Functional API

Source: https://docs.langchain.com/oss/javascript/langgraph/workflows-agents

This snippet illustrates creating an evaluator-optimizer workflow using the LangGraph Functional API in TypeScript. It defines tasks for joke generation and evaluation, leveraging Zod for schema validation and structured output. The workflow is initiated with a topic and iteratively refines the joke based on LLM feedback.

```typescript
import * as z from "zod";
import { task, entrypoint } from "@langchain/langgraph";

// Schema for structured output to use in evaluation
const feedbackSchema = z.object({
  grade: z.enum(["funny", "not funny"]).describe(
    "Decide if the joke is funny or not."
  ),
  feedback: z.string().describe(
    "If the joke is not funny, provide feedback on how to improve it."
  ),
});

// Augment the LLM with schema for structured output
const evaluator = llm.withStructuredOutput(feedbackSchema);

// Tasks
const llmCallGenerator = task("jokeGenerator", async (params: {
  topic: string;
  feedback?: z.infer<typeof feedbackSchema>;
}) => {
  // LLM generates a joke
  const msg = params.feedback
    ? await llm.invoke(
        `Write a joke about ${params.topic} but take into account the feedback: ${params.feedback.feedback}`
      )
    : await llm.invoke(`Write a joke about ${params.topic}`);
  return msg.content;
});

const llmCallEvaluator = task("jokeEvaluator", async (joke: string) => {
  // LLM evaluates the joke
  return evaluator.invoke(`Grade the joke ${joke}`);
});

// Build workflow
const workflow = entrypoint(
  "optimizerWorkflow",
  async (topic: string) => {
    let feedback: z.infer<typeof feedbackSchema> | undefined;
    let joke: string;

```

---

### Serialization of MessagesValue in LangGraph

Source: https://docs.langchain.com/oss/javascript/langgraph/graph-api

Demonstrates how MessagesValue automatically deserializes messages into LangChain Message objects. It supports both Message objects and plain objects with role and content. Access message attributes using dot notation.

```typescript
import { StateGraph, StateSchema, MessagesValue } from "@langchain/langgraph";

const State = new StateSchema({
  messages: MessagesValue,
});

const graph = new StateGraph(State);
// ... graph definition

// Example of accessing message content:
// state.messages.at(-1).content
```

```typescript
// Supported input formats for messages:
{
  messages: [new HumanMessage("message")];
}

// or
{
  messages: [{ role: "human", content: "message" }];
}
```

---

### Route Streaming Tokens to Nodes using Metadata

Source: https://docs.langchain.com/oss/javascript/langgraph/frontend/graph-execution

This TypeScript function demonstrates how to process streaming messages from a LangGraph agent. It utilizes the `getMessagesMetadata` function to extract the `langgraph_node` identifier from each message's metadata, allowing for the routing of content to the correct UI component (e.g., a specific card).

```typescript
function getStreamingContent(
  messages: BaseMessage[],
  getMetadata: (msg: BaseMessage) => MessageMetadata | undefined,
): Record<string, string> {
  const content: Record<string, string> = {};

  for (const message of messages) {
    if (message.type !== "ai") continue;

    const metadata = getMetadata(message);
    const node = metadata?.streamMetadata?.langgraph_node;

    if (node && PIPELINE_NODE_NAMES.has(node)) {
      content[node] =
        typeof message.content === "string" ? message.content : "";
    }
  }

  return content;
}
```

---

### Save Memories in a LangGraph Node

Source: https://docs.langchain.com/oss/javascript/langgraph/persistence

This TypeScript snippet shows how to save arbitrary memory content within a LangGraph node. It accesses the `userId` from the runtime context, namespaces the memory, generates a unique ID, and stores the memory using `runtime.store.put()`.

```typescript
import { StateSchema, MessagesValue, Runtime } from "@langchain/langgraph";
import { v4 as uuidv4 } from "uuid";

const MessagesState = new StateSchema({
  messages: MessagesValue,
});

const updateMemory: GraphNode<typeof MessagesState> = async (
  state,
  runtime,
) => {
  // Get the user id from the config
  const userId = runtime.context?.user_id;
  if (!userId) throw new Error("User ID is required");

  // Namespace the memory
  const namespace = [userId, "memories"];

  // ... Analyze conversation and create a new memory
  const memory = "Some memory content";

  // Create a new memory ID
  const memoryId = uuidv4();

  // We create a new memory
  await runtime.store?.put(namespace, memoryId, { memory });
};
```

---

### Resume Graph Execution After Interruption (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/use-functional-api

Resumes the interrupted graph execution using a `Command` object containing the feedback 'baz'. This continues the workflow from where it was paused by the `interrupt` function.

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

---

### Trim Messages Utility in LangGraph (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/add-memory

Demonstrates using the `trimMessages` utility from `@langchain/core/messages` to manage message history within a LangGraph state. It specifies a strategy, maximum tokens, and boundary conditions for truncation. This is useful for LLMs with limited context windows.

```typescript
import { trimMessages } from "@langchain/core/messages";
import { StateSchema, MessagesValue, GraphNode } from "@langchain/langgraph";

const State = new StateSchema({
  messages: MessagesValue,
});

const callModel: GraphNode<typeof State> = async (state) => {
  const messages = trimMessages(state.messages, {
    strategy: "last",
    maxTokens: 128,
    startOn: "human",
    endOn: ["human", "tool"],
  });
  const response = await model.invoke(messages);
  return { messages: [response] };
};

const builder = new StateGraph(State).addNode("call_model", callModel);
// ...
```

---

### Iterate and Log Message Content from Graph Result (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/use-graph-api

This TypeScript code iterates through the messages array in the result of a graph invocation and logs the type and content of each message. This is a common pattern for inspecting the conversational history or output of the graph.

```typescript
for (const message of result.messages) {
  console.log(`${message.getType()}: ${message.content}`);
}
```

---

### Determine Node Content Source

Source: https://docs.langchain.com/oss/javascript/langgraph/frontend/graph-execution

Logic to select between streaming tokens and committed state values based on the current node status. This ensures a responsive UI by showing live updates while falling back to final values once processing is complete.

```typescript
for (const node of PIPELINE_NODES) {
  const status = getNodeStatus(node, streamingContent, stream.values);

  const content =
    status === "streaming"
      ? streamingContent[node.name]
      : stream.values?.[node.stateKey];
}
```

---

### Side Effects After Interrupt in TypeScript

Source: https://docs.langchain.com/oss/javascript/langgraph/interrupts

Shows how to place a side effect, such as creating an audit log, after the `interrupt` call. This guarantees that the side effect only executes once after the interrupt has been resolved and the condition is met.

```typescript
const nodeA: GraphNode<typeof State> = async (state) => {
  // ✅ Good: placing side effect after the interrupt
  // This ensures it only runs once after approval is received
  const approved = interrupt("Approve this change?");

  if (approved) {
    await db.createAuditLog({
      userId: state.userId,
      action: "approved",
    });
  }

  return { approved };
};
```

---

### Filter streamed tokens by node name

Source: https://docs.langchain.com/oss/javascript/langgraph/streaming

Demonstrates how to iterate over a graph stream using 'messages' mode and filter the output based on the 'langgraph_node' field within the metadata object.

```typescript
for await (const [msg, metadata] of await graph.stream(inputs, {
  streamMode: "messages",
})) {
  if (msg.content && metadata.langgraph_node === "some_node_name") {
    // ...
  }
}
```

---

### Define Tasks for Human-in-the-Loop Workflow (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/use-functional-api

Defines three sequential tasks: appending 'bar', pausing for human input, and appending 'qux'. The `interrupt` function is used to pause execution and wait for external input.

```typescript
import { entrypoint, task, interrupt, Command } from "@langchain/langgraph";

const step1 = task("step1", async (inputQuery: string) => {
  // Append bar
  return `${inputQuery} bar`;
});

const humanFeedback = task("humanFeedback", async (inputQuery: string) => {
  // Append user input
  const feedback = interrupt(`Please provide feedback: ${inputQuery}`);
  return `${inputQuery} ${feedback}`;
});

const step3 = task("step3", async (inputQuery: string) => {
  // Append qux
  return `${inputQuery} qux`;
});
```

---

### LangGraph State Streaming: Values Mode

Source: https://docs.langchain.com/oss/javascript/langgraph/streaming

Streams the complete state of the graph after each step. This provides a full snapshot of the graph's state at various points during execution.

```typescript
import { StateGraph, StateSchema, START, END } from "@langchain/langgraph";
import { z } from "zod/v4";

const State = new StateSchema({
  topic: z.string(),
  joke: z.string(),
});

const graph = new StateGraph(State)
  .addNode("refineTopic", (state) => {
    return { topic: state.topic + " and cats" };
  })
  .addNode("generateJoke", (state) => {
    return { joke: `This is a joke about ${state.topic}` };
  })
  .addEdge(START, "refineTopic")
  .addEdge("refineTopic", "generateJoke")
  .addEdge("generateJoke", END)
  .compile();

for await (const chunk of await graph.stream(
  { topic: "ice cream" },
  { streamMode: "values" },
)) {
  console.log(`topic: ${chunk.topic}, joke: ${chunk.joke}`);
}
```

---

### Avoid Looping Interrupts with Non-Deterministic Logic in TypeScript

Source: https://docs.langchain.com/oss/javascript/langgraph/interrupts

Highlights the issue of using `interrupt` calls within loops that are based on non-deterministic data. This can cause the number of interrupts to vary between executions, leading to resume value mismatches.

```typescript
const nodeA: GraphNode<typeof State> = async (state) => {
  // ❌ Bad: looping based on non-deterministic data
  // The number of interrupts changes between runs
  const results = [];
  for (const item of state.dynamicList || []) {
    // List might change between runs
    const result = interrupt(`Approve ${item}?`);
    results.push(result);
  }

  return { results };
};
```

---

### Define State Schema with Summary

Source: https://docs.langchain.com/oss/javascript/langgraph/add-memory

Defines a LangGraph state schema that includes both the message history and a string-based summary field. This structure allows the graph to persist a condensed version of the conversation alongside raw messages.

```typescript
import { StateSchema, MessagesValue, GraphNode } from "@langchain/langgraph";
import { z } from "zod/v4";

const State = new StateSchema({
  messages: MessagesValue,
  summary: z.string().optional(),
});
```

---

### Stream custom data and updates in LangGraph

Source: https://docs.langchain.com/oss/javascript/langgraph/use-functional-api

Shows how to use the streaming API to emit custom messages during execution and consume them using the .stream() method with specified stream modes.

```typescript
import {
  entrypoint,
  MemorySaver,
  LangGraphRunnableConfig,
} from "@langchain/langgraph";

const checkpointer = new MemorySaver();

const main = entrypoint(
  { checkpointer, name: "main" },
  async (
    inputs: { x: number },
    config: LangGraphRunnableConfig,
  ): Promise<number> => {
    config.writer?.("Started processing");
    const result = inputs.x * 2;
    config.writer?.(`Result is ${result}`);
    return result;
  },
);

const config = { configurable: { thread_id: "abc" } };

for await (const [mode, chunk] of await main.stream(
  { x: 5 },
  { streamMode: ["custom", "updates"], ...config },
)) {
  console.log(`${mode}: ${JSON.stringify(chunk)}`);
}
```

---

### Filter Active Nodes for Dynamic Pipelines

Source: https://docs.langchain.com/oss/javascript/langgraph/frontend/graph-execution

Logic to filter the list of nodes to display based on whether they contain active streaming content, committed state values, or represent the current execution step. This prevents the UI from rendering empty placeholders for skipped or irrelevant nodes.

```typescript
const activeNodes = PIPELINE_NODES.filter(
  (node) =>
    streamingContent[node.name] ||
    values?.[node.stateKey] ||
    node.name === currentNode,
);
```

---

### React SDK Logo SVG (JavaScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/frontend/graph-execution

Provides the SVG code for the React logo used within the LangGraph SDK. This SVG is intended for visual representation of the React framework integration.

```javascript
var SDK_LOGOS = {
  react:
    '<svg width="14" height="14" viewBox="0 -14 256 256" xmlns="http://www.w3.org/2000/svg"><path d="M210.483381,73.8236374 C207.827698,72.9095503 205.075867,72.0446761 202.24247,71.2267368 C202.708172,69.3261098 203.135596,67.4500894 203.515631,65.6059664 C209.753843,35.3248922 205.675082,10.9302478 191.747328,2.89849283 C178.392359,-4.80289661 156.551327,3.22703567 134.492936,22.4237776 C132.371761,24.2697233 130.244662,26.2241201 128.118477,28.2723861 C126.701777,26.917204 125.287358,25.6075897 123.876584,24.3549348 C100.758745,3.82852863 77.5866802,-4.82157937 63.6725966,3.23341515 C50.3303869,10.9571328 46.3792156,33.8904224 51.9945178,62.5880206 C52.5367729,65.3599011 53.1706189,68.1905639 53.8873982,71.068617 C50.6078941,71.9995641 47.4418534,72.9920277 44.4125156,74.0478303 C17.3093297,83.497195 0,98.3066828 0,113.667995 C0,129.533287 18.5815786,145.446423 46.8116526,155.095373 C49.0394553,155.856809 51.3511025,156.576778 53.7333796,157.260293 C52.9600965,160.37302 52.2875179,163.423318 51.7229345,166.398431 C46.3687351,194.597975 50.5500231,216.989464 63.8566899,224.664425 C77.6012619,232.590464 100.66852,224.443422 123.130185,204.809231 C124.905501,203.257196 126.687196,201.611293 128.472081,199.886102 C130.785552,202.113904 133.095375,204.222319 135.392897,206.199955 C157.14963,224.922338 178.637969,232.482469 191.932332,224.786092 C205.663234,216.837268 210.125675,192.78347 204.332202,163.5181 C203.88974,161.283006 203.374826,158.99961 202.796573,156.675661 C204.416503,156.196743 206.006814,155.702335 207.557482,155.188332 C236.905331,145.46465 256,129.745175 256,113.667995 C256,98.2510906 238.132466,83.3418093 210.483381,73.8236374 Z M204.118035,144.807565 C202.718197,145.270987 201.281904,145.718918 199.818271,146.153177 C196.578411,135.896354 192.205739,124.989735 186.854729,113.72131 C191.961041,102.721277 196.164656,91.9540963 199.313837,81.7638014 C201.93261,82.5215915 204.474374,83.3208483 206.923636,84.1643056 C230.613348,92.3195488 245.063763,104.377206 245.063763,113.667995 C245.063763,123.564379 229.457753,136.411268 204.118035,144.807565 Z M193.603754,165.642007 C196.165567,178.582766 196.531475,190.282717 194.834536,199.429057 C193.309843,207.64764 190.243595,213.12715 186.452366,215.321689 C178.384612,219.991462 161.131788,213.921395 142.525146,197.909832 C140.392124,196.074366 138.243609,194.114502 136.088259,192.040261 C143.301619,184.151133 150.510878,174.979732 157.54698,164.793993 C169.922699,163.695814 181.614905,161.900447 192.218042,159.449363 C192.740247,161.555956 193.204126,163.621993 193.603754,165.642007 Z M87.2761866,214.514686 C79.3938934,21',
};
```

---

### Emit Custom Data from LangGraph Node (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/streaming

This snippet demonstrates how to emit custom user-defined data from within a LangGraph node. It utilizes the `writer` parameter from `LangGraphRunnableConfig` to send key-value pairs and configures the stream to receive this custom data by setting `streamMode: "custom"`.

```typescript
import {
  StateGraph,
  StateSchema,
  GraphNode,
  START,
  LangGraphRunnableConfig,
} from "@langchain/langgraph";
import * as z from "zod";

const State = new StateSchema({
  query: z.string(),
  answer: z.string(),
});

const node: GraphNode<typeof State> = async (state, config) => {
  // Use the writer to emit a custom key-value pair (e.g., progress update)
  config.writer({ custom_key: "Generating custom data inside node" });
  return { answer: "some data" };
};

const graph = new StateGraph(State)
  .addNode("node", node)
  .addEdge(START, "node")
  .compile();

const inputs = { query: "example" };

// Set streamMode: "custom" to receive the custom data in the stream
for await (const chunk of await graph.stream(inputs, {
  streamMode: "custom",
})) {
  console.log(chunk);
}
```

---

### LangGraph State Streaming: Updates Mode

Source: https://docs.langchain.com/oss/javascript/langgraph/streaming

Streams only the state updates returned by nodes after each step. The output includes the node name and its corresponding state update, useful for tracking incremental changes.

```typescript
import { StateGraph, StateSchema, START, END } from "@langchain/langgraph";
import { z } from "zod/v4";

const State = new StateSchema({
  topic: z.string(),
  joke: z.string(),
});

const graph = new StateGraph(State)
  .addNode("refineTopic", (state) => {
    return { topic: state.topic + " and cats" };
  })
  .addNode("generateJoke", (state) => {
    return { joke: `This is a joke about ${state.topic}` };
  })
  .addEdge(START, "refineTopic")
  .addEdge("refineTopic", "generateJoke")
  .addEdge("generateJoke", END)
  .compile();

for await (const chunk of await graph.stream(
  { topic: "ice cream" },
  { streamMode: "updates" },
)) {
  for (const [nodeName, state] of Object.entries(chunk)) {
    console.log(`Node ${nodeName} updated:`, state);
  }
}
```

---

### Determine Node Status in LangGraph

Source: https://docs.langchain.com/oss/javascript/langgraph/frontend/graph-execution

Calculates the current execution state of a pipeline node based on streaming content and completed state values. Returns one of three statuses: idle, streaming, or complete.

```typescript
type NodeStatus = "idle" | "streaming" | "complete";

function getNodeStatus(
  node: { name: string; stateKey: string },
  streamingContent: Record<string, string>,
  values: Record<string, unknown>,
): NodeStatus {
  if (values?.[node.stateKey]) return "complete";
  if (streamingContent[node.name]) return "streaming";
  return "idle";
}
```

---

### View Thread History in LangGraph JavaScript

Source: https://docs.langchain.com/oss/javascript/langgraph/use-functional-api

Retrieves the history of states for a given thread. This function takes a configuration object with a `thread_id` and returns an async iterable of `StateSnapshot` objects, which are collected into an array.

```typescript
const config = {
  configurable: {
    thread_id: "1", // [!code highlight]
  },
};
const history = []; // [!code highlight]
for await (const state of graph.getStateHistory(config)) {
  history.push(state);
}
```

---

### Avoid Conditional Interrupts in TypeScript

Source: https://docs.langchain.com/oss/javascript/langgraph/interrupts

Demonstrates a common mistake where `interrupt` calls are conditionally skipped within a node. This can lead to index mismatches when resuming execution, as the order of interrupts changes between runs.

```typescript
const nodeA: GraphNode<typeof State> = async (state) => {
  // ❌ Bad: conditionally skipping interrupts changes the order
  const name = interrupt("What's your name?");

  // On first run, this might skip the interrupt
  // On resume, it might not skip it - causing index mismatch
  if (state.needsAge) {
    const age = interrupt("What's your age?");
  }

  const city = interrupt("What's your city?");

  return { name, city };
};
```

---

### Validate Human Input with LangGraph Interrupts (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/interrupts

This snippet demonstrates how to validate human input using a loop with the `interrupt` function in LangGraph. It repeatedly prompts the user for their age until a positive number is entered, showcasing input validation and re-prompting.

```typescript
import { interrupt } from "@langchain/langgraph";

const getAgeNode: typeof State.Node = (state) => {
  let prompt = "What is your age?";

  while (true) {
    const answer = interrupt(prompt); // payload surfaces in result.__interrupt__

    // Validate the input
    if (typeof answer === "number" && answer > 0) {
      // Valid input - continue
      return { age: answer };
    } else {
      // Invalid input - ask again with a more specific prompt
      prompt = `'${answer}' is not a valid age. Please enter a positive number.`;
    }
  }
};
```

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
      const answer = interrupt(prompt); // payload surfaces in result.__interrupt__

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
console.log(first.__interrupt__); // -> [{ value: "What is your age?", ... }]

// Provide invalid data; the node re-prompts
const retry = await graph.invoke(new Command({ resume: "thirty" }), config);
console.log(retry.__interrupt__); // -> [{ value: "'thirty' is not a valid age...", ... }]

// Provide valid data; loop exits and state updates
const final = await graph.invoke(new Command({ resume: 30 }), config);
console.log(final.age); // -> 30
```

---

### Implement Human Review Node in LangGraph

Source: https://docs.langchain.com/oss/javascript/langgraph/interrupts

Uses the interrupt function to pause execution and request human input. The node returns the updated state provided by the user during the resume process.

```typescript
import { interrupt } from "@langchain/langgraph";

const reviewNode: typeof State.Node = (state) => {
  const editedContent = interrupt({
    instruction: "Review and edit this content",
    content: state.generatedText,
  });

  return { generatedText: editedContent };
};
```

---

### Appending to Arrays Before Interrupt in TypeScript

Source: https://docs.langchain.com/oss/javascript/langgraph/interrupts

Demonstrates another non-idempotent operation: appending to an array (`appendToHistory`) before an `interrupt`. This will result in duplicate entries in the history each time the node is re-executed after an interrupt, as the append operation does not check for existing entries.

```typescript
const nodeA: GraphNode<typeof State> = async (state) => {
  // ❌ Bad: appending to an array before interrupt
  // This will add duplicate entries on each resume
  await db.appendToHistory(state.userId, "approval_requested");

  const approved = interrupt("Approve this change?");

  return { approved };
};
```

---

### View Thread State in LangGraph JavaScript

Source: https://docs.langchain.com/oss/javascript/langgraph/use-functional-api

Retrieves the current state of a thread using its ID. This function requires a configuration object with a `thread_id`. It returns a `StateSnapshot` object containing message history and metadata.

```typescript
const config = {
  configurable: {
    thread_id: "1", // [!code highlight]
    // optionally provide an ID for a specific checkpoint,
    // otherwise the latest checkpoint is shown
    // checkpoint_id: "1f029ca3-1f5b-6704-8004-820c16b69a5a" [!code highlight]
  },
};
await graph.getState(config); // [!code highlight]
```

---

### Decouple Return Value from Saved Value in LangGraph JavaScript

Source: https://docs.langchain.com/oss/javascript/langgraph/use-functional-api

Demonstrates how to use `entrypoint.final` to separate the value returned to the caller from the value persisted in the checkpoint. This is useful for returning computed results while saving internal states for subsequent invocations.

```typescript
import { entrypoint, MemorySaver } from "@langchain/langgraph";

const checkpointer = new MemorySaver();

const accumulate = entrypoint(
  { checkpointer, name: "accumulate" },
  async (n: number, previous?: number) => {
    const prev = previous || 0;
    const total = prev + n;
    // Return the *previous* value to the caller but save the *new* total to the checkpoint.
    return entrypoint.final({ value: prev, save: total });
  },
);

const config = { configurable: { thread_id: "my-thread" } };

console.log(await accumulate.invoke(1, config)); // 0
console.log(await accumulate.invoke(2, config)); // 1
console.log(await accumulate.invoke(3, config)); // 3
```

---

### Avoid Complex/Non-Serializable Values in `interrupt` (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/interrupts

Illustrates common mistakes when using the `interrupt` function, such as passing functions or class instances. These complex objects are not serializable and will lead to errors, hindering graph adaptability.

```typescript
function validateInput(value: string): boolean {
  return value.length > 0;
}

const nodeA: GraphNode<typeof State> = async (state) => {
  // ❌ Bad: passing a function to interrupt
  // The function cannot be serialized
  const response = interrupt({
    question: "What's your name?",
    validator: validateInput, // This will fail
  });
  return { name: response };
};
```

```typescript
class DataProcessor {
  constructor(private config: any) {}
}

const nodeA: GraphNode<typeof State> = async (state) => {
  const processor = new DataProcessor({ mode: "strict" });

  // ❌ Bad: passing a class instance to interrupt
  // The instance cannot be serialized
  const response = interrupt({
    question: "Enter data to process",
    processor: processor, // This will fail
  });
  return { result: response };
};
```

---

### Delete Specific Messages from Graph State (TypeScript)

Source: https://docs.langchain.com/oss/javascript/langgraph/add-memory

Demonstrates how to delete the earliest two messages from the graph state using `RemoveMessage` when the message history exceeds two entries. This function assumes the state key `messages` is managed by `messagesStateReducer`.

```typescript
import { RemoveMessage } from "@langchain/core/messages";

const deleteMessages = (state) => {
  const messages = state.messages;
  if (messages.length > 2) {
    // remove the earliest two messages
    return {
      messages: messages
        .slice(0, 2)
        .map((m) => new RemoveMessage({ id: m.id })),
    };
  }
};
```

---

### Delete All Checkpoints for a Thread in LangGraph

Source: https://docs.langchain.com/oss/javascript/langgraph/add-memory

This code snippet illustrates how to remove all stored checkpoints associated with a specific thread ID using the `deleteThread` method of a LangGraph checkpointer. This is useful for cleaning up old data or resetting a conversation.

```typescript
const threadId = "1";
await checkpointer.deleteThread(threadId);
```

=== COMPLETE CONTENT === This response contains all available snippets from this library. No additional content exists. Do not make further requests.
