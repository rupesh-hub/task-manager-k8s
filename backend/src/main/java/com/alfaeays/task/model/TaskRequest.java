package com.alfaeays.task.model;

import com.alfaeays.task.enums.TaskStatus;
import lombok.*;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class TaskRequest {

    private String title;
    private String description;
    private TaskStatus status;
    private Date dueDate;

}
