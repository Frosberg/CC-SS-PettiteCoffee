package com.cursoIntegrador.lePettiteCoffe.Service.IA;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;

import com.google.genai.Chat;
import com.google.genai.Client;
import com.google.genai.types.Content;
import com.google.genai.types.GenerateContentConfig;
import com.google.genai.types.GenerateContentResponse;
import com.google.genai.types.Part;

import jakarta.annotation.PostConstruct;

@Service
@PropertySource("classpath:secret-credentials.properties")
public class GeminiService {

    @Value("${gemini.api-key}")
    private String APIKey;

    @Value("${gemini.model-id}")
    private String modelId;

    private Client client;

    private GenerateContentConfig config;
    private Chat chatSession;

    @PostConstruct
    public void init() {
        this.client = Client.builder().apiKey(APIKey).build();

        this.config = GenerateContentConfig.builder()
                .systemInstruction(
                        Content.fromParts(Part.fromText(
                                "A partir de ahora eres el asistente de una cafeteria llamado LePettiteCoffe. Responde con un tamaño medio-corto de texto. Si el usuario pregunta algo fuera del tema de la cafeteria, desvía suavemente la conversación hacia productos, servicios o promociones del local.")))
                .build();

        this.chatSession = client.chats.create(modelId, config);

    }

    public String lePettitePromptCompuesto(String prompt) {
        GenerateContentResponse response = chatSession.sendMessage(prompt);
        return response.text();
    }

}
