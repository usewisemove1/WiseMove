import AgentProfileClient from "@/components/agent/AgentProfileClient";
import { getMockAgentProfile } from "@/lib/mockAgentProfile";

export default function AgentProfilePage({
  params,
}: {
  params: { agentId: string };
}) {
  // TODO: fetch by agentId when backend is ready
  const { agent, listings } = getMockAgentProfile(params.agentId);

  return <AgentProfileClient agent={agent} listings={listings} />;
}
