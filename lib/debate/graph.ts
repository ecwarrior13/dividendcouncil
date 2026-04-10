import { StateGraph, START, END } from '@langchain/langgraph'
import { PostgresSaver } from '@langchain/langgraph-checkpoint-postgres'
import { MemorySaver } from '@langchain/langgraph'
import { DebateState } from './state'
import {
  fetchDataNode,
  aidenScoreNode,
  lexaScoreNode,
  compareNode,
  aidenRespondNode,
  lexaRespondNode,
  finalAssessmentNode,
} from './nodes'

function buildGraph() {
  return new StateGraph(DebateState)
    .addNode('node_fetchData', fetchDataNode)
    .addNode('node_aidenScore', aidenScoreNode)
    .addNode('node_lexaScore', lexaScoreNode)
    .addNode('node_compare', compareNode)
    .addNode('node_aidenRespond', aidenRespondNode)
    .addNode('node_lexaRespond', lexaRespondNode)
    .addNode('node_finalAssessment', finalAssessmentNode)
    .addEdge(START, 'node_fetchData')
    .addEdge('node_fetchData', 'node_aidenScore')
    .addEdge('node_aidenScore', 'node_lexaScore')
    .addEdge('node_lexaScore', 'node_compare')
    .addEdge('node_compare', 'node_aidenRespond')
    .addEdge('node_aidenRespond', 'node_lexaRespond')
    .addEdge('node_lexaRespond', 'node_finalAssessment')
    .addEdge('node_finalAssessment', END)
}

export function compileDebateGraph() {
  const graph = buildGraph()

  // Use in-memory checkpointer for now.
  // To enable persistent state (pause/resume), set DATABASE_URL
  // to your Supabase pooler connection string (port 6543).
  return graph.compile({ checkpointer: new MemorySaver() })
}
