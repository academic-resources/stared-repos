package com.lambdaschool.j52c2.services;

import com.lambdaschool.j52c2.models.Agent;
import com.lambdaschool.j52c2.models.Customer;
import com.lambdaschool.j52c2.models.Order;
import com.lambdaschool.j52c2.repos.OrderRepository;
import com.lambdaschool.j52c2.repos.AgentsRepository;
import com.lambdaschool.j52c2.repos.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;

// AGENTS (agentcode, agentname, workingarea, commission, phone, country)
@Transactional
@Service(value="agentService")
public class AgentServiceImple {

    @Autowired
    private AgentsRepository agentrepos;

    @Override
    public List<Agent> findAll() {
        List<Agent> rtnList = new ArrayList<>();
        agentrepos.findAll().iterator().forEachRemaining(rtnList::add);
        return rtnList;
    }

    // GET /agents/agent/{agentCode} - Returns the agent and their customers with the given agent code
    @Override
    public Agent findAgentByCode(long agentCode) {

        return agentrepos.findAgentByCode(agentCode)
                .orElseThrow(()-> new EntityNotFoundException("ID = " + agentCode));
    }

    @Override
    public Agent findAgentByName(String name) {
        Agent agent = agentrepos.findAgentByName(name);

        if(agent == null){
            throw new EntityNotFoundException("Agent not found, name = " + name);
        }
        return agent;
    }

    @Override
    public Agent findAgentByTelephone(String telephone) {
        Agent agent = agentrepos.findAgentByTelephone(telephone);

        if(agent == null){
            throw new EntityNotFoundException("Agent not found, telephone = " + telephone);
        }
        return agent;
    }

    @Override
    public Agent delete(long agentCode) {
        if(agentrepos.findAgentByCode(agentCode).isPresent()){
            agentrepos.deleteAgentByCode(agentCode);
        }
        else {
            throw new EntityNotFoundException("ID = " + agentCode);
        }
        return null;
    }

    @Transactional
    @Override
    public Agent save(Agent agent) {
        Agent newAgent = new Agent();
        newAgent.setName(agent.getName());
        newAgent.setCommission(agent.getCommission());
        newAgent.setCountry(agent.getCountry());
        newAgent.setWorkingarea(agent.getWorkingarea());
        newAgent.setTelephone(agent.getTelephone());

        // pointers
        // pointer gets set, all data goes away, doesn't bring info with it
        // newAgent.setCustomers(agent.getCustomers());
        // (String custname, String custcity, String workingarea, String custcountry, String telephone)
        for(Customer m : agent.getCustomers()){
            newAgent.getCustomers().add(new Customer(m.getCustname(), m.getCustcity(), m.getWorkingarea(), m.getCustcountry(), m.getTelephone(), newAgent));
        }
        return agentrepos.save(newAgent);
    }

    @Transactional
    @Override
    public Agent update(Agent agent, long agentCode) {

        Agent currentAgent =
                agentrepos.findAgentByCode(agentCode)
                        .orElseThrow(()->new EntityNotFoundException(Long.toString(agentCode)));

        if(agent.getName() != null){
            currentAgent.setName((agent.getName()));
        }
        if(agent.getCommission() != 0){
            currentAgent.setCommission((agent.getCommission()));
        }
        if(agent.getCountry() != null){
            currentAgent.setCountry((agent.getCountry()));
        }
        if(agent.getWorkingarea() != null){
            currentAgent.setWorkingarea((agent.getWorkingarea()));
        }
        if(agent.getTelephone() != null){
            currentAgent.setTelephone((agent.getTelephone()));
        }

// CUSTOMERS (custcode, custname, custcity, workingarea, custcountry, grade,
//            openingamt, receiveamt, paymentamt, outstandingamt, phone, agentcode)
        if(agent.getCustomers().size() > 0){
            for(Customer m : agent.getCustomers()){
                currentAgent.getCustomers().add(new Customer(m.getCustname(), m.getCustcity(), m.getWorkingarea(), m.getCustcountry(), m.getTelephone(), currentAgent));
            }

        }
        return agentrepos.save(currentAgent);
    }
}
