package com.lambdaschool.j52c2.controllers;

import com.lambdaschool.j52c2.models.Agent;
import com.lambdaschool.j52c2.services.AgentService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

// AGENTS (agentcode, agentname, workingarea, commission, phone, country)
@RestController
public class AgentController {

    @Autowired
    private AgentService agentService;

    // GET all agents
    // http://localhost:2019/agents/agents
    @GetMapping(value = "/agents/agents",
            produces = {"application/json"})
    public ResponseEntity<?> listAllAgents(){

        List<Agent> myAgents = agentService.findAll();
        return new ResponseEntity<>(myAgents, HttpStatus.OK);
    }

    // GET one agent by agentcode
    // GET /agents/agent/{code} - Returns the agent and their customers with the given agent code
    // http://localhost:2019/agents/agent/{agentcode}
    @GetMapping(value = "/agents/agent/{agentCode}",
            produces = {"application/json"})
    public ResponseEntity<?> getAgentByCode(@PathVariable Long agentCode) {
        Agent r = agentService.findAgentByCode(agentCode);
        return new ResponseEntity<>(r, HttpStatus.OK);
    }

    // GET one agent by name
    // http://localhost:2019/agents/agent/{agentName}
    @GetMapping(value = "/agent/name/{agentName}",
            produces = {"application/json"})
    public ResponseEntity<?> getAgentByName(@PathVariable String agentName) {
        Agent r = agentService.findAgentByName(agentName);
        return new ResponseEntity<>(r, HttpStatus.OK);
    }

    // GET one agent by telephone
    // http://localhost:2019/agents/agent/{agentPhone}
    @GetMapping(value = "/agent/phone/{agentPhone}",
            produces = {"application/json"})
    public ResponseEntity<?> getAgentByTelephone(@PathVariable String agentPhone) {
        Agent r = agentService.findAgentByTelephone(agentPhone);
        return new ResponseEntity<>(r, HttpStatus.OK);
    }


    // DELETE one agent
    // http://localhost:2019/agents/agent/{agentcode}
    @DeleteMapping(value = "/agent/{agentCode}")
    public ResponseEntity<?> deleteAgentByCode(@PathVariable Long agentCode) {
        agentService.delete(agentCode);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // PUT one agent
    // http://localhost:2019/agents/agent/{agentcode}
    @PutMapping(value = "/agent/{agentCode}",
            produces = {"application/json"},
            consumes = {"application/json"})
    public ResponseEntity<?> updateAgent(@RequestBody Agent updateAgent,
                                              @PathVariable Long agentCode) {
        agentService.update(updateAgent, agentCode);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // POST one agent
    @PostMapping(value = "/agent",
            produces = {"application/json"},
            consumes = {"application/json"})
    public ResponseEntity<?> addNewAgent(@Valid
                                              @RequestBody Agent newAgent) throws URISyntaxException{
        newAgent = agentService.save(newAgent);

        // set location header for newly created resource
        HttpHeaders responseHeaders = new HttpHeaders();
        URI newAgentURI = ServletUriComponentsBuilder.fromCurrentRequest().path("/{agentcode}")
                .buildAndExpand(newAgent.getAgentCode()).toUri();
        responseHeaders.setLocation(newAgentURI);

        return new ResponseEntity<>(null, responseHeaders, HttpStatus.CREATED);
    }
}
