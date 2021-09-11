package com.lambdaschool.j52c2.services;

// AGENTS (agentcode, agentname, workingarea, commission, phone, country)

import com.lambdaschool.j52c2.models.Agent;

import java.util.List;

public interface AgentService {
    List<Agent> findAll();

    Agent findAgentByCode(long agentCode);

    // GET /agents/agent/{code} - Returns the agent and their customers with the given agent code
    Agent findAgentByName(String name);

    Agent findAgentByTelephone(String telephone);

    Agent delete(long agentCode);

    Agent save(Agent agent);

    Agent update(Agent agent, long agentCode);
}
