package com.alfaeays.task.model;

import com.alfaeays.task.enums.TaskStatus;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TaskResponse {

    private Long id;
    private String title;
    private String description;
    private TaskStatus status;
    private Date dueDate;
    private Date createdAt;
    private Date updatedAt;
    private String createdBy;
    private String updatedBy;

}