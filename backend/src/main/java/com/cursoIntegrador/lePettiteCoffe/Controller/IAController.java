package com.cursoIntegrador.lePettiteCoffe.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cursoIntegrador.lePettiteCoffe.Model.DTO.PromptRequest;
import com.cursoIntegrador.lePettiteCoffe.Service.IA.GeminiService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequiredArgsConstructor
@RequestMapping("/IA")
public class IAController {

    @Autowired
    private final GeminiService gemservice;

    @PostMapping("/consulta")
    public String consulta(@RequestBody PromptRequest request) {
        return gemservice.lePettitePromptCompuesto(request.getPrompt());
    }

}
