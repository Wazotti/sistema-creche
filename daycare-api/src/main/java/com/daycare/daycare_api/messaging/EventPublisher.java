package com.daycare.daycare_api.messaging;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@Component
public class EventPublisher {
    private final RabbitTemplate rabbit;

    public EventPublisher(RabbitTemplate rabbit) {
        this.rabbit = rabbit;
    }

    // Eventos de Child
    public void publishChildCheckedIn(Object payload) {
        rabbit.convertAndSend("amq.direct", "child.checkin", payload);
    }

    public void publishChildCheckedOut(Object payload) {
        rabbit.convertAndSend("amq.direct", "child.checkout", payload);
    }

    public void publishChildCreated(Object payload) {
        rabbit.convertAndSend("amq.direct", "child.created", payload);
    }

    public void publishChildUpdated(Object payload) {
        rabbit.convertAndSend("amq.direct", "child.updated", payload);
    }

    public void publishChildDeleted(Object payload) {
        rabbit.convertAndSend("amq.direct", "child.deleted", payload);
    }

    // Eventos de Teacher
    public void publishTeacherCreated(Object payload) {
        rabbit.convertAndSend("amq.direct", "teacher.created", payload);
    }

    public void publishTeacherUpdated(Object payload) {
        rabbit.convertAndSend("amq.direct", "teacher.updated", payload);
    }

    public void publishTeacherDeleted(Object payload) {
        rabbit.convertAndSend("amq.direct", "teacher.deleted", payload);
    }

    // Eventos de Classroom
    public void publishClassroomCreated(Object payload) {
        rabbit.convertAndSend("amq.direct", "classroom.created", payload);
    }

    public void publishClassroomUpdated(Object payload) {
        rabbit.convertAndSend("amq.direct", "classroom.updated", payload);
    }

    public void publishClassroomDeleted(Object payload) {
        rabbit.convertAndSend("amq.direct", "classroom.deleted", payload);
    }

    // Eventos de Guardian
    public void publishGuardianCreated(Object payload) {
        rabbit.convertAndSend("amq.direct", "guardian.created", payload);
    }

    public void publishGuardianUpdated(Object payload) {
        rabbit.convertAndSend("amq.direct", "guardian.updated", payload);
    }

    public void publishGuardianDeleted(Object payload) {
        rabbit.convertAndSend("amq.direct", "guardian.deleted", payload);
    }
}
