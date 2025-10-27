package com.cursoIntegrador.lePettiteCoffe.Service.DAO;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cursoIntegrador.lePettiteCoffe.Model.DTO.NotificationDTO;
import com.cursoIntegrador.lePettiteCoffe.Model.Entity.Notification;
import com.cursoIntegrador.lePettiteCoffe.Repository.NotificationRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class NotificationService {

    @Autowired
    private final NotificationRepository notiRepo;

    public List<NotificationDTO> getAllUserNotis(String email) {
        List<Notification> notis = notiRepo.findByCuentaEmail(email);
        List<NotificationDTO> notisDTO = new ArrayList<>();

        for (Notification noti : notis) {
            NotificationDTO tempoNotiDTO = new NotificationDTO(noti);
            notisDTO.add(tempoNotiDTO);
        }
        return notisDTO;
    }
}
