# Creating & Managing Council Workflows

## How Workflows Work

A workflow defines the **round and step structure** for a council debate. When you run `npm run council`, the orchestrator:

1. Loads the **default active** workflow
2. Reads its steps, grouped by round
3. For each step, finds **all active agents** whose `debate_role` matches the step's role
4. Each matching agent speaks in that step

**Key rule:** Workflows control the **structure** (what rounds exist, what actions happen). Agents control **who participates** (via their `debate_role` and `is_active` settings).

---

## Who Gets Included?

An agent participates in a workflow step if ALL of these are true:

| Check | Where to Set |
|-------|-------------|
| Agent's `is_active` = true | `/dashboard/agents/[id]` → Active toggle |
| Agent's `debate_role` matches the step's role | `/dashboard/agents/[id]` → Debate Role dropdown |

### Example

If your workflow has a step: `Round 1, proposer, propose`

And you have these agents:

| Agent | debate_role | is_active | Speaks? |
|-------|------------|-----------|---------|
| Aiden | proposer | Yes | Yes |
| Lexa | proposer | Yes | Yes |
| Chuck | proposer | Yes | Yes |
| Clark | null | Yes | No (no debate_role) |
| Editor | decider | Yes | No (role doesn't match) |

All three proposers speak. If you don't want Chuck in this debate, you have two options:

### Option 1: Deactivate the agent (global)
Go to `/dashboard/agents/[id]` → toggle Active off. Chuck won't participate in ANY workflow until reactivated.

### Option 2: Remove the debate role (global)
Go to `/dashboard/agents/[id]` → set Debate Role to "None." Chuck stays active in the system (can still be used for other things) but has no council role.

Both options are global — they affect all workflows equally.

---

## Creating a New Workflow

### Step 1: Create the workflow
Go to `/dashboard/workflows` → fill in name and description → click Create.

### Step 2: Add rounds and steps
Click into your new workflow. You'll see an empty builder with an "Add Round 1" form.

For each round, define:
- **Round label** — display name (e.g., "Proposals", "Challenge & Defend")
- **Steps** — each step needs:
  - **Debate role** — which agents speak (framer, proposer, challenger, decider)
  - **Action type** — what they do (frame, propose, challenge, defend, synthesize, decide)
  - **Prompt hint** — optional extra instruction added to the agent's message
  - **Context flags** — what data the agent sees:
    - Vector: past reasoning from pgvector (useful for proposers)
    - Brand: brand strategy document
    - Pillars: content pillar distribution + queued proposals
    - Weights: agent influence weights (useful for deciders)

### Step 3: Set as default
Click "Set as Default" on the workflow detail page. This workflow will be used when you run `npm run council`.

### Step 4: Activate/deactivate
Use the Activate/Deactivate button to control whether the workflow is available. Deactivated workflows won't appear as an option and can't be set as default.

---

## Workflow Templates

### Standard (3 rounds)
The default "Topic Selection v1" that ships with the system:

```
Round 1: Proposals
  Step 1: framer → frame (brand, pillars)
  Step 2: proposer → propose (vector)

Round 2: Challenge & Defend
  Step 1: challenger → challenge
  Step 2: proposer → defend (vector)
  Step 3: framer → synthesize (brand, pillars)

Round 3: Decision
  Step 1: decider → decide (brand, weights)
```

### Quick Decision (1 round)
For when you want a fast topic pick without full debate:

```
Round 1: Quick Pick
  Step 1: proposer → propose (vector)
  Step 2: decider → decide (brand, weights)
```

Skips the challenger entirely. Proposers suggest, Editor picks.

### Deep Debate (4 rounds)
For high-stakes decisions that need more scrutiny:

```
Round 1: Proposals
  Step 1: framer → frame (brand, pillars)
  Step 2: proposer → propose (vector)

Round 2: First Challenge
  Step 1: challenger → challenge
  Step 2: proposer → defend (vector)

Round 3: Cross-Examination
  Step 1: proposer → synthesize
  Step 2: challenger → challenge
  Step 3: framer → synthesize (brand, pillars)

Round 4: Decision
  Step 1: decider → decide (brand, weights)
```

### Beginner Check (3 rounds + perspective round)
Adding a beginner perspective before the final decision:

```
Round 1: Proposals
  Step 1: framer → frame (brand, pillars)
  Step 2: proposer → propose (vector)

Round 2: Challenge & Defend
  Step 1: challenger → challenge
  Step 2: proposer → defend (vector)

Round 3: Audience Perspective
  Step 1: proposer → synthesize
    prompt_hint: "As a beginner, what about these proposals would confuse you? What would you want explained first?"

Round 4: Decision
  Step 1: decider → decide (brand, weights)
```

Note: In Round 3, ALL proposers (Aiden, Lexa, Chuck) would speak. If you only want Chuck here, you'd need to give Chuck a unique debate_role and update the step to target that role.

---

## Action Type Reference

| Action | What the Agent Sees | What They Should Do |
|--------|-------------------|-------------------|
| `frame` | Brand doc, pillars, past topics, seeded topics | Set the landscape, identify gaps |
| `propose` | Framer output, prior proposals, seeded topics | Propose ONE specific topic |
| `challenge` | Full prior transcript | Find weaknesses, question assumptions |
| `defend` | Challenger concerns | Defend or adjust position |
| `synthesize` | Current round transcript | Weigh in on direction |
| `decide` | Full transcript + agent weights | Pick the final topic (start with `TOPIC:`) |

---

## Tips

- **Start simple.** The 3-round default works well. Only add complexity when the debates feel too shallow or too one-sided.
- **Prompt hints are powerful.** Instead of adding a whole new round, try adding a prompt hint to an existing step: "Also consider how a beginner investor would react to this topic."
- **Influence weights > workflow changes.** If the Devil's Advocate is too dominant, lower their weight at `/dashboard/agents` instead of removing the challenge round.
- **One decider is enough.** Multiple deciders would each try to pick a topic. The last one wins, which gets confusing.
- **Test with one run.** After editing a workflow, run `npm run council` once to verify the flow before relying on it.
