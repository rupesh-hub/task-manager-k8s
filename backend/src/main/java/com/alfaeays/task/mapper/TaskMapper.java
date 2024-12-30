package com.alfaeays.task.mapper;

import com.alfaeays.task.entity.Task;
import com.alfaeays.task.model.TaskRequest;
import com.alfaeays.task.model.TaskResponse;

public class TaskMapper {

    public static Task toEntity(TaskRequest request){
        return Task.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .dueDate(request.getDueDate())
                .status(request.getStatus())
                .build();
    }

    public static TaskResponse toResponse(Task task){
        return TaskResponse.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .dueDate(task.getDueDate())
                .status(task.getStatus())
                .createdAt(task.getCreatedOn())
                .updatedAt(task.getModifiedOn())
                .createdBy(task.getCreatedBy())
                .updatedBy(task.getModifiedBy())
                .build();
    }

}