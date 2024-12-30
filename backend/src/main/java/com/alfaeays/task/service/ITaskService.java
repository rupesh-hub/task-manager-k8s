package com.alfaeays.task.service;

import com.alfaeays.shared.GlobalResponse;
import com.alfaeays.task.model.TaskRequest;
import com.alfaeays.task.model.TaskResponse;

import java.util.List;

public interface ITaskService {

    GlobalResponse<TaskResponse> create(final TaskRequest request);
    GlobalResponse<TaskResponse> update(final TaskRequest request, final Long taskId);
    GlobalResponse<Void> delete(final Long taskId);
    GlobalResponse<TaskResponse> getById(final Long taskId);
    GlobalResponse<List<TaskResponse>> getAll();

}
